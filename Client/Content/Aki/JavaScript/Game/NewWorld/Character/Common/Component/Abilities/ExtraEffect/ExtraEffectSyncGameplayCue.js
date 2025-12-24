"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncGameplayCue = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class SyncGameplayCue extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.f$o = undefined;
    this.aeu = undefined;
    this.Mvm = (e, t) => {
      if (e) {
        this.aeu?.AddCue(t);
      } else {
        this.aeu?.RemoveCue(t);
      }
    };
  }
  OnExecute() {}
  OnCreated() {
    if (this.InstigatorEntity?.Valid && this.InstigatorEntityId !== this.OwnerEntity?.Id) {
      this.f$o = this.InstigatorEntity;
      this.aeu = this.OwnerEntity?.GetComponent(238);
      EventSystem_1.EventSystem.AddWithTarget(this.f$o, EventDefine_1.EEventName.CharGameplayCueChanged, this.Mvm);
    } else {
      CombatLog_1.CombatLog.Error("Skill", this.OwnerEntity, "SyncGameplayCue效果的双方不能是同一人", ["Buff", this.BuffId]);
    }
  }
  OnRemoved() {
    if (this.f$o) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.f$o, EventDefine_1.EEventName.CharGameplayCueChanged, this.Mvm);
    }
  }
}
exports.SyncGameplayCue = SyncGameplayCue;
//# sourceMappingURL=ExtraEffectSyncGameplayCue.js.map