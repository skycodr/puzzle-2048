export const REVERSE = 1;
export const FORWARD = -1;

export const DIRECTIONS: TileSlideDirection = {
  Left: REVERSE,
  Right: FORWARD,
  Up: REVERSE,
  Down: FORWARD,
};

export const FONT_SIZES: Record<number, number> = {
  1: 72,
  2: 72,
  3: 48,
  4: 36,
};

export const TILE_COLORS: Record<number, string> = {
  0: "#DBD0CC",
  2: "#86F002",
  4: "#D9AB07",
  8: "#F05D05",
  16: "#E60B69",
  32: "#07CDD9",
  64: "#00858C",
  128: "#70CDDB",
  256: "#DD77C5",
  512: "#DB0C8D",
  1024: "#FF6C50",
  2048: "#D92A07",
};

export const KEYBOARD_SCHEME_A: ControlScheme<ControlScheme_A> = {
  ArrowLeft: "Left",
  ArrowRight: "Right",
  ArrowUp: "Up",
  ArrowDown: "Down",
};
export const KEYBOARD_SCHEME_B: ControlScheme<ControlScheme_B> = {
  a: "Left",
  d: "Right",
  w: "Up",
  s: "Down",
};

export const WON = 1;
export const LOSS = -1;
export const PLAYING = 0;
