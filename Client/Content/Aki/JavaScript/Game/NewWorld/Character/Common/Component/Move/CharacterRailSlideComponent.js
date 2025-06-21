"use strict";
var CharacterRailSlideComponent_1, __decorate = this && this.__decorate || function(t, i, e, s) {
  var h, a = arguments.length,
    o = a < 3 ? i : null === s ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, i, e, s);
  else
    for (var r = t.length - 1; 0 <= r; r--)(h = t[r]) && (o = (a < 3 ? h(o) : 3 < a ? h(i, e, o) : h(i, e)) || o);
  return 3 < a && o && Object.defineProperty(i, e, o), o
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterRailSlideComponent = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  SplineCurve_1 = require("../../../../../../Core/Utils/Curve/SplineCurve"),
  MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  InputEnums_1 = require("../../../../../Input/InputEnums"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
  GravityUtils_1 = require("../../../../../Utils/GravityUtils"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./CustomMovementDefine"),
  keepRailSlideCue = [640018015, 640018016],
  leaveRailSlideCue = [640018019, 640018020],
  landRailSlideCue = [640018017, 640018018],
  PROFILE_KEY = "RailSlide",
  DEBUG_RADIUS = 20,
  DEBUG_DURATION = 15,
  DEBUG_SEGMENTS = 10,
  TEN_MS = 166,
  MS_TO_SECOUND = .001,
  SECOUND_TO_MS = 1e3,
  CENTIMETER_TO_METER = .01,
  GRAVITY_ACCELERATION_RECIPROCAL = 1 / 980,
  ROTATOR_SPEED = .05,
  ROTATOR_SPEED_CHANGE_RATE = .05,
  HEIGHT_LIMIT = 800,
  CHECK_RAIL_INTERNAL_TIME = 100,
  KATIXIYA_ROLE_ID = 1409,
  MIN_ENTER_RAIL_DISTANCE = 100;
class RailSlideParams {
  constructor(i, t) {
    if (this.InitSpeed = 700, this.BaseTargetSpeed = 1e3, this.BaseAcceleration = 300, this.AccelerationForUp = -300, this.TargetSpeedForUp = 700, this.AccelerationForDown = 300, this.TargetSpeedForDown = 1e3, this.AccelerationAngle = 20, this.MaxLandSpeed = 2e3, this.MinLandSpeed = 500, this.BaseJumpHeight = 50, this.BaseJumpDistanceRate = .5, this.MaxJumpDistance = 1e3, this.MaxJumpHeight = 300, this.JumpAcceleration = -1e3, this.TargetSpeedForJump = 300, this.AllTimeForJump = 800, this.JumpBlendTime = 200, this.LandBlendTime = 0, this.LeaningBlendAlpha = .1, this.MaxLeaningAngle = 45, this.LimitInputAngle = 5, this.ChangeRailCooldownTime = 1e3, this.ChangeRailDistance = 1e3, this.ChangeRailHeight = 400, this.ChangeRailSpeed = 1e3, this.StartJumpSpeed = 1e3, this.InterruptSkillList = [], this.MoveCurve = void 0, this.TagList = [], this.DebugDraw = !1, i) {
      this.InitSpeed = i.初始速度, this.BaseTargetSpeed = i.基础目标速度, this.BaseAcceleration = i.基础加速度, this.AccelerationForUp = i.上坡加速度, this.AccelerationForDown = i.下坡加速度, this.TargetSpeedForUp = i.上坡目标速度, this.TargetSpeedForDown = i.下坡目标速度, this.AccelerationAngle = i.最大加速度角度, this.MaxLandSpeed = i.落地最大速度, this.MinLandSpeed = i.落地最小速度, this.BaseJumpDistanceRate = i.基础跳远倍率, this.StartJumpSpeed = i.初始进入轨道速度, this.BaseJumpHeight = i.基础跳跃高度, this.MaxJumpDistance = i.最大跳跃距离, this.MaxJumpHeight = i.最大跳跃高度, this.JumpAcceleration = t ? i["起跳加速度-卡提西亚"] : i.起跳加速度, this.TargetSpeedForJump = i.起跳目标速度, this.AllTimeForJump = i.跳跃空中总时长, this.JumpBlendTime = t ? i["起跳时长-卡提西亚"] : i.起跳时长, this.LandBlendTime = t ? i["落地时长-卡提西亚"] : 0, this.LeaningBlendAlpha = i.倾斜输入插值, this.MaxLeaningAngle = i.最大倾斜角度, this.LimitInputAngle = i.限制输入角度, this.ChangeRailCooldownTime = i.切换轨道CD, this.ChangeRailDistance = i.切换轨道水平距离, this.ChangeRailHeight = i.切换轨道垂直距离, this.ChangeRailSpeed = i.切换轨道基速度, this.MoveCurve = (t ? i["位移曲线-卡提西亚"] : i.位移曲线).FloatCurve, this.DebugDraw = i.DebugDraw;
      for (let t = 0; t < i.打断技能列表.Num(); t++) this.InterruptSkillList.push(i.打断技能列表.Get(t));
      for (let t = 0; t < i.期间Tag.GameplayTags.Num(); t++) this.TagList.push(i.期间Tag.GameplayTags.Get(t).TagId)
    }
  }
}
class RailData {
  constructor(t, i, e, s, h) {
    this.Spline = void 0, this.Config = void 0, this.Params = void 0, this.InAir = !1, this.AllowInputChangeRail = !1, this.Speed = 0, this.RailInfo = void 0, this.InChangeJumpState = !1, this.LastDistance = 0, this.EndDistance = 0, this.RotatorSpeed = 1, this.Config = t, this.Spline = i, this.LastDistance = e, this.EndDistance = s, this.Params = h, this.InAir = 2 === h.RailType || 1 === h.RailType && 0 !== t.LandBlendTime
  }
  CheckEnd() {
    return this.LastDistance >= this.EndDistance
  }
  GetRate(t, i = !0) {
    var e = this.Spline.GetSplineLength();
    if (2 === this.Params.RailType) {
      var s = this.Params,
        h = Math.min(t * MS_TO_SECOUND + s.JumpTime, s.AllTime);
      const a = this.Config.MoveCurve.GetFloatValue(h / s.AllTime);
      return i && (s.JumpTime = h, s.LastRate = Math.min(1, a), this.LastDistance = e * a), a
    }
    if (this.LastDistance >= e) return 1;
    h = this.Speed * t * MS_TO_SECOUND;
    const a = Math.min((this.LastDistance + h) / e, 1);
    return i && (this.LastDistance += h), a
  }
  GetHeightOffset() {
    var t, i, e;
    return 2 === this.Params.RailType ? (i = (t = this.Params).ProjectileA, e = t.ProjectileB, e = i * (i = t.LastRate * t.Length) * i + e * i, CharacterRailSlideComponent.DebugLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("AI", 42, "[RailSlide] 抛物线偏移", ["height", e], ["Length", t.Length], ["rate", t.LastRate]), e) : 0
  }
  SetRailInfo(t, i, e) {
    if (this.RailInfo = t, this.Speed = i, 0 === this.Params.RailType && (this.RotatorSpeed = e?.RotatorSpeed ?? 1), 0 === this.Params.RailType && t.ExchangeRailConfigs)
      for (const s of t.ExchangeRailConfigs)
        if (s.NextRails)
          for (const h of s.NextRails) h.IsFallbackRail && (this.Params.DefaultNextRailId = h.TargetRailEntityId)
  }
  SetChangeJumpState() {
    this.InChangeJumpState = !0, this.InAir = !0
  }
  UpdateRotatorSpeed(t, i) {
    switch (this.Params.RailType) {
      case 0:
        this.RotatorSpeed = MathUtils_1.MathUtils.Lerp(this.RotatorSpeed, 1, ROTATOR_SPEED_CHANGE_RATE);
        break;
      case 2:
        1 === this.RotatorSpeed && (0 !== this.Config.ChangeRailSpeed ? (s = this.Params.AllTime * SECOUND_TO_MS, e = Math.max(Math.abs(i.Pitch - t.Pitch), Math.abs(i.Yaw - t.Yaw), Math.abs(i.Roll - t.Roll)), this.RotatorSpeed = Math.max(e / s, ROTATOR_SPEED)) : this.RotatorSpeed = ROTATOR_SPEED);
        break;
      case 1:
        var e, s;
        1 === this.RotatorSpeed && (0 !== this.Config.ChangeRailSpeed ? (e = this.Spline.GetSplineLength() / this.Config.ChangeRailSpeed * SECOUND_TO_MS, s = Math.max(Math.abs(i.Pitch - t.Pitch), Math.abs(i.Yaw - t.Yaw), Math.abs(i.Roll - t.Roll)), this.RotatorSpeed = Math.max(s / e, ROTATOR_SPEED)) : this.RotatorSpeed = ROTATOR_SPEED)
    }
    CharacterRailSlideComponent.DebugLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("AI", 42, "[RailSlide] UpdateRotatorSpeed", ["RotatorSpeed", this.RotatorSpeed], ["cur", t], ["rot", i])
  }
  GetCurrentTriggerKey() {
    if (0 === this.Params?.RailType && this.RailInfo?.ExchangeRailConfigs)
      for (const t of this.RailInfo.ExchangeRailConfigs)
        if (t.NextRails)
          for (const i of t.NextRails)
            if (i.TargetRailEntityId === this.Params.DefaultNextRailId) return i.TriggerKey
  }
  GetAccelerationSpeed(t, i) {
    return this.InChangeJumpState ? this.Config.JumpAcceleration : t < 1 ? this.Config.BaseAcceleration : 0 < i ? this.Config.AccelerationForUp : this.Config.AccelerationForDown
  }
  GetTargetSpeed(t, i) {
    return this.InChangeJumpState ? this.Config.TargetSpeedForJump : t < 1 ? this.RailInfo?.SlideSpeed ?? this.Config.BaseTargetSpeed : 0 < i ? this.RailInfo?.UpSpeed ?? this.Config.TargetSpeedForUp : this.RailInfo?.DownSpeed ?? this.Config.TargetSpeedForDown
  }
}
let CharacterRailSlideComponent = CharacterRailSlideComponent_1 = class CharacterRailSlideComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.Hte = void 0, this.Lie = void 0, this.mBe = void 0, this.oRe = void 0, this.VJ1 = void 0, this.zT1 = !1, this.eru = !1, this.JT1 = !1, this.ZT1 = !1, this.Z81 = void 0, this.ib1 = void 0, this.rb1 = new Map, this.Wnr = Vector_1.Vector.Create(), this.Lz = Vector_1.Vector.Create(), this.Tz = Vector_1.Vector.Create(), this.fHo = Vector_1.Vector.Create(), this.pHo = Vector_1.Vector.Create(), this.vHo = Vector_1.Vector.Create(), this.Z_e = Transform_1.Transform.Create(), this.az = Quat_1.Quat.Create(), this.Gue = Rotator_1.Rotator.Create(), this.EPn = Rotator_1.Rotator.Create(), this.ob1 = 0, this.thu = 0, this.W71 = 0, this.d_u = new Map, this.ero = (t, i, e) => {
      var s = this.Z81?.InterruptSkillList.includes(i);
      t === this.Entity.Id && s ? this.tru("使用了技能" + i) : s || Log_1.Log.CheckDebug() && Log_1.Log.Debug("AI", 42, "[RailSlide] 使用了技能，但不在打断列表中，不打断滑轨，如有需要请手动添加到BP_RailSlideConfig", ["SkillId", i])
    }, this.OnTeleportStart = () => {
      this.tru("触发传送")
    }, this.hJl = () => {
      this.tru("角色死亡")
    }, this.jJ1 = !1, this.HJ1 = 0
  }
  static get Dependencies() {
    return [3, 178, 175]
  }
  OnStart() {
    return this.Hte = this.Entity.GetComponent(3), this.Lie = this.Entity.GetComponent(205), this.mBe = this.Entity.GetComponent(175), this.oRe = this.Entity.GetComponent(177), this.VJ1 = this.Entity.GetComponent(225), !0
  }
  OnEnd() {
    return this.lb1(), !0
  }
  OnTick(t) {
    0 !== t && this.zT1 && (this.eru || (t = Math.min(t, TEN_MS), this.sRc(t), this.sb1(t), this.Wnr.DeepCopy(this.Hte.ActorLocationProxy)), this.eru ? (Vector_1.Vector.VectorPlaneProject(this.Hte.ActorForwardProxy, this.Hte.ActorGravityDirectProxy, this.Lz), this.Hte?.SetInputDirect(this.Lz), this.Hte?.SetInputFacing(this.Lz), this.lb1()) : this.Hte?.ClearInput(!0, !1))
  }
  StartRailSlide(t, i) {
    if (this.zT1) Log_1.Log.CheckWarn() && Log_1.Log.Warn("Movement", 42, "[RailSlide] 重复触发进入轨道滑行");
    else if (this.Z81 = this.ej1(i), this.Z81 && (this.ab1(this.HX1(t), "进入轨道滑行"), this.ib1)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, "CharacterRailSlideComponent.StartRailSlide"), this.eru = !1, this.zT1 = !0, this.ob1 = 0, this.mlu(), this.Lie.AddTag(-1697149502), this.Entity.GetComponent(45)?.SetLockedRotation(!0), this.Wnr.DeepCopy(this.Hte.ActorLocationProxy), Log_1.Log.CheckInfo() && Log_1.Log.Info("Movement", 42, "[RailSlide] 开始轨道滑行");
      i = this.Entity?.GetComponent(39);
      i && i.StopAllSkills("开始轨道移动"), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.ero), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.OnTeleportStart), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.hJl);
      for (const e of this.Z81.TagList) this.Lie?.AddTag(e)
    }
  }
  tru(t) {
    this.eru = !0, Log_1.Log.CheckInfo() && Log_1.Log.Info("Movement", 42, "[RailSlide] 退出轨道滑行", ["Context", t])
  }
  lb1() {
    if (this.zT1) {
      if (this.$J1(!0), this.Z81?.TagList)
        for (const t of this.Z81.TagList) this.Lie?.RemoveTag(t);
      this.Z81 = void 0, this.ib1 = void 0, this.JT1 = !1, this.zT1 = !1, this.ob1 = 0, this.mlu(), this.Lie?.RemoveTag(-1697149502), this.Entity?.GetComponent(45)?.SetLockedRotation(!1), this.Lie?.RemoveTag(-1254507003), this.Hte && this.mBe?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.RailSlide && (this.IJr() ? (this.Hte?.Actor.KuroSetMovementMode({
        Mode: 1,
        Context: "[CharacterRailSlideComponent.ExitSplineRailSlide] Walking"
      }), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 退出轨道滑行，Walking")) : (this.Hte?.Actor.KuroSetMovementMode({
        Mode: 3,
        Context: "[CharacterRailSlideComponent.ExitSplineRailSlide] Falling"
      }), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 退出轨道滑行，Falling"))), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.ero), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.OnTeleportStart), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.hJl), this.eru = !1
    }
  }
  _b1() {
    var t;
    this.JT1 || (this.Z81?.LandBlendTime || 0 === this.ib1?.Params?.RailType) && (this.Lie.AddTag(-1254507003), this.Hte?.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RAIL_SLIDE,
      Context: "[CharacterRailSlideComponent.EnterSplineRailSlide]"
    }), this.JT1 = !0, Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入轨道"), this.ib1 && (!this.ZT1 && this.ib1.InAir ? (t = this.ib1.GetCurrentTriggerKey(), this.Lie.AddTag(-814414577), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 滑轨跳跃", ["Key", t]), this.ZT1 = !0, "Right" !== t || this.Lie?.HasTag(-1810035083) || this.Lie.AddTag(-1810035083)) : this.ZT1 && !this.ib1.InAir && (this.Lie.RemoveTag(-814414577), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除滑轨跳跃"), this.ZT1 = !1, this.Lie?.HasTag(-1810035083)) && this.Lie.RemoveTag(-1810035083))
  }
  HX1(t) {
    var i = this.ub1(t);
    if (i) {
      var e = this.cb1(i.RailSplineEntityId);
      if (e) {
        var s, h, e = e[0],
          a = Vector_1.Vector.Create(),
          e = this.db1(e, a);
        if (e) return s = e[0], h = e[1], e = e[2], h = {
          RailType: 1,
          JumpType: 1,
          ConnectionNextRail: t,
          ConnectionStartDistance: h,
          RotatorFixedDirection: a
        }, (a = new RailData(this.Z81, s, 0, s.GetSplineLength(), h)).SetRailInfo(i, e, this.ib1), a
      } else Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 42, "[RailSlide] 没有样条配置", ["splineId", i.RailSplineEntityId])
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 42, "[RailSlide] 没有轨道配置", ["railId", t])
  }
  $X1(t) {
    var i = this.ub1(t);
    if (i) {
      var e = this.cb1(i.RailSplineEntityId);
      if (e) {
        var s, e = e[0],
          h = MathUtils_1.MathUtils.Clamp(this.ib1?.Speed ?? i.SlideSpeed ?? this.Z81.InitSpeed, this.Z81.MinLandSpeed, this.Z81.MaxLandSpeed),
          a = Vector_1.Vector.Create(),
          e = this.mb1(e, h, a);
        if (e) return s = e[0], e = {
          RailType: 2,
          JumpType: 1,
          ConnectionNextRail: t,
          ConnectionStartDistance: e[1],
          RotatorFixedDirection: a,
          Length: (a = e[2]).Length,
          AllTime: a.AllTime,
          Height0: a.Height0,
          ProjectileA: a.ProjectileA,
          ProjectileB: a.ProjectileB,
          JumpTime: 0,
          LastRate: 0
        }, (a = new RailData(this.Z81, s, 0, s.GetSplineLength(), e)).SetRailInfo(i, h, this.ib1), a
      } else Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 42, "[RailSlide] 没有样条配置", ["splineId", i.RailSplineEntityId])
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 42, "[RailSlide] 没有轨道配置", ["railId", t])
  }
  fb1(t, i) {
    var e = this.ub1(t);
    if (e) {
      var s, h, a, o = this.cb1(e.RailSplineEntityId);
      if (o) return s = MathUtils_1.MathUtils.Clamp(this.ib1?.Speed ?? e.SlideSpeed ?? this.Z81.InitSpeed, this.Z81.MinLandSpeed, this.Z81.MaxLandSpeed), a = o[0], (h = new SplineCurve_1.SplineCurve).Init(a.SplineCurves.Position, a.SplineCurves.ReparamTable.Points, a.SplineCurves.Rotation, a.SplineCurves.Scale), o[1] && h.SetSplineTransform(o[1], !1), (a = new RailData(this.Z81, h, i, h.GetSplineLength(), {
        RailType: 0,
        JumpType: 2,
        DefaultNextRailId: 0
      })).SetRailInfo(e, s, this.ib1), a.AllowInputChangeRail = !0, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入样条轨道", ["railId", t], ["Speed", s], ["startDist", i]), this.m_u(e.RailSplineEntityId), a;
      Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 42, "[RailSlide] 没有样条配置", ["splineId", e.RailSplineEntityId])
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 42, "[RailSlide] 没有轨道配置", ["railId", t])
  }
  ab1(t, i) {
    0 === t?.Params?.RailType ? (this.WJ1(), this.$J1()) : 0 === this.ib1?.Params?.RailType && (this.QJ1(), this.$J1(!0)), this.ib1 = t, this.mlu(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] " + i)
  }
  gb1(t) {
    if (t && t.CheckEnd()) {
      if (2 === t.Params?.RailType || 1 === t.Params?.RailType) {
        var i = t.Params;
        if (this.ab1(this.fb1(i.ConnectionNextRail, i.ConnectionStartDistance), "无缝进入样条"), this.ib1) return
      }
      0 === t.Params?.RailType && t.Params.DefaultNextRailId && (this.ab1(this.$X1(t.Params.DefaultNextRailId), "切换轨道"), this.ib1) || (this.ib1 = void 0)
    }
  }
  sRc(t) {
    if (0 < this.ob1) this.ob1 -= t;
    else if (this.ib1?.AllowInputChangeRail && !this.ib1?.InChangeJumpState && this.ib1?.RailInfo?.ExchangeRailConfigs && 0 === this.ib1?.Params?.RailType) {
      var i = this.ib1.Params;
      if (Time_1.Time.Now - this.thu > CHECK_RAIL_INTERNAL_TIME) {
        this.thu = Time_1.Time.Now;
        for (const h of this.ib1.RailInfo.ExchangeRailConfigs) this.Gtu(h)
      }
      t = (ModelManager_1.ModelManager.InputModel?.GetAxisValues())?.get(InputEnums_1.EInputAxis.MoveRight);
      if (t && 0 !== t) {
        var e, s = 0 < t ? "Right" : "Left";
        for (const a of this.rb1)
          if (a[1][0] === s) return (e = this.ib1.LastDistance + this.Z81.JumpBlendTime * this.ib1.Speed * MS_TO_SECOUND) < this.ib1.Spline.GetSplineLength() && (this.ib1.EndDistance = e), void(i.DefaultNextRailId = a[0])
      }
    }
  }
  Gtu(t) {
    if (0 !== t.NextRails.length) {
      let i = 0;
      i = t.MaxExchangeDistance ? t.MaxExchangeDistance * t.MaxExchangeDistance : this.Z81.ChangeRailDistance * this.Z81.ChangeRailDistance;
      var e = t.MaxExchangeHigh ?? this.Z81.ChangeRailHeight;
      for (const _ of t.NextRails) {
        var s = _.TargetRailEntityId,
          h = this.ub1(s);
        if (h) {
          var a = this.cb1(h.RailSplineEntityId)?.[0];
          if (a) {
            this.Tz.DeepCopy(this.Hte.ActorLocationProxy), GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Tz, -this.Hte.ScaledHalfHeight);
            var o = a.D_FindInputKeyClosestToWorldLocationInGravity(this.Hte.ActorLocation, this.Hte.ActorGravityDirectProxy.ToUeVectorOld(), HEIGHT_LIMIT),
              r = (this.Lz.FromUeVector(a.D_GetLocationAtSplineInputKey(o, 1)), GravityUtils_1.GravityUtils.GetDistSquared2dForActor(this.Hte, this.Lz, this.Tz)),
              l = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Tz) - GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Lz),
              n = r < i && Math.abs(l) < e;
            let t = n;
            !n || (this.fHo.FromUeVector(a.D_GetDirectionAtSplineInputKey(o, 1)), o = a.GetDistanceAlongSplineAtSplineInputKey(o), o = this.Ntu(o, this.ib1.Speed, this.Tz, this.Lz, this.fHo, !0), t = this.Ftu(o[0], o[1], a)) || Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 轨道切入点在身后", ["NextRailId", s], ["SplineId", h.RailSplineEntityId]);
            o = this.rb1.has(s);
            !o && n && t && (this.flu(s, _.TriggerKey, !1, h.RailSplineEntityId), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入切换轨道范围内", ["NextRailId", s], ["SplineId", h.RailSplineEntityId], ["在范围内", n], ["目标点在前方", t], ["DistSquared", r], ["height", l], ["ExchangeDistanceSquared", i], ["ExchangeHeight", e]), !o || n && t || (this.flu(s, _.TriggerKey, !0, h.RailSplineEntityId), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 离开切换轨道范围", ["NextRailId", s], ["SplineId", h.RailSplineEntityId], ["在范围内", n], ["目标点在前方", t], ["DistSquared", r], ["height", l], ["ExchangeDistanceSquared", i], ["ExchangeHeight", e]))
          }
        }
      }
    }
  }
  mlu() {
    for (const t of this.rb1) "Left" === t[1][0] ? (this.Lie?.RemoveTag(1819726244), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除Tag能够左跳")) : (this.Lie?.RemoveTag(-1158672660), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除Tag能够右跳")), this.m_u(t[1][1]);
    this.rb1.clear()
  }
  flu(t, i, e, s) {
    e ? (this.m_u(s), this.rb1.delete(t), "Left" === i ? (this.Lie?.RemoveTag(1819726244), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除Tag能够左跳")) : (this.Lie?.RemoveTag(-1158672660), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除Tag能够右跳"))) : (this.rb1.set(t, [i, s]), "Left" === i ? (this.Lie?.AddTag(1819726244), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 添加Tag能够左跳")) : (this.Lie?.AddTag(-1158672660), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 添加Tag能够右跳")))
  }
  Ftu(t, i, e) {
    var s = e.GetSplineLength();
    if (s < t + i) return Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 切换轨道目标点离终点小于一个起跳距离", ["speed", this.ib1.Speed], ["offsetDist", t], ["splineLength", s]), !1;
    this.Tz.FromUeVector(e.D_GetLocationAtDistanceAlongSpline(t, 1)), this.fHo.FromUeVector(e.D_GetDirectionAtDistanceAlongSpline(t, 1));
    s = Math.min(this.ib1.Spline.GetSplineLength(), i + this.ib1.LastDistance);
    return this.ib1.Spline.GetLocationAtDistanceAlongSpline(s, 1, this.pHo), GlobalData_1.GlobalData.IsPlayInEditor && this.Z81.DebugDraw && (this.Fih(this.pHo.ToUeVector(), ColorUtils_1.ColorUtils.LinearYellow), this.Fih(this.Tz.ToUeVector(), ColorUtils_1.ColorUtils.LinearCyan)), this.Tz.SubtractionEqual(this.pHo), 0 < this.Tz.DotProduct(this.fHo)
  }
  Vtu(t, i, e, s, h, a, o) {
    var r = Vector_1.Vector.PointPlaneDist(a, h, this.Hte.ActorGravityDirectProxy),
      l = Math.max(r, this.Hte.ScaledHalfHeight),
      i = i * GRAVITY_ACCELERATION_RECIPROCAL,
      i = (Math.sqrt(i * i + 2 * l * GRAVITY_ACCELERATION_RECIPROCAL) - i) * t;
    let n = Math.max(MIN_ENTER_RAIL_DISTANCE, i) + e;
    return (n = 0 === e && (t = Vector_1.Vector.PointPlaneDist(h, a, o)) < 0 ? Math.max(n + t, 1) : n) >= s && (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Movement", 42, "[RailSlide] 进入轨道的点是最末尾的点", ["ActorLocation", h], ["ClosestPoint", a], ["HEIGHT_LIMIT", HEIGHT_LIMIT]), n = s - 1), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入轨道平抛参数", ["height", l], ["planeDist", r], ["startDist", e], ["enterDist", n], ["horizontalDist", i], ["Velocity", this.Hte.ActorVelocityProxy.Size()]), [n, i]
  }
  db1(t, i) {
    this.Lz.DeepCopy(this.Hte.ActorLocationProxy), GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, -this.Hte.ScaledHalfHeight);
    var e = new SplineCurve_1.InterpCurvePointVector(5),
      s = (e.InVal = 0, e.OutVal.DeepCopy(this.Lz), t.D_FindInputKeyClosestToWorldLocationInGravity(this.Lz.ToUeVector(), this.Hte.ActorGravityDirectProxy.ToUeVectorOld(), HEIGHT_LIMIT));
    this.pHo.FromUeVector(t.D_GetLocationAtSplineInputKey(s, 1)), this.Tz.FromUeVector(t.D_GetDirectionAtSplineInputKey(s, 1));
    let h = this.Z81.StartJumpSpeed;
    this.Tz.Normalize(), this.fHo.DeepCopy(this.Hte.ActorVelocityProxy);
    var a = this.fHo.DotProduct(this.Tz),
      a = (0 < a && (h = a), this.fHo.DotProduct(this.Hte.ActorGravityDirectProxy));
    let o = 0;
    0 < a && (o = a);
    var a = Math.sqrt(h * h + o * o),
      s = (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入平抛轨道", ["EnterSpeed", h], ["VerticalSpeed", o], ["nearestInput", s], ["ActorLocation", this.Hte.ActorLocation], ["ClosestPoint", this.pHo], ["HEIGHT_LIMIT", HEIGHT_LIMIT]), t.GetDistanceAlongSplineAtSplineInputKey(s)),
      [s, r] = this.Vtu(h, o, s, t.GetSplineLength(), this.Lz, this.pHo, this.Tz),
      l = (this.Lz.FromUeVector(t.D_GetLocationAtDistanceAlongSpline(s, 1)), new SplineCurve_1.InterpCurvePointVector(5)),
      t = (l.InVal = 1, l.OutVal.DeepCopy(this.Lz), this.Lz.FromUeVector(t.D_GetDirectionAtDistanceAlongSpline(s, 1)), this.Lz.Normalize(), i.DeepCopy(this.Lz), this.Lz.DeepCopy(this.Hte.ActorForwardProxy), this.Lz.Normalize(), this.Lz.MultiplyEqual(Math.max(1, r)), e.ArriveTangent.DeepCopy(this.Lz), e.LeaveTangent.DeepCopy(this.Lz), new SplineCurve_1.SplineCurve);
    return t.InitPoints([e, l]), GlobalData_1.GlobalData.IsPlayInEditor && this.Z81.DebugDraw && this.Cb1(t), [t, s, a]
  }
  Ntu(t, i, e, s, h, a) {
    var o = this.Z81.JumpAcceleration,
      r = this.Z81.TargetSpeedForJump,
      l = Math.abs((r - i) / o),
      n = this.Z81.JumpBlendTime * MS_TO_SECOUND;
    let _ = 0,
      S = t;
    return n < l ? a && (_ = i * n + o * n * n * .5, S += _) : a && (_ = i * l + o * l * l * .5 + r * (n - l), S += _), S += r * this.Z81.AllTimeForJump * MS_TO_SECOUND * this.Z81.BaseJumpDistanceRate, 0 === t && (a = Vector_1.Vector.PointPlaneDist(e, s, h), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] GetOffsetRailDistance", ["horizontal", a], ["offsetDist", S], ["loc", e], ["nearest", s]), a < 0) && (S += a), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] GetOffsetRailDistance", ["s", _], ["v0", i], ["v1", r], ["t0", n], ["t1", l], ["a0", o]), [Math.max(MIN_ENTER_RAIL_DISTANCE, S), _]
  }
  mb1(t, i, e) {
    this.Tz.DeepCopy(this.Hte.ActorLocationProxy), GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Tz, -this.Hte.ScaledHalfHeight);
    var s = new SplineCurve_1.InterpCurvePointVector(0),
      h = (s.InVal = 0, s.OutVal.DeepCopy(this.Tz), t.D_FindInputKeyClosestToWorldLocationInGravity(this.Tz.ToUeVector(), this.Hte.ActorGravityDirectProxy.ToUeVectorOld(), HEIGHT_LIMIT)),
      a = t.GetDistanceAlongSplineAtSplineInputKey(h),
      h = (this.Lz.FromUeVector(t.D_GetLocationAtSplineInputKey(h, 1)), this.fHo.FromUeVector(t.D_GetDirectionAtSplineInputKey(h, 1)), Vector_1.Vector.Dist(this.Lz, this.Tz)),
      o = t.GetSplineLength();
    let r = this.Ntu(a, i, this.Tz, this.Lz, this.fHo, !1)[0];
    r >= o && (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Movement", 42, "[RailSlide] 进入轨道的点是最末尾的点", ["ActorLocation", this.Hte.ActorLocation], ["ClosestPoint", this.Lz], ["HEIGHT_LIMIT", HEIGHT_LIMIT]), r = o - 1);
    var o = Vector_1.Vector.PointPlaneDist(this.Tz, this.Lz, this.Hte.ActorGravityDirectProxy),
      l = (this.Lz.FromUeVector(t.D_GetLocationAtDistanceAlongSpline(r, 1)), new SplineCurve_1.InterpCurvePointVector(5)),
      t = (l.InVal = 1, GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, -o), l.OutVal.DeepCopy(this.Lz), this.Tz.FromUeVector(t.D_GetDirectionAtDistanceAlongSpline(r, 1)), this.Tz.Normalize(), e.DeepCopy(this.Tz), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入轨道抛物线参数", ["Speed", i], ["startDist", a], ["dist", h], ["offsetDist", r], ["height", o]), new SplineCurve_1.SplineCurve),
      e = (t.InitPoints([s, l]), GlobalData_1.GlobalData.IsPlayInEditor && this.Z81.DebugDraw && this.Cb1(t), o),
      i = Math.log10(Math.max(1, Math.min(this.Z81.MaxJumpDistance, h) * CENTIMETER_TO_METER)) * this.Z81.MaxJumpHeight + this.Z81.BaseJumpHeight + (0 < o ? o : 0),
      a = t.GetSplineLength(),
      s = a,
      l = Math.sqrt(i * (i - e)),
      h = 2 * (i + l) / s,
      o = -1 * (2 * i + 2 * l - e) / s / s,
      l = this.Z81.AllTimeForJump * MS_TO_SECOUND;
    return Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入抛物线轨道", ["h0", e], ["h1", i], ["d", s], ["a", o], ["b", h], ["splineLen", a], ["AllTime", l]), [t, r, {
      Length: a,
      Height0: e,
      AllTime: l,
      ProjectileA: o,
      ProjectileB: h
    }]
  }
  sb1(t) {
    var i, e, s, h;
    this.gb1(this.ib1), this.ib1 ? (this._b1(), e = (i = this.ib1).GetRate(t), s = i.Spline.GetSplineLength() * e, i.Spline.GetTransformAtDistanceAlongSpline(s, 1, this.Z_e), this.tj1(s), h = this.Z_e.GetLocation(), this.Lz.DeepCopy(h), this.Lz.SubtractionEqual(this.Hte.ActorLocationProxy), this.Lz.SizeSquared() < 1 || (GlobalData_1.GlobalData.IsPlayInEditor && this.Z81.DebugDraw && this.Fih(h.ToUeVector(), ColorUtils_1.ColorUtils.LinearWhite), this.az.FromUeQuat(this.Z_e.GetRotation()), this.Gue.DeepCopy(this.az.Rotator()), this.Q71(this.az), this.K71(t, this.Lz, this.az, s), i.Spline.GetDirectionAtDistanceAlongSpline(s, 1, this.Tz), this.Tz.IsNearlyZero() || this.ij1(t, this.Tz, this.Lz.Size()), this.Hte.AddActorWorldOffset(this.Lz.ToUeVector(), "TsAnimNotifyStateCurveMove沿样条移动.AddActorWorldOffset", !0), e < 1 && !this.Tz.IsNearlyZero() && !this.Gue.IsNearlyZero() && this.X71(this.Gue), this.Hte.ResetAllCachedTime(), GlobalData_1.GlobalData.IsPlayInEditor && this.Z81.DebugDraw && (this.Lz.AdditionEqual(this.Hte.ActorLocationProxy), this.Fih(this.Lz.ToUeVector(), ColorUtils_1.ColorUtils.LinearWhite)))) : this.tru("MoveToTargetAlongSpline 结束轨道滑行")
  }
  K71(t, i, e, s) {
    var h = this.ib1;
    switch (h.Params.JumpType) {
      case 0:
        this.Tz.DeepCopy(Vector_1.Vector.UpVectorProxy), this.Tz.MultiplyEqual(this.Hte.ScaledHalfHeight), h.UpdateRotatorSpeed(this.Hte.ActorRotationProxy, this.Gue), e.RotateVector(this.Tz, this.Tz), e.FromUeQuat(this.Hte.ActorInitGravityRotationProxy.Quaternion()), e.RotateVector(this.Tz, this.Tz), i.AdditionEqual(this.Tz);
        break;
      case 2:
        this.ib1.Spline.GetDirectionAtDistanceAlongSpline(s, 1, this.vHo), this.Tz.DeepCopy(this.Hte.ActorGravityDirectProxy), this.Tz.UnaryNegation(this.Tz), Vector_1.Vector.CrossProduct(this.Tz, this.vHo, this.fHo), Vector_1.Vector.VectorPlaneProject(this.vHo, this.fHo, this.pHo), MathUtils_1.MathUtils.LookRotationForwardFirst(this.pHo, this.Tz, this.EPn), h.UpdateRotatorSpeed(this.Hte.ActorRotationProxy, this.EPn), MathUtils_1.MathUtils.RotatorInterpConstantTo(this.Hte.ActorRotationProxy, this.EPn, t, this.ib1.RotatorSpeed, this.Gue), this.Tz.DeepCopy(Vector_1.Vector.UpVectorProxy), this.Tz.MultiplyEqual(this.Hte.ScaledHalfHeight), this.Gue.Quaternion(this.az), this.az.RotateVector(this.Tz, this.Tz), this.az.FromUeQuat(this.Hte.ActorInitGravityRotationProxy.Quaternion()), this.az.RotateVector(this.Tz, this.Tz), i.AdditionEqual(this.Tz);
        break;
      case 1:
        var a = h.Params;
        a.RotatorFixedDirection && !a.RotatorFixedDirection.IsNearlyZero() && (this.Tz.DeepCopy(this.Hte.ActorGravityDirectProxy), this.Tz.UnaryNegation(this.Tz), MathUtils_1.MathUtils.LookRotationForwardFirst(a.RotatorFixedDirection, this.Tz, this.EPn), h.UpdateRotatorSpeed(this.Hte.ActorRotationProxy, this.EPn), MathUtils_1.MathUtils.RotatorInterpConstantTo(this.Hte.ActorRotationProxy, this.EPn, t, this.ib1.RotatorSpeed, this.Gue), this.Tz.DeepCopy(Vector_1.Vector.UpVectorProxy), this.Tz.MultiplyEqual(this.Hte.ScaledHalfHeight), this.Gue.Quaternion(this.az), this.az.RotateVector(this.Tz, this.Tz), this.az.FromUeQuat(this.Hte.ActorInitGravityRotationProxy.Quaternion()), this.az.RotateVector(this.Tz, this.Tz), (a = this.ib1.GetHeightOffset()) && GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Tz, a), i.AdditionEqual(this.Tz))
    }
  }
  X71(t) {
    var i = this.ib1;
    switch (i.Params.JumpType) {
      case 0:
      case 2:
        this.Hte.SetActorRotation(t.ToUeRotator(), "RailSlide.TangentRotator", !1);
        break;
      case 1:
        var e = i.Params;
        e.RotatorFixedDirection && !e.RotatorFixedDirection.IsNearlyZero() && this.Hte.SetActorRotation(t.ToUeRotator(), "RailSlide.RotatorFixedDirection", !1)
    }
  }
  Q71(t) {
    let i = 0;
    0 === this.ib1.Params.RailType && (this.fHo.DeepCopy(this.Hte.ActorGravityDirectProxy), this.fHo.UnaryNegation(this.fHo), t.RotateVector(this.fHo, this.fHo), (i = Math.acos(this.Hte.ActorUpProxy.DotProduct(this.fHo)) * MathCommon_1.MathCommon.RadToDeg % MathCommon_1.MathCommon.FlatAngle) > this.Z81.LimitInputAngle ? i *= 0 < this.Hte.ActorRightProxy.DotProduct(this.fHo) ? 1 : -1 : (t = ModelManager_1.ModelManager.InputModel?.GetAxisValues()) && (t = t.get(InputEnums_1.EInputAxis.MoveRight)) && (i = t * this.Z81.MaxLeaningAngle)), this.W71 = MathUtils_1.MathUtils.Lerp(this.W71, i, this.Z81.LeaningBlendAlpha);
    t = this.oRe?.MainAnimInstance;
    t && (t.SlideMix = MathUtils_1.MathUtils.RangeClamp(this.W71, -this.Z81.MaxLeaningAngle, this.Z81.MaxLeaningAngle, -1, 1))
  }
  tj1(t) {
    if (this.ib1) switch (this.ib1.Params.RailType) {
      case 0:
        var i = (this.ib1.EndDistance - t) / this.ib1.Speed * SECOUND_TO_MS;
        !this.ib1.InAir && i < this.Z81.JumpBlendTime && this.ib1.Params.DefaultNextRailId && (this.ib1.SetChangeJumpState(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("AI", 42, "[RailSlide] 提前切换起跳状态", ["remainingTime", i], ["JumpBlendTime", this.Z81.JumpBlendTime], ["cd", this.Z81.ChangeRailCooldownTime]), this.mlu(), this.ob1 = this.Z81.ChangeRailCooldownTime);
        break;
      case 2:
        i = this.ib1.Params, i = (i.AllTime - i.JumpTime) * SECOUND_TO_MS;
        this.Z81.LandBlendTime && this.ib1.InAir && i < this.Z81.LandBlendTime && (this.ib1.InAir = !1, Log_1.Log.CheckDebug()) && Log_1.Log.Debug("AI", 42, "[RailSlide] 提前切换抛物线落地状态", ["remainingTime", i], ["JumpBlendTime", this.Z81.LandBlendTime]);
        break;
      case 1:
        i = (this.ib1.EndDistance - t) / this.ib1.Speed * SECOUND_TO_MS;
        this.Z81.LandBlendTime && this.ib1.InAir && i < this.Z81.LandBlendTime && (this.ib1.InAir = !1, Log_1.Log.CheckDebug()) && Log_1.Log.Debug("AI", 42, "[RailSlide] 提前切换落地状态", ["remainingTime", i], ["JumpBlendTime", this.Z81.LandBlendTime])
    }
  }
  ij1(t, i, e) {
    var s, h, a, o;
    2 === this.ib1.Params.RailType ? this.ib1.Speed = e / (t * MS_TO_SECOUND) : (e = this.Hte.MoveComp.GravityUp, e = Vector_1.Vector.DotProduct(i, e), s = Math.acos(MathUtils_1.MathUtils.Clamp(e, -1, 1)) * MathUtils_1.MathUtils.RadToDeg, h = Math.abs(s - 90), a = Math.min(h, this.Z81.AccelerationAngle) / this.Z81.AccelerationAngle, o = this.ib1.GetAccelerationSpeed(h, e), e = this.ib1.GetTargetSpeed(h, e), t = t * Math.min(Math.abs(o), Math.abs(e)) * MS_TO_SECOUND * (1 < h ? a : 1), Math.abs(this.ib1.Speed - e) > t ? 0 < this.ib1.Speed - e ? this.ib1.Speed += -t : this.ib1.Speed += t : this.ib1.Speed = e, GlobalData_1.GlobalData.IsPlayInEditor && CharacterRailSlideComponent_1.DebugLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("AI", 42, "[RailSlide] DeltaSpeed", ["Speed", this.ib1.Speed], ["factor", s], ["accSpeed", o], ["targetSpeed", e], ["deltaSpeed", t], ["moveVec", i]))
  }
  ub1(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (t) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "SlideRailComponent");
      if (t) return t
    }
  }
  cb1(t) {
    if (this.d_u.has(t)) return this.d_u.get(t);
    var i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (i) {
      var e = (0, IComponent_1.getComponent)(i.ComponentsData, "SplineComponent");
      if (e && e.Option.Points) {
        if (!(e.Option.Points.length < 2)) return this.d_u.set(t, [ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(t, this.Entity.Id, 1), i.Transform]), Log_1.Log.CheckDebug() && Log_1.Log.Debug("AI", 42, "[RailSlide] LoadAndGetSplineAsset", ["SplineEntityId", t]), this.d_u.get(t);
        Log_1.Log.CheckError() && Log_1.Log.Error("AI", 42, "[RailSlide] 群组巡逻样条点数量小于2", ["SplineEntityId", t])
      } else Log_1.Log.CheckError() && Log_1.Log.Error("AI", 42, "[RailSlide] 无法找到样条组件配置", ["SplineEntityId", t])
    } else Log_1.Log.CheckError() && Log_1.Log.Error("AI", 42, "[RailSlide] 无法找到SplineEntityData", ["SplineEntityId", t])
  }
  m_u(t) {
    this.d_u.has(t) && (this.d_u.delete(t), ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(t, this.Entity.Id, 1), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("AI", 42, "[RailSlide] ReleaseSplineAsset", ["SplineEntityId", t])
  }
  IJr() {
    var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    t.WorldContextObject = this.Hte.Actor, t.Radius = this.Hte.ScaledRadius, this.Lz.DeepCopy(this.Hte.ActorLocationProxy), TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Lz), this.Tz.DeepCopy(this.Hte.ActorLocationProxy), GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Tz, -this.Hte.ScaledHalfHeight), TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Tz), t.ActorsToIgnore.Empty();
    for (const i of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) t.ActorsToIgnore.Add(i);
    return TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, t, PROFILE_KEY, PROFILE_KEY) ? t.HitResult : void 0
  }
  Cb1(i) {
    for (let t = 0; t < i.GetSplineLength(); t += DEBUG_RADIUS) i.GetLocationAtDistanceAlongSpline(t, 1, this.Lz), this.Fih(this.Lz.ToUeVector(), ColorUtils_1.ColorUtils.LinearYellow)
  }
  Fih(t, i, e = DEBUG_RADIUS, s = DEBUG_DURATION) {
    UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, t, e, DEBUG_SEGMENTS, i, s)
  }
  ej1(t) {
    var i, e = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_RailSlideConfig_C);
    if (e?.IsValid()) return i = this.Hte.CreatureData.GetPbDataId(), i = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(i), this.jJ1 = i === KATIXIYA_ROLE_ID, new RailSlideParams(e, this.jJ1);
    Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 42, "获取滑轨参数DA失败", ["DaPath", t], ["PbDataId", this.Hte?.CreatureData.GetPbDataId()])
  }
  $J1(t = !1) {
    this.VJ1 && (t ? this.HJ1 && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除滑轨移动特效Buff", ["Handle", this.HJ1], ["ID", keepRailSlideCue[this.jJ1 ? 1 : 0]]), this.VJ1.RemoveCueByHandle(this.HJ1), this.HJ1 = 0) : (this.HJ1 = this.VJ1.AddCue(keepRailSlideCue[this.jJ1 ? 1 : 0]), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 添加滑轨移动特效Buff", ["Handle", this.HJ1], ["ID", keepRailSlideCue[this.jJ1 ? 1 : 0]])))
  }
  WJ1() {
    this.VJ1 && (this.VJ1.AddCue(landRailSlideCue[this.jJ1 ? 1 : 0], {
      Instant: !0
    }), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Movement", 42, "[RailSlide] 触发滑轨落地特效Buff", ["ID", landRailSlideCue[this.jJ1 ? 1 : 0]])
  }
  QJ1() {
    this.VJ1 && (this.VJ1.AddCue(leaveRailSlideCue[this.jJ1 ? 1 : 0], {
      Instant: !0
    }), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Movement", 42, "[RailSlide] 触发离开滑轨特效Buff", ["ID", leaveRailSlideCue[this.jJ1 ? 1 : 0]])
  }
};
CharacterRailSlideComponent.DebugLog = !1, CharacterRailSlideComponent = CharacterRailSlideComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(36)], CharacterRailSlideComponent), exports.CharacterRailSlideComponent = CharacterRailSlideComponent;
//# sourceMappingURL=CharacterRailSlideComponent.js.map