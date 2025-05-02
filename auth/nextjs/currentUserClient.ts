export async function getCurrentUserClient() {
  if (typeof window === "undefined") return null;

  try {
    const res = await fetch("/api/user", { method: "GET" });

    if (!res.ok) {
      console.error("Failed to fetch user:", res.statusText);
      return null;
    }

    const user = await res.json();
    console.log("User fetched successfully:", user);
    return user;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return null;
  }
}
