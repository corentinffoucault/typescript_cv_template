
import markdown from '../utils/markdown.js';
import Duration from './duration.js';
import Link from '../utils/link.js';
import type { Iso8601, Labels, Team, Work, Highlight } from '../type/type.js';

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

export class WorkGenerator {

    public static generate(labels: Labels, work: Work[] = []): string {
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
                        ${nestedWork.map((job: NestedWork) => WorkGenerator.buildTimeLine(labels, job)).join('')}
                    </div>
                </section>`;
    }

    private static buildTimeLine(labels: Labels, job: NestedWork): string {
        return `<article>
                    <header>
                    <h4>${Link(job.url, job.name)}</h4>
                    <div class="meta">${job.description && `<div>${job.description}</div>`}</div>
                    </header>
                    <div class="timeline">
                    ${job.items.map((item: Item) => WorkGenerator.generateJob(labels, item)).join('')}
                    </div>
                </article>`;
    }

    private static generateJob(labels: Labels, item: Item): string {
        return `<div>
                    <div>
                        <h5>${item.position}</h5>
                        ${WorkGenerator.generateTeam(labels, item.team)}
                        ${WorkGenerator.generateWorkMeta(item)}
                    </div>
                    ${markdown(item.summary)}
                    <div class="workInfo">
                        ${WorkGenerator.generateHighlights(item.highlights)}
                        ${WorkGenerator.generateSkill(labels, item)}
                    </div>
                </div>`;
    }

    private static generateTeam(labels: Labels, team?: Team): string {
        if (!team) {
            return '';
        }
        return `<div class="workmeta">
                    <div>${labels.team} ${team.description}: ${WorkGenerator.generateSubTeam('back', team.back)}${WorkGenerator.generateSubTeam('front', team.front, team.back)}${WorkGenerator.generateSubTeam('fullStack', team.fullStack, team.back + team.front)}</div>
                </div>`;
    }

    private static generateSubTeam(label: string, nbMember: number, previewsNnMember = 0): string {
        if (nbMember == 0) {
            return '';
        }
        const team = `${nbMember} ${label}`;
        return previewsNnMember == 0 ? team : `, ${team}`;
    }

    private static generateHighlights(highlights: Highlight[] = []): string {
        if (highlights.length == 0) {
            return '';
        }
        return `<div class="highlights">
                    <ul>
                        ${highlights.map(WorkGenerator.generateHighlight).join('')}
                    </ul>
                </div>`;
    }

    private static generateHighlight(highlight: Highlight): string {
        return `<li>${markdown(highlight.subject)}</li>
                ${WorkGenerator.generateHighlightDetail(highlight)}`;
    }

    private static generateHighlightDetail({ details = [] }: Highlight): string {
        if (details.length == 0) {
            return '';
        }
        return `<ul>
                    ${details.map(detail => `<li>${markdown(detail)}</li>`).join('')}
                </ul>`;
    }

    private static generateWorkMeta(job: Item): string {
        return `<div class="workmeta">
                    <div>
                        ${Duration(job.startDate, job.endDate)}
                    </div>
                    ${job.location ? `<div>${job.location}</div>` : ''}
                </div>`;
    }

    private static generateSkill(labels: Labels, job: Item): string {
        let skills = `
            ${WorkGenerator.generateOneSkillType(labels.planguages, job.planguages)}
            ${WorkGenerator.generateOneSkillType(labels.tools, job.tools)}
            ${WorkGenerator.generateOneSkillType(labels.environment, job.env)}
            ${WorkGenerator.generateOneSkillType(labels.methods, job.method)}`;
        if (skills.length == 0) {
            return '';
        }
        return `<div class="detail">
                    ${skills}
                </div>`;
    }

    private static generateOneSkillType(labels: string, skills: string[] = []): string {
        if (skills.length == 0) {
            return '';
        }
        return `<div class="keyWord minimal flex-container">
                    <b>${labels}</b>: ${skills?.join(', ')}
                </div>`;
    }
}