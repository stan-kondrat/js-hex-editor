import * as React from "react";

import JsHexEditor from "js-hex-editor";
import type { HexEditorProps as JsHexEditorProps } from "js-hex-editor";

export type HexEditorProps = JsHexEditorProps;

export class HexEditor extends React.PureComponent<HexEditorProps> {
  private instance: JsHexEditor | undefined;
  private containerRef = React.createRef();
  private container = React.createElement("div", {
    ref: this.containerRef,
    height: this.props.height,
    width: this.props.width,
  });

  public componentDidMount() {
    this.instance = new JsHexEditor({
      target: this.containerRef.current as Element,
      props: this.props,
    });
  }

  public componentDidUpdate() {
    this.instance?.$set(this.props);
  }

  public componentWillUnmount() {
    this.instance?.$destroy();
  }

  public render() {
    return this.container;
  }
}
