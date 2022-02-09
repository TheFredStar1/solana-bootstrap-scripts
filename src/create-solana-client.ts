import { createDir } from './utils/createDir';
import { createFile } from './utils/create-file';
import { FgCyan, FgGreen, FgYellow } from './utils/colors';
import { execSync } from "child_process";
import * as fs from 'fs/promises';

const main = async () => {
    // [0] = root
    // [1] = src
    // [2] = dist
    const dirs = createDir("src", "dist");
    console.log(FgCyan, "\n---------------------------------------------------\n");

    createFile(dirs[1], "main.ts", "console.log('Hello, World!')");

    createFile(dirs[0], "tsconfig.json", `{
        "compilerOptions": {
            "outDir": "./dist",
            "rootDir": "./src",
            "esModuleInterop": true
        }
    }`);

    const processOptions = {
        cwd: dirs[0]
    };

    console.log(FgCyan, "\n---------------------------------------------------\n");
    execSync("npm init -y", processOptions);

    execSync("npm i @solana/web3.js", processOptions);
    console.log(FgYellow, "Installed @solana/web3.js");

    execSync("npm i @project-serum/anchor", processOptions);
    console.log(FgYellow, "Installed @project-serum/anchor");

    execSync("npm i @types/node", processOptions);
    console.log(FgYellow, "Installed @types/node");

    execSync("npm i typescript", processOptions);
    console.log(FgYellow, "Installed typescript");
    const fileName = dirs[0] + "/package.json";
    const file = require(fileName);

    file.scripts.start = "tsc && node ./dist/main.js";
    
    await fs.writeFile(fileName, JSON.stringify(file, null, 2));

    console.log(FgGreen, "\n---------------------------------------------------\n");
    console.log("🚀 Success! \"npm run start\" to get started!");

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log("Err", err);
        process.exit(1);
    }
}

runMain();