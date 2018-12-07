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
            viewOverview();
        } else if (INTERSECTED.parent.name == "selectKitchen") {
            viewKitchen();
            cursorDeselect();
        } else if (INTERSECTED.parent.name == "selectLiving") {
            viewLiving();
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


function viewOverview() {
    var pos1 = new TWEEN.Tween(camera.position).to({
        x: 0,
        y: 30,
        z: 300
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var rot1 = new TWEEN.Tween(camera.rotation).to({
        x: 0,
        y: 0,
        z: 0
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var frontPos = new TWEEN.Tween(scene.children[1].children[9].children[5].position).to({
        x: 4000
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    pos1.start();
    frontPos.start();
    rot1.start();

    var prompt2Node = document.createTextNode("Select a room");
    var prompt2 = document.createElement("h2");
    prompt2.append(prompt2Node);
    prompt2.id = "hud-prompt";
    var hudPromptNode = document.getElementById("hud-prompt");
    document.getElementById("hud").replaceChild(prompt2, hudPromptNode);
}

function viewKitchen() {
    var pos1 = new TWEEN.Tween(camera.position).to({
        x: -40,
        y: 30,
        z: 150
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var rot1 = new TWEEN.Tween(camera.rotation).to({
        x: 0,
        y: -.5,
        z: 0
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var frontPos = new TWEEN.Tween(scene.children[1].children[9].children[5].position).to({
        x: 4000
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    pos1.start();
    frontPos.start();
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
        x: -40,
        y: 30,
        z: 150
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var rot1 = new TWEEN.Tween(camera.rotation).to({
        x: 0,
        y: -.5,
        z: 0
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    var frontPos = new TWEEN.Tween(scene.children[1].children[9].children[5].position).to({
        x: 4000
    }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

    pos1.start();
    frontPos.start();
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
