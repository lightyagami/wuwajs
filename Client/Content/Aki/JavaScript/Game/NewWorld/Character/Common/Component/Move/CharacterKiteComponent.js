"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var r;
  var n = arguments.length;
  var o = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var _ = t.length - 1; _ >= 0; _--) {
      if (r = t[_]) {
        o = (n < 3 ? r(o) : n > 3 ? r(e, i, o) : r(e, i)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterKiteComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./CustomMovementDefine");
const KITE_MIN_ACCEL_DIST = 300;
const KITE_MAX_ACCEL_DIST = 900;
const KITE_MIN_ACCEL = 1200;
const KITE_MAX_ACCEL = 18000;
const KITE_FRICTION = 0.98;
const KITE_FACING_LERP_SPEED = 240;
const KITE_FACING_LERP_RATE = 0.9;
const KITE_MAX_BLOCK = 1;
const BLOCK_DIST_THRESHOLD_SQUARED = 40000;
const KITE_BLOCK_COUNT = 3;
let CharacterKiteComponent = class CharacterKiteComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Gce = undefined;
    this.M1l = Vector_1.Vector.Create();
    this.Die = undefined;
    this.Nul = 0;
    this.Cgl = 0;
    this.znr = Vector_1.Vector.Create();
    this.G91 = 0;
    this.Nau = 0;
    this.S1l = (0, puerts_1.$ref)(undefined);
    this.OnMoveStateChanged = (t, e) => {
      if (t === CharacterUnifiedStateTypes_1.ECharMoveState.Kite) {
        this.Die = undefined;
      }
    };
  }
  static get Dependencies() {
    return [179];
  }
  KiteMove(t) {
    var e;
    var i;
    if (ModelManager_1.ModelManager.SeamlessTravelModel?.GetIsKeepingCurrentMovementMode() || ModelManager_1.ModelManager.TeleportModel?.GetIsKeepingCurrentMovementMode()) {
      this.znr.DeepCopy(this.Gce.ActorComp.ActorLocationProxy);
      this.G91 = 0;
      this.Nau = 0;
    } else if (this.Die?.Valid && this.Nul === this.Die.SplineMoveEndCount) {
      if (Vector_1.Vector.DistSquared(this.znr, this.Gce.ActorComp.ActorLocationProxy) < BLOCK_DIST_THRESHOLD_SQUARED) {
        if (this.G91 > KITE_MAX_BLOCK && ++this.Nau >= KITE_BLOCK_COUNT) {
          this.Entity.GetComponent(100)?.SetIsHookEndByInterrupt(true);
          this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
            Mode: 3,
            Context: "[CharacterKiteComponent.KiteMove.Block]"
          });
        }
        this.G91 += t;
      } else {
        this.znr.DeepCopy(this.Gce.ActorComp.ActorLocationProxy);
        this.G91 = 0;
        this.Nau = 0;
      }
      e = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, this.M1l.ToUeVector());
      i = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, this.Die.HookLocation.ToUeVector());
      UE.KuroMovementBPLibrary.KuroKite(t, this.Gce.CharacterMovement, e, i, KITE_MIN_ACCEL_DIST, KITE_MAX_ACCEL_DIST, KITE_MIN_ACCEL, KITE_MAX_ACCEL, KITE_FRICTION, this.S1l, KITE_FACING_LERP_SPEED, KITE_FACING_LERP_RATE);
      this.M1l.DeepCopy(this.Die.HookLocation);
    } else {
      if (this.Cgl !== this.Die?.SplineMoveBrokenCount) {
        this.Entity.GetComponent(100)?.SetIsHookEndByInterrupt(true);
      }
      this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
        Mode: 3,
        Context: "[CharacterKiteComponent.KiteMove.End]"
      });
    }
  }
  OnInit(t) {
    return true;
  }
  OnStart() {
    this.Gce = this.Entity.GetComponent(179);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChanged);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChanged);
    return true;
  }
  EnterKite(t) {
    return !!t && !!this.Gce?.CharacterMovement && !(this.Die = t, this.Nul = t.SplineMoveEndCount, this.Cgl = t.SplineMoveBrokenCount, this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE,
      Context: "[CharacterKiteComponent.EnterKite]"
    }), this.M1l.DeepCopy(this.Die.HookLocation), this.G91 = 0, this.znr.DeepCopy(this.Gce.ActorComp.ActorLocationProxy), 0);
  }
};
CharacterKiteComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(38)], CharacterKiteComponent);
exports.CharacterKiteComponent = CharacterKiteComponent; //# sourceMappingURL=CharacterKiteComponent.js.map