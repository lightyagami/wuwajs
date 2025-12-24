"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const NONE_PATH = "None";
const BLINK_STATE = 3;
const SKILL_STATE = 4;
class TsTaskWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.RandomRadius = 0;
    this.MinWanderDistance = 0;
    this.MaxNavigationMillisecond = 0;
    this.MoveStateForWanderOrReset = true;
    this.MaxStopTime = 0;
    this.BlinkTime = 0;
    this.UsePatrolPointPriority = true;
    this.ShowEffectDa = undefined;
    this.HideEffectDa = undefined;
    this.ShowMaterialDa = undefined;
    this.HideMaterialDa = undefined;
    this.Debug = false;
    this.SelectedTargetLocation = Vector_1.Vector.Create();
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.NavigationEndTime = -0;
    this.InBlink = false;
    this.StopTimeCount = 0;
    this.BlinkTimeCount = 0;
    this.PreLocation = undefined;
    this.ShowMaterialData = undefined;
    this.HideMaterialData = undefined;
    this.MoveStateActural = 0;
    this.IsInitTsVariables = false;
    this.TsRandomRadius = 0;
    this.TsMinWanderDistance = 0;
    this.TsMaxNavigationMillisecond = 0;
    this.TsMoveStateForWanderOrReset = false;
    this.TsMaxStopTime = 0;
    this.TsBlinkTime = 0;
    this.TsUsePatrolPointPriority = false;
    this.TsShowEffectDa = "";
    this.TsHideEffectDa = "";
    this.TsShowMaterialDa = "";
    this.TsHideMaterialDa = "";
    this.TsDebug = false;
    this.CacheVector = Vector_1.Vector.Create();
  }
  Constructor() {
    super.Constructor();
    this.SelectedTargetLocation = Vector_1.Vector.Create();
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.NavigationEndTime = -0;
    this.InBlink = false;
    this.StopTimeCount = 0;
    this.BlinkTimeCount = 0;
    this.PreLocation = undefined;
    this.ShowMaterialData = undefined;
    this.HideMaterialData = undefined;
    this.MoveStateActural = 0;
    this.IsInitTsVariables = false;
    this.TsRandomRadius = 0;
    this.TsMinWanderDistance = 0;
    this.TsMaxNavigationMillisecond = 0;
    this.TsMoveStateForWanderOrReset = false;
    this.TsMaxStopTime = 0;
    this.TsBlinkTime = 0;
    this.TsUsePatrolPointPriority = false;
    this.TsShowEffectDa = "";
    this.TsHideEffectDa = "";
    this.TsShowMaterialDa = "";
    this.TsHideMaterialDa = "";
    this.TsDebug = false;
    this.CacheVector = Vector_1.Vector.Create();
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsRandomRadius = this.RandomRadius;
      this.TsMinWanderDistance = this.MinWanderDistance;
      this.TsMaxNavigationMillisecond = this.MaxNavigationMillisecond;
      this.TsMoveStateForWanderOrReset = this.MoveStateForWanderOrReset;
      this.TsMaxStopTime = this.MaxStopTime;
      this.TsBlinkTime = this.BlinkTime;
      this.TsUsePatrolPointPriority = this.UsePatrolPointPriority;
      this.TsShowEffectDa = this.ShowEffectDa ? this.ShowEffectDa.AssetPathName.toString() : "";
      this.TsShowEffectDa = this.TsShowEffectDa === NONE_PATH ? "" : this.TsShowEffectDa;
      this.TsHideEffectDa = this.HideEffectDa ? this.HideEffectDa.AssetPathName.toString() : "";
      this.TsHideEffectDa = this.TsHideEffectDa === NONE_PATH ? "" : this.TsHideEffectDa;
      this.TsShowMaterialDa = this.ShowMaterialDa ? this.ShowMaterialDa.AssetPathName.toString() : NONE_PATH;
      this.TsHideMaterialDa = this.HideMaterialDa ? this.HideMaterialDa.AssetPathName.toString() : NONE_PATH;
      this.TsDebug = this.Debug;
      this.SelectedTargetLocation = Vector_1.Vector.Create();
      this.CacheVector = Vector_1.Vector.Create();
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s = t.AiController;
    if (s) {
      var e;
      var h = s.AiWanderInfos?.AiWander;
      if (h) {
        this.MoveStateActural = this.TsMoveStateForWanderOrReset ? h.WanderMoveState : h.ResetMoveState;
        this.TsShowEffectDa = h.ShowEffectDaPath;
        this.TsHideEffectDa = h.HideEffectDaPath;
        this.TsShowMaterialDa = h.ShowMaterialDaPath;
        this.TsHideMaterialDa = h.HideMaterialDaPath;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "[TsTaskWander]没有配置AiWander", ["AiBaseId", s.AiBase.Id]);
        }
        this.MoveStateActural = 2;
      }
      if (s.AiWanderRadiusConfig) {
        this.TsRandomRadius = s.AiWanderRadiusConfig.RandomRadius;
        this.TsMinWanderDistance = s.AiWanderRadiusConfig.MinWanderDistance;
      }
      var r = s.CharActorComp;
      var o = Vector_1.Vector.Create();
      if (this.TsUsePatrolPointPriority && s.AiPatrol.HasPatrolConfig() && (e = s.AiPatrol.GetLastPatrolPoint())) {
        o.DeepCopy(e);
      } else {
        o.DeepCopy(s.CharActorComp.GetInitLocation());
      }
      this.FindNavPoint(t, o, r);
      this.CheckPreLocationDistance(r, 0);
      switch (this.MoveStateActural) {
        case 1:
        case 2:
          this.NavigationPath ||= new Array();
          if (r.Entity.GetComponent(109)?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
            this.CacheVector.DeepCopy(r.FloorLocation);
          } else {
            this.CacheVector.DeepCopy(r.ActorLocationProxy);
          }
          this.FoundPath = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(t, this.CacheVector.ToUeVector(), this.SelectedTargetLocation.ToUeVector(), this.NavigationPath);
          if (!this.FoundPath) {
            if (this.TsMoveStateForWanderOrReset) {
              this.Finish(false);
              return;
            }
            if (this.BlinkMoveBegin(r, true)) {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("BehaviorTree", 57, "[TsTaskWander]AiWander怪物复位寻路失败", ["Type", t.GetClass().GetName()]);
              }
              return;
            }
          }
          this.CurrentNavigationIndex = 1;
          this.NavigationEndTime = Time_1.Time.WorldTime + this.TsMaxNavigationMillisecond;
          var a = r.Entity.CheckGetComponent(109);
          if (a.Valid) {
            switch (this.MoveStateActural) {
              case 1:
                a.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
                break;
              case 2:
                a.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
            }
          }
          break;
        case BLINK_STATE:
          this.BlinkMoveBegin(r);
          break;
        case SKILL_STATE:
          this.UseSkill(r, h);
      }
      this.SetAiSceneEnable(s, false);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "[TsTaskWander]错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FoundPath = false;
    }
  }
  FindNavPoint(i, s, e) {
    let t = 5;
    var h = e.MoveComp;
    var r = !h || h.IsStandardGravity;
    for (; t > 0; --t) {
      var o = (0, puerts_1.$ref)(undefined);
      let t = false;
      if (r) {
        t = UE.NavigationSystemV1.D_K2_GetRandomLocationInNavigableRadius(i, s.ToUeVector(), o, this.TsRandomRadius);
        this.SelectedTargetLocation.FromUeVector((0, puerts_1.$unref)(o));
      } else {
        t = true;
        o = MathUtils_1.MathUtils.GetRandomFloatNumber(0, Math.PI * 2);
        this.SelectedTargetLocation.Set(Math.cos(o), Math.sin(o), 0);
        e.ActorQuatProxy.RotateVector(this.SelectedTargetLocation, this.SelectedTargetLocation);
        o = Math.sqrt(MathUtils_1.MathUtils.GetRandomFloatNumber(this.TsMinWanderDistance * this.TsMinWanderDistance, this.TsRandomRadius * this.TsRandomRadius));
        this.SelectedTargetLocation.MultiplyEqual(o);
        this.SelectedTargetLocation.AdditionEqual(e.FloorLocation);
      }
      if (t && Vector_1.Vector.DistSquared(this.SelectedTargetLocation, e.ActorLocationProxy) > this.TsMinWanderDistance * this.TsMinWanderDistance) {
        break;
      }
    }
    let a = false;
    if (!(a = Vector_1.Vector.DistSquared(this.SelectedTargetLocation, e.ActorLocationProxy) <= this.TsRandomRadius * this.TsRandomRadius ? true : a)) {
      this.FoundPath = false;
      this.NavigationPath = undefined;
      this.SelectedTargetLocation.DeepCopy(s);
    }
  }
  SetAiSceneEnable(t, i) {
    if (!this.TsMoveStateForWanderOrReset) {
      t.AiPerception.SetAllAiSenseEnable(i);
    }
  }
  ReceiveTickAI(t, i, s) {
    var e;
    var h;
    var r;
    var o = t.AiController;
    if (o) {
      if (this.FoundPath || this.InBlink) {
        e = o.CharActorComp;
        if (this.TsDebug) {
          this.DrawDebugPath(e);
        }
        if (this.InBlink) {
          this.BlinkMoveTick(e, s);
        } else if (!!this.TsMoveStateForWanderOrReset || !(Time_1.Time.WorldTime > this.NavigationEndTime) || !(Log_1.Log.CheckWarn() && Log_1.Log.Warn("BehaviorTree", 57, "[TsTaskWander]AiWander怪物复位超时，瞬移回目标点", ["Type", t.GetClass().GetName()]), this.BlinkMoveBegin(e, true))) {
          (h = Vector_1.Vector.Create(this.NavigationPath[this.CurrentNavigationIndex])).Subtraction(e.ActorLocationProxy, h);
          h.Z = 0;
          if ((r = h.Size()) <= o.AiWanderInfos.AiWander.CompleteDistance && (this.CurrentNavigationIndex++, this.CurrentNavigationIndex === this.NavigationPath.length)) {
            this.Finish(true);
          } else {
            h.DivisionEqual(r);
            e.SetInputDirect(h, true);
            AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(e, h, o.AiWanderInfos.AiWander.TurnSpeed);
            if (!this.TsMoveStateForWanderOrReset && !this.CheckPreLocationDistance(e, s)) {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("BehaviorTree", 57, "[TsTaskWander]AiWander怪物游荡卡住超时，瞬移回目标点", ["Type", t.GetClass().GetName()]);
              }
              this.BlinkMoveBegin(e, true);
            }
          }
        }
      } else {
        this.Finish(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  OnClear() {
    var t;
    if (this.AIOwner instanceof TsAiController_1.default) {
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
      this.SetAiSceneEnable(this.AIOwner.AiController, true);
      if (this.InBlink && (this.AIOwner.AiController.CharActorComp.Actor.SetActorEnableCollision(true), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("BehaviorTree", 57, "[TsTaskWander]AiWander[OnClear]怪物闪烁导致Actor碰撞为True", ["Actor:", this.AIOwner.AiController.CharActorComp.Actor.GetName()]);
      }
      if (this.HideMaterialData && this.HideMaterialData >= 0) {
        this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.HideMaterialData);
        this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.ResetAllRenderingState();
      }
      if (this.ShowMaterialData && this.ShowMaterialData >= 0) {
        this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.ShowMaterialData);
        this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.ResetAllRenderingState();
      }
      if (!this.TsMoveStateForWanderOrReset) {
        t = this.AIOwner.AiController.CharActorComp.Entity;
        EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.AiTaskWanderForResetEnd);
      }
    }
    this.NavigationPath = undefined;
    this.FoundPath = false;
    this.InBlink = false;
    this.BlinkTimeCount = 0;
    this.StopTimeCount = 0;
    this.HideMaterialData = undefined;
    this.ShowMaterialData = undefined;
  }
  CheckPreLocationDistance(t, i) {
    var s;
    if (this.PreLocation) {
      s = t.ActorLocationProxy;
      if (Vector_1.Vector.DistSquared(this.PreLocation, s) < MathUtils_1.MathUtils.MillisecondToSecond) {
        this.StopTimeCount += i;
      } else {
        this.StopTimeCount = 0;
      }
      this.PreLocation.DeepCopy(s);
      return !(this.StopTimeCount > this.TsMaxStopTime);
    } else {
      this.PreLocation = Vector_1.Vector.Create(t.ActorLocation);
      return !(this.StopTimeCount = 0);
    }
  }
  BlinkMoveBegin(i, t = false) {
    return (this.MoveStateActural === BLINK_STATE || !!t) && !(t && (this.MoveStateActural = BLINK_STATE), this.InBlink = true, this.BlinkTimeCount = 0, this.ShowMaterialData = undefined, this.HideMaterialData = undefined, i.Actor.SetActorEnableCollision(false), Log_1.Log.CheckInfo() && Log_1.Log.Info("BehaviorTree", 57, "[TsTaskWander]AiWander[BlinkMoveBegin]怪物闪烁导致Actor碰撞为False", ["Actor:", i.Actor.GetName()]), this.TsHideEffectDa !== "" && (t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, this.TsHideEffectDa, "[TsTaskWander.BlinkMoveBegin] hideEffect", new EffectContext_1.EffectContext(i.Entity.Id)), (t = EffectSystem_1.EffectSystem.GetEffectActor(t)) ? t.D_K2_SetActorLocation(i.ActorLocation, false, undefined, false) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("BehaviorTree", 57, "[TsTaskWander]AiWander瞬移隐藏特效生成失败", ["Type", i.Actor.GetName()])), this.TsHideMaterialDa !== "" ? ResourceSystem_1.ResourceSystem.LoadAsync(this.TsHideMaterialDa, UE.PD_CharacterControllerData_C, t => {
      if (t) {
        this.HideMaterialData = i.Actor.CharRenderingComponent.AddMaterialControllerData(t);
      } else {
        this.HideMaterialData = 0;
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BehaviorTree", 57, "[TsTaskWander]AiWander瞬移隐藏材质生成失败", ["Type", i.Actor.GetName()]);
        }
      }
    }) : this.HideMaterialData = -1, 0);
  }
  BlinkMoveTick(i, t) {
    this.BlinkTimeCount += t;
    if (this.BlinkTimeCount >= this.TsBlinkTime - 1 && this.ShowMaterialData === undefined) {
      i.SetActorLocation(this.SelectedTargetLocation.ToUeVector(), "脱战节点.执行瞬移重置位置", false);
      i.FixBornLocation("脱战节点.修正角色地面位置", true, undefined, false);
      i.Actor.SetActorEnableCollision(true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BehaviorTree", 57, "[TsTaskWander]AiWander[BlinkMoveTick]怪物闪烁导致Actor碰撞为True", ["Actor:", i.Actor.GetName()]);
      }
      this.ResetAiInfo(i);
      if (this.TsShowEffectDa !== "") {
        t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, this.TsShowEffectDa, "[TsTaskWander.BlinkMoveTick] showEffect", new EffectContext_1.EffectContext(i.Entity.Id));
        if (t = EffectSystem_1.EffectSystem.GetEffectActor(t)) {
          t.D_K2_SetActorLocation(i.ActorLocation, false, undefined, false);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BehaviorTree", 57, "[TsTaskWander]AiWander瞬移显示特效生成失败", ["Type", i.Actor.GetName()]);
        }
      }
      if (this.HideMaterialData && this.HideMaterialData >= 0) {
        i.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.HideMaterialData);
        this.HideMaterialData = undefined;
      }
      if (this.TsShowMaterialDa !== "") {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.TsShowMaterialDa, UE.PD_CharacterControllerData_C, t => {
          if (t) {
            this.ShowMaterialData = i.Actor.CharRenderingComponent.AddMaterialControllerData(t);
          } else {
            this.ShowMaterialData = -1;
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("BehaviorTree", 57, "[TsTaskWander]AiWander瞬移显示材质生成失败", ["Type", i.Actor.GetName()]);
            }
          }
        });
      } else {
        this.ShowMaterialData = -1;
      }
      i.SetInputDirect(Vector_1.Vector.ZeroVector);
    }
    if (this.BlinkTimeCount >= this.TsBlinkTime) {
      this.BlinkMoveEnd(i);
    }
  }
  BlinkMoveEnd(t) {
    return !!this.InBlink && (this.InBlink = false, t.Actor.bActorEnableCollision || Log_1.Log.CheckError() && Log_1.Log.Error("BehaviorTree", 57, "[TsTaskWander]AiWander[BlinkMoveEnd]怪物闪烁此刻Actor碰撞不应该为False,查看[BlinkMoveTick]是否置为True", ["Actor:", t.Actor.GetName()]), this.ShowMaterialData && this.ShowMaterialData >= 0 && (t.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.ShowMaterialData), this.ShowMaterialData = undefined), t.Actor.CharRenderingComponent.ResetAllRenderingState(), this.Finish(true), true);
  }
  UseSkill(t, i) {
    var t = t.Entity.GetComponent(41);
    if (t.Valid) {
      t = t.BeginSkill(i.MoveStateGA, {
        Reason: "TsTaskWander.UseSkill"
      });
      this.Finish(t);
    } else {
      this.Finish(false);
    }
  }
  ResetAiInfo(t) {
    var i = t.Entity.GetComponent(0)?.GetRotation();
    t.SetActorRotation(i, "脱战节点.重置为基础方法", false);
  }
  DrawDebugPath(i) {
    var s = this.NavigationPath.length;
    if (s !== 0) {
      let t = 0;
      UE.KismetSystemLibrary.D_DrawDebugSphere(i.Actor, this.SelectedTargetLocation.ToUeVector(), 40, 10, ColorUtils_1.ColorUtils.LinearGreen, 0, 2);
      UE.KismetSystemLibrary.D_DrawDebugLine(i.Actor, i.ActorLocation, this.SelectedTargetLocation.ToUeVector(), ColorUtils_1.ColorUtils.LinearGreen, 0, 2);
      for (const e of this.NavigationPath) {
        UE.KismetSystemLibrary.D_DrawDebugSphere(i.Actor, e.ToUeVector(), 30, 10, ColorUtils_1.ColorUtils.LinearRed, 0, 2);
        if (++t < s) {
          UE.KismetSystemLibrary.D_DrawDebugLine(i.Actor, e.ToUeVector(), this.NavigationPath[t].ToUeVector(), ColorUtils_1.ColorUtils.LinearRed, 0, 2);
        }
      }
    }
  }
}
exports.default = TsTaskWander;
//# sourceMappingURL=TsTaskWander.js.map