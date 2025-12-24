"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StackableChessManager = undefined;
const StackableChessboradPoint_1 = require("./StackableChessboradPoint");
const StackableChessItem_1 = require("./StackableChessItem");
class StackableChessManager {
  CreateChessboardPoint() {
    return new StackableChessboradPoint_1.StackableChessboardPoint();
  }
  CreateChessItem() {
    return new StackableChessItem_1.StackableChessItem();
  }
  GetChessAgent(e, s) {
    if (e === 0) {
      e = s?.Entity;
      if (e?.Valid) {
        return e.GetComponent(309);
      }
    }
  }
}
exports.StackableChessManager = StackableChessManager;
//# sourceMappingURL=StackableChessManager.js.map