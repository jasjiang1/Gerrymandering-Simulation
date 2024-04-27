import os
import json
from collections import Counter

def calculate_avg_plan(folder_path, ensemble_size):
    majority_winner = {"Dem": 0, "Rep": 0}
    total_dem_districts, total_rep_districts = 0, 0
    all_opp_37, all_opp_50, all_opp_70 = Counter(), Counter(), Counter()
    max_opp_37 = {"total": 0, "white": 0, "aa": 0, "asian": 0, "hispanic": 0}
    max_opp_50 = {"total": 0, "white": 0, "aa": 0, "asian": 0, "hispanic": 0}
    max_opp_70 = {"total": 0, "white": 0, "aa": 0, "asian": 0, "hispanic": 0}
    for filename in os.listdir(folder_path):
        if os.path.isfile(os.path.join(folder_path, filename)) and filename.endswith('.json'):
            with open(os.path.join(folder_path, filename), 'r') as file:
                data = json.load(file)
                opp_37, opp_50, opp_70 = data['opp_37'], data['opp_50'], data['opp_70']
                majority_winner[data['winner']] += 1
                total_dem_districts += data['dem_districts']
                total_rep_districts += data['rep_districts']
                if data['random_plan']:
                    all_opp_37.update(opp_37)
                    all_opp_50.update(opp_50)
                    all_opp_70.update(opp_70)
                    max_opp_37 = update_max_opp(opp_37, max_opp_37)
                    max_opp_50 = update_max_opp(opp_50, max_opp_50)
                    max_opp_70 = update_max_opp(opp_70, max_opp_70)

    avg_dem_districts = total_dem_districts // ensemble_size
    avg_rep_districts = total_rep_districts // ensemble_size
    expected_winner = "Dem" if majority_winner['Dem'] > majority_winner['Rep'] else "Rep"
    avg_opp_37, avg_opp_50, avg_opp_70 = {}, {}, {}
    for key in all_opp_37:
        avg_opp_37[key] = all_opp_37[key] // ensemble_size
    for key in all_opp_50:
        avg_opp_50[key] = all_opp_50[key] // ensemble_size
    for key in all_opp_70:
        avg_opp_70[key] = all_opp_70[key] // ensemble_size

    return {
        "winner": expected_winner,
        "avg_dem_districts": avg_dem_districts,
        "avg_rep_districts": avg_rep_districts,
        "avg_opp_37": avg_opp_37,
        "avg_opp_50": avg_opp_50,
        "avg_opp_70": avg_opp_70,
        "max_opp_37": max_opp_37,
        "max_opp_50": max_opp_50,
        "max_opp_70": max_opp_70
    }

def update_max_opp(new_opp, max_opp):
    for key in max_opp:
        max_opp[key] = max(new_opp[key], max_opp[key])
    return max_opp
