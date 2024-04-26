import geopandas as gpd
import json

graph = {
    "directed": False,
    "multigraph": False,
    "graph": [],
    "nodes": [],
    "adjacency": []
}

def read_geojson():
    precincts_gdf = gpd.read_file('updated_precincts_nj.geojson')
    precincts_gdf = gdf.drop(columns=["geometry"])
    return precincts_gdf

def createNodeObject(precinct):
    node = {}
    node = precinct.to_dict()
    node["id"] = precinct["ELECD_KEY"]
    return node

def add_to_graph(gdf):
    for index, precinct in gdf.iterrows():
        node = createNodeObject(precinct)
        graph["nodes"].append(node)
        neighbors = precinct["neighbors"].split(",")
        neighbor_dicts = [{"id": neighbor.strip()} for neighbor in neighbors]
        graph["adjacency"].append(neighbor_dicts)

gdf = read_geojson()
add_to_graph(gdf)
with open('NJ_graph.json', 'w') as file:
    json.dump(graph, file)