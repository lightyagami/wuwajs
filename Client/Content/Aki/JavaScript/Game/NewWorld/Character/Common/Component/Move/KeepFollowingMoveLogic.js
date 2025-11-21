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
    this.N5u = undefined;
    this.V5u = undefined;
    this.Leader = t;
    this.HandType = i;
  }
  InitWithDataAsset(t) {
    this.DebugDraw = t.DebugDraw;
    this.N5u = new FollowingMoveParams(t);
    this.V5u = new FollowingRotatorParams(t);
  }
  InitWithParams(t, i, s) {
    this.DebugDraw = s ?? false;
    this.N5u = t;
    this.V5u = i;
  }
  get MoveParams() {
    this.N5u ||= new FollowingMoveParams();
    return this.N5u;
  }
  get RotatorParams() {
    this.V5u ||= new FollowingRotatorParams();
    return this.V5u;
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
    this.j5u = false;
    this.H5u = undefined;
    this.$5u = false;
    this.aO1 = false;
    this.fKu = ASYNC_INTERVAL;
    this.CapsuleHeight = 0;
    this.W5u = false;
    this.lJo = 0;
    this.K5u = 0;
    this.X5u = Vector_1.Vector.Create();
    this.gKu = undefined;
    this.CKu = undefined;
    this.Y5u = false;
    this.J5u = 0;
    this.Z5u = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
    this.e6u = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
    this.t6u = 0;
    this.qad = 0;
    this.KQd = 0;
    this.kud = 0;
    this.xgd = Vector_1.Vector.Create();
    this.XQd = false;
  }
  Init(t) {
    this.Jh = t;
    this.Hte = this.Jh.GetComponent(3);
    this.rJo = this.Jh.GetComponent(104);
    this.Gce = this.Jh.GetComponent(45);
    this.oRe = this.Jh.GetComponent(181);
    t = this.Hte?.CreatureData.GetEntityType();
    this.aO1 = t === Protocol_1.Aki.Protocol.kks.Proto_Player || t === Protocol_1.Aki.Protocol.kks.Proto_Npc;
    this.CapsuleHeight = (this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius) * 2;
  }
  UpdateMove(t) {
    if (this.j5u) {
      if (this.$5u && !this.W5u) {
        this.MoveEnd(1);
      } else {
        if (this.aO1) {
          if (this.fKu < 0) {
            this.Gce?.MoveController.PushMoveInfo();
            this.fKu = ASYNC_INTERVAL;
          } else {
            this.fKu -= t * Math.max(1, this.J5u * ASYNC_RATIO);
          }
        }
        if (this.W5u) {
          this.i6u(t);
        }
        this.Gad(t);
      }
    }
  }
  IsMoving() {
    return this.j5u;
  }
  MoveEnd(t) {
    var i = this.H5u?.Callback;
    this.StopMove();
    i?.(t);
  }
  StopMove() {
    this.$5u = false;
    this.j5u = false;
    this.H5u = undefined;
    this.o6u();
    this.n6u();
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
    this.j5u = true;
    this.H5u = t;
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
  s6u(t, i, s, e, h) {
    if (this.W5u) {
      this.n6u();
    }
    this.X5u.DeepCopy(t);
    this.X5u.Normalize();
    var o;
    var r;
    var t = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(this.Hte, this.Hte.ActorForwardProxy, this.X5u);
    if (!(Math.abs(t) < Math.max(MIN_ANGLE, this.H5u.RotatorParams.ToleranceRotatorAngle))) {
      this.jye.DeepCopy(i);
      this.jye.SubtractionEqual(this.Hte.ActorLocationProxy);
      i = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(this.Hte, this.Hte.ActorForwardProxy, this.jye);
      if (Math.abs(i) > ANGLE_DIRECTION_TOLERANCE) {
        o = this.jye.DotProduct(this.X5u);
        this.jye.CrossProduct(this.Hte.ActorForwardProxy, this.RTe);
        r = this.RTe.DotProduct(this.Hte.ActorUpProxy);
        this.K5u = r < 0 ? 1 : -1;
        if (this.H5u?.DebugDraw && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "[KeepFollowing] 移动转向findRotator", ["Clockwise", this.K5u], ["cross", r], ["dot", o]);
        }
      } else {
        this.K5u = 0;
      }
      r = this.K5u * t > 0 ? 360 - t * this.K5u : t;
      if (Math.abs(r) < 90) {
        this.K5u = 0;
      }
      this.lJo = Math.max(s, Math.abs(r) / (this.H5u.RotatorParams.MaxRotatorDuration * 0.001));
      this.W5u = true;
      this.gKu = h;
      if (this.H5u?.DebugDraw && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[KeepFollowing] 设置移动转向", ["Context", e], ["rotSpeed", this.lJo], ["angle", t], ["faceAngle", i], ["resultAngle", r]);
      }
    }
  }
  i6u(i) {
    if (this.Hte) {
      var s = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(this.Hte, this.Hte.ActorForwardProxy, this.X5u);
      if ((!!this.X5u.IsNearlyZero() || !!(Math.abs(s) < Math.max(MIN_ANGLE, this.H5u.RotatorParams.ToleranceRotatorAngle)) || !!this.gKu?.()) && (!this.CKu || !TimerSystem_1.TimerSystem.Has(this.CKu))) {
        this.CKu = TimerSystem_1.TimerSystem.Delay(() => {
          this.n6u();
          this.rJo?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
        }, ROTATION_STOP_DELAY_STAND);
      }
      let t = s;
      if (Math.abs(s) < ANGLE_DIRECTION_TOLERANCE || this.K5u === 0) {
        this.RTe.DeepCopy(this.X5u);
      } else {
        t = this.lJo * i * this.K5u;
        t = MathUtils_1.MathUtils.Clamp(t, -ANGLE_DIRECTION_TOLERANCE, ANGLE_DIRECTION_TOLERANCE);
        this.Hte.ActorForwardProxy.RotateAngleAxis(t, this.Hte.ActorUpProxy, this.RTe);
      }
      if (this.H5u?.DebugDraw && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[KeepFollowing] KeepTurningToTarget", ["angle", s], ["changeAngle", t], ["face", this.RTe], ["Clockwise", this.K5u]);
      }
      this.Hte.SetInputFacing(this.RTe, true);
      this.Hte.SetOverrideTurnSpeed(this.lJo);
    }
  }
  n6u(t = true) {
    this.W5u = false;
    this.gKu = undefined;
    if (this.Hte && t) {
      this.Hte.SetOverrideTurnSpeed(0);
      this.Hte.SetInputFacing(this.Hte.ActorForwardProxy);
    }
    if (this.H5u?.DebugDraw && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "[KeepFollowing] 停止移动转向");
    }
  }
  Gad(t) {
    var i = this.H5u;
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
        if (this.h6u(t, o, this.cz, s.ActorRotationProxy)) {
          this.Bgd(s, e, "超时传送");
        } else {
          var a = this.Hte.ActorForwardProxy.DotProduct(this.tdc);
          var [_, l, n] = this.Ugd(o);
          var E = Math.sqrt(GravityUtils_1.GravityUtils.GetDistSquared2dForActor(this.Hte, this.Hte.ActorLocationProxy, this.Hte.LastActorLocation)) / t;
          var T = Math.sqrt(GravityUtils_1.GravityUtils.GetDistSquared2dForActor(s, s.ActorLocationProxy, s.LastActorLocation)) / t;
          var c = i.MoveParams.FollowingSpeedRange.X * MIN_MOVE_SPEED_RATE;
          if (h > i.MoveParams.CompensateDistanceSquared) {
            this.$Yd();
            if (this.Fad(t, this.cz, s.ActorRotationProxy, E, c)) {
              this.Bgd(s, e, "障碍传送");
              return;
            }
          } else {
            this.qad = 0;
            if (!this.XQd && this.YQd(t, E, T, c)) {
              this.Bgd(s, e, "检测到在范围内位移很小，保持跟随目标面向");
              return;
            }
            if (this.XQd) {
              this.Bgd(s, e, "站立下检测到在范围内位移很小，保持跟随目标面向");
              return;
            }
          }
          var h = s.Entity.GetComponent(104)?.MoveState;
          var E = this.rJo?.MoveState;
          var g = h === CharacterUnifiedStateTypes_1.ECharMoveState.Stand || T < c;
          var C = Vector_1.Vector.Dist(this.pz, this.fz);
          var c = T < c ? i.MoveParams.WalkOffsetDistance : i.MoveParams.RunOffsetDistance;
          if (o < n && C < c - COMPENSATE_TOLERANCE_DISTANCE && !g) {
            this.Bgd(s, e, "在跟随臂长半径内，保持跟随目标面向");
          } else if (o < _) {
            if (this.Y5u && o > COMPENSATE_TOLERANCE_DISTANCE) {
              this.Hte.AddActorWorldOffset(this.tdc.ToUeVector(), "KeepFollowingState.R0站立位置修正", true);
            }
            this.Bgd(s, e, "近距离进入保持站立姿态，保持跟随目标面向", !g);
            if (i.FollowingOnce) {
              this.$5u = true;
            }
          } else {
            if (o < l) {
              if (g) {
                if (this.Y5u && a < 0) {
                  this.l6u(this.tdc, r, o, i.MoveParams.KeepStandDistance, "站立位置修正", true);
                }
                this.Bgd(s, e, "跟随容差范围内，保持跟随目标面向");
                if (i.FollowingOnce) {
                  this.$5u = true;
                }
                return;
              }
            } else if (n < o && i.MoveParams.EnableCompensate && E === CharacterUnifiedStateTypes_1.ECharMoveState.Run && h !== CharacterUnifiedStateTypes_1.ECharMoveState.Stand) {
              C = i.MoveParams.CompensateSpeed * t;
              this.l6u(this.tdc, C, o, i.MoveParams.CompensateDistance, "跑步移动状态修正");
            }
            if (this.H5u?.DebugDraw && Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Character", 42, "[KeepFollowing] 跟随参数", ["Dist", r], ["allDist", o], ["rangeType", this.kud], ["dot", a], ["followerMoveState", E], ["LeaderSpeed", T]);
            }
            this._6u(t, T, r, o, h);
            AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.Hte, this.tdc, e);
          }
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[KeepFollowing] 计算目标点时，未检测到地面或遇到障碍物");
        }
        this.o6u();
      }
    }
  }
  $Yd() {
    if (this.XQd) {
      this.KQd = 0;
      this.XQd = false;
    }
  }
  _6u(t, i, s, e, h) {
    var o;
    var r = this.H5u;
    var a = r?.Leader;
    if (this.j5u && r && a && this.Hte && this.Gce) {
      this.Y5u = true;
      a = this.Z5u === CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
      o = s - r.MoveParams.ToleranceDistance;
      s = s < r.MoveParams.ToleranceDistance ? DECELERATION_SPEED_RATE : 1;
      o = Math.pow(Math.abs(o), 1.5) * s;
      s = i < r.MoveParams.MinFollowingSpeed ? e > DEFAULT_WALK_SPEED ? DEFAULT_RUN_SPEED : DEFAULT_WALK_SPEED : o + i + e;
      e = r.MoveParams.ChangeSpeedAcceleration * t;
      if (this.H5u?.DebugDraw && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[KeepFollowing] 速度变化", ["Speed", s], ["change", o], ["leaderSpeed", i], ["changeSpeed", r.MoveParams.ChangeSpeedAcceleration], ["LastRecordSpeed", this.J5u]);
      }
      s = MathUtils_1.MathUtils.Clamp(s, Math.max(r.MoveParams.FollowingSpeedRange.X, this.J5u - e), Math.min(r.MoveParams.FollowingSpeedRange.Y, this.J5u + e));
      if (this.H5u?.DebugDraw && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[KeepFollowing] 最终速度变化", ["Speed", s]);
      }
      this.Gce.SetMaxSpeed(s);
      this.tdc.Normalize();
      this.Hte.SetInputDirect(this.tdc);
      this.J5u = s;
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
  o6u(t = true) {
    if (this.Y5u && (this.Y5u = false, this.J5u = 0, this.e6u = CharacterUnifiedStateTypes_1.ECharMoveState.Walk, this.Z5u = CharacterUnifiedStateTypes_1.ECharMoveState.Walk, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 42, "[KeepFollowing] StopFollowingMove"), this.Hte.ClearInput(), t) && this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      this.rJo?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
    }
  }
  Bgd(t, i, s, e) {
    if (!this.W5u) {
      this.o6u(e);
      this.s6u(t.ActorForwardProxy, t.ActorLocationProxy, i, s);
    }
  }
  Ugd(t) {
    var i = this.H5u;
    var s = this.kud;
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
    this.kud = t < e ? 0 : t < h ? 1 : t < o ? 2 : 3;
    return [e, h, o];
  }
  h6u(t, i, s, e) {
    var h = this.H5u;
    return !!h?.MoveParams.EnableTimeOutTeleport && !!(i > h.MoveParams.IllegalDistance ? this.t6u += t * BattleUiDefine_1.SECOND_TO_MILLISECOND : this.t6u = 0, this.t6u > h.MoveParams.TimeOutDuration) && !(this.Nad(s, e, "跟随模式,异常距离超时传送"), this.t6u = 0);
  }
  Fad(t, i, s, e, h) {
    var o = this.H5u;
    return !!o?.MoveParams.ObstacleTime && (e < h ? this.qad += t * BattleUiDefine_1.SECOND_TO_MILLISECOND : this.qad = 0, this.qad > o.MoveParams.ObstacleTime) && (this.Nad(i, s, "跟随模式,被阻挡传送"), !(this.qad = 0));
  }
  YQd(t, i, s, e) {
    if (i < e || s < e) {
      this.KQd += t * BattleUiDefine_1.SECOND_TO_MILLISECOND;
    } else {
      this.KQd = 0;
      this.XQd = false;
    }
    return this.KQd > STAND_CHECK_TIME && (this.KQd = 0, this.XQd = true, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 42, "[KeepFollowing] 检测到在范围内位移很小保持站立"), true);
  }
  Nad(t, i, s) {
    if (this.xgd.Equals(t)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[KeepFollowing] 触发传送位置和上一次传送位置相同，不传送", ["context", s], ["target", t]);
      }
    } else {
      this.xgd.DeepCopy(t);
      t = this.H5u;
      if (t.MoveParams.TeleportEffectBuffId.length) {
        var e = this.Jh?.GetComponent(229);
        for (const h of t.MoveParams.TeleportEffectBuffId) {
          e?.AddCue(h, {
            Instant: true
          });
        }
      }
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.xgd, this.Hte.ScaledHalfHeight);
      this.XQd = true;
      this.Hte?.TeleportTo(this.xgd.ToUeVector(), i.ToUeRotator(), s);
      this.Gce?.MoveController.PushMoveInfo();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[KeepFollowing] 触发保底传送", ["context", s], ["target", this.xgd]);
      }
    }
  }
  l6u(i, s, e, h, o, r = false) {
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
      if (this.H5u?.DebugDraw && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[KeepFollowing] 跟随位移补偿", ["context", o], ["dist", a], ["maxCompensate", s], ["allDist", e], ["range", h]);
      }
    }
  }
  GetTargetFollowingPosition(t, i) {
    var s;
    var e = this.H5u;
    if (this.e6u === CharacterUnifiedStateTypes_1.ECharMoveState.Walk) {
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
        l = KeepFollowingMoveLogic.Vad(this.Hte, a, this.tdc, o);
        n = l || KeepFollowingMoveLogic.lPd(this.Hte, a, this.tdc, o, i);
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
  static Vad(t, i, s, e) {
    this.Lz.DeepCopy(s);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, this.Lz, e + DETECT_HEIGHT);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.Lz);
    this.Lz.DeepCopy(s);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, this.Lz, DETECT_HEIGHT);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, this.Lz);
    return TraceElementCommon_1.TraceElementCommon.ShapeTrace(t.Actor.CapsuleComponent, i, PROFILE_KEY, PROFILE_KEY);
  }
  static lPd(t, i, s, e, h) {
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