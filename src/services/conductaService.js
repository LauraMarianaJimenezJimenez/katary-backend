const db = require('../db');

const createConducta = async (data) => {
  const query = `
    INSERT INTO codigo_conducta (
      nombre,
      documento,
      propiedad,
      fecha_firma,
      firma,
      acepta_manual
    ) VALUES ($1, $2, $3, $4, $5, $6)
  `;

  const values = [
    data.nombre,
    data.documento,
    data.propiedad,
    data.fecha_firma,
    data.firma,
    data.acepta_manual
  ];

  await db.query(query, values);
};

module.exports = {
  createConducta
};
