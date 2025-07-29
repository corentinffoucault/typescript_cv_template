 
import { Interest, Labels } from '../type/type.js'

export default function Interests(interests: Interest[], labels: Labels) {
  return (
    interests.length > 0 &&
    `
        <div class="container interests-container">
          <h3 class="bold">${labels.interests}</h3>
          ${interests.map(
            ({ name })  => `
            <section class="item">
                <div class="main-skill skill left">${name}</div>
            </section>
        `).join('')}
    </div>
    `
  )
}