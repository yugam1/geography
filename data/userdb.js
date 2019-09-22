var Connection=require("tedious").Connection;
var Request = require('tedious').Request;
var TYPES=require("tedious").TYPES;

var config={
    server:"yugdbserver.database.windows.net",
    authentication:{
        type:'default',
        options:{
            username:"yugam",
            password:"password@123"
        }
    },
    options: {
        database: 'yugam-db'
    }
}


var createUsers = function(callback) {
    var connection = new Connection(config);
   connection.on('connect', function(err) {
        if(err) {
            callback(err);
        }
        else {
            var request = new Request(
                `
                INSERT INTO users (name, email) VALUES ('Nabajyoti', 'nabajyoti@hotmail.com') 
                INSERT INTO users (name, email) VALUES ('Meg', 'meg@rediff.com')
                `,
                function(err, rowCount) {
                    callback(err, rowCount);
                }
            );
            connection.execSql(request);
        }
   });
};

var queryUsers = function(callback) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if(err) {
            callback(err);
        } else {
            var request = new Request(
                "SELECT * FROM users",
                function(err, rowCount, rows) {
                    callback(err, rowCount, rows);
                }
            );
            connection.execSql(request);
        }
    });
};

module.exports = {
    createUsers: createUsers,
    queryUsers: queryUsers
};
