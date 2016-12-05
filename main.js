//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://testuser:password@ds139327.mlab.com:39327/mogotest';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.
    var item_val = "wallet";
    var location_val = "";
    
    getItem(item_val, location_val, db);
    
    item_val = "brain";
    location_val = "head";
    //insertItem(item_val, location_val, db);
    
    item_val = "brain";
    location_val = "head";
    updateItem(item_val, location_val, db);
    
    item_val = "taco";
    location_val = "some new val";
    removeItem(item_val, location_val, db);
    
    //Close connection
    db.close();
  }
});

function getItem(item_val, location_val, db) {
	var collection = db.collection('whereismy');
	var voice_restult = '';
	
	collection.find({item: item_val}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result[0]);
        voice_result = 'The ' + result[0].item + " is located on the " + result[0].location;
        console.log(voice_result);
      } else {
        voice_result = 'Sorry, I could not find the ' + item_val;
        console.log(voice_result);
      }
    });
}

function insertItem(item_val, location_val, db) {
	var collection = db.collection('whereismy');
	var voice_restult = '';
	
    // Insert new item
    collection.insert({item: item_val, location: location_val}, function (err, result) {
        if (err) {
        	console.log(err);
        } else {
        	voice_result = 'You put the ' + item_val + " in the " + location_val;
            console.log(voice_result);
        }
    });
}

function updateItem(item_val, location_val, db) {
	var collection = db.collection('whereismy');
	var voice_restult = '';
	
    // update  item
    collection.update({item: item_val}, {$set: {location: location_val}}, function (err, numUpdated) {
  		if (err) {
    		console.log(err);
  		} else if (numUpdated) {
    		voice_result = 'You put the ' + item_val + " in the " + location_val;
            console.log(voice_result);
  		} else {
    		console.log('No document found with defined "find" criteria!');
  		}
	});
}

function removeItem(item_val, location_val, db) {
	var collection = db.collection('whereismy');
	var voice_restult = '';
	
    // update  item
    collection.remove({item: item_val}, function (err, numUpdated) {
  		if (err) {
    		console.log(err);
  		} else if (numUpdated) {
    		console.log('Removed item: ', item_val);
  		} else {
    		console.log('No document found with defined "find" criteria!', item_val);
  		}
	});
}
