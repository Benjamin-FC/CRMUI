using CrmApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure path base for sub-application deployment
var pathBase = builder.Configuration.GetValue<string>("PathBase") ?? "/CRMApi";
if (!string.IsNullOrEmpty(pathBase) && pathBase != "/")
{
    app.UsePathBase(pathBase);
}

// Serve the existing swagger.json file
app.MapGet("/swagger/v1/swagger.json", async context =>
{
    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "swagger.json");
    if (File.Exists(filePath))
    {
        context.Response.ContentType = "application/json";
        await context.Response.SendFileAsync(filePath);
    }
    else
    {
        context.Response.StatusCode = 404;
    }
});

// Enable Swagger UI
var swaggerEndpoint = !string.IsNullOrEmpty(pathBase) && pathBase != "/" 
    ? $"{pathBase}/swagger/v1/swagger.json" 
    : "/swagger/v1/swagger.json";

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint(swaggerEndpoint, "FrankCrum CRM API V1");
    c.RoutePrefix = "swagger";
});

// app.UseCors("AllowReactApp");

app.UseMockApi();

app.Run();
