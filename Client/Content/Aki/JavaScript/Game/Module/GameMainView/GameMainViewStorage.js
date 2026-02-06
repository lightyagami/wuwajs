"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMainViewStorage = undefined;
class GameMainViewStorage {
  static RegisterMainViewInfo(e, t) {
    this.fHu.set(e, t);
  }
  static RegisterMainViewInfoWorldInstance(e, t) {
    this.cpg.set(e, t);
  }
  static GetMainViewInfo(e, t) {
    if (e === 12) {
      return this.cpg.get(t);
    } else {
      return this.fHu.get(e);
    }
  }
  static HasRegisterMainViewInfo(e, t) {
    if (e === 12) {
      return this.cpg.has(t);
    } else {
      return this.fHu.has(e);
    }
  }
}
(exports.GameMainViewStorage = GameMainViewStorage).fHu = new Map();
GameMainViewStorage.cpg = new Map(); //# sourceMappingURL=GameMainViewStorage.js.map