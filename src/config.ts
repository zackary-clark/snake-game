import { getCSSVar } from "./helpers";
import { ColorHexValue } from "./types/ColorHexValue";

export const BOARD_SIZE: number = 20; // must be multiple of 4, for now
export const BORDER_SIZE: number = 4;
export const BORDER_COLOR: ColorHexValue = getCSSVar("bg1");
export const UNFILLED_SQUARE_COLOR: ColorHexValue = getCSSVar("bg0_h");
export const TICKS_PER_SECOND: number = 60;
export const SNAKE_SPEED: number = 10;
