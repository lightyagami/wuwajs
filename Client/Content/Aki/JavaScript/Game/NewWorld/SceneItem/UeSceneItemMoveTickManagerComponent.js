"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        r = (o < 3 ? s(r) : o > 3 ? s(t, i, r) : s(t, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UeSceneItemMoveTickManagerComponent = undefined;
const UE = require("ue");
const Time_1 = require("../../../Core/Common/Time");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
let UeSceneItemMoveTickManagerComponent = class UeSceneItemMoveTickManagerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.o4o = undefined;
    this.k4u = new Set();
    this.IYt = -1;
    this.H7u = false;
    this.O4u = (e, t) => {
      if (t) {
        this.k4u.add(e);
      } else if (e?.GetComponent(230)?.VehicleEntity !== this.Entity) {
        this.k4u.delete(e);
      }
    };
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(203);
    if (this.Entity.GameBudgetConfig.GroupName.op_Equality(FNameUtil_1.FNameUtil.GetDynamicFName("MoveSceneItemEntity"))) {
      this.H7u = true;
    }
    this.o4o = this.Hte.Owner.GetComponentByClass(UE.KuroSceneItemMoveComponent.StaticClass());
    if (!this.o4o?.IsValid()) {
      this.o4o = this.Hte.Owner.AddComponentByClass(UE.KuroSceneItemMoveComponent.StaticClass(), false, new UE.Transform(), false);
      this.o4o.Kuro_SetGravityDirect(this.Hte.ActorGravityDirectProxy.ToUeVectorOld());
      this.o4o.SetTickingMoveEnable(false);
      if (this.H7u) {
        this.o4o.SetKuroOnlyTickOutside(true);
      }
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnChangeBasedPlatform, this.O4u);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnChangeBasedPlatform, this.O4u);
    return true;
  }
  TickMovement(e, t = false) {
    if ((t || this.H7u && this.IYt < Time_1.Time.Frame) && this.o4o?.IsValid()) {
      this.o4o?.KuroTickComponentOutside(e * MathUtils_1.MathUtils.MillisecondToSecond);
      this.Hte?.ResetAllCachedTime();
      for (const n of this.k4u) {
        var i = n.GetComponent(1);
        if (i) {
          i.ResetAllCachedTime();
        }
      }
      this.IYt = Time_1.Time.Frame;
    }
  }
};
UeSceneItemMoveTickManagerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(299)], UeSceneItemMoveTickManagerComponent);
exports.UeSceneItemMoveTickManagerComponent = UeSceneItemMoveTickManagerComponent; //# sourceMappingURL=UeSceneItemMoveTickManagerComponent.js.map