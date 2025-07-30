import { Basics } from '../type/type.js'
import markdown from '../utils/markdown.mjs'

export default function Meta(basics: Basics) {
  const { name, summary } = basics

  return `
    ${name && `<title>${name}</title>`}
    ${summary && `<meta name="description" content="${markdown(summary, true)}" />`}
  `
}
