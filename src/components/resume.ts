 
import type { ResumeSchema } from '../type/type.js'
import Education from './education.js'
import Header from './header.js'
import Interests from './interests.js'
import Languages from './languages.js'
import Meta from './meta.js'
import Skills2 from './skills2.js'
import Work from './work.js'
import WorkSimplify from './workSimplify.js'
import WorkSkill from './workSkill.js'

export default function Resume(resume: ResumeSchema, css: Buffer, js: Buffer) {
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        ${Meta(resume.basics)}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" />
        <style>
          ${css.toString()}
        </style>
        <script type="module">
          ${js.toString()}
        </script>
      </head>
        <div class="headers">
           ${Header(resume.basics)} 
        </div>
        <div class="body">
        <aside class="left-column">
          ${Education(resume.education, resume.labels)}
          ${Languages(resume.languages, resume.labels)}
          ${Skills2(resume.skills)} 
          ${Interests(resume.interests, resume.labels)}
        </aside>
        <div class="vl"></div>
        <div class="right-column">
                  
          ${WorkSkill(resume.work, resume.labels)} 
          ${WorkSimplify(resume.work, resume.labels)} 
        </div>
        </div>
      </body>
    </html>`
}

/**
 
        <div class="right-column">
                  
          ${Work(resume.work, resume.labels)} 
        </div>
 */