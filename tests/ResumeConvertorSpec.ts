import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

import ResumeConvertor from '../src/ResumeConvertor.js';

test('ResumeConvertor', async (t) => {
    await t.test('Create an empty resume', async (st) => {
        const resumeConvertor = new ResumeConvertor();
        const a = await resumeConvertor.generateResume({
            labels: {
                works: '',
                planguages: '',
                team: '',
                tools: '',
                environment: '',
                methods: '',
                worksSkill: '',
                diploma: '',
                language: '',
                interests: ''
            },
            basics: {
                name: undefined,
                label: undefined,
                image: undefined,
                email: undefined,
                phone: undefined,
                url: undefined,
                summary: undefined,
                birth: '',
                location: undefined,
                profiles: undefined
            },
            volunteer: [],
            education: [],
            awards: [],
            certificates: [],
            publications: [],
            skills: [],
            languages: [],
            interests: [],
            references: [],
            projects: [],
            meta: {
                canonical: undefined,
                version: undefined,
                lastModified: undefined
            }
        });

        const __filename = fileURLToPath(import.meta.url);
        const _srcPath = path.dirname(__filename);
        const result = await fs.readFile(path.join(_srcPath, "../../testResources/resultEmpty.html"));
        assert.equal(a, result.toString());
    });
});
