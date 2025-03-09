const { version } = require('../../package.json');

const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: 'node-express-boilerplate API documentation',
        version,
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}/api/v1`,
        },
    ],
};

module.exports = swaggerDef;
