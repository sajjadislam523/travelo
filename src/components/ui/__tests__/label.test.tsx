import { Label } from "@/components/ui/label";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Label component", () => {
    it("renders the label with children", () => {
        render(<Label htmlFor="test-input">Test Label</Label>);
        const labelElement = screen.getByText("Test Label");
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveAttribute("for", "test-input");
    });

    it("applies the provided className", () => {
        render(<Label className="custom-label-class">Another Label</Label>);
        const labelElement = screen.getByText("Another Label");
        expect(labelElement).toHaveClass("custom-label-class");
    });

    it("renders correctly without htmlFor prop", () => {
        render(<Label>Basic Label</Label>);
        const labelElement = screen.getByText("Basic Label");
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).not.toHaveAttribute("for");
    });
});
