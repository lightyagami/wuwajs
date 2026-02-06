"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSlidePerformStart = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSlidePerformStart extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    var l;
    if (e) {
      if (l = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()) {
        l.GetComponent(38)?.StartRailSlide(e.SlideEntityId, e.SlidePerformConfig.SlopeSlidePerformDaPath);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 42, "LevelEventSlidePerformStart 参数配置错误");
    }
  }
}
exports.LevelEventSlidePerformStart = LevelEventSlidePerformStart;
//# sourceMappingURL=LevelEventSlidePerformStart.js.map