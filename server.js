const express = require('express');
require('msnodesqlv8');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/products', (req, res) => {
    const sql = require('mssql');

    const config = {
        user: 'local_user',
        password: 'local_password',
        server: 'server',
        database: 'database_name',
        port: 1433,
    };

    sql.connect(config, (err) => {
        if (err) {
            console.log(err);
        }

        //create a new Request object to query with
        let sqlRequest = new sql.Request();
        let year = req.body.products_list;
        console.log(year);
        //query to the database and get the records/fields in the data Object
        let sqlQuery =
            'SELECT product_name, list_price FROM production.products WHERE model_year = ' +
            parseInt(year);
        //Run the query. Send output ONLY the console for now.
        sqlRequest.query(sqlQuery, (err, data) => {
            if (err) {
                console.log(err);
            }

            //Display the data in the console
            console.log(data), console.table(data.recordset);
            console.log(data.rowsAffected);
            console.log(data.recordset[0]);

            let h =
                '<h1 style="margin:20px; border:20px solid red;">Product Year Board';
            let str = '<table style="margin-left:20px">';
            let row = '';

            for (let j = 0; j < data.recordset.length; j++) {
                row =
                    row +
                    '<tr>' +
                    '<td style="width:150px;">' +
                    data.recordset[j].product_name +
                    '</td>' +
                    '<td style="width:150px;">' +
                    data.recordset[j].list_price +
                    '</td>';
            }
            str = str + row + '</table>';
            //Close the Connection
            res.send(h + str);
            sql.close();
        });
    });
});

const webserver = app.listen(5000, () => {
    console.log('Node Web Server is running...');
});
