import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("../src/service/anecdoteService.js", () => ({
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
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("useAnecdotesAction", () => {
  it("initialize loads anecdotes from service", async () => {
    const mockAnecdotes = [
      {
        content: "If it hurts, do it more often",
        id: "47145",
        votes: 7,
      },
    ];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdotesAction());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });

  it("add appends a new anecdote", async () => {
    const newAnecdote = {
      content: "Adding manpower to a late software project makes it later!",
      id: "21149",
      votes: 15,
    };
    anecdoteService.createNew.mockResolvedValue(newAnecdote);

    const { result } = renderHook(() => useAnecdotesAction());

    await act(async () => {
      await result.current.add("newAnecdote");
    });

    const { result: anecdoteResult } = renderHook(() => useAnecdotes());
    expect(anecdoteResult.current).toContainEqual(newAnecdote);
  });
});

describe("useAnecdotes filtering, voting and sorting", () => {
  const anecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 14,
    },
    {
      content: "Adding manpower to a late software project makes it later!",
      id: "21149",
      votes: 15,
    },
  ];

  beforeEach(() => {
    const copyAnecdotes = JSON.parse(JSON.stringify(anecdotes));
    useAnecdoteStore.setState({ anecdotes: copyAnecdotes, filter: "" });
  });

  //filter

  it("returns all notes with no filter", () => {
    const { result } = renderHook(() => useAnecdotes());
    expect(result.current).toHaveLength(2);
  });

  it("filter with words", () => {
    const copyAnecdotes = JSON.parse(JSON.stringify(anecdotes));
    useAnecdoteStore.setState({ anecdotes: copyAnecdotes, filter: "to" });
    const { result } = renderHook(() => useAnecdotes());
    expect(result.current[0].id).toEqual("21149");
  });

  //vote

  it(" increases the number of votes when voting", async () => {
    vi.spyOn(anecdoteService, "update").mockImplementation((id, updatedObj) => {
      return Promise.resolve(updatedObj);
    });
    const { result } = renderHook(() => useAnecdotesAction());

    await act(async () => {
      await result.current.vote("47145");
    });
    const { result: anecdoteResult } = renderHook(() => useAnecdotes());
    expect(anecdoteResult.current[0].votes).toEqual(15);
  });

  it("display anecdotes receives the anecdotes from the store sorted by votes", async () => {
    vi.spyOn(anecdoteService, "update").mockImplementation((id, updatedObj) => {
      return Promise.resolve(updatedObj);
    });
    const { result: anecdoteResult } = renderHook(() => useAnecdotes());
    console.log(anecdoteResult);
    expect(anecdoteResult.current[0].id).toEqual("21149");

    const { result } = renderHook(() => useAnecdotesAction());

    await act(async () => {
      await result.current.vote("47145");
      await result.current.vote("47145");
    });
    expect(anecdoteResult.current[0].id).toEqual("47145");
  });
});
