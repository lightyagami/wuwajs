"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventStartRailSlide = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventStartRailSlide extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    var t;
    e ? (t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()) && t.GetComponent(36)?.StartRailSlide(e.RailEntityId, e.SlidePerformDaPath) : Log_1.Log.CheckError() && Log_1.Log.Error("Event", 42, "LevelEventStartRailSlide 参数配置错误")
  }
}
exports.LevelEventStartRailSlide = LevelEventStartRailSlide;
//# sourceMappingURL=LevelEventStartRailSlide.js.map