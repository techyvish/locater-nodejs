/*
   customer locater database.
 */

exports.list = function (req, res) {
    req.getConnection(function (err,connection) {
        if ( typeof connection != "undefined" ) {
            var query = connection.query('SELECT * FROM customers', function (err, rows) {
                if (err) {
                    console.log("Error selecting");
                    res.status(500);
                    res.send('No data found');
                }
                else {
                    res.status(200);
                    res.send(JSON.stringify(rows));
                }
            });
        }
        else
        {
            res.status(500);
            res.send('No db connection found');
        }
    });
};