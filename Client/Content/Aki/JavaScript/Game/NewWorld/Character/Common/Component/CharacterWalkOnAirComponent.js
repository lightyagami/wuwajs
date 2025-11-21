"use strict";

var CharacterWalkOnAirComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var r;
  var h = arguments.length;
  var n = h < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (r = t[o]) {
        n = (h < 3 ? r(n) : h > 3 ? r(i, e, n) : r(i, e)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(i, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterWalkOnAirComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Time_1 = require("../../../../../Core/Common/Time");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const STRENGTH_THREADHOLD = 10;
const FRAME_INTERNAL = 2;
const BOX_LENGTH = 200;
const SWITCH_DISTANCE_SQUARE = 22500;
let CharacterWalkOnAirComponent = CharacterWalkOnAirComponent_1 = class CharacterWalkOnAirComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Lie = undefined;
    this.Sz1 = undefined;
    this.CVu = undefined;
    this.BWc = undefined;
    this.dce = false;
    this.Mz1 = false;
    this.Ez1 = [];
    this.ehu = [];
    this.thu = 0;
    this.ihu = Vector_1.Vector.Create(0, 0, 0);
    this.rhu = 0;
    this.Iz1 = undefined;
    this.mBe = undefined;
    this.ohu = 0;
    this.kWc = (t, i) => {
      if (i && this.Mz1) {
        this.Tz1(false);
      }
    };
    this.RKr = (t, i) => {
      this.dce = i;
      if (!this.dce) {
        this.Tz1(false);
      }
    };
    this.pVu = (t, i) => {
      if (!i) {
        this.Tz1(false);
      }
    };
    this.DVr = (t, i) => {
      if (i === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && this.Mz1) {
        this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WalkOnAir);
      }
    };
    this.I3r = t => {
      if (t?.Valid) {
        this.dce = this.Lie.HasTag(1970009389);
        if (!this.dce) {
          this.Tz1(false);
        }
      }
    };
    this.Ilt = t => {
      if (this.dce && this.Mz1) {
        this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WalkOnAir);
      }
    };
    this.Hqr = (t, i, e, s, r) => {
      if (!!this.dce && !(this.ohu >= Time_1.Time.Frame)) {
        if (this.Lie.HasTag(-1384309247) && i === 1 && e === 3 && !this.Hte.InputDirectProxy.IsNearlyZero() && !this.Iz1?.IsKuroForceFlying() && !this.Lie.HasTag(-1371021686) && FormationAttributeController_1.FormationAttributeController.GetValue(1) > STRENGTH_THREADHOLD && this.mBe?.IsWalkMode) {
          this.Rz1();
          this.Tz1(true);
          this.ohu = Time_1.Time.Frame + FRAME_INTERNAL;
        } else if (e !== 1) {
          this.Tz1(false);
        }
      }
    };
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    var t = this.Entity.GetComponent(209);
    return !!t?.Valid && (this.Iz1 = this.Hte.Actor, this.Lie = t, !!this.Entity.GetComponent(182)?.Valid) && (this.k_(), this.mBe = this.Entity.GetComponent(179), true);
  }
  k_() {
    this.Sz1 = this.Lie.ListenForTagAddOrRemove(1970009389, this.RKr);
    this.CVu = this.Lie.ListenForTagAddOrRemove(-1384309247, this.pVu);
    this.BWc = this.Lie.ListenForTagAddOrRemove(-1371021686, this.kWc);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  BKr() {
    this.Sz1?.EndTask();
    this.CVu?.EndTask();
    this.BWc?.EndTask();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  nhu(t) {
    var i;
    var e = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    if (e) {
      (i = e.AddComponentByClass(UE.BoxComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false)).D_SetBoxExtent(CharacterWalkOnAirComponent_1.Lz1);
      i.SetCollisionObjectType(QueryTypeDefine_1.KuroCollisionChannel.WorldStaticIgnoreBullet);
      i.SetCollisionResponseToAllChannels(0);
      i.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer, 2);
      this.Ez1[t] = e;
      this.ehu[t] = i;
    } else {
      CombatLog_1.CombatLog.Warn("Move", this.Entity, "空中行走创建地面失败");
    }
  }
  Rz1() {
    if (!(this.Ez1.length > 0)) {
      this.thu = 0;
      this.nhu(0);
      this.ehu[0]?.SetCollisionEnabled(1);
      this.nhu(1);
      this.ehu[1]?.SetCollisionEnabled(0);
    }
  }
  Tz1(t) {
    if (t === this.Mz1) {
      if (t) {
        this.wz1();
      }
    } else if (this.Mz1 = t) {
      this.wz1();
      this.ehu[this.thu]?.SetCollisionEnabled(1);
      this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WalkOnAir);
    } else {
      this.ehu[this.thu]?.SetCollisionEnabled(0);
      this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None);
    }
  }
  wz1(t = false) {
    var i = this.Hte.FloorLocation;
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, i, -CharacterWalkOnAirComponent_1.Lz1.Z);
    this.ihu.DeepCopy(i);
    var e = GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Hte);
    if (t) {
      t = i.DotProduct(e);
      i.AdditionEqual(e.Multiply(this.rhu - t, MathUtils_1.MathUtils.CommonTempVector));
    } else {
      this.rhu = i.DotProduct(e);
    }
    this.Ez1[this.thu]?.D_K2_SetActorLocationAndRotation(i.ToUeVector(), this.Hte.ActorRotation, false, undefined, false);
  }
  shu() {
    this.ehu[this.thu]?.SetCollisionEnabled(0);
    this.thu ^= 1;
    this.ehu[this.thu]?.SetCollisionEnabled(1);
  }
  OnTick(t) {
    if (this.Mz1) {
      if (Vector_1.Vector.DistSquared(this.ihu, this.Hte.FloorLocation) > SWITCH_DISTANCE_SQUARE) {
        this.shu();
        this.wz1(true);
      }
      if (!(this.ohu >= Time_1.Time.Frame)) {
        if (!this.Lie.HasTag(498191540) || FormationAttributeController_1.FormationAttributeController.GetValue(1) <= 0) {
          this.Tz1(false);
          this.ohu = Time_1.Time.Frame + FRAME_INTERNAL;
        }
      }
    }
  }
  OnEnd() {
    this.BKr();
    return true;
  }
  OnClear() {
    for (const t of this.Ez1) {
      ActorSystem_1.ActorSystem.Put("OnClearWalkOnAir", t);
    }
    this.Ez1.length = 0;
    return !(this.ehu.length = 0);
  }
};
CharacterWalkOnAirComponent.Lz1 = new UE.VectorDouble(BOX_LENGTH, BOX_LENGTH, 1);
CharacterWalkOnAirComponent = CharacterWalkOnAirComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(80)], CharacterWalkOnAirComponent);
exports.CharacterWalkOnAirComponent = CharacterWalkOnAirComponent; //# sourceMappingURL=CharacterWalkOnAirComponent.js.map