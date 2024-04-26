import os
import json
import numpy as np

def calculate_BW(folder_path, num_districts):
    white_index = [[] for _ in range(num_districts)]
    aa_index = [[] for _ in range(num_districts)]
    asian_index = [[] for _ in range(num_districts)]
    hispanic_index = [[] for _ in range(num_districts)]
    
    for filename in os.listdir(folder_path):
        if os.path.isfile(os.path.join(folder_path, filename)) and filename.endswith('.json'):
            with open(os.path.join(folder_path, filename), 'r') as file:
                data = json.load(file)
                white_BW = data['white_BW']
                aa_BW = data['aa_BW']
                asian_BW = data['asian_BW']
                hispanic_BW = data['hispanic_BW']
                for i in range(num_districts):
                    white_index[i].append(white_BW[i])
                    aa_index[i].append(aa_BW[i])
                    asian_index[i].append(asian_BW[i])
                    hispanic_index[i].append(hispanic_BW[i])

    white_calc_BW, aa_calc_BW, asian_calc_BW, hispanic_calc_BW = [], [], [], []
    for i in range(num_districts):
        white_calc_BW.append(combine_index(white_index[i]))
        aa_calc_BW.append(combine_index(aa_index[i]))
        asian_calc_BW.append(combine_index(asian_index[i]))
        hispanic_calc_BW.append(combine_index(hispanic_index[i]))
        
    return white_calc_BW, aa_calc_BW, asian_calc_BW, hispanic_calc_BW

def combine_index(race_BW):
    np_BW = np.array(race_BW)
    quartiles = np.percentile(np_BW, [25, 50, 75])
    race_min = np.min(np_BW)
    race_max = np.max(np_BW)
    iqr = quartiles[2] - quartiles[0]
    lower_bound = quartiles[0] - 1.5 * iqr
    upper_bound = quartiles[2] + 1.5 * iqr
    outliers = [x for x in np_BW if x < lower_bound or x > upper_bound]
    return {
        "q1": quartiles[0],
        "q2": quartiles[1],
        "q3": quartiles[2],
        "min": race_min,
        "max": race_max,
        "iqr": iqr,
        "outliers": outliers
    }