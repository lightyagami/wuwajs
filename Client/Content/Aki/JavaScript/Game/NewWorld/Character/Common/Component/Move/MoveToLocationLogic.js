"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToPointConfig = exports.MoveToLocation = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const MoveToLocationController_1 = require("./MoveToLocationController");
const MOVE_STATE_CHANGE_SECOND = 1;
const END_DISTANCE = 30;
const DEFAULT_TURN_SPEED = 360;
const RESET_LOCATION_TOLERANCE = 10;
const PER_TICK_MIN_MOVE_SPEED = 30;
class MoveToLocation {
  constructor() {
    this.Jh = undefined;
    this.Hte = undefined;
    this.oRe = undefined;
    this.mBe = undefined;
    this.mie = MOVE_STATE_CHANGE_SECOND;
    this.nRi = -0;
    this.WJo = Vector_1.Vector.Create();
    this.c6a = Vector_1.Vector.Create();
    this.wDe = 0;
    this.KJo = Vector_1.Vector.Create(0, 0, 0);
    this.aqn = Vector_1.Vector.Create(0, 0, 0);
    this.hqn = undefined;
    this.lqn = Vector_1.Vector.Create(0, 0, 0);
    this.dJo = 0;
    this._qn = undefined;
  }
  GetCurrentMoveToLocation() {
    return this.hqn?.Position ?? undefined;
  }
  GetLastMoveToLocation() {
    let t = this.hqn?.Position;
    return (t = this.hqn?.NextMovePointConfig?.Empty ? t : this.hqn?.NextMovePointConfig?.Get(this.hqn.NextMovePointConfig.Size - 1)) ?? undefined;
  }
  GetCurrentDistance() {
    if (this.hqn?.HasNextPoint()) {
      var t = this.GetLastMoveToLocation();
      if (t) {
        if (this.hqn.IsFly) {
          return Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, t);
        } else {
          return Vector_1.Vector.Dist2D(this.Hte.ActorLocationProxy, t);
        }
      }
    }
    return this.nRi;
  }
  Init(t) {
    this.Jh = t;
    this.Hte = this.Jh.GetComponent(3);
    this.mBe = this.Jh.GetComponent(102);
    this.oRe = this.Jh.GetComponent(178);
    this.wDe = this.Hte.CreatureData.GetPbDataId();
  }
  SetMoveToLocation(t) {
    return !!t && (this.ht(), this.uqn(t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("AI", 42, "开始移动。", ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["EntityId", this.Hte.Entity.Id], ["Config", t], ["CollisionEnable", this.Hte.DisableCollisionHandle?.Empty]), true);
  }
  UpdateMove(t) {
    if (this.hqn) {
      if (MoveToLocationController_1.MoveToLocationController.DebugDraw && GlobalData_1.GlobalData.IsPlayInEditor) {
        this.IJo();
      }
      this.mie += t;
      if (this.mie > MOVE_STATE_CHANGE_SECOND) {
        this.mie = 0;
        this.yJo();
      }
      if (this.UpdateMoveToDirection()) {
        if (!!this.cqn() && (!this.hqn.ResetCondition || !!this.hqn.ResetCondition())) {
          this.mqn(t);
        }
        this.MoveEnd(1);
      } else if (this.hqn.ReturnTimeoutFailed && t > MathCommon_1.MathCommon.KindaSmallNumber) {
        this.UJo(t);
      }
    }
  }
  Dispose() {
    this.StopMove();
  }
  UJo(t) {
    if (Math.sqrt(GravityUtils_1.GravityUtils.GetDistSquared2dForActor(this.Hte, this.Hte.ActorLocationProxy, this.Hte.LastActorLocation)) / t > PER_TICK_MIN_MOVE_SPEED) {
      this.dJo = this.hqn.ReturnTimeoutFailed;
    } else {
      this.dJo -= t;
      if (this.dJo <= 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 42, "检测到移动行为不符合预期,持续卡住超时,返回移动失败", ["PbDataId", this.wDe], ["EntityId", this.Jh.Id], ["超时时限", this.hqn.ReturnTimeoutFailed]);
        }
        this.MoveEnd(2);
      }
    }
  }
  UpdateMoveToDirection() {
    var t;
    this.ezo();
    return !!this.tzo() || (this.WJo.Normalize(), this.mBe && this.mBe.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb ? (MoveToLocation.jJo.DeepCopy(this.Hte.ActorQuatProxy), MoveToLocation.jJo.Inverse(MoveToLocation.jJo), MoveToLocation.jJo.RotateVector(this.WJo, this.WJo), t = this.WJo.X, this.WJo.X = this.WJo.Z, this.WJo.Z = t, this.Hte.SetInputDirect(this.WJo)) : (t = this.hqn.TurnSpeed * (this.Jh?.GetTickInterval() ?? 1), this.Hte.SetOverrideTurnSpeed(t), !this.mBe || this.mBe.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk || this.hqn?.IsForward ? (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.Hte, this.WJo, t, this.hqn.IsFly), this.Hte.SetInputDirect(this.Hte.ActorForwardProxy)) : (this.hqn.FaceToPosition && (MoveToLocation.sqn.DeepCopy(this.hqn.FaceToPosition), MoveToLocation.sqn.SubtractionEqual(this.Hte.ActorLocationProxy)), AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(this.Hte, this.WJo, MoveToLocation.jJo, MoveToLocation.RTe, this.hqn.TurnSpeed, this.hqn.UseNearestDirection, this.hqn.FaceToPosition ? MoveToLocation.sqn : undefined))), false);
  }
  StopMove() {
    if (this.hqn) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "StopMove ClearInput", ["PbDataId", this.wDe], ["EntityId", this.Jh.Id]);
      }
      this.ht();
      this.Hte.ClearInput();
      this.hqn?.Clear();
      this.hqn = undefined;
    }
  }
  MoveEnd(t) {
    var i = this.hqn?.UpdateNextPoint();
    if (t === 1 && i) {
      this.HAl();
    } else {
      this.hqn?.RunCallbackList(t);
      this.ht();
      this.StopMove();
      this.hqn?.Clear();
      this.hqn = undefined;
    }
  }
  uqn(t) {
    this.aqn.DeepCopy(this.Hte.ActorLocationProxy);
    if (t instanceof MoveToPointConfig) {
      this.hqn = t;
    } else if (this.hqn) {
      this.hqn.DeepCopy(t);
    } else {
      this.hqn = new MoveToPointConfig(t, this.lqn);
    }
    this.dJo = this.hqn.ReturnTimeoutFailed;
  }
  ht() {
    this.dJo = 0;
    this.aqn.Reset();
    this.KJo.Reset();
  }
  ezo() {
    var t;
    if (this.hqn.UpdateTargetPosition()) {
      this.aqn.DeepCopy(this.Hte.ActorLocationProxy);
    }
    this.WJo.DeepCopy(this.hqn.Position);
    this.WJo.SubtractionEqual(this.Hte.ActorLocationProxy);
    this.c6a.DeepCopy(this.WJo);
    if (this.mBe?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
      MoveToLocation.jye.DeepCopy(this.WJo);
      t = MoveToLocation.jye.DotProduct(this.Hte.ActorForwardProxy);
      MoveToLocation.jye.DeepCopy(this.Hte.ActorForwardProxy);
      MoveToLocation.jye.MultiplyEqual(t);
      MoveToLocation.jye.UnaryNegation(MoveToLocation.jye);
      MoveToLocation.jye.AdditionEqual(this.WJo);
      this.WJo.DeepCopy(MoveToLocation.jye);
    } else if (!this.hqn.IsFly) {
      GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.Hte, this.WJo, 0);
    }
    this.nRi = this.hqn.IsFly ? this.c6a.Size() : Math.sqrt(GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.Hte, this.c6a));
  }
  tzo() {
    if (this.nRi <= this.hqn.Distance) {
      return true;
    }
    this.hqn.Position.Subtraction(this.aqn, MoveToLocation.jye);
    GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.Hte, MoveToLocation.jye, 0);
    MoveToLocation.RTe.DeepCopy(this.c6a);
    GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.Hte, MoveToLocation.RTe, 0);
    var t = MoveToLocation.RTe.DotProduct(MoveToLocation.jye);
    if (t < 0 && (this.dqn(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("AI", 42, "经过了目标位置", ["PbDataId", this.wDe], ["EntityId", this.Jh.Id], ["distance", this.nRi], ["dotProduct", t]);
    }
    return t < 0;
  }
  yJo() {
    var t;
    var i = this.Jh.GetComponent(45);
    if (i) {
      t = this.hqn.MoveSpeed;
      if (this.hqn.IsFly) {
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 5,
          Context: "[MoveToLocation.UpdateMoveStateAndSpeed]"
        });
        if (t) {
          i.SetMaxSpeed(t);
        }
      } else {
        if (t) {
          i.SetMaxSpeed(t);
        }
        if ((i = this.hqn.MoveState) && CharacterUnifiedStateTypes_1.legalMoveStates.get(this.mBe.PositionState).has(i)) {
          this.mBe.SetMoveState(i);
        }
      }
    }
  }
  dqn() {
    this.KJo.DeepCopy(this.hqn.Position);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "经过目标位置，更新拉回点记录", ["PbDataId", this.wDe], ["EntityId", this.Jh.Id], ["LastPatrolPoint", this.KJo], ["CurrentPoint", this.Hte.ActorLocationProxy]);
    }
  }
  mqn(t) {
    var i;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 42, "Reset目标位置", ["PbDataId", this.wDe], ["EntityId", this.Jh.Id], ["deltaSeconds", t], ["LastPatrolPoint", this.KJo], ["CurrentPoint", this.Hte.ActorLocationProxy], ["Distance", Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy)]);
    }
    this.oRe?.MainAnimInstance?.ConsumeExtractedRootMotion(1);
    this.Hte.ClearInput();
    if (this.oRe && this.Jh.GetTickInterval() > 1) {
      i = this.oRe.GetMeshTransform();
      this.rzo();
      this.oRe.SetModelBuffer(i, t * CommonDefine_1.MILLIONSECOND_PER_SECOND * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
    } else {
      this.rzo();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 42, "Reset目标位置结束", ["PbDataId", this.wDe], ["EntityId", this.Jh.Id], ["ActorLocation", this.Hte.ActorLocationProxy], ["Distance", Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy)]);
    }
    this.KJo.Set(0, 0, 0);
  }
  rzo() {
    if (this.hqn.IsFly) {
      this.Hte.SetActorLocation(this.KJo.ToUeVector(), "拉回目标点设置坐标", false);
    } else if (!this.Hte.FixBornLocation("拉回目标点地面修正", true, this.KJo, false, true)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AI", 42, "未能检测到地面，没设置拉回目标点", ["EntityId", this.Jh.Id], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["LastPatrolPoint", this.KJo], ["ActorLocation", this.Hte.ActorLocationProxy]);
      }
    }
  }
  cqn() {
    return !(this.KJo.Size() < 1) && (!(GravityUtils_1.GravityUtils.GetDistSquared2dForActor(this.Hte, this.KJo, this.Hte.ActorLocationProxy) < MathUtils_1.MathUtils.Square(this.hqn.Distance + RESET_LOCATION_TOLERANCE)) || !(this.KJo.Set(0, 0, 0), 1));
  }
  HAl() {
    MoveToLocation.jye.DeepCopy(this.hqn.Position);
    MoveToLocation.jye.SubtractionEqual(this.Hte.ActorLocationProxy);
    if (!this.hqn?.IsFly) {
      GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.Hte, MoveToLocation.jye, 0);
    }
    MoveToLocation.jye.Normalize();
    this.Hte?.ClearInput();
    this.Hte?.SetInputDirect(MoveToLocation.jye);
    var t = this.Hte.ActorVelocityProxy.Size();
    MoveToLocation.jye.MultiplyEqual(t);
    this.Hte.ActorVelocityProxy.Set(MoveToLocation.jye.X, MoveToLocation.jye.Y, MoveToLocation.jye.Z);
  }
  IJo() {
    if (this.hqn && GlobalData_1.GlobalData.IsPlayInEditor) {
      this._qn ||= new UE.LinearColor(Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, 0);
      var i = this.hqn;
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, this.Hte.ActorLocation, 30, 10, this._qn);
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, this.hqn.Position.ToUeVector(), 30, 10, this._qn);
      if (i.NextMovePointConfig) {
        for (let t = 0; t < i.NextMovePointConfig.Size; t++) {
          UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, i.NextMovePointConfig.Get(t).ToUeVector(), 30, 10, this._qn);
        }
      }
    }
  }
}
(exports.MoveToLocation = MoveToLocation).jye = Vector_1.Vector.Create();
MoveToLocation.RTe = Vector_1.Vector.Create();
MoveToLocation.sqn = Vector_1.Vector.Create();
MoveToLocation.jJo = Quat_1.Quat.Create();
class MoveToPointConfig {
  constructor(t, i) {
    this.Cqn = undefined;
    this.ReferencePosition = undefined;
    this.IsFly = false;
    this.IsForward = false;
    this.ReturnTimeoutFailed = 0;
    this.Distance = MoveToPointConfig.DefaultDistance;
    this.TurnSpeed = MoveToPointConfig.DefaultTurnSpeed;
    this.MoveState = undefined;
    this.UseNearestDirection = false;
    this.MoveSpeed = undefined;
    this.NextMovePointConfig = undefined;
    this.FaceToPosition = undefined;
    this.ResetCondition = undefined;
    this.CallbackList = undefined;
    this.Cqn = i || Vector_1.Vector.Create();
    this.Cqn.DeepCopy(t.Position);
    this.NextMovePointConfig = t.NextMovePointConfig ?? undefined;
    this.Distance = t.Distance ?? MoveToPointConfig.DefaultDistance;
    this.TurnSpeed = t.TurnSpeed ?? MoveToPointConfig.DefaultTurnSpeed;
    this.MoveState = t.MoveState ?? undefined;
    this.IsFly = t.IsFly ?? false;
    this.IsForward = t.IsForward ?? false;
    this.ReturnTimeoutFailed = t.ReturnTimeoutFailed ?? 0;
    this.UseNearestDirection = t.UseNearestDirection ?? false;
    this.MoveSpeed = t.MoveSpeed ?? undefined;
    this.FaceToPosition = t.FaceToPosition ?? undefined;
    this.CallbackList = [];
    if (t.CallbackList && t.CallbackList.length > 0) {
      this.CallbackList.push(...t.CallbackList);
    }
    if (t.ResetCondition) {
      this.ResetCondition = t.ResetCondition;
    }
    if (t.ReferencePosition) {
      this.ReferencePosition = t.ReferencePosition;
    }
  }
  get Position() {
    return this.Cqn;
  }
  UpdateTargetPosition() {
    return !!this.ReferencePosition && !this.HasNextPoint() && !(this.Cqn.DeepCopy(this.ReferencePosition()), 0);
  }
  DeepCopy(t) {
    this.Cqn.DeepCopy(t.Position);
    this.Distance = t.Distance ?? MoveToPointConfig.DefaultDistance;
    this.TurnSpeed = t.TurnSpeed ?? MoveToPointConfig.DefaultTurnSpeed;
    this.MoveState = t.MoveState ?? undefined;
    this.IsFly = t.IsFly ?? false;
    this.IsForward = t.IsForward ?? false;
    this.ReturnTimeoutFailed = t.ReturnTimeoutFailed ?? 0;
    this.UseNearestDirection = t.UseNearestDirection ?? false;
    this.MoveSpeed = t.MoveSpeed;
    this.FaceToPosition = t.FaceToPosition;
    this.CallbackList = t.CallbackList;
    this.ResetCondition = t.ResetCondition;
    this.ReferencePosition = t.ReferencePosition;
    this.NextMovePointConfig = t.NextMovePointConfig;
  }
  RunCallbackList(t) {
    if (this.CallbackList && this.CallbackList.length !== 0) {
      for (const i of this.CallbackList) {
        if (i) {
          i(t);
        }
      }
    }
  }
  Clear() {
    if (this.CallbackList) {
      this.CallbackList.length = 0;
    }
    this.ResetCondition = undefined;
    this.NextMovePointConfig = undefined;
  }
  UpdateNextPoint() {
    var t;
    return !!this.NextMovePointConfig && !this.NextMovePointConfig.Empty && !(t = this.NextMovePointConfig.Pop(), this.Cqn.DeepCopy(t), 0);
  }
  HasNextPoint() {
    return (this.NextMovePointConfig && !this.NextMovePointConfig.Empty) ?? false;
  }
}
(exports.MoveToPointConfig = MoveToPointConfig).DefaultDistance = END_DISTANCE;
MoveToPointConfig.DefaultTurnSpeed = DEFAULT_TURN_SPEED; //# sourceMappingURL=MoveToLocationLogic.js.map