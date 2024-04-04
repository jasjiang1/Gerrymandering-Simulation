import geopandas as gpd
import pandas as pd

def precinctVotingDataPreprocess():
    COLUMN_MAPPING_VOTING_DATA = {
        'ELECD_KEY': 'ELECD_KEY',
        'G21GOVDMUR': 'G21GOVDMUR',
        'G21GOVRCIA': 'G21GOVRCIA',
        'G21GOVLMEL': 'G21GOVLMEL',
        'G21GOVGHOF': 'G21GOVGHOF',
        'G21GOVSKUN': 'G21GOVGHOF'
    }
    df = pd.read_csv("nj_vest_21.csv")
    df_filtered = df[COLUMN_MAPPING_VOTING_DATA.keys()]
    return df_filtered

geojson_file = "NJPrecinctsData.geojson"
gdf = gpd.read_file(geojson_file)

df = precinctVotingDataPreprocess()

unique_ids_gdf = set(gdf['ELECD_KEY'])
unique_ids_df = set(df['ELECD_KEY'])
ids_in_gdf_not_in_df = unique_ids_gdf - unique_ids_df
ids_in_df_not_in_gdf = unique_ids_df - unique_ids_gdf


if ids_in_gdf_not_in_df or ids_in_df_not_in_gdf:
    print("Warning: There are discrepancies in unique IDs between GeoDataFrame and DataFrame.")
    print("Unique IDs in gdf but not in df:", len(ids_in_gdf_not_in_df))
    print("Unique IDs in df but not in gdf:", len(ids_in_df_not_in_gdf))
else:
    print("Unique IDs match between GeoDataFrame and DataFrame.")

merged_df = gdf.merge(df, left_on='ELECD_KEY', right_on='ELECD_KEY', how='left')

merged_gdf = gpd.GeoDataFrame(merged_df, crs=gdf.crs, geometry=gdf.geometry)

output_geojson_file = "NJPrecinctData2.geojson"
merged_gdf.to_file(output_geojson_file, driver='GeoJSON')
