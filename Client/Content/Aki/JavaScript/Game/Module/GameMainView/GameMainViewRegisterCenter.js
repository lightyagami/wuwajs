"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMainViewRegisterCenter = undefined;
const GameMainViewStorage_1 = require("./GameMainViewStorage");
const TrapDefenseMainViewProxy_1 = require("./TrapDefense/TrapDefenseMainViewProxy");
class GameMainViewRegisterCenter {
  static Init() {
    GameMainViewStorage_1.GameMainViewStorage.RegisterMainViewInfo(37, TrapDefenseMainViewProxy_1.TrapDefenseMainViewProxy);
  }
}
exports.GameMainViewRegisterCenter = GameMainViewRegisterCenter;
//# sourceMappingURL=GameMainViewRegisterCenter.js.map