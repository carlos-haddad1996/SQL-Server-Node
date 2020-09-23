const express = require('express');
const app = express();
require('msnodesqlv8');

const bodyParser = require('body-parser');
const { SSL_OP_NO_QUERY_MTU, RSA_PSS_SALTLEN_AUTO } = require('constants');
const port = process.env.PORT || 5000;

//console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//Database Config
const config = {
    user: 'user',
    password: 'password',
    server: 'server',
    database: 'database',
    port: 1433,
};

const sql = require('mssql');

//create a GET for Clients
app.get('/client', (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err);
        }

        let sqlRequest = new sql.Request();
        let sqlQuery = `
            SELECT TOP (1000) c.[Id]
                ,c.[Nombre]
                ,[Apellido]
                ,[Email]
                ,[FechaNacimiento]
                ,[Direccion]
                ,[Telefono]
                ,[Usuario]
                ,[Password]
                ,CONVERT(VARCHAR(MAX), DECRYPTBYPASSPHRASE('password', Password)) PassDesencriptada
                ,r.Nombre Rol
            FROM [DBBusBooking].[dbo].[Cliente] c
            INNER JOIN Roles r
                ON r.Id=c.RolId
        `;

        sqlRequest.query(sqlQuery, (err, data) => {
            if (err) {
                console.log(err);
            }

            console.log(data);
            sql.close();
            res.send({
                clientes: data.recordsets,
            });
        });
    });
});

//create a GET for Origen
app.get('/origen', (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err);
        }

        let sqlRequest = new sql.Request();
        let sqlQuery = 'SELECT * FROM CiudadOrigen';

        sqlRequest.query(sqlQuery, (err, data) => {
            if (err) {
                console.log(err);
            }

            sql.close();
            res.send({
                ciudadOrigen: data.recordsets,
            });
        });
    });
});

//create a GET for Destino
app.get('/destino', (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err);
        }

        let sqlRequest = new sql.Request();
        let sqlQuery = 'SELECT * FROM CiudadDestino';

        sqlRequest.query(sqlQuery, (err, data) => {
            if (err) {
                console.log(err);
            }

            sql.close();
            res.send({
                ciudadDestino: data.recordsets,
            });
        });
    });
});

//create a GET for HoraSalida
app.get('/hora-salida', (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err);
        }

        let sqlRequest = new sql.Request();
        let sqlQuery = 'SELECT * FROM HoraSalida';

        sqlRequest.query(sqlQuery, (err, data) => {
            if (err) {
                console.log(err);
            }

            sql.close();
            res.send({
                horaSalida: data.recordsets,
            });
        });
    });
});

//create a GET for HoraLlegada
app.get('/hora-llegada', (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err);
        }

        let sqlRequest = new sql.Request();
        let sqlQuery = 'SELECT * FROM HoraLlegada';

        sqlRequest.query(sqlQuery, (err, data) => {
            if (err) {
                console.log(err);
            }

            sql.close();
            res.send({
                horaLlegada: data.recordsets,
            });
        });
    });
});
