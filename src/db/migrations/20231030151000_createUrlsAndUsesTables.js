exports.up = function (knex) {
    return knex.schema
        .createTable("urls", (table) => {
            table.increments("id");
            table.string("href");
        })
        .createTable("uses", (table) => {
            table.increments("id");
            table.integer("urlId");
            table.bigInteger("time");
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable("urls")
        .dropTable("uses");
};