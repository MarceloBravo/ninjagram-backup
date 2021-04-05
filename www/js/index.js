// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById('btn-picture').addEventListener('click', takePicture);
document.getElementById('btn-load-picture').addEventListener('click', loadPicture);
var fromCamera = false;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    console.log(navigator.camera);
}

function loadPicture(){
    fromCamera = false;
    navigator.camera.getPicture(onSuccess, onFail,
    {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY, 600, 300)
    });
}

function takePicture(){
    fromCamera = true;
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccess(imageURI) {
    let img = document.createElement('img');
    img.src = imageURI;
    img.className = 'myImage';
    if(fromCamera)img.style.transform = 'rotate(270deg)';
    document.getElementById('imagenes').appendChild(img);
}

function onFail(message) {
    alert('Failed because: ' + message);
}