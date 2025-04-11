export const EVENTS = {
  ROOM: {
    CREATE: "createRoom",
    CREATED: "roomCreated",
    JOIN: "joinRoom",
    JOINED: "roomJoined",
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
  },
  WHITEBOARD: {
    DRAW: "whiteboardDraw",
    UNDO: "whiteboardUndo",
    ERASE: "whiteboardErase",
  },
  USER: {
    DISCONNECT: "disconnect",
  },
  SERVER: {
    SHUTDOWN: "serverShutdown",
  },
};
