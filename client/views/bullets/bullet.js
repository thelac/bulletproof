var createBullet = function(text) {
	return {
		text: text || '',
		children: [],
		parent: null
	};
};

Bulletproof.counter = 0;

Template.bullet.events({
	focus: function(e) {
	},
	keydown: function(e) {
		if (e.keyCode === 13) {
			// TODO: Why are events firing twice?
			if (Bulletproof.counter !== 0) {
				Bulletproof.counter = 0;
				return;
			}

			var el = document.getElementById(this._id);
			Meteor.call('updateText', el.innerHTML, this._id);
			if (this.parent === null) {
				Meteor.call('addChild', createBullet(), this);
			} else {
				Meteor.call('addSibling', createBullet('test'), this);
			}

			Bulletproof.counter += 1;
		}
	},
	blur: function(e) {
		var el = document.getElementById(this._id);
		Meteor.call('updateText', el.innerHTML, this._id);
	}
});

Template.bullet.helpers({
	children: function() {
		if (this.children === undefined) return;
		return Bullets.find({_id: { $in: this.children }});
	}
});