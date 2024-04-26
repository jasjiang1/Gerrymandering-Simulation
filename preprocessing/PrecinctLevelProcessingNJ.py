import maup
import CensusBlockDataProcessingNJ
import geopandas as gpd

new_jersey_utm = 32618
latitude_and_longitude = 4326
neighbor_delimitters = ";;"

def clean_precinct_file():
    columns_to_drop = ["OBJECTID", "CONGR_DIST", "COCOM_DIST", "MCODE_1040", "WARD_CODE", "ELECD_CODE"]
    precincts = gpd.read_file("NewJerseyPrecincts.geojson")
    precincts_filtered = precincts.drop(columns=columns_to_drop)
    precincts_utm = precincts_filtered.to_crs(epsg=new_jersey_utm)
    precincts_repaired = maup.smart_repair(precincts_utm)
    return precincts_repaired

def aggregate_census_to_precinct(precincts_gdf):
    census_gdf = CensusBlockDataProcessingNJ.census_geojson().to_crs(epsg=new_jersey_utm)
    original_geometries = precincts_gdf.geometry.copy()
    precincts_gdf['geometry'] = precincts_gdf.geometry.buffer(60)
    blocks_to_precincts = maup.assign(census_gdf, precincts_gdf)
    columns_to_aggregate = ["TotalRegisteredVoters2021", "Democratic", "Republican", "WhiteVoters2021", "HispanicVoters2021", "AfricanAmericanVoters2021", "AsianVoters2021",
                            "OtherEthnicityVoters2021", "Population", "Population18Over", "Population18OverWhite",
                            "Population18OverAfricanAmerican", "Population18OverNativeAmerican", "Population18OverAsian", "Population18OverHispanic","PopulationGeneralWhite",
                            "PopulationGeneralAfricanAmerican", "PopulationGeneralNativeAmerican", "PopulationGeneralAsian", "PopulationGeneralHispanic"]
    precincts_gdf[columns_to_aggregate] = census_gdf[columns_to_aggregate].groupby(blocks_to_precincts).sum()
    precincts_gdf['geometry'] = original_geometries
    return precincts_gdf

def calculate_neighbors(precincts_gdf):
    precincts_gdf = precincts_gdf.set_index("ELECD_KEY")
    adjacencies = maup.adjacencies(precincts_gdf, output_type='geodataframe')
    neighbors_adjacency_graph = {}
    for index, row in adjacencies.iterrows():
        precinct_one, precinct_two = row['neighbors']
        if precinct_one not in neighbors_adjacency_graph:
            neighbors_adjacency_graph[precinct_one] = []
        if precinct_two not in neighbors_adjacency_graph:
            neighbors_adjacency_graph[precinct_two] = []
        neighbors_adjacency_graph[precinct_one].append(precinct_two)
        neighbors_adjacency_graph[precinct_two].append(precinct_one)
    precincts_gdf["neighbors"] = precincts_gdf.index.map(lambda x: neighbor_delimitters.join(map(str, neighbors_adjacency_graph.get(x, []))))
    precincts_gdf = precincts_gdf.to_crs(epsg=latitude_and_longitude)
    return precincts_gdf

precincts = clean_precinct_file()
precincts_aggregated = aggregate_census_to_precinct(precincts)
precincts_final = calculate_neighbors(precincts_aggregated)
precincts_final.to_file("NJPrecinctFinal.geojson", driver='GeoJSON')