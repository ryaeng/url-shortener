exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("uses").insert([
        {
          urlId: 1,
          time: 1599161139283,
        },
        {
          urlId: 1,
          time: 1599161143457,
        },
        {
          urlId: 2,
          time: 1599161143457,
        }
    ]);
};