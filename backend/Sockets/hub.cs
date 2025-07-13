using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using System.Collections.Concurrent;



public class ChatHub : Hub
{
    private static ConcurrentDictionary<string, string> ActiveCards = new();

    private static ConcurrentDictionary<string, ClientInfo> ClientsInfo = new();
    private static ConcurrentDictionary<string, ClientPosition> ClientsPosition = new();

    public override async Task OnConnectedAsync()
    {
        var id = Context.ConnectionId;


        await base.OnConnectedAsync();
    }



    public async Task Join(string Name, string Avatar)
    {
        string RandomColor = GenerateRandomColor();
        ClientsInfo[Context.ConnectionId] = new ClientInfo { Name = Name, Avatar = Avatar, Color = RandomColor };
        await Clients.All.SendAsync("NewJoiner", ClientsInfo);
        await Clients.Caller.SendAsync("JoinConfirmation", Context.ConnectionId);
    }



    public async Task UpdatePosition(float X, float Y)
    {

        ClientsPosition[Context.ConnectionId] = new ClientPosition { Xpos = X, Ypos = Y };
        await Clients.All.SendAsync("NewPositions", ClientsPosition);
    }

    public async Task handleDragStart(string id)
    {
        ActiveCards[Context.ConnectionId] = id;
        await Clients.All.SendAsync("NewDragged", ActiveCards);
    }

    public async Task handleDragEnd(string newCardlist)
    {
        ActiveCards.TryRemove(Context.ConnectionId, out _);
        await Clients.All.SendAsync("EndedDrag", ActiveCards, newCardlist);
    }



    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        ClientsInfo.TryRemove(Context.ConnectionId, out _);
        ClientsPosition.TryRemove(Context.ConnectionId, out _);

        await Clients.All.SendAsync("NewJoiner", ClientsInfo);

        await base.OnDisconnectedAsync(exception);
    }






    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }



    private string GenerateRandomColor()
    {
        Random rand = new Random();
        return $"#{rand.Next(0x1000000):X6}"; // Generates a random hex color code
    }

}



public class ClientInfo
{

    public required string Name { get; set; }

    public required string Avatar { get; set; } 
    
    public required string Color { get; set; }

}
public class ClientPosition
{

    public required float Xpos { get; set; }

    public required float Ypos { get; set; }
}

public class ChildItem
{
    public string? Id { get; set; }
    public string? Name { get; set; }
}

public class Column
{
    public string? Data { get; set; }
    public List<ChildItem> Children { get; set; } = new List<ChildItem>();
}

