ROB ROCKS — COMPLETE SITE (MAIN + $ROCKSTR STRATEGY)
Static site. No build step, no CLI required.

STRUCTURE
  index.html          Main page (Vision, Mine, Materials)
  styles.css          Main page styles
  script.js           Main page JS
  strategy.html       $ROCKSTR strategy page (Loop, Machine, Vault)
  strategy.css        Strategy styles (standalone, same design tokens)
  strategy.js         Strategy JS (loop animation, machine simulation)
  assets/
    rob-rock.png      Rock artwork (800px, web-optimized — included)

DEPLOY (GitHub web UI + Vercel)
1. github.com -> "New repository" -> name it e.g. rob-rocks-site -> Public -> Create.
2. Click "uploading an existing file" -> drag in all files plus the assets folder
   -> Commit.
3. vercel.com -> "Add New... -> Project" -> import the repo -> Framework: "Other"
   -> Deploy. The site is live.
4. Any later change: edit or upload the file on GitHub -> Commit -> Vercel
   redeploys automatically.

URLS AFTER DEPLOY
  /               Main page
  /strategy.html  Strategy page (linked from the main nav and footer as "$ROCKSTR")

AT TOKEN LAUNCH (search strategy.html for "TODO")
- Replace the three href="#" Flap links with the real Flap URL.
- Replace "TBA — LAUNCHING ON FLAP" in #caAddress with the contract address.
  The COPY button appears automatically once a real address is set.
- Add the machine wallet address in the vault section and link it to the explorer.

PARAMETERS SHOWN ON THE PAGE
  10% fee -> 5% Rock pool / 3% direct burn / 2% team
  Buy trigger: pool >= 2x floor · Relist: 1.5x · NFT sale: 100% buyback & burn

LIVE DATA
  Machine stats, vault bar and burn counter are placeholders until the pool,
  vault and burn wallets exist. They can then be wired to the Robinhood Chain RPC.
