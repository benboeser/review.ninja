/**
 * Configuration Module
 *
 * @title config
 * @overview Configuration Module
 */
module.exports = {

    terms: process.env.TERMS_URL,

    milestone_prefix: process.env.MILESTONE_PREFIX || '',

    server: {
        github: {
            // optional
            protocol: process.env.GITHUB_PROTOCOL || 'https',
            host: process.env.GITHUB_HOST || 'github.com',
            api: process.env.GITHUB_API_HOST || 'api.github.com',
            enterprise: !!process.env.GITHUB_HOST, // flag enterprise version
            version: process.env.GITHUB_VERSION || '3.0.0',

            // required
            client: process.env.GITHUB_CLIENT,
            secret: process.env.GITHUB_SECRET,

            // required
            user: process.env.GITHUB_USER,
            pass: process.env.GITHUB_PASS,

            // review.ninja specific
            public_scope: ['user:email', 'repo', 'repo:status', 'read:repo_hook', 'write:repo_hook', 'read:org'],
            private_scope: ['user:email', 'repo', 'repo:status', 'read:repo_hook', 'write:repo_hook', 'read:org'],
            webhook_events: ['pull_request', 'issues', 'issue_comment', 'status']
        },

        localport: process.env.PORT || 5000,

        always_recompile_sass: process.env.NODE_ENV === 'production' ? false : true,

        http: {
            protocol: process.env.PROTOCOL || 'https',
            host: process.env.HOST || 'review.ninja',
            port: process.env.HOST_PORT
        },

        https: {
            certs: process.env.CERT
        },

        security: {
            sessionSecret: process.env.SESSION_SECRET || 'review.ninja',
            cookieMaxAge: 60 * 60 * 1000
        },

        smtp: {
            enabled: !!process.env.SMTP_HOST,
            host: process.env.SMTP_HOST,
            secure: (!!process.env.SMTP_SSL && process.env.SMTP_SSL === 'true'),
            port: process.env.SMTP_PORT || 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            name: 'review.ninja'
        },

        mongodb: {
            uri: process.env.MONGODB || process.env.MONGOLAB_URI
        },

        static: {
            lib: [__dirname + '/bower'],
            app: [__dirname + '/client']
        },

        api: [
            __dirname + '/server/api/*.js'
        ],

        webhooks: [
            __dirname + '/server/webhooks/*.js'
        ],

        documents: [
            __dirname + '/server/documents/*.js'
        ],

        controller: [
            __dirname + '/server/controller/!(default).js',
            __dirname + '/server/controller/default.js'
        ],

        middleware: [
            __dirname + '/server/middleware/*.js'
        ],

        passport: [
            __dirname + '/server/passports/*.js'
        ]

    }

};
