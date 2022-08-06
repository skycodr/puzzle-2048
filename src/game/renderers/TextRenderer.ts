import { FONT_SIZES } from "../../fixtures";

const defaultOptions: TextRenderOptions = { renderZeros: false };

const TextRenderer: ISubRenderer = (surface: Surface): ITextRenderer => {
  return (value, [x, y], { renderZeros } = defaultOptions) => {
    if (!surface || (!value && !renderZeros)) return;

    const sValue = value.toString();
    surface.fillStyle = "black";
    surface.textAlign = "center";
    surface.textBaseline = "middle";
    surface.font = `bold ${FONT_SIZES[sValue.length]}px monospace`;
    surface.fillText(sValue, x, y);
  };
};

export default TextRenderer;
