import micromark from 'micromark'
import striptags from 'striptags'

export default function markdown(doc: string, stripTags = false) {
  const html = micromark.default(doc)
  return stripTags ? striptags(html) : html
}
