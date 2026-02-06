"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotBlendController = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("../../NewWorld/Character/Common/Component/Move/CustomMovementDefine");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const SequenceDefine_1 = require("./Sequence/SequenceDefine");
const BLEND_IN = 0.1;
const BLEND_OUT = 0.1;
const blendMonitorActions = [InputMappingsDefine_1.actionMappings.跳跃, InputMappingsDefine_1.actionMappings.攀爬, InputMappingsDefine_1.actionMappings.走跑切换, InputMappingsDefine_1.actionMappings.闪避, InputMappingsDefine_1.actionMappings.下降, InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.技能1, InputMappingsDefine_1.actionMappings.幻象1, InputMappingsDefine_1.actionMappings.大招, InputMappingsDefine_1.actionMappings.幻象2, InputMappingsDefine_1.actionMappings.切换角色1, InputMappingsDefine_1.actionMappings.切换角色2, InputMappingsDefine_1.actionMappings.切换角色3, InputMappingsDefine_1.actionMappings.切换角色4, InputMappingsDefine_1.actionMappings.通用交互, InputMappingsDefine_1.actionMappings.切换交互, InputMappingsDefine_1.actionMappings.环境特性, InputMappingsDefine_1.actionMappings.锁定目标, InputMappingsDefine_1.actionMappings.瞄准];
const blendMonitorAxes = [InputMappingsDefine_1.axisMappings.MoveForward, InputMappingsDefine_1.axisMappings.MoveRight];
class PlotBlendController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 7, "[PlotBlend] PlotBlendController 初始化");
    }
    return true;
  }
  static OnClear() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 7, "[PlotBlend] PlotBlendController 清理");
    }
    ModelManager_1.ModelManager.PlotModel.IsBlendProcessing = false;
    this.r2g();
    this.PHg();
    this.o2g = undefined;
    this.gHg = undefined;
    this.DVg = false;
    this.n2g.clear();
    for (var [e, t] of this.s2g) {
      t.SetResult(false);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 7, "[PlotBlend] 取消预加载Promise", ["path", e]);
      }
    }
    this.s2g.clear();
    return true;
  }
  static OnTick(e) {
    ModelManager_1.ModelManager.PlotModel.IsBlendProcessing;
  }
  static OnAfterTick(e) {}
  static OnLeaveLevel() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 7, "[PlotBlend] PlotBlendController 离开关卡");
    }
    ModelManager_1.ModelManager.PlotModel.IsBlendProcessing = false;
    this.r2g();
    this.PHg();
    this.o2g = undefined;
    this.gHg = undefined;
    this.DVg = false;
    this.n2g.clear();
    this.s2g.clear();
    return true;
  }
  static OnChangeMode() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 7, "[PlotBlend] PlotBlendController 改变模式");
    }
    return true;
  }
  static SetupInfo(e, t) {
    this.o2g = e;
    this.gHg = t;
    this.DVg = false;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 7, "[PlotBlend] 开始预加载Blend资源", ["target", e.Target.Type]);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 7, "[PlotBlend] Blend资源类型", ["blendType", e.BlendType.Type]);
    }
    var o = e.BlendType;
    switch (o.Type) {
      case "SetStateMachine":
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 7, "[PlotBlend] 状态机Blend资源预加载完成");
        }
        break;
      case "AnimSequence":
        this.a2g(o);
        break;
      default:
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 7, "[PlotBlend] SetupInfo: 未知的BlendType");
        }
    }
  }
  static a2g(e) {
    const t = e.AnimSequence;
    if (this.n2g.has(t)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 7, "[PlotBlend] 动画资源已在缓存中", ["path", t]);
      }
    } else if (this.s2g.has(t)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 7, "[PlotBlend] 动画资源正在预加载中", ["path", t]);
      }
    } else {
      const o = new CustomPromise_1.CustomPromise();
      this.s2g.set(t, o);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 7, "[PlotBlend] 开始预加载动画资源", ["path", t]);
      }
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimSequence, e => {
        if (e) {
          this.n2g.set(t, e);
          o.SetResult(true);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 7, "[PlotBlend] 动画资源预加载成功", ["path", t]);
          }
        } else {
          o.SetResult(false);
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Plot", 7, "[PlotBlend] 动画资源预加载失败", ["path", t]);
          }
        }
      });
    }
  }
  static h2g(e, t, o) {
    if (t) {
      var n;
      var l;
      var i = e.GetComponent(189);
      switch (o) {
        case "CombatIdle":
          t.EnterBattleIdle();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 7, "[PlotBlend] 执行动画状态机Blend为CombatIdle");
          }
          break;
        case "Fall":
          if (i?.ActorComp) {
            i.ActorComp.Actor.KuroSetMovementMode({
              Mode: 3,
              Context: "[PlotBlendController.ExecuteStateMachineBlend.Fall]"
            });
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 7, "[PlotBlend] 执行动画状态机Blend为Fall");
          }
          break;
        case "Slide":
          if (i?.ActorComp) {
            i.ActorComp.Actor.KuroSetMovementMode({
              Mode: 6,
              CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE,
              Context: "[PlotBlendController.ExecuteStateMachineBlend.Slide]"
            });
            e.GetComponent(186)?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Slide);
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 7, "[PlotBlend] 执行动画状态机Blend为Slide");
          }
          break;
        case "Run":
          if (i?.MoveController && i.ActorComp) {
            l = i.ActorComp.ActorLocationProxy;
            n = i.ActorComp.ActorForwardProxy;
            l = {
              Position: Vector_1.Vector.Create(l.X + n.X * 100, l.Y + n.Y * 100, l.Z + n.Z * 100),
              MoveState: CharacterUnifiedStateTypes_1.ECharMoveState.Run,
              CallbackList: [() => {
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Plot", 7, "[PlotBlend] Run移动到达目标点");
                }
              }]
            };
            i.MoveController.NavigateMoveToLocation(l);
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 7, "[PlotBlend] 执行动画状态机Blend为Run");
          }
          break;
        case "Walk":
          if (i?.MoveController && i.ActorComp) {
            n = i.ActorComp.ActorLocationProxy;
            l = i.ActorComp.ActorForwardProxy;
            n = Vector_1.Vector.Create(n.X + l.X * 100, n.Y + l.Y * 100, n.Z + l.Z * 100);
            e.GetComponent(186)?.MarkWalkOrRun(true, false);
            l = {
              Position: n,
              MoveState: CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
              CallbackList: [() => {
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Plot", 7, "[PlotBlend] Walk移动到达目标点");
                }
              }]
            };
            i.MoveController.NavigateMoveToLocation(l);
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 7, "[PlotBlend] 执行动画状态机Blend为Walk");
          }
          break;
        default:
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Plot", 7, "[PlotBlend] ExecuteStateMachineBlend: 未知的状态", ["state", o]);
          }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 7, "[PlotBlend] ExecuteStateMachineBlend: animComp不存在");
    }
  }
  static l2g(e, t) {
    var o = t.AnimSequence;
    var n = this.n2g.get(o);
    if (n) {
      if (e) {
        e?.PlaySlotAnimation(n, SequenceDefine_1.DEFAULT_SEQ_SLOT, BLEND_IN);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 7, "[PlotBlend] 执行动画序列Blend", ["animation", o]);
        }
        n = (e = n.SequenceLength) + BLEND_OUT;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 7, "[PlotBlend] 动画时长", ["duration", e], ["totalDuration", n]);
        }
        if (this.AHg !== undefined) {
          TimerSystem_1.TimerSystem.Remove(this.AHg);
        }
        this.AHg = TimerSystem_1.TimerSystem.Delay(() => {
          this.EndBlendOutSwitchPose();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 7, "[PlotBlend] 动画播放完成，IsBlendProcessing已设置为false");
          }
        }, n * 1000);
        if (t.ProtectTime && t.ProtectTime > 0) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 7, "[PlotBlend] 动画保护时间设置", ["protectTime", t.ProtectTime]);
          }
          this._2g = true;
          this.u2g = TimerSystem_1.TimerSystem.Delay(() => {
            this._2g = false;
            this.u2g = undefined;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 7, "[PlotBlend] 动画保护时间结束，可以开始被输入打断");
            }
          }, t.ProtectTime * 1000);
        } else {
          this._2g = false;
        }
        this.BindInputActions();
        this.BindInputAxes();
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 7, "[PlotBlend] ExecuteAnimSequenceBlend: AnimInstance不存在");
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 7, "[PlotBlend] ExecuteAnimSequenceBlend: 动画资源未预加载", ["path", o]);
    }
  }
  static async TryExecuteBlend(e) {
    if (this.gHg !== e || !this.gHg) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 7, "[PlotBlend] TryExecuteBlend: 来源标识不匹配，调用EndBlendOutSwitchPose", ["triggerSourceId", this.gHg], ["currentSourceId", e]);
      }
      this.EndBlendOutSwitchPose();
      return false;
    }
    if (ModelManager_1.ModelManager.PlotModel.IsBlendProcessing) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 7, "[PlotBlend] Blend 已在进行中，跳过新请求");
      }
      return false;
    }
    if (!this.o2g) {
      return false;
    }
    this.DVg = true;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (!t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 7, "[PlotBlend] TryExecuteBlend: 当前角色不存在");
      }
      return false;
    }
    var o = t.GetComponent(188);
    var n = o?.MainAnimInstance;
    if (!n) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 7, "[PlotBlend] TryExecuteBlend: animInstance不存在");
      }
      return false;
    }
    ModelManager_1.ModelManager.PlotModel.IsBlendProcessing = true;
    var l = this.o2g.BlendType;
    try {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 7, "[PlotBlend] 开始执行Blend操作", ["type", l.Type]);
      }
      if (l.Type === "AnimSequence") {
        var i = l.AnimSequence;
        var r = this.s2g.get(i);
        if (r) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 7, "[PlotBlend] 等待动画资源预加载完成", ["path", i]);
          }
          await r.Promise;
        }
        if (!this.n2g.has(i)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Plot", 7, "[PlotBlend] 动画资源预加载失败", ["path", i]);
          }
          return false;
        }
      }
      switch (l.Type) {
        case "SetStateMachine":
          this.h2g(t, o, l.State);
          break;
        case "AnimSequence":
          this.l2g(n, l);
          break;
        default:
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Plot", 7, "[PlotBlend] TryExecuteBlend: 未知的BlendType");
          }
          return false;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 7, "[PlotBlend] Blend操作执行完成");
      }
      this.CHg();
      return true;
    } catch (e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 7, "[PlotBlend] TryExecuteBlend 执行失败", ["error", e]);
      }
      this.CHg();
      return false;
    } finally {
      if (l.Type === "SetStateMachine") {
        ModelManager_1.ModelManager.PlotModel.IsBlendProcessing = false;
      }
    }
  }
  static EndBlendOutSwitchPose() {
    var e;
    if (ModelManager_1.ModelManager.PlotModel.IsBlendProcessing) {
      this.UnBindInputActions();
      this.UnBindInputAxes();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 7, "[PlotBlend] 结束BlendOut姿势切换");
      }
      if (e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity) {
        if (e = e.GetComponent(188)?.MainAnimInstance) {
          e.StopSlotAnimation(BLEND_OUT, SequenceDefine_1.DEFAULT_SEQ_SLOT);
          this.r2g();
          this.PHg();
          ModelManager_1.ModelManager.PlotModel.IsBlendProcessing = false;
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 7, "[PlotBlend] EndBlendOutSwitchPose: animInstance不存在");
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 7, "[PlotBlend] EndBlendOutSwitchPose: 当前角色不存在");
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 7, "[PlotBlend] 没有正在进行的BlendOut操作");
    }
  }
  static r2g() {
    if (this.u2g !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.u2g);
      this.u2g = undefined;
    }
    this._2g = false;
  }
  static PHg() {
    if (this.AHg !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.AHg);
      this.AHg = undefined;
    }
  }
  static CHg() {
    this.o2g = undefined;
    this.gHg = undefined;
    this.DVg = false;
    this.n2g.clear();
    for (var [, e] of this.s2g) {
      e.SetResult(false);
    }
    this.s2g.clear();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 7, "[PlotBlend] 清理Blend数据（保持动画播放和输入监听）");
    }
  }
  static get HasBlendInfo() {
    return this.o2g !== undefined;
  }
  static get HasUnexecutedBlendInfo() {
    return this.HasBlendInfo && !this.DVg;
  }
  static IsAnimationPreloaded(e) {
    return this.n2g.has(e);
  }
  static async WaitForAnimationPreload(e) {
    var t = this.s2g.get(e);
    if (t) {
      return t.Promise;
    } else {
      return this.n2g.has(e);
    }
  }
  static GetCurrentBlendInfo() {
    return this.o2g;
  }
  static ClearBlendInfo() {
    this.o2g = undefined;
    this.gHg = undefined;
    this.DVg = false;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 7, "[PlotBlend] 手动清理Blend信息");
    }
  }
  static BindInputActions(e) {
    e = e ?? blendMonitorActions;
    if (e && e.length !== 0 && (ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions(e, this.bMe), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 7, "[PlotBlend] 绑定Blend输入Actions", ["count", e.length]);
    }
  }
  static UnBindInputActions(e) {
    e = e ?? blendMonitorActions;
    if (e && e.length !== 0 && (ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions(e, this.bMe), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 7, "[PlotBlend] 解绑Blend输入Actions", ["count", e.length]);
    }
  }
  static BindInputAxes(e) {
    e = e ?? blendMonitorAxes;
    if (e && e.length !== 0 && (ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxes(e, this.BMe), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 7, "[PlotBlend] 绑定Blend输入Axes", ["count", e.length]);
    }
  }
  static UnBindInputAxes(e) {
    e = e ?? blendMonitorAxes;
    if (e && e.length !== 0 && (ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxes(e, this.BMe), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 7, "[PlotBlend] 解绑Blend输入Axes", ["count", e.length]);
    }
  }
}
exports.PlotBlendController = PlotBlendController;
(_a = PlotBlendController).o2g = undefined;
PlotBlendController.DVg = false;
PlotBlendController.gHg = undefined;
PlotBlendController.n2g = new Map();
PlotBlendController.s2g = new Map();
PlotBlendController._2g = false;
PlotBlendController.u2g = undefined;
PlotBlendController.AHg = undefined;
PlotBlendController.bMe = (e, t, o) => {
  if (t === 0 && !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 7, "[PlotBlend] PlotBlendController 输入Action", ["actionName", e], ["actionType", t], ["isInProtectTime", _a._2g]), _a._2g)) {
    _a.EndBlendOutSwitchPose();
  }
};
PlotBlendController.BMe = (e, t, o) => {
  if (!(Math.abs(t) < 0.1) && !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 7, "[PlotBlend] PlotBlendController 输入Axis", ["axisName", e], ["axisValue", t], ["isInProtectTime", _a._2g]), _a._2g)) {
    _a.EndBlendOutSwitchPose();
  }
}; //# sourceMappingURL=PlotBlendController.js.map