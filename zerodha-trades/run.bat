@echo off
cd /d "C:\AI\AI trading project\zerodha-trades"
set NODE_OPTIONS=--loader ts-node/esm --no-warnings=ExperimentalWarning
npx ts-node index.ts
