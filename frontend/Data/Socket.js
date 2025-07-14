// src/signalRService.js
import * as signalR from "@microsoft/signalr";

export default class SignalRService {
  static instance = null;

  constructor(userId) {
    if (SignalRService.instance) {
      return SignalRService.instance; // 🧠 Singleton: return existing
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/chat", {
        withCredentials: true, // 👈 required if you use AllowCredentials()
        accessTokenFactory: () => userId
    }) // Replace with your hub URL
      .withAutomaticReconnect()
      .build();

    this.startConnection();

    SignalRService.instance = this;
  }

  async startConnection() {
    try {
      await this.connection.start();
      console.log("SignalR connected");
    } catch (err) {
      console.error("SignalR connection error:", err);
      setTimeout(() => this.startConnection(), 5000); // retry
    }
  }

  invoke(method, ...args) {

    if (this.connection.state === signalR.HubConnectionState.Connected) {
      return this.connection.invoke(method, ...args);
    } else {
      console.warn("SignalR not connected. Cannot invoke:", method);
    }
  }

  on(methodName, callback) {
    this.connection.on(methodName, callback);
  }

  off(methodName) {
    this.connection.off(methodName);
  }
}

