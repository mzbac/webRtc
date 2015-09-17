var peer = new Peer({key: '5mvo0w847divbo6r'});
var selfPeerId;
peer.on('open', function (id) {
    selfPeerId = id;
    $('#localPeerId').text('your peer id is '+id);
});
peer.on('connection', onConnect);

//connect to remote
$('#connectRemote').click(function(){
    var remoteConn = peer.connect($('#remoteId').val());
    remoteConnection(remoteConn);
});

//recieved remote connection
function onConnect(conn) {
    remoteConnection(conn);
}

function remoteConnection(conn) {
    conn.on('open', function () {
        // Receive messages
        conn.on('data', function (data) {
            new google.maps.Marker({
                position: {lat:data.coords.latitude, lng: data.coords.longitude},
                map: window.map,
                title:  new Date()
            });
        });
        // Send messages
        navigator.geolocation.watchPosition(conn.send)

    });
}