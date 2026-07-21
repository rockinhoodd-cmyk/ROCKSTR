$ROCKSTR — ROB ROCKS STRATEGY SITE
Single-page static site. No build step, no CLI required.

STRUCTURE
  index.html          The strategy page (Hero loop, Mechanism, Machine, Vault, CTA)
  styles.css          Styles
  script.js           Loop animation, machine simulation, nav, scroll reveals
  assets/
    rob-rock.png      Rock artwork (800px, web-optimized)

DEPLOY (GitHub + Netlify)
1. Upload all files plus the assets folder to your GitHub repo -> Commit.
2. Netlify picks up the change and redeploys automatically (~1 min).
3. Hard-refresh the page (Ctrl+Shift+R / Cmd+Shift+R) to bypass the browser cache.

If you already uploaded an older version: upload the files again with the same
names — they overwrite the old ones — then commit.

AT TOKEN LAUNCH (search index.html for "TODO")
- Replace the three href="#" Flap links with the real Flap URL.
- Replace "TBA — LAUNCHING ON FLAP" in #caAddress with the contract address.
  The COPY button appears automatically once a real address is set.
- Add the machine wallet address in the vault section and link it to
  https://robinhoodchain.blockscout.com/address/0x...

PARAMETERS SHOWN ON THE PAGE
  10% fee -> 5% Rock pool / 3% direct burn / 2% team
  Buy trigger: pool >= 2x floor · Relist: 1.5x · NFT sale: 100% buyback & burn
  Vault: 13 / 333 seeded by the creator

LIVE DATA
  Machine stats, vault bar and burn counter are static placeholders until the
  pool, vault and burn wallets exist. They can then be wired to the Robinhood
  Chain RPC (https://rpc.mainnet.chain.robinhood.com, Chain ID 4663).
