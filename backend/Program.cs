var builder = WebApplication.CreateBuilder(args);




builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .SetIsOriginAllowed(_ => true) // allow any origin
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // allows cookies/headers like Authorization
    });
});


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();
app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/", () => "SignalR Minimal API is running");

// 👇 Add SignalR endpoint
app.MapHub<ChatHub>("/chat");


app.Run();


