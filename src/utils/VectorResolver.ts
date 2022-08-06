const VectorResolver = {
  add: ([x, y]: Vector, [a, b]: Vector): Vector => [x + a, y + b],
  sub: ([x, y]: Vector, [a, b]: Vector): Vector => [x - a, y - b],
  mul: ([x, y]: Vector, [a, b]: Vector): Vector => [x * a, y * b],
};

export default VectorResolver;
