# www.megam.io

Closure site for Megam Systems and Rio/OS, preserving the public story,
artifacts, team notes, and open-source links.

Former Megam / Rio/OS teammates: if your name, role, link, or project note needs
correction, please send a pull request.

## Run Locally

```bash
npm ci
npm run dev
```

## Check

```bash
npm run lint
npm run build
npm run test:e2e
gitleaks dir --config .gitleaks.toml --redact .
```
