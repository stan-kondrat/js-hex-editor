module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/svelte",
  svelteOptions: {
    preprocess: require("svelte-preprocess")()
  },
  core: {
    disableTelemetry: true,
  },
}
