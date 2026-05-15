#!/usr/bin/env node
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultProjectName = "electron-vite-app";

const color = {
  cyan: (value) => `\x1b[36m${value}\x1b[0m`,
  green: (value) => `\x1b[32m${value}\x1b[0m`,
  red: (value) => `\x1b[31m${value}\x1b[0m`,
  yellow: (value) => `\x1b[33m${value}\x1b[0m`,
};

const frameworkOptions = [
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "bootstrap", label: "Bootstrap 5" },
];

const frameworkConfigs = {
  tailwind: {
    displayName: "Tailwind CSS",
    readyMessage: "Electron + Vite + Tailwind CSS is ready.",
    packageJson: {
      devDependencies: {
        "@tailwindcss/vite": "^4.1.13",
        tailwindcss: "^4.1.13",
      },
    },
    viteConfig: `import { defineConfig } from "electron-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    plugins: [tailwindcss()],
  },
});
`,
    mainJs: `import "./style.css";

const versions = window.electronAPI?.versions ?? {};

document.querySelector("#app").innerHTML = \`
  <main class="min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-slate-100">
    <div class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
      <section class="w-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-slate-950/50 backdrop-blur sm:p-12">
        <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="space-y-8 text-center lg:text-left">
            <p class="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
              Electron + Tailwind CSS
            </p>
            <div class="space-y-5">
              <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your desktop app is styled and ready from the first run.
              </h1>
              <p class="mx-auto max-w-2xl text-base leading-8 text-slate-300 lg:mx-0 lg:text-lg">
                Build on top of a prewired Electron + Vite starter with Tailwind CSS already connected to the renderer.
              </p>
            </div>
            <div class="flex flex-wrap justify-center gap-3 text-sm text-slate-200 lg:justify-start">
              <span class="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2">Electron shell</span>
              <span class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">Tailwind v4</span>
              <span class="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2">Vite renderer</span>
            </div>
          </div>

          <div class="space-y-6">
            <div class="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.22),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(45,212,191,0.18),_transparent_30%)]"></div>
              <div class="relative flex flex-col items-center gap-8">
                <div class="flex items-center gap-6">
                  <div class="tailwind-logo drop-shadow-[0_0_18px_rgba(34,211,238,0.38)]">
                    <svg viewBox="0 0 256 154" aria-hidden="true" class="h-20 w-32 text-cyan-300">
                      <path
                        fill="currentColor"
                        d="M128 0C93.867 0 72.533 17.067 64 51.2c12.8-17.067 27.733-23.467 44.8-19.2 9.738 2.435 16.705 9.51 24.418 17.34C145.786 62.1 160.338 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.738-2.435-16.705-9.51-24.418-17.34C174.214 14.7 159.662 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.738 2.435 16.705 9.51 24.418 17.34C81.786 138.9 96.338 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.738-2.435-16.705-9.51-24.418-17.34C110.214 91.5 95.662 76.8 64 76.8Z"
                      />
                    </svg>
                  </div>
                  <div class="electron-logo drop-shadow-[0_0_16px_rgba(96,165,250,0.28)]">
                    <svg viewBox="0 0 256 256" aria-hidden="true" class="h-28 w-28 text-sky-300">
                      <g fill="none" stroke="currentColor" stroke-width="10">
                        <ellipse cx="128" cy="128" rx="104" ry="42" />
                        <ellipse cx="128" cy="128" rx="42" ry="104" transform="rotate(60 128 128)" />
                        <ellipse cx="128" cy="128" rx="42" ry="104" transform="rotate(120 128 128)" />
                      </g>
                      <circle cx="128" cy="128" r="18" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                <dl class="grid w-full gap-3 text-sm sm:grid-cols-3">
                  <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center">
                    <dt class="text-slate-400">Electron</dt>
                    <dd class="mt-2 font-semibold text-white">\${versions.electron ?? "Unavailable"}</dd>
                  </div>
                  <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center">
                    <dt class="text-slate-400">Node.js</dt>
                    <dd class="mt-2 font-semibold text-white">\${versions.node ?? "Unavailable"}</dd>
                  </div>
                  <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center">
                    <dt class="text-slate-400">Chromium</dt>
                    <dd class="mt-2 font-semibold text-white">\${versions.chrome ?? "Unavailable"}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
\`;
`,
    styleCss: `@import "tailwindcss";

:root {
  color-scheme: dark;
}

html,
body {
  margin: 0;
  min-height: 100%;
  background: #020617;
}

body {
  font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

* {
  box-sizing: border-box;
}
`,
  },
  bootstrap: {
    displayName: "Bootstrap 5",
    readyMessage: "Electron + Vite + Bootstrap 5 is ready.",
    packageJson: {
      dependencies: {
        bootstrap: "^5.3.7",
      },
    },
    viteConfig: `import { defineConfig } from "electron-vite";

export default defineConfig({
  main: {},
  preload: {},
  renderer: {},
});
`,
    mainJs: `import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const versions = window.electronAPI?.versions ?? {};

document.querySelector("#app").innerHTML = \`
  <main class="bootstrap-shell d-flex align-items-center justify-content-center min-vh-100 px-3 py-5">
    <section class="bootstrap-panel container-xl">
      <div class="row g-5 align-items-center">
        <div class="col-lg-6 text-center text-lg-start">
          <p class="framework-label mb-3">Electron + Bootstrap 5</p>
          <h1 class="display-4 fw-semibold text-white">Start with a polished Electron desktop shell on day one.</h1>
          <p class="lead text-white-50 mt-4 mb-0">
            Your renderer already includes Bootstrap 5 so you can build layouts, forms, and dashboards immediately.
          </p>
        </div>

        <div class="col-lg-6">
          <div class="logo-card text-center">
            <div class="d-flex align-items-center justify-content-center gap-4 flex-wrap">
              <div class="bootstrap-badge">
                <svg viewBox="0 0 256 204" aria-hidden="true" class="framework-icon bootstrap-logo">
                  <path
                    fill="currentColor"
                    d="M0 28C0 12.536 12.536 0 28 0h200c15.464 0 28 12.536 28 28v148c0 15.464-12.536 28-28 28H28c-15.464 0-28-12.536-28-28V28Zm62.324 32.588c0-2.752 2.226-4.978 4.978-4.978h79.637c23.86 0 38.36 12.882 38.36 31.956 0 14.854-9.09 24.176-22.324 27.536v.554c17.06 1.522 28.012 13.112 28.012 30.756 0 22.26-17.88 35.978-46.158 35.978H67.302a4.978 4.978 0 0 1-4.978-4.978V60.588Zm29.344 12.53v34.62h42.916c13.114 0 20.51-6.188 20.51-17.296 0-11.004-7.284-17.324-20.26-17.324H91.668Zm0 56.07v38.084h47.35c15.704 0 23.988-6.482 23.988-18.694 0-12.544-8.99-19.39-25.286-19.39H91.668Z"
                  />
                </svg>
              </div>
              <div class="electron-badge">
                <svg viewBox="0 0 256 256" aria-hidden="true" class="framework-icon electron-logo">
                  <g fill="none" stroke="currentColor" stroke-width="10">
                    <ellipse cx="128" cy="128" rx="104" ry="42" />
                    <ellipse cx="128" cy="128" rx="42" ry="104" transform="rotate(60 128 128)" />
                    <ellipse cx="128" cy="128" rx="42" ry="104" transform="rotate(120 128 128)" />
                  </g>
                  <circle cx="128" cy="128" r="18" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div class="row g-3 mt-4">
              <div class="col-sm-4">
                <div class="version-card h-100">
                  <div class="small text-uppercase text-secondary">Electron</div>
                  <div class="fw-semibold fs-5 text-white mt-2">\${versions.electron ?? "Unavailable"}</div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="version-card h-100">
                  <div class="small text-uppercase text-secondary">Node.js</div>
                  <div class="fw-semibold fs-5 text-white mt-2">\${versions.node ?? "Unavailable"}</div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="version-card h-100">
                  <div class="small text-uppercase text-secondary">Chromium</div>
                  <div class="fw-semibold fs-5 text-white mt-2">\${versions.chrome ?? "Unavailable"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
\`;
`,
    styleCss: `:root {
  color-scheme: dark;
  font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background: #0b1120;
}

html,
body {
  margin: 0;
  min-height: 100%;
  background:
    radial-gradient(circle at top, rgba(124, 58, 237, 0.28), transparent 30%),
    radial-gradient(circle at bottom, rgba(59, 130, 246, 0.2), transparent 34%),
    linear-gradient(180deg, #020617 0%, #111827 100%);
}

* {
  box-sizing: border-box;
}

.bootstrap-panel {
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 2rem;
  background: rgba(15, 23, 42, 0.82);
  box-shadow: 0 28px 90px rgba(2, 6, 23, 0.46);
  backdrop-filter: blur(16px);
  padding: clamp(1.5rem, 2vw, 2.5rem);
}

.framework-label {
  color: #c4b5fd;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.logo-card {
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 1.75rem;
  background: rgba(15, 23, 42, 0.76);
  padding: 2rem;
}

.framework-icon {
  width: 6rem;
  height: 6rem;
}

.bootstrap-logo {
  color: #c084fc;
}

.electron-logo {
  color: #7dd3fc;
}

.bootstrap-badge,
.electron-badge {
  width: 8.5rem;
  height: 8.5rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.86);
  border: 1px solid rgba(148, 163, 184, 0.16);
}

.version-card {
  border-radius: 1.1rem;
  border: 1px solid rgba(148, 163, 184, 0.14);
  background: rgba(15, 23, 42, 0.86);
  padding: 1rem;
}
`,
  },
};

