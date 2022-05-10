const asyncHandler = require("express-async-handler");
const Query = require("../../query/Query");
const query = new Query();

const getHistoricalActiveCountryData = asyncHandler(async (req, res) => {
  const { page, pageSize } = req.query;

  if (!page || !pageSize) {
    res.status(401);
    throw Error("Invalid params");
  }

  const limit = pageSize;
  const offset =
    page === null || pageSize === null ? null : (page - 1) * pageSize;

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
});

module.exports = getHistoricalActiveCountryData;
