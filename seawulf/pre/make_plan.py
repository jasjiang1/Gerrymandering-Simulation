from make_chain import create_chain, create_graph, create_partition
from collections import Counter
import json
import sys

def run_chain(chain):
    for (iteration, partition) in enumerate(chain.with_progress_bar()):
        if iteration == len(chain) - 1:
            random_plan_json = parse_last_iteration(partition)
    return random_plan_json

def parse_last_iteration(partition):
    race_BW, dem_percentage = {}, {}
    races = ['white', 'aa', 'asian', 'hispanic']
    dem_districts, rep_districts = 0, 0    
    opp_threshold = [Counter(), Counter(), Counter()]
    thresholds = [0.37, 0.50, 0.70]
    for i in range(len(partition)):
        race_percentages = []
        for race in races:
            percentage = partition['Race'].percents(race)[i]
            race_percentages.append(percentage)
            if race in race_BW:
                race_BW[race].append(percentage)
            else:
                race_BW[race] = [percentage]
        if partition['GOV'].counts('Dem')[i] > partition['GOV'].counts('Rep')[i]:
            dem_districts += 1
        else:
            rep_districts += 1
        dem_split = round(partition['GOV'].percents('Dem')[i]*100)
        if dem_split in dem_percentage:
            dem_percentage[dem_split] += 1
        else:
            dem_percentage[dem_split] = 1
        for i in range(3):
            opp_threshold[i].update(update_opp(race_percentages, races, thresholds[i]))
    winner = "Dem" if dem_districts > rep_districts else "Rep"
    plan = partition if opp_threshold[0]["total"] > 0 else None
    random_plan_json = make_json(race_BW, dem_percentage, dem_districts, rep_districts, winner, opp_threshold, plan)
    return random_plan_json

def update_opp(race_percentages, races, threshold):
    opp_race = {"total": 0}
    if any(race_per > threshold for race_per in race_percentages):
        opp_race["total"] += 1
        for i in range(4):
            opp_race[races[i]] = 1 if race_percentages[i] > threshold else 0
    return opp_race

def make_json(race_BW, dem_percentage, dem_districts, rep_districts, winner, opp_threshold, plan):
    white_BW, aa_BW, asian_BW, hispanic_BW = race_BW.values()
    opp_37, opp_50, opp_70 = opp_threshold
    if plan:
        partition_dict = {node: plan.assignment[node] for node in plan.graph.nodes}
        json_data = json.dumps(partition_dict, indent=4)
        plan = json.loads(json_data)
    return {
        "white_BW": sorted(white_BW),
        "aa_BW": sorted(aa_BW),
        "asian_BW": sorted(asian_BW),
        "hispanic_BW": sorted(hispanic_BW),
        "dem_percentages": dem_percentage,
        "dem_districts": dem_districts,
        "rep_districts": rep_districts,
        "winner": winner,
        "opp_37": opp_37,
        "opp_50": opp_50,
        "opp_70": opp_70,
        "random_plan": plan
    }

#run by command line - in seawulf/pre, python make_plan.py (state.json) (number)
state_file = sys.argv[1]
state = "NJ" if state_file.endswith("NJ.json") else "GA"
plan_number = sys.argv[2]

graph = create_graph(state_file)
initial_partition = create_partition(graph, state)
chain = create_chain(initial_partition, state)
random_plan_json = run_chain(chain)

json_obj = json.dumps(random_plan_json, indent = 4)
with open(f"random_plans_{state}/random_{state}_{plan_number}.json", "w") as file:
    file.write(json_obj)
