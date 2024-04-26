import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, Button } from 'react-bootstrap';

function Sidebar({ mapSelection, setMapSelection, chartSelection, setChartSelection, submitted}) {
  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name in mapSelection) {
      if (name == "selectedState") {
        const stateSettings = {
          'Georgia': { center: [32.7, -83.4], zoom: 7 },
          'New Jersey': { center: [40.1, -74.7], zoom: 7 },
        };
        const selectedStateSettings = stateSettings[value];
        setMapSelection({
          ...mapSelection,
          selectedState: value,
          center: selectedStateSettings.center,
          zoom: selectedStateSettings.zoom,
        });
      }
      else{
        setMapSelection(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
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
    <div className="sidebar-container" style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <Form onSubmit={handleSubmit} className="text-white">
        <Row>
          <Col>
            <Form.Group controlId="selectState">
              <Form.Label>Select State</Form.Label>
              <Form.Control as="select" custom name="selectedState" value={mapSelection.selectedState} onChange={handleChange}>
                <option>Georgia</option>
                <option>New Jersey</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="selectMapType">
              <Form.Label>Select Map Type</Form.Label>
              <Form.Control as="select" custom name="selectedMapType" value={mapSelection.selectedMapType} onChange={handleChange}>
                <option>Approved Districting Plan</option>
                <option>Counties</option>
                <option>State</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="selectEthnicity">
              <Form.Label>Select Ethnicity</Form.Label>
              <Form.Control as="select" custom name="selectedEthnicity" value={mapSelection.selectedEthnicity} onChange={handleChange}>
                  <option>Hispanic</option>
                  <option>Asian</option>
                  <option>Black</option>
                  <option>White</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
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
          </Col>
          <Col>
            <Form.Group controlId="selectSpecificArea">
              <Form.Label>Select Specific Area</Form.Label>
              <Form.Control as="select" custom name="selectedAreaType" value={chartSelection.selectedAreaType} onChange={handleChange}>
                <option>Currently Viewing State</option>
                <option>State Vs. State</option>
                <option>County 1</option>
                <option>County 2</option>
                <option>County 3</option>
                <option>County 4</option>
                <option>County 5</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
          <Button type="submit" variant="primary"> Apply </Button>
          <Button variant="danger" color="red"> Reset </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Sidebar;