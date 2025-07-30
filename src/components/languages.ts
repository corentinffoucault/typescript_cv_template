 
import type { Labels, Languages } from '../type/type.js'

export default function Languages(languages: Languages[], labels: Labels) {
  return (
    languages.length > 0 &&
    `
        <div class="container languages-container">
        <h3 class="bold">${labels.language}</h3>

        <ul class="minimal">
         ${languages.map(
            ({ fluency, language }) => ` <li>
                    <div class="subWorkInfo"><h6>${language}:  </h6>${fluency ? `<em> ${fluency}</em>` : ''}</div>
                </li>`,
          ).join('')}
        </ul>
    </div>
    `
  )
}