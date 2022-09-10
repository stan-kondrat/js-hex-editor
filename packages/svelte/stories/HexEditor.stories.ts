import { HexEditor, HexEditorProps } from '../src/index';

export default {
  title: "HexEditor/Examples",
  component: HexEditor,
  argTypes: {
    data: {
      table: {
        type: {
          summary: "ArrayBuffer",
        },
      },
      control: {
        type: null,
      },
    },
  },
};

const Template = (args) => ({
  Component: HexEditor,
  props: args,
});

const data = (length) => {
  var array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return array;
};

const random1024 = data(1024);

export const Base = Template.bind({});
Base.args = {
  data: random1024,
  height: "100%",
  width: "100%",
  bytesPerLine: 16,
} as HexEditorProps;
Base.parameters = {
  layout: "fullscreen",
};

export const Inline = Template.bind({});
Inline.args = {
  data: data(50),
  showFooter: false,
  showHeader: false,
  bytesPerLine: 8,
} as HexEditorProps;

export const Binary = Template.bind({});
Binary.args = {
  data: data(40),
  offsetBase: 2,
  dataBase: 2,
  bytesPerLine: 4,
} as HexEditorProps;

// const randomMega = new Uint8Array(1024*1024);
// for (let index = 0; index < 10; index++) {
//   randomMega.set(random1024, 1024*index)
// }
// export const Megabyte = Template.bind({});
// Megabyte.args = {
//   data: randomMega,
//   height: "100%",
//   width: "100%",
// } as HexEditorProps;
// Megabyte.parameters = {
//   layout: "fullscreen",
// };
