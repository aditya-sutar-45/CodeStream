export const EVENTS = {
  ROOM: {
    CREATE: "createRoom",
    CREATED: "roomCreated",
    JOIN: "joinRoom",
    JOINED: "roomJoined",
    USER_JOINED: "userJoined",
    LEAVE: "leaveRoom",
    LEFT: "leftRoom",
    DELETED: "roomDeleted",
    GET_INFO: "getRoomInfo",
    INFO: "roomInfo",
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
  CHAT: {
    SEND: "chatSend",
    RECEIVE: "chatReceive",
  },
  USER: {
    DISCONNECT: "disconnect",
  },
  SERVER: {
    SHUTDOWN: "serverShutdown",
  },
};
