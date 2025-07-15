const  analyticsService  = require("../Utils/analyticsServices");
const { Op, Sequelize} = require('sequelize');

exports.getOverview = async (req, res) => {
  try {
    const { year, start, end, category } = req.query;
    const filters = { year, start, end, category };
    const filter1 = { year, start, end };

    const [total, categoryData, itemData, monthData] = await Promise.all([
      analyticsService.getTotalExpense(filters),
      analyticsService.getGroupedData({ ...filter1, groupField: 'category.categoryName', labelField: 'category.categoryName' }),
      analyticsService.getGroupedData({ ...filters, groupField: 'itemName', labelField: 'itemName' }),
analyticsService.getGroupedData({
  ...filters,
  groupField: Sequelize.literal('MONTH(date)'),
  labelField: Sequelize.literal('MONTH(date)')
}) 

]);

    res.status(200).json({
      total,
      category: categoryData,
      items: itemData,
      months: monthData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
