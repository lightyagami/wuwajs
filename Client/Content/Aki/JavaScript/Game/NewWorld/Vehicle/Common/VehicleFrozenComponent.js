"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var s;
  var i = arguments.length;
  var r = i < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, o);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        r = (i < 3 ? s(r) : i > 3 ? s(t, n, r) : s(t, n)) || r;
      }
    }
  }
  if (i > 3 && r) {
    Object.defineProperty(t, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleFrozenComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const CombatLog_1 = require("../../../Utils/CombatLog");
const MonsterFrozenComponent_1 = require("../../Character/Monster/Entity/Component/MonsterFrozenComponent");
let VehicleFrozenComponent = class VehicleFrozenComponent extends MonsterFrozenComponent_1.MonsterFrozenComponent {
  constructor() {
    super(...arguments);
    this.VehiclePerformComponent = undefined;
    this.cFm = (e, t) => {
      if (e && EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharAfterFrozenChange, this.OYm)) {
        EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharAfterFrozenChange, this.OYm);
      }
      if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharAfterFrozenChange, this.OYm)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharAfterFrozenChange, this.OYm);
      }
      this.RefreshFrozen();
    };
    this.OYm = () => {
      this.RefreshFrozen();
    };
  }
  OnStart() {
    super.OnStart();
    this.mSe();
    this.VehiclePerformComponent = this.Entity.GetComponent(246);
    return true;
  }
  OnEnd() {
    super.OnEnd();
    this.dSe();
    return true;
  }
  mSe() {
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleDriverChange, this.cFm)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleDriverChange, this.cFm);
    }
  }
  dSe() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleDriverChange, this.cFm)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleDriverChange, this.cFm);
    }
  }
  RefreshFrozen() {
    if (this.FrozenLockSet.size > 0 || this.VehiclePerformComponent?.Driver?.GetComponent(16)?.IsFrozen()) {
      this.SetFrozen(true);
    } else {
      this.SetFrozen(false);
    }
  }
};
VehicleFrozenComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(341)], VehicleFrozenComponent);
exports.VehicleFrozenComponent = VehicleFrozenComponent; //# sourceMappingURL=VehicleFrozenComponent.js.map