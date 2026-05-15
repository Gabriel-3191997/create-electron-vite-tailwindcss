# create-electron-vite-tailwindcss

Create an Electron + Vite app with your choice of Tailwind CSS or Bootstrap 5 already configured.

## Compatibility

- Generator runtime: Node.js 18 or later
- Generated app: uses a compatibility-focused dependency set so it works on a wider range of Node.js and macOS versions than the latest Vite stack
- This package cannot truly support every Node.js release or every operating system version because Electron, Vite, and esbuild each define their own minimum supported platforms

## Usage

```bash
npx create-electron-vite-tailwindcss my-app
```

This now scaffolds the app first without waiting for dependency installation.
If you want the generator to also install dependencies, use:

```bash
npx create-electron-vite-tailwindcss my-app --install
```

You can also use npm's create alias:

```bash
npm create electron-vite-tailwindcss my-app
```

Do not run this:

```bash
npx create electron-vite-tailwindcss
```

That command installs and runs a different package named `create`. Your package command is `create-electron-vite-tailwindcss`.

During scaffolding you will be prompted for:

- application name
- CSS framework: Tailwind CSS or Bootstrap 5

## Behavior

- Scaffolds an Electron + Vite starter with your selected CSS framework already configured
- Scaffolds files immediately by default so app creation finishes faster
- Use `--install` if you want dependencies installed automatically
- Use `--no-install` to skip dependency installation explicitly
- Uses Vite 6 and a pinned `esbuild` version in the generated app to avoid newer binary compatibility failures on older macOS versions
- Uses a smaller dependency set by only installing the framework you selected

```bash
npx create-electron-vite-tailwindcss my-app --install
```

## What Gets Created

- Electron main process in `src/main/index.js`
- Electron preload bridge in `src/preload/index.js`
- Vite renderer in `src/renderer`
- Tailwind CSS v4 configured through `@tailwindcss/vite` when Tailwind is selected
- Bootstrap 5 configured in the renderer entry when Bootstrap is selected
- Ready-to-run scripts: `npm run dev`, `npm run build`, `npm run preview`

## Meet Developer

Gabriel W. Kun 

A Liberian by nationally with proficency in python and javascript, full stack software developer senior student of the Blue Crest University College Liberia. Who is currently serving as MIS Engineer at Orange Liberia also once a junior software developer at Liberia HR Job Board.