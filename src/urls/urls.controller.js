const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

let lastUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);

const hasHref = (req, res, next) => {
    const { data: { href } = {} } = req.body;

    if (href) {
        return next();
    }
    next({ 
        status: 400, 
        message: "An 'href' property is required." });
}

const urlExists = (req, res, next) => {
    const { urlId } = req.params;
    const foundUrl = urls.find((url) => url.id === Number(urlId));
    if (foundUrl) {
        res.locals.url = foundUrl;
        return next();
    }
    next({
        status: 404,
        message: `Url id not found: ${urlId}`,
    });
}

const create = (req, res) => {
    const { data: { href } = {} } = req.body;
    const newUrl = {
        id: ++lastUrlId,
        href,
    };
    urls.push(newUrl);
    res.status(201).json({ data: newUrl });
}

const list = (req, res) => {
    res.json({ data: urls });
}

const read = (req, res) => {
    const url = res.locals.url;
    const newUrlId = urls.length + 1;
    uses.push({
        id: newUrlId,
        urlId: url.id,
        time: Date.now(),
    });
    res.json({ data: url });
}

const update = (req, res) => {
    const url = res.locals.url;
    const { data: { href } = {} } = req.body;

    // Update the url
    url.href = href;

    res.json({ data: url });
}

module.exports = {
    create: [hasHref, create],
    list,
    read: [urlExists, read],
    update: [urlExists, hasHref, update],
    urlExists,
}