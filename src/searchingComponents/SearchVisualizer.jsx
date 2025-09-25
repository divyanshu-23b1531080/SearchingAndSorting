import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useD3 } from '../hooks/useD3';
import { renderSearchBars } from '../d3/renderSearchBars';
import './style.css';

const SearchVisualizer = () => {
  const [inputArray, setInputArray] = useState('');
  const [inputTarget, setInputTarget] = useState('');

  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(null);

  const [linearStep, setLinearStep] = useState(0);
  const [linearFoundIndex, setLinearFoundIndex] = useState(null);
  const [linearVisited, setLinearVisited] = useState([]);

  const [binaryBound, setBinaryBound] = useState({ left: 0, right: 0 });
  const [binaryMid, setBinaryMid] = useState(null);
  const [binaryFound, setBinaryFound] = useState(false);
  const [binaryVisited, setBinaryVisited] = useState([]);

  const [running, setRunning] = useState(false);
  const [searchKey, setSearchKey] = useState(0);

  const sortedArray = [...array].sort((a, b) => a - b);

  const linearSvgRef = useD3(
    svg => renderSearchBars(svg, array, { foundIndex: linearFoundIndex }, linearVisited),
    [array, linearVisited, linearFoundIndex, linearStep, searchKey]
  );

  const binarySvgRef = useD3(
    svg => renderSearchBars(svg, sortedArray, { foundIndex: binaryFound ? binaryMid : null }, binaryVisited),
    [sortedArray, binaryVisited, binaryFound, binaryMid, searchKey]
  );

  const startSearch = () => {
    const parsedArray = inputArray
      .split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n));
    const parsedTarget = parseInt(inputTarget.trim());

    if (!parsedArray.length || isNaN(parsedTarget)) return;

    setRunning(false);
    setLinearStep(0);
    setLinearFoundIndex(null);
    setLinearVisited([]);
    setBinaryBound({ left: 0, right: parsedArray.length - 1 });
    setBinaryMid(null);
    setBinaryVisited([]);
    setBinaryFound(false);

    setArray(parsedArray);
    setTarget(parsedTarget);
    setSearchKey(prev => prev + 1);
    setRunning(true);
  };

  useEffect(() => {
    if (!running || array.length === 0 || target === null) return;

    const delay = Math.max(300, 5000 / array.length);

    const timer = setTimeout(() => {
      if (linearStep < array.length && linearFoundIndex === null) {
        const current = linearStep;
        setLinearVisited(prev => [...prev, current]);

        if (array[current] === target) {
          setLinearFoundIndex(current);
        } else {
          setLinearStep(current + 1);
        }
      }

      if (!binaryFound && binaryBound.left <= binaryBound.right) {
        const mid = Math.floor((binaryBound.left + binaryBound.right) / 2);
        setBinaryMid(mid);

        const visitedRange =
          sortedArray[mid] < target
            ? Array.from({ length: mid - binaryBound.left + 1 }, (_, i) => binaryBound.left + i)
            : Array.from({ length: binaryBound.right - mid + 1 }, (_, i) => mid + i);

        setBinaryVisited(prev => Array.from(new Set([...prev, ...visitedRange])));

        if (sortedArray[mid] === target) {
          setBinaryFound(true);
        } else if (sortedArray[mid] < target) {
          setBinaryBound({ left: mid + 1, right: binaryBound.right });
        } else {
          setBinaryBound({ left: binaryBound.left, right: mid - 1 });
        }
      }

      const linearDone = linearFoundIndex !== null || linearStep >= array.length;
      const binaryDone = binaryFound || binaryBound.left > binaryBound.right;

      if (linearDone && binaryDone) {
        setRunning(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [linearStep, binaryBound, running, array, target, linearFoundIndex, binaryFound]);

  return (
    <Container className="my-4">
      <Row className="g-4 align-items-center">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Enter array (comma separated)"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="text"
            placeholder="Enter target value"
            value={inputTarget}
            onChange={(e) => setInputTarget(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button variant="success" onClick={startSearch} disabled={running}>
            Start Search
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6} className="mb-3">
          <h4 className="text-light">Linear Search</h4>
          <svg key={`linear-${searchKey}`} ref={linearSvgRef} width={400} height={300}></svg>
        </Col>
        <Col md={6} className="mb-3">
          <h4 className="text-light">Binary Search</h4>
          <svg key={`binary-${searchKey}`} ref={binarySvgRef} width={400} height={300}></svg>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchVisualizer;