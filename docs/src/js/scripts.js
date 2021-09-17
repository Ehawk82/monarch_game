var init = () => {
	var ud = parseLS("user_data");
	if(!ud || ud === null) {
		LSinit("user_data",userData);
		ud = parseLS("user_data");
		build(ud);
	} else {
		build(ud);
	}
},
build = (ud) => {
	const btnFrame = createEle("div"),
			energyFrame = createEle("div"),
	      mainFrame = createEle("div"),
	      navFrame = createEle("div");

    for (var i = 0; i < myTabs.length; i++) {
    	const btns = createEle("button");
	
		btns.innerHTML = myTabs[i].toUpperCase();
		btns.className = "btns w3-button w3-block";
		btns.setAttribute("data-index",i);
		btns.onclick = btnClicked(ud,btns);

		btnFrame.append(btns);
    }

	btnFrame.className = "btnFrame w3-monarch w3-center";

	energyFrame.innerHTML = "ENERGY: " + ud.energy;
	energyFrame.className = "energyFrame w3-monarch w3-right-align";

	mainFrame.append(energyFrame);
	mainFrame.className = "mainFrame w3-black w3-center";

	navFrame.innerHTML = "navFrame";
	navFrame.className = "navFrame w3-monarch w3-center";

	body.append(btnFrame,mainFrame,navFrame);
	verifyBtns(ud);
	timer();
},
timer = () => {
	var ticker = () => {
		setTimeout(() => {
			const ud = parseLS("user_data");

			ud.energy = ud.energy + ud.milkweed.amount;
			saveLS("user_data",ud)
			verifyEnergy(ud);
			verifyBtns(ud);
			ticker();
		},1000);
	};
	ticker();
},
verifyEnergy = (ud) => {
	const energyFrame = bySel(".energyFrame");
	energyFrame.innerHTML = "ENERGY: " + ud.energy;
},
btnClicked = (ud,btns) => {
	return () => {
		var btns_dressed = btns.innerHTML.toLowerCase(),
   	    ud_call_cost = ud[btns_dressed].cost;
      ud[btns_dressed].cost++;
      ud[btns_dressed].amount++;
      ud.energy = ud.energy - ud_call_cost;
   	saveLS("user_data",ud);
   	verifyBtns(ud);
   	verifyEnergy(ud);
	}
},
verifyBtns = (ud) => {
   var btns = bySelAll(".btns");

   for (var k = 0; k < btns.length; k++) {
   	var btns_dressed = btns[k].innerHTML.toLowerCase(),
   	    ud_call_cost = ud[btns_dressed].cost;
   		if(k <= ud.playerlevel && ud_call_cost <= ud.energy) {
   			btns[k].disabled = false;
   		} else {
   			btns[k].disabled = true;
   		}
   }
};
window.onload = () => {
	init();
};