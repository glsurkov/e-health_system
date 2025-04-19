import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
    schemaFile: 'https://dpm.dev-mips.ru/swagger-json',
    apiFile: './src/shared/api/base.ts',
    apiImport: 'api',
    exportName: 'dpm',
    hooks: {
        lazyQueries: true,
        mutations: true,
        queries: true,
    },
    tag: true,
    outputFiles: {
        './src/shared/api/rest/users.ts': {
            filterEndpoints: [/users/i],
        },
        './src/shared/api/rest/auth.ts': {
            filterEndpoints: [/auth/i],
        },
        './src/shared/api/rest/projects.ts': {
            filterEndpoints: [/projects/i],
        },
        './src/shared/api/rest/dashboards.ts': {
            filterEndpoints: [/dashboards/i],
        },
        './src/shared/api/rest/templates.ts': {
            filterEndpoints: [/templates/i],
        },
        './src/shared/api/rest/tasks.ts': {
            filterEndpoints: [/tasks/i],
        },
        './src/shared/api/rest/roles.ts': {
            filterEndpoints: [/roles/i],
        },
        './src/shared/api/rest/structure-groups.ts': {
            filterEndpoints: [/structureGroups/i],
        },
        './src/shared/api/rest/sprints.ts': {
            filterEndpoints: [/sprints/i],
        },
        './src/shared/api/rest/hints.ts': {
            filterEndpoints: [/hints/i],
        },
        './src/shared/api/rest/dates.ts': {
            filterEndpoints: [/dates/],
        },
    },
};

export default config;
