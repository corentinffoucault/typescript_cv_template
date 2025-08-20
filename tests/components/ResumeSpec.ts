import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import ResumeGenerator from '../../src/generator/Resume.js';

describe.skip('Header', () => {
    it('generate minimal resume', () => {
        const resume = ResumeGenerator.generate({
            basics: {
                name: 'firstName lastName',
                label: 'BackEnd Developer Engineer',
                email: 'myemail@email.com',
                phone: '001122334455',
                location: {
                    city: 'myCity',
                    countryCode: 'FR'
                }
            },
            education: [],
            skills: [],
            work: [],
            languages: [],
            interests: [],
            labels: {
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
            }
        }, Buffer.from(''), Buffer.from(''));
        assert.equal(resume, ``);
    });

    it('generate full resume', () => {
        const resume = ResumeGenerator.generate({
            basics: {
                name: 'firstName lastName',
                label: 'BackEnd Developer Engineer',
                email: 'myemail@email.com',
                phone: '001122334455',
                location: {
                    city: 'myCity',
                    countryCode: 'FR'
                }
            },
            education: [],
            skills: [],
            work: [],
            languages: [],
            interests: [],
            labels: {
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
            }
        }, Buffer.from('</style>'), Buffer.from('</script>'));
        assert.equal(resume, ``);
    });
});
