import { FgGreen, FgRed } from './colors'
import * as fs from 'fs';

import { exec, spawn } from 'child_process';

export const createDir = (...dirs) => {
    if (process.argv.length < 3) {
        console.log(FgRed, "Error: Please specify a directoy");
        process.exit(1);
    }

    const rootDir = process.argv[2];
    const paths = [];

    if (fs.existsSync(rootDir)) {
        console.log(FgRed, rootDir, "Already Exist");
    }

    fs.mkdirSync(rootDir);
    console.log(FgGreen, "Created:", rootDir);
    paths.push(rootDir);

    if (dirs.length > 0) {
        dirs.map(dir => {
            const path = rootDir + "/" + dir; 
            fs.mkdirSync(path);
            console.log(FgGreen, "Created:", path);
            paths.push(path);
        });
    }

    return paths;
};