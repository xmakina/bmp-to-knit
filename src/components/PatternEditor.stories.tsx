import type { Meta, StoryObj } from "@storybook/react-vite";
import Subject from "./PatternEditor";
import { fn } from "storybook/test";

const meta = {
  component: Subject,
  args: {
    pattern: [[]],
    onChange: fn(),
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