function printHelp() {
  console.log(`
Usage:
  npx create-electron-vite-tailwindcss
  npx create-electron-vite-tailwindcss my-app
  npm create electron-vite-tailwindcss my-app
  npx create-electron-vite-tailwindcss my-app --install

You will be prompted for:
  - application name
  - CSS framework (Tailwind CSS or Bootstrap 5)

Do not use:
  npx create electron-vite-tailwindcss

That runs a different package named "create" instead of this generator.

Options:
  --help, -h       Show this help message
  --install        Install dependencies after scaffolding
  --no-install     Explicitly skip dependency installation
`);
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]+/, "")
    .replace(/[^a-z0-9-~]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  );
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function prompt(question, initialValue) {
  const rl = readline.createInterface({ input, output });

  try {
    const suffix = initialValue ? ` (${initialValue})` : "";
    const answer = await rl.question(`${question}${suffix}: `);
    return answer.trim() || initialValue;
  } finally {
    rl.close();
  }
}

async function confirm(question) {
  const answer = await prompt(`${question} [y/N]`, "n");
  return answer.toLowerCase() === "y" || answer.toLowerCase() === "yes";
}

async function chooseFramework(initialValue = "tailwind") {
  const choices = frameworkOptions
    .map((option, index) => `  ${index + 1}. ${option.label}`)
    .join("\n");

  while (true) {
    const answer = await prompt(
      `CSS framework\n${choices}\nChoose 1 or 2`,
      initialValue === "bootstrap" ? "2" : "1"
    );

    if (answer === "1" || answer.toLowerCase() === "tailwind") {
      return "tailwind";
    }

    if (
      answer === "2" ||
      answer.toLowerCase() === "bootstrap" ||
      answer.toLowerCase() === "bootstrap5"
    ) {
      return "bootstrap";
    }

    console.log(color.yellow("Please choose 1 for Tailwind CSS or 2 for Bootstrap 5."));
  }
}

