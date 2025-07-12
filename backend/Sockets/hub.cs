using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using System.Collections.Concurrent;



public class ChatHub : Hub
{

    private static ConcurrentDictionary<string, ClientInfo> ClientsInfo = new();

    public override async Task OnConnectedAsync()
    {
        var id = Context.ConnectionId;

        Console.WriteLine($"Connected with id: {id}");

        await base.OnConnectedAsync();
    }



    public async Task Join(string Name, string Avatar)
    {

        Console.WriteLine($"Connected with id: {Context.ConnectionId}, {Name}, {Avatar}");
        ClientsInfo[Context.ConnectionId] = new ClientInfo { Name = Name, Avatar = Avatar };
        Console.WriteLine(ClientsInfo);
        await Clients.All.SendAsync("NewJoiner", ClientsInfo);
    }



    public override Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine(Context.ConnectionId);
        ClientsInfo.TryRemove(Context.ConnectionId, out _);

        return base.OnDisconnectedAsync(exception);
    }






    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }


}



public class ClientInfo
{

    public required string Name { get; set; }

    public required string Avatar { get; set; }
}
