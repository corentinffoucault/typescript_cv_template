
import MarkdownGenerator from '../utils/MarkdownGenerator.js';
import DurationGenerator from './DurationGenerator.js';
import LinkGenerator from '../utils/LinkGenerator.js';
import type { Iso8601, Labels, Team, Work, Highlight } from '../../packages/json_cv_schema/src/type/Type.js';

type NestedWork = {
    description?: string;
    name?: string;
    url?: string;
    items: Item[];
};
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
};

export default class WorkGenerator {

    public generate(lang: Intl.LocalesArgument, work: Work[], labels: Labels): string {
        if (work.length == 0) {
            return '';
        }
        const nestedWork: NestedWork[] = work.reduce((acc: NestedWork[], { description, name, url, ...rest }) => {
            const prev: NestedWork = acc[acc.length - 1];
            if (prev && prev.name === name) {
                prev.items.push(rest);
            } else {
                acc.push({ description, name, url, items: [rest] });
            }
            return acc;
        }, []);
        return `<section id="work">
                    <h3>${labels.works}</h3>
                    <div class="stack">
                        ${nestedWork.map((job: NestedWork) => this.buildTimeLine(lang, labels, job)).join('')}
                    </div>
                </section>`;
    }

    private buildTimeLine(lang: Intl.LocalesArgument, labels: Labels, job: NestedWork): string {
        return `<article>
                    <header>
                    <h4>${LinkGenerator.generate(job.url, job.name)}</h4>
                    <div class="meta">${job.description && `<div>${job.description}</div>`}</div>
                    </header>
                    <div class="timeline">
                    ${job.items.map((item: Item) => this.generateJob(lang, labels, item)).join('')}
                    </div>
                </article>`;
    }

    private generateJob(lang: Intl.LocalesArgument, labels: Labels, item: Item): string {
        return `<div>
                    <div>
                        <h5>${item.position}</h5>
                        ${this.generateTeam(labels, item.team)}
                        ${this.generateWorkMeta(lang, item)}
                    </div>
                    ${MarkdownGenerator.generate(item.summary)}
                    <div class="workInfo">
                        ${this.generateHighlights(item.highlights)}
                        ${this.generateSkill(labels, item)}
                    </div>
                </div>`;
    }

    private generateTeam(labels: Labels, team?: Team): string {
        if (!team) {
            return '';
        }
        return `<div class="workmeta">
                    <div>${labels.team} ${team.description}: ${this.generateSubTeam('back', team.back)}${this.generateSubTeam('front', team.front, team.back)}${this.generateSubTeam('fullStack', team.fullStack, team.back + team.front)}</div>
                </div>`;
    }

    private generateSubTeam(label: string, nbMember: number, previewsNnMember = 0): string {
        if (nbMember == 0) {
            return '';
        }
        const team = `${nbMember} ${label}`;
        return previewsNnMember == 0 ? team : `, ${team}`;
    }

    private generateHighlights(highlights: Highlight[] = []): string {
        if (highlights.length == 0) {
            return '';
        }
        return `<div class="highlights">
                    <ul>
                        ${highlights.map(highlights => this.generateHighlight(highlights)).join('')}
                    </ul>
                </div>`;
    }

    private generateHighlight(highlight: Highlight): string {
        return `<li>${MarkdownGenerator.generate(highlight.subject)}</li>
                ${this.generateHighlightDetail(highlight)}`;
    }

    private generateHighlightDetail({ details = [] }: Highlight): string {
        if (details.length == 0) {
            return '';
        }
        return `<ul>
                    ${details.map(detail => `<li>${MarkdownGenerator.generate(detail)}</li>`).join('')}
                </ul>`;
    }

    private generateWorkMeta(lang: Intl.LocalesArgument, job: Item): string {
        return `<div class="workmeta">
                    <div>
                        ${DurationGenerator.print(lang, job.startDate, job.endDate)}
                    </div>
                    ${job.location ? `<div>${job.location}</div>` : ''}
                </div>`;
    }

    private generateSkill(labels: Labels, job: Item): string {
        let skills = `
            ${this.generateOneSkillType(labels.planguages, job.planguages)}
            ${this.generateOneSkillType(labels.tools, job.tools)}
            ${this.generateOneSkillType(labels.environment, job.env)}
            ${this.generateOneSkillType(labels.methods, job.method)}`;
        if (skills.length == 0) {
            return '';
        }
        return `<div class="detail">
                    ${skills}
                </div>`;
    }

    private generateOneSkillType(labels: string, skills: string[] = []): string {
        if (skills.length == 0) {
            return '';
        }
        return `<div class="keyWord minimal flex-container">
                    <b>${labels}</b>: ${skills?.join(', ')}
                </div>`;
    }
}