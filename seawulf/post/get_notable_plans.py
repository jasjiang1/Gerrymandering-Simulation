import os
import json

def get_notable_plans(folder_path, avg_37, avg_50, avg_70, max_37, max_50, max_70):
    notable_plans = []
    for filename in os.listdir(folder_path):
        if os.path.isfile(os.path.join(folder_path, filename)) and filename.endswith('.json'):
            with open(os.path.join(folder_path, filename), 'r') as file:
                data = json.load(file)
                plan = data['random_plan']
                opp_37, opp_50, opp_70 = data['opp_37'], data['opp_50'], data['opp_70']
                if plan:
                    plan_attr = {
                        "max_white_37": False, "max_white_50": False, "max_white_70": False,
                        "max_aa_37": False, "max_aa_50": False, "max_aa_70": False,
                        "max_asian_37": False, "max_asian_50": False, "max_asian_70": False,
                        "max_hispanic_37": False, "max_hispanic_50": False, "max_hispanic_70": False,      
                        "average_37": False, "average_50": False, "average_70": False,              
                    }
                    plan_attr["max_white_37"], plan_attr["max_aa_37"], plan_attr["max_asian_37"], plan_attr["max_hispanic_37"], plan_attr["average_37"] = check_max_average(opp_37, avg_37, max_37)
                    plan_attr["max_white_50"], plan_attr["max_aa_50"], plan_attr["max_asian_50"], plan_attr["max_hispanic_50"], plan_attr["average_50"] = check_max_average(opp_50, avg_50, max_50)
                    plan_attr["max_white_70"], plan_attr["max_aa_70"], plan_attr["max_asian_70"], plan_attr["max_hispanic_70"], plan_attr["average_70"] = check_max_average(opp_70, avg_70, max_70)
                    if any(value == True for value in plan_attr.values()):
                        plan_attr["district_plan"] = plan
                        notable_plans.append(plan_attr) 
    return notable_plans

def check_max_average(new_opp, avg_opp, max_opp):
    race_max_average = []
    races = ["white", "aa", "asian", "hispanic"]
    still_average = True
    for race in races:
        max_race = False
        if new_opp[race] == max_opp[race]:
            max_race = True
        if new_opp[race] != avg_opp[race]:
            still_average = False
        race_max_average.append(max_race)
    race_max_average.append(still_average)
    return race_max_average