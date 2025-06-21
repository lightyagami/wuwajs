"use strict";
var __decorate = this && this.__decorate || function(e, t, i, n) {
  var s, o = arguments.length,
    r = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, n);
  else
    for (var h = e.length - 1; 0 <= h; h--)(s = e[h]) && (r = (o < 3 ? s(r) : 3 < o ? s(t, i, r) : s(t, i)) || r);
  return 3 < o && r && Object.defineProperty(t, i, r), r
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UeSceneItemMoveTickManagerComponent = void 0;
const UE = require("ue"),
  Time_1 = require("../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
let UeSceneItemMoveTickManagerComponent = class UeSceneItemMoveTickManagerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.Hte = void 0, this.o4o = void 0, this.Bmu = new Set, this.IYt = -1, this.bgu = !1, this.kmu = (e, t) => {
      t ? this.Bmu.add(e) : (e?.GetComponent(229))?.VehicleEntity !== this.Entity && this.Bmu.delete(e)
    }
  }
  OnStart() {
    return this.Hte = this.Entity.GetComponent(202), this.Entity.GameBudgetConfig.GroupName.op_Equality(FNameUtil_1.FNameUtil.GetDynamicFName("MoveSceneItemEntity")) && (this.bgu = !0), this.o4o = this.Hte.Owner.GetComponentByClass(UE.KuroSceneItemMoveComponent.StaticClass()), this.o4o?.IsValid() || (this.o4o = this.Hte.Owner.AddComponentByClass(UE.KuroSceneItemMoveComponent.StaticClass(), !1, new UE.Transform, !1), this.o4o.Kuro_SetGravityDirect(this.Hte.ActorGravityDirectProxy.ToUeVectorOld()), this.o4o.SetTickingMoveEnable(!1), this.bgu && this.o4o.SetKuroOnlyTickOutside(!0)), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnChangeBasedPlatform, this.kmu), !0
  }
  OnEnd() {
    return EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnChangeBasedPlatform, this.kmu), !0
  }
  TickMovement(e, t = !1) {
    if ((t || this.bgu && this.IYt < Time_1.Time.Frame) && this.o4o?.IsValid()) {
      this.o4o?.KuroTickComponentOutside(e * MathUtils_1.MathUtils.MillisecondToSecond), this.Hte?.ResetAllCachedTime();
      for (const n of this.Bmu) {
        var i = n.GetComponent(1);
        i && i.ResetAllCachedTime()
      }
      this.IYt = Time_1.Time.Frame
    }
  }
};
UeSceneItemMoveTickManagerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(291)], UeSceneItemMoveTickManagerComponent), exports.UeSceneItemMoveTickManagerComponent = UeSceneItemMoveTickManagerComponent;
//# sourceMappingURL=UeSceneItemMoveTickManagerComponent.js.map