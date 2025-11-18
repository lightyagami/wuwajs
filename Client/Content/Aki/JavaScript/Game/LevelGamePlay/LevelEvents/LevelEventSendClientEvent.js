"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSendClientEvent = undefined;
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSendClientEvent extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, n) {
    var a = e.Target.Type;
    let r = 0;
    if (a === "Self") {
      switch (t.Type) {
        case 1:
          if (!t || !t.EntityId) {
            return;
          }
          r = t.EntityId;
          break;
        case 5:
          if (!t || !t.TriggerEntityId) {
            return;
          }
          r = t.TriggerEntityId;
      }
    }
    a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(r);
    if (a?.Valid && a.Entity) {
      EventSystem_1.EventSystem.EmitWithTarget(a.Entity, EventDefine_1.EEventName.CheckClientEvent, GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(e.EventName));
    }
  }
}
exports.LevelEventSendClientEvent = LevelEventSendClientEvent;
//# sourceMappingURL=LevelEventSendClientEvent.js.map