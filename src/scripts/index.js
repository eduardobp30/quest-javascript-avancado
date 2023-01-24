"use strict";

import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

function validateEmptyInput(username) {
  if (username.length === 0) {
    alert("Preencha o campo com o nome do usuário do GitHub.");
    return true;
  }
}

document.getElementById("btn-search").addEventListener("click", () => {
  const username = document.getElementById("input-search").value;
  if (validateEmptyInput(username)) return;
  getUserData(username);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const username = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if (validateEmptyInput(username)) return;
    getUserData(username);
  }
});

async function getUserData(username) {
  const userResponse = await getUser(username);
  console.log(userResponse);
  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }
  const repositoriesResponse = await getRepositories(username);
  console.log(repositoriesResponse);
  const eventsResponse = await getEvents(username);
  console.log(eventsResponse);
  const eventsFilter = eventsResponse.filter(
    (event) => event.type === "CreateEvent" || event.type === "PushEvent"
  );
  console.log(eventsFilter);
  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  user.setEvents(eventsFilter);
  screen.renderUser(user);
}
