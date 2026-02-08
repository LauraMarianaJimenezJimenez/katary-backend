const downloadsService = require('../services/downloadsService');

/**
 * GET /api/downloads
 * Query params:
 *  - fecha_inicio (YYYY-MM-DD)
 *  - fecha_fin (YYYY-MM-DD)
 *  - tipo (TRA | CODIGO | ACOMPANANTES)
 */
const downloadForms = async (req, res) => {
  try {
    const { tipo, fecha_inicio, fecha_fin } = req.query;

    // 🔹 Validaciones básicas
    if (!fecha_inicio || !fecha_fin || !tipo) {
      return res.status(400).json({
        error: 'Debe enviar fecha_inicio, fecha_fin y tipo'
      });
    }

    if (new Date(fecha_fin) < new Date(fecha_inicio)) {
      return res.status(400).json({
        error: 'La fecha fin no puede ser menor a la fecha inicio'
      });
    }

    // 🔹 Ruteo por tipo de registro
    switch (tipo) {
      case 'tra':
        await downloadsService.exportTraExcel(res, fecha_inicio, fecha_fin);
        return;

      case 'conducta':
        await downloadsService.exportCodigoConductaExcel(res, fecha_inicio, fecha_fin);
        return;

      case 'acompanantes':
        await downloadsService.exportAcompanantesExcel(res, fecha_inicio, fecha_fin);
        return;

      default:
        return res.status(400).json({
          error: 'Tipo inválido. Use TRA, CODIGO o ACOMPANANTES'
        });
    }

  } catch (err) {
    console.error('ERROR DESCARGA:', err);

    res.status(500).json({
      error: 'Error al generar el archivo',
      detail: err.message
    });
  }
};

module.exports = {
  downloadForms
};