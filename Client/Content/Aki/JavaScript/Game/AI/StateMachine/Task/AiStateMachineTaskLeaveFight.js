"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineTaskLeaveFight = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const CombatLog_1 = require("../../../Utils/CombatLog");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineTask_1 = require("./AiStateMachineTask");
const BLINK_TIME = 1000;
const BLINK_TYPE = 3;
class AiStateMachineTaskLeaveFight extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments);
    this.BlinkTime = -0;
    this.UsePatrolPointPriority = false;
    this.MaxStopTime = -0;
    this.qne = Vector_1.Vector.Create();
    this.Gne = false;
    this.Nne = false;
    this.kne = -0;
    this.Fne = undefined;
    this.Vne = undefined;
    this.Hne = 0;
    this.jne = "";
    this.Wne = "";
    this.Kne = "";
    this.Qne = "";
    this.Xne = false;
  }
  OnInit(t) {
    this.BlinkTime = t.TaskLeaveFight.BlinkTime;
    this.UsePatrolPointPriority = t.TaskLeaveFight.UsePatrolPointPriority;
    this.MaxStopTime = t.TaskLeaveFight.MaxStopTime;
    return true;
  }
  OnEnter() {
    this.Xne = true;
    this.Nne = false;
    var t = this.Node.AiComponent.TsAiController;
    var i = this.Node.AiController;
    if (i) {
      this.Node.SkillComponent.StopAllSkills("AiStateMachineTaskLeaveFight.OnEnter");
      this.Node.AnimationComponent.MainAnimInstance?.Montage_Stop(0);
      var e = i.AiWanderInfos?.AiWander;
      if (e) {
        this.Hne = e.ResetMoveState;
        this.jne = e.ShowEffectDaPath;
        this.Wne = e.HideEffectDaPath;
        this.Kne = e.ShowMaterialDaPath;
        this.Qne = e.HideMaterialDaPath;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "没有配置AiWander", ["AiBaseId", i.AiBase.Id]);
      }
      const a = i.CharActorComp;
      if (this.UsePatrolPointPriority && i.AiPatrol.HasPatrolConfig()) {
        if (s = i.AiPatrol.GetLastPatrolPoint()) {
          this.qne.DeepCopy(s);
        } else {
          this.qne.DeepCopy(i.CharActorComp.GetInitLocation());
        }
      } else if (s = ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(this.Node.Entity.Id)) {
        this.qne.DeepCopy(s.PauseLocation);
      } else {
        this.qne.DeepCopy(i.CharActorComp.GetInitLocation());
      }
      if (e && this.Hne !== BLINK_TYPE) {
        if (this.Node?.ActorComponent?.IsAutonomousProxy) {
          var s = {
            Points: [{
              Index: 0,
              Position: Vector_1.Vector.Create(this.qne),
              MoveState: this.Hne,
              MoveSpeed: 400
            }],
            Navigation: true,
            IsFly: false,
            DebugMode: false,
            Loop: false,
            ReturnTimeoutFailed: this.MaxStopTime / 1000,
            Callback: t => {
              if (t === 1) {
                this.$ne(true);
              } else {
                this.Yne(a);
                CombatLog_1.CombatLog.Warn("StateMachineNew", this.Node.Entity, "脱战复位未找到路，瞬移移动回初始点");
              }
            },
            ReturnFalseWhenNavigationFailed: true
          };
          this.Node.MoveComponent.MoveAlongPath(s);
          var h = a.Entity.CheckGetComponent(104);
          if (h.Valid) {
            switch (this.Hne) {
              case 1:
                h.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
                break;
              case 2:
                h.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
            }
          }
        }
      } else {
        this.Yne(a);
      }
      this.Jne(i, false);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
    }
  }
  Jne(t, i) {
    t.AiPerception.SetAllAiSenseEnable(i);
  }
  OnTick(t) {
    if (this.Node.AiController) {
      if (this.Gne) {
        this.zne(t);
      }
    } else {
      this.$ne(false);
    }
  }
  $ne(t) {
    if (this.Xne) {
      this.Node.TaskFinished = true;
      this.Xne = false;
    }
  }
  OnExit() {
    var t = this.Node.AiController;
    t.CharActorComp.SetInputDirect(Vector_1.Vector.ZeroVector);
    this.Jne(t, true);
    if (this.Gne && (this.Node.ActorComponent.Actor.SetActorEnableCollision(true), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("BehaviorTree", 57, "AiWander[OnClear]怪物闪烁导致Actor碰撞为True", ["Actor:", this.Node.ActorComponent.Actor.GetName()]);
    }
    if (this.Vne && this.Vne >= 0) {
      this.Node.ActorComponent.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.Vne);
    }
    if (this.Fne && this.Fne >= 0) {
      this.Node.ActorComponent.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.Fne);
    }
    this.Gne = false;
    this.Nne = false;
    this.kne = 0;
    this.Vne = undefined;
    this.Fne = undefined;
  }
  Yne(i) {
    var t;
    this.Gne = true;
    this.kne = 0;
    this.Fne = undefined;
    this.Vne = undefined;
    if (this.Wne !== "") {
      t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, this.Wne, "[AiStateMachineTaskLeaveFight.BlinkMoveBegin] hideEffect", new EffectContext_1.EffectContext(i.Entity.Id));
      if (t = EffectSystem_1.EffectSystem.GetEffectActor(t)) {
        t.D_K2_SetActorLocation(i.ActorLocation, false, undefined, false);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("BehaviorTree", 57, "AiWander瞬移隐藏特效生成失败", ["Type", i.Actor.GetName()]);
      }
    }
    if (this.Qne !== "") {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.Qne, UE.PD_CharacterControllerData_C, t => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BehaviorTree", 57, "脱战隐藏材质加载回调", ["Type", i.Actor.GetName()]);
        }
        if (this.Node.Activated) {
          if (t) {
            this.Vne = i.Actor.CharRenderingComponent.AddMaterialControllerData(t);
          } else {
            this.Vne = 0;
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("BehaviorTree", 57, "AiWander瞬移隐藏材质生成失败", ["Type", i.Actor.GetName()]);
            }
          }
        }
      });
    } else {
      this.Vne = -1;
    }
  }
  zne(t) {
    this.kne += t;
    if (this.kne >= this.BlinkTime - BLINK_TIME && !this.Nne) {
      this.Zne();
      this.Nne = true;
    }
    if (this.kne >= this.BlinkTime) {
      this.ese();
    }
  }
  Zne() {
    const i = this.Node.ActorComponent;
    var t;
    this.Node.ActorComponent.SetMoveControlled(true, this.BlinkTime * MathUtils_1.MathUtils.MillisecondToSecond, "脱战传送");
    i.SetActorLocation(this.qne.ToUeVector(), "脱战节点.执行瞬移重置位置", false);
    i.FixBornLocation("脱战节点.修正角色地面位置", true, undefined, false);
    i.Actor.SetActorEnableCollision(true);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("BehaviorTree", 57, "AiWander[BlinkMoveTick]怪物闪烁导致Actor碰撞为True", ["Actor:", i.Actor.GetName()]);
    }
    this.tse(i);
    if (this.jne !== "") {
      t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, this.jne, "[AiStateMachineTaskLeaveFight.BlinkMoveTick] showEffect", new EffectContext_1.EffectContext(i.Entity.Id));
      if (t = EffectSystem_1.EffectSystem.GetEffectActor(t)) {
        t.D_K2_SetActorLocation(i.ActorLocation, false, undefined, false);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("BehaviorTree", 57, "AiWander瞬移显示特效生成失败", ["Type", i.Actor.GetName()]);
      }
    }
    if (this.Vne >= 0) {
      i.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.Vne);
      this.Vne = undefined;
    }
    if (this.Kne !== "") {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.Kne, UE.PD_CharacterControllerData_C, t => {
        if (this.Node.Activated) {
          if (t) {
            this.Fne = i.Actor.CharRenderingComponent.AddMaterialControllerData(t);
          } else {
            this.Fne = -1;
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("BehaviorTree", 57, "AiWander瞬移显示材质生成失败", ["Type", i.Actor.GetName()]);
            }
          }
        }
      });
    } else {
      this.Fne = -1;
    }
    i.SetInputDirect(Vector_1.Vector.ZeroVector);
  }
  ese() {
    var t = this.Node.ActorComponent;
    return !!this.Gne && (this.Gne = false, t.Actor.bActorEnableCollision || Log_1.Log.CheckError() && Log_1.Log.Error("BehaviorTree", 57, "AiWander[BlinkMoveEnd]怪物闪烁此刻Actor碰撞不应该为False,查看[BlinkMoveTick]是否置为True", ["Actor:", t.Actor.GetName()]), this.Fne >= 0 && (t.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.Fne), this.Fne = undefined), this.$ne(true), true);
  }
  tse(t) {
    var i = this.Node.Entity.GetComponent(0).GetRotation();
    t.SetActorRotation(i, "脱战节点.重置为基础方法", false);
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineTaskLeaveFight = AiStateMachineTaskLeaveFight;
//# sourceMappingURL=AiStateMachineTaskLeaveFight.js.map