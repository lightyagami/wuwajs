"use strict";

var CharacterRailSlideComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var a = arguments.length;
  var o = a < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, e, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        o = (a < 3 ? h(o) : a > 3 ? h(i, e, o) : h(i, e)) || o;
      }
    }
  }
  if (a > 3 && o) {
    Object.defineProperty(i, e, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterRailSlideComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const SplineCurve_1 = require("../../../../../../Core/Utils/Curve/SplineCurve");
const MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const InputEnums_1 = require("../../../../../Input/InputEnums");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../../../Utils/ColorUtils");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./CustomMovementDefine");
const keepRailSlideCue = [640018015, 640018016];
const leaveRailSlideCue = [640018019, 640018020];
const landRailSlideCue = [640018017, 640018018];
const PROFILE_KEY = "RailSlide";
const DEBUG_RADIUS = 20;
const DEBUG_DURATION = 15;
const DEBUG_SEGMENTS = 10;
const TEN_MS = 166;
const MS_TO_SECOUND = 0.001;
const SECOUND_TO_MS = 1000;
const CENTIMETER_TO_METER = 0.01;
const GRAVITY_ACCELERATION_RECIPROCAL = 1 / 980;
const ROTATOR_SPEED = 0.05;
const ROTATOR_SPEED_CHANGE_RATE = 0.05;
const HEIGHT_LIMIT = 800;
const CHECK_RAIL_INTERNAL_TIME = 100;
const KATIXIYA_ROLE_ID = 1409;
const MIN_ENTER_RAIL_DISTANCE = 100;
class RailSlideParams {
  constructor(i, t) {
    this.InitSpeed = 700;
    this.BaseTargetSpeed = 1000;
    this.BaseAcceleration = 300;
    this.AccelerationForUp = -300;
    this.TargetSpeedForUp = 700;
    this.AccelerationForDown = 300;
    this.TargetSpeedForDown = 1000;
    this.AccelerationAngle = 20;
    this.MaxLandSpeed = 2000;
    this.MinLandSpeed = 500;
    this.BaseJumpHeight = 50;
    this.BaseJumpDistanceRate = 0.5;
    this.MaxJumpDistance = 1000;
    this.MaxJumpHeight = 300;
    this.JumpAcceleration = -1000;
    this.TargetSpeedForJump = 300;
    this.AllTimeForJump = 800;
    this.JumpBlendTime = 200;
    this.LandBlendTime = 0;
    this.LeaningBlendAlpha = 0.1;
    this.MaxLeaningAngle = 45;
    this.LimitInputAngle = 5;
    this.ChangeRailCooldownTime = 1000;
    this.ChangeRailDistance = 1000;
    this.ChangeRailHeight = 400;
    this.ChangeRailSpeed = 1000;
    this.StartJumpSpeed = 1000;
    this.InterruptSkillList = [];
    this.MoveCurve = undefined;
    this.TagList = [];
    this.DebugDraw = false;
    if (i) {
      this.InitSpeed = i.初始速度;
      this.BaseTargetSpeed = i.基础目标速度;
      this.BaseAcceleration = i.基础加速度;
      this.AccelerationForUp = i.上坡加速度;
      this.AccelerationForDown = i.下坡加速度;
      this.TargetSpeedForUp = i.上坡目标速度;
      this.TargetSpeedForDown = i.下坡目标速度;
      this.AccelerationAngle = i.最大加速度角度;
      this.MaxLandSpeed = i.落地最大速度;
      this.MinLandSpeed = i.落地最小速度;
      this.BaseJumpDistanceRate = i.基础跳远倍率;
      this.StartJumpSpeed = i.初始进入轨道速度;
      this.BaseJumpHeight = i.基础跳跃高度;
      this.MaxJumpDistance = i.最大跳跃距离;
      this.MaxJumpHeight = i.最大跳跃高度;
      this.JumpAcceleration = t ? i["起跳加速度-卡提西亚"] : i.起跳加速度;
      this.TargetSpeedForJump = i.起跳目标速度;
      this.AllTimeForJump = i.跳跃空中总时长;
      this.JumpBlendTime = t ? i["起跳时长-卡提西亚"] : i.起跳时长;
      this.LandBlendTime = t ? i["落地时长-卡提西亚"] : 0;
      this.LeaningBlendAlpha = i.倾斜输入插值;
      this.MaxLeaningAngle = i.最大倾斜角度;
      this.LimitInputAngle = i.限制输入角度;
      this.ChangeRailCooldownTime = i.切换轨道CD;
      this.ChangeRailDistance = i.切换轨道水平距离;
      this.ChangeRailHeight = i.切换轨道垂直距离;
      this.ChangeRailSpeed = i.切换轨道基速度;
      this.MoveCurve = (t ? i["位移曲线-卡提西亚"] : i.位移曲线).FloatCurve;
      this.DebugDraw = i.DebugDraw;
      for (let t = 0; t < i.打断技能列表.Num(); t++) {
        this.InterruptSkillList.push(i.打断技能列表.Get(t));
      }
      for (let t = 0; t < i.期间Tag.GameplayTags.Num(); t++) {
        this.TagList.push(i.期间Tag.GameplayTags.Get(t).TagId);
      }
    }
  }
}
class RailData {
  constructor(t, i, e, s, h) {
    this.Spline = undefined;
    this.Config = undefined;
    this.Params = undefined;
    this.InAir = false;
    this.AllowInputChangeRail = false;
    this.Speed = 0;
    this.RailInfo = undefined;
    this.InChangeJumpState = false;
    this.LastDistance = 0;
    this.EndDistance = 0;
    this.RotatorSpeed = 1;
    this.Config = t;
    this.Spline = i;
    this.LastDistance = e;
    this.EndDistance = s;
    this.Params = h;
    this.InAir = h.RailType === 2 || h.RailType === 1 && t.LandBlendTime !== 0;
  }
  CheckEnd() {
    return this.LastDistance >= this.EndDistance;
  }
  GetRate(t, i = true) {
    var e = this.Spline.GetSplineLength();
    if (this.Params.RailType === 2) {
      var s = this.Params;
      var h = Math.min(t * MS_TO_SECOUND + s.JumpTime, s.AllTime);
      const a = this.Config.MoveCurve.GetFloatValue(h / s.AllTime);
      if (i) {
        s.JumpTime = h;
        s.LastRate = Math.min(1, a);
        this.LastDistance = e * a;
      }
      return a;
    }
    if (this.LastDistance >= e) {
      return 1;
    }
    h = this.Speed * t * MS_TO_SECOUND;
    const a = Math.min((this.LastDistance + h) / e, 1);
    if (i) {
      this.LastDistance += h;
    }
    return a;
  }
  GetHeightOffset() {
    var t;
    var i;
    var e;
    if (this.Params.RailType === 2) {
      i = (t = this.Params).ProjectileA;
      e = t.ProjectileB;
      e = i * (i = t.LastRate * t.Length) * i + e * i;
      if (CharacterRailSlideComponent.DebugLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[RailSlide] 抛物线偏移", ["height", e], ["Length", t.Length], ["rate", t.LastRate]);
      }
      return e;
    } else {
      return 0;
    }
  }
  SetRailInfo(t, i, e) {
    this.RailInfo = t;
    this.Speed = i;
    if (this.Params.RailType === 0) {
      this.RotatorSpeed = e?.RotatorSpeed ?? 1;
    }
    if (this.Params.RailType === 0 && t.ExchangeRailConfigs) {
      for (const s of t.ExchangeRailConfigs) {
        if (s.NextRails) {
          for (const h of s.NextRails) {
            if (h.IsFallbackRail) {
              this.Params.DefaultNextRailId = h.TargetRailEntityId;
            }
          }
        }
      }
    }
  }
  SetChangeJumpState() {
    this.InChangeJumpState = true;
    this.InAir = true;
  }
  UpdateRotatorSpeed(t, i) {
    switch (this.Params.RailType) {
      case 0:
        this.RotatorSpeed = MathUtils_1.MathUtils.Lerp(this.RotatorSpeed, 1, ROTATOR_SPEED_CHANGE_RATE);
        break;
      case 2:
        if (this.RotatorSpeed === 1) {
          if (this.Config.ChangeRailSpeed !== 0) {
            s = this.Params.AllTime * SECOUND_TO_MS;
            e = Math.max(Math.abs(i.Pitch - t.Pitch), Math.abs(i.Yaw - t.Yaw), Math.abs(i.Roll - t.Roll));
            this.RotatorSpeed = Math.max(e / s, ROTATOR_SPEED);
          } else {
            this.RotatorSpeed = ROTATOR_SPEED;
          }
        }
        break;
      case 1:
        var e;
        var s;
        if (this.RotatorSpeed === 1) {
          if (this.Config.ChangeRailSpeed !== 0) {
            e = this.Spline.GetSplineLength() / this.Config.ChangeRailSpeed * SECOUND_TO_MS;
            s = Math.max(Math.abs(i.Pitch - t.Pitch), Math.abs(i.Yaw - t.Yaw), Math.abs(i.Roll - t.Roll));
            this.RotatorSpeed = Math.max(s / e, ROTATOR_SPEED);
          } else {
            this.RotatorSpeed = ROTATOR_SPEED;
          }
        }
    }
    if (CharacterRailSlideComponent.DebugLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "[RailSlide] UpdateRotatorSpeed", ["RotatorSpeed", this.RotatorSpeed], ["cur", t], ["rot", i]);
    }
  }
  GetCurrentTriggerKey() {
    if (this.Params?.RailType === 0 && this.RailInfo?.ExchangeRailConfigs) {
      for (const t of this.RailInfo.ExchangeRailConfigs) {
        if (t.NextRails) {
          for (const i of t.NextRails) {
            if (i.TargetRailEntityId === this.Params.DefaultNextRailId) {
              return i.TriggerKey;
            }
          }
        }
      }
    }
  }
  GetAccelerationSpeed(t, i) {
    if (this.InChangeJumpState) {
      return this.Config.JumpAcceleration;
    } else if (t < 1) {
      return this.Config.BaseAcceleration;
    } else if (i > 0) {
      return this.Config.AccelerationForUp;
    } else {
      return this.Config.AccelerationForDown;
    }
  }
  GetTargetSpeed(t, i) {
    if (this.InChangeJumpState) {
      return this.Config.TargetSpeedForJump;
    } else if (t < 1) {
      return this.RailInfo?.SlideSpeed ?? this.Config.BaseTargetSpeed;
    } else if (i > 0) {
      return this.RailInfo?.UpSpeed ?? this.Config.TargetSpeedForUp;
    } else {
      return this.RailInfo?.DownSpeed ?? this.Config.TargetSpeedForDown;
    }
  }
}
let CharacterRailSlideComponent = CharacterRailSlideComponent_1 = class CharacterRailSlideComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Lie = undefined;
    this.mBe = undefined;
    this.oRe = undefined;
    this.BZ1 = undefined;
    this.Tb1 = false;
    this.Csu = false;
    this.bb1 = false;
    this.Rb1 = false;
    this.Uj1 = undefined;
    this.Ab1 = undefined;
    this.Pb1 = new Map();
    this.Wnr = Vector_1.Vector.Create();
    this.Lz = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.fHo = Vector_1.Vector.Create();
    this.pHo = Vector_1.Vector.Create();
    this.vHo = Vector_1.Vector.Create();
    this.Z_e = Transform_1.Transform.Create();
    this.az = Quat_1.Quat.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.EPn = Rotator_1.Rotator.Create();
    this.xb1 = 0;
    this.xmu = 0;
    this.w91 = 0;
    this.h0u = new Map();
    this.ero = (t, i, e) => {
      var s = this.Uj1?.InterruptSkillList.includes(i);
      if (t === this.Entity.Id && s) {
        this.psu("使用了技能" + i);
      } else if (!s) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "[RailSlide] 使用了技能，但不在打断列表中，不打断滑轨，如有需要请手动添加到BP_RailSlideConfig", ["SkillId", i]);
        }
      }
    };
    this.OnTeleportStart = () => {
      this.psu("触发传送");
    };
    this.hJl = () => {
      this.psu("角色死亡");
    };
    this.kZ1 = false;
    this.OZ1 = 0;
  }
  static get Dependencies() {
    return [3, 178, 175];
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.Lie = this.Entity.GetComponent(205);
    this.mBe = this.Entity.GetComponent(175);
    this.oRe = this.Entity.GetComponent(177);
    this.BZ1 = this.Entity.GetComponent(225);
    return true;
  }
  OnEnd() {
    this.Ob1();
    return true;
  }
  OnTick(t) {
    if (t !== 0 && this.Tb1) {
      if (!this.Csu) {
        t = Math.min(t * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation, TEN_MS);
        this.sRc(t);
        this.Db1(t);
        this.Wnr.DeepCopy(this.Hte.ActorLocationProxy);
      }
      if (this.Csu) {
        Vector_1.Vector.VectorPlaneProject(this.Hte.ActorForwardProxy, this.Hte.ActorGravityDirectProxy, this.Lz);
        this.Hte?.SetInputDirect(this.Lz);
        this.Hte?.SetInputFacing(this.Lz);
        this.Ob1();
      } else {
        this.Hte?.ClearInput(true, false);
      }
    }
  }
  StartRailSlide(t, i) {
    if (this.Tb1) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 42, "[RailSlide] 重复触发进入轨道滑行");
      }
    } else {
      this.Uj1 = this.Bj1(i);
      if (this.Uj1 && (this.Bb1(this.OY1(t), "进入轨道滑行"), this.Ab1)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, "CharacterRailSlideComponent.StartRailSlide");
        this.Csu = false;
        this.Tb1 = true;
        this.xb1 = 0;
        this.ggu();
        this.Lie.AddTag(-1697149502);
        this.Entity.GetComponent(45)?.SetLockedRotation(true);
        this.Wnr.DeepCopy(this.Hte.ActorLocationProxy);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Movement", 42, "[RailSlide] 开始轨道滑行");
        }
        i = this.Entity?.GetComponent(39);
        if (i) {
          i.StopAllSkills("开始轨道移动");
        }
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.ero);
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.OnTeleportStart);
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.hJl);
        for (const e of this.Uj1.TagList) {
          this.Lie?.AddTag(e);
        }
      }
    }
  }
  psu(t) {
    this.Csu = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 42, "[RailSlide] 退出轨道滑行", ["Context", t]);
    }
  }
  Ob1() {
    if (this.Tb1) {
      this.qZ1(true);
      if (this.Uj1?.TagList) {
        for (const t of this.Uj1.TagList) {
          this.Lie?.RemoveTag(t);
        }
      }
      this.Uj1 = undefined;
      this.Ab1 = undefined;
      this.bb1 = false;
      this.Tb1 = false;
      this.xb1 = 0;
      this.ggu();
      this.Lie?.RemoveTag(-1697149502);
      this.Entity?.GetComponent(45)?.SetLockedRotation(false);
      this.Lie?.RemoveTag(-1254507003);
      if (this.Hte && this.mBe?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.RailSlide) {
        if (this.IJr()) {
          this.Hte?.Actor.KuroSetMovementMode({
            Mode: 1,
            Context: "[CharacterRailSlideComponent.ExitSplineRailSlide] Walking"
          });
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Movement", 42, "[RailSlide] 退出轨道滑行，Walking");
          }
        } else {
          this.Hte?.Actor.KuroSetMovementMode({
            Mode: 3,
            Context: "[CharacterRailSlideComponent.ExitSplineRailSlide] Falling"
          });
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Movement", 42, "[RailSlide] 退出轨道滑行，Falling");
          }
        }
      }
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.ero);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.OnTeleportStart);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.hJl);
      this.Csu = false;
    }
  }
  qb1() {
    var t;
    if (!this.bb1) {
      if ((this.Uj1?.LandBlendTime || this.Ab1?.Params?.RailType === 0) && (this.Lie.AddTag(-1254507003), this.Hte?.Actor.KuroSetMovementMode({
        Mode: 6,
        CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RAIL_SLIDE,
        Context: "[CharacterRailSlideComponent.EnterSplineRailSlide]"
      }), this.bb1 = true, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入轨道");
      }
    }
    if (this.Ab1) {
      if (!this.Rb1 && this.Ab1.InAir) {
        t = this.Ab1.GetCurrentTriggerKey();
        this.Lie.AddTag(-814414577);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "[RailSlide] 滑轨跳跃", ["Key", t]);
        }
        this.Rb1 = true;
        if (t === "Right" && !this.Lie?.HasTag(-1810035083)) {
          this.Lie.AddTag(-1810035083);
        }
      } else if (this.Rb1 && !this.Ab1.InAir && (this.Lie.RemoveTag(-814414577), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除滑轨跳跃"), this.Rb1 = false, this.Lie?.HasTag(-1810035083))) {
        this.Lie.RemoveTag(-1810035083);
      }
    }
  }
  OY1(t) {
    var i = this.Gb1(t);
    if (i) {
      var e = this.Fb1(i.RailSplineEntityId);
      if (e) {
        var s;
        var h;
        var e = e[0];
        var a = Vector_1.Vector.Create();
        var e = this.Nb1(e, a);
        if (e) {
          s = e[0];
          h = e[1];
          e = e[2];
          h = {
            RailType: 1,
            JumpType: 1,
            ConnectionNextRail: t,
            ConnectionStartDistance: h,
            RotatorFixedDirection: a
          };
          (a = new RailData(this.Uj1, s, 0, s.GetSplineLength(), h)).SetRailInfo(i, e, this.Ab1);
          return a;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 42, "[RailSlide] 没有样条配置", ["splineId", i.RailSplineEntityId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 42, "[RailSlide] 没有轨道配置", ["railId", t]);
    }
  }
  qY1(t) {
    var i = this.Gb1(t);
    if (i) {
      var e = this.Fb1(i.RailSplineEntityId);
      if (e) {
        var s;
        var e = e[0];
        var h = MathUtils_1.MathUtils.Clamp(this.Ab1?.Speed ?? i.SlideSpeed ?? this.Uj1.InitSpeed, this.Uj1.MinLandSpeed, this.Uj1.MaxLandSpeed);
        var a = Vector_1.Vector.Create();
        var e = this.Vb1(e, h, a);
        if (e) {
          s = e[0];
          e = {
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
          };
          (a = new RailData(this.Uj1, s, 0, s.GetSplineLength(), e)).SetRailInfo(i, h, this.Ab1);
          return a;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 42, "[RailSlide] 没有样条配置", ["splineId", i.RailSplineEntityId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 42, "[RailSlide] 没有轨道配置", ["railId", t]);
    }
  }
  jb1(t, i) {
    var e = this.Gb1(t);
    if (e) {
      var s;
      var h;
      var a;
      var o = this.Fb1(e.RailSplineEntityId);
      if (o) {
        s = MathUtils_1.MathUtils.Clamp(this.Ab1?.Speed ?? e.SlideSpeed ?? this.Uj1.InitSpeed, this.Uj1.MinLandSpeed, this.Uj1.MaxLandSpeed);
        a = o[0];
        (h = new SplineCurve_1.SplineCurve()).Init(a.SplineCurves.Position, a.SplineCurves.ReparamTable.Points, a.SplineCurves.Rotation, a.SplineCurves.Scale);
        if (o[1]) {
          h.SetSplineTransform(o[1], false);
        }
        (a = new RailData(this.Uj1, h, i, h.GetSplineLength(), {
          RailType: 0,
          JumpType: 2,
          DefaultNextRailId: 0
        })).SetRailInfo(e, s, this.Ab1);
        a.AllowInputChangeRail = true;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入样条轨道", ["railId", t], ["Speed", s], ["startDist", i]);
        }
        this.l0u(e.RailSplineEntityId);
        return a;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 42, "[RailSlide] 没有样条配置", ["splineId", e.RailSplineEntityId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 42, "[RailSlide] 没有轨道配置", ["railId", t]);
    }
  }
  Bb1(t, i) {
    if (t?.Params?.RailType === 0) {
      this.GZ1();
      this.qZ1();
    } else if (this.Ab1?.Params?.RailType === 0) {
      this.FZ1();
      this.qZ1(true);
    }
    this.Ab1 = t;
    this.ggu();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 42, "[RailSlide] " + i);
    }
  }
  Hb1(t) {
    if (t && t.CheckEnd()) {
      if (t.Params?.RailType === 2 || t.Params?.RailType === 1) {
        var i = t.Params;
        this.Bb1(this.jb1(i.ConnectionNextRail, i.ConnectionStartDistance), "无缝进入样条");
        if (this.Ab1) {
          return;
        }
      }
      if (t.Params?.RailType !== 0 || !t.Params.DefaultNextRailId || !(this.Bb1(this.qY1(t.Params.DefaultNextRailId), "切换轨道"), this.Ab1)) {
        this.Ab1 = undefined;
      }
    }
  }
  sRc(t) {
    if (this.xb1 > 0) {
      this.xb1 -= t;
    } else if (this.Ab1?.AllowInputChangeRail && !this.Ab1?.InChangeJumpState && this.Ab1?.RailInfo?.ExchangeRailConfigs && this.Ab1?.Params?.RailType === 0) {
      var i = this.Ab1.Params;
      if (Time_1.Time.Now - this.xmu > CHECK_RAIL_INTERNAL_TIME) {
        this.xmu = Time_1.Time.Now;
        for (const h of this.Ab1.RailInfo.ExchangeRailConfigs) {
          this.Tou(h);
        }
      }
      t = ModelManager_1.ModelManager.InputModel?.GetAxisValues()?.get(InputEnums_1.EInputAxis.MoveRight);
      if (t && t !== 0) {
        var e;
        var s = t > 0 ? "Right" : "Left";
        for (const a of this.Pb1) {
          if (a[1][0] === s) {
            if ((e = this.Ab1.LastDistance + this.Uj1.JumpBlendTime * this.Ab1.Speed * MS_TO_SECOUND) < this.Ab1.Spline.GetSplineLength()) {
              this.Ab1.EndDistance = e;
            }
            i.DefaultNextRailId = a[0];
            return;
          }
        }
      }
    }
  }
  Tou(t) {
    if (t.NextRails.length !== 0) {
      let i = 0;
      i = t.MaxExchangeDistance ? t.MaxExchangeDistance * t.MaxExchangeDistance : this.Uj1.ChangeRailDistance * this.Uj1.ChangeRailDistance;
      var e = t.MaxExchangeHigh ?? this.Uj1.ChangeRailHeight;
      for (const _ of t.NextRails) {
        var s = _.TargetRailEntityId;
        var h = this.Gb1(s);
        if (h) {
          var a = this.Fb1(h.RailSplineEntityId)?.[0];
          if (a) {
            this.Tz.DeepCopy(this.Hte.ActorLocationProxy);
            GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Tz, -this.Hte.ScaledHalfHeight);
            var o = a.D_FindInputKeyClosestToWorldLocationInGravity(this.Hte.ActorLocation, this.Hte.ActorGravityDirectProxy.ToUeVectorOld(), HEIGHT_LIMIT);
            this.Lz.FromUeVector(a.D_GetLocationAtSplineInputKey(o, 1));
            var r = GravityUtils_1.GravityUtils.GetDistSquared2dForActor(this.Hte, this.Lz, this.Tz);
            var l = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Tz) - GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Lz);
            var n = r < i && Math.abs(l) < e;
            let t = n;
            if (!!n && !(this.fHo.FromUeVector(a.D_GetDirectionAtSplineInputKey(o, 1)), o = a.GetDistanceAlongSplineAtSplineInputKey(o), o = this.Rou(o, this.Ab1.Speed, this.Tz, this.Lz, this.fHo, true), t = this.bou(o[0], o[1], a))) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Movement", 42, "[RailSlide] 轨道切入点在身后", ["NextRailId", s], ["SplineId", h.RailSplineEntityId]);
              }
            }
            o = this.Pb1.has(s);
            if (!o && n && t && (this.Cgu(s, _.TriggerKey, false, h.RailSplineEntityId), Log_1.Log.CheckDebug())) {
              Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入切换轨道范围内", ["NextRailId", s], ["SplineId", h.RailSplineEntityId], ["在范围内", n], ["目标点在前方", t], ["DistSquared", r], ["height", l], ["ExchangeDistanceSquared", i], ["ExchangeHeight", e]);
            }
            if (!!o && (!n || !t)) {
              this.Cgu(s, _.TriggerKey, true, h.RailSplineEntityId);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Movement", 42, "[RailSlide] 离开切换轨道范围", ["NextRailId", s], ["SplineId", h.RailSplineEntityId], ["在范围内", n], ["目标点在前方", t], ["DistSquared", r], ["height", l], ["ExchangeDistanceSquared", i], ["ExchangeHeight", e]);
              }
            }
          }
        }
      }
    }
  }
  ggu() {
    for (const t of this.Pb1) {
      if (t[1][0] === "Left") {
        this.Lie?.RemoveTag(1819726244);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除Tag能够左跳");
        }
      } else {
        this.Lie?.RemoveTag(-1158672660);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除Tag能够右跳");
        }
      }
      this.l0u(t[1][1]);
    }
    this.Pb1.clear();
  }
  Cgu(t, i, e, s) {
    if (e) {
      this.l0u(s);
      this.Pb1.delete(t);
      if (i === "Left") {
        this.Lie?.RemoveTag(1819726244);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除Tag能够左跳");
        }
      } else {
        this.Lie?.RemoveTag(-1158672660);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除Tag能够右跳");
        }
      }
    } else {
      this.Pb1.set(t, [i, s]);
      if (i === "Left") {
        this.Lie?.AddTag(1819726244);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "[RailSlide] 添加Tag能够左跳");
        }
      } else {
        this.Lie?.AddTag(-1158672660);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "[RailSlide] 添加Tag能够右跳");
        }
      }
    }
  }
  bou(t, i, e) {
    var s = e.GetSplineLength();
    if (s < t + i) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 42, "[RailSlide] 切换轨道目标点离终点小于一个起跳距离", ["speed", this.Ab1.Speed], ["offsetDist", t], ["splineLength", s]);
      }
      return false;
    }
    this.Tz.FromUeVector(e.D_GetLocationAtDistanceAlongSpline(t, 1));
    this.fHo.FromUeVector(e.D_GetDirectionAtDistanceAlongSpline(t, 1));
    s = Math.min(this.Ab1.Spline.GetSplineLength(), i + this.Ab1.LastDistance);
    this.Ab1.Spline.GetLocationAtDistanceAlongSpline(s, 1, this.pHo);
    if (GlobalData_1.GlobalData.IsPlayInEditor && this.Uj1.DebugDraw) {
      this.Fih(this.pHo.ToUeVector(), ColorUtils_1.ColorUtils.LinearYellow);
      this.Fih(this.Tz.ToUeVector(), ColorUtils_1.ColorUtils.LinearCyan);
    }
    this.Tz.SubtractionEqual(this.pHo);
    return this.Tz.DotProduct(this.fHo) > 0;
  }
  Lou(t, i, e, s, h, a, o) {
    var r = Vector_1.Vector.PointPlaneDist(a, h, this.Hte.ActorGravityDirectProxy);
    var l = Math.max(r, this.Hte.ScaledHalfHeight);
    var i = i * GRAVITY_ACCELERATION_RECIPROCAL;
    var i = (Math.sqrt(i * i + l * 2 * GRAVITY_ACCELERATION_RECIPROCAL) - i) * t;
    let n = Math.max(MIN_ENTER_RAIL_DISTANCE, i) + e;
    if ((n = e === 0 && (t = Vector_1.Vector.PointPlaneDist(h, a, o)) < 0 ? Math.max(n + t, 1) : n) >= s) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 42, "[RailSlide] 进入轨道的点是最末尾的点", ["ActorLocation", h], ["ClosestPoint", a], ["HEIGHT_LIMIT", HEIGHT_LIMIT]);
      }
      n = s - 1;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入轨道平抛参数", ["height", l], ["planeDist", r], ["startDist", e], ["enterDist", n], ["horizontalDist", i], ["Velocity", this.Hte.ActorVelocityProxy.Size()]);
    }
    return [n, i];
  }
  Nb1(t, i) {
    this.Lz.DeepCopy(this.Hte.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, -this.Hte.ScaledHalfHeight);
    var e = new SplineCurve_1.InterpCurvePointVector(5);
    e.InVal = 0;
    e.OutVal.DeepCopy(this.Lz);
    var s = t.D_FindInputKeyClosestToWorldLocationInGravity(this.Lz.ToUeVector(), this.Hte.ActorGravityDirectProxy.ToUeVectorOld(), HEIGHT_LIMIT);
    this.pHo.FromUeVector(t.D_GetLocationAtSplineInputKey(s, 1));
    this.Tz.FromUeVector(t.D_GetDirectionAtSplineInputKey(s, 1));
    let h = this.Uj1.StartJumpSpeed;
    this.Tz.Normalize();
    this.fHo.DeepCopy(this.Hte.ActorVelocityProxy);
    var a = this.fHo.DotProduct(this.Tz);
    if (a > 0) {
      h = a;
    }
    var a = this.fHo.DotProduct(this.Hte.ActorGravityDirectProxy);
    let o = 0;
    if (a > 0) {
      o = a;
    }
    var a = Math.sqrt(h * h + o * o);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入平抛轨道", ["EnterSpeed", h], ["VerticalSpeed", o], ["nearestInput", s], ["ActorLocation", this.Hte.ActorLocation], ["ClosestPoint", this.pHo], ["HEIGHT_LIMIT", HEIGHT_LIMIT]);
    }
    var s = t.GetDistanceAlongSplineAtSplineInputKey(s);
    var [s, r] = this.Lou(h, o, s, t.GetSplineLength(), this.Lz, this.pHo, this.Tz);
    this.Lz.FromUeVector(t.D_GetLocationAtDistanceAlongSpline(s, 1));
    var l = new SplineCurve_1.InterpCurvePointVector(5);
    l.InVal = 1;
    l.OutVal.DeepCopy(this.Lz);
    this.Lz.FromUeVector(t.D_GetDirectionAtDistanceAlongSpline(s, 1));
    this.Lz.Normalize();
    i.DeepCopy(this.Lz);
    this.Lz.DeepCopy(this.Hte.ActorForwardProxy);
    this.Lz.Normalize();
    this.Lz.MultiplyEqual(Math.max(1, r));
    e.ArriveTangent.DeepCopy(this.Lz);
    e.LeaveTangent.DeepCopy(this.Lz);
    var t = new SplineCurve_1.SplineCurve();
    t.InitPoints([e, l]);
    if (GlobalData_1.GlobalData.IsPlayInEditor && this.Uj1.DebugDraw) {
      this.$b1(t);
    }
    return [t, s, a];
  }
  Rou(t, i, e, s, h, a) {
    var o = this.Uj1.JumpAcceleration;
    var r = this.Uj1.TargetSpeedForJump;
    var l = Math.abs((r - i) / o);
    var n = this.Uj1.JumpBlendTime * MS_TO_SECOUND;
    let _ = 0;
    let S = t;
    if (n < l) {
      if (a) {
        _ = i * n + o * n * n * 0.5;
        S += _;
      }
    } else if (a) {
      _ = i * l + o * l * l * 0.5 + r * (n - l);
      S += _;
    }
    S += r * this.Uj1.AllTimeForJump * MS_TO_SECOUND * this.Uj1.BaseJumpDistanceRate;
    if (t === 0 && (a = Vector_1.Vector.PointPlaneDist(e, s, h), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "[RailSlide] GetOffsetRailDistance", ["horizontal", a], ["offsetDist", S], ["loc", e], ["nearest", s]), a < 0)) {
      S += a;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 42, "[RailSlide] GetOffsetRailDistance", ["s", _], ["v0", i], ["v1", r], ["t0", n], ["t1", l], ["a0", o]);
    }
    return [Math.max(MIN_ENTER_RAIL_DISTANCE, S), _];
  }
  Vb1(t, i, e) {
    this.Tz.DeepCopy(this.Hte.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Tz, -this.Hte.ScaledHalfHeight);
    var s = new SplineCurve_1.InterpCurvePointVector(0);
    s.InVal = 0;
    s.OutVal.DeepCopy(this.Tz);
    var h = t.D_FindInputKeyClosestToWorldLocationInGravity(this.Tz.ToUeVector(), this.Hte.ActorGravityDirectProxy.ToUeVectorOld(), HEIGHT_LIMIT);
    var a = t.GetDistanceAlongSplineAtSplineInputKey(h);
    this.Lz.FromUeVector(t.D_GetLocationAtSplineInputKey(h, 1));
    this.fHo.FromUeVector(t.D_GetDirectionAtSplineInputKey(h, 1));
    var h = Vector_1.Vector.Dist(this.Lz, this.Tz);
    var o = t.GetSplineLength();
    let r = this.Rou(a, i, this.Tz, this.Lz, this.fHo, false)[0];
    if (r >= o) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 42, "[RailSlide] 进入轨道的点是最末尾的点", ["ActorLocation", this.Hte.ActorLocation], ["ClosestPoint", this.Lz], ["HEIGHT_LIMIT", HEIGHT_LIMIT]);
      }
      r = o - 1;
    }
    var o = Vector_1.Vector.PointPlaneDist(this.Tz, this.Lz, this.Hte.ActorGravityDirectProxy);
    this.Lz.FromUeVector(t.D_GetLocationAtDistanceAlongSpline(r, 1));
    var l = new SplineCurve_1.InterpCurvePointVector(5);
    l.InVal = 1;
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, -o);
    l.OutVal.DeepCopy(this.Lz);
    this.Tz.FromUeVector(t.D_GetDirectionAtDistanceAlongSpline(r, 1));
    this.Tz.Normalize();
    e.DeepCopy(this.Tz);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入轨道抛物线参数", ["Speed", i], ["startDist", a], ["dist", h], ["offsetDist", r], ["height", o]);
    }
    var t = new SplineCurve_1.SplineCurve();
    t.InitPoints([s, l]);
    if (GlobalData_1.GlobalData.IsPlayInEditor && this.Uj1.DebugDraw) {
      this.$b1(t);
    }
    var e = o;
    var i = Math.log10(Math.max(1, Math.min(this.Uj1.MaxJumpDistance, h) * CENTIMETER_TO_METER)) * this.Uj1.MaxJumpHeight + this.Uj1.BaseJumpHeight + (o > 0 ? o : 0);
    var a = t.GetSplineLength();
    var s = a;
    var l = Math.sqrt(i * (i - e));
    var h = (i + l) * 2 / s;
    var o = (i * 2 + l * 2 - e) * -1 / s / s;
    var l = this.Uj1.AllTimeForJump * MS_TO_SECOUND;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 42, "[RailSlide] 进入抛物线轨道", ["h0", e], ["h1", i], ["d", s], ["a", o], ["b", h], ["splineLen", a], ["AllTime", l]);
    }
    return [t, r, {
      Length: a,
      Height0: e,
      AllTime: l,
      ProjectileA: o,
      ProjectileB: h
    }];
  }
  Db1(t) {
    var i;
    var e;
    var s;
    var h;
    this.Hb1(this.Ab1);
    if (this.Ab1) {
      this.qb1();
      e = (i = this.Ab1).GetRate(t);
      s = i.Spline.GetSplineLength() * e;
      i.Spline.GetTransformAtDistanceAlongSpline(s, 1, this.Z_e);
      this.kj1(s);
      h = this.Z_e.GetLocation();
      this.Lz.DeepCopy(h);
      this.Lz.SubtractionEqual(this.Hte.ActorLocationProxy);
      if (!(this.Lz.SizeSquared() < 1)) {
        if (GlobalData_1.GlobalData.IsPlayInEditor && this.Uj1.DebugDraw) {
          this.Fih(h.ToUeVector(), ColorUtils_1.ColorUtils.LinearWhite);
        }
        this.az.FromUeQuat(this.Z_e.GetRotation());
        this.Gue.DeepCopy(this.az.Rotator());
        this.A91(this.az);
        this.P91(t, this.Lz, this.az, s);
        i.Spline.GetDirectionAtDistanceAlongSpline(s, 1, this.Tz);
        if (!this.Tz.IsNearlyZero()) {
          this.Oj1(t, this.Tz, this.Lz.Size());
        }
        this.Hte.AddActorWorldOffset(this.Lz.ToUeVector(), "TsAnimNotifyStateCurveMove沿样条移动.AddActorWorldOffset", true);
        if (e < 1 && !this.Tz.IsNearlyZero() && !this.Gue.IsNearlyZero()) {
          this.x91(this.Gue);
        }
        this.Hte.ResetAllCachedTime();
        if (GlobalData_1.GlobalData.IsPlayInEditor && this.Uj1.DebugDraw) {
          this.Lz.AdditionEqual(this.Hte.ActorLocationProxy);
          this.Fih(this.Lz.ToUeVector(), ColorUtils_1.ColorUtils.LinearWhite);
        }
      }
    } else {
      this.psu("MoveToTargetAlongSpline 结束轨道滑行");
    }
  }
  P91(t, i, e, s) {
    var h = this.Ab1;
    switch (h.Params.JumpType) {
      case 0:
        this.Tz.DeepCopy(Vector_1.Vector.UpVectorProxy);
        this.Tz.MultiplyEqual(this.Hte.ScaledHalfHeight);
        h.UpdateRotatorSpeed(this.Hte.ActorRotationProxy, this.Gue);
        e.RotateVector(this.Tz, this.Tz);
        e.FromUeQuat(this.Hte.ActorInitGravityRotationProxy.Quaternion());
        e.RotateVector(this.Tz, this.Tz);
        i.AdditionEqual(this.Tz);
        break;
      case 2:
        this.Ab1.Spline.GetDirectionAtDistanceAlongSpline(s, 1, this.vHo);
        this.Tz.DeepCopy(this.Hte.ActorGravityDirectProxy);
        this.Tz.UnaryNegation(this.Tz);
        Vector_1.Vector.CrossProduct(this.Tz, this.vHo, this.fHo);
        Vector_1.Vector.VectorPlaneProject(this.vHo, this.fHo, this.pHo);
        MathUtils_1.MathUtils.LookRotationForwardFirst(this.pHo, this.Tz, this.EPn);
        h.UpdateRotatorSpeed(this.Hte.ActorRotationProxy, this.EPn);
        MathUtils_1.MathUtils.RotatorInterpConstantTo(this.Hte.ActorRotationProxy, this.EPn, t, this.Ab1.RotatorSpeed, this.Gue);
        this.Tz.DeepCopy(Vector_1.Vector.UpVectorProxy);
        this.Tz.MultiplyEqual(this.Hte.ScaledHalfHeight);
        this.Gue.Quaternion(this.az);
        this.az.RotateVector(this.Tz, this.Tz);
        this.az.FromUeQuat(this.Hte.ActorInitGravityRotationProxy.Quaternion());
        this.az.RotateVector(this.Tz, this.Tz);
        i.AdditionEqual(this.Tz);
        break;
      case 1:
        var a = h.Params;
        if (a.RotatorFixedDirection && !a.RotatorFixedDirection.IsNearlyZero()) {
          this.Tz.DeepCopy(this.Hte.ActorGravityDirectProxy);
          this.Tz.UnaryNegation(this.Tz);
          MathUtils_1.MathUtils.LookRotationForwardFirst(a.RotatorFixedDirection, this.Tz, this.EPn);
          h.UpdateRotatorSpeed(this.Hte.ActorRotationProxy, this.EPn);
          MathUtils_1.MathUtils.RotatorInterpConstantTo(this.Hte.ActorRotationProxy, this.EPn, t, this.Ab1.RotatorSpeed, this.Gue);
          this.Tz.DeepCopy(Vector_1.Vector.UpVectorProxy);
          this.Tz.MultiplyEqual(this.Hte.ScaledHalfHeight);
          this.Gue.Quaternion(this.az);
          this.az.RotateVector(this.Tz, this.Tz);
          this.az.FromUeQuat(this.Hte.ActorInitGravityRotationProxy.Quaternion());
          this.az.RotateVector(this.Tz, this.Tz);
          if (a = this.Ab1.GetHeightOffset()) {
            GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Tz, a);
          }
          i.AdditionEqual(this.Tz);
        }
    }
  }
  x91(t) {
    var i = this.Ab1;
    switch (i.Params.JumpType) {
      case 0:
      case 2:
        this.Hte.SetActorRotation(t.ToUeRotator(), "RailSlide.TangentRotator", false);
        break;
      case 1:
        var e = i.Params;
        if (e.RotatorFixedDirection && !e.RotatorFixedDirection.IsNearlyZero()) {
          this.Hte.SetActorRotation(t.ToUeRotator(), "RailSlide.RotatorFixedDirection", false);
        }
    }
  }
  A91(t) {
    let i = 0;
    if (this.Ab1.Params.RailType === 0) {
      this.fHo.DeepCopy(this.Hte.ActorGravityDirectProxy);
      this.fHo.UnaryNegation(this.fHo);
      t.RotateVector(this.fHo, this.fHo);
      if ((i = Math.acos(this.Hte.ActorUpProxy.DotProduct(this.fHo)) * MathCommon_1.MathCommon.RadToDeg % MathCommon_1.MathCommon.FlatAngle) > this.Uj1.LimitInputAngle) {
        i *= this.Hte.ActorRightProxy.DotProduct(this.fHo) > 0 ? 1 : -1;
      } else if ((t = ModelManager_1.ModelManager.InputModel?.GetAxisValues()) && (t = t.get(InputEnums_1.EInputAxis.MoveRight))) {
        i = t * this.Uj1.MaxLeaningAngle;
      }
    }
    this.w91 = MathUtils_1.MathUtils.Lerp(this.w91, i, this.Uj1.LeaningBlendAlpha);
    t = this.oRe?.MainAnimInstance;
    if (t) {
      t.SlideMix = MathUtils_1.MathUtils.RangeClamp(this.w91, -this.Uj1.MaxLeaningAngle, this.Uj1.MaxLeaningAngle, -1, 1);
    }
  }
  kj1(t) {
    if (this.Ab1) {
      switch (this.Ab1.Params.RailType) {
        case 0:
          var i = (this.Ab1.EndDistance - t) / this.Ab1.Speed * SECOUND_TO_MS;
          if (!this.Ab1.InAir && i < this.Uj1.JumpBlendTime && this.Ab1.Params.DefaultNextRailId) {
            this.Ab1.SetChangeJumpState();
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("AI", 42, "[RailSlide] 提前切换起跳状态", ["remainingTime", i], ["JumpBlendTime", this.Uj1.JumpBlendTime], ["cd", this.Uj1.ChangeRailCooldownTime]);
            }
            this.ggu();
            this.xb1 = this.Uj1.ChangeRailCooldownTime;
          }
          break;
        case 2:
          i = this.Ab1.Params;
          i = (i.AllTime - i.JumpTime) * SECOUND_TO_MS;
          if (this.Uj1.LandBlendTime && this.Ab1.InAir && i < this.Uj1.LandBlendTime && (this.Ab1.InAir = false, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("AI", 42, "[RailSlide] 提前切换抛物线落地状态", ["remainingTime", i], ["JumpBlendTime", this.Uj1.LandBlendTime]);
          }
          break;
        case 1:
          i = (this.Ab1.EndDistance - t) / this.Ab1.Speed * SECOUND_TO_MS;
          if (this.Uj1.LandBlendTime && this.Ab1.InAir && i < this.Uj1.LandBlendTime && (this.Ab1.InAir = false, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("AI", 42, "[RailSlide] 提前切换落地状态", ["remainingTime", i], ["JumpBlendTime", this.Uj1.LandBlendTime]);
          }
      }
    }
  }
  Oj1(t, i, e) {
    var s;
    var h;
    var a;
    var o;
    if (this.Ab1.Params.RailType === 2) {
      this.Ab1.Speed = e / (t * MS_TO_SECOUND);
    } else {
      e = this.Hte.MoveComp.GravityUp;
      e = Vector_1.Vector.DotProduct(i, e);
      s = Math.acos(MathUtils_1.MathUtils.Clamp(e, -1, 1)) * MathUtils_1.MathUtils.RadToDeg;
      h = Math.abs(s - 90);
      a = Math.min(h, this.Uj1.AccelerationAngle) / this.Uj1.AccelerationAngle;
      o = this.Ab1.GetAccelerationSpeed(h, e);
      e = this.Ab1.GetTargetSpeed(h, e);
      t = t * Math.min(Math.abs(o), Math.abs(e)) * MS_TO_SECOUND * (h > 1 ? a : 1);
      if (Math.abs(this.Ab1.Speed - e) > t) {
        if (this.Ab1.Speed - e > 0) {
          this.Ab1.Speed += -t;
        } else {
          this.Ab1.Speed += t;
        }
      } else {
        this.Ab1.Speed = e;
      }
      if (GlobalData_1.GlobalData.IsPlayInEditor && CharacterRailSlideComponent_1.DebugLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[RailSlide] DeltaSpeed", ["Speed", this.Ab1.Speed], ["factor", s], ["accSpeed", o], ["targetSpeed", e], ["deltaSpeed", t], ["moveVec", i]);
      }
    }
  }
  Gb1(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (t) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "SlideRailComponent");
      if (t) {
        return t;
      }
    }
  }
  Fb1(t) {
    if (this.h0u.has(t)) {
      return this.h0u.get(t);
    }
    var i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (i) {
      var e = (0, IComponent_1.getComponent)(i.ComponentsData, "SplineComponent");
      if (e && e.Option.Points) {
        if (!(e.Option.Points.length < 2)) {
          this.h0u.set(t, [ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(t, this.Entity.Id, 1), i.Transform]);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("AI", 42, "[RailSlide] LoadAndGetSplineAsset", ["SplineEntityId", t]);
          }
          return this.h0u.get(t);
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AI", 42, "[RailSlide] 群组巡逻样条点数量小于2", ["SplineEntityId", t]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 42, "[RailSlide] 无法找到样条组件配置", ["SplineEntityId", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AI", 42, "[RailSlide] 无法找到SplineEntityData", ["SplineEntityId", t]);
    }
  }
  l0u(t) {
    if (this.h0u.has(t) && (this.h0u.delete(t), ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(t, this.Entity.Id, 1), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("AI", 42, "[RailSlide] ReleaseSplineAsset", ["SplineEntityId", t]);
    }
  }
  IJr() {
    var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    t.WorldContextObject = this.Hte.Actor;
    t.Radius = this.Hte.ScaledRadius;
    this.Lz.DeepCopy(this.Hte.ActorLocationProxy);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Lz);
    this.Tz.DeepCopy(this.Hte.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Tz, -this.Hte.ScaledHalfHeight);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Tz);
    t.ActorsToIgnore.Empty();
    for (const i of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      t.ActorsToIgnore.Add(i);
    }
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, t, PROFILE_KEY, PROFILE_KEY)) {
      return t.HitResult;
    } else {
      return undefined;
    }
  }
  $b1(i) {
    for (let t = 0; t < i.GetSplineLength(); t += DEBUG_RADIUS) {
      i.GetLocationAtDistanceAlongSpline(t, 1, this.Lz);
      this.Fih(this.Lz.ToUeVector(), ColorUtils_1.ColorUtils.LinearYellow);
    }
  }
  Fih(t, i, e = DEBUG_RADIUS, s = DEBUG_DURATION) {
    UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, t, e, DEBUG_SEGMENTS, i, s);
  }
  Bj1(t) {
    var i;
    var e = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_RailSlideConfig_C);
    if (e?.IsValid()) {
      i = this.Hte.CreatureData.GetPbDataId();
      i = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(i);
      this.kZ1 = i === KATIXIYA_ROLE_ID;
      return new RailSlideParams(e, this.kZ1);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 42, "获取滑轨参数DA失败", ["DaPath", t], ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
    }
  }
  qZ1(t = false) {
    if (this.BZ1) {
      if (t) {
        if (this.OZ1) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Movement", 42, "[RailSlide] 移除滑轨移动特效Buff", ["Handle", this.OZ1], ["ID", keepRailSlideCue[this.kZ1 ? 1 : 0]]);
          }
          this.BZ1.RemoveCueByHandle(this.OZ1);
          this.OZ1 = 0;
        }
      } else {
        this.OZ1 = this.BZ1.AddCue(keepRailSlideCue[this.kZ1 ? 1 : 0]);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "[RailSlide] 添加滑轨移动特效Buff", ["Handle", this.OZ1], ["ID", keepRailSlideCue[this.kZ1 ? 1 : 0]]);
        }
      }
    }
  }
  GZ1() {
    if (this.BZ1 && (this.BZ1.AddCue(landRailSlideCue[this.kZ1 ? 1 : 0], {
      Instant: true
    }), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Movement", 42, "[RailSlide] 触发滑轨落地特效Buff", ["ID", landRailSlideCue[this.kZ1 ? 1 : 0]]);
    }
  }
  FZ1() {
    if (this.BZ1 && (this.BZ1.AddCue(leaveRailSlideCue[this.kZ1 ? 1 : 0], {
      Instant: true
    }), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Movement", 42, "[RailSlide] 触发离开滑轨特效Buff", ["ID", leaveRailSlideCue[this.kZ1 ? 1 : 0]]);
    }
  }
};
CharacterRailSlideComponent.DebugLog = false;
CharacterRailSlideComponent = CharacterRailSlideComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(36)], CharacterRailSlideComponent);
exports.CharacterRailSlideComponent = CharacterRailSlideComponent; //# sourceMappingURL=CharacterRailSlideComponent.js.map