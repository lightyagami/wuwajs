"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeepFollowingMoveLogic = exports.KeepFollowingParams = exports.FollowingMoveParams = exports.FollowingRotatorParams = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const BattleUiDefine_1 = require("../../../../../Module/BattleUi/BattleUiDefine");
const ColorUtils_1 = require("../../../../../Utils/ColorUtils");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const DEBUG_RADIUS = 20;
const DEBUG_SEGMENTS = 10;
const ASYNC_INTERVAL = 5;
const ASYNC_RATIO = 0.01;
const DETECT_HEIGHT = 2;
const PROFILE_KEY = "KeepFollowing";
const CHECK_DIRECTION_ANGLE = 40;
const checkDirectionList = [0, 1, 2, 3, 4, -1];
const MIN_ANGLE = 5;
const STAND_TOLERANCE_RATE = 0.4;
const COMPENSATE_TOLERANCE_DISTANCE = 5;
const ANGLE_DIRECTION_TOLERANCE = 45;
const DECELERATION_SPEED_RATE = -5;
const ROTATION_STOP_DELAY_STAND = 200;
const MIN_MOVE_SPEED_RATE = 0.3;
const DEFAULT_WALK_SPEED = 100;
const DEFAULT_RUN_SPEED = 400;
const MODEL_BUFFER_TIME = 100;
const STAND_CHECK_TIME = 800;
class FollowingRotatorParams {
  constructor(t) {
    this.RotatorSpeed = 360;
    this.ToleranceRotatorAngle = 10;
    this.MaxRotatorDuration = 400;
    if (t) {
      this.ToleranceRotatorAngle = t.转向角度容差;
      this.MaxRotatorDuration = t.最大转向持续时间;
      this.RotatorSpeed = t.转向速度;
    }
  }
}
exports.FollowingRotatorParams = FollowingRotatorParams;
class FollowingMoveParams {
  constructor(i) {
    this.KeepStandDistance = 10;
    this.WalkRunDivideSpeed = 250;
    this.WalkRunDivideFloat = 30;
    this.ChangeSpeedAcceleration = 20;
    this.ToleranceDistance = 20;
    this.EnableCompensate = true;
    this.CompensateDistance = 50;
    this.CompensateDistanceSquared = 2500;
    this.CompensateSpeed = 600;
    this.EnableTimeOutTeleport = true;
    this.IllegalDistance = 500;
    this.TimeOutDuration = 3000;
    this.WalkOffsetLocation = {
      X: 0,
      Y: 60
    };
    this.RunOffsetLocation = {
      X: 0,
      Y: 80
    };
    this.FollowingSpeedRange = {
      X: 50,
      Y: 600
    };
    this.MinFollowingSpeed = MIN_MOVE_SPEED_RATE * 50;
    this.HeightDifference = 30;
    this.ObstacleTime = 2000;
    this.TeleportEffectBuffId = [];
    this.WalkOffsetDistance = 0;
    this.RunOffsetDistance = 0;
    if (i) {
      this.KeepStandDistance = i.保持站立距离;
      this.WalkRunDivideSpeed = i.走跑状态分界速度;
      this.WalkRunDivideFloat = i.走跑分界速度浮动;
      this.ChangeSpeedAcceleration = i.变速加速度;
      this.ToleranceDistance = i.跟随距离容差;
      this.WalkOffsetLocation = i.步行跟随方位向量;
      this.RunOffsetLocation = i.跑步跟随方位向量;
      this.FollowingSpeedRange = i.跟随变速范围;
      this.EnableCompensate = i.是否启用位移修正;
      this.CompensateDistance = i.位移修正距离;
      this.CompensateSpeed = i.位移修正速度;
      this.EnableTimeOutTeleport = i.是否启用超时传送;
      this.IllegalDistance = i.异常距离;
      this.TimeOutDuration = i.超时时间;
      this.HeightDifference = i.高低差允许范围;
      this.ObstacleTime = i.被阻挡触发传送时间;
      for (let t = 0; t < i.传送特效buffID.Num(); t++) {
        var s = i.传送特效buffID.Get(t);
        if (s && !this.TeleportEffectBuffId.includes(s)) {
          this.TeleportEffectBuffId.push(s);
        }
      }
      this.WalkOffsetDistance = Math.sqrt(this.WalkOffsetLocation.X * this.WalkOffsetLocation.X + this.WalkOffsetLocation.Y * this.WalkOffsetLocation.Y);
      this.RunOffsetDistance = Math.sqrt(this.RunOffsetLocation.X * this.RunOffsetLocation.X + this.RunOffsetLocation.Y * this.RunOffsetLocation.Y);
      this.CompensateDistanceSquared = this.CompensateDistance * this.CompensateDistance;
      this.MinFollowingSpeed = this.FollowingSpeedRange.X * MIN_MOVE_SPEED_RATE;
    }
  }
}
exports.FollowingMoveParams = FollowingMoveParams;
class KeepFollowingParams {
  constructor(t, i) {
    this.DebugDraw = false;
    this.Leader = undefined;
    this.HandType = undefined;
    this.FollowingOnce = false;
    this.Callback = undefined;
    this.y4u = undefined;
    this.S4u = undefined;
    this.Leader = t;
    this.HandType = i;
  }
  InitWithDataAsset(t) {
    this.DebugDraw = t.DebugDraw;
    this.y4u = new FollowingMoveParams(t);
    this.S4u = new FollowingRotatorParams(t);
  }
  InitWithParams(t, i, s) {
    this.DebugDraw = s ?? false;
    this.y4u = t;
    this.S4u = i;
  }
  get MoveParams() {
    this.y4u ||= new FollowingMoveParams();
    return this.y4u;
  }
  get RotatorParams() {
    this.S4u ||= new FollowingRotatorParams();
    return this.S4u;
  }
}
exports.KeepFollowingParams = KeepFollowingParams;
class KeepFollowingMoveLogic {
  constructor() {
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.pz = Vector_1.Vector.Create();
    this.tdc = Vector_1.Vector.Create();
    this.jye = Vector_1.Vector.Create();
    this.RTe = Vector_1.Vector.Create();
    this.Jh = undefined;
    this.Hte = undefined;
    this.Gce = undefined;
    this.oRe = undefined;
    this.rJo = undefined;
    this.M4u = false;
    this.E4u = undefined;
    this.I4u = false;
    this.aO1 = false;
    this.PWc = ASYNC_INTERVAL;
    this.CapsuleHeight = 0;
    this.T4u = false;
    this.lJo = 0;
    this.R4u = 0;
    this.w4u = Vector_1.Vector.Create();
    this.DWc = undefined;
    this.xWc = undefined;
    this.L4u = false;
    this.P4u = 0;
    this.x4u = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
    this.D4u = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
    this.U4u = 0;
    this.god = 0;
    this.lgd = 0;
    this.Cad = 0;
    this.Eld = Vector_1.Vector.Create();
    this._gd = false;
  }
  Init(t) {
    this.Jh = t;
    this.Hte = this.Jh.GetComponent(3);
    this.rJo = this.Jh.GetComponent(102);
    this.Gce = this.Jh.GetComponent(45);
    this.oRe = this.Jh.GetComponent(178);
    t = this.Hte?.CreatureData.GetEntityType();
    this.aO1 = t === Protocol_1.Aki.Protocol.kks.Proto_Player || t === Protocol_1.Aki.Protocol.kks.Proto_Npc;
    this.CapsuleHeight = (this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius) * 2;
  }
  UpdateMove(t) {
    if (this.M4u) {
      if (this.I4u && !this.T4u) {
        this.MoveEnd(1);
      } else {
        if (this.aO1) {
          if (this.PWc < 0) {
            this.Gce?.MoveController.PushMoveInfo();
            this.PWc = ASYNC_INTERVAL;
          } else {
            this.PWc -= t * Math.max(1, this.P4u * ASYNC_RATIO);
          }
        }
        if (this.T4u) {
          this.B4u(t);
        }
        this.Cod(t);
      }
    }
  }
  IsMoving() {
    return this.M4u;
  }
  MoveEnd(t) {
    var i = this.E4u?.Callback;
    this.StopMove();
    i?.(t);
  }
  StopMove() {
    this.I4u = false;
    this.M4u = false;
    this.E4u = undefined;
    this.O4u();
    this.q4u();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "[KeepFollowing] 退出跟随", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
    }
  }
  Dispose() {
    this.StopMove();
  }
  StartKeepFollowing(t) {
    this.Gce?.MoveController.StopMove();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "[KeepFollowing] 开始跟随", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
    }
    this.M4u = true;
    this.E4u = t;
  }
  StartKeepFollowingWithDataAssetPath(t, i, s, e = false, h, o = undefined) {
    var r = ResourceSystem_1.ResourceSystem.Load(i, UE.BP_KeepFollowingConfig_C);
    if (r?.IsValid()) {
      this.StartKeepFollowingWithDataAsset(t, r, s, e, h, o);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 42, "[KeepFollowing] 获取跟随参数DA失败，取消跟随", ["DaPath", i], ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
    }
  }
  StartKeepFollowingWithDataAsset(t, i, s, e = false, h, o = undefined) {
    t = KeepFollowingMoveLogic.GetKeepFollowingParams(t, i, s);
    t.FollowingOnce = e;
    t.Callback = h;
    if (o) {
      t.MoveParams.WalkOffsetLocation = o;
      t.MoveParams.RunOffsetLocation = o;
    }
    this.StartKeepFollowing(t);
  }
  G4u(t, i, s, e, h) {
    if (this.T4u) {
      this.q4u();
    }
    this.w4u.DeepCopy(t);
    this.w4u.Normalize();
    var o;
    var r;
    var t = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(this.Hte, this.Hte.ActorForwardProxy, this.w4u);
    if (!(Math.abs(t) < Math.max(MIN_ANGLE, this.E4u.RotatorParams.ToleranceRotatorAngle))) {
      this.jye.DeepCopy(i);
      this.jye.SubtractionEqual(this.Hte.ActorLocationProxy);
      i = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(this.Hte, this.Hte.ActorForwardProxy, this.jye);
      if (Math.abs(i) > ANGLE_DIRECTION_TOLERANCE) {
        o = this.jye.DotProduct(this.w4u);
        this.jye.CrossProduct(this.Hte.ActorForwardProxy, this.RTe);
        r = this.RTe.DotProduct(this.Hte.ActorUpProxy);
        this.R4u = r < 0 ? 1 : -1;
        if (this.E4u?.DebugDraw && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "[KeepFollowing] 移动转向findRotator", ["Clockwise", this.R4u], ["cross", r], ["dot", o]);
        }
      } else {
        this.R4u = 0;
      }
      r = this.R4u * t > 0 ? 360 - t * this.R4u : t;
      if (Math.abs(r) < 90) {
        this.R4u = 0;
      }
      this.lJo = Math.max(s, Math.abs(r) / (this.E4u.RotatorParams.MaxRotatorDuration * 0.001));
      this.T4u = true;
      this.DWc = h;
      if (this.E4u?.DebugDraw && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[KeepFollowing] 设置移动转向", ["Context", e], ["rotSpeed", this.lJo], ["angle", t], ["faceAngle", i], ["resultAngle", r]);
      }
    }
  }
  B4u(i) {
    if (this.Hte) {
      var s = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(this.Hte, this.Hte.ActorForwardProxy, this.w4u);
      if ((!!this.w4u.IsNearlyZero() || !!(Math.abs(s) < Math.max(MIN_ANGLE, this.E4u.RotatorParams.ToleranceRotatorAngle)) || !!this.DWc?.()) && (!this.xWc || !TimerSystem_1.TimerSystem.Has(this.xWc))) {
        this.xWc = TimerSystem_1.TimerSystem.Delay(() => {
          this.q4u();
          this.rJo?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
        }, ROTATION_STOP_DELAY_STAND);
      }
      let t = s;
      if (Math.abs(s) < ANGLE_DIRECTION_TOLERANCE || this.R4u === 0) {
        this.RTe.DeepCopy(this.w4u);
      } else {
        t = this.lJo * i * this.R4u;
        t = MathUtils_1.MathUtils.Clamp(t, -ANGLE_DIRECTION_TOLERANCE, ANGLE_DIRECTION_TOLERANCE);
        this.Hte.ActorForwardProxy.RotateAngleAxis(t, this.Hte.ActorUpProxy, this.RTe);
      }
      if (this.E4u?.DebugDraw && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[KeepFollowing] KeepTurningToTarget", ["angle", s], ["changeAngle", t], ["face", this.RTe], ["Clockwise", this.R4u]);
      }
      this.Hte.SetInputFacing(this.RTe, true);
      this.Hte.SetOverrideTurnSpeed(this.lJo);
    }
  }
  q4u(t = true) {
    this.T4u = false;
    this.DWc = undefined;
    if (this.Hte && t) {
      this.Hte.SetOverrideTurnSpeed(0);
      this.Hte.SetInputFacing(this.Hte.ActorForwardProxy);
    }
    if (this.E4u?.DebugDraw && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "[KeepFollowing] 停止移动转向");
    }
  }
  Cod(t) {
    var i = this.E4u;
    var s = i?.Leader;
    if (i && s && this.Hte && this.Gce) {
      var e = i.RotatorParams.RotatorSpeed;
      if (this.GetTargetFollowingPosition(this.cz, s)) {
        this.fz.DeepCopy(s.ActorLocationProxy);
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(s, this.fz, -s.ScaledHalfHeight);
        this.pz.DeepCopy(this.Hte.ActorLocationProxy);
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.pz, -this.Hte.ScaledHalfHeight);
        this.tdc.DeepCopy(this.cz);
        this.tdc.SubtractionEqual(this.pz);
        var h = GravityUtils_1.GravityUtils.GetDistSquared2dForActor(this.Hte, this.cz, this.pz);
        var o = Math.sqrt(h);
        var r = Math.min(o, i.MoveParams.CompensateDistance);
        if (this.N4u(t, o, this.cz, s.ActorRotationProxy)) {
          this.Tld(s, e, "超时传送");
        } else {
          var a = this.Hte.ActorForwardProxy.DotProduct(this.tdc);
          var [_, l, n] = this.Ild(o);
          var E = Math.sqrt(GravityUtils_1.GravityUtils.GetDistSquared2dForActor(this.Hte, this.Hte.ActorLocationProxy, this.Hte.LastActorLocation)) / t;
          var T = Math.sqrt(GravityUtils_1.GravityUtils.GetDistSquared2dForActor(s, s.ActorLocationProxy, s.LastActorLocation)) / t;
          var c = i.MoveParams.FollowingSpeedRange.X * MIN_MOVE_SPEED_RATE;
          if (h > i.MoveParams.CompensateDistanceSquared) {
            this.Bgd();
            if (this.pod(t, this.cz, s.ActorRotationProxy, E, c)) {
              this.Tld(s, e, "障碍传送");
              return;
            }
          } else {
            this.god = 0;
            if (!this._gd && this.ugd(t, E, T, c)) {
              this.Tld(s, e, "检测到在范围内位移很小，保持跟随目标面向");
              return;
            }
            if (this._gd) {
              this.Tld(s, e, "站立下检测到在范围内位移很小，保持跟随目标面向");
              return;
            }
          }
          var h = s.Entity.GetComponent(102)?.MoveState;
          var E = this.rJo?.MoveState;
          var g = h === CharacterUnifiedStateTypes_1.ECharMoveState.Stand || T < c;
          var C = Vector_1.Vector.Dist(this.pz, this.fz);
          var c = T < c ? i.MoveParams.WalkOffsetDistance : i.MoveParams.RunOffsetDistance;
          if (o < n && C < c - COMPENSATE_TOLERANCE_DISTANCE && !g) {
            this.Tld(s, e, "在跟随臂长半径内，保持跟随目标面向");
          } else if (o < _) {
            if (this.L4u && o > COMPENSATE_TOLERANCE_DISTANCE) {
              this.Hte.AddActorWorldOffset(this.tdc.ToUeVector(), "KeepFollowingState.R0站立位置修正", true);
            }
            this.Tld(s, e, "近距离进入保持站立姿态，保持跟随目标面向", !g);
            if (i.FollowingOnce) {
              this.I4u = true;
            }
          } else {
            if (o < l) {
              if (g) {
                if (this.L4u && a < 0) {
                  this.V4u(this.tdc, r, o, i.MoveParams.KeepStandDistance, "站立位置修正", true);
                }
                this.Tld(s, e, "跟随容差范围内，保持跟随目标面向");
                if (i.FollowingOnce) {
                  this.I4u = true;
                }
                return;
              }
            } else if (n < o && i.MoveParams.EnableCompensate && E === CharacterUnifiedStateTypes_1.ECharMoveState.Run && h !== CharacterUnifiedStateTypes_1.ECharMoveState.Stand) {
              C = i.MoveParams.CompensateSpeed * t;
              this.V4u(this.tdc, C, o, i.MoveParams.CompensateDistance, "跑步移动状态修正");
            }
            if (this.E4u?.DebugDraw && Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Character", 42, "[KeepFollowing] 跟随参数", ["Dist", r], ["allDist", o], ["rangeType", this.Cad], ["dot", a], ["followerMoveState", E], ["LeaderSpeed", T]);
            }
            this.j4u(t, T, r, o, h);
            AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.Hte, this.tdc, e);
          }
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[KeepFollowing] 计算目标点时，未检测到地面或遇到障碍物");
        }
        this.O4u();
      }
    }
  }
  Bgd() {
    if (this._gd) {
      this.lgd = 0;
      this._gd = false;
    }
  }
  j4u(t, i, s, e, h) {
    var o;
    var r = this.E4u;
    var a = r?.Leader;
    if (this.M4u && r && a && this.Hte && this.Gce) {
      this.L4u = true;
      a = this.x4u === CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
      o = s - r.MoveParams.ToleranceDistance;
      s = s < r.MoveParams.ToleranceDistance ? DECELERATION_SPEED_RATE : 1;
      o = Math.pow(Math.abs(o), 1.5) * s;
      s = i < r.MoveParams.MinFollowingSpeed ? e > DEFAULT_WALK_SPEED ? DEFAULT_RUN_SPEED : DEFAULT_WALK_SPEED : o + i + e;
      e = r.MoveParams.ChangeSpeedAcceleration * t;
      if (this.E4u?.DebugDraw && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[KeepFollowing] 速度变化", ["Speed", s], ["change", o], ["leaderSpeed", i], ["changeSpeed", r.MoveParams.ChangeSpeedAcceleration], ["LastRecordSpeed", this.P4u]);
      }
      s = MathUtils_1.MathUtils.Clamp(s, Math.max(r.MoveParams.FollowingSpeedRange.X, this.P4u - e), Math.min(r.MoveParams.FollowingSpeedRange.Y, this.P4u + e));
      if (this.E4u?.DebugDraw && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[KeepFollowing] 最终速度变化", ["Speed", s]);
      }
      this.Gce.SetMaxSpeed(s);
      this.tdc.Normalize();
      this.Hte.SetInputDirect(this.tdc);
      this.P4u = s;
      if (h === CharacterUnifiedStateTypes_1.ECharMoveState.Stand) {
        if (s > r.MoveParams.WalkRunDivideSpeed) {
          this.rJo?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
        } else {
          this.rJo?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
        }
      } else if (s < r.MoveParams.WalkRunDivideSpeed + r.MoveParams.WalkRunDivideFloat * (a ? 1 : -1)) {
        this.rJo?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
      } else {
        this.rJo?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
      }
    }
  }
  O4u(t = true) {
    if (this.L4u && (this.L4u = false, this.P4u = 0, this.D4u = CharacterUnifiedStateTypes_1.ECharMoveState.Walk, this.x4u = CharacterUnifiedStateTypes_1.ECharMoveState.Walk, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 42, "[KeepFollowing] StopFollowingMove"), this.Hte.ClearInput(), t) && this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      this.rJo?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
    }
  }
  Tld(t, i, s, e) {
    if (!this.T4u) {
      this.O4u(e);
      this.G4u(t.ActorForwardProxy, t.ActorLocationProxy, i, s);
    }
  }
  Ild(t) {
    var i = this.E4u;
    var s = this.Cad;
    let e = i.MoveParams.KeepStandDistance;
    let h = i.MoveParams.ToleranceDistance;
    let o = i.MoveParams.CompensateDistance;
    switch (s) {
      case 0:
        e += (h - e) * STAND_TOLERANCE_RATE;
        break;
      case 1:
        e -= e * (1 - STAND_TOLERANCE_RATE);
        h += (o - h) * STAND_TOLERANCE_RATE;
        break;
      case 2:
        o += (o - h) * STAND_TOLERANCE_RATE;
        h -= (h - e) * STAND_TOLERANCE_RATE;
        break;
      case 3:
        o -= (o - h) * STAND_TOLERANCE_RATE;
    }
    this.Cad = t < e ? 0 : t < h ? 1 : t < o ? 2 : 3;
    return [e, h, o];
  }
  N4u(t, i, s, e) {
    var h = this.E4u;
    return !!h?.MoveParams.EnableTimeOutTeleport && !!(i > h.MoveParams.IllegalDistance ? this.U4u += t * BattleUiDefine_1.SECOND_TO_MILLISECOND : this.U4u = 0, this.U4u > h.MoveParams.TimeOutDuration) && !(this.vod(s, e, "跟随模式,异常距离超时传送"), this.U4u = 0);
  }
  pod(t, i, s, e, h) {
    var o = this.E4u;
    return !!o?.MoveParams.ObstacleTime && (e < h ? this.god += t * BattleUiDefine_1.SECOND_TO_MILLISECOND : this.god = 0, this.god > o.MoveParams.ObstacleTime) && (this.vod(i, s, "跟随模式,被阻挡传送"), !(this.god = 0));
  }
  ugd(t, i, s, e) {
    if (i < e || s < e) {
      this.lgd += t * BattleUiDefine_1.SECOND_TO_MILLISECOND;
    } else {
      this.lgd = 0;
      this._gd = false;
    }
    return this.lgd > STAND_CHECK_TIME && (this.lgd = 0, this._gd = true, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 42, "[KeepFollowing] 检测到在范围内位移很小保持站立"), true);
  }
  vod(t, i, s) {
    if (this.Eld.Equals(t)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[KeepFollowing] 触发传送位置和上一次传送位置相同，不传送", ["context", s], ["target", t]);
      }
    } else {
      this.Eld.DeepCopy(t);
      t = this.E4u;
      if (t.MoveParams.TeleportEffectBuffId.length) {
        var e = this.Jh?.GetComponent(226);
        for (const h of t.MoveParams.TeleportEffectBuffId) {
          e?.AddCue(h, {
            Instant: true
          });
        }
      }
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Eld, this.Hte.ScaledHalfHeight);
      this._gd = true;
      this.Hte?.TeleportTo(this.Eld.ToUeVector(), i.ToUeRotator(), s);
      this.Gce?.MoveController.PushMoveInfo();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[KeepFollowing] 触发保底传送", ["context", s], ["target", this.Eld]);
      }
    }
  }
  V4u(i, s, e, h, o, r = false) {
    let a = h < e ? e - h : e;
    if (!((a = Math.min(s, a)) < 1)) {
      this.fz.DeepCopy(i);
      this.fz.Normalize();
      this.fz.MultiplyEqual(a);
      let t = undefined;
      if (r) {
        t = this.oRe?.GetMeshTransform();
      }
      this.Hte.AddActorWorldOffset(this.fz.ToUeVector(), "KeepFollowingState." + o, true);
      if (t && r) {
        this.oRe?.SetModelBuffer(t, MODEL_BUFFER_TIME);
      }
      if (this.E4u?.DebugDraw && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[KeepFollowing] 跟随位移补偿", ["context", o], ["dist", a], ["maxCompensate", s], ["allDist", e], ["range", h]);
      }
    }
  }
  GetTargetFollowingPosition(t, i) {
    var s;
    var e = this.E4u;
    if (this.D4u === CharacterUnifiedStateTypes_1.ECharMoveState.Walk) {
      t.FromConfigVector(e.MoveParams.WalkOffsetLocation);
    } else {
      t.FromConfigVector(e.MoveParams.RunOffsetLocation);
    }
    if (e.HandType === 1 && t.Y > 0) {
      t.Y *= -1;
    }
    this.cz.DeepCopy(t);
    KeepFollowingMoveLogic.CalculateFollowingPosition(this.tdc, t, i);
    if (e.DebugDraw) {
      KeepFollowingMoveLogic.cKr(this.tdc, ColorUtils_1.ColorUtils.LinearWhite);
    }
    var h = this.Hte.ScaledRadius * 0.6;
    var o = this.CapsuleHeight + h * 2;
    var r = this.Hte.ScaledRadius - h;
    var a = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    a.WorldContextObject = this.Hte.Actor;
    a.Radius = r;
    if (e.DebugDraw) {
      a.SetDrawDebugTrace(1);
    }
    a.ActorsToIgnore.Empty();
    a.ActorsToIgnore.Add(i.Actor);
    for (const E of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      a.ActorsToIgnore.Add(E);
    }
    let _ = false;
    let l = true;
    let n = true;
    for (const T of checkDirectionList) {
      if (!_ || !!l || !!n) {
        s = CHECK_DIRECTION_ANGLE * T * (t.Y < 0 ? 1 : -1);
        this.cz.RotateAngleAxis(s, this.Hte.ActorGravityDirectProxy, this.pz);
        KeepFollowingMoveLogic.CalculateFollowingPosition(this.tdc, this.pz, i);
        _ = KeepFollowingMoveLogic.IJr(this.Hte, a, this.tdc, e.MoveParams.HeightDifference, h);
        l = KeepFollowingMoveLogic.yod(this.Hte, a, this.tdc, o);
        n = l || KeepFollowingMoveLogic.zcd(this.Hte, a, this.tdc, o, i);
      }
      this.Hte.ActorUpProxy.Multiply(r, this.fz);
      this.tdc.SubtractionEqual(this.fz);
      if (_ && !l && !n) {
        t.DeepCopy(this.tdc);
        if (e.DebugDraw) {
          KeepFollowingMoveLogic.cKr(t);
          a.SetDrawDebugTrace(0);
        }
        return true;
      }
      if (e.DebugDraw) {
        KeepFollowingMoveLogic.cKr(this.tdc, ColorUtils_1.ColorUtils.LinearRed);
      }
    }
    if (e.DebugDraw) {
      a.SetDrawDebugTrace(0);
    }
    t.DeepCopy(this.tdc);
    return false;
  }
  static IJr(t, i, s, e, h) {
    this.Lz.DeepCopy(s);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, this.Lz, e - h);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.Lz);
    this.Lz.DeepCopy(s);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, this.Lz, -e + h);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, this.Lz);
    return !!TraceElementCommon_1.TraceElementCommon.ShapeTrace(t.Actor.CapsuleComponent, i, PROFILE_KEY, PROFILE_KEY) && (TraceElementCommon_1.TraceElementCommon.GetHitLocation(i.HitResult, 0, s), true);
  }
  static yod(t, i, s, e) {
    this.Lz.DeepCopy(s);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, this.Lz, e + DETECT_HEIGHT);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.Lz);
    this.Lz.DeepCopy(s);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, this.Lz, DETECT_HEIGHT);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, this.Lz);
    return TraceElementCommon_1.TraceElementCommon.ShapeTrace(t.Actor.CapsuleComponent, i, PROFILE_KEY, PROFILE_KEY);
  }
  static zcd(t, i, s, e, h) {
    this.Lz.DeepCopy(h.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(h, this.Lz, h.ScaledHalfHeight - i.Radius);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.Lz);
    this.Lz.DeepCopy(s);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, this.Lz, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, this.Lz);
    return TraceElementCommon_1.TraceElementCommon.ShapeTrace(t.Actor.CapsuleComponent, i, PROFILE_KEY, PROFILE_KEY);
  }
  static GetKeepFollowingParams(t, i, s) {
    t = new KeepFollowingParams(t, s);
    t.InitWithDataAsset(i);
    return t;
  }
  static CalculateFollowingPosition(t, i, s) {
    this.Lz.FromConfigVector(i);
    this.Z_e.FromUeTransform(s.ActorTransform);
    this.Z_e.TransformPosition(this.Lz, this.Lz);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(s, this.Lz, -s.ScaledHalfHeight);
    t.DeepCopy(this.Lz);
  }
  static cKr(t, i = ColorUtils_1.ColorUtils.LinearCyan, s) {
    UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, t.ToUeVector(), DEBUG_RADIUS, DEBUG_SEGMENTS, i, s);
  }
}
(exports.KeepFollowingMoveLogic = KeepFollowingMoveLogic).Lz = Vector_1.Vector.Create();
KeepFollowingMoveLogic.Z_e = Transform_1.Transform.Create(); //# sourceMappingURL=KeepFollowingMoveLogic.js.map