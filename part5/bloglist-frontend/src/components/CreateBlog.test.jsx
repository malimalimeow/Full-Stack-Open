import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";
import { BrowserRouter } from "react-router-dom";

test("<CreateBlog/> create a blog and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  const testTools = {
    handleCreate: createBlog,
    setMessage: vi.fn(),
    setIsError: vi.fn(),
  };

  render(
    <BrowserRouter>
      <CreateBlog tools={testTools} />
    </BrowserRouter>,
  );

  const input_title = screen.getByLabelText("Title:");
  const input_Url = screen.getByLabelText("Url:");
  const input_Author = screen.getByLabelText("Author:");
  const sendButton = screen.getByText("Create Blog");

  await user.type(input_title, "Go To Statement Considered Harmful");
  await user.type(input_Author, "Edsger W. Dijkstra");
  await user.type(
    input_Url,
    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  );
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "Go To Statement Considered Harmful",
  );
});
