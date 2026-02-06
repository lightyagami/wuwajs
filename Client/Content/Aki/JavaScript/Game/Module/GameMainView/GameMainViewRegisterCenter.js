"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMainViewRegisterCenter = undefined;
const GameMainViewStorage_1 = require("./GameMainViewStorage");
const MotorcycleArrowMainViewProxy_1 = require("./MotorArrow/MotorcycleArrowMainViewProxy");
const SpringManorMainViewProxy_1 = require("./SpringManor/SpringManorMainViewProxy");
const SurvivorsRogueMainViewProxy_1 = require("./SurvivorsRogue/SurvivorsRogueMainViewProxy");
const TrapDefenseMainViewProxy_1 = require("./TrapDefense/TrapDefenseMainViewProxy");
class GameMainViewRegisterCenter {
  static Init() {
    GameMainViewStorage_1.GameMainViewStorage.RegisterMainViewInfo(37, TrapDefenseMainViewProxy_1.TrapDefenseMainViewProxy);
    GameMainViewStorage_1.GameMainViewStorage.RegisterMainViewInfo(41, SurvivorsRogueMainViewProxy_1.SurvivorsRogueMainViewProxy);
    GameMainViewStorage_1.GameMainViewStorage.RegisterMainViewInfo(44, MotorcycleArrowMainViewProxy_1.MotorcycleArrowMainViewProxy);
    GameMainViewStorage_1.GameMainViewStorage.RegisterMainViewInfoWorldInstance(2, SpringManorMainViewProxy_1.SpringManorMainViewProxy);
  }
}
exports.GameMainViewRegisterCenter = GameMainViewRegisterCenter;
//# sourceMappingURL=GameMainViewRegisterCenter.js.map