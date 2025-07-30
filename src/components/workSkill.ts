 
import type { Labels, Work } from '../type/type.js';
import markdown from '../utils/markdown.js'

export default function Work(work: Work[] = [], labels: Labels) {
  const highlightsByCat: Map<string, Set<string>> = work.reduce((acc, { highlights }) => {   
    if(highlights) {
      for (let item of highlights) {
        if (item.cat) {
          if (!acc.has(item.cat)) {
            acc.set(item.cat, new Set());
          }
          acc.get(item.cat).add(item.alternative || item.subject)
        }
      }
    }
    return acc;
  }, new Map())
  
  return (
    work.length > 0 &&
    `
      <div id="workSkill">
          <div class="highlights">
          ${Array.from(highlightsByCat).map((cat)=> 
            `<h3>${cat[0]}</h3>
            <ul>
              ${cat[1]?
                Array.from(cat[1]).sort().map(highlight => `<li>${markdown(highlight)}</li>`).join(''):'aa'
              }
            </ul>`
            ).join('')
          }
          </div>
      </div>
    `
  )
}
