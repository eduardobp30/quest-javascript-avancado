import { baseUrl, eventsQuantity } from "../variables.js";

async function getEvents(username) {
  const response = await fetch(
    `${baseUrl}/${username}/events?per_page=${eventsQuantity}`
  );
  return response.json();
}

export { getEvents };
