"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventStartRailSlide = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventStartRailSlide extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    var t;
    if (e) {
      if (t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()) {
        t.GetComponent(37)?.StartRailSlide(e.RailEntityId, e.SlidePerformDaPath);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 42, "LevelEventStartRailSlide 参数配置错误");
    }
  }
}
exports.LevelEventStartRailSlide = LevelEventStartRailSlide;
//# sourceMappingURL=LevelEventStartRailSlide.js.map