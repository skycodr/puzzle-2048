const VectorResolver = {
  add: ([x, y]: Point, [a, b]: Point): Point => [x + a, y + b],
  sub: ([x, y]: Point, [a, b]: Point): Point => [x - a, y - b],
  mul: ([x, y]: Point, [a, b]: Point): Point => [x * a, y * b],
};

export default VectorResolver;
