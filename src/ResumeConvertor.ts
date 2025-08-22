import { promises as fs } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import ResumeGenerator from "./generator/Resume.js";
import EducationGenerator from './generator/Education.js';
import HeaderGenerator from './generator/Header.js';
import InterestGenerator from './generator/Interests.js';
import LanguagesGenerator from './generator/Languages.js';
import MetaGenerator from './generator/Meta.js';
import SkillGenerator from './generator/Skills.js';
import WorkGenerator from './generator/Work.js';
import { ResumeSchema } from "../packages/json_cv_schema/src/type/type.js";
import { IResumeConvertor } from "../packages/json_cv_schema/src/type/IResumeConvertor.js";

export default class ResumeConvertor implements IResumeConvertor {
    private resumeGenerator: ResumeGenerator;

    constructor() {
        this.resumeGenerator = new ResumeGenerator(
            new MetaGenerator(),
            new HeaderGenerator(),
            new EducationGenerator(),
            new LanguagesGenerator(),
            new SkillGenerator(),
            new InterestGenerator(),
            new WorkGenerator());
    }

    public async generateResume(resumeJson: ResumeSchema) {
        const __filename = fileURLToPath(import.meta.url);
        const _srcPath = path.dirname(__filename);
        const css = await fs.readFile(path.join(_srcPath, "../resources/page.css"));
        const js = await fs.readFile(path.join(_srcPath, "../resources/page.js"));
        return this.resumeGenerator.generate(resumeJson, css, js);
    }
}