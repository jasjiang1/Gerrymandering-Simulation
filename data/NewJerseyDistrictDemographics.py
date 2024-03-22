import pandas as pd
import json

def convertToDataframe():
    COLUMN_MAPPING_DEMOGRAPHICS = {
        'District': 'District',
        'Adj_Population': 'Population',
        'Adj_Hispanic Origin': 'Hispanic',
        'Adj_NH_Wht': 'White',
        'Adj_NH_Blk': 'AfricanAmerican',
        'Adj_NH_Ind': 'NativeAmerican',
        'Adj_NH_Asn': 'Asian',
        'Adj_NH_Hwn': 'Hawaiian',
        'Adj_NH_Oth': 'Other'
    }
    df = pd.read_csv('NJDistrictDemographics.csv')
    df_filtered = df[COLUMN_MAPPING_DEMOGRAPHICS.keys()]
    df_filtered = df_filtered.rename(columns=COLUMN_MAPPING_DEMOGRAPHICS)
    return df_filtered

def updateGeoJson():
    demographics = convertToDataframe()
    with open('NJDistricts.geojson', 'r') as f:
        geojson_data = json.load(f)
    districtMapping = dict(zip(demographics['District'], demographics.to_dict(orient='records')))
    for feature in geojson_data['features']:
        districtNumber = int(feature['properties']['DISTRICT'])
        if districtNumber in districtMapping:
            districtDemographics = districtMapping[districtNumber]
            feature['properties'].update(districtDemographics)
    with open('districtDemographicsNJ.geojson', 'w') as f:
        json.dump(geojson_data, f)
    print("Updated Geojson")

updateGeoJson()