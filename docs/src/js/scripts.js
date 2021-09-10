var init = () => {
	LSinit("user_data",userData);
	const tabs = createEle("header"),
	      main = createEle("div"),
	      nav = createEle("nav");
	var ud = parseLS("user_data");
	//
	for (var i = 0; i < myTabs.length; i++) {
		const myBtns = createEle("button");
		myBtns.setAttribute("data-index",i);
		myBtns.className = "w3-button";
		if(i <= playerlevel) {
			myBtns.disabled = false;
			myBtns.onclick = btnClicked(myBtns,ud);
			myBtns.className = "w3-button";
		} else {
			myBtns.disabled = true;
			myBtns.className = "w3-button w3-hide";
		}

		myBtns.innerHTML = myTabs[i];

		tabs.append(myBtns);
	}

	tabs.className = "w3-header w3-large w3-grey w3-card-2 w3-padding";

	for (var k = 0; k < myTabs.length; k++) {
		var dI_dressed = myTabs[k].toLowerCase();

		var dI_call = ud[dI_dressed];

		const frames = createEle("div");
		frames.setAttribute("data-index", k);
		frames.innerHTML = myTabs[k] + ": " + dI_call;
		frames.className = "frames w3-container w3-padding-16 w3-card-2";
		if (k <= playerlevel) {
			frames.disabled = false;
		} else {
			frames.disabled = true;
			frames.className = "w3-container w3-hide";

		}

		main.append(frames);
	}
	main.className = "w3-white w3-display-middle w3-margin";

	nav.innerHTML = "nav";
	nav.className = "w3-grey w3-bottom w3-center w3-card-2 w3-padding";

	body.append(tabs,main,nav);
},
btnClicked = (myBtns,ud) => {
	return () => {
		const dI = myBtns.getAttribute("data-index")
		      dI_dressed = myTabs[dI].toLowerCase(),
		      dI_call = ud[dI_dressed],
		      frames = bySelAll(".frames");
        
		dI_call++;
        ud[dI_dressed] = dI_call;
		saveLS("user_data",ud);
		frames[dI].innerHTML = myTabs[dI] + ": " + dI_call;
	}
};

window.onload = () => {
	init();
};