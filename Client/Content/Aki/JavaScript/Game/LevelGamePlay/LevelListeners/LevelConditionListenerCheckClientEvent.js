"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCheckClientEvent = undefined;
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const LevelListenerBase_1 = require("./LevelListenerBase");
class LevelConditionListenerCheckClientEvent extends LevelListenerBase_1.LevelListenerBase {
  constructor() {
    super(...arguments);
    this.Zge = (...e) => {
      var t = this.ListeningInfo.EventName;
      if (e?.[0] === GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(t)) {
        this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.CheckClientEvent, ...e));
      }
    };
    this.LAe = undefined;
  }
  OnListen(t, e, n) {
    this.LAe = t;
    if (this.LAe.ListenerTarget === undefined) {
      if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CheckClientEvent, this.Zge)) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CheckClientEvent, this.Zge);
      }
      t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, n)?.Entity;
      if (!!t?.Valid && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CheckClientEvent, this.Zge)) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.CheckClientEvent, this.Zge);
      }
    } else {
      t = this.LAe.ListenerTarget.Type;
      let e = 0;
      if (t === "Self") {
        if (!n || !n.EntityId) {
          return;
        }
        e = n.EntityId;
      }
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
      if (t?.Valid && t.Entity) {
        if (!EventSystem_1.EventSystem.HasWithTarget(t.Entity, EventDefine_1.EEventName.CheckClientEvent, this.Zge)) {
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t.Entity, EventDefine_1.EEventName.CheckClientEvent, this.Zge);
        }
      }
    }
  }
  OnUnListen() {
    if (this.Zge && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CheckClientEvent, this.Zge)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CheckClientEvent, this.Zge);
    }
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
}
exports.LevelConditionListenerCheckClientEvent = LevelConditionListenerCheckClientEvent;
//# sourceMappingURL=LevelConditionListenerCheckClientEvent.js.map