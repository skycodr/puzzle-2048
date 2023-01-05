const IndexRenderer: ISubRenderer =
  (surface: Surface): IIndexRenderer =>
  (value, [x, y]) => {
    if (!surface) return;
    surface.fillStyle = "black";
    surface.textAlign = "end";
    surface.textBaseline = "bottom";
    surface.font = `bold 18px monospace`;
    surface.fillText(value.toString(), x, y);
  };

export default IndexRenderer;
