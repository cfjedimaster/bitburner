/** @param {NS} ns **/
function format(n) {
	return new Intl.NumberFormat().format(Math.floor(n));
}

export async function main(ns) {

	if(ns.args.length < 2) {
		ns.tprint("Past the threshhold in $$ to wait for and the URL to hit when done.");
		ns.exit();
	}

	const threshhold = ns.args[0];
	const url = ns.args[1];
	let current = ns.getServerMoneyAvailable('home');

	if(current > threshhold) {
		ns.tprint(`Your current money (${format(current)}) is already over the threshhold (${format(threshhold)}).`)
		ns.exit();
	}

	while(true) {
		let current = ns.getServerMoneyAvailable('home');
		if(current >= threshhold) {
			// current is a float and messy, lets make it nicer
			let urlToHit = url + `?threshhold=${format(threshhold)}&current=${format(current)}`;
			await ns.wget(urlToHit,'output.txt');
			ns.tprint(`Reached threshold and called ${urlToHit}`);
			ns.exit();
		}
		await ns.sleep(5000);
	}

}