"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideFocusView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const InputManager_1 = require("../../../Ui/Input/InputManager");
const UiManager_1 = require("../../../Ui/UiManager");
const GuideBaseView_1 = require("./GuideBaseView");
const GuideFocusItem_1 = require("./GuideFocusItem");
class GuideFocusView extends GuideBaseView_1.GuideBaseView {
  constructor() {
    super(...arguments);
    this.Config = undefined;
    this.IsAttachItemsReady = false;
    this.oZt = false;
    this.ReadyToShow = false;
    this.rZt = 4000;
    this.nZt = undefined;
    this.sZt = undefined;
    this.zJc = undefined;
    this.aZt = () => {
      var t;
      if (!!this.hZt && (!(t = UiManager_1.UiManager.GetViewByName("BattleView")?.GetGuideUiItemAndUiItemForShowEx(this.Config.ExtraParam)) || t[0] !== this.GuideStepInfo?.ViewData?.GetAttachedUiItem())) {
        this.GuideStepInfo.SwitchState(3);
      }
    };
    this.lZt = () => {
      var t = this._Zt();
      this.SetActive(t);
      if (this.IsAttachItemsReady !== t && (this.IsAttachItemsReady = t)) {
        this.GetRootItem().SetAlpha(0);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 16, "[聚焦引导界面:CheckAttachedItemVisible 附着UI对象可见性检查通过]", ["引导步骤", this.GuideStepInfo.Id]);
        }
        this.uZt();
      }
    };
    this.cZt = () => {
      this.UiViewSequence.PlaySequence("AutoLoopManual");
    };
    this.mZt = (t, e) => {
      if ((!this.RootItem || !!this.RootItem.bIsUIActive) && (!t || !(this.CombineInputMap.set(t, e), !this.IsAllCombineInputPass()))) {
        e = this.Config.InputEnums;
        this.UnbindInput(this.Config.InputEnums, e);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 53, "聚焦监听按键完成引导", ["最后按键", t]);
        }
        this.DoCloseByFinished();
      }
    };
    this.JJc = (t, e) => {
      if (e.Info?.GetContainerLayerType() === UiLayerType_1.ELayerType.Pop && this.Config?.ViewName !== t) {
        this.zJc = t;
      }
    };
    this.ZJc = t => {
      if (this.zJc === t) {
        this.zJc = undefined;
      }
    };
    this.JAm = t => {
      this.GetRootItem()?.SetUIActive(t);
    };
  }
  OnBeforeGuideBaseViewCreate() {
    this.Config = this.GuideStepInfo.ViewData.ViewConf;
    this.BindInputAfterSequence();
  }
  OnGuideBaseViewStart() {
    this.GetRootItem().SetAlpha(0);
    this.rZt = 4000;
    switch (this.Config.ContentDirection) {
      case "D":
        this.sZt = "StartManualUp";
        break;
      case "U":
        this.sZt = "StartManualDown";
        break;
      case "L":
        this.sZt = "StartManualRight";
        break;
      case "R":
        this.sZt = "StartManualLeft";
    }
    if (this.sZt) {
      this.UiViewSequence.AddSequenceFinishEvent(this.sZt, this.cZt);
    }
    if (this.Config?.HideWhenOtherPopViewOccur) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnViewDone, this.JJc);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.ZJc);
    }
  }
  OnGuideBaseViewAddEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonIndexRefresh, this.aZt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPreparePhotoScreenShot, this.JAm);
  }
  OnGuideBaseViewRemoveEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonIndexRefresh, this.aZt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPreparePhotoScreenShot, this.JAm);
  }
  OnGuideViewAfterShow() {
    this.RootItem.SetRaycastTarget(false);
    this.lZt();
    this.BindInputAfterSequence();
    InputManager_1.InputManager.SetShowCursor(this.Config.ShowMouse);
  }
  OnGuideBaseViewAfterHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
    var t = this.Config.InputEnums;
    this.UnbindInput(this.Config.InputEnums, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
  }
  OnGuideBaseViewDestroy() {
    if (this.nZt) {
      this.nZt.Destroy();
      this.nZt = undefined;
    }
    if (this.Config?.HideWhenOtherPopViewOccur) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnViewDone, this.JJc);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.ZJc);
    }
  }
  get hZt() {
    return this.Config?.ViewName === "BattleView" && this.Config.ExtraParam && this.Config.ExtraParam[0] === "Skill";
  }
  OnGuideBaseViewTick(t) {
    this.lZt();
    if (this.IsShow && this.Config.ShowMouse) {
      InputManager_1.InputManager.SetShowCursor(true);
    }
    this.nZt?.OnTick(t);
    this.dZt();
    if (this.oZt && !this.IsAttachItemsReady && (this.rZt -= t, this.rZt < 0)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 53, "[Guide][引导界面打开后5秒后目标没有显示出来,触发保底]", ["步骤Id", this.GuideStepInfo.Id]);
      }
      this.CloseMe();
    }
  }
  OnDurationChange(t) {
    this.nZt?.OnDurationChange(t);
  }
  _Zt() {
    var t = this.GuideStepInfo.ViewData.GetAttachedView();
    if (!t || !t.GetRootActor() || !t.IsUiActiveInHierarchy() || !t.IsShow || this.HasConflictView() || !this.CheckTickCondition() || this.zJc !== undefined) {
      return this.oZt = false;
    }
    this.oZt = true;
    if (this.GuideStepInfo.ViewData.IsMultiAttach) {
      t = this.GuideStepInfo.ViewData.GetMultiAttachItems();
      if (!t || t.length === 0) {
        return false;
      }
      for (const e of t) {
        if (!ObjectUtils_1.ObjectUtils.IsValid(e) || !e.IsUIActiveInHierarchy()) {
          return false;
        }
      }
      return true;
    }
    const e = this.GuideStepInfo.ViewData.GetAttachedUiItemForShow();
    return !!ObjectUtils_1.ObjectUtils.IsValid(e) && !!e.IsUIActiveInHierarchy();
  }
  uZt() {
    var t;
    var e = this.GuideStepInfo.ViewData.GetAttachedUiItem();
    if (e?.IsValid() && (t = this.GuideStepInfo.ViewData.GetAttachedUiItemForShow(), this.nZt = this.CZt(e, t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Guide", 16, "[聚焦引导界面:InitFocusItem 初始化附着UI对象管理类成功]", ["引导步骤", this.GuideStepInfo.Id], ["框住的按钮名称", e.GetDisplayName()], ["框住的显示节点名称", t.GetDisplayName()]);
    }
  }
  dZt() {
    if (this.GetActive() && this.ReadyToShow && (this.ReadyToShow = false, this.GetRootItem().SetAlpha(1), this.sZt ? this.UiViewSequence.PlaySequence(this.sZt) : this.cZt(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Guide", 16, "[聚焦引导界面:ShowInner 真正显示]", ["引导步骤", this.GuideStepInfo.Id]);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  GetGuideStepInfo() {
    return this.GuideStepInfo;
  }
  GetFocusViewConf() {
    return this.Config;
  }
  BindInputAfterSequence() {
    var t = this.Config.InputEnums;
    this.BindInput(this.Config.InputEnums, t, this.mZt);
  }
  OnGuideViewCloseWhenFinish() {
    if (this.UiViewSequence?.HasSequenceNameInPlaying("Start")) {
      this.UiViewSequence.StopPrevSequence(false, true);
    }
    this.nZt?.OnBaseViewCloseWhenFinish();
  }
  CZt(t, e) {
    var i = this.GetItem(0);
    i.SetActive(false);
    var t = new GuideFocusItem_1.GuideFocusItem(t, e, this);
    t.Init(i);
    return t;
  }
}
exports.GuideFocusView = GuideFocusView;
//# sourceMappingURL=GuideFocusView.js.map