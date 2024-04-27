import json
from venv import create
import geopandas as gpd

def create_JSON():
    precinct_gdf = gpd.read_file("GAPrecinctFinal.geojson")
    candidate_to_party = {
        "G22GOVDABR": "Democratic",
        "G22GOVRKEM": "Republic"
    }
    data = []
    for index, row in precinct_gdf.iterrows():
        population = row["Population18Over"]
        total_votes = row["G22GOVDABR"] + row["G22GOVRKEM"] + row["G22GOVLHAZ"]
        if total_votes != 0 and population != 0:
            precinct_name = row["UNIQUE_ID"]
            republic_pct = row["G22GOVRKEM"] / total_votes
            democratic_pct = row["G22GOVDABR"] / total_votes
            asian_pop = row["Population18OverAsian"] / population
            white_pop = row["Population18OverWhite"] / population
            hispanic_pop = row["Population18OverHispanic"] / population
            african_american_pop = row["Population18OverAfricanAmerican"] / population
            winner = candidate_to_party["G22GOVRKEM"] if republic_pct > democratic_pct else candidate_to_party["G22GOVDABR"]
            data.append({
                "state": "GA",
                "precinct": precinct_name,
                "republicPCT": republic_pct,
                "democraticPCT": democratic_pct,
                "asianPCT": asian_pop,
                "whitePCT": white_pop,
                "hispanicPCT": hispanic_pop,
                "africanAmericanPCT": african_american_pop,
                "winner": winner
            })
    with open('GinglesDataGA.json', 'w') as f:
        json.dump(data, f, indent=4)

create_JSON()