async function isEmptyDir(targetDir) {
  if (!existsSync(targetDir)) return true;
  const entries = await readdir(targetDir);
  return entries.length === 0;
}

async function copyTemplate(templateDir, targetDir) {
  await cp(templateDir, targetDir, {
    recursive: true,
    filter: (source) => !source.endsWith(".DS_Store"),
  });

  const stagedGitignore = path.join(targetDir, "gitignore");
  const actualGitignore = path.join(targetDir, ".gitignore");

  if (existsSync(stagedGitignore)) {
    await rm(actualGitignore, { force: true });
    await cp(stagedGitignore, actualGitignore);
    await rm(stagedGitignore, { force: true });
  }
}

function parseArgs(argv) {
  const options = {
    help: false,
    install: false,
    projectName: undefined,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--install") {
      options.install = true;
      continue;
    }

    if (arg === "--no-install") {
      options.install = false;
      continue;
    }

    if (!options.projectName) {
      options.projectName = arg;
      continue;
    }

    throw new Error(`Unknown argument: "${arg}"`);
  }

  return options;
}

function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent || "";

  if (userAgent.startsWith("pnpm/")) {
    return {
      command: "pnpm",
      args: ["install", "--prefer-offline"],
      installCommand: "pnpm install --prefer-offline",
      devCommand: "pnpm dev",
    };
  }

  if (userAgent.startsWith("yarn/")) {
    return {
      command: "yarn",
      args: ["install"],
      installCommand: "yarn install",
      devCommand: "yarn dev",
    };
  }

  return {
    command: "npm",
    args: ["install", "--no-audit", "--no-fund", "--prefer-offline"],
    installCommand: "npm install --no-audit --no-fund --prefer-offline",
    devCommand: "npm run dev",
  };
}

