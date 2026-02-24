import type { Meta, StoryObj } from "@storybook/react-vite";
import Subject from "./PatternCreator";

const meta = {
  component: Subject,
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
