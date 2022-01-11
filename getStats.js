const STORE_API = 'https://enraqfhmiap3p34.m.pipedream.net';
const INTERVAL = 60 * 1000;

/** @param {NS} ns **/
export async function main(ns) {

	let key = ns.args[0];
	if(!key) {
		ns.tprint("Key must be passed as an argument.");
		ns.exit();
	}

	ns.disableLog('sleep');
	ns.disableLog('getPlayer');
	ns.disableLog('hacknet.numNodes');
	
	let url = STORE_API + `?key=${key}`;

	while(true) {
		let result = {};

		result.player = ns.getPlayer();
		result.numberOfHacknetNodes = ns.hacknet.numNodes();

		await fetch(url, {
			method:'POST',
			body:JSON.stringify(result)
		});

		ns.print('Stored stats');
		await ns.sleep(INTERVAL)
	}
}