var sampleData = require('./sampleCourses');
var docdb = require('documentdb');
var async = require('async');

var config = {
     host: 'https://yugcosmos.documents.azure.com:443/',
     auth: {
         masterKey: '0rFs36v4d8eU4NKLyuEkWMgYrdJVXLnwoK46bD6QQvazBZ3CpgsWo0HtYF6N1tfE34X59SWu9CewT6OJtoqKyg=='
     }
};

var client = new docdb.DocumentClient(config.host, config.auth);
var coursesLink = docdb.UriFactory.createDocumentCollectionUri('yugamdb', 'courses');

var createCourses = function(callback) {    
    var documents = [];
    async.forEachOf(sampleData, (course, key, next) => {
        client.createDocument(coursesLink, course, (err, document) => {
            if(err) return next(err);
            documents.push(document);
            next();
        });
    }, err => callback(err, documents));
};

var queryCourses = function(callback) {
    
    var querySpec = {
        query: "SELECT * FROM c",
        parameters: []
    };

    client.queryDocuments(coursesLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

module.exports = {
    createCourses: createCourses,
    queryCourses: queryCourses
};


