const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
    <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
    <div class="data">
    <h1>${user.name ?? "Não possui nome cadastrado 🥲"}</h1>
    <p>${user.bio ?? "Não possui bio cadastrado 🥲"}</p>
    <p>👥 <b>${user.followers}</b> followers · <b>${
      user.following
    }</b> following</p>
    </div>
    </div>`;

    let repositoriesItems = "";
    user.repositories.forEach((repo) => {
      repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${repo.name} <br>
      <span class=repo-info>🍴 ${repo.forks_count}</span>  
      <span class=repo-info>⭐️ ${repo.stargazers_count}</span>  
      <span class=repo-info>👁️ ${repo.watchers_count}</span> 
      <span class=repo-info>🧑‍💻 ${repo.language}</span></a></li>`;
    });
    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
        <h2>Repositórios</h2>
        <ul>${repositoriesItems}</ul>
        </div>`;
    }

    let eventsItems = "";
    user.events.forEach((event) => {
      eventsItems += `<li><a href="${event.repo.url}" target="_blank">${
        event.repo.name
      }</a> - ${
        event.payload.commits ? event.payload.commits[0].message : ""
      }</li>`;
    });
    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class="events section">
        <h2>Eventos</h2>
        <ul>${eventsItems}</ul>
        </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
