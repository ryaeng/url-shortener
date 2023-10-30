module.exports.seed = function (knex) {
    // Delete ALL existing entries
    return knex("urls", "uses");
};