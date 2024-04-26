from gerrychain import (Partition, Graph, MarkovChain, updaters, constraints, accept, Election)
from gerrychain.proposals import recom
from functools import partial

def create_graph(state_file):
    graph = Graph.from_json(state_file)
    return graph

def create_partition(graph, state):
    gov_election = (
        Election("GOV", {"Dem": "G21GOVDMUR", "Rep":"G21GOVRCIA"}) 
        if state == "NJ"
        else Election("GOV", {"Dem": "G22GOVDABR", "Rep":"G22GOVRKEM"})
    )
    elections = [
        gov_election,
        Election("Race", {
            "white":"PopulationGeneralWhite", 
            "aa":"PopulationGeneralAfricanAmerican", 
            "asian":"PopulationGeneralAsian", 
            "hispanic":"PopulationGeneralHispanic"
        })
    ]
    election_updater = {election.name: election for election in elections}
    updater = {"population": updaters.Tally("Population", alias="population")}
    updater.update(election_updater)
    initial_partition = Partition(
        graph, 
        assignment="DISTRICT",
        updaters = updater
    )
    return initial_partition

def create_chain(initial_partition, state):
    ideal_population = sum(initial_partition["population"].values()) / len(initial_partition)
    percent_range = 0.25 if state == "NJ" else 0.6
    pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, percent_range)
    compactness_bound = constraints.UpperBound(
        lambda p: len(p["cut_edges"]),
        2*len(initial_partition["cut_edges"])
    )
    proposal = partial(
        recom, 
        pop_col = "Population",
        pop_target = ideal_population,
        epsilon = 0.3,
        node_repeats = 2
    )
    chain = MarkovChain(
        proposal = proposal,
        constraints = [
            pop_constraint,
            compactness_bound
        ],
        accept = accept.always_accept,
        initial_state= initial_partition,
        total_steps = 10000 #change to 10000
    )
    return chain