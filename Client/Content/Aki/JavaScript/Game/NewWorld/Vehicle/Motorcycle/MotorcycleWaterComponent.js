"use strict";

var __decorate = this && this.__decorate || function (e, t, i, r) {
  var o;
  var s = arguments.length;
  var n = s < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, r);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (o = e[h]) {
        n = (s < 3 ? o(n) : s > 3 ? o(t, i, n) : o(t, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleWaterComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MotorcycleTraceWaterCapability_1 = require("./MotorcycleTraceWaterCapability");
const waterAreaDetectExtent = new UE.VectorDouble(MotorcycleTraceWaterCapability_1.FIVE_HUNDRED, MotorcycleTraceWaterCapability_1.FIVE_HUNDRED, 5000);
const IMMERSION_DEPTH = -5;
const LEAVE_MOTOR_DEPTH = IMMERSION_DEPTH + 90;
const SEND_LEAVE_PERIOD = 1000;
const WATER_COMP_DISABLE_REASON = "OnVehicleBeenEntered";
let MotorcycleWaterComponent = class MotorcycleWaterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.TraceWaterCapability = undefined;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.TagComp = undefined;
    this.rka = false;
    this.ika = 0;
    this._3m = 0;
    this.BKs = Vector_1.Vector.Create();
    this.Rne = undefined;
    this.u3m = false;
    this.otg = e => {
      if (this.Rne !== undefined) {
        this.Enable(this.Rne, WATER_COMP_DISABLE_REASON);
      }
      this.Rne = undefined;
    };
    this.E8f = e => {
      this.InSwimArea = false;
      this.Immersion = false;
      this.Rne = this.Disable(WATER_COMP_DISABLE_REASON);
    };
  }
  static get Dependencies() {
    return [247, 249];
  }
  get Immersion() {
    return this.u3m;
  }
  set Immersion(e) {
    if (this.u3m !== e && ((this.u3m = e) ? this.TagComp?.AddTag(1471383626) : this.TagComp?.RemoveTag(1471383626), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Movement", 6, "Motorcycle Immersion", ["v", e]);
    }
  }
  get InSwimArea() {
    return this.rka;
  }
  set InSwimArea(e) {
    if (this.rka !== e && (this.rka = e, EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorcycleWaterAreaChange, e), ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(MotorcycleTraceWaterCapability_1.MOTORCYCLE_WATER_DEBUG_KEY) > 0) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Motor", 72, "MotorcycleWaterComponent.MotorcycleWaterAreaChange", ["InArea", e]);
    }
  }
  oka() {
    var e;
    if (this.MoveComp && !this.MoveComp.IsStandardGravity) {
      this.InSwimArea = true;
      this.ika = MotorcycleTraceWaterCapability_1.FIVE_HUNDRED;
    } else {
      e = (0, puerts_1.$ref)(0);
      this.InSwimArea = UE.NavigationSystemV1.D_NavigationGetWaterSurface(this.ActorComp.Owner, this.ActorComp.ActorLocation, waterAreaDetectExtent, e, this.ActorComp.Owner, undefined);
      if (this.InSwimArea) {
        e = (0, puerts_1.$unref)(e);
        this.ika = e - this.ActorComp.ActorLocationProxy.Z + MotorcycleTraceWaterCapability_1.ONE_HUNDRED;
      } else {
        this.ika = 0;
      }
    }
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(247);
    this.MoveComp = this.Entity.GetComponent(249);
    this.TagComp = this.Entity.GetComponent(217);
    this.TraceWaterCapability = new MotorcycleTraceWaterCapability_1.MotorcycleTraceWaterCapability(this.ActorComp);
    this.TraceWaterCapability.Activate();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.otg);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f);
    return true;
  }
  OnEnd() {
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.TagComp = undefined;
    this.TraceWaterCapability?.Deactivate();
    this.TraceWaterCapability = undefined;
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.otg);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f);
    return true;
  }
  OnTick(e) {
    var t;
    var i = this.ActorComp;
    if (!this.BKs.Equals(i.ActorLocationProxy, 1)) {
      this.BKs.DeepCopy(i.ActorLocationProxy);
      this.oka();
      if (!this.InSwimArea || !this.TraceWaterCapability || this.MoveComp?.VehicleMovement?.UpdatedPrimitive?.GetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.KuroWater) === 2 || !(i = this.TraceWaterCapability.TraceWater(this.ika, IMMERSION_DEPTH)).FoundWater || this.TraceWaterCapability.CeilingCheck(i.MinWaterHeight)) {
        this.Immersion = false;
      } else if (i.MinWaterHeight > LEAVE_MOTOR_DEPTH) {
        if (this._3m <= Time_1.Time.Now) {
          this._3m = Time_1.Time.Now + SEND_LEAVE_PERIOD;
          if (t = this.Entity.GetComponent(246)) {
            t.TryLeaveAllAtOnce(1, MotorcycleTraceWaterCapability_1.MOTORCYCLE_WATER_DEBUG_KEY);
          }
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, false, MotorcycleTraceWaterCapability_1.MOTORCYCLE_WATER_DEBUG_KEY, true);
          this.Immersion = false;
        }
      } else if (i.MinWaterHeight > IMMERSION_DEPTH) {
        this.Immersion = true;
      } else {
        this.Immersion = false;
      }
    }
  }
};
MotorcycleWaterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(266)], MotorcycleWaterComponent);
exports.MotorcycleWaterComponent = MotorcycleWaterComponent; //# sourceMappingURL=MotorcycleWaterComponent.js.map