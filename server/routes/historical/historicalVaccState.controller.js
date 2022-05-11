const asyncHandler = require("express-async-handler");
const Query = require("../../query/Query");
const query = new Query();

const getHistoricalActiveVaccData = asyncHandler(async (req, res) => {
  const { page, pageSize, date } = req.query;
  const { stateName } = req.params;

  if (!date && (!page || !pageSize || !stateName)) {
    res.status(401);
    throw Error("Invalid params");
  }

  const limit = pageSize;
  const offset =
    page === null || pageSize === null ? null : (page - 1) * pageSize;

  const totalItems = await query.getTotalItemCount("state_vacc", {
    stateName,
  });

  if (totalItems[0].count < 1) {
    res.status(404);
    throw Error("Invalid params");
  }

  if (!date) {
    const data = await query.getHistoricalStateVacc({
      stateName,
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      pages: {
        pageSize,
        pageNumber: page,
        totalItems: totalItems[0].count,
        totalPage: Math.ceil(totalItems[0].count / pageSize),
      },
      data,
    });
  } else {
    const data = await query.getHistoricalStateVacc({ stateName, date });

    res.status(200).json({ success: true, data });
  }
});

module.exports = getHistoricalActiveVaccData;
