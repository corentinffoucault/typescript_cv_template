import type { Basics } from '../../../json_cv_schema/src/type/type.js';
import Markdown from '../utils/MarkdownGenerator.js';

export class MetaGenerator {
    public static generate(basics: Basics): string {
        const { name, summary } = basics;

        return `
            ${name && `<title>${name}</title>`}
            ${summary && `<meta name="description" content="${Markdown.generate(summary, true)}" />`}`;
    }
}
