"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCompareEntityState = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const LevelListenerBase_1 = require("./LevelListenerBase");
class LevelConditionListenerCompareEntityState extends LevelListenerBase_1.LevelListenerBase {
  constructor() {
    super(...arguments);
    this.Zge = (...e) => {
      this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.OnSceneItemStateChange, ...e));
    };
  }
  OnListen(e, t, n) {
    let i = undefined;
    if (e.Type === "CompareEntitySelfState") {
      i = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, n)?.Entity;
    } else if (e.Type === "CompareEntityState") {
      i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId)?.Entity;
    }
    if (i?.Valid && !EventSystem_1.EventSystem.HasWithTarget(i, EventDefine_1.EEventName.OnSceneItemStateChange, this.Zge)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, i, EventDefine_1.EEventName.OnSceneItemStateChange, this.Zge);
    }
  }
  OnUnListen() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
}
exports.LevelConditionListenerCompareEntityState = LevelConditionListenerCompareEntityState;
//# sourceMappingURL=LevelConditionListenerCompareEntityState.js.map