
import type { ResumeSchema } from '../../../json_cv_schema/src/type/type.js';
import EducationGenerator from './Education.js';
import HeaderGenerator from './Header.js';
import InterestGenerator from './Interests.js';
import LanguagesGenerator from './Languages.js';
import MetaGenerator from './Meta.js';
import SkillGenerator from './Skills.js';
import WorkGenerator from './Work.js';

export default class ResumeGenerator {

    public static generate(resume: ResumeSchema, css: Buffer, js: Buffer): string {
        return `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                ${MetaGenerator.generate(resume.basics)}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" />
                <style>
                    ${css.toString()}
                </style>
                <script type="module">
                    ${js.toString()}
                </script>
            </head>
            <body>
                <div class="headers">
                    ${HeaderGenerator.generate(resume.basics)} 
                </div>
                <div class="body">
                <aside class="left-column">
                    ${EducationGenerator.generate(resume.education, resume.labels)}
                    ${LanguagesGenerator.generate(resume.languages, resume.labels)}
                    ${SkillGenerator.generate(resume.skills)} 
                    ${InterestGenerator.generate(resume.interests, resume.labels)}
                </aside>
                <div class="right-column">        
                    ${WorkGenerator.generate(resume.work, resume.labels)} 
                </div>
            </body>
        </html>`;
    }
}