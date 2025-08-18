import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import InterestsGenerator from '../../src/generator/Interests.js';

describe('Interest', () => {
    it('generate empty Interests', () => {
        const interests = InterestsGenerator.generate([], {
            works: 'works',
            planguages: 'planguages',
            team: 'team',
            tools: 'tools',
            environment: 'environment',
            methods: 'methods',
            worksSkill: 'worksSkill',
            diploma: 'diploma',
            language: 'language',
            interests: 'interests'
        });
        assert.equal(interests, ``);
    });

    it('generate full Interests', () => {
        const interests = InterestsGenerator.generate([
            {
                name: 'interestName'
            }
        ], {
            works: 'works',
            planguages: 'planguages',
            team: 'team',
            tools: 'tools',
            environment: 'environment',
            methods: 'methods',
            worksSkill: 'worksSkill',
            diploma: 'diploma',
            language: 'language',
            interests: 'interests'
        });
        assert.equal(interests, ``);
    });
});
