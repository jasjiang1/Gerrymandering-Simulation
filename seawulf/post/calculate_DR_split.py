from collections import Counter, OrderedDict
import os
import json

def calculate_DR_split(folder_path):
    all_dem_pers = Counter()
    for filename in os.listdir(folder_path):
        if os.path.isfile(os.path.join(folder_path, filename)) and filename.endswith('.json'):
            with open(os.path.join(folder_path, filename), 'r') as file:
                data = json.load(file)
                all_dem_pers.update(data['dem_percentages'])
    dem_rep_splits = OrderedDict()
    for dem, count in sorted(all_dem_pers.items()):
        dem_rep = str(dem) + "/" + str(100 - int(dem))
        dem_rep_splits[dem_rep] = count
    return dem_rep_splits