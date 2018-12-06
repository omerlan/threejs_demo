//raycaster click function
var scene, camera, renderer, raycaster, frontObj;
var mouse = new THREE.Vector2(),
    INTERSECTED;

var tweenSpeed = 2000;
var tweenSpeed1 = tweenSpeed / 2;
var overview = {
    x: 0,
    y: 600,
    z: 1228,
    alt: {
        x: 0,
        y: 600,
        z: 1228
    },
};

document.onmousedown = function (e) {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        INTERSECTED = intersects[0].object;
        if (INTERSECTED.parent.parent.name == "house" && INTERSECTED.parent.name == "front" && INTERSECTED.position.z !== 40) {

            var pos1 = new TWEEN.Tween(camera.position).to({
                x: -200,
                y: 30,
                z: 200
            }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

            var rot1 = new TWEEN.Tween(camera.rotation).to({
                x: 0,
                y: -1,
                z: 0
            }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

            var frontPos = new TWEEN.Tween(INTERSECTED.position).to({
                z: 4000
            }, tweenSpeed1).easing(TWEEN.Easing.Quadratic.InOut);

            pos1.start();
            frontPos.start();
            rot1.start();

        } else if (INTERSECTED.parent.parent.name == "house" && INTERSECTED.parent.name == "front" && INTERSECTED.position.z == 40) {
            INTERSECTED.position.z -= 40;
            var pos2 = new TWEEN.Tween(camera.position).to({
                x: overview.x,
                y: overview.y,
                z: overview.z
            }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

            var rot2 = new TWEEN.Tween(camera.rotation).to({
                x: -.5,
                y: 0,
                z: 0
            }, tweenSpeed).easing(TWEEN.Easing.Quadratic.InOut);

            pos2.start();
            rot2.start();
        }
    }
}

function frontHover() {
    console.log("yuh")
    console.log(frontObj);
}
