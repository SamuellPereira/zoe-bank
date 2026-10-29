
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDbContext<ZoeBankDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/", () => Results.Ok(new
{
    sistema = "Zoe Bank API",
    status = "online"
}));

app.MapGet("/api/health/database", async (ZoeBankDbContext db) =>
{
    try
    {
        var conectado = await db.Database.CanConnectAsync();

        if (!conectado)
        {
            return Results.Problem(
                title: "Não foi possível conectar ao banco ZoeBankDb"
            );
        }

        return Results.Ok(new
        {
            status = "conectado",
            banco = "ZoeBankDb"
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(
            title: "Falha na conexão com o SQL Server",
            detail: ex.Message
        );
    }
});

app.Run();

public class ZoeBankDbContext : DbContext
{
    public ZoeBankDbContext(
        DbContextOptions<ZoeBankDbContext> options
    ) : base(options)
    {
    }
}
