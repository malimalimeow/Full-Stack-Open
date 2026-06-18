import { test, expect } from "@playwright/test";
import { loginWith, createBlog } from "./helper";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: { name: "test", username: "test", password: "test" },
    });
    await request.post("/api/users", {
      data: { name: "fake", username: "fake", password: "fake" },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = page.getByText("Log in to application");
    await expect(locator).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await expect(page.getByText("login")).toBeVisible();
  });

  test.describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "test", "test");
      await expect(page.getByText("test logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "test", "wrong");
      await expect(
        page.getByText("Failed to login because invalid username or password"),
      ).toBeVisible();
    });
  });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "test", "test");
      await page.getByRole("button", { name: "Create Blog" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "test", "test", "test");
      await expect(
        page.getByText("A new blog test by test added"),
      ).toBeVisible();
      await expect(page.getByText("test-test")).toBeVisible();
    });

    test.describe("After logged in", () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(page, "test", "test", "test");
        await page.getByRole("button", { name: "show" }).click();
      });

      test("Blog can be liked", async ({ page }) => {
        await expect(page.getByText("Like: 0")).toBeVisible();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("Like: 1")).toBeVisible();
      });

      test("Blog can be deleted by the creator", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "Remove" }).click();
        await expect(page.getByText("Blog deleted")).toBeVisible();
        await expect(page.getByText("test-test")).not.toBeVisible();
      });

      test("the blogs are arranged in the order according to the likes in descending order", async ({
        page,
      }) => {
        await createBlog(page, "second Test", "second Test", "second Test");
        await page
          .getByText("second Test")
          .getByRole("button", { name: "show" })
          .click();

        const blogs = await page.getByTestId("blogTest");
        await expect(blogs.nth(0)).toContainText("test");
        await expect(blogs.nth(1)).toContainText("second Test");
        await blogs.nth(1).getByRole("button", { name: "like" }).click();
        await expect(blogs.nth(0)).toContainText("second Test");
        await expect(blogs.nth(1)).toContainText("test");
      });

      test.describe("new user add", () => {
        test.beforeEach(async ({ page }) => {
          await page.getByRole("button", { name: "log out" }).click();
          await loginWith(page, "fake", "fake");
          await page.getByRole("button", { name: "show" }).click();
        });

        test("non-creator can't see remove button", async ({ page }) => {
          await expect(
            page.getByRole("button", { name: "Remove" }),
          ).not.toBeVisible();
        });
      });
    });
  });
});
