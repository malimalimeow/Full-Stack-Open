import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const user_hello = {
  username: "hello",
  name: "hello",
  id: "6a33390abfa68f67a89de533",
};

const user_meow = {
  username: "meow",
  name: "hi",
  id: "6a29e5c42cc0ed6aa9088d73",
};

const blogs = [
  {
    title: "Deep Dive Into React Server Components",
    author: "Dan Abramov",
    url: "https://react.dev/blog/server-components",
    likes: 67,
    user: {
      username: "meow",
      name: "hi",
      id: "6a28817225e3006bf96718c0",
    },
    id: "6a29e5c42cc0ed6aa9088d73",
  },
];

test("renders content", () => {
  render(
    <BrowserRouter>
      <Blog blogs={blogs} id={blogs[0].id} />
    </BrowserRouter>,
  );

  const element = screen.getByText(
    "Dan Abramov:Deep Dive Into React Server Components",
  );
  expect(element).toBeDefined();
});

test("Blog information and the number of likes are displayed to unauthenticated users ", async () => {
  render(
    <BrowserRouter>
      <Blog blogs={blogs} id={blogs[0].id} />
    </BrowserRouter>,
  );

  const element_url = screen.getByText(
    "Url: https://react.dev/blog/server-components",
  );
  const element_like = screen.getByText("Like: 67");
  const like_button = screen.queryByText("like");
  const remove_button = screen.queryByText("remove");

  expect(element_url).toBeDefined();
  expect(element_like).toBeDefined();
  expect(like_button).toBeNull();
  expect(remove_button).toBeNull();
});

test("click Like button but no remove button with non creator user", async () => {
  const user = userEvent.setup();
  const mockHandler = vi.fn();
  render(
    <BrowserRouter>
      <Blog
        blogs={blogs}
        id={blogs[0].id}
        handleUpdate={mockHandler}
        user={user_hello}
      />
    </BrowserRouter>,
  );

  const button = screen.getByText("like");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);

  const remove_button = screen.queryByText("remove");
  expect(remove_button).toBeNull();
});

test("click Like button but no remove button with non creator user", async () => {
  const user = userEvent.setup();
  const mockHandler = vi.fn();
  render(
    <BrowserRouter>
      <Blog
        blogs={blogs}
        id={blogs[0].id}
        handleUpdate={mockHandler}
        user={user_meow}
      />
    </BrowserRouter>,
  );

  const button = screen.getByText("like");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);

  const remove_button = screen.queryByText("remove");
  expect(remove_button).toBeDefined();
});
