import { render, screen, fireEvent } from "@testing-library/react";
import Tabs from "./Tabs";

test("Renders Tabs component with default tab", () => {
  const tabs = [
    { label: "Tab 1", content: <div>Content for Tab 1</div> },
    { label: "Tab 2", content: <div>Content for Tab 2</div> },
  ];

  render(<Tabs tabs={tabs} />);

  // Verify that the default tab is displayed
  expect(screen.getByText("Tab 1")).toBeInTheDocument();
  expect(screen.queryByText("Content for Tab 2")).toBeNull();
});

test("Switches between tabs", () => {
  const tabs = [
    { label: "Tab 1", content: <div>Content for Tab 1</div> },
    { label: "Tab 2", content: <div>Content for Tab 2</div> },
  ];

  render(<Tabs tabs={tabs} />);

  // Click on Tab 2
  fireEvent.click(screen.getByText("Tab 2"));

  // Verify that Tab 2 is displayed
  expect(screen.getByText("Tab 2")).toBeInTheDocument();
  expect(screen.queryByText("Content for Tab 1")).toBeNull();

  // Click on Tab 1
  fireEvent.click(screen.getByText("Tab 1"));

  // Verify that Tab 1 is displayed
  expect(screen.getByText("Tab 1")).toBeInTheDocument();
  expect(screen.queryByText("Content for Tab 2")).toBeNull();
});

test("Verifies tab content", () => {
  const tabs = [
    { label: "Tab 1", content: <div>Content for Tab 1</div> },
    { label: "Tab 2", content: <div>Content for Tab 2</div> },
  ];

  render(<Tabs tabs={tabs} />);

  // By default, Tab 1 content should be displayed
  expect(screen.getByText("Content for Tab 1")).toBeInTheDocument();

  // Click on Tab 2
  fireEvent.click(screen.getByText("Tab 2"));

  // Verify that Tab 2 content is displayed
  expect(screen.getByText("Content for Tab 2")).toBeInTheDocument();
  expect(screen.queryByText("Content for Tab 1")).toBeNull();
});
