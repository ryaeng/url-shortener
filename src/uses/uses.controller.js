const uses = require("../data/uses-data");

const useExists = (req, res, next) => {
    const { useId } = req.params;
    const foundUse = uses.find((use) => use.id === Number(useId));
    if (foundUse) {
        res.locals.use = foundUse;
        return next();
    }
    next({
        status: 404,
        message: `Use id not found: ${useId}`,
    });
}

const destroy = (req, res) => {
    const { useId } = req.params;
    const index = uses.findIndex((use) => use.id === useId);
    const deletedUses = uses.splice(index, 1);
    res.sendStatus(204);
}

const list = (req, res) => {
    const { urlId } = req.params;
    res.json({ data: uses.filter(urlId ? use => use.urlId == urlId : () => true) });
}

const read = (req, res) => {
    res.json({ data: res.locals.use});
}

module.exports = {
    delete: [useExists, destroy],
    list,
    read: [useExists, read],
}