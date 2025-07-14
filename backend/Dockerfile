FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /project

COPY . /project

WORKDIR /project/bin/Debug/net8.0

EXPOSE 5000

CMD [ "dotnet", "backend.dll"]