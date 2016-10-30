const {exec} = require('child_process');
const fs = require('fs');


class Updater {
	constructor() {
		this.curatorsJson = JSON.parse(fs.readFileSync('curators.json'), 'utf8');
		this.terminalCount = this.curatorsJson.labels.length;
		console.log(`number of labels is ${this.terminalCount}`);
		this.curators = [];

		this.count = 0;

	}



 nameToId(name, cb) {
	exec('ruby soundcloud.rb', (error, stdout, stderr) => {

		let id = parseInt(stdout);

		this.count++;

		if (id !== id) {
			console.log(`did not receive valid id from search API for ${name}`);
		} else {
			this.curators.push({name, soundcloud_id: id});
		}

		if (this.count === this.terminalCount) {
			cb(this.curators);
		}

	});

}

getSoundcloudIds(cb) {

	this.curatorsJson.labels.forEach(label => {
		this.nameToId(label, cb);
	});
}




// should end up as
// [{name: 'yo', soundcloud_id: 12345}]


// just initialize all these into database
// do not initialize if item is already in db. this is for NEW curators.


}


export default Updater;
