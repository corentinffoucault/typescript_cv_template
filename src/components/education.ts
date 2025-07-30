import { Education, Labels } from '../type/type.js'
import markdown from '../utils/markdown.mjs'
import Link from '../utils/link.js'

export default function Education(education: Education[], lables: Labels) {
  return (
    education.length > 0 &&
    `
      <div class="container education-container">
        <h3 class="bold">${lables.diploma}</h3>
      <section id="education">
        <div>
          ${education.map(
            ({ area, courses = [], institution, startDate, endDate, studyType, url }) => `
              <article>
                <header>
                  <h5>${Link(url, institution)}</h5>
                  <div>
                    ${area && `<strong>${area}</strong>`}
                    ${endDate}
                  </div>
                </header>
                ${studyType && markdown(studyType)}
                ${courses.length > 0 &&
                `
                  <h5>Courses</h5>
                  <ul>
                    ${courses.map(course => `<li>${markdown(course)}</li>`)}
                  </ul>
                `}
              </article>
            `,
          ).join('')}
        </div>
      </section>
      </div>
    `
  )
}
