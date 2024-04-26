import maup
import geopandas as gpd
import CensusBlockDataProcessingGA

georgia_utm = 32617
latitude_and_longitude = 4326
neighbor_delimitters = ";;"

def clean_precinct_file():
    columns_to_drop = ["G22A01NO", "G22A01YES", "G22A02NO", "G22A02YES", "G22AGRDHEM", "G22AGRLRAU","G22AGRRHAR", "G22ATGDJOR", "G22ATGLCOW", "G22ATGRCAR", "G22INSDROB",
                    "G22INSRKIN","G22LABDBOD", "G22LABLAND", "G22LABRTHO", "G22LTGDBAI", "G22LTGLGRA", "G22LTGRJON","G22RFANO", "G22RFAYES", "G22RFBNO", "G22RFBYES",
                    "G22SOSDNGU", "G22SOSLMET", "G22SOSRRAF","G22SUPDSEA", "G22SUPRWOO", "COUNTYFP"]
    precincts = gpd.read_file("GeorgiaPrecincts.geojson")
    precincts_filtered = precincts.drop(columns=columns_to_drop)
    precincts_utm = precincts_filtered.to_crs(epsg=georgia_utm)
    precincts_repaired = maup.smart_repair(precincts_utm)
    return precincts_repaired

def aggregate_census_to_precinct(precincts_gdf):
    census_gdf = CensusBlockDataProcessingGA.census_geojson().to_crs(epsg=georgia_utm)
    blocks_to_precincts = maup.assign(census_gdf, precincts_gdf)
    columns_to_aggregate = ["TotalRegisteredVoters2022", "Democratic", "Republican", "WhiteVoters2022", "HispanicVoters2022", "AfricanAmericanVoters2022", "AsianVoters2022",
                            "OtherEthnicityVoters2022", "Population", "Population18Over", "Population18OverWhite",
                            "Population18OverAfricanAmerican", "Population18OverNativeAmerican", "Population18OverAsian", "Population18OverHispanic","PopulationGeneralWhite",
                            "PopulationGeneralAfricanAmerican", "PopulationGeneralNativeAmerican", "PopulationGeneralAsian", "PopulationGeneralHispanic"]
    precincts_gdf[columns_to_aggregate] = census_gdf[columns_to_aggregate].groupby(blocks_to_precincts).sum()
    return precincts_gdf

def assign_district(precincts_gdf):
    district_gdf = gpd.read_file("GADistricts.geojson").to_crs(epsg=georgia_utm)
    precinct_to_district = maup.assign(precincts_gdf, district_gdf)
    precincts_gdf["DISTRICT"] = precinct_to_district
    return precincts_gdf

def calculate_neighbors(precincts_gdf):
    precincts_gdf = precincts_gdf.set_index("UNIQUE_ID")
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
precinct_with_districts = assign_district(precincts_aggregated)
precincts_final = calculate_neighbors(precinct_with_districts)
precincts_final.to_file("GAPrecinctFinal.geojson", driver='GeoJSON')