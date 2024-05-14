import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function StateTable({mapSelection}) {
    return (
        <div id = "table">
        { <table id = "summarytable">
          <tr>
            {mapSelection.selectedState=== "New Jersey" && <th id = "title" colspan="2">Summary of New Jersey State Data</th>}
            {mapSelection.selectedState=== "Georgia" && <th id = "title" colspan="2">Summary of Georgia State Data</th>}</tr>
          <tr>
            <td>Total State Population</td>
            {mapSelection.selectedState=== "Georgia" && <td id ="state_pop" class="value">10,711,908</td>}
            {mapSelection.selectedState=== "New Jersey" && <td id ="state_pop" class="value">9,288,994</td>}
          </tr>
            <tr>
              <th colspan="2">Population By Ethnicity</th>
            </tr>
          <tr>
            <td id = "min_1">White </td>
              {mapSelection.selectedState=== "Georgia" && <td class="value">5,555,483</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">5,112,280</td>}
          </tr>
          <tr>
            <td id = "min_1">Hispanic </td>
              {mapSelection.selectedState=== "Georgia" && <td class="value">1,123,457</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">2,002,575</td>}
          </tr>
          <tr >
            <td id = "min_3">African American </td>
              {mapSelection.selectedState=== "Georgia" && <td class="value">3,320,513</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">1,219,770</td>}
          </tr>
          <tr >
            <td id = "min_2">Asian </td>
              {mapSelection.selectedState=== "Georgia" && <td class="value">479,028</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">950,000</td>}
          </tr>
          <tr>
            <td id = "min_4" >American Indian </td>
              {mapSelection.selectedState=== "Georgia" && <td class="value">50,618</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">51,186</td>}
          </tr>
          <tr>
            <td id = "min_4" >Native Hawaiian </td>
              {mapSelection.selectedState=== "Georgia" && <td class="value">7,299</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">3,533</td>}
          </tr>
          <tr>
            <td id = "min_4" >Other </td>
              {mapSelection.selectedState=== "Georgia" && <td class="value">555,059</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">1,048,641</td>}
          </tr>
          <th colspan ="2">Demographics of State Assembly Members </th>
          <tr>
            <td id = "min_1"># of White House of Representatives </td>
              {mapSelection.selectedState==="Georgia" && <td class="value">115</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">55</td>}
          </tr>
          <tr >
            <td id = "min_3"># of African American House of Representatives </td>
              {mapSelection.selectedState=== "Georgia" && <td class="value">54</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">14</td>}
          </tr>
          <tr>
            <td id = "min_1"># of Hispanic House of Representatives </td>
              {mapSelection.selectedState=== "Georgia" && <td class="value">2</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">8</td>}
          </tr>
          <tr >
            <td id = "min_2"># of Asian House of Representatives </td>
            {mapSelection.selectedState=== "Georgia" &&  <td class="value">7</td>}
            {mapSelection.selectedState=== "New Jersey" &&  <td class="value">3</td>}
          </tr>
          <th colspan ="2">Politcal Parties of State Assmebly Members </th>
          <tr>
            <td id = "min_1">Number of Democratic Members  </td>
              {mapSelection.selectedState=== "Georgia" && <td class="value">77</td>}
              {mapSelection.selectedState=== "New Jersey" && <td class="value">50</td>}
          </tr>
          <tr>
            <td id = "min_1">Number of Republican Members </td>
              {mapSelection.selectedState=== "Georgia" &&  <td class="value">101</td>}
              {mapSelection.selectedState=== "New Jersey" &&  <td class="value">30</td>}
          </tr>
          <th colspan ="2">Voter Percentage Estimate</th>
          <tr>
            <td id = "min_1">Percentage Democratic Voters</td>
              {mapSelection.selectedState=== "Georgia" &&  <td class="value">45.9%</td>}
              {mapSelection.selectedState=== "New Jersey" &&  <td class="value">51.2%</td>}
          </tr>
          <tr>
            <td id = "min_1">Percentage Democratic Voters</td>
              {mapSelection.selectedState=== "Georgia" &&  <td class="value">53.4%</td>}
              {mapSelection.selectedState=== "New Jersey" &&  <td class="value">48%</td>}
          </tr>
        </table>}
      </div>
    );
}

export default StateTable;
