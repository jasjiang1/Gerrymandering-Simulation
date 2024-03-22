import pandas as pd
import json
import geopandas as gpd
from shapely.geometry import shape

def censusBlockVotingPreprocess():
    COLUMN_MAPPING_VOTING_POPULATION = {
        'geoid20': 'GEOID',
        'total_reg': 'TotalRegisteredVoters2022',
        'eth1_eur': 'WhiteVoters2022',
        'eth1_hisp': 'HispanicVoters2022',
        'eth1_aa': 'AfricanAmericanVoters2022',
        'eth1_esa': 'AsianVoters2022',
        'eth1_oth': 'OtherEthnicityVoters2022',
        'eth1_unk': 'UnknownEthnicityVoters2022',
        'party_dem': 'Democratic',
        'party_rep': 'Republican',
        'g20211102_voted_all': 'StateAssemblyElection2021',
        'g20211102_voted_eur': 'StateAssemblyElectionWhiteVoters2021',
        'g20211102_voted_hisp': 'StateAssemblyElectionHispanicVoters2021',
        'g20211102_voted_aa': 'StateAssemblyElectionAfricanAmericanVoters2021',
        'g20211102_voted_esa': 'StateAssemblyElectionAsianVoters2021'
        }
    df = pd.read_csv("NJ_l2_2022stats_2020block.csv")
    df_filtered = df[COLUMN_MAPPING_VOTING_POPULATION.keys()]
    df_filtered = df_filtered.rename(columns=COLUMN_MAPPING_VOTING_POPULATION)
    return df_filtered

def censusBlockGeneralPreprocess():
    COLUMN_MAPPING_GENERAL_POPULATION = {
        'Geographic Record Identifier': 'GEOID',
        'Total population 18 years and over': 'Population18Over',
        'Total population 18 years and over: Population of one race: Population of one race: White alone': 'Population18OverWhite',
        'Total population 18 years and over: Population of one race: Population of one race: Black or African American alone': 'Population18OverAfricanAmerican',
        'Total population 18 years and over: Population of one race: Population of one race: American Indian and Alaska Native alone': 'Population18OverNativeAmerican',
        'Total population 18 years and over: Population of one race: Population of one race: Asian alone': 'Population18OverAsian',
        'Total population 18 years and over: Hispanic or Latino': 'Population18OverHispanic',
        'Population of one race: White alone': 'PopulationGeneralWhite',
        'Population of one race: Black or African American alone': 'PopulationGeneralAfricanAmerican',
        'Population of one race: American Indian and Alaska Native alone': 'PopulationGeneralNativeAmerican',
        'Population of one race: Asian alone': 'PopulationGeneralAsian',
        'Hispanic or Latino Population': 'PopulationGeneralHispanic'
    }
    df = pd.read_csv("New_Jersey_Census_2020_Redistricting_Blocks_-8316023484334111894.csv")
    df_filtered = df[COLUMN_MAPPING_GENERAL_POPULATION.keys()]
    df_filtered = df_filtered.rename(columns=COLUMN_MAPPING_GENERAL_POPULATION)
    return df_filtered

def mergeDataFrames(DF1, DF2):
    merged_df = pd.merge(DF1, DF2, on='GEOID', how='inner')
    return merged_df

def updateGeoJson():
    censusBlockDf = censusBlockVotingPreprocess()
    censusBlockGeneral = censusBlockGeneralPreprocess()
    merged = mergeDataFrames(censusBlockDf, censusBlockGeneral)
    with open('Census_Blocks_2020_Hosted_3424_8002927981741920445.geojson', 'r') as f:
        geojson_data = json.load(f)
    geoid_demographics_mapping = dict(zip(merged['GEOID'], merged.to_dict(orient='records')))
    for feature in geojson_data['features']:
        geoid = int(feature['properties']['GEOID20'])
        if geoid in geoid_demographics_mapping:
            demographics_data = geoid_demographics_mapping[geoid]
            feature['properties'].update(demographics_data)
    with open('CensusBlockNewJersey.geojson', 'w') as f:
        json.dump(geojson_data, f)
    print("GEOJSON For Census Block Demographics Completed")

def aggregateCensusBlockToPrecincts():
    census_blocks_gdf = gpd.read_file('CensusBlockNewJersey.geojson')
    precincts_gdf = gpd.read_file('NewJerseyPrecinctBoundaries.geojson')
    precincts_gdf = precincts_gdf.to_crs(census_blocks_gdf.crs)
    print("Finished Reading")

    buffer_distance = 0.001
    precincts_gdf['geometry'] = precincts_gdf.buffer(buffer_distance)
    print("Finished Adding Buffer")

    joined_gdf = gpd.sjoin(census_blocks_gdf, precincts_gdf, how='inner', op='within')
    print("Finished Spatial Joining")

    aggregated_data = joined_gdf.groupby('ELECD_KEY').agg({
        'TotalRegisteredVoters2022': 'sum',
        'WhiteVoters2022': 'sum',
        'HispanicVoters2022': 'sum',
        'AfricanAmericanVoters2022': 'sum',
        'AsianVoters2022': 'sum',
        'OtherEthnicityVoters2022': 'sum',
        'UnknownEthnicityVoters2022': 'sum',
        'Democratic': 'sum',
        'Republican': 'sum',
        'StateAssemblyElection2021': 'sum',
        'StateAssemblyElectionWhiteVoters2021': 'sum',
        'StateAssemblyElectionHispanicVoters2021': 'sum',
        'StateAssemblyElectionAfricanAmericanVoters2021': 'sum',
        'StateAssemblyElectionAsianVoters2021': 'sum',
        'Population18Over': 'sum',
        'Population18OverWhite': 'sum',
        'Population18OverAfricanAmerican': 'sum',
        'Population18OverNativeAmerican': 'sum',
        'Population18OverAsian': 'sum',
        'Population18OverHispanic': 'sum',
        'PopulationGeneralWhite': 'sum',
        'PopulationGeneralAfricanAmerican': 'sum',
        'PopulationGeneralNativeAmerican': 'sum',
        'PopulationGeneralAsian': 'sum',
        'PopulationGeneralHispanic': 'sum'
    }).reset_index()

    final_gdf = precincts_gdf.merge(aggregated_data, left_on='ELECD_KEY', right_on='ELECD_KEY')
    final_gdf.to_file('NJPrecinctsData.geojson', driver='GeoJSON')
    print("Aggregated Census Data to Precincts Completed")


#updateGeoJson()
aggregateCensusBlockToPrecincts()
