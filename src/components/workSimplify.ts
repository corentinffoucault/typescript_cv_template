import Duration from './duration.js'
import Link from '../utils/link.js'
import { Iso8601, Labels, Team, Work, Highlight } from '../type/type.js'

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

export default function WorkSimplify(work: Work[] = [], labels: Labels) {
  const nestedWork = work.reduce((acc: NestedWork[], { description, name, url, ...rest }) => {
    const prev = acc[acc.length - 1]
    if (prev && prev.name === name) {
      prev.items.push(rest)
    } else {
      acc.push({ description, name, url, items: [rest] })
    }
    return acc
  }, [])
  return (
    work.length > 0 &&
    `<div id="work">
        <h3>${labels.works}</h3>
        <div class="stackSimple">
          ${nestedWork.map(
            ({ description, name, url, items = [] }) => `
              <article>
                <header>
                  <h4>${Link(url, name)}</h4>
                  <div class="meta">${description && `<div>${description}</div>`}</div>
                </header>
                <div class="timeline">
                  ${items.reduce(
                    (acc: Item[], { position, startDate, endDate }) => {
                      let hasMelt = false;
                      for (let element of acc) {
                        if (position===element.position) {
                          if (endDate === element.startDate) {
                            element.startDate = startDate;
                            hasMelt = true;
                          } else if (startDate === element.endDate) {
                            element.endDate = endDate;
                            hasMelt = true;
                          }
                          break;
                        }
                      } 
                      if(!hasMelt) {
                        acc.push({ position, startDate, endDate })
                      }
                      return acc;
                    }, []).map(
                    ({ position, startDate, endDate }) => `
                      <div>
                        <span>
                          <div><span class="simplifyWorkPosition"><b>${position}</b></span>${startDate && `: ${Duration(startDate, endDate)}`}</div>
                        </span>
                      </div>
                    `
                  ).join('')}
                </div>
              </article>
            `
          ).join('')}
        </div>
      </div>
    `
  )
}
