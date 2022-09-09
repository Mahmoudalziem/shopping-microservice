const envConfig = require('./knexfile').development;

const knex_read_config = envConfig;

const knex_write_config = envConfig;

const knex_read = require('knex')(knex_read_config);

const knex_write = require('knex')(knex_write_config);

if (process.env.RUN_MIGRATIONS) {

    knex_write.migrate.rollback([envConfig])
        .then(() => knex_write.migrate.latest([envConfig])
            .then(() => knex_write.seed.run([envConfig])
                .then(() => console.log("Done Migration && Seeds"))
            )
        );
};

module.exports = {

    read: knex_read,

    write: knex_write
};