"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiDecoratorCheckLevelPlayState = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorCheckLevelPlayState extends LevelAiDecorator_1.LevelAiDecorator {
  constructor() {
    super(...arguments);
    this.mIe = (e, t) => {
      var r = this.Params;
      if (r && r.LevelId === e) {
        r = this.CheckCondition(1);
        this.NotifyEventBasedCondition(r);
      }
    };
  }
  OnExecutionStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLevelPlayStateChange, this.mIe);
  }
  OnExecutionFinish() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLevelPlayStateChange, this.mIe);
  }
  CheckCondition(e) {
    var t = this.Params;
    return !!t && ModelManager_1.ModelManager.LevelPlayModel.CheckLevelPlayState(t.LevelId, t.State, t.Compare);
  }
}
exports.LevelAiDecoratorCheckLevelPlayState = LevelAiDecoratorCheckLevelPlayState;
//# sourceMappingURL=LevelAiDecoratorCheckLevelPlayState.js.map