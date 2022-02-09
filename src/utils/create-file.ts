import * as fs from 'fs';
import { FgGreen } from './colors';

export const createFile = (dir, fileName, contents) => {
    fs.writeFileSync(dir + "/" + fileName, contents);
    console.log(FgGreen, "Created:", dir + "/" + fileName);
};