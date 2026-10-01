import { useEffect, useState } from "react";

// Returns the current date & time, refreshed every second, so anything
// showing it (the top bar clock, later the lock screen) stays live.
export default function useNow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    // Stop the timer if the component using this goes away.
    return () => clearInterval(id);
  }, []);

  return now;
}
