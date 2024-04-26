import json
from venv import create
import geopandas as gpd

def create_JSON():
    precinct_gdf = gpd.read_file("NJPrecinctFinal.geojson")
    candidate_to_party = {
        "G21GOVDMUR": "Democratic",
        "G21GOVRCIA": "Republic"
    }
    data = []
    for index, row in precinct_gdf.iterrows():
        population = row["Population18Over"]
        total_votes = row["G21GOVDMUR"] + row["G21GOVRCIA"] + row["G21GOVLMEL"] + row["G21GOVGHOF"] + row["G21GOVSKUN"]
        if total_votes != 0 and population != 0:
            precinct_name = row["UNIQUE_ID"]
            republic_pct = row["G21GOVRCIA"] / total_votes
            democratic_pct = row["G21GOVDMUR"] / total_votes
            asian_pop = row["Population18OverAsian"] / population
            white_pop = row["Population18OverWhite"] / population
            hispanic_pop = row["Population18OverHispanic"] / population
            african_american_pop = row["Population18OverAfricanAmerican"] / population
            winner = candidate_to_party["G21GOVRCIA"] if republic_pct > democratic_pct else candidate_to_party["G21GOVDMUR"]
            data.append({
                "state": "NJ",
                "precinct": precinct_name,
                "republicPCT": republic_pct,
                "democraticPCT": democratic_pct,
                "asianPCT": asian_pop,
                "whitePCT": white_pop,
                "hispanicPCT": hispanic_pop,
                "africanAmericanPCT": african_american_pop,
                "winner": winner
            })
    with open('GinglesDataNJ.json', 'w') as f:
        json.dump(data, f, indent=4)

create_JSON()    