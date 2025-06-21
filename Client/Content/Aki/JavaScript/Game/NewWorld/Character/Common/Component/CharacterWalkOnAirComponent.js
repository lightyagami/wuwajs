"use strict";
var CharacterWalkOnAirComponent_1, __decorate = this && this.__decorate || function(t, i, e, s) {
  var r, h = arguments.length,
    n = h < 3 ? i : null === s ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, i, e, s);
  else
    for (var o = t.length - 1; 0 <= o; o--)(r = t[o]) && (n = (h < 3 ? r(n) : 3 < h ? r(i, e, n) : r(i, e)) || n);
  return 3 < h && n && Object.defineProperty(i, e, n), n
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterWalkOnAirComponent = void 0;
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Time_1 = require("../../../../../Core/Common/Time"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  STRENGTH_THREADHOLD = 10,
  FRAME_INTERNAL = 2,
  BOX_LENGTH = 200,
  SWITCH_DISTANCE_SQUARE = 22500;
let CharacterWalkOnAirComponent = CharacterWalkOnAirComponent_1 = class CharacterWalkOnAirComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.Hte = void 0, this.Lie = void 0, this.iY1 = void 0, this.Sgu = void 0, this.dce = !1, this.rY1 = !1, this.oY1 = [], this.Fru = [], this.Nru = 0, this.Vru = Vector_1.Vector.Create(0, 0, 0), this.jru = 0, this.nY1 = void 0, this.mBe = void 0, this.Hru = 0, this.RKr = (t, i) => {
      this.dce = i, this.dce || this.sY1(!1)
    }, this.Mgu = (t, i) => {
      i || this.sY1(!1)
    }, this.DVr = (t, i) => {
      i === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && this.rY1 && this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WalkOnAir)
    }, this.I3r = t => {
      t?.Valid && (this.dce = this.Lie.HasTag(1970009389), this.dce || this.sY1(!1))
    }, this.Ilt = (t, i) => {
      this.dce && this.rY1 && this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WalkOnAir)
    }, this.Hqr = (t, i, e, s, r) => {
      !this.dce || this.Hru >= Time_1.Time.Frame || (1 === i && 3 === e && !this.Hte.InputDirectProxy.IsNearlyZero() && !this.nY1?.IsKuroForceFlying() && FormationAttributeController_1.FormationAttributeController.GetValue(1) > STRENGTH_THREADHOLD && this.mBe?.IsWalkMode ? (this.hY1(), this.sY1(!0), this.Hru = Time_1.Time.Frame + FRAME_INTERNAL) : 1 !== e && this.sY1(!1))
    }
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    var t = this.Entity.GetComponent(205);
    return !!t?.Valid && (this.nY1 = this.Hte.Actor, this.Lie = t, !!this.Entity.GetComponent(178)?.Valid) && (this.k_(), this.mBe = this.Entity.GetComponent(175), !0)
  }
  k_() {
    this.iY1 = this.Lie.ListenForTagAddOrRemove(1970009389, this.RKr), this.Sgu = this.Lie.ListenForTagAddOrRemove(-1384309247, this.Mgu), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt)
  }
  BKr() {
    this.iY1?.EndTask(), this.Sgu?.EndTask(), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt)
  }
  $ru(t) {
    var i, e = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    e ? ((i = e.AddComponentByClass(UE.BoxComponent.StaticClass(), !1, MathUtils_1.MathUtils.DefaultTransform, !1)).D_SetBoxExtent(CharacterWalkOnAirComponent_1.lY1), i.SetCollisionObjectType(QueryTypeDefine_1.KuroCollisionChannel.WorldStaticIgnoreBullet), i.SetCollisionResponseToAllChannels(0), i.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer, 2), this.oY1[t] = e, this.Fru[t] = i) : CombatLog_1.CombatLog.Warn("Move", this.Entity, "空中行走创建地面失败")
  }
  hY1() {
    0 < this.oY1.length || (this.Nru = 0, this.$ru(0), this.Fru[0]?.SetCollisionEnabled(1), this.$ru(1), this.Fru[1]?.SetCollisionEnabled(0))
  }
  sY1(t) {
    t === this.rY1 ? t && this._Y1() : (this.rY1 = t) ? (this._Y1(), this.Fru[this.Nru]?.SetCollisionEnabled(1), this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.WalkOnAir)) : (this.Fru[this.Nru]?.SetCollisionEnabled(0), this.mBe.SetPositionSubState(CharacterUnifiedStateTypes_1.ECharPositionSubState.None))
  }
  _Y1(t = !1) {
    var i = this.Hte.FloorLocation,
      e = (GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, i, -CharacterWalkOnAirComponent_1.lY1.Z), this.Vru.DeepCopy(i), GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Hte));
    t ? (t = i.DotProduct(e), i.AdditionEqual(e.Multiply(this.jru - t, MathUtils_1.MathUtils.CommonTempVector))) : this.jru = i.DotProduct(e), this.oY1[this.Nru]?.D_K2_SetActorLocationAndRotation(i.ToUeVector(), this.Hte.ActorRotation, !1, void 0, !1)
  }
  Wru() {
    this.Fru[this.Nru]?.SetCollisionEnabled(0), this.Nru ^= 1, this.Fru[this.Nru]?.SetCollisionEnabled(1)
  }
  OnTick(t) {
    this.rY1 && (Vector_1.Vector.DistSquared(this.Vru, this.Hte.FloorLocation) > SWITCH_DISTANCE_SQUARE && (this.Wru(), this._Y1(!0)), this.Hru >= Time_1.Time.Frame || (!this.Lie.HasTag(498191540) || FormationAttributeController_1.FormationAttributeController.GetValue(1) <= 0) && (this.sY1(!1), this.Hru = Time_1.Time.Frame + FRAME_INTERNAL))
  }
  OnEnd() {
    return this.BKr(), !0
  }
  OnClear() {
    for (const t of this.oY1) ActorSystem_1.ActorSystem.Put("OnClearWalkOnAir", t);
    return this.oY1.length = 0, !(this.Fru.length = 0)
  }
};
CharacterWalkOnAirComponent.lY1 = new UE.VectorDouble(BOX_LENGTH, BOX_LENGTH, 1), CharacterWalkOnAirComponent = CharacterWalkOnAirComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(80)], CharacterWalkOnAirComponent), exports.CharacterWalkOnAirComponent = CharacterWalkOnAirComponent;
//# sourceMappingURL=CharacterWalkOnAirComponent.js.map