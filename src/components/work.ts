 
import markdown from '../utils/markdown.js'
import Duration from './duration.js'
import Link from '../utils/link.js'
import type { Iso8601, Labels, Team, Work, Highlight } from '../type/type.js'

type NestedWork = {
  description?: string;
  name?: string;
  url?: string;
  items: Item[];
}
type Item = {
    location?: string;
    position?: string;
    startDate?: Iso8601;
    endDate?: Iso8601;
    summary?: string;
    team?: Team;
    highlights?: Highlight[];
    planguages?: string[];
    env?: string[];
    tools?: string[];
    method?: string[];
}

export default function Work(work: Work[], labels: Labels): string {
  const nestedWork: NestedWork[] = work.reduce((acc: NestedWork[], { description, name, url, ...rest }) => {
    const prev: NestedWork = acc[acc.length - 1]
    if (prev && prev.name === name) {
      prev.items.push(rest)
    } else { 
      acc.push({ description, name, url, items: [rest] })
    }
    return acc
  }, [])
  return work.length > 0 ? '' :
    `
      <section id="work">
        <h3>${labels.works}</h3>
        <div class="stack">
          ${nestedWork.map(
            ({ description, name, url, items = [] }) => `
              <article>
                <header>
                  <h4>${Link(url, name)}</h4>
                  <div class="meta">${description && `<div>${description}</div>`}</div>
                </header>
                <div class="timeline">
                  ${items.map(
                    ({ highlights = [], planguages = [], tools = [], env = [], method = [], team, location, position, startDate, endDate, summary }) => `
                      <div>
                        <div>
                          <h5>${position}</h5>
                          ${team && `<div class="workmeta">
                            ${`<div>${labels.team} ${team.description}: ${team.back > 0 && `${team.back} back`}${ team.front > 0 && team.back > 0  && `, `}${team.front > 0 && `${team.front} front`}${team.front + team.back > 0 && team.fullStack > 0 && `, `}${ team.fullStack > 0 && `${team.fullStack} fullStack`}</div>`}
                          </div>`}
                           
                          <div class="workmeta">
                            ${startDate && `<div>${Duration(startDate, endDate)}</div>`}
                            ${location && `<div>${location}</div>`}
                          </div>
                        </div>
                        ${summary && markdown(summary)}
                        <div class="workInfo">
                          <div class="highlights">
                            ${highlights.length > 0 &&
                            `
                              <ul>
                                ${highlights.map(highlight => `
                                <li>${markdown(highlight.subject)}</li>
                                ${highlight.detail && `<ul>${highlight.detail.map(detail => `<li>${markdown(detail)}</li>`)}</ul>`}
                                `).join('')}
                              </ul>
                            `}
                          </div>
                          ${planguages.length+tools.length+env.length+method.length > 0 && `<div class="detail">
                              ${planguages.length > 0 && `<div class="keyWord minimal flex-container">
                                <b>${labels.planguages}</b>: ${planguages?.join(', ')}
                              </div>`}
                              ${tools.length > 0 && `<div class="keyWord minimal flex-container">
                                <b>${labels.tools}</b>: ${tools?.join(', ')}
                              </div>`}
                              ${env.length > 0 && `<div class="keyWord minimal flex-container">
                                <b>${labels.environment}</b>: ${env?.join(', ')}
                              </div>`}
                              ${method.length > 0 && `<div class="keyWord minimal flex-container">
                                <b>${labels.methods}</b>: ${method?.join(', ')}
                              </div>`}
                          
                          </div>`}
                        </div>
                      </div>
                    `
                  ).join('')}
                </div>
              </article>
            `
          ).join('')}
        </div>
      </section>
    `
}
