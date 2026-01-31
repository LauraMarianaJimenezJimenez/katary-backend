const traService = require('../services/traService');

const submitTra = async (req, res) => {
  try {
    const {
      apartamento,
      codigo_reserva,
      tipo_id,
      numero_id,
      nombres,
      apellidos,
      ciudad_residencia,
      ciudad_procedencia,
      telefono,
      email,
      motivo_viaje,
      tipo_acomodacion,
      numero_acompanantes,
      fecha_llegada,
      fecha_salida,
      valor_pagado,
      consentimiento,
      firma,
      companions
    } = req.body;

    // 🔹 Campos obligatorios TRA
    if (
      !apartamento ||
      !codigo_reserva ||
      !tipo_id ||
      !numero_id ||
      !nombres ||
      !apellidos ||
      !ciudad_residencia ||
      !ciudad_procedencia ||
      !telefono ||
      !fecha_llegada ||
      !fecha_salida
    ) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios del registro TRA'
      });
    }

    // 🔹 Validación de fechas
    if (new Date(fecha_salida) < new Date(fecha_llegada)) {
      return res.status(400).json({
        error: 'La fecha de salida no puede ser menor a la de llegada'
      });
    }

    // 🔹 Enviar todo al service (sin lógica aquí)
    await traService.createTra({
      apartamento,
      codigo_reserva,
      tipo_id,
      numero_id,
      nombres,
      apellidos,
      ciudad_residencia,
      ciudad_procedencia,
      telefono,
      email,
      motivo_viaje,
      tipo_acomodacion,
      numero_acompanantes,
      fecha_llegada,
      fecha_salida,
      valor_pagado,
      consentimiento,
      firma,
      companions
    });

    res.status(201).json({
      success: true,
      message: 'Registro TRA guardado correctamente'
    });

  } catch (err) {
    console.error('ERROR REAL TRA:', err);
    res.status(500).json({
        error: 'Error interno al guardar el registro TRA',
        detail: err.message
    });
}
};

module.exports = {
  submitTra
};
