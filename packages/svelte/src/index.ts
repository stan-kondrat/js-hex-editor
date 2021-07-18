import HexEditor from "./HexEditor.svelte";
import type { NumberBase } from "./NumberBase";

export default HexEditor;

export interface HexEditorProps
  extends Partial<{
    data: ArrayBuffer;
    readonly: boolean;
    showHeader: boolean;
    showFooter: boolean;
    height: string;
    width: string;
    offsetBase: NumberBase;
    dataBase: NumberBase;
    bytesPerLine: number;
    start: number;
    end: number;
  }> {}
