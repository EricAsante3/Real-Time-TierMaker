using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using System.Collections.Concurrent;



public class ChatHub : Hub
{

    private static ConcurrentDictionary<string, ClientInfo> ClientsInfo = new();
    private static ConcurrentDictionary<string, ClientPosition> ClientsPosition = new();

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



    public async Task UpdatePosition(float X, float Y)
    {
        Console.WriteLine(X);
        Console.WriteLine(Y);

        ClientsPosition[Context.ConnectionId] = new ClientPosition { Xpos = X, Ypos = Y };
        Console.WriteLine(ClientsPosition);
        await Clients.All.SendAsync("NewPositions", ClientsPosition);
    }



    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine(Context.ConnectionId);
        ClientsInfo.TryRemove(Context.ConnectionId, out _);
        ClientsPosition.TryRemove(Context.ConnectionId, out _);

        await Clients.All.SendAsync("NewJoiner", ClientsInfo);

        await base.OnDisconnectedAsync(exception);
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
public class ClientPosition
{

    public required float Xpos { get; set; }

    public required float Ypos { get; set; }
}
