import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, ButtonGroup, Button, Card } from 'react-bootstrap';
import { linearSearchScript, binarySearchScript } from './SearchingScript';

export const AboutSearching = () => {
  return (
    <Container className="my-4">
      <Row className="g-4">
        <Col md={6}>
          <Card bg="dark" text="light" className="h-100">
            <Card.Body>
              <Card.Title>🔍 Linear Search</Card.Title>
              <Card.Text>
                <strong>Definition:</strong> Checks each element sequentially until finding the target.
              </Card.Text>
              <ul>
                <li>✅ Works on sorted & unsorted lists</li>
                <li>⌛ O(n) time complexity</li>
                <li>🔍 Simple implementation</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card bg="dark" text="light" className="h-100">
            <Card.Body>
              <Card.Title>📊 Binary Search</Card.Title>
              <Card.Text>
                <strong>Definition:</strong> Divides the list in half repeatedly to locate the target.
              </Card.Text>
              <ul>
                <li>⚠️ Requires sorted list</li>
                <li>⚡ O(log n) time complexity</li>
                <li>🔍 Divide and conquer approach</li>
              </ul>
              <div className="bg-warning text-dark p-2 rounded">
                <strong>Note:</strong> Binary Search requires sorted input!
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export const CodeBlock = () => {
  const [language1, setLanguage1] = useState('c');
  const [language2, setLanguage2] = useState('c');

  return (
    <Container className="my-4">
      <Row className="g-4">
        <Col md={6}>
          <h5 className="text-light mb-2">Linear Search Code</h5>
          <ButtonGroup className="mb-3 flex-wrap">
            {Object.keys(linearSearchScript).map((lang) => (
              <Button
                key={lang}
                variant={language1 === lang ? 'success' : 'secondary'}
                onClick={() => setLanguage1(lang)}
              >
                {lang.toUpperCase()}
              </Button>
            ))}
          </ButtonGroup>
          <Card bg="dark" text="light">
            <Card.Body>
              <pre><code>{linearSearchScript[language1]}</code></pre>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h5 className="text-light mb-2">Binary Search Code</h5>
          <ButtonGroup className="mb-3 flex-wrap">
            {Object.keys(binarySearchScript).map((lang) => (
              <Button
                key={lang}
                variant={language2 === lang ? 'success' : 'secondary'}
                onClick={() => setLanguage2(lang)}
              >
                {lang.toUpperCase()}
              </Button>
            ))}
          </ButtonGroup>
          <Card bg="dark" text="light">
            <Card.Body>
              <pre><code>{binarySearchScript[language2]}</code></pre>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};