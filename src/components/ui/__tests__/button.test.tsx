import { Button } from "@/components/ui/button";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Button component", () => {
    it("renders the button with children", () => {
        render(<Button>Click me</Button>);
        const buttonElement = screen.getByRole("button", { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
    });

    it("applies the default variant", () => {
        render(<Button>Click me</Button>);
        const buttonElement = screen.getByRole("button", { name: /click me/i });
        expect(buttonElement).toHaveClass("bg-primary");
    });

    it("applies a specified variant", () => {
        render(<Button variant="destructive">Click me</Button>);
        const buttonElement = screen.getByRole("button", { name: /click me/i });
        expect(buttonElement).toHaveClass("bg-destructive");
    });

    it("disables the button when disabled prop is true", () => {
        render(<Button disabled>Click me</Button>);
        const buttonElement = screen.getByRole("button", { name: /click me/i });
        expect(buttonElement).toBeDisabled();
    });
});
