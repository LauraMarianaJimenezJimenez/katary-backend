const conductaService = require('../services/conductaService');

const submitConducta = async (req, res) => {
  try {
    const {
      nombre,
      documento,
      propiedad,
      fecha_firma,
      firma,
      acepta_manual
    } = req.body;

    // Campos obligatorios según la tabla
    if (
      !nombre ||
      !documento ||
      !propiedad ||
      !fecha_firma ||
      !firma ||
      acepta_manual !== true
    ) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios o no se aceptó el manual'
      });
    }

    await conductaService.createConducta({
      nombre,
      documento,
      propiedad,
      fecha_firma,
      firma,
      acepta_manual
    });

    res.status(201).json({
      success: true,
      message: 'Código de conducta registrado correctamente'
    });

  } catch (err) {
    console.error('ERROR CONDUCTA:', err);
    res.status(500).json({
      error: 'Error interno al guardar el código de conducta',
      detail: err.message
    });
  }
};

module.exports = {
  submitConducta
};
