if (Bullets.find().count() === 0) {
	var root = {text:'root', children: [], parent: null};
	var id = Bullets.insert(root);
}