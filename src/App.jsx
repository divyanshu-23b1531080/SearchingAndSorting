import React, { useState } from 'react';
import { Container, Navbar, Button, Offcanvas } from 'react-bootstrap';
import { AboutSearching, CodeBlock } from './searchingComponents/Searching';
import SearchVisualizer from './searchingComponents/SearchVisualizer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState('searching');

  const sectionTitles = {
    searching: '🔍 Searching',
    sorting: '📊 Sorting',
  };

  return (
    <div className="bg-black text-white min-vh-100">
      {/* Header */}
      <Navbar bg="dark" variant="dark" className="px-3 py-2 border-bottom">
        <Button variant="outline-light" onClick={() => setShowSidebar(true)} className="me-3">
          ☰
        </Button>
        <Navbar.Brand className="fs-4">{sectionTitles[activeSection]}</Navbar.Brand>
      </Navbar>

      {/* Sidebar (Offcanvas) */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} backdrop="static" scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <Button
            variant={activeSection === 'searching' ? 'success' : 'secondary'}
            className="mb-2"
            onClick={() => {
              setActiveSection('searching');
              setShowSidebar(false);
            }}
          >
            🔍 Searching
          </Button>
          <Button
            variant={activeSection === 'sorting' ? 'success' : 'secondary'}
            className="mb-2"
            onClick={() => {
              setActiveSection('sorting');
              setShowSidebar(false);
            }}
          >
            📊 Sorting
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <Container className="my-4">
        {activeSection === 'searching' && (
          <>
            <AboutSearching />
            <CodeBlock />
            <SearchVisualizer />
          </>
        )}

        {activeSection === 'sorting' && (
          <div className="bg-dark text-light p-4 rounded">
            <h2>Sorting Visualizer</h2>
            <p>Coming soon: Bubble Sort, Merge Sort, Quick Sort animations.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;