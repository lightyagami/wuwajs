"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCompleteGuide = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCompleteGuide extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.mDe = 0;
    this.dDe = e => {
      if (e === this.mDe && (this.mDe = 0, EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupFinished, this.dDe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupBreak, this.dDe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupRest, this.dDe), this.FinishExecute(true), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Guide", 16, "行为完成的引导组执行完毕[成功完成]", ["组Id", e]);
      }
    };
  }
  ExecuteNew(e) {
    if (e) {
      this.CDe(e.GuideId);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 18, "行为缺少参数", ["actionIndex", this.ActionIndex]);
      }
      this.FinishExecute(false);
    }
  }
  CDe(e) {
    if (ControllerHolder_1.ControllerHolder.GuideController.TryFinishGuide(e)) {
      this.mDe = e;
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupFinished, this.dDe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupBreak, this.dDe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupRest, this.dDe);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Guide", 16, "行为完成的引导组执行完毕[跳过完成]", ["组Id", e]);
      }
      this.FinishExecute(true);
    }
  }
}
exports.LevelEventCompleteGuide = LevelEventCompleteGuide;
//# sourceMappingURL=LevelEventCompleteGuide.js.map