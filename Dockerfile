FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY Back-end/TD_3_Web/TD_3_Web/TD_3_Web.csproj ./Back-end/TD_3_Web/TD_3_Web/

RUN dotnet restore ./Back-end/TD_3_Web/TD_3_Web/TD_3_Web.csproj

COPY Back-end/TD_3_Web/TD_3_Web/ ./Back-end/TD_3_Web/TD_3_Web/

RUN dotnet publish ./Back-end/TD_3_Web/TD_3_Web/TD_3_Web.csproj -c Release -o out


FROM node:20 AS build-react
WORKDIR /app

COPY Front-end/projeto-web-td2/package*.json ./
RUN npm install

COPY Front-end/projeto-web-td2/ ./
RUN npm run build


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build-env /app/out .
COPY --from=build-react /app/dist ./wwwroot

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "TD_3_Web.dll"]