async function installDependencies(targetDir) {
  const packageManager = detectPackageManager();

  console.log(
    color.cyan(
      `\nInstalling dependencies with ${packageManager.installCommand}...\n`
    )
  );

  await new Promise((resolve, reject) => {
    const child = spawn(packageManager.command, packageManager.args, {
      cwd: targetDir,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `Dependency installation failed. Run "${packageManager.installCommand}" inside "${targetDir}".`
        )
      );
    });
  });

  return packageManager;
}

async function writeFrameworkFiles(targetDir, framework) {
  const config = frameworkConfigs[framework];
  const rendererDir = path.join(targetDir, "src/renderer/src");

  await writeFile(path.join(targetDir, "electron.vite.config.mjs"), config.viteConfig);
  await writeFile(path.join(rendererDir, "main.js"), config.mainJs);
  await writeFile(path.join(rendererDir, "style.css"), config.styleCss);
}

async function configureProject(targetDir, normalizedProjectName, framework) {
  const packageJsonPath = path.join(targetDir, "package.json");
  const indexHtmlPath = path.join(targetDir, "src/renderer/index.html");
  const packageJson = await readJson(packageJsonPath);
  const frameworkConfig = frameworkConfigs[framework];
  const indexHtml = await readFile(indexHtmlPath, "utf8");

  packageJson.name = normalizedProjectName;
  packageJson.description = `Electron + Vite + ${frameworkConfig.displayName} starter`;
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    ...(frameworkConfig.packageJson.devDependencies ?? {}),
  };

  if (frameworkConfig.packageJson.dependencies) {
    packageJson.dependencies = {
      ...(packageJson.dependencies ?? {}),
      ...frameworkConfig.packageJson.dependencies,
    };
  } else {
    delete packageJson.dependencies;
  }

  await writeJson(packageJsonPath, packageJson);
  await writeFile(
    indexHtmlPath,
    indexHtml.replace(
      "<title>Electron + Vite</title>",
      `<title>${normalizedProjectName} | Electron + ${frameworkConfig.displayName}</title>`
    )
  );
  await writeFrameworkFiles(targetDir, framework);
}

async function init() {
  const { help, install, projectName: requestedProjectName } = parseArgs(
    process.argv.slice(2)
  );

  if (help) {
    printHelp();
    return;
  }

  const projectName = await prompt("Application name", requestedProjectName || defaultProjectName);
  const framework = await chooseFramework();

  const targetDir =
    projectName === "." ? process.cwd() : path.resolve(process.cwd(), projectName);
  const normalizedProjectName =
    projectName === "."
      ? toValidPackageName(path.basename(process.cwd()))
      : toValidPackageName(projectName);

  if (!normalizedProjectName || !isValidPackageName(normalizedProjectName)) {
    throw new Error(`Invalid application name: "${projectName}"`);
  }

  if (!(await isEmptyDir(targetDir))) {
    const shouldOverwrite = await confirm(
      `Target directory "${path.relative(process.cwd(), targetDir) || "."}" is not empty. Remove existing files?`
    );

    if (!shouldOverwrite) {
      console.log(color.yellow("Scaffolding aborted."));
      process.exitCode = 1;
      return;
    }

    await rm(targetDir, { recursive: true, force: true });
  }

  await mkdir(targetDir, { recursive: true });
  await copyTemplate(path.resolve(__dirname, "../template"), targetDir);
  await configureProject(targetDir, normalizedProjectName, framework);

  let packageManager;
  if (install) {
    packageManager = await installDependencies(targetDir);
  }

  const relativeTargetDir = path.relative(process.cwd(), targetDir);
  const displayTargetDir = path.isAbsolute(projectName)
    ? targetDir
    : relativeTargetDir;
  const frameworkConfig = frameworkConfigs[framework];

  console.log(color.green(`\n${frameworkConfig.readyMessage}\n`));
  console.log("Next steps:");
  if (projectName !== ".") {
    console.log(color.cyan(`cd ${displayTargetDir}`));
  }
  if (!install) {
    const fallbackPackageManager = detectPackageManager();
    console.log(color.cyan(fallbackPackageManager.installCommand));
  }
  console.log(color.cyan((packageManager ?? detectPackageManager()).devCommand));
}

init().catch((error) => {
  console.error(color.red(error.message));
  process.exit(1);
});
