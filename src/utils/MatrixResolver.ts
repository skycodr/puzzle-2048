const MatrixResolver = (columns: number) => {
  return {
    l2m: (i: number) => [~~(i / columns), i % columns],
    m2l: ([x, y]: Vector) => x * columns + y,
    trn: (matrix: Matrix) => {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < i; j++) {
          const tmp = matrix[i][j];
          matrix[i][j] = matrix[j][i];
          matrix[j][i] = tmp;
        }
      }
    },
  };
};

export default MatrixResolver;
