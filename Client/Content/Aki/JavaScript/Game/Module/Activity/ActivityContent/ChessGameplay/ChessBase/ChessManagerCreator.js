"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChessManager = undefined;
const StackableChessManager_1 = require("../StackableChess/StackableChessManager");
function createChessManager(e) {
  if (e === 0) {
    return new StackableChessManager_1.StackableChessManager();
  }
}
exports.createChessManager = createChessManager;
//# sourceMappingURL=ChessManagerCreator.js.map