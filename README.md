# website-template

Template-Basis fuer alle Kundenprojekte von OnlineKlar.

## Struktur

```
├── index.html
├── css/style.css
├── js/main.js
├── content.json
├── admin/index.html
├── api/save.js
└── vercel.json
```

## Vercel Environment Variables

| Variable | Beschreibung |
|---|---|
| `GITHUB_TOKEN` | Fine-grained PAT mit Contents Read/Write |
| `GITHUB_OWNER` | GitHub Username (OnlineKlar) |
| `GITHUB_REPO` | Repo-Name des Kundenprojekts |
| `CMS_SECRET` | Optionaler API-Secret fuer /api/save |

## Neues Kundenprojekt
1. Repo aus diesem Template erstellen
2. content.json anpassen
3. Vercel-Projekt anlegen + Environment Variables setzen
4. Fertig – Vercel deployed automatisch
