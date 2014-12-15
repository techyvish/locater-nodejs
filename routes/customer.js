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
            res.status(400);
            res.send('No db connection found');
        }
    });
};


exports.save = function (req,res) {


    req.getConnection( function(err,conneciton)
    {
        var data = {
            id : req.body["userid"],
            name : req.body["name"],
            address : req.body["address"],
            email : req.body["phoneno"],
            phoneno : req.body["email"]
        };

        var query = conneciton.query( "INSERT INTO customers set ?",data,function(err, rows){
            if (err ){
                console.log("Error Selecting : %s ",err );
                res.status(500);
                res.send(err);
            }
            else
            {
                res.redirect('/customers');
            }
        });
    });
};