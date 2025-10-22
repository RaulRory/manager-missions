import fastify from "fastify";

const logConfig = {
   development: {
        transport: {
            target: 'pino-pretty',
            option: {
                transleteTime: 'HH:MM:ss Z',
                ignore: 'pid, hostname'
            },
        },
    },
    production: true,
    test: false
};

const app = fastify({
    logger: logConfig[process.env.ENVIRONMENT]
});

app.listen({port: process.env.PORT})
    .then(console.log("API Manager Missions is Up"));

