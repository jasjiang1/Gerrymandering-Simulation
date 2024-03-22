import pandas as pd
import json

def convertToDataframe():
    COLUMN_MAPPING_DEMOGRAPHICS = {
        'District': 'District',
        '[18+_Pop]': 'Population',
        '[%H18+_Pop]': 'Hispanic',
        '[%18+_AP_Wht]': 'White',
        '[%18+_AP_Blk]': 'AfricanAmerican',
        '[%18+_AP_Ind]': 'NativeAmerican',
        '[%18+_AP_Asn]': 'Asian',
        '[%18+_AP_Hwn]': 'Hawaiian',
        '[%18+_AP_Oth]': 'Other'
    }
    df = pd.read_csv('GADistrictDemographics.csv')
    df_filtered = df[COLUMN_MAPPING_DEMOGRAPHICS.keys()]
    df_filtered = df_filtered.rename(columns=COLUMN_MAPPING_DEMOGRAPHICS)
    return df_filtered

def updateGeoJson():
    demographics = convertToDataframe()
    with open('GADistricts.geojson', 'r') as f:
        geojson_data = json.load(f)
    districtMapping = dict(zip(demographics['District'], demographics.to_dict(orient='records')))
    for feature in geojson_data['features']:
        districtNumber = int(feature['properties']['DISTRICT'])
        if districtNumber in districtMapping:
            districtDemographics = districtMapping[districtNumber]
            feature['properties'].update(districtDemographics)
    with open('districtDemographicsGA.geojson', 'w') as f:
        json.dump(geojson_data, f)
    print("Updated Geojson")

updateGeoJson()