"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraEffectBehaviorControl = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectBehaviorControl extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.tXo = 0;
    this.dce = false;
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    this.tXo = Number(t[0] ?? 0);
  }
  OnCreated() {
    if (!this.TryExecute({}, this.OwnerBuffComponent)) {
      this.dce = false;
      this.OwnerBuffComponent.RemoveBuffByHandle(this.ActiveHandleId, -1, "怪物类型不满足条件，移除自身");
    }
  }
  OnRemoved() {
    if (this.dce && (this.iXo(false), this.tXo === 1)) {
      this.oXo(false);
    }
  }
  OnExecute() {
    this.dce = true;
    var t = `被嘲讽buff ${this.BuffId}覆盖`;
    for (const e of this.OwnerEffectManager.FilterById(10)) {
      if (e !== this) {
        this.OwnerBuffComponent.RemoveBuffByHandle(e.ActiveHandleId, -1, t);
      }
    }
    this.iXo(true);
    if (this.tXo === 1) {
      this.oXo(true);
    }
  }
  iXo(t) {
    EventSystem_1.EventSystem.EmitWithTarget(this.OwnerEntity, EventDefine_1.EEventName.AiTauntAddOrRemove, t, this.InstigatorEntityId, this.ActiveHandleId);
  }
  oXo(t) {
    if (t) {
      BlackboardController_1.BlackboardController.SetEntityIdByEntity(this.OwnerEntity.Id, "TemptTarget", this.InstigatorEntityId);
    } else if (BlackboardController_1.BlackboardController.HasValueByEntity(this.OwnerEntity.Id, "TemptTarget")) {
      BlackboardController_1.BlackboardController.RemoveValueByEntity(this.OwnerEntity.Id, "TemptTarget");
    }
  }
}
exports.ExtraEffectBehaviorControl = ExtraEffectBehaviorControl;
//# sourceMappingURL=ExtraEffectBehaviorControl.js.map