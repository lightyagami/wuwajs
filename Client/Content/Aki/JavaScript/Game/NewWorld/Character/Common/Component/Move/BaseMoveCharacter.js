"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseMoveCharacter = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const LogAnalyzer_1 = require("../../../../../../Core/Common/LogAnalyzer");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../../Core/Net/Net");
const MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent");
const AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../../../Utils/ColorUtils");
const CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
const WorldFunctionLibrary_1 = require("../../../../../World/Bridge/WorldFunctionLibrary");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const MoveToLocationController_1 = require("./MoveToLocationController");
const PatrolMoveLogic_1 = require("./PatrolMoveLogic");
const PatrolMovePointsLogic_1 = require("./PatrolMovePointsLogic");
const DEFAULT_TURN_SPEED = 360;
const END_DISTANCE = 30;
const NAV_DISTANCE = 200;
const NO_RESET_ANGLE = 20;
const NO_RESET_DISTANCE = 50;
const PER_TICK_MIN_MOVE_SPEED = 30;
const WHILE_UPDATE_MOVE_POINT_COUNT = 2;
const IS_WITH_EDITOR = cpp_1.KuroApplication.IsWithEditor() ? 1 : undefined;
class BaseMoveCharacter {
  constructor() {
    this.wDe = 0;
    this.Jh = undefined;
    this.Hte = undefined;
    this.rJo = undefined;
    this.JLe = undefined;
    this.nJo = 0;
    this.sJo = false;
    this.aJo = false;
    this.lJo = 0;
    this._Jo = false;
    this.uJo = Vector_1.Vector.Create();
    this.cJo = false;
    this.mJo = 0;
    this.dJo = 0;
    this.CJo = 0;
    this.jye = Vector_1.Vector.Create();
    this.RTe = Vector_1.Vector.Create();
    this.gJo = Vector_1.Vector.Create();
    this.fJo = undefined;
    this.tKo = undefined;
    this.hse = undefined;
    this.mie = 0;
    this.Ero = false;
    this.vJo = undefined;
    this.MJo = new PatrolMovePointsLogic_1.PatrolMovePointsLogic();
    this.EJo = new PatrolMoveLogic_1.PatrolMoveLogic();
    this.SJo = t => {
      if (this.vJo) {
        this.vJo(t);
      }
    };
    this.PushMoveInfo = () => {
      var t = Protocol_1.Aki.Protocol.ecs.create();
      var i = Protocol_1.Aki.Protocol.Zks.create();
      i.F4n = MathUtils_1.MathUtils.NumberToLong(this.Hte.CreatureData.GetCreatureDataId());
      i.P5n = this.Hte.ActorLocationProxy;
      i.g8n = undefined;
      t.iVn = [i];
      Net_1.Net.Send(27349, t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "向服务器同步NPC位置", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe], ["X", i.P5n.X], ["Y", i.P5n.Y], ["Z", i.P5n.Z]);
      }
    };
    this.xsa = (t, i) => {
      var e;
      if (this.MJo.TargetPoint && (e = this.bJo(this.MJo.TargetPoint.MoveState)) && CharacterUnifiedStateTypes_1.legalMoveStates.get(i).has(e)) {
        this.rJo.SetMoveState(e);
      }
    };
    this.Eac = false;
  }
  get CurrentToLocation() {
    return this.MJo.TargetPoint.Position;
  }
  Init(t) {
    this.Jh = t;
    this.Hte = this.Jh.GetComponent(3);
    this.rJo = this.Jh.GetComponent(111);
    this.wDe = this.Hte.CreatureData.GetPbDataId();
    this.fJo = [];
    this.Ero = false;
    this.MJo.Init(this.Hte);
    this.EJo.Init(this.Jh);
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.CharOnPositionStateChanged, this.xsa)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharOnPositionStateChanged, this.xsa);
    }
  }
  UpdateMove(t) {
    if (this.IsRunning) {
      if (this.MJo.TargetPoint) {
        this.mie += t;
        if (this.mie > 1) {
          this.mie = 0;
          this.yJo();
        }
        if (GlobalData_1.GlobalData.IsPlayInEditor && MoveToLocationController_1.MoveToLocationController.DebugDraw) {
          this.IJo();
        }
        this.Dlh(t);
      } else {
        this.MoveEnd(2);
      }
    }
  }
  Dlh(t) {
    let i = false;
    let e = false;
    var s = this.sJo || this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
    let h = this.EJo.UpdateMove(t);
    let r = 0;
    while (!h && this.IsRunning && r < WHILE_UPDATE_MOVE_POINT_COUNT) {
      r++;
      e = e || this.MJo.TargetPoint.Index >= 0;
      this.TJo();
      if (this.MJo.CheckMoveLastPoint()) {
        const h = this.EJo.ResetLastPointCondition();
        if (!s && h) {
          this.mqn(t);
        }
        this.RJo();
        this.MoveEnd(1);
        return;
      }
      i = true;
      if (!this.LJo()) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 42, "未能正常获取下个移动点，巡逻失败结束", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe]);
        }
        this.MoveEnd(2);
        return;
      }
      if (this.JLe?.ResetAllPoints) {
        break;
      }
      h = this.EJo.UpdateMove(t);
    }
    if (!s && this.EJo.ResetLastPointCondition() && this.DJo()) {
      this.mqn(t);
    }
    if (i && e) {
      this.RJo();
    }
    if (this.cJo && t > MathCommon_1.MathCommon.KindaSmallNumber) {
      this.UJo(t, i);
    }
  }
  mqn(t) {
    this.EJo.ResetLastPatrolPoint(t);
    this.jye.DeepCopy(this.CurrentToLocation);
    this.jye.SubtractionEqual(this.Hte.ActorLocationProxy);
    if (!this.sJo) {
      this.jye.Z = 0;
    }
    this.jye.Normalize();
    this.Hte?.ClearInput();
    this.Hte?.SetInputDirect(this.jye);
    t = this.Hte.ActorVelocityProxy.Size();
    this.jye.MultiplyEqual(t);
    this.Hte.ActorVelocityProxy.Set(this.jye.X, this.jye.Y, this.jye.Z);
  }
  UJo(t, i) {
    var e = Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, this.CurrentToLocation);
    if (Math.abs(this.CJo - e) / t > PER_TICK_MIN_MOVE_SPEED || this.CJo === 0 || i) {
      this.dJo = this.mJo;
    } else {
      this.dJo -= t;
      if (this.dJo <= 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 42, "检测到移动行为不符合预期,持续卡住超时,返回移动失败", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe], ["超时时限", this.mJo]);
        }
        this.MoveEnd(2);
        return;
      }
    }
    this.CJo = e;
  }
  LJo() {
    this._Jo &&= false;
    return this.MJo.ChangeToNextPoint() && this.AJo(this.MJo.GetPreviousLocation(), this.MJo.TargetPoint.Position, this.aJo, false);
  }
  DJo() {
    if (this.JLe?.ResetAllPoints) {
      return true;
    }
    var t = this.MJo.GetPreviousLocation();
    if (!t) {
      return false;
    }
    this.jye.DeepCopy(this.Hte.ActorLocationProxy);
    this.jye.SubtractionEqual(t);
    if (!this.sJo) {
      this.jye.Z = 0;
    }
    var i = this.jye.Size();
    this.RTe.DeepCopy(this.CurrentToLocation);
    this.RTe.SubtractionEqual(t);
    if (!this.sJo) {
      this.RTe.Z = 0;
    }
    var t = this.RTe.Size();
    return i !== 0 && t !== 0 && (i = this.jye.DotProduct(this.RTe) / (i * t), i = MathCommon_1.MathCommon.RadToDeg * Math.acos(i), this.jye.CrossProduct(this.RTe, this.jye), t = this.jye.Size() / t, !(i > 0) || !(i < NO_RESET_ANGLE) || !(t < NO_RESET_DISTANCE));
  }
  StopMove() {
    var t;
    if (this.IsRunning) {
      this.Hte.ClearInput();
      t = this.MJo.UpdatePreIndex();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "中断巡逻", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe], ["Index", this.MJo.TargetIndex], ["PreIndex", t], ["CurrentLoc", this.Hte.ActorLocationProxy]);
      }
      this.PJo();
    }
  }
  Dispose() {
    this.PJo();
  }
  PJo() {
    this.EJo.StopMove();
    this.fJo = [];
    this.Ero = false;
    this._Jo = true;
    this.uJo.DeepCopy(this.Hte.ActorLocationProxy);
    if (this.Jh && EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.CharOnPositionStateChanged, this.xsa)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharOnPositionStateChanged, this.xsa);
    }
  }
  MoveAlongPath(i) {
    if (this.Hte) {
      this.Ero = true;
      this.JLe = i;
      this.lJo = i.TurnSpeed ?? DEFAULT_TURN_SPEED;
      this.aJo = i.Navigation && !i.IsFly;
      this.nJo = i.Distance ?? END_DISTANCE;
      this.vJo = i.Callback;
      if (i.ReturnTimeoutFailed && i.ReturnTimeoutFailed !== 0) {
        this.cJo = true;
        this.mJo = i.ReturnTimeoutFailed;
        this.dJo = i.ReturnTimeoutFailed;
      } else {
        this.cJo = false;
      }
      this.MJo.UpdateMovePoints(i);
      this.sJo = this.MJo.TargetPoint?.PosState === CharacterUnifiedStateTypes_1.ECharPositionState.Air || i.IsFly;
      this.yJo();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "开始巡逻", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe], ["循环巡逻", i.Loop], ["环形巡逻", i.CircleMove ?? false], ["飞行模式", this.sJo], ["寻路", this.aJo], ["容差", this.nJo], ["碰撞启用", this.Hte?.DisableCollisionHandle?.Empty]);
      }
      var e = Vector_1.Vector.Dist2D(this.uJo, this.Hte.ActorLocationProxy);
      let t = false;
      if (i.UsePreviousIndex && this._Jo && e > this.nJo) {
        t = this.AJo(this.uJo, this.MJo.TargetPoint.Position, e > NAV_DISTANCE || this.aJo, true);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "恢复中断巡逻", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe], ["当前目标点Index", this.MJo.TargetIndex], ["PreLocation", this.uJo], ["Current", this.Hte.ActorLocationProxy]);
        }
      } else {
        this._Jo = false;
        t = this.AJo(undefined, this.MJo.TargetPoint.Position, this.aJo || !!i.NavigateToStartPos, true);
      }
      if (!t) {
        this.MoveEnd(2);
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 42, "未正常生成寻路路径，巡逻失败结束", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe]);
        }
      }
    } else {
      e = this.Jh?.GetComponent(0);
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AI", 50, "[BaseMoveCharacter.MoveAlongPath]获取ActorComp失败", ["PbDataId", e?.GetPbDataId()]);
      }
    }
  }
  MoveEnd(t) {
    this._Jo = false;
    this.StopMove();
    this.MJo.Reset();
    this.SJo(t);
    if (this.Eac) {
      this.Iac(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
      this.Eac = false;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "结束巡逻", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe], ["EndState", t]);
    }
  }
  AJo(t, i, e, s) {
    this.tKo = [];
    if (!!s || !t) {
      this.gJo.DeepCopy(this.Hte.LastActorLocation);
      if (!this.sJo) {
        this.gJo.Z -= this.Hte.HalfHeight;
      }
      this.tKo.push(this.gJo);
    }
    if (t) {
      this.tKo.push(t);
    }
    this.tKo.push(i);
    if (e) {
      this.hse = [];
      this.hse.push(this.tKo[0]);
      for (let t = 0; t < this.tKo.length - 1; t++) {
        this.fJo = [];
        if (Vector_1.Vector.Dist2D(this.tKo[t], this.tKo[t + 1]) < this.nJo) {
          this.hse.push(this.tKo[t + 1]);
        } else if (this.xJo(this.tKo[t], this.tKo[t + 1], this.fJo)) {
          for (let t = 1; t < this.fJo.length; t++) {
            this.hse.push(this.fJo[t]);
          }
        } else {
          if (this.JLe?.ReturnFalseWhenNavigationFailed) {
            return false;
          }
          this.hse.push(this.tKo[t + 1]);
        }
      }
      this.EJo.UpdateMovePath(this.hse, this.sJo, this.lJo, this.nJo);
    } else {
      this.EJo.UpdateMovePath(this.tKo, this.sJo, this.lJo, this.nJo);
    }
    return true;
  }
  xJo(t, i, e) {
    return AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(this.Hte.Owner.GetWorld(), t.ToUeVector(), i.ToUeVector(), e, false, this.JLe?.StrictNavigation) && e.length > 0;
  }
  TJo() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "到达点", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe], ["TargetIndex", this.MJo.TargetIndex], ["MovePoint.length", this.MJo.MovePoint.length], ["飞行模式", this.sJo], ["寻路", this.aJo]);
    }
    this.yJo();
    this.MJo.OnArriveMovePoint();
    if (this.MJo.TargetPoint?.PosState) {
      this.sJo = this.MJo.TargetPoint?.PosState === CharacterUnifiedStateTypes_1.ECharPositionState.Air;
    }
  }
  RJo() {
    var t;
    if (!this.JLe?.NoAsyncPoint) {
      if ((t = WorldFunctionLibrary_1.default.GetEntityTypeByEntity(this.Hte.Entity.Id)) === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
        this.wJo();
      }
      if (t === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
        this.BJo();
      }
    }
  }
  BJo() {
    var t = this.Hte.Entity.GetComponent(73);
    var i = t.GetCurrentMoveSample();
    i.P5n = this.Hte.ActorLocationProxy;
    t.PendingMoveInfos.push(i);
    var e = Protocol_1.Aki.Protocol.Yus.create();
    e.uhh = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    e.WRs.push(t.CollectPendingMoveInfos());
    Net_1.Net.Send(16626, e);
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      t = {
        scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
        instance_id: ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        msg_id: 16626,
        immediately: true,
        sub_count: e.WRs.length,
        is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
        ed: IS_WITH_EDITOR,
        br: LogAnalyzer_1.LogAnalyzer.GetBranch()
      };
      e = JSON.stringify(t);
      CombatDebugController_1.CombatDebugController.DataReport("COMBAT_MESSAGE_COUNT", e);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "向服务器同步怪物位置", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe], ["X", i.P5n.X], ["Y", i.P5n.Y], ["Z", i.P5n.Z]);
    }
  }
  wJo() {
    var t = Protocol_1.Aki.Protocol.Zks.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(this.Hte.CreatureData.GetCreatureDataId());
    t.P5n = this.Hte.ActorLocationProxy;
    t.g8n = this.Hte.ActorRotationProxy;
    var i = Protocol_1.Aki.Protocol.ecs.create();
    i.iVn = [t];
    Net_1.Net.Send(27349, i);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "向服务器同步NPC位置", ["EntityId", this.Jh.Id], ["PbDataId", this.wDe], ["X", t.P5n.X], ["Y", t.P5n.Y], ["Z", t.P5n.Z]);
    }
  }
  yJo() {
    var t;
    var i;
    if (this.MJo.TargetPoint && (i = this.Jh.GetComponent(48))) {
      t = this.MJo.TargetPoint.MoveSpeed;
      if (this.sJo) {
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 5,
          Context: "[BaseMoveCharacter.UpdateMoveStateAndSpeed]"
        });
        if (t) {
          i.SetMaxSpeed(t);
        }
      } else {
        if (t) {
          i.SetMaxSpeed(t);
        }
        if ((i = this.bJo(this.MJo.TargetPoint.MoveState)) && CharacterUnifiedStateTypes_1.legalMoveStates.get(this.rJo.PositionState).has(i)) {
          if (i === CharacterUnifiedStateTypes_1.ECharMoveState.Walk || i === CharacterUnifiedStateTypes_1.ECharMoveState.Run) {
            this.Iac(i);
          }
          this.rJo.SetMoveState(i);
        }
      }
    }
  }
  Iac(t) {
    if (this.Hte?.IsRoleAndCtrlByMe && (0, RegisterComponent_1.isComponentInstance)(this.rJo, 186)) {
      this.rJo.MarkWalkOrRun(t === CharacterUnifiedStateTypes_1.ECharMoveState.Walk, false);
      this.Eac = t === CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
    }
  }
  bJo(t) {
    if (t && this.rJo?.Valid) {
      switch (t) {
        case IComponent_1.EPatrolMoveState.Walk:
          if (this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
            return CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim;
          } else if (this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
            return CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb;
          } else {
            return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
          }
        case IComponent_1.EPatrolMoveState.Run:
          if (this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
            return CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim;
          } else if (this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
            return CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb;
          } else {
            return CharacterUnifiedStateTypes_1.ECharMoveState.Run;
          }
        case IComponent_1.EPatrolMoveState.Sprint:
          if (this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
            return CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim;
          } else if (this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
            return CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb;
          } else {
            return CharacterUnifiedStateTypes_1.ECharMoveState.Sprint;
          }
      }
    }
  }
  IJo() {
    if (this.MJo.MovePoint.length !== 0 && GlobalData_1.GlobalData.IsPlayInEditor) {
      for (let t = this.MJo.MovePoint.length - 1; t > -1; t--) {
        var i = this.MJo.MovePoint[t].Position;
        UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, i.ToUeVector(), 30, 10, t === this.MJo.TargetIndex ? ColorUtils_1.ColorUtils.LinearYellow : ColorUtils_1.ColorUtils.LinearWhite, 1);
      }
    }
  }
  get IsRunning() {
    return this.Ero;
  }
}
exports.BaseMoveCharacter = BaseMoveCharacter;
//# sourceMappingURL=BaseMoveCharacter.js.map