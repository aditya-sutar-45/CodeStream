export const LANGUAGE_VERSIONS = {
  javascript: "15.10.0",
  python: "3.9.4",
  java: "15.0.2",
  "c++": "10.2.0",
  typescript: "4.2.3",
  csharp: "5.0.202",
};

export const CODE_SNIPPETS = {
  javascript: `console.log("Hello, World!");`,
  python: `print("Hello, World!")`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  "c++": `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  typescript: `console.log("Hello, World!");`,
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
};

export const EVENTS = {
  ROOM: {
    CREATE: "createRoom",
    CREATED: "roomCreated",
    JOIN: "joinRoom",
    JOINED: "roomJoined",
    GET_INFO: "getRoomInfo",
    INFO: "roomInfo",
    LEAVE: "leaveRoom",
    LEFT: "leftRoom",
    DELETED: "roomDeleted",
    ERROR: "roomError",
  },
  CODE: {
    SYNC: "codeSync",
    UPDATE: "codeUpdate",
    LANUGAGE_CHANGE: "lanugageChange",
    LANGUAGE_UPDATE: "languageUpdate",
    CURSOR_MOVE: "cursor:move",
  },
  WHITEBOARD: {
    DRAW: "whiteboardDraw", 
    UNDO: "whiteboardUndo",
    ERASE: "whiteboardErase",
    MOVE: "whiteboardMove",
  },
  USER: {
    DISCONNECT: "disconnect",
  },
  SERVER: {
    SHUTDOWN: "serverShutdown",
  },
};

export const DEFAULT_PROFILE_PIC_URLS = () => {
  const urls = [];
  for (let i = 1; i < 10; i++) {
    urls.push(`/images/defaultProfilePics/${i}.png`);
  }

  return urls;
};
