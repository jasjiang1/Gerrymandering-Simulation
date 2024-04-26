import pandas as pd
import geopandas as gpd
import json

def census_block_voting_preprocess():
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
        'g20221108_voted_all': 'StateAssemblyElection2022',
        'g20221108_voted_eur': 'StateAssemblyElectionWhiteVoters2022',
        'g20221108_voted_hisp': 'StateAssemblyElectionHispanicVoters2022',
        'g20221108_voted_aa': 'StateAssemblyElectionAfricanAmericanVoters2022',
        'g20221108_voted_esa': 'StateAssemblyElectionAsianVoters2022'
    }
    df = pd.read_csv("GA_l2_2022stats_2020block.csv")
    df_filtered = df[COLUMN_MAPPING_VOTING_POPULATION.keys()]
    df_filtered = df_filtered.rename(columns=COLUMN_MAPPING_VOTING_POPULATION)
    return df_filtered

def census_block_general_preprocess():
    COLUMN_MAPPING_GENERAL_POPULATION = {
        'GEOCODE': 'GEOID',
        'P0030001': 'Population18Over',
        'P0010001': 'Population',
        'P0030003': 'Population18OverWhite',
        'P0030004': 'Population18OverAfricanAmerican',
        'P0030005': 'Population18OverNativeAmerican',
        'P0030006': 'Population18OverAsian',
        'P0040002': 'Population18OverHispanic',
        'P0010003': 'PopulationGeneralWhite',
        'P0010004': 'PopulationGeneralAfricanAmerican',
        'P0010005': 'PopulationGeneralNativeAmerican',
        'P0010006': 'PopulationGeneralAsian',
        'P0020002': 'PopulationGeneralHispanic'
    }
    df = pd.read_csv("ga_pl2020_b.csv")
    df_filtered = df[COLUMN_MAPPING_GENERAL_POPULATION.keys()]
    df_filtered = df_filtered.rename(columns=COLUMN_MAPPING_GENERAL_POPULATION)
    return df_filtered

def merge_dataframes(DF1, DF2):
    merged_df = pd.merge(DF1, DF2, on='GEOID', how='inner')
    return merged_df

def census_geojson():
    censusBlockDf = census_block_voting_preprocess()
    censusBlockGeneral = census_block_general_preprocess()
    merged = merge_dataframes(censusBlockDf, censusBlockGeneral)
    with open('ga_b_2020_bound.geojson', 'r') as f:
        geojson_data = json.load(f)
    geoid_demographics_mapping = dict(zip(merged['GEOID'], merged.to_dict(orient='records')))
    for feature in geojson_data['features']:
        geoid = int(feature['properties']['GEOID20'])
        if geoid in geoid_demographics_mapping:
            demographics_data = geoid_demographics_mapping[geoid]
            feature['properties'].update(demographics_data)
    geojson_data = gpd.GeoDataFrame.from_features(geojson_data)
    return geojson_data