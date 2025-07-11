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
    this.XY1 = undefined;
    this.KFu = undefined;
    this.TWc = undefined;
    this.dce = false;
    this.YY1 = false;
    this.zY1 = [];
    this.Lau = [];
    this.wau = 0;
    this.Aau = Vector_1.Vector.Create(0, 0, 0);
    this.Pau = 0;
    this.JY1 = undefined;
    this.mBe = undefined;
    this.xau = 0;
    this.bWc = (t, i) => {
      if (i && this.YY1) {
        this.ZY1(false);
      }
    };
    this.RKr = (t, i) => {
      this.dce = i;
      if (!this.dce) {
        this.ZY1(false);
      }
    };
    this.XFu = (t, i) => {
      if (!i) {
        this.ZY1(false);
      }
    };
    this.DVr = (t, i) => {
      if (i === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && this.YY1) {
        this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WalkOnAir);
      }
    };
    this.I3r = t => {
      if (t?.Valid) {
        this.dce = this.Lie.HasTag(1970009389);
        if (!this.dce) {
          this.ZY1(false);
        }
      }
    };
    this.Ilt = (t, i) => {
      if (this.dce && this.YY1) {
        this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WalkOnAir);
      }
    };
    this.Hqr = (t, i, e, s, r) => {
      if (!!this.dce && !(this.xau >= Time_1.Time.Frame)) {
        if (i === 1 && e === 3 && !this.Hte.InputDirectProxy.IsNearlyZero() && !this.JY1?.IsKuroForceFlying() && !this.Lie.HasTag(-1371021686) && FormationAttributeController_1.FormationAttributeController.GetValue(1) > STRENGTH_THREADHOLD && this.mBe?.IsWalkMode) {
          this.tz1();
          this.ZY1(true);
          this.xau = Time_1.Time.Frame + FRAME_INTERNAL;
        } else if (e !== 1) {
          this.ZY1(false);
        }
      }
    };
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    var t = this.Entity.GetComponent(205);
    return !!t?.Valid && (this.JY1 = this.Hte.Actor, this.Lie = t, !!this.Entity.GetComponent(178)?.Valid) && (this.k_(), this.mBe = this.Entity.GetComponent(175), true);
  }
  k_() {
    this.XY1 = this.Lie.ListenForTagAddOrRemove(1970009389, this.RKr);
    this.KFu = this.Lie.ListenForTagAddOrRemove(-1384309247, this.XFu);
    this.TWc = this.Lie.ListenForTagAddOrRemove(-1371021686, this.bWc);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  BKr() {
    this.XY1?.EndTask();
    this.KFu?.EndTask();
    this.TWc?.EndTask();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  Uau(t) {
    var i;
    var e = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    if (e) {
      (i = e.AddComponentByClass(UE.BoxComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false)).D_SetBoxExtent(CharacterWalkOnAirComponent_1.iz1);
      i.SetCollisionObjectType(QueryTypeDefine_1.KuroCollisionChannel.WorldStaticIgnoreBullet);
      i.SetCollisionResponseToAllChannels(0);
      i.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer, 2);
      this.zY1[t] = e;
      this.Lau[t] = i;
    } else {
      CombatLog_1.CombatLog.Warn("Move", this.Entity, "空中行走创建地面失败");
    }
  }
  tz1() {
    if (!(this.zY1.length > 0)) {
      this.wau = 0;
      this.Uau(0);
      this.Lau[0]?.SetCollisionEnabled(1);
      this.Uau(1);
      this.Lau[1]?.SetCollisionEnabled(0);
    }
  }
  ZY1(t) {
    if (t === this.YY1) {
      if (t) {
        this.rz1();
      }
    } else if (this.YY1 = t) {
      this.rz1();
      this.Lau[this.wau]?.SetCollisionEnabled(1);
      this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WalkOnAir);
    } else {
      this.Lau[this.wau]?.SetCollisionEnabled(0);
      this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None);
    }
  }
  rz1(t = false) {
    var i = this.Hte.FloorLocation;
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, i, -CharacterWalkOnAirComponent_1.iz1.Z);
    this.Aau.DeepCopy(i);
    var e = GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Hte);
    if (t) {
      t = i.DotProduct(e);
      i.AdditionEqual(e.Multiply(this.Pau - t, MathUtils_1.MathUtils.CommonTempVector));
    } else {
      this.Pau = i.DotProduct(e);
    }
    this.zY1[this.wau]?.D_K2_SetActorLocationAndRotation(i.ToUeVector(), this.Hte.ActorRotation, false, undefined, false);
  }
  Dau() {
    this.Lau[this.wau]?.SetCollisionEnabled(0);
    this.wau ^= 1;
    this.Lau[this.wau]?.SetCollisionEnabled(1);
  }
  OnTick(t) {
    if (this.YY1) {
      if (Vector_1.Vector.DistSquared(this.Aau, this.Hte.FloorLocation) > SWITCH_DISTANCE_SQUARE) {
        this.Dau();
        this.rz1(true);
      }
      if (!(this.xau >= Time_1.Time.Frame)) {
        if (!this.Lie.HasTag(498191540) || FormationAttributeController_1.FormationAttributeController.GetValue(1) <= 0) {
          this.ZY1(false);
          this.xau = Time_1.Time.Frame + FRAME_INTERNAL;
        }
      }
    }
  }
  OnEnd() {
    this.BKr();
    return true;
  }
  OnClear() {
    for (const t of this.zY1) {
      ActorSystem_1.ActorSystem.Put("OnClearWalkOnAir", t);
    }
    this.zY1.length = 0;
    return !(this.Lau.length = 0);
  }
};
CharacterWalkOnAirComponent.iz1 = new UE.VectorDouble(BOX_LENGTH, BOX_LENGTH, 1);
CharacterWalkOnAirComponent = CharacterWalkOnAirComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(80)], CharacterWalkOnAirComponent);
exports.CharacterWalkOnAirComponent = CharacterWalkOnAirComponent; //# sourceMappingURL=CharacterWalkOnAirComponent.js.map