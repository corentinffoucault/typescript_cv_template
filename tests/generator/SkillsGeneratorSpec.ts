import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import SkillsGenerator from '../../src/generator/SkillsGenerator.js';

describe('SkillsGenerator', () => {
    const skillsGenerator = new SkillsGenerator();
    it('generate minimal skills', () => {
        const header = skillsGenerator.generate([]);
        assert.equal(header, ``);
    });

    it('generate full skills', () => {
        const header = skillsGenerator.generate([{
            keywords: ['keywords'],
            name: 'name'
        }]);
        assert.equal(header, `
            <div class="container skill-container">
                <section id="skills">
                
            <section class="container">
                <div class="title">
                    <h3 class="bold">name</h3>
                    <div class="keyline"></div>
                </div>
                <div class="minimal flex-container">
                    <div class="main-skill skill left">keywords</div>
                </div>
            </section>
                </section>
            </div>`);
    });
});
