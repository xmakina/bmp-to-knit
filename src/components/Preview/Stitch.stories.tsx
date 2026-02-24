import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Subject from "./Stitch";

const meta = {
    component: Subject,
    args: {
        onClick: fn()
    },
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
export const WhenActive: Story = {
    args: {
        active: true
    }
}