import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Subject from "./Pattern";

const meta = {
  component: Subject,
  args: {
    pattern: [],
    onClick: fn(),
  },
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
export const WithContent: Story = {
  args: {
    pattern: [
      [true, false, true, false],
      [true, false, true, false],
      [true, false, true, false],
    ],
  },
};
