const db = require('../db');
const ExcelJS = require('exceljs');

const generateExcel = async (from, to, type) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Reporte');

    let query = '';
    let params = [];

    // Basic query construction
    // NOTE: Schema timestamps are TIMESTAMP, so basic date comparison should cast or be mindful of time.
    // Using simple DATE() casting for comparison.

    if (type === 'conducta') {
        sheet.columns = [
            { header: 'ID', key: 'id', width: 5 },
            { header: 'Nombre Completo', key: 'full_name', width: 30 },
            { header: 'Tipo Docs', key: 'id_type', width: 10 },
            { header: 'Num Documento', key: 'id_number', width: 20 },
            { header: 'Nacionalidad', key: 'nationality', width: 20 },
            { header: 'Llegada', key: 'arrival_date', width: 15 },
            { header: 'Salida', key: 'departure_date', width: 15 },
            { header: 'Autorización', key: 'authorization', width: 10 },
            { header: 'Creado', key: 'created_at', width: 20 }
        ];

        query = `
      SELECT * FROM conducta_entries 
      WHERE created_at::date >= $1 AND created_at::date <= $2
      ORDER BY created_at DESC
    `;
        params = [from, to];

    } else if (type === 'tra') {
        sheet.columns = [
            { header: 'ID', key: 'id', width: 5 },
            { header: 'Apartamento', key: 'apartment', width: 15 },
            { header: 'Código Reserva', key: 'booking_code', width: 15 },
            { header: 'Tipo Doc', key: 'id_type', width: 10 },
            { header: 'Num Doc', key: 'id_number', width: 15 },
            { header: 'Nombre', key: 'first_name', width: 15 },
            { header: 'Apellido', key: 'last_name', width: 15 },
            { header: 'Residencia', key: 'city_residence', width: 15 },
            { header: 'Origen', key: 'city_origin', width: 15 },
            { header: 'Teléfono', key: 'phone', width: 15 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Entrada', key: 'check_in', width: 15 },
            { header: 'Salida', key: 'check_out', width: 15 },
            { header: 'Valor Pagado', key: 'amount_paid', width: 15 },
            { header: 'Acompañantes', key: 'num_companions', width: 10 },
            { header: 'Creado', key: 'created_at', width: 20 }
        ];

        query = `
      SELECT * FROM tra_entries 
      WHERE created_at::date >= $1 AND created_at::date <= $2
      ORDER BY created_at DESC
    `;
        params = [from, to];
    } else {
        throw new Error('Tipo invalido');
    }

    const { rows } = await db.query(query, params);

    rows.forEach(row => {
        sheet.addRow(row);
    });

    return workbook;
};

module.exports = {
    generateExcel
};
