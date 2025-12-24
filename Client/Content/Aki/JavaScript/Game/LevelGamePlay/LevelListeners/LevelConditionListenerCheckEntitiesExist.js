"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCheckEntitiesExist = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const LevelListenerBase_1 = require("./LevelListenerBase");
class LevelConditionListenerCheckEntitiesExist extends LevelListenerBase_1.LevelListenerBase {
  constructor() {
    super(...arguments);
    this.eMm = (...e) => {
      this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.AddEntity, ...e));
    };
    this.tMm = (...e) => {
      this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.RemoveEntity, ...e));
    };
  }
  OnListen(e, t, n) {
    let i = undefined;
    if (e.Type === "CompareEntitySelfState") {
      i = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, n)?.Entity;
    } else if (e.Type === "CompareEntityState") {
      i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId)?.Entity;
    }
    if (i?.Valid) {
      if (!EventSystem_1.EventSystem.HasWithTarget(i, EventDefine_1.EEventName.AddEntity, this.eMm)) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, i, EventDefine_1.EEventName.AddEntity, this.eMm);
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(i, EventDefine_1.EEventName.RemoveEntity, this.tMm)) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, i, EventDefine_1.EEventName.RemoveEntity, this.tMm);
      }
    }
  }
  OnUnListen() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
}
exports.LevelConditionListenerCheckEntitiesExist = LevelConditionListenerCheckEntitiesExist;
//# sourceMappingURL=LevelConditionListenerCheckEntitiesExist.js.map