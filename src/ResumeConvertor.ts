import { promises as fs } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { ResumeGenerator } from "./components/resume.js";
import { ResumeSchema } from "../../json_cv_schema/src/type/type.js";
import { IResumeConvertor } from "../../json_cv_schema/src/type/IResumeConvertor.js";

export default class ResumeConvertor implements IResumeConvertor {
    public async generateResume(resumeJson: ResumeSchema) {
        const __filename = fileURLToPath(import.meta.url);
        const _srcPath = path.dirname(__filename);
        const css = await fs.readFile(path.join(_srcPath, "../resources/page.css"));
        const js = await fs.readFile(path.join(_srcPath, "../resources/page.js"));
        return ResumeGenerator.generate(resumeJson, css, js);
    }
}