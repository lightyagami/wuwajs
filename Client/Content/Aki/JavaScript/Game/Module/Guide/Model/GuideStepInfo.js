"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideStepInfo = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StateBase_1 = require("../../../../Core/Utils/StateMachine/StateBase");
const StateMachine_1 = require("../../../../Core/Utils/StateMachine/StateMachine");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiBehaviorBase_1 = require("../../../Ui/Base/UiBehaviorBase");
const UiTimeDilation_1 = require("../../../Ui/Base/UiTimeDilation");
const UiConfig_1 = require("../../../Ui/Define/UiConfig");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const UiModel_1 = require("../../../Ui/UiModel");
const TutorialController_1 = require("../../Tutorial/TutorialController");
const UiBehaviorGuideFocus_1 = require("../Views/UiBehaviorGuideFocus");
const GuideViewData_1 = require("./GuideViewData");
const TutorialListInfo_1 = require("./TutorialListInfo");
const stateDesc = ["Init", "Executing", "Pending", "Break", "Finish", "End"];
const GUARANTEED_TIME = 30000;
const OFFSET_TIME = 2000;
class InitState extends StateBase_1.StateBase {}
class ExecutingState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.QJt = true;
    this.XJt = false;
    this.$Jt = undefined;
    this.YJt = undefined;
  }
  JJt() {
    const e = this.Owner;
    if (e.GuideView) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "重复打开引导界面", ["步骤Id", e.Id]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "引导界面打开", ["步骤Id", e.Id]);
      }
      switch (e.Config.ContentType) {
        case 3:
          {
            var i = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(this.Owner.Id);
            const t = this.Owner.OwnerGroup.GetIfPreExecute();
            const s = i.SilentUnlock;
            TutorialController_1.TutorialController.TryUnlockAndOpenTutorialTip(i.Id, i => {
              if (i) {
                if (this.QJt) {
                  if (s) {
                    if (Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("Guide", 74, "图文引导静默解锁", ["步骤Id", e.Id]);
                    }
                    this.Owner.SwitchState(4);
                  } else if (!t) {
                    this.zJt(e);
                  }
                } else if (Log_1.Log.CheckWarn()) {
                  Log_1.Log.Warn("Guide", 16, "打开教学引导失败, 当前已退出执行状态, 步骤ID: " + e.Id);
                }
              } else {
                if (Log_1.Log.CheckWarn()) {
                  Log_1.Log.Warn("Guide", 16, "打开教学引导失败, 教学目录请求解锁协议返回失败, 触发打断, 步骤ID: " + e.Id);
                }
                this.Owner.SwitchState(3);
              }
            });
            if (t && !s) {
              this.zJt(e);
            }
            break;
          }
        default:
          ModelManager_1.ModelManager.GuideModel.OpenGuideView(e);
      }
    }
  }
  zJt(i) {
    i = new TutorialListInfo_1.TutorialListInfo(i);
    i.Init();
    ModelManager_1.ModelManager.GuideModel.AddTutorialInfo(i);
  }
  ZJt() {
    if (this.YJt !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.YJt);
      this.YJt = undefined;
    }
  }
  ezt() {
    if (this.$Jt !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.$Jt);
      this.$Jt = undefined;
    }
  }
  tzt() {
    var i = this.Owner.Config.Duration;
    if (i !== 0 && this.$Jt === undefined) {
      let e = GUARANTEED_TIME;
      if (i > GUARANTEED_TIME) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Guide", 16, "引导保底时间被配置修改", ["步骤Id", this.Owner.Id], ["组Id", this.Owner.OwnerGroup.Id], ["新保底时间", i]);
        }
        e = i + OFFSET_TIME;
      }
      this.$Jt = TimerSystem_1.GameplayTimerSystem.Delay(i => {
        this.$Jt = undefined;
        if (this.Owner.Config.IsTimeUpAsFinish) {
          this.Owner.SwitchState(4);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Guide", 16, `[引导步骤][时停设置超过保底时长(${e}秒)未清除, 触发保底机制恢复时停, 请检查引导配置触发流程是否合理！]`, ["步骤Id", this.Owner.Id]);
          }
          this.Owner.SwitchState(3);
        }
      }, e);
    }
  }
  OnEnter() {
    this.QJt = true;
    var i = this.Owner.Config;
    var e = i.TimeScale;
    if (e < 1 && !ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      UiTimeDilation_1.UiTimeDilation.SetTimeDilationHighLevel(e, "GuideStep");
      this.tzt();
    } else if (this.Owner.OwnerGroupPriority > 0) {
      this.tzt();
    }
    var e = i.ShowDelay;
    if (e > 0) {
      this.ZJt();
      this.YJt = TimerSystem_1.GameplayTimerSystem.Delay(i => {
        this.YJt = undefined;
        this.izt();
      }, e);
    } else {
      this.izt();
    }
  }
  izt() {
    this.JJt();
    this.Owner.ViewData.IsAttachToBattleView = UiManager_1.UiManager.IsViewOpen("BattleView");
    this.XJt = this.Owner.SetLimitInputDistribute();
  }
  OnExit() {
    this.QJt = false;
    var i;
    var e = this.Owner;
    e.IsExitingFromExecuting = true;
    var t = this.Owner.Config.TimeScale;
    if (t < 1 && !ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      this.ezt();
      UiTimeDilation_1.UiTimeDilation.ResetTimeDilationHighLevel("GuideStep");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    } else if (this.Owner.OwnerGroupPriority > 0) {
      this.ezt();
    }
    this.ZJt();
    var t = e.GuideView;
    if (t) {
      i = t.GetViewId();
      if (!t.IsDestroyOrDestroying) {
        t.IgnoreState = true;
        UiManager_1.UiManager.CloseViewById(i);
      }
      e.GuideView = undefined;
    }
    ModelManager_1.ModelManager.GuideModel.RemoveStepViewSingletonMap(e);
    e.ClearGuideFocusBehavior();
    e.ViewData.Clear();
    if (this.XJt) {
      ModelManager_1.ModelManager.InputDistributeModel.ClearLimitInputDistributeActions();
    }
    e.IsExitingFromExecuting = false;
  }
}
class PendingState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.xJt = undefined;
  }
  jm() {
    if (this.xJt !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.xJt);
      this.xJt = undefined;
    }
  }
  OnEnter() {
    this.jm();
    this.xJt = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (this.Owner.CanEnterExecuting()) {
        this.jm();
        this.Owner.SwitchState(1);
      }
    }, 1000);
  }
  OnExit() {
    this.Owner.StopLockInput();
    this.jm();
  }
}
class BreakState extends StateBase_1.StateBase {
  OnEnter() {
    this.Owner.OwnerGroup.Break();
  }
}
class FinishState extends StateBase_1.StateBase {
  OnEnter() {
    this.Owner.OwnerGroup.PumpStep();
  }
}
class EndState extends StateBase_1.StateBase {}
class GuideStepInfo {
  constructor(i, e) {
    this.Id = 0;
    this.OwnerGroup = undefined;
    this.OwnerGroupPriority = 0;
    this.StateMachine = undefined;
    this.ViewData = undefined;
    this.GuideView = undefined;
    this.GuideFocusBehaviorProxy = undefined;
    this.ozt = undefined;
    this.rzt = undefined;
    this.nzt = undefined;
    this.IsExitingFromExecuting = false;
    this.Id = i;
    this.OwnerGroup = e;
    this.OwnerGroupPriority = ConfigManager_1.ConfigManager.GuideConfig.GetGroup(e.Id)?.Priority ?? 0;
    this.ViewData = new GuideViewData_1.GuideStepViewData(this);
    this.StateMachine = new StateMachine_1.StateMachine(this);
    this.StateMachine.AddState(0, InitState);
    this.StateMachine.AddState(1, ExecutingState);
    this.StateMachine.AddState(2, PendingState);
    this.StateMachine.AddState(3, BreakState);
    this.StateMachine.AddState(4, FinishState);
    this.StateMachine.AddState(5, EndState);
    this.StateMachine.Start(0);
  }
  get Config() {
    this.rzt ||= ConfigManager_1.ConfigManager.GuideConfig.GetStep(this.Id);
    return this.rzt;
  }
  TryEnterExecuting() {
    if (this.CanEnterExecuting()) {
      this.SwitchState(1);
    } else {
      this.SwitchState(2);
    }
  }
  AssignGuideView(i) {
    var e;
    var t;
    if (i) {
      e = i.Info.Name;
      t = i.GetViewId();
      if (this.StateMachine.CurrentState !== 1) {
        UiManager_1.UiManager.CloseViewById(t);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 16, "引导界面赋值失败, 当前步骤已经终止, 清理已打开的引导界面", ["步骤Id", this.Id], ["viewName", e], ["viewId", t]);
        }
      } else {
        this.GuideView = i;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 16, "引导界面赋值", ["步骤Id", this.Id], ["viewName", e], ["viewId", t]);
        }
      }
    }
  }
  SwitchState(i) {
    if (this.StateMachine.CurrentState === 5 && i !== 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "[引导状态切换:步骤]失败, 当前步骤已被外部终止", ["步骤Id", this.Id], ["当前状态", stateDesc[this.StateMachine.CurrentState]], ["切换到的状态", stateDesc[i]]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "[引导状态切换:步骤] 成功", ["步骤Id", this.Id], ["当前状态", stateDesc[this.StateMachine.CurrentState]], ["切换到的状态", stateDesc[i]]);
      }
      this.StateMachine.Switch(i);
    }
  }
  szt() {
    return !!UiLayer_1.UiLayer.IsUiActive() && !ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.GameplayTagComponent?.HasTag(1733479717) && !UiManager_1.UiManager.IsViewShow("PhantomExploreView");
  }
  azt() {
    if (this.Config.ContentType === 4 && ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocus(this.Id).UseMask) {
      return true;
    }
    return false;
  }
  hzt() {
    var i;
    var e = ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocus(this.Id);
    var t = e.ViewName;
    if (t) {
      return !!(i = UiConfig_1.UiConfig.TryGetViewInfo(t)) && !!(i = UiModel_1.UiModel.GetTopView(i.Type)) && !(i.Info.Name !== t ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "当前打开的界面与聚焦步骤的目标界面不一致", ["当前打开界面", i.Info.Name], ["聚焦引导目标界面", t], ["步骤Id", e.GuideId]), 1) : (e.DynamicTabName ? EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GuideFocusNeedUiTabView, this, e) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Guide", 53, "设置引导attachedview", ["当前打开界面", i.Info.Name], ["界面id", i.ComponentId], ["步骤Id", e.GuideId]), this.ViewData.SetAttachedView(i)), 0));
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "聚焦引导步骤未配置界面名称", ["步骤Id", e.GuideId]);
      }
      return false;
    }
  }
  RQl() {
    return !!UiTimeDilation_1.UiTimeDilation.IsUiTimeDilated || UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop) === undefined && UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal)?.Info?.Name === "BattleView";
  }
  lzt() {
    if (!this.nzt) {
      ModelManager_1.ModelManager.GuideModel.AddGuideLockInput();
      this.nzt = TimerSystem_1.GameplayTimerSystem.Delay(i => {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 53, "[Guide][引导触发后5秒没打开对应界面,触发保底]", ["步骤Id", this.Id]);
        }
        this.SwitchState(3);
        if (ModelManager_1.ModelManager.GuideModel.IsGuideLockingInput) {
          ModelManager_1.ModelManager.GuideModel.RemoveGuideLockInput();
        }
      }, 4000);
    }
  }
  StopLockInput() {
    if (this.nzt !== undefined) {
      ModelManager_1.ModelManager.GuideModel.RemoveGuideLockInput();
      TimerSystem_1.GameplayTimerSystem.Remove(this.nzt);
      this.nzt = undefined;
    }
  }
  CanEnterExecuting() {
    if (!this.szt()) {
      return false;
    }
    switch (this.Config.ContentType) {
      case 4:
        {
          if (!this.hzt()) {
            this.StopLockInput();
            return false;
          }
          if (this.azt()) {
            this.lzt();
          }
          const e = this.ViewData.GetAttachedView();
          var i;
          if (e) {
            if (!this.ozt) {
              this.ozt = new UiBehaviorGuideFocus_1.UiBehaviorGuideFocus(e);
              this.ozt.SetParam(this);
            }
            this.ozt.SetOwner(e);
            return !!this.ozt.PrepareForOpenGuideFocus() && (!(i = UiManager_1.UiManager.GetViewByName("GuideFocusView")) || i.WaitToDestroy || i.IsDestroyOrDestroying ? (this.GuideFocusBehaviorProxy || (this.GuideFocusBehaviorProxy = new UiBehaviorBase_1.UiBehaviorBaseProxy(this.ozt), this.GuideFocusBehaviorProxy.CreateAsync().then(() => {
              this.GuideFocusBehaviorProxy.StartAsync();
              e.AddUiBehaviorProxy(this.GuideFocusBehaviorProxy);
            }, () => {})), this.StopLockInput(), true) : (ModelManager_1.ModelManager.GuideModel.BreakTypeViewStep(this.Config.ContentType), false));
          } else {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Guide", 16, "聚焦引导  依附的页签界面不存在或未打开", ["this.Id", this.Id]);
            }
            return false;
          }
        }
      case 1:
        return !!UiManager_1.UiManager.IsViewShow("BattleView") && !(UiManager_1.UiManager.IsViewOpen("GuideTipsView") ? (ModelManager_1.ModelManager.GuideModel.BreakTypeViewStep(this.Config.ContentType), 1) : !this.RQl() && this.Config.TimeScale < 1 && (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 64, "[Guide][有时停的【tip引导】触发时，有非战斗的页面打开，且ui未时停。引导不可触发]", ["步骤Id", this.Id]), 1));
      case 3:
        return !!this.RQl() || !(this.Config.TimeScale < 1) || !(Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 64, "[Guide][有时停的【图文引导】触发时，有非战斗的页面打开，且ui未时停。引导不可触发]", ["步骤Id", this.Id]), 1);
      default:
        return true;
    }
  }
  ClearGuideFocusBehavior() {
    this.ozt?.CleanGuideStep();
    this.ozt = undefined;
    this.GuideFocusBehaviorProxy = undefined;
  }
  SetLimitInputDistribute() {
    let i = false;
    switch (this.Config.ContentType) {
      case 4:
        var e = ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocus(this.Id);
        e.LimitInputEnums.forEach(i => {
          ModelManager_1.ModelManager.InputDistributeModel.AddToLimitInputDistributeActions(i);
        });
        if (ModelManager_1.ModelManager.InputDistributeModel.HasActionLimitSet()) {
          if (e.UseClick || e.UseMask || this.Config.TimeScale < 1) {
            ModelManager_1.ModelManager.InputDistributeModel.AddToLimitInputDistributeActions(InputMappingsDefine_1.actionMappings.Ui左键点击);
            ModelManager_1.ModelManager.InputDistributeModel.AddToLimitInputDistributeActions(InputMappingsDefine_1.actionMappings.显示鼠标);
          }
          i = true;
        }
        break;
      case 1:
        ConfigManager_1.ConfigManager.GuideConfig.GetGuideTips(this.Id).LimitInputEnums.forEach(i => {
          ModelManager_1.ModelManager.InputDistributeModel.AddToLimitInputDistributeActions(i);
        });
        if (ModelManager_1.ModelManager.InputDistributeModel.HasActionLimitSet()) {
          i = true;
        }
    }
    return i;
  }
}
exports.GuideStepInfo = GuideStepInfo;
//# sourceMappingURL=GuideStepInfo.js.map