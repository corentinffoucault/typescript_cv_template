import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import WorkGenerator from '../../src/generator/Work.js';

describe('Header', () => {
    it('generate minimal header', () => {
        const header = WorkGenerator.generate([], {
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
        assert.equal(header, ``);
    });

    it('generate full header', () => {
        const header = WorkGenerator.generate([{
            description: 'description',
            endDate: '2012',
            env: [],
            highlights: [],
            location: 'location',
            method: [],
            name: 'name',
            planguages: [],
            position: '',
            startDate: '2013',
            summary: 'summary',
            team: {
                back: 1,
                description: 'description',
                front: 1,
                fullStack: 2
            },
            tools: [],
            url: 'url'
        }], {
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
        assert.equal(header, ``);
    });
});
