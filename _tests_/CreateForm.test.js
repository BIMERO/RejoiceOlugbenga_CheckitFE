import { render, screen } from "@testing-library/react";
// import user from "@testing-library/user-event";
import AddCapsuleModal from "../src/components/AddCapsuleModal";

test("it renders 8 inputs on the screen", () => {
  render(<AddCapsuleModal />);

  const inputFields = screen.getAllByRole("textbox");

  expect(inputFields.length).toBe(8);
});
