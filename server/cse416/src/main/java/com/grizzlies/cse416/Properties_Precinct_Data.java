package com.grizzlies.cse416;

public class Properties_Precinct_Data {
    private String ID;
    private String UNIQUE_ID;
    private String County;
    private String MUN_NAME;
    private int TotalRegisteredVoters2022;
    private int WhiteVoters2022;
    private int HispanicVoters2022;
    private int AfricanAmericanVoters2022;
    private int AsianVoters2022;
    private int OtherEthnicityVoters2022;
    private int UnknownEthnicityVoters2022;
    private int Democratic;
    private int Republican;
    private int StateAssemblyElection2021;
    private int StateAssemblyElectionWhiteVoters2021;
    private int StateAssemblyElectionHispanicVoters2021;
    private int StateAssemblyElectionAfricanAmericanVoters2021;
    private int StateAssemblyElectionAsianVoters2021;
    private int Population18Over;
    private int Population;
    private int Population18OverWhite;
    private int Population18OverAfricanAmerican;
    private int Population18OverNativeAmerican;
    private int Population18OverAsian;
    private int Population18OverHispanic;
    private int PopulationGeneralWhite;
    private int PopulationGeneralAfricanAmerican;
    private int PopulationGeneralNativeAmerican;
    private int PopulationGeneralAsian;
    private int PopulationGeneralHispanic;
    private int G21GOVDMUR;
    private int G21GOVRCIA;
    private int G21GOVLMEL;
    private int G21GOVGHOF;
    private int G21GOVSKUN;
    private String neighbors;

    public String getID(){
        return ID;
    }

    public String getCounty(){
        return County;
    }

    public int getTotalRegisteredVoters2022(){
        return TotalRegisteredVoters2022;
    }
    
    public int getPopulation(){
        return Population;
    }

    public int getPopulation180Over(){
        return Population18Over;
    }

    public int getPopulation18OverWhite(){
        return Population18OverWhite;
    }

    public int getPopulation18OverAfricanAmerican(){
        return Population18OverAfricanAmerican;
    }

    public int getPopulation18OverNativeAmerican(){
        return Population18OverNativeAmerican;
    }

    public int getPopulation18OverAsian(){
        return Population18OverAsian;
    }

    public int Population18OverHispanic(){
        return Population18OverHispanic;
    }

    public int getPopulationGeneralWhite(){
        return PopulationGeneralWhite;
    }

    public int getPopulationGeneralAfricanAmerican(){
        return PopulationGeneralAfricanAmerican;
    }

    public int getPopulationGeneralNativeAmerican(){
        return PopulationGeneralNativeAmerican;
    }

    public int getPopulationGeneralAsian(){
        return PopulationGeneralAsian;
    }

    public int getPopulationGeneralHispanic(){
        return PopulationGeneralHispanic;
    }

}
