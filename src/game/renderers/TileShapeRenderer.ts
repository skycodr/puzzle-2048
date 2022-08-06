const TileShapeRenderer: ISubRenderer =
  (surface: Surface): ITileShapeRenderer =>
  ([x, y], [w, h], color: string) => {
    if (!surface) return;
    surface.fillStyle = color;
    surface.fillRect(x, y, w, h);
    surface.strokeRect(x, y, w, h);
  };

export default TileShapeRenderer;
