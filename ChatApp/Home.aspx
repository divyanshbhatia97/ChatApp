<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="ChatApp.Home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div id="divID"></div>
            <input id="txtMessage" />
            <button id="btnSend" type="button">Send</button>
            <div id="divMessages"></div>
            <div id="divAllUsers" style="position: absolute; top: 0px; right: 0px;"></div>
        </div>
    </form>

    <script src="jquery.js"></script>
    <script src="pusher.js"></script>
    <script src="home.js"></script>
    <link rel="stylesheet" type="text/css" href="Home.css" />
</body>
</html>
