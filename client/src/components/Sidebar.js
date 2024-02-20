import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Sidebar() {
  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col className="bg-secondary sidebar d-flex flex-column justify-content-between">
          <div>
            <Form className="text-white">
              <Form.Group controlId="selectState">
                <Form.Label>Select State</Form.Label>
                <Form.Control as="select" custom>
                  <option>Choose...</option>
                  <option>Georgia</option>
                  <option>New Jersey</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="selectEthnicity">
                <Form.Label>Select Ethnicity</Form.Label>
                <Form.Control as="select" custom>
                    <option>Choose...</option>
                    <option>Asian</option>
                    <option>Black</option>
                    <option>Hispanic</option>
                    <option>White</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="selectChartType">
                <Form.Label>Select Chart Type</Form.Label>
                <Form.Control as="select" custom>
                    <option>Choose...</option>
                    <option>Bar Chart</option>
                    <option>Box and Whiskers</option>
                    <option>Scatter Plot</option>
                    <option>Pie Chart</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="selectSpecificPrecinct">
                <Form.Label>Select Specific Precinct</Form.Label>
                <Form.Control as="select" custom>
                    <option>Choose...</option>
                    <option>Precinct 1</option>
                    <option>Precinct 2</option>
                    <option>Precinct 3</option>
                    <option>Precinct 4</option>
                    <option>Precinct 5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="compareGroups">
                <Form.Label>Select Ethnicities To Compare</Form.Label>
                <Form.Control as="select" custom>
                    <option>Choose...</option>
                    <option>Asian</option>
                    <option>Black</option>
                    <option>Hispanic</option>
                    <option>White</option>
                </Form.Control>
                <Form.Control as="select" custom>
                    <option>Choose...</option>
                    <option>Asian</option>
                    <option>Black</option>
                    <option>Hispanic</option>
                    <option>White</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
          <div>
            <Button variant="primary">Apply</Button> {/* Add a button */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Sidebar;