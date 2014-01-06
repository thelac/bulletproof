Bullets = new Meteor.Collection('bullets');

Bullets.allow({
	insert: function() { return true },
	update: function() { return true },
	remove: function() { return true }
});

Meteor.methods({
	addChild: function(child, parent, sibling) {
		var child = _.extend(child, {parent: parent._id});
		var childId = Bullets.insert(child);

		if (sibling === undefined) parent.children.push(childId);
		else parent.children.splice(parent.children.indexOf(sibling._id) + 1, 0, childId);

		Bullets.update(parent._id, {$set: {children: parent.children}});
	},
	addSibling: function(child, sibling) {
		var parent = Bullets.findOne({_id: sibling.parent});
		Meteor.call('addChild', child, parent, sibling);
	},
	updateText: function(text, nodeId) {
		Bullets.update(nodeId, {$set: {text: text}});
	}
});