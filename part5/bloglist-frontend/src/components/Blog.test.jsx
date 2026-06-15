import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

const blog = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  user: "cat",
};

test("renders content", () => {
  render(<Blog blog={blog} />);

  const element = screen.getByText("React patterns-Michael Chan");
  expect(element).toBeDefined();
});

test("the blog's URL and number of likes are shown when show clicked", async () => {
  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const element_url = screen.getByText("Url: https://reactpatterns.com/");
  const element_like = screen.getByText("Like: 7");

  expect(element_url).toBeDefined();
  expect(element_like).toBeDefined();
});

test("click Like button twice could call the function twice", async () => {
  const user = userEvent.setup();
  const mockHandler = vi.fn();
  render(<Blog blog={blog} handleUpdate={mockHandler} />);

  const toShow = screen.getByText("show");
  await user.click(toShow);

  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
