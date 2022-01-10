/*

Tries to upgrade the network as best as possible. Note that me checking the result of upgrades
is not necessary after I found my bug, but kept it around to be safe.

*/

/** @param {NS} ns **/
export async function main(ns) {

	ns.disableLog('getServerMoneyAvailable');
	ns.disableLog('sleep');
	
	const format = n => {
		return '$' + new Intl.NumberFormat().format(Math.floor(n));
	}
	
	const getCash = function() {
		return ns.getServerMoneyAvailable('home');
	}

	while(true) {

		// First, can I buy a new machine?
		let myNodeCount = ns.hacknet.numNodes();
		let maxNodes = ns.hacknet.maxNumNodes();

		if(myNodeCount < maxNodes) {
			//ns.tprint(`I own ${myNodeCount} and the max is ${maxNodes}`);
			if(getCash() > ns.hacknet.getPurchaseNodeCost()) {
				ns.print(`Purchasing a node for ${format(ns.hacknet.getPurchaseNodeCost())}`);				ns.hacknet.purchaseNode();
				myNodeCount++;
			}
		}

		// Now, loop through my node network 3 times for the 3 stats

		// first one is level
		for(let i=0; i<myNodeCount; i++) {
			let cost = ns.hacknet.getLevelUpgradeCost(i, 1);
			if(getCash() > cost) {
				ns.print(`For machine ${i}, going to upgrade level for ${format(cost)}`);
				let result = ns.hacknet.upgradeLevel(i, 1);
				if(!result) ns.print('Failed upgrade');
			}
		}

		// now ram
		for(let i=0; i<myNodeCount; i++) {
			let cost = ns.hacknet.getRamUpgradeCost(i, 1);
			if(getCash() > cost) {
				ns.print(`For machine ${i}, going to upgrade ram for ${format(cost)}`);
				let result = ns.hacknet.upgradeRam(i, 1);
				if(!result) ns.print('Failed upgrade');
			}
		}

		// now cores
		for(let i=0; i<myNodeCount; i++) {
			let cost = ns.hacknet.getCoreUpgradeCost(i, 1);
			if(getCash() > cost) {
				ns.print(`For machine ${i}, going to upgrade core for ${format(cost)}`);
				let result = ns.hacknet.upgradeCore(i, 1);
				if(!result) ns.print('Failed upgrade');
			}
		}

		await ns.sleep(5000);
	}
}