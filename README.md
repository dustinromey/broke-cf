# broke

See where your money goes, get a plan for it, and ask your own AI about it. Your bank data stays in your own database.

Next.js 15, Supabase, Plaid. Free to run. AI uses the app you already pay for, with no API keys.

## Run it on your computer

The easiest way. Needs [Node.js](https://nodejs.org) and [git](https://git-scm.com/downloads). On Mac or Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/nextwork-projects/broke/main/install.sh | sh
```

This puts broke in `~/broke` and opens a setup page. Paste in your keys there, one step at a time:

1. **Supabase** (free): your database and sign-in.
2. **Plaid** (free for test banks): your bank connection.
3. **AI** (optional): broke finds Claude Code, Codex, Gemini CLI, opencode or a local model on your computer. Or connect OpenRouter in one click.

To start it again: open a new Terminal window and type `broke`.

On Windows: `git clone https://github.com/nextwork-projects/broke`, then `npm run app` in that folder.

## Put it online

Use it from your phone, on a site only you own.

It runs on [Cloudflare Workers](https://workers.cloudflare.com).

1. Create a free [Supabase](https://supabase.com/dashboard/new) project and get [Plaid keys](https://dashboard.plaid.com/developers/keys).
2. Copy broke to your own GitHub (Fork). In Cloudflare, open Workers & Pages, Create, Import a repository, and pick your copy.
3. Set the build command to `npm run cf:build` and the deploy command to `npm run cf:deploy`.
4. Add your keys in two places, because the build creates the tables and the site reads them as it runs: under Build, Variables and secrets, and under Settings, Variables and Secrets. The keys are `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`, `PLAID_CLIENT_ID`, `PLAID_SECRET` and `PLAID_ENV` (`sandbox` to start). `SUPABASE_DB_URL` is under Supabase, Connect, Session pooler.
5. Open your new site. It shows one step to do in Supabase before your first sign-in.
6. Sign in once, then turn off "Allow new users to sign up" under Authentication, Sign In / Providers, so nobody else can use your copy.

Or from your computer: put the keys in `.env`, run `npm run cf:build`, then `npm run cf:deploy`, and add the same keys to the Worker with `npx wrangler secret bulk .env`.

**AI on an online copy:** connect OpenRouter in one click. Or, to use your Claude or opencode plan, press **Connect my computer** on Connect your AI and run the command it gives you. Your AI login stays on your computer. AI answers while that command is running.

## Improve it

broke is yours to change. Open the folder and tell your AI app what you want:

```bash
cd ~/broke && claude
```

`CLAUDE.md` tells it the privacy rules. Run `npm run dev` to see changes as they happen. On an online copy, `git push` publishes them.

**Get the latest broke:** it updates itself each time you start it (`broke`, or the install command), as long as you haven't changed its code. With your own changes, run `npm run update`. To turn auto-update off, start it with `BROKE_NO_AUTO_UPDATE=1`. On an online copy there's nothing to install: in your GitHub repo open Actions, Update broke, Run workflow, and Cloudflare rebuilds your site. Your changes stay either way.

If you make something others would want, send a pull request.

## Banks

**Banks in other countries (all optional, keys on the Setup page):** Plaid (US, Canada), Akahu (New Zealand), Enable Banking (UK, Europe), Basiq (Australia), Belvo (Brazil). Each shows only for that country. Enable Banking, Basiq and Belvo are built from their public docs and tested against stand-ins, so test against the vendor's sandbox before relying on them. Anywhere else, people import a CSV, OFX, QIF or PDF statement.

In test mode, press **Use a test bank**, or pick any bank in Plaid Link with username `user_good` and password `pass_good`.

## How AI stays private

Every AI path goes through one gate. A cloud model gets a summary: rounded amounts, names replaced by tokens. Full detail goes only to a local model. You can turn AI off in Settings. Each answer runs with no way to change your data.

## Scripts

- `npm run migrate`: apply database changes now. They also apply on start.
- `node --env-file=.env --env-file-if-exists=.env.local scripts/e2e-sandbox.mjs`: throwaway user, test bank, every page, user deleted.
- `node src/lib/format.test.ts` and `node src/lib/llm/config.test.ts`: unit checks.

## Licence

MIT.
