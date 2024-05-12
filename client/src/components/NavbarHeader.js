import React, { useEffect, useRef } from 'react';
import logo from './grizzliestransparent.png';
import { Container, Navbar, Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ mapSelection, setMapSelection, chartSelection, setChartSelection,setComparison, comparison}){
  
  const view = useRef(null);

  useEffect(()=>{
    if(chartSelection.selectedAreaType != "Currently Viewing State"){
      view.current.value = "Currently Viewing State";
      const event = new Event('change', { bubbles: true });
      view.current.dispatchEvent(event);
  }
  },[comparison]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if(value == "State vs State"){
      setComparison(true);
    }
    if (name in mapSelection) {
      if (name === "selectedState"){
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
  }

  const reset = () => {
    setMapSelection(prevState => ({
      ...prevState,
      selectedEthnicity: "Hispanic",
      selectedMapType: "Approved Districting Plan",
    }));
    setChartSelection(prevState => ({
      ...prevState,
      selectedChartType: "State Data Summary"
    }))
  }
  return (
    <Navbar bg="secondary" expand="lg" variant="dark" className="py-2">
      <Container fluid>
        <Navbar.Brand href="#" className="d-flex align-items-center flex-column me-2">
          <img src={logo} alt="logo" width="30" height= "30" className="d-inline-block align-top mb-1"/>
        </Navbar.Brand>
        <Form onSubmit={handleSubmit} className="d-flex align-items-center w-100 gx-2" style={{ marginLeft: '75px' }}>
          <Row className="w-100 gx-2 gy-2">
            <Col xs={6} md={2}>
              <Form.Group controlId="selectState">
                <Form.Label>Select State</Form.Label>
                <Form.Control as="select" name="selectedState" value={mapSelection.selectedState} onChange={handleChange}>
                  <option>Georgia</option>
                  <option>New Jersey</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={6} md={2}>
              <Form.Group controlId="selectMapType">
                <Form.Label>Map Type</Form.Label>
                <Form.Control as="select" name="selectedMapType" value={mapSelection.selectedMapType} onChange={handleChange}>
                  <option>Approved Districting Plan</option>
                  <option>Approved Districting Plan Heatmap</option>
                  <option>Precincts Heatmap</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={6} md={2}>
              <Form.Group controlId="selectEthnicity">
                <Form.Label>Ethnicity</Form.Label>
                <Form.Control as="select" name="selectedEthnicity" value={mapSelection.selectedEthnicity} onChange={handleChange}>
                  <option>Hispanic</option>
                  <option>Asian</option>
                  <option>Black</option>
                  <option>White</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={6} md={2}>
              <Form.Group controlId="selectChartType">
                <Form.Label>Chart Type</Form.Label>
                <Form.Control as="select" name="selectedChartType" value={chartSelection.selectedChartType} onChange={handleChange}>
                  <option>State Data Summary</option>
                  <option>Bar Chart</option>
                  <option>Box and Whiskers</option>
                  <option>Gingles Plot</option>
                  <option>Ecological Inference</option>
                  <option>State Assembly Table</option>
                  <option>Dem Rep Splits</option>
                  <option>Ensemble Opportunity Districts</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={6} md={2}>
              <Form.Group controlId="selectSpecificArea">
                <Form.Label>Specific Area</Form.Label>
                <Form.Control ref = {view} as="select" name="selectedAreaType" value={chartSelection.selectedAreaType} onChange={handleChange}>
                  <option>Currently Viewing State</option>
                  <option>State vs State</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={6} md="auto" className="d-flex align-items-end pb-2">
              <Button type="submit" variant="primary" size="lg">Apply</Button>
              <Button variant="danger" size="lg" className="ms-2" onClick={reset}>Reset</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
}
export default Header;