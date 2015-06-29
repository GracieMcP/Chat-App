var Sentences = new Mongo.Collection("sentences");
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  var userName = prompt("Whats your user name?", "Joe Doe")
  
  Template.hello.helpers({
    sentences: function () {
      return Sentences.find({}, {sort:{date:-1}}); //mongo db
    }
  });

  Template.hello.events({
    'submit form': function (event) {
		event.preventDefault();
		var sentence = event.target.sentence.value;
		event.target.sentence.value = "";
		Sentences.insert({speaker: userName, text: sentence, date:Date.now()});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
	Sentences.remove({});
    
  });
}
