import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [],
  "framework": "@storybook/react-vite",
  core: {
    builder: '@storybook/builder-vite',
  },
};
export default config;