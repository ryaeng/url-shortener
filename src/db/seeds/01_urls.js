exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("urls").insert([
        {
          href: "http://www.google.com",
        },
        {
          href: "https://nfl.com",
        },
    ]);
};