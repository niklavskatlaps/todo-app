import { Socket, Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Handler } from "express";

export const EVENTS = {
  TODO_CREATED: "todo:created",
  TODO_UPDATED: "todo:updated",
  TODO_DELETED: "todo:deleted",
} as const;

export function initializeSocket(httpServer: HttpServer): Handler {
  const io = new SocketIOServer(httpServer);

  io.on("connection", (socket: Socket) => {
    console.log("A client connected");

    const todoListId = socket.handshake.query.todoListId;
    if (todoListId) {
      socket.join(todoListId);
    }

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });

  return (req, res, next) => {
    res.locals.io = io;
    next();
  };
}
