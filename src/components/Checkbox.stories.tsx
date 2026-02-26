import type { Meta, StoryObj } from "@storybook/react-vite";
import Subject from "./Checkbox";
import { fn } from "storybook/test";

const meta = {
  component: Subject,
  args: {
    label: "some label",
    onChange: fn(),
  },
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
export const WhenChecked: Story = {
  args: {
    checked: true,
  },
};
