import markdown from '../utils/markdown.mjs'
import Icon from './icon.js'
import Link from '../utils/link.js'
import { Basics } from '../type/type.js'

function formatCountry(countryCode: string): string {
  return Intl.DisplayNames ? new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode)! : countryCode
}

function calculateAge(birthday: Date) {
    var ageDifMs = Date.now() - birthday.getDate();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

export default function Header(basics: Basics) {
  const { email, birth, label, location, name, phone, profiles = [], summary, url } = basics
  
  return `
    <header class="masthead">

      <div class="menu">
        <div>${name && `<h6>${name}</h6>`}</div>
        <div>${birth && `Age: ${calculateAge(new Date(birth))}`}</div>
        ${summary && `<article>${markdown(summary)}</article>`}
        <ul class="icon-list">
          ${location?.city &&
          `
            <li style="font-size: 10px;">
              ${Icon('map-pin')} ${location.city}${location.countryCode && `, ${formatCountry(location.countryCode)}`}
            </li>
          `}
          ${email &&
          `
            <li>
              ${Icon('mail')}
              <a href="mailto:${email}">${email}</a>
            </li>
          `}
          ${phone &&
          `
            <li>
              ${Icon('phone')}
              <a href="tel:${phone.replace(/\s/g, '')}">${phone}</a>
            </li>
          `}
          ${url && `<li>${Icon('link')} ${Link(url)}</li>`}
          ${profiles.map(
            ({ network, url, username }) => `
              <li>
                ${network && Icon(network as feather.FeatherIconNames, 'user')} ${Link(url, username)}
                ${network && `<span class="network">(${network})</span>`}
              </li>
            `
          )}
        </ul>
      </div>

      <div class="content">
        ${label && `<h1>${label}</h1>`}
      </div>
    </header>
  `
}
