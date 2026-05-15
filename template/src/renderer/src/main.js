import "./style.css";

const versions = window.electronAPI?.versions ?? {};

document.querySelector("#app").innerHTML = `
  <main class="starter-shell">
    <section class="starter-card">
      <p class="starter-eyebrow">Electron starter</p>
      <h1>Choose Tailwind CSS or Bootstrap 5 when you scaffold your app.</h1>
      <p class="starter-copy">
        This base renderer gets replaced by the framework-specific homepage during project creation.
      </p>

      <dl class="starter-stats">
        <div>
          <dt>Electron</dt>
          <dd>${versions.electron ?? "Unavailable"}</dd>
        </div>
        <div>
          <dt>Node.js</dt>
          <dd>${versions.node ?? "Unavailable"}</dd>
        </div>
        <div>
          <dt>Chromium</dt>
          <dd>${versions.chrome ?? "Unavailable"}</dd>
        </div>
      </dl>
    </section>
  </main>
`;
