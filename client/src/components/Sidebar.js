import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import * as L from "leaflet";
function Sidebar({  mapSelection, setMapSelection, chartSelection, setChartSelection,setModal, submitted}) {
  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name in mapSelection) {
      setMapSelection(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else if (name in chartSelection) {
      setChartSelection(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const handleSubmit = (event) =>{
    event.preventDefault();
   
    submitted();
  }
  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col className="bg-secondary sidebar d-flex flex-column justify-content-between">
          <div>
            <Form onSubmit = {handleSubmit} className="text-white">
              <h2>Map Selection</h2>
              <Form.Group controlId="selectState">
                <Form.Label>Select State</Form.Label>
                <Form.Control as="select" custom name="selectedState" value={mapSelection.selectedState} onChange={handleChange}>
                  <option>Choose...</option>
                  <option>Georgia</option>
                  <option>New Jersey</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="selectMapType">
                <Form.Label>Select Map Type</Form.Label>
                <Form.Control as="select" custom name="selectedMapType" value={mapSelection.selectedMapType} onChange={handleChange}>
                  <option>State</option>
                  <option>Counties</option>
                  <option>Approved Districting Plan</option>
                </Form.Control>
              </Form.Group>
              {/* <Form.Group controlId="selectEthnicity">
                <Form.Label>Select Ethnicity</Form.Label>
                <Form.Control as="select" custom name="selectedEthnicity" value={mapSelection.selectedEthnicity} onChange={handleChange}>
                    <option>Choose...</option>
                    <option>Asian</option>
                    <option>Black</option>
                    <option>Hispanic</option>
                    <option>White</option>
                </Form.Control>
              </Form.Group> */}
              <br/>
              <h2>View Charts</h2>
              <Form.Group controlId="selectChartType">
                <Form.Label>Select Chart Type</Form.Label>
                <Form.Control as="select" custom name="selectedChartType" value={chartSelection.selectedChartType} onChange={handleChange}>
                    <option>Choose...</option>
                    <option>Bar Chart</option>
                    <option>Box and Whiskers</option>
                    <option>Scatter Plot</option>
                    <option>Pie Chart</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="selectSpecificCounty">
                <Form.Label>Select Specific Area</Form.Label>
                <Form.Control as="select" custom name="selectedAreaType" value={chartSelection.selectedAreaType} onChange={handleChange}>
                    <option>Choose...</option>
                    <option>Currently Viewing State</option>
                    <option>State Vs. State</option>
                    <option>County 1</option>
                    <option>County 2</option>
                    <option>County 3</option>
                    <option>County 4</option>
                    <option>County 5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="compareGroups">
                <Form.Label>Select Ethnicities To Compare</Form.Label>
                <Form.Control as="select" custom name="selectedEthnicityOne" value={chartSelection.selectedEthnicityOne} onChange={handleChange}>
                    <option>Choose...</option>
                    <option>Asian</option>
                    <option>Black</option>
                    <option>Hispanic</option>
                    <option>White</option>
                </Form.Control>
                <Form.Control as="select" custom name="selectedEthnicityTwo" value={chartSelection.selectedEthnicityTwo} onChange={handleChange}>
                    <option>Choose...</option>
                    <option>Asian</option>
                    <option>Black</option>
                    <option>Hispanic</option>
                    <option>White</option>
                </Form.Control>
                <br/>
                <Button type = "submit" variant="primary">Apply</Button>
                <Button variant="danger" color="red">Reset</Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
  }

export default Sidebar;