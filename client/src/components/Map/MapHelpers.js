export const getMinorityPopulationDistrict = (feature, mapSelection) => {
    if (mapSelection.selectedEthnicity === "Hispanic") {
        return feature.properties.hispanic;
    } else if (mapSelection.selectedEthnicity === "Asian") {
        return feature.properties.asian;
    } else if (mapSelection.selectedEthnicity === "White") {
        return feature.properties.white;
    } else {
        return feature.properties.africanAmerican;
    }
  };
export const getMinorityPopulationPrecinct = (feature, mapSelection) => {
    if (mapSelection.selectedEthnicity === "Hispanic") {
        console.log(feature.properties.populationGeneralHispanic)
        return feature.properties.populationGeneralHispanic;
    } else if (mapSelection.selectedEthnicity === "Asian") {
        return feature.properties.populationGeneralAsian;
    } else if (mapSelection.selectedEthnicity === "White") {
        return feature.properties.populationGeneralWhite;
    } else {
        return feature.properties.populationGeneralAfricanAmerican;
    }
  };