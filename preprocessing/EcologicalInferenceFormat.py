import geopandas as gpd
import pandas as pd

def create_dataframe(minority_pop, minority_vote):
    precinct_gdf = gpd.read_file("GAPrecinctFinal.geojson")
    data = []
    for index, row in precinct_gdf.iterrows():
        population = row["Population18Over"]
        votes = row["G22GOVDABR"] + row["G22GOVRKEM"] + row["G22GOVLHAZ"]
        if population != 0 and votes != 0:
            precinct_name = row["UNIQUE_ID"]
            precinct_pop = row["Population18Over"]
            precinct_total_votes = row["G22GOVDABR"] + row["G22GOVRKEM"] + row["G22GOVLHAZ"]
            percentage_kemp = row["G22GOVRKEM"] / precinct_total_votes
            percentage_hazel = row["G22GOVLHAZ"] / precinct_total_votes
            percentage_abrams = row["G22GOVDABR"] / precinct_total_votes
            percentage_minority_pop = row[minority_pop] / precinct_pop
            percentage_minority_vote = row[minority_vote] / row["TotalRegisteredVoters2022"]
            percentage_non_minority_pop = 1 - percentage_minority_pop
            percentage_non_minority_vote = 1 - percentage_minority_vote
            data.append({
                "Precinct": precinct_name,
                "Population": precinct_pop,
                "Total Votes": precinct_total_votes,
                "Percentage Kemp": percentage_kemp,
                "Percentage Hazel": percentage_hazel,
                "Percentage Abrams": percentage_abrams,
                "Percentage Minority Pop": percentage_minority_pop,
                "Percentage Minority Vote": percentage_minority_vote,
                "Percentage Non-Minority Pop": percentage_non_minority_pop,
                "Percentage Non-Minority Vote": percentage_non_minority_vote
            })
    ecological_inference_df = pd.DataFrame(data)
    return ecological_inference_df

ecological_inference_df = create_dataframe("Population18OverAsian","AsianVoters2022")
ecological_inference_df.to_csv("ecological_inference_data_asian.csv", index=False)
