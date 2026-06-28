import { beforeEach, describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  },
}));

import anecdoteService from "../src/service/anecdoteService.js";
import useAnecdoteStore, {
  useAnecdotes,
  useAnecdotesAction,
  useFilter,
} from "../src/store.js";

beforeEach(() => {
  useNoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});
