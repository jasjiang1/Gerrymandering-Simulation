from collections import Counter, OrderedDict
from calculate_BW import calculate_BW
from calculate_DR_split import calculate_DR_split
from calculate_avg_plan import calculate_avg_plan
from get_notable_plans import get_notable_plans
import numpy as np
import fnmatch
import json
import sys
import os

def create_summary(folder_path, ensemble_size):
    white_BW_data, aa_BW_data, asian_BW_Data, hispanic_BW_data = calculate_BW(folder_path, num_districts)
    dem_rep_splits_data = calculate_DR_split(folder_path)
    avg_plan = calculate_avg_plan(folder_path, ensemble_size)
    avg_37, avg_50, avg_70 = avg_plan['avg_opp_37'], avg_plan['avg_opp_50'], avg_plan['avg_opp_70']
    max_37, max_50, max_70 = avg_plan['max_opp_37'], avg_plan['max_opp_50'], avg_plan['max_opp_70']
    notable_plans = get_notable_plans(folder_path, avg_37, avg_50, avg_70, max_37, max_50, max_70)
    return {
        "ensemble_size": ensemble_size,
        "white_BW": white_BW_data,
        "aa_BW": aa_BW_data,
        "asian_BW": asian_BW_Data,
        "hispanic_BW": hispanic_BW_data,
        "expected_winner": avg_plan['winner'],
        "average_dem_districts": avg_plan['avg_dem_districts'],
        "average_rep_districts": avg_plan['avg_rep_districts'],
        "dem_rep_splits": dem_rep_splits_data,
        "average_opp_37": avg_37,
        "average_opp_50": avg_50,
        "average_opp_70": avg_70,
        "max_opp_37": max_37,
        "max_opp_50": max_50,
        "max_opp_70": max_70,
        "notable_plans": notable_plans
    }

#in seawulf, python post/make_summary.py pre/random_plans_(state)
folder_path = sys.argv[1]
state = "NJ" if folder_path.endswith("NJ") else "GA"
ensemble_size = len(fnmatch.filter(os.listdir(folder_path), '*.json'))
num_districts = 40 if state == "NJ" else 180
summary_data = create_summary(folder_path, ensemble_size)

json_obj = json.dumps(summary_data, indent = 4)
with open(f"summary_{ensemble_size}_{state}.json", "w") as file:
    file.write(json_obj)
