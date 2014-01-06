Meteor.publish('bullets', function() {
	return Bullets.find();
});