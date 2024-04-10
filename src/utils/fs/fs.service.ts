import * as fse from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import fs = require('fs');

const fsPromises = fs.promises;

import { Injectable } from '@nestjs/common';
import { JFWriteOptions, Path } from 'jsonfile';

@Injectable()
export class FsService {
    async createJsonFile(
        file: Path,
        data: string,
        options?: JFWriteOptions,
    ): Promise<any> {
        return fse.writeJson(file, data, options);
    }

    async createTempFile() {
        return fsPromises.mkdtemp(path.join(os.tmpdir(), 'foo-'));
    }

    async removeDirectory(pathName: string, options?: fs.RmDirOptions) {
        return fsPromises.rmdir(pathName, options);
    }

    createReadStream(fileName: fs.PathLike, options?: BufferEncoding) {
        return fs.createReadStream(fileName, options);
    }
}
