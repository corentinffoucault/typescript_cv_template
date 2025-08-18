import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import SkillGenerator from '../../src/generator/Skills.js';

describe('Skills', () => {
    it('generate minimal skills', () => {
        const header = SkillGenerator.generate([]);
        assert.equal(header, ``);
    });

    it('generate full skills', () => {
        const header = SkillGenerator.generate([{
            keywords: ['keywords'],
            level: 'level',
            name: 'name'
        }]);
        assert.equal(header, ``);
    });
});
