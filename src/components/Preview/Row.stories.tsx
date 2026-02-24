import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Subject from "./Row";

const meta = {
  component: Subject,
  args: {
    stitches: [],
    onClick: fn(),
  },
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
export const WithContent: Story = {
  args: {
    stitches: [true, false, true, false],
  },
};
