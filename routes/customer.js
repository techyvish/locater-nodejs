/*
   customer locater database.
 */

exports.list = function (req, res) {
    req.getConnection(function (err,connection) {
        var query = connection.query('SELECT * FROM customers',function(err,rows){
            if ( err )
            {
                console.log("Error selecting");
            }
            else {
                res.status(200);
                res.send(JSON.stringify(rows));
            }
        });
    });
};