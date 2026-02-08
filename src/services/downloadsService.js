const ExcelJS = require('exceljs');
const db = require('../db');

/* =========================
   EXPORTAR TRA (SOLO HUÉSPEDES)
========================= */
const exportTraExcel = async (res, fechaInicio, fechaFin) => {
  const query = `
    SELECT
      id,
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
      fecha_registro,
      created_at
    FROM tra_huesped
    WHERE created_at BETWEEN $1 AND $2
    ORDER BY created_at ASC
  `;

  const result = await db.query(query, [fechaInicio, fechaFin]);

  if (result.rows.length === 0) {
    throw new Error('No existen registros TRA en el rango de fechas');
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Huespedes');

  sheet.columns = [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'Apartamento', key: 'apartamento', width: 15 },
    { header: 'Código reserva', key: 'codigo_reserva', width: 20 },
    { header: 'Tipo ID', key: 'tipo_id', width: 10 },
    { header: 'Número ID', key: 'numero_id', width: 18 },
    { header: 'Nombres', key: 'nombres', width: 20 },
    { header: 'Apellidos', key: 'apellidos', width: 20 },
    { header: 'Ciudad residencia', key: 'ciudad_residencia', width: 18 },
    { header: 'Ciudad procedencia', key: 'ciudad_procedencia', width: 18 },
    { header: 'Teléfono', key: 'telefono', width: 15 },
    { header: 'Email', key: 'email', width: 25 },
    { header: 'Motivo viaje', key: 'motivo_viaje', width: 20 },
    { header: 'Tipo acomodación', key: 'tipo_acomodacion', width: 18 },
    { header: '# Acompañantes', key: 'numero_acompanantes', width: 16 },
    { header: 'Fecha llegada', key: 'fecha_llegada', width: 14 },
    { header: 'Fecha salida', key: 'fecha_salida', width: 14 },
    { header: 'Valor pagado', key: 'valor_pagado', width: 14 },
    { header: 'Consentimiento', key: 'consentimiento', width: 15 },
    { header: 'Firma', key: 'firma', width: 20 },
    { header: 'Fecha registro', key: 'fecha_registro', width: 14 },
    { header: 'Creado en', key: 'created_at', width: 20 }
  ];

  result.rows.forEach(row => sheet.addRow(row));
  sheet.autoFilter = 'A1:U1';

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=TRA_${fechaInicio}_a_${fechaFin}.xlsx`
  );

  await workbook.xlsx.write(res);
  res.end();
};

/* =========================
   EXPORTAR ACOMPAÑANTES
========================= */
  const exportAcompanantesExcel = async (res, fechaInicio, fechaFin) => {
  const query = `
    SELECT
      a.id,
      a.tra_huesped_id,
      h.apartamento,
      h.codigo_reserva,
      a.tipo_id,
      a.numero_id,
      a.nombre_completo,
      a.created_at
    FROM tra_acompanante a
    JOIN tra_huesped h ON h.id = a.tra_huesped_id
    WHERE h.created_at BETWEEN $1 AND $2
    ORDER BY a.created_at ASC
  `;

  const result = await db.query(query, [fechaInicio, fechaFin]);

  if (result.rows.length === 0) {
    throw new Error('No existen acompañantes en el rango de fechas');
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Acompanantes');

  sheet.columns = [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'TRA huésped ID', key: 'tra_huesped_id', width: 15 },
    { header: 'Apartamento', key: 'apartamento', width: 15 },
    { header: 'Código reserva', key: 'codigo_reserva', width: 20 },
    { header: 'Tipo ID', key: 'tipo_id', width: 10 },
    { header: 'Número ID', key: 'numero_id', width: 18 },
    { header: 'Nombre completo', key: 'nombre_completo', width: 25 },
    { header: 'Creado en', key: 'created_at', width: 20 }
  ];

  result.rows.forEach(row => sheet.addRow(row));
  sheet.autoFilter = 'A1:H1';

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=Acompanantes_${fechaInicio}_a_${fechaFin}.xlsx`
  );

  await workbook.xlsx.write(res);
  res.end();
};

/* =========================
   EXPORTAR CÓDIGO CONDUCTA
========================= */
const exportCodigoConductaExcel = async (res, fechaInicio, fechaFin) => {
  const query = `
    SELECT
      nombre,
      documento,
      propiedad,
      fecha_firma,
      firma,
      acepta_manual,
      created_at
    FROM codigo_conducta
    WHERE created_at BETWEEN $1 AND $2
    ORDER BY created_at ASC
  `;

  const result = await db.query(query, [fechaInicio, fechaFin]);

  if (result.rows.length === 0) {
    throw new Error('No hay registros de Código de Conducta en el rango');
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Código de Conducta');

  sheet.columns = [
    { header: 'Nombre', key: 'nombre', width: 25 },
    { header: 'Documento', key: 'documento', width: 18 },
    { header: 'Propiedad', key: 'propiedad', width: 20 },
    { header: 'Fecha firma', key: 'fecha_firma', width: 15 },
    { header: 'Firma', key: 'firma', width: 20 },
    { header: 'Acepta manual', key: 'acepta_manual', width: 18 },
    { header: 'Creado', key: 'created_at', width: 20 }
  ];

  result.rows.forEach(row => sheet.addRow(row));
  sheet.autoFilter = 'A1:G1';

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=Codigo_Conducta_${fechaInicio}_a_${fechaFin}.xlsx`
  );

  await workbook.xlsx.write(res);
  res.end();
};

module.exports = {
  exportTraExcel,
  exportAcompanantesExcel,
  exportCodigoConductaExcel
};