"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideBaseView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LevelConditionRegistry_1 = require("../../../LevelGamePlay/LevelConditions/LevelConditionRegistry");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTimeDilation_1 = require("../../../Ui/Base/UiTimeDilation");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const LoadingDefine_1 = require("../../Loading/LoadingDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const guideConflictView = new Set(["MonthCardRewardView", "QuestRewardView", "ExploreRewardView", "CommonRewardView", "ItemTipsView", "ExploreDetailView", "TowerUnlockView", "TowerOverLockUnlockView", "PowerView", "ActivityRewardPopUpView", "RoleGenderChangeView", "ConfirmBoxView", "CdKeyInputView", "CompositeRewardView", "LogUploadView", "RacingBetsSuccessTip", "RacingBetsFailTip", "DangoAbyssInfoView", "PhantomArenaStartView", "TutorialPopView", "ResolutionListView", "HelpGuideView", ...LoadingDefine_1.loadingViewList]);
class GuideBaseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.IgnoreState = false;
    this.IsFinished = false;
    this.GuideStepInfo = undefined;
    this.CombineInputMap = new Map();
    this.RemainDuration = 0;
    this.Czt = 0;
    this.gzt = false;
    this.Khc = false;
    this.fzt = undefined;
    this.pzt = undefined;
    this.TimeTicker = undefined;
    this.vzt = undefined;
    this.Mzt = i => {
      if (this.GetActive()) {
        if (i) {
          this.OnAfterShow();
        } else {
          this.OnAfterHide();
        }
      }
    };
    this.OnFinishConditionOk = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "引导步骤  成功结束条件达成", ["this.GuideStepInfo!.Id", this.GuideStepInfo.Id], ["结束条件id", this.GuideStepInfo.Config.SuccessCondition]);
      }
      if (this.OnCheckBaseViewFinishConditionOk()) {
        this.DoCloseByFinished();
      }
    };
    this.OnFinishConditionFail = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "引导步骤  失败结束条件达成", ["this.GuideStepInfo!.Id", this.GuideStepInfo.Id], ["结束条件id", this.GuideStepInfo.Config.FailureCondition]);
      }
      if (this.OnCheckBaseViewFinishConditionFail()) {
        this.Ezt();
      }
    };
    this.OnTick = e => {
      if (!ModelManager_1.ModelManager.LoadingModel.IsLoadingView) {
        this.OnGuideBaseViewTick(e);
        var t = this.RemainDuration;
        if (t && t > 0) {
          let i = e;
          if ((t -= i = !this.GuideStepInfo?.ViewData?.IsAttachToBattleView || this.IsShow || this.Khc ? i : 0) <= 0) {
            this.Szt();
          }
          this.RemainDuration = t;
          this.OnDurationChange(t);
        }
        if (this.IsShow) {
          this.Czt -= e;
          this.yzt();
        }
      }
    };
  }
  get TotalDuration() {
    if (this.GuideStepInfo) {
      return this.GuideStepInfo.Config.Duration;
    } else {
      return 0;
    }
  }
  yzt() {
    var i;
    var e = this.GuideStepInfo.Config;
    if (!this.fzt) {
      if ((i = e.SuccessCondition) && ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(i.toString(), undefined)) {
        this.OnFinishConditionOk();
      }
    }
    if (!this.pzt) {
      if ((i = e.FailureCondition) && ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(i.toString(), undefined)) {
        this.OnFinishConditionFail();
      }
    }
  }
  CheckTickCondition() {
    var i = this.GuideStepInfo.Config.TickCondition;
    return i === 0 || (this.Khc = true, ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(i.toString(), undefined, true, this.GetViewId()));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUiScreenRootVisibleChange, this.Mzt);
    this.OnGuideBaseViewAddEvent();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUiScreenRootVisibleChange, this.Mzt);
    this.OnGuideBaseViewRemoveEvent();
  }
  HasConflictView(i) {
    for (const e of guideConflictView) {
      if (UiManager_1.UiManager.IsViewShow(e) && e !== i) {
        return true;
      }
    }
    return false;
  }
  DoCloseByFinished() {
    if (!this.IsFinished) {
      this.IsFinished = true;
      this.OnGuideViewCloseWhenFinish();
      this.Ezt();
    }
  }
  Ezt() {
    var i = this.Czt;
    if (i < TimerSystem_1.MIN_TIME) {
      this.eNt();
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "[DoClose]引导步骤完成, 但显示时长未达到配置的最小显示时间", ["步骤Id", this.GuideStepInfo.Id], ["剩余倒计时", i]);
      }
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.eNt();
      }, i);
    }
  }
  eNt() {
    if (this.TimeTicker) {
      this.TimeTicker.Remove();
      this.TimeTicker = undefined;
    }
    this.CloseMe();
  }
  BindInput(e, t, i) {
    if (e.length === t.length && this.vzt !== i) {
      this.vzt = i;
      for (let i = 0; i < t.length; i++) {
        var s = e[i];
        if (Object.values(InputMappingsDefine_1.actionMappings).includes(s)) {
          InputDistributeController_1.InputDistributeController.BindAction(t[i], this.vzt);
          this.CombineInputMap.set(t[i], 1);
        } else if (Object.values(InputMappingsDefine_1.axisMappings).includes(s)) {
          InputDistributeController_1.InputDistributeController.BindAxis(t[i], this.vzt);
          this.CombineInputMap.set(t[i], 0);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 16, "引导步骤  填的操作映射未定义", ["this.GuideStepInfo!.Id", this.GuideStepInfo.Id], ["错误的操作映射", s]);
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "引导界面绑定输入", ["步骤Id", this.GuideStepInfo.Id], ["输入", t]);
      }
    }
  }
  IsAllCombineInputPass() {
    let i = true;
    for (const s of this.CombineInputMap) {
      var e = s[0];
      var t = s[1];
      if (Object.values(InputMappingsDefine_1.actionMappings).includes(e)) {
        i = i && t !== 1;
      } else if (Object.values(InputMappingsDefine_1.axisMappings).includes(e)) {
        i = i && t > 0;
      }
    }
    return i;
  }
  UnbindInput(e, t) {
    if (e.length === t.length && this.vzt) {
      for (let i = 0; i < t.length; i++) {
        var s = e[i];
        if (Object.values(InputMappingsDefine_1.actionMappings).includes(s)) {
          InputDistributeController_1.InputDistributeController.UnBindAction(t[i], this.vzt);
        } else if (Object.values(InputMappingsDefine_1.axisMappings).includes(s)) {
          InputDistributeController_1.InputDistributeController.UnBindAxis(t[i], this.vzt);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 16, "引导步骤  填的操作映射未定义", ["this.GuideStepInfo!.Id", this.GuideStepInfo.Id], ["错误的操作映射", s]);
        }
        this.CombineInputMap.delete(t[i]);
      }
      this.vzt = undefined;
    }
  }
  OnBeforeCreate() {
    this.gzt = false;
    this.GuideStepInfo = this.OpenParam;
    this.RemainDuration = this.TotalDuration;
    this.Czt = this.GuideStepInfo.Config.MinDuration;
    this.GuideStepInfo.AssignGuideView(this);
    this.Izt();
    this.OnBeforeGuideBaseViewCreate();
  }
  OnStart() {
    this.OnGuideBaseViewStart();
    this.TimeTicker = TimerSystem_1.GameplayTimerSystem.Forever(this.OnTick, TimerSystem_1.MIN_TIME);
  }
  OnAfterShow() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "[引导界面基类:OnShow]", ["引导步骤", this.GuideStepInfo.Id]);
    }
    var i = this.GuideStepInfo.Config;
    if (i.IsDangerous) {
      LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_Danger_Tip", this.RootItem);
    }
    var i = i.TimeScale;
    if (i < 1 && !ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      UiTimeDilation_1.UiTimeDilation.SetTimeDilationHighLevel(i, "GuideBase");
    }
    this.Izt();
    this.OnGuideViewAfterShow();
  }
  OnAfterHide() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "[引导界面基类:OnHide]", ["引导步骤", this.GuideStepInfo.Id]);
    }
    if (this.GuideStepInfo.Config.TimeScale < 1 && !ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      UiTimeDilation_1.UiTimeDilation.ResetTimeDilationHighLevel("GuideBase");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
    this.Tzt();
    this.OnGuideBaseViewAfterHide();
  }
  Izt() {
    var i;
    var e;
    if (!this.gzt) {
      this.gzt = true;
      if ((i = this.GuideStepInfo.Config).SuccessCondition && (e = new LevelConditionRegistry_1.ConditionPassCallback(this.OnFinishConditionOk), LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(i.SuccessCondition, e))) {
        this.fzt = e;
      }
      if (i.FailureCondition && (e = new LevelConditionRegistry_1.ConditionPassCallback(this.OnFinishConditionFail), LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(i.FailureCondition, e))) {
        this.pzt = e;
      }
    }
  }
  Tzt() {
    var i;
    if (this.gzt && (this.gzt = false, (i = this.GuideStepInfo.Config).SuccessCondition && this.fzt && (LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(i.SuccessCondition, this.fzt), this.fzt = undefined), i.FailureCondition) && this.pzt) {
      LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(i.FailureCondition, this.pzt);
      this.pzt = undefined;
    }
  }
  OnBeforeDestroy() {
    this.Khc = false;
    if (this.TimeTicker) {
      this.TimeTicker.Remove();
      this.TimeTicker = undefined;
    }
    var i = this.GuideStepInfo;
    this.OnGuideBaseViewDestroy();
    if (!this.IgnoreState) {
      if (this.IsFinished) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 16, "[OnDestroy]引导UI关闭时, 步骤已完成", ["步骤Id", i.Id]);
        }
        i.SwitchState(4);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 16, "[OnDestroy]引导UI关闭时, 步骤未完成", ["步骤Id", i.Id]);
        }
        i.SwitchState(3);
      }
    }
  }
  Szt() {
    this.eNt();
  }
  OnBeforeGuideBaseViewCreate() {}
  OnGuideBaseViewStart() {}
  OnGuideBaseViewAfterHide() {}
  OnGuideViewAfterShow() {}
  OnGuideBaseViewDestroy() {}
  OnGuideBaseViewAddEvent() {}
  OnGuideBaseViewRemoveEvent() {}
  OnGuideBaseViewTick(i) {}
  OnDurationChange(i) {}
  OnGuideViewCloseWhenFinish() {}
  OnCheckBaseViewFinishConditionOk() {
    return true;
  }
  OnCheckBaseViewFinishConditionFail() {
    return true;
  }
}
exports.GuideBaseView = GuideBaseView;
//# sourceMappingURL=GuideBaseView.js.map