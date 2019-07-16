var pusher = new Pusher('a2d1524bdfb55c88be70', { cluster: 'ap2', authEndpoint: "Home.aspx/Authenticate" });
var uniqueID;
$.ajax({
    type: "POST",
    url: "Home.aspx/GetID",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
        uniqueID = "user: " + data.d;
        $("#divID").text(uniqueID);
    }
});

var presenceChannel = pusher.subscribe("presence-chat");
presenceChannel.bind("pusher:subscription_succeeded", function (members) {
    members.each(function(member) {
        $("#divAllUsers").append("<div id='" + member.id + "'>user: " + member.id + "</div>");
    });
});
presenceChannel.bind("pusher:member_added", function (member) {
    $("#divAllUsers").append("<div id='" + member.id + "'>user: " + member.id + "</div>");
});
presenceChannel.bind("pusher:member_removed", function (member) {
    $("#divAllUsers").find("#" + member.id).remove();
});

pusher.connection.bind("connected", function () {
    var channel = pusher.subscribe("private-chat");
    channel.bind("new_message", function (msg) {
        displayMessage(msg);
    });    
});

$("#btnSend").click(function () {
    var msg = $("#txtMessage").val();
    $.ajax({
        type: "POST",
        data: JSON.stringify({list: [msg, uniqueID]}),
        contentType: "application/json; charset=utf-8",
        url: "Home.aspx/SendMessage",
        dataType: "json",       
        success: function () {            
            $("#txtMessage").val("");
        }
    });
});

function displayMessage(msg) {
    $("#divMessages").append("<div>" + msg[1] + " - " + msg[0] + "</div>");
}