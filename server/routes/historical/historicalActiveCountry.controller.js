const asyncHandler = require("express-async-handler");
const Query = require("../../query/Query");
const query = new Query();

const getHistoricalActiveCountryData = asyncHandler(async (req, res) => {
  const { page, pageSize, date } = req.query;

  if (!date && (!page || !pageSize)) {
    res.status(401);
    throw Error("Invalid params");
  }

  const limit = pageSize;
  const offset =
    page === null || pageSize === null ? null : (page - 1) * pageSize;

  if (!date) {
    const totalItems = await query.getTotalItemCount("malaysia_active", {});

    const data = await query.getHistoricalCountryActiveCase({ limit, offset });

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
    const data = await query.getHistoricalCountryActiveCase({ date });
    res.status(200).json({ success: true, data });
  }
});

module.exports = getHistoricalActiveCountryData;
