Template.root.helpers({
	bullets: function() {
		return Bullets.find({parent: null});
	}
});