"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCheckClientEvent = undefined;
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
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
  }
  OnListen(e, t, n) {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CheckClientEvent, this.Zge)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CheckClientEvent, this.Zge);
    }
    n = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, n)?.Entity;
    if (n?.Valid && !EventSystem_1.EventSystem.HasWithTarget(n, EventDefine_1.EEventName.CheckClientEvent, this.Zge)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, n, EventDefine_1.EEventName.CheckClientEvent, this.Zge);
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