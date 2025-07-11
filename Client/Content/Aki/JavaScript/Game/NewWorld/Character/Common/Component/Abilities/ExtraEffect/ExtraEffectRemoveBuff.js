"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveBuff = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class RemoveBuff extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.LXo = undefined;
    this.DXo = () => {
      if (this.OwnerBuffComponent.HasBuffAuthority()) {
        this.OwnerBuffComponent.RemoveBuffByHandle(this.ActiveHandleId, -1, "buff施加者死亡导致移除");
      }
    };
    this.RXo = (e, t) => {
      if (t === this.InstigatorEntity && this.OwnerBuffComponent.HasBuffAuthority()) {
        this.OwnerBuffComponent.RemoveBuffByHandle(this.ActiveHandleId, -1, "buff施加者被移除导致移除");
      }
    };
  }
  InitParameters(e) {
    e = e.ExtraEffectParameters;
    this.LXo = (e[0] ?? "0").split("#").map(e => Number(e));
  }
  OnCreated() {
    for (const e of this.LXo) {
      switch (e) {
        case 0:
          EventSystem_1.EventSystem.AddWithTarget(this.InstigatorEntity.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.DXo);
          break;
        case 1:
          EventSystem_1.EventSystem.AddWithTarget(this.InstigatorEntity, EventDefine_1.EEventName.RemoveEntity, this.RXo);
      }
    }
  }
  OnRemoved(e) {
    if (this.InstigatorEntity?.Valid) {
      for (const t of this.LXo) {
        switch (t) {
          case 0:
            EventSystem_1.EventSystem.RemoveWithTarget(this.InstigatorEntity.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.DXo);
            break;
          case 1:
            EventSystem_1.EventSystem.RemoveWithTarget(this.InstigatorEntity, EventDefine_1.EEventName.RemoveEntity, this.RXo);
        }
      }
    }
  }
  OnExecute() {}
}
exports.RemoveBuff = RemoveBuff;
//# sourceMappingURL=ExtraEffectRemoveBuff.js.map