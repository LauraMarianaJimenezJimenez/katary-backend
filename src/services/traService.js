const db = require('../db');

const createTra = async (data) => {
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    // 1️⃣ Insertar huésped principal (TRA)
    const traInsertQuery = `
      INSERT INTO tra_huesped (
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
        fecha_registro
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
        $11,$12,$13,$14,$15,$16,$17,$18,NOW()
      )
      RETURNING id
    `;


    const traValues = [
      data.apartamento,
      data.codigo_reserva,
      data.tipo_id,
      data.numero_id,
      data.nombres,
      data.apellidos,
      data.ciudad_residencia || null,
      data.ciudad_procedencia || null,
      data.telefono,
      data.email || null,
      data.motivo_viaje || null,
      data.tipo_acomodacion || null,
      data.numero_acompanantes || 0,
      data.fecha_llegada,
      data.fecha_salida,
      data.valor_pagado || null,
      data.consentimiento === true,
      `${data.nombres} ${data.apellidos}` // FIRMA
    ];


    const traResult = await client.query(traInsertQuery, traValues);
    const traId = traResult.rows[0].id;

 // 2️⃣ Insertar acompañantes (si existen)
if (Array.isArray(data.companions) && data.companions.length > 0) {

  const companionQuery = `
    INSERT INTO tra_acompanante (
      tra_huesped_id,
      tipo_id,
      numero_id,
      nombre_completo
    ) VALUES ($1,$2,$3,$4)
  `;

  for (const companion of data.companions) {
    await client.query(companionQuery, [
      traId,
      companion.tipo_id,
      companion.numero_id,
      companion.nombre_completo
    ]);
  }
}
    await client.query('COMMIT');
    return traId;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createTra
};
