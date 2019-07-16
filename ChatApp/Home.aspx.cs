using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using PusherServer;
using Newtonsoft.Json;

namespace ChatApp
{
    public partial class Home : System.Web.UI.Page
    {
        private static Pusher pusher = new Pusher("823406", "a2d1524bdfb55c88be70", "77b84bc6f1003a09517c", new PusherOptions() { Cluster = "ap2" });
        private static int uniqueID = 0;


        protected void Page_Load(object sender, EventArgs e)
        {
        }

        [WebMethod]
        public static int GetID()
        {
            uniqueID++;
            return uniqueID;
        }

        [WebMethod]
        public static void SendMessage(List<string> list)
        {
            pusher.TriggerAsync("private-chat", "new_message", list);
        }
        
        [WebMethod]
        public static string Authenticate(string socket_id, string channel_name)  
        {
            if(channel_name.IndexOf("presence-chat") >= 0)
            {
                var channelData = new PresenceChannelData()
                {
                    user_id = uniqueID.ToString(),
                    user_info = new
                    {
                        id = uniqueID
                    },
                };

                var presenceAuth = pusher.Authenticate(channel_name, socket_id, channelData);

                return JsonConvert.SerializeObject(presenceAuth);
            }
            var auth = pusher.Authenticate(channel_name, socket_id);

            return JsonConvert.SerializeObject(auth);
        }
    }
}