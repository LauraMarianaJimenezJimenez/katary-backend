const downloadsService = require('../services/downloadsService');
const { getFormattedDate } = require('../utils/dateUtils');

const getReport = async (req, res) => {
    try {
        const { from, to, type } = req.query;

        if (!from || !to || !type) {
            return res.status(400).json({ error: "Missing query parameters: from, to, type" });
        }

        if (type !== 'conducta' && type !== 'tra') {
            return res.status(400).json({ error: "Invalid type. Must be 'conducta' or 'tra'" });
        }

        const workbook = await downloadsService.generateExcel(from, to, type);

        const fileName = `report-${getFormattedDate()}.xlsx`;

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getReport
};
