const db = require("../db/connection");

const useExists = async (req, res, next) => {
    const { useId } = req.params;

    const foundUse = await db("uses").where({ id: useId }).first();

    if (foundUse) {
        res.locals.use = foundUse;
        return next();
    }

    next({
        status: 404,
        message: `Use id not found: ${useId}`,
    });
}

const destroy = async (req, res) => {
    const { useId } = req.params;

    await db("uses").where({ id: useId }).del();

    res.sendStatus(204);
}

const list = async (req, res) => {
    const { urlId } = req.params;

    const uses = await db("uses").where({ urlId: urlId });

    res.json({ data: uses });
}

const read = (req, res) => {
    res.json({ data: res.locals.use});
}

module.exports = {
    delete: [useExists, destroy],
    list,
    read: [useExists, read],
}