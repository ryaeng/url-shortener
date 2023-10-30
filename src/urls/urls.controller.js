const db = require("../db/connection");

const hasHref = (req, res, next) => {
    const { data: { href } = {} } = req.body;

    if (href) {
        res.locals.href = href;
        return next();
    }

    next({
        status: 400, 
        message: "An 'href' property is required.",
    });
}

const urlExists = async (req, res, next) => {
    const { urlId } = req.params;
    const foundUrl = await db("urls").where({ id: urlId }).first();

    if (foundUrl) {
        res.locals.url = foundUrl;
        return next();
    }

    next({
        status: 404,
        message: `Url id not found: ${urlId}`,
    });
}

const create = async (req, res) => {
    const href = res.locals.href;

    const newUrl = await db("urls")
        .insert({ href: href }, ["id", "href"]);

    res.status(201).json({ data: newUrl });
}

const list = async (req, res) => {
    const urls = await db("urls");

    res.json({ data: urls });
}

const read = async (req, res) => {
    const url = res.locals.url;

    await db("uses").insert({ urlId: url.id, time: Date.now() });

    res.json({ data: url });
}

const update = async (req, res) => {
    const href = res.locals.href;
    const url = res.locals.url;

    const updatedUrl = await db("urls")
        .where({ id: url.id })
        .update({ href: href }, ["id", "href"]);

    res.json({ data: updatedUrl });
}

module.exports = {
    create: [hasHref, create],
    list,
    read: [urlExists, read],
    update: [urlExists, hasHref, update],
    urlExists,
}