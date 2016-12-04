'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  data.updatedAt = new Date().getTime();

  const params = {
      TableName: 'todos',
      Item: data
  };

  return MongoClient.connect("mongodb://localhost:27017/todos_list", (err, db) => {
      if(err) { 
          callback(error)
      }
      console.log("###############" + params.Item)
      var collection = db.collection('todos');
      collection.insertOne(params.Item,{w: 1}, (err, result) => {
          callback(err,params.Item)
      });
  })
};
