"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCheckSceneItemDirection = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const LevelListenerBase_1 = require("./LevelListenerBase");
class LevelConditionListenerCheckSceneItemDirection extends LevelListenerBase_1.LevelListenerBase {
  constructor() {
    super(...arguments);
    this.Zge = (...e) => {
      this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.OnSceneItemRotateStopped, ...e));
    };
    this.uXd = undefined;
    this.kHa = undefined;
  }
  OnListen(e, t, i) {
    if (e.Target.Type === "Target") {
      this.kHa = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelConditionListenerCheckSceneItemDirection", e.Target.EntityId, () => {
        this.kHa = undefined;
        this.uXd = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandleByCheckTargetEntityConfig(e.Target, undefined, i)?.Entity;
        this.mXd();
      }, undefined, false, true);
    } else {
      this.uXd = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandleByCheckTargetEntityConfig(e.Target, undefined, i)?.Entity;
      this.mXd();
    }
  }
  mXd() {
    if (this.uXd?.Valid) {
      if (!EventSystem_1.EventSystem.HasWithTarget(this.uXd, EventDefine_1.EEventName.OnSceneItemRotateStopped, this.Zge)) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.uXd, EventDefine_1.EEventName.OnSceneItemRotateStopped, this.Zge);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelCondition", 39, "实体朝向条件监听失败: 实体无效");
    }
  }
  OnUnListen() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    if (this.kHa) {
      this.kHa.Cancel();
    }
    this.kHa = undefined;
  }
}
exports.LevelConditionListenerCheckSceneItemDirection = LevelConditionListenerCheckSceneItemDirection;
//# sourceMappingURL=LevelConditionListenerCheckSceneItemDirection.js.map