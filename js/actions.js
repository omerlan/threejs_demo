// hover raycaster
document.onmousemove = function (e) {
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    // room select
    if ((intersects.length > 0) && (camera.position.x == 0) && (camera.position.y == 30) && (camera.position.z == 300)) {
        INTERSECTED = intersects[0].object;
        if (INTERSECTED.parent.name == "selectLiving") {
            scene.children[1].children[9].children[6].children[0].material.opacity = 0;
            scene.children[1].children[9].children[7].children[0].material.opacity = .3;
            cursorPointer();
        } else if (INTERSECTED.parent.name == "selectKitchen") {
            scene.children[1].children[9].children[6].children[0].material.opacity = .3;
            scene.children[1].children[9].children[7].children[0].material.opacity = 0;
            cursorPointer();
        } else {
            cursorDeselect();
        }
    }
}

// click raycaster
document.onmousedown = function (e) {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        INTERSECTED = intersects[0].object;
        if (INTERSECTED.parent.name == "theFront") {
            viewRoomSelect();
        } else if (INTERSECTED.parent.name == "selectKitchen" && (camera.position.x == coordRoomSelect.position.x) && (camera.position.y == coordRoomSelect.position.y) && (camera.position.z == coordRoomSelect.position.z)) {
            viewKitchen();
            cursorDeselect();
            moveRoomSelector();
        } else if (INTERSECTED.parent.name == "selectLiving" && (camera.position.x == coordRoomSelect.position.x) && (camera.position.y == coordRoomSelect.position.y) && (camera.position.z == coordRoomSelect.position.z)) {
            viewLiving();
            cursorDeselect();
            moveRoomSelector();
        } else if ((INTERSECTED.parent.name == "sink") && (tvClicked == 1)) {
            document.getElementById("water").style.width = "30%";
            scene.children[1].children[13].position.set(-1000, 1000, 1000);
            cursorDeselect();
            viewEnd();
            document.getElementById("efficiency").style.width = "50%";
        } else if (INTERSECTED.parent.name == "sink" || INTERSECTED.parent.name == "faucet") {
            document.getElementById("water").style.width = "30%";
            document.getElementById("efficiency").style.width = "25%";
            scene.children[1].children[13].position.set(-1000, 1000, 1000);
            viewRoomSelect();
            cursorDeselect();
            sinkClicked = 1;
        } else if ((INTERSECTED.parent.name == "tv" || INTERSECTED.parent.name == "screen") && (sinkClicked == 1)) {
            document.getElementById("energy").style.width = "30%";
            INTERSECTED.material.color.setRGB(0, 0, 0);
            INTERSECTED.material.reflectivity = 1;
            cursorDeselect();
            viewEnd();
            document.getElementById("efficiency").style.width = "50%";
        } else if (INTERSECTED.parent.name == "tv" || INTERSECTED.parent.name == "screen") {
            document.getElementById("energy").style.width = "30%";
            document.getElementById("efficiency").style.width = "25%";
            INTERSECTED.material.color.setRGB(0, 0, 0);
            INTERSECTED.material.reflectivity = 1;
            viewRoomSelect();
            cursorDeselect();
            tvClicked = 1;
        }
    }
}

function cursorDeselect() {
    scene.children[1].children[9].children[7].children[0].material.opacity = 0;
    scene.children[1].children[9].children[6].children[0].material.opacity = 0;
    document.body.style.cursor = "default";
    mouse.x = mouse.y = -1;
}

function cursorPointer() {
    document.body.style.cursor = "pointer";
}

function moveRoomSelector() {
    scene.children[1].children[9].children[6].position.x = scene.children[1].children[9].children[7].position.x = -100
}

