"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMainViewStorage = undefined;
class GameMainViewStorage {
  static RegisterMainViewInfo(e, t) {
    this.uXu.set(e, t);
  }
  static GetMainViewInfo(e) {
    return this.uXu.get(e);
  }
  static HasRegisterMainViewInfo(e) {
    return this.uXu.has(e);
  }
}
(exports.GameMainViewStorage = GameMainViewStorage).uXu = new Map();
//# sourceMappingURL=GameMainViewStorage.js.map