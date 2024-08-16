const { sequelize } = require('../../config/db');

// const Item = require('../../models/Item')
// const Consignment = require('../../models/Consignment');
// const ConsignmentItem =  require('../../models/ConsignmentItem');



const getByCTN = async (req, res) => {
  let { commodityTrackingNumber, startDate, endDate } = req.query;

  // Basic parameter validation (unchanged)
  // ...

  try {
    // Combined query with UNION ALL
    const query = `
      (SELECT 
        i.commodityTrackingNumber AS CTN,
        i.id AS itemId,
        i.itemGroup,
        i.itemDescription AS description,
        i.origin,
        i.UM,
        ci.unitsConsigned AS units,
        ci.consignmentId,
        c.documentNumber,
        c.finalDestination AS fromTo,
        c.createdAt AS date,
        c.warehouseId AS warehouse
      FROM Items i
      LEFT JOIN ConsignmentItems ci ON i.id = ci.itemId
      LEFT JOIN Consignments c ON ci.consignmentId = c.id
      WHERE i.commodityTrackingNumber = :commodityTrackingNumber
        AND c.createdAt BETWEEN :startDate AND :endDate)
      UNION ALL
      (SELECT 
        i.commodityTrackingNumber AS CTN,
        i.id AS itemId,
        i.itemGroup,
        i.itemDescription AS description,
        i.origin,
        i.UM,
        CASE WHEN wboi.units IS NOT NULL THEN -wboi.units ELSE wboi.units END AS units,
        wboi.wayBillOutId,
        wbo.documentNumber,
        wbo.from AS fromTo,
        wbo.createdAt AS date,
        wbo.warehouseId AS warehouse
      FROM Items i
      LEFT JOIN WayBillOutItems wboi ON i.id = wboi.itemId
      LEFT JOIN WayBillOuts wbo ON wboi.wayBillOutId = wbo.id
      WHERE i.commodityTrackingNumber = :commodityTrackingNumber
        AND wbo.createdAt BETWEEN :startDate AND :endDate)
    `;

    const results = await sequelize.query(query, {
      replacements: {
        commodityTrackingNumber,
        startDate,
        endDate
      },
      type: sequelize.QueryTypes.SELECT
    });

    // Handle empty results (optional)
    if (!results.length) {
      return res.status(200).json({ status: 'success', message: `no items availabe between ${startDate} and ${endDate}.` });
    }

    console.log(results)

    const modifiedResults = results.map(result => {
      // Use ternary operator to assign 'inOut' based on units value
      result.inOut = result.units > 0 ? 'IN' : 'OUT';
      return result;
    });

    res.status(200).json({ status: 'success', data: modifiedResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'denied', message: error });
  }
};
// Export functions
module.exports = {
    getByCTN
};