function viewKitchen() {
    document.getElementById("hud").style.background = "rgba(255, 255, 255, .8)";
    var pos1 = new TWEEN.Tween(camera.position).to({
        x: coordKitchen.position.x,
        y: coordKitchen.position.y,
        z: coordKitchen.position.z
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var rot1 = new TWEEN.Tween(camera.rotation).to({
        x: coordKitchen.rotation.x,
        y: coordKitchen.rotation.y,
        z: coordKitchen.rotation.z
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    pos1.start();
    rot1.start();

    var prompt2Node = document.createTextNode("Turn off the tap");
    var prompt2 = document.createElement("h2");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-h2";
    var hudPromptNode = document.getElementById("hud-h2");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);

    prompt2Node = document.createTextNode("Kitchen");
    prompt2 = document.createElement("h1");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-h1";
    hudPromptNode = document.getElementById("hud-h1");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);

    prompt2Node = document.createTextNode("Many times, people don't notice when their faucet is dripping. Save on your water bill and help conserve water.");
    prompt2 = document.createElement("p");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-p";
    hudPromptNode = document.getElementById("hud-p");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);
}

function viewLiving() {
    document.getElementById("hud").style.background = "rgba(255, 255, 255, .8)";
    var pos1 = new TWEEN.Tween(camera.position).to({
        x: coordLiving.position.x,
        y: coordLiving.position.y,
        z: coordLiving.position.z
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var rot1 = new TWEEN.Tween(camera.rotation).to({
        x: coordLiving.rotation.x,
        y: coordLiving.rotation.y,
        z: coordLiving.rotation.z
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    pos1.start();
    rot1.start();

    var prompt2Node = document.createTextNode("Turn off the TV");
    var prompt2 = document.createElement("h2");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-h2";
    var hudPromptNode = document.getElementById("hud-h2");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);

    prompt2Node = document.createTextNode("Living Room");
    prompt2 = document.createElement("h1");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-h1";
    hudPromptNode = document.getElementById("hud-h1");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);

    prompt2Node = document.createTextNode("Most people forget to turn off the TV after they've left the room. Your TV doesn't know when you've stopped watching. Save on your energy bill and cut your carbon foot print.");
    prompt2 = document.createElement("p");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-p";
    hudPromptNode = document.getElementById("hud-p");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);
}

function viewRoomSelect() {
    document.getElementById("hud").style.background = "none";
    document.getElementById("hud2").style.display = "block";
    scene.children[1].children[9].children[6].position.x = scene.children[1].children[9].children[7].position.x = 97.5;

    var pos1 = new TWEEN.Tween(camera.position).to({
        x: coordRoomSelect.position.x,
        y: coordRoomSelect.position.y,
        z: coordRoomSelect.position.z
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var rot1 = new TWEEN.Tween(camera.rotation).to({
        x: coordRoomSelect.rotation.x,
        y: coordRoomSelect.rotation.y,
        z: coordRoomSelect.rotation.z
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);
    var frontPos = new TWEEN.Tween(scene.children[1].children[9].children[5].position).to({
        x: 4000
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);
    frontPos.start();
    pos1.start();
    rot1.start();

    var prompt2Node = document.createTextNode("Select a room...");
    var prompt2 = document.createElement("h2");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-h2";
    var hudPromptNode = document.getElementById("hud-h2");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);

    prompt2Node = document.createTextNode("You");
    prompt2 = document.createElement("h1");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-h1";
    hudPromptNode = document.getElementById("hud-h1");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);

    prompt2Node = document.createTextNode("Let's take a look at how you can help make a change. Here we have the kitchen, and the living room. In each of these rooms, there is an inefficiency in the use of resources.");
    prompt2 = document.createElement("p");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-p";
    hudPromptNode = document.getElementById("hud-p");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);

    pos1.start();
    rot1.start();
}

function frontHover() {
    frontMaterial.color.setRGB(1, .9, 0);
}

function viewOverview() {
    document.getElementById("hud").style.background = "none";
    var pos1 = new TWEEN.Tween(camera.position).to({
        x: coordOverview.position.x,
        y: coordOverview.position.y,
        z: coordOverview.position.z
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var rot1 = new TWEEN.Tween(camera.rotation).to({
        x: coordOverview.rotation.x,
        y: coordOverview.rotation.y,
        z: coordOverview.rotation.z
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    pos1.start();
    rot1.start();
}

function viewEnd() {
    document.getElementById("hud").style.background = "none";
    var pos1 = new TWEEN.Tween(camera.position).to({
        x: coordOverview.position.x,
        y: coordOverview.position.y,
        z: coordOverview.position.z
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var rot1 = new TWEEN.Tween(camera.rotation).to({
        x: coordOverview.rotation.x,
        y: coordOverview.rotation.y,
        z: coordOverview.rotation.z
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var frontPos = new TWEEN.Tween(scene.children[1].children[9].children[5].position).to({
        x: 97.5
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);
    frontPos.start();
    pos1.start();
    rot1.start();

    prompt2Node = document.createTextNode("Thank you for making the world a better place!");
    prompt2 = document.createElement("h1");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-h1";
    hudPromptNode = document.getElementById("hud-h1");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);

    prompt2Node = document.createTextNode("");
    prompt2 = document.createElement("h2");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-h2";
    hudPromptNode = document.getElementById("hud-h2");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);

    prompt2Node = document.createTextNode("");
    prompt2 = document.createElement("p");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-p";
    hudPromptNode = document.getElementById("hud-p");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);
}

function frontHover() {
    frontMaterial.color.setRGB(1, .9, 0);
}

function frontOut() {
    // bricks original colour
    frontMaterial.color.setRGB(0.7568627450980392, 0.47058823529411764, 0.24313725490196078);
}
