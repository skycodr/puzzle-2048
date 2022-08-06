const Numbers = {
  randomRange: (min: number, max: number) =>
    ~~(Math.random() * (max - min + 1)) + min,
};

export default Numbers;
