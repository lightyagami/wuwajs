"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCompareEntityState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const LevelListenerBase_1 = require("./LevelListenerBase");
class LevelConditionListenerCompareEntityState extends LevelListenerBase_1.LevelListenerBase {
  constructor() {
    super(...arguments);
    this.Zge = (...e) => {
      this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.OnSceneItemStateChange, ...e));
    };
    this.Dgm = undefined;
    this.kHa = undefined;
  }
  OnListen(t, e, i) {
    if (t.Type === "CompareEntitySelfState") {
      this.Dgm = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, i)?.Entity;
      this.kgm();
    } else if (t.Type === "CompareEntityState") {
      this.kHa = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelConditionListenerCompareEntityState", t.EntityId, e => {
        this.kHa = undefined;
        this.Dgm = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.EntityId)?.Entity;
        this.kgm();
      }, undefined, false, true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelCondition", 39, "实体状态条件监听失败: 未知条件类型");
    }
  }
  kgm() {
    if (this.Dgm?.Valid) {
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Dgm, EventDefine_1.EEventName.OnSceneItemStateChange, this.Zge)) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Dgm, EventDefine_1.EEventName.OnSceneItemStateChange, this.Zge);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelCondition", 39, "实体状态条件监听失败: 实体无效");
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
exports.LevelConditionListenerCompareEntityState = LevelConditionListenerCompareEntityState;
//# sourceMappingURL=LevelConditionListenerCompareEntityState.js.map