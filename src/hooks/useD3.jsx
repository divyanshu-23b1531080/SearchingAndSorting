import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export const useD3 = (renderFn, deps) => {
  const ref = useRef();
  useEffect(() => {
    renderFn(d3.select(ref.current));
  }, deps);
  return ref;
};