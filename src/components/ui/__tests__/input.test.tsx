import { Input } from "@/components/ui/input";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("Input component", () => {
    it("renders the input element", () => {
        render(<Input />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();
    });

    it("applies the provided className", () => {
        render(<Input className="custom-class" />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveClass("custom-class");
    });

    it("passes through other props like type and placeholder", () => {
        render(<Input type="email" placeholder="Enter email" />);
        const inputElement = screen.getByPlaceholderText("Enter email");
        expect(inputElement).toHaveAttribute("type", "email");
    });

    it("calls onChange handler when text is entered", async () => {
        const handleChange = vi.fn();
        render(<Input onChange={handleChange} />);
        const inputElement = screen.getByRole("textbox");
        await userEvent.type(inputElement, "hello");
        expect(handleChange).toHaveBeenCalledTimes(5); // "h", "e", "l", "l", "o"
    });

    it("disables the input when disabled prop is true", () => {
        render(<Input disabled />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeDisabled();
    });
});
