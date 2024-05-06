import React, { useEffect } from 'react';
import logo from './grizzliestransparent.png';
import { Container, Navbar, Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function StatevStateHeader({ mapSelection, setMapSelection, chartSelection, setChartSelection, secondMapSelection, setSecondMapSelection, secondChartSelection, setSecondChartSelection, setComparison }){
  const reset = () => {
    document.getElementById("leftContainer").style.flex = "6.5";
    document.getElementById("rightContainer").style.flex = "3.5";
    setComparison(false);
  }
  useEffect(() => {
    document.getElementById("leftContainer").style.flex = "5";
    document.getElementById("rightContainer").style.flex = "5";
    if(mapSelection.selectedState === ""){
      console.log("In here");
      let state = "Georgia";
      const stateSettings = {
        'Georgia': { center: [32.7, -83.4], zoom: 7 },
        'New Jersey': { center: [40.1, -74.7], zoom: 7 },
      };
      const firstselectedStateSettings = stateSettings[state];

      setMapSelection({
        ...mapSelection,
        selectedState: state,
        selectedEthnicity: "Hispanic",
        center: firstselectedStateSettings.center,
        zoom: firstselectedStateSettings.zoom,
      });

      setChartSelection({
        selectedChartType: "State Data Summary",
        selectedAreaType: "State vs State",
        selectedEthnicityOne: "Hispanic",
      });

      const selectedStateSettings = stateSettings[state];

      setSecondMapSelection({
        ...secondMapSelection,
        selectedEthnicity: "Hispanic",
        selectedState: state,
        center: selectedStateSettings.center,
        zoom: selectedStateSettings.zoom,
      });

      setSecondChartSelection({
        selectedChartType: "State Data Summary",
        selectedAreaType: "State vs State",
        selectedEthnicityOne: "Hispanic",
      });


    }

  });

  const handleChange = (event) => {
    const { name, value } = event.target;

      if(name === "secondSelectedState"){
        const stateSettings = {
          'Georgia': { center: [32.7, -83.4], zoom: 7 },
          'New Jersey': { center: [40.1, -74.7], zoom: 7 },
        };
        const selectedStateSettings = stateSettings[value];

        setSecondMapSelection({
          ...secondMapSelection,
          selectedState: value,
          center: selectedStateSettings.center,
          zoom: selectedStateSettings.zoom,
        });
      }
      else if(name === "secondSelectedEthnicity"){
       let  newname = "selectedEthnicity";
        setSecondMapSelection(prevState => ({
          ...prevState,
          [newname]: value
        }));
      }
      else if(name === "secondSelectedChartType"){
        let newname = "selectedChartType"
        setSecondChartSelection(prevState => ({
          ...prevState,
          [newname]: value
        }));
      }

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
      else if(name === "selectedEthnicity"){
        setMapSelection(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
      else if(name === "selectedChartType"){
        setChartSelection(prevState => ({
          ...prevState,
          [name]: value
        }));
      }



  };
  const handleSubmit = (event) =>{
    event.preventDefault();
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
                <Form.Label>First State</Form.Label>
                <Form.Control as="select" name="selectedState" value={mapSelection.selectedState} onChange={handleChange}>
                  <option>Georgia</option>
                  <option>New Jersey</option>
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
                <Form.Label>Second Chart Type</Form.Label>
                <Form.Control as="select" name="selectedChartType" value={chartSelection.selectedChartType} onChange={handleChange}>
                  <option>State Data Summary</option>
                  <option>Bar Chart</option>
                  <option>Box and Whiskers</option>
                  <option>Gingles Plot</option>
                  <option>Ecological Inference</option>
                  <option>State Assembly Table</option>
                </Form.Control>
              </Form.Group>
            </Col>

          <Col xs={6} md={2}>
              <Form.Group controlId="selectState">
                <Form.Label>Second State</Form.Label>
                <Form.Control as="select" name="secondSelectedState" value={secondMapSelection.selectedState} onChange={handleChange}>
                  <option>Georgia</option>
                  <option>New Jersey</option>
                </Form.Control>
              </Form.Group>
            </Col>
            
            <Col xs={6} md={2}>
              <Form.Group controlId="selectEthnicity">
                <Form.Label>Ethnicity</Form.Label>
                <Form.Control as="select" name="secondSelectedEthnicity" value={secondMapSelection.selectedEthnicity} onChange={handleChange}>
                  <option>Hispanic</option>
                  <option>Asian</option>
                  <option>Black</option>
                  <option>White</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col xs={6} md={2}>
              <Form.Group controlId="selectChartType">
                <Form.Label>First Chart Type</Form.Label>
                <Form.Control as="select" name="secondSelectedChartType" value={secondChartSelection.selectedChartType} onChange={handleChange}>
                  <option>State Data Summary</option>
                  <option>Bar Chart</option>
                  <option>Box and Whiskers</option>
                  <option>Gingles Plot</option>
                  <option>Ecological Inference</option>
                  <option>State Assembly Table</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={6} md="auto" className="d-flex align-items-end pb-2">
              <Button variant="danger" size="lg" className="ms-2" onClick={reset}>Back</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
}
export default StatevStateHeader;