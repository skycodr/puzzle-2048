const MatrixResolver = (columns: number) => {
  const l2m = (i: number) => [~~(i / columns), i % columns];
  const m2l = ([x, y]: Point) => x * columns + y;
  const trn = (matrix: Matrix) => {
    const l = matrix.length * matrix[0].length;

    for (let k = 0; k < l; k++) {
      const [i, j] = l2m(k);
      if (j < i) continue;

      const tmp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = tmp;
    }
  };

  return { l2m, m2l, trn };
};

export default MatrixResolver;
