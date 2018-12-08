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
        } else if (INTERSECTED.parent.name == "sink") {
            viewRoomSelect();
            cursorDeselect();
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

    var prompt2Node = document.createTextNode("Kitchen");
    var prompt2 = document.createElement("h2");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-prompt";
    var hudPromptNode = document.getElementById("hud-prompt");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);
}

function viewLiving() {
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

    var prompt2Node = document.createTextNode("Living room");
    var prompt2 = document.createElement("h2");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-prompt";
    var hudPromptNode = document.getElementById("hud-prompt");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);
}

function viewRoomSelect() {
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

    var prompt2Node = document.createTextNode("Select a room");
    var prompt2 = document.createElement("h2");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-prompt";
    var hudPromptNode = document.getElementById("hud-prompt");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);
}

function viewOverview() {
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

    var prompt2Node = document.createTextNode("Kitchen");
    var prompt2 = document.createElement("h2");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-prompt";
    var hudPromptNode = document.getElementById("hud-prompt");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);
}

function frontHover() {
    frontMaterial.color.setRGB(1, .9, 0);
}

function frontOut() {
    // bricks original colour
    frontMaterial.color.setRGB(0.7568627450980392, 0.47058823529411764, 0.24313725490196078);
}
