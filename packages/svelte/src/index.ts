export { default as HexEditor } from "./HexEditor.svelte";
import { NumberBase as _NumberBase } from "./NumberBase";

export const NumberBase = _NumberBase;

export interface HexEditorProps
  extends Partial<{
    data: ArrayBuffer;
    readonly: boolean;
    showHeader: boolean;
    showFooter: boolean;
    height: string;
    width: string;
    offsetBase: _NumberBase;
    dataBase: _NumberBase;
    bytesPerLine: number;
    start: number;
    end: number;
  }> {}
