"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMainViewRegisterCenter = undefined;
const GameMainViewStorage_1 = require("./GameMainViewStorage");
const SurvivorsRogueMainViewProxy_1 = require("./SurvivorsRogue/SurvivorsRogueMainViewProxy");
const TrapDefenseMainViewProxy_1 = require("./TrapDefense/TrapDefenseMainViewProxy");
class GameMainViewRegisterCenter {
  static Init() {
    GameMainViewStorage_1.GameMainViewStorage.RegisterMainViewInfo(37, TrapDefenseMainViewProxy_1.TrapDefenseMainViewProxy);
    GameMainViewStorage_1.GameMainViewStorage.RegisterMainViewInfo(41, SurvivorsRogueMainViewProxy_1.SurvivorsRogueMainViewProxy);
  }
}
exports.GameMainViewRegisterCenter = GameMainViewRegisterCenter;
//# sourceMappingURL=GameMainViewRegisterCenter.js.map