"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, o, i);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        n = (s < 3 ? r(n) : s > 3 ? r(e, o, n) : r(e, o)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, o, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorDebugMovementComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const WARNING_THRESHOLD_SQUARED = 25000000;
let ActorDebugMovementComponent = class ActorDebugMovementComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.UeDebugComp = undefined;
    this.IsDebug = false;
    this.LastRecordLocation = Vector_1.Vector.Create();
    this.WLa = false;
    this.QLa = [Protocol_1.Aki.Protocol.kks.Proto_Monster, Protocol_1.Aki.Protocol.kks.Proto_Player, Protocol_1.Aki.Protocol.kks.Proto_Npc, Protocol_1.Aki.Protocol.kks.HI_];
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(1);
    this.IsDebug = false;
    if (this.ActorComp) {
      this.WLa = this.QLa.includes(this.ActorComp.CreatureData.GetEntityType());
      this.LastRecordLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
    }
    return true;
  }
  SetDebug(t) {
    if (this.IsDebug !== t && (this.IsDebug = t, this.IsDebug)) {
      if (this.ActorComp?.Owner) {
        this.UeDebugComp = this.ActorComp.Owner.AddComponentByClass(UE.KuroDebugMovementComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      }
      this.UeDebugComp.Resigter();
    }
  }
  MarkDebugRecord(t, e = 15, o = false) {
    if (this.WLa && this.ActorComp) {
      if (!o && Vector_1.Vector.DistSquared(this.LastRecordLocation, this.ActorComp.ActorLocationProxy) > WARNING_THRESHOLD_SQUARED && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 6, "MarkDebugRecord 移动距离超五十米", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()], ["EntityId", this.ActorComp.Entity.Id], ["Context", t], ["From", this.LastRecordLocation], ["To", this.ActorComp.ActorLocationProxy], ["Actor", this.ActorComp.Owner.GetName()]);
      }
      this.LastRecordLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
    }
    if (this.IsDebug) {
      o = "[PbDataId:" + (this.ActorComp?.CreatureData.GetPbDataId() ?? "") + "][CreatureDataId:" + (this.ActorComp?.CreatureData.GetCreatureDataId() ?? "") + "]";
      this.UeDebugComp.RecordModifyInfo(t + o, undefined, e);
    }
  }
  static StaticMarkDebugRecord(t, e, o = 15, i = Vector_1.Vector.ZeroVector) {
    t.GetComponent(31).MarkDebugRecord(e, o);
  }
};
ActorDebugMovementComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(31)], ActorDebugMovementComponent);
exports.ActorDebugMovementComponent = ActorDebugMovementComponent; //# sourceMappingURL=ActorDebugMovementComponent.js.map