import { rm, mkdir, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { build } from 'esbuild'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const outDir = path.join(projectRoot, 'docs')

async function runCommand(command, args, options = {}) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: false,
      ...options,
    })
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`))
      }
    })
    child.on('error', (error) => {
      reject(error)
    })
  })
}

async function buildStyles() {
  const tailwindBase = path.join(projectRoot, 'node_modules', '.bin', 'tailwindcss')
  const tailwindBin = process.platform === 'win32' ? `${tailwindBase}.cmd` : tailwindBase
  await runCommand(tailwindBin, ['-i', path.join('src', 'index.css'), '-o', path.join('docs', 'app.css'), '--minify'], {
    env: { ...process.env, NODE_ENV: 'production' },
  })
}

async function buildScripts() {
  await build({
    entryPoints: [path.join(projectRoot, 'src', 'offline-entry.tsx')],
    outfile: path.join(outDir, 'app.js'),
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2019'],
    minify: true,
    sourcemap: false,
    jsx: 'automatic',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    loader: {
      '.svg': 'dataurl',
    },
    banner: {
      js: '// Offline bundle generated via scripts/build-offline.mjs\n',
    },
    logLevel: 'info',
  })
}

async function createHtml() {
  const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文心声画坊 · 离线演示版</title>
    <link rel="stylesheet" href="./app.css" />
  </head>
  <body class="bg-ink-50">
    <div id="root"></div>
    <script src="./app.js" defer></script>
  </body>
</html>
`
  await writeFile(path.join(outDir, 'index.html'), html, 'utf8')
}

async function main() {
  await rm(outDir, { recursive: true, force: true })
  await mkdir(outDir, { recursive: true })
  await buildStyles()
  await buildScripts()
  await createHtml()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
