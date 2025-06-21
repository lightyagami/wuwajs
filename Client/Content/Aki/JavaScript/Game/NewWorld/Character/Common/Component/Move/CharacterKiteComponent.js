"use strict";
var __decorate = this && this.__decorate || function(t, e, i, s) {
  var r, n = arguments.length,
    o = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, s);
  else
    for (var _ = t.length - 1; 0 <= _; _--)(r = t[_]) && (o = (n < 3 ? r(o) : 3 < n ? r(e, i, o) : r(e, i)) || o);
  return 3 < n && o && Object.defineProperty(e, i, o), o
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterKiteComponent = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./CustomMovementDefine"),
  KITE_MIN_ACCEL_DIST = 300,
  KITE_MAX_ACCEL_DIST = 900,
  KITE_MIN_ACCEL = 1200,
  KITE_MAX_ACCEL = 18e3,
  KITE_FRICTION = .98,
  KITE_FACING_LERP_SPEED = 240,
  KITE_FACING_LERP_RATE = .9,
  KITE_MAX_BLOCK = 1,
  BLOCK_DIST_THRESHOLD_SQUARED = 4e4,
  KITE_BLOCK_COUNT = 3;
let CharacterKiteComponent = class CharacterKiteComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.Gce = void 0, this.M1l = Vector_1.Vector.Create(), this.Die = void 0, this.Nul = 0, this.Cgl = 0, this.znr = Vector_1.Vector.Create(), this.J71 = 0, this.bru = 0, this.S1l = (0, puerts_1.$ref)(void 0), this.OnMoveStateChanged = (t, e) => {
      t === CharacterUnifiedStateTypes_1.ECharMoveState.Kite && (this.Die = void 0)
    }
  }
  static get Dependencies() {
    return [178]
  }
  KiteMove(t) {
    var e, i;
    ModelManager_1.ModelManager.SeamlessTravelModel?.GetIsKeepingCurrentMovementMode() ? (this.znr.DeepCopy(this.Gce.ActorComp.ActorLocationProxy), this.J71 = 0, this.bru = 0) : this.Die?.Valid && this.Nul === this.Die.SplineMoveEndCount ? (Vector_1.Vector.DistSquared(this.znr, this.Gce.ActorComp.ActorLocationProxy) < BLOCK_DIST_THRESHOLD_SQUARED ? (this.J71 > KITE_MAX_BLOCK && ++this.bru >= KITE_BLOCK_COUNT && (this.Entity.GetComponent(99)?.SetIsHookEndByInterrupt(!0), this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterKiteComponent.KiteMove.Block]"
    })), this.J71 += t) : (this.znr.DeepCopy(this.Gce.ActorComp.ActorLocationProxy), this.J71 = 0, this.bru = 0), e = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, this.M1l.ToUeVector()), i = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, this.Die.HookLocation.ToUeVector()), UE.KuroMovementBPLibrary.KuroKite(t, this.Gce.CharacterMovement, e, i, KITE_MIN_ACCEL_DIST, KITE_MAX_ACCEL_DIST, KITE_MIN_ACCEL, KITE_MAX_ACCEL, KITE_FRICTION, this.S1l, KITE_FACING_LERP_SPEED, KITE_FACING_LERP_RATE), this.M1l.DeepCopy(this.Die.HookLocation)) : (this.Cgl !== this.Die?.SplineMoveBrokenCount && this.Entity.GetComponent(99)?.SetIsHookEndByInterrupt(!0), this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterKiteComponent.KiteMove.End]"
    }))
  }
  OnInit(t) {
    return !0
  }
  OnStart() {
    return this.Gce = this.Entity.GetComponent(178), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChanged), !0
  }
  OnEnd() {
    return EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChanged), !0
  }
  EnterKite(t) {
    return !(!t || !this.Gce?.CharacterMovement || (this.Die = t, this.Nul = t.SplineMoveEndCount, this.Cgl = t.SplineMoveBrokenCount, this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE,
      Context: "[CharacterKiteComponent.EnterKite]"
    }), this.M1l.DeepCopy(this.Die.HookLocation), this.J71 = 0, this.znr.DeepCopy(this.Gce.ActorComp.ActorLocationProxy), 0))
  }
};
CharacterKiteComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(38)], CharacterKiteComponent), exports.CharacterKiteComponent = CharacterKiteComponent;
//# sourceMappingURL=CharacterKiteComponent.js.map