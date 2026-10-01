import { useEffect, useState } from "react";
import { fetchWall, type WallDoodle } from "./fetchWall";

// The doodle wall: approved doodles as little polaroid-style cards.
// Handles all three "waiting" situations: loading, error, and empty.
export default function DoodleWall() {
  const [doodles, setDoodles] = useState<WallDoodle[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  // Bumping this number re-runs the effect below (used by "Try again").
  const [attempt, setAttempt] = useState(0);

  // Load the doodles when the wall appears (and again on each retry).
  useEffect(() => {
    // If the wall closes before the answer arrives, ignore the answer
    // instead of updating a component that's no longer on screen.
    let ignore = false;

    fetchWall()
      .then((result) => {
        if (ignore) return;
        setDoodles(result);
        setStatus("ready");
      })
      .catch((err) => {
        if (ignore) return;
        console.error(err);
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  const retry = () => {
    setStatus("loading");
    setAttempt((n) => n + 1);
  };

  if (status === "loading") {
    return <p className="py-10 text-center text-sm text-text-faint">Loading doodles…</p>;
  }

  if (status === "error") {
    return (
      <div className="space-y-3 py-10 text-center text-sm text-text-muted">
        <p>The doodle wall is taking a nap. Please try again in a bit.</p>
        <button
          type="button"
          onClick={retry}
          className="rounded-md border border-line px-3 py-1 text-xs font-medium text-text hover:bg-cream"
        >
          Try again
        </button>
      </div>
    );
  }

  if (doodles.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-text-muted">
        No doodles yet. Be the first to leave one! ✿
      </p>
    );
  }

  return (
    // auto-fill grid: as many ~150px columns as fit, so it adapts to the window size
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
      {doodles.map((d, i) => (
        <li
          key={d.id}
          // Alternate a slight tilt, like photos pinned to a board
          className={`rounded-md bg-white p-2 pb-3 shadow-md transition hover:rotate-0 hover:scale-105 ${
            i % 2 === 0 ? "-rotate-1" : "rotate-1"
          }`}
        >
          <img
            src={d.imageUrl}
            alt={d.name ? `Doodle by ${d.name}` : "Doodle by an anonymous visitor"}
            loading="lazy" // only download images when they're scrolled into view
            className="aspect-[600/360] w-full rounded-sm border border-neutral-200 object-cover"
          />
          <p className="mt-2 truncate text-center font-indie text-sm text-neutral-700">
            {d.name ?? "anonymous"}
          </p>
          <p className="text-center text-[10px] text-neutral-400">
            {new Date(d.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </li>
      ))}
    </ul>
  );
}
