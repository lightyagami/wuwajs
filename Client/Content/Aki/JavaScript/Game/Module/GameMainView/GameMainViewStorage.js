"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMainViewStorage = undefined;
class GameMainViewStorage {
  static RegisterMainViewInfo(e, t) {
    this.fHu.set(e, t);
  }
  static GetMainViewInfo(e) {
    return this.fHu.get(e);
  }
  static HasRegisterMainViewInfo(e) {
    return this.fHu.has(e);
  }
}
(exports.GameMainViewStorage = GameMainViewStorage).fHu = new Map();
//# sourceMappingURL=GameMainViewStorage.js.map