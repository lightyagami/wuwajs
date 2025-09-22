"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonActivityView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../Help/HelpController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ActivityCommonDefine_1 = require("../ActivityCommonDefine");
const ActivityManager_1 = require("../ActivityManager");
const ActivityPageSelectContent_1 = require("./SubView/ActivityPageSelectContent");
const ActivitySwitchToggle_1 = require("./SubView/ActivitySwitchToggle");
const ActivityTipsButton_1 = require("./SubView/ActivityTipsButton");
class CommonActivityView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.e5e = true;
    this.lqe = undefined;
    this.t5e = 0;
    this.H41 = undefined;
    this.bel = undefined;
    this.i5e = undefined;
    this.Swd = undefined;
    this.qel = new Map();
    this.Mwd = undefined;
    this.Ewd = undefined;
    this.yvt = undefined;
    this.Iwd = undefined;
    this.Twd = ActivityCommonDefine_1.ACTIVITY_FILTER_ALL_ID;
    this.s5e = undefined;
    this.a5e = new Map();
    this.SPe = undefined;
    this.h5e = [];
    this.Nel = new Map();
    this.PRn = [];
    this.FY_ = [undefined, undefined];
    this.XY_ = [undefined, undefined];
    this.bwd = (t, i, e) => {
      var s = new ActivitySwitchToggle_1.ActivitySwitchToggle();
      s.InitData(t);
      s.SetOnToggleClicked(this.c5e);
      return s;
    };
    this.NY_ = () => {
      if (this.FY_[0]) {
        this.i5e.ScrollTo(this.FY_[0]);
      }
    };
    this.VY_ = () => {
      if (this.FY_[1]) {
        this.i5e.ScrollTo(this.FY_[1]);
      }
    };
    this._5e = () => {
      this.u5e(true);
    };
    this.XOe = () => {
      HelpController_1.HelpController.OpenHelpById(this.t5e);
    };
    this.$Oe = () => {
      this.CloseMe();
    };
    this.c5e = (t, i, e) => {
      if (t.Id === this.Swd) {
        this.Ewd?.SetToggleStateForce(1, false);
      } else if (e === 1) {
        if (t.TextId) {
          this.lqe?.SetTitleLocalText(t.TextId);
        }
        this.Ewd?.SetToggleStateForce(0, false);
        this.Ewd = i;
        this.Rwd(t.Id);
      }
    };
    this.C5e = () => {
      var t = new ActivityPageSelectContent_1.ActivityPageSelectContent();
      t.BindCanToggleExecuteChange(this.A5e);
      t.BindToggleClick(this.Bke);
      return t;
    };
    this.A5e = (t, i) => true;
    this.Bke = (t, i) => {
      if (i) {
        this.Gel(t, true);
      }
    };
    this.jY_ = t => {
      this.BNe(t);
      this.HY_();
    };
    this.$Y_ = () => {
      var t;
      var i = this.FY_;
      if (i[0] && i[1]) {
        t = this.i5e.IsItemInViewport(i[0], ActivityCommonDefine_1.REDDOT_TOLERANCE);
        i = this.i5e.IsItemInViewport(i[1], ActivityCommonDefine_1.REDDOT_TOLERANCE);
        this.XY_[0].SetUIActive(t === 1);
        this.XY_[1].SetUIActive(i === 2);
      } else {
        this.XY_[0].SetUIActive(false);
        this.XY_[1].SetUIActive(false);
      }
    };
    this.CLn = t => {
      if (!(t.length <= 0)) {
        this.lqe.SetCurrencyItemVisible(true);
        this.lqe.SetCurrencyItemList(t).catch(() => {});
      }
    };
    this.cMl = t => {
      this.UiBlurBehaviour?.ChangeNeedBlurState(t);
    };
    this.p5e = i => {
      if (i) {
        i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(i);
        if (i && i.CheckIfInShowTime()) {
          let t = undefined;
          t = i.TimeType === 0 ? i.LocalConfig.FilterTabType : ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID;
          this.qel.set(t, i.Id);
          if (t !== this.Swd) {
            this.wwd(t, true);
          } else {
            this.v5e(this.Swd, true);
          }
        }
      }
    };
    this.M5e = t => {
      if (this.k4e === t) {
        this.s5e?.RefreshView();
      }
    };
    this.OnActivityUpdate = () => {
      var t = () => {
        UiManager_1.UiManager.ResetToBattleView();
      };
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
      i.FunctionMap.set(1, t);
      i.FunctionMap.set(0, t);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.E5e = t => {
      this.s5e?.PlaySubViewSequence(t);
    };
    this.u5e = (t, i = 0, e) => {
      this.PRn = ActivityCommonDefine_1.activityViewStateSequence[i];
      if (t !== this.e5e) {
        this.e5e = t;
        this.UiViewSequence.PlaySequence(t ? this.PRn[0] : this.PRn[1], e);
        this.s5e?.OnCommonViewStateChange(t);
      }
      this.RefreshTabIcon();
    };
  }
  get k4e() {
    var t = this.Swd ?? this.yvt?.at(0)?.Id;
    if (t === undefined) {
      return 0;
    } else {
      return this.qel.get(t) ?? 0;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIDynScrollViewComponent], [16, UE.UIItem]];
    this.BtnBindInfo = [[6, this._5e], [11, this.NY_], [12, this.VY_]];
  }
  OnAddEventListener() {
    this.S5e();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityViewChange, this.p5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityViewRefreshCurrent, this.M5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.OnActivityUpdate);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityOpen, this.OnActivityUpdate);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetActivityViewState, this.u5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetActivityViewCurrency, this.CLn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeActivityViewNeedBlurState, this.cMl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.jY_);
  }
  OnRemoveEventListener() {
    this.y5e();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityViewChange, this.p5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityViewRefreshCurrent, this.M5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.OnActivityUpdate);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityOpen, this.OnActivityUpdate);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetActivityViewState, this.u5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetActivityViewCurrency, this.CLn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeActivityViewNeedBlurState, this.cMl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.jY_);
  }
  async OnBeforeStartAsync() {
    this.I5e();
    await this.T5e();
  }
  bvt() {
    var t = [];
    var i = ConfigManager_1.ConfigManager.ActivityConfig.GetAllActivityFilter();
    if (i) {
      var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities();
      for (const n of i) {
        var s = this.FilterActivitiesByTabId(e, n.Id);
        if (s.length !== 0) {
          if (n.Id === ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID) {
            t.push({
              IsLineType: true
            });
          }
          t.push({
            Id: n.Id,
            TextId: n.FilterName,
            IsLineType: false,
            IconPath: n.FilterIcon,
            Activities: s
          });
        }
      }
      this.yvt = t;
      this.Mwd.RefreshByData(this.yvt);
    }
  }
  I5e() {
    var t = this.GetScrollViewWithScrollbar(1);
    this.i5e = new GenericScrollViewNew_1.GenericScrollViewNew(t, this.C5e);
  }
  async T5e() {
    var t = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpCallBack(this.XOe);
    this.lqe.SetCloseCallBack(this.$Oe);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.bel = new ActivityTipsButton_1.ActivityTipsButton();
    t.push(this.bel.CreateByActorAsync(this.GetItem(7).GetOwner()));
    this.Mwd = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(15), this.GetItem(16), new ActivitySwitchToggle_1.ActivitySwitchToggleDynamicItem(), this.bwd);
    t.push(this.Mwd.Init());
    this.Iwd = new CommonDropDown_1.CommonDropDown(this.GetItem(14), t => new OneTextDropDownItem_1.OneTextDropDownItem(t), t => new OneTextTitleItem_1.OneTextTitleItem(t));
    this.Iwd.SetOnSelectCall(this.Lwd.bind(this));
    this.Iwd.SetShowType(0);
    t.push(this.Iwd.Init());
    await Promise.all(t);
  }
  OnStart() {
    var [t, i, e] = this.OpenParam ?? [4, 0, undefined];
    this.H41 = e;
    ModelManager_1.ModelManager.ActivityModel.SendActivityViewOpenLogData(t);
    this.PRn = ActivityCommonDefine_1.activityViewStateSequence[0];
    this.lqe.SetTitleLocalText("Activity_Title");
    this.uxt();
    this.bvt();
    let s = undefined;
    var n = [];
    for (const h of this.yvt) {
      if (!h.IsLineType) {
        for (const o of h.Activities) {
          n.push(o.Id);
          if (o.Id === i) {
            s = h.Id;
          }
        }
      }
    }
    if ((s = s ?? this.yvt?.at(0)?.Id) !== undefined) {
      if (ModelManager_1.ModelManager.ActivityModel.GetDebugPermanentFilterVisible()) {
        if (s !== ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID) {
          this.Twd = ModelManager_1.ModelManager.ActivityModel.GetActivityPermanentFilterId();
        }
        this.Pwd();
      }
      this.BindRedDotIds(n);
      this.XY_[0] = this.GetButton(11).RootUIComp;
      this.XY_[1] = this.GetButton(12).RootUIComp;
      this.qel.set(s, i);
      this.wwd(s, true);
    }
  }
  OnBeforeShow() {
    for (const t of this.h5e) {
      if (!t.CheckIfInShowTime()) {
        ControllerHolder_1.ControllerHolder.ActivityController.RequestActivityData().finally(() => {
          this.OnActivityUpdate();
        });
        return;
      }
    }
    this.BNe();
    this.HY_();
    this.i5e.BindScrollValueChange(this.$Y_);
    this.s5e?.RefreshView();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableFrameGeneration("CommonActivityView");
  }
  async OnBeforeHideAsync() {
    await this.s5e?.BeforeHideSelfAsync();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("CommonActivityView");
  }
  OnBeforeDestroy() {
    this.a5e.forEach((t, i) => {
      this.AddChild(t);
    });
    this.i5e.UnBindScrollValueChange();
    this.a5e.clear();
    if (this.Mwd) {
      this.Mwd.ClearChildren();
      this.Mwd = undefined;
    }
  }
  Rwd(t, i = true) {
    this.Swd = t;
    if (ModelManager_1.ModelManager.ActivityModel.GetDebugPermanentFilterVisible()) {
      this.GetItem(13)?.SetUIActive(t === ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID);
    } else {
      this.GetItem(13)?.SetUIActive(false);
    }
    this.GetItem(8).SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
    this.XY_[0]?.SetUIActive(false);
    this.XY_[1]?.SetUIActive(false);
    this.v5e(t, false).finally(() => {
      this.SPe.PlayLevelSequenceByName(i ? "SwitchModel" : "SwitchList", true);
      this.GetItem(8).SetUIActive(true);
      this.GetItem(9).SetUIActive(true);
      this.HY_();
    });
  }
  wwd(i, t) {
    var e = this.yvt?.findIndex(t => t.Id === i);
    if (e !== undefined && e !== -1 && (e = this.Mwd?.GetScrollItemFromIndex(e))) {
      e.OnSelected(t);
    }
  }
  async Gel(t, i) {
    if (t.Id !== this.k4e) {
      this.i5e.GetScrollItemByKey(this.k4e)?.SetToggleState(false, false);
    }
    this.qel.set(this.Swd, t.Id);
    if (!t.NeedSelfControlFirstRedPoint()) {
      ControllerHolder_1.ControllerHolder.ActivityController.RequestReadActivity(t);
    }
    await this.f5e(i);
  }
  S5e() {}
  y5e() {}
  BindRedDotIds(t) {
    for (const i of t) {
      this.BNe(i);
    }
  }
  BNe(t) {
    if (t) {
      var i = ModelManager_1.ModelManager.ActivityModel.GetActivityRedDotState(t);
      this.Nel.set(t, i);
    } else {
      for (const s of this.h5e) {
        var e = ModelManager_1.ModelManager.ActivityModel.GetActivityRedDotState(s.Id);
        this.Nel.set(s.Id, e);
      }
    }
  }
  HY_() {
    var i = [];
    for (let t = 0; t < this.h5e.length; t++) {
      var e = this.h5e[t].Id;
      if (this.Nel.get(e)) {
        i.push(t);
      }
    }
    this.FY_ = i.length <= 0 ? [undefined, undefined] : [this.i5e.GetItemByIndex(i[0]), this.i5e.GetItemByIndex(i[i.length - 1])];
  }
  async v5e(t, i) {
    var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities();
    this.h5e = this.FilterActivitiesByTabId(e, t);
    if (this.IsPermanentTab(t) && this.Twd !== ActivityCommonDefine_1.ACTIVITY_FILTER_ALL_ID) {
      this.h5e = this.h5e.filter(t => t.LocalConfig.PermanentFilterType === this.Twd);
    }
    await this.i5e.RefreshByDataAsync(this.h5e);
    let s = 0;
    for (let t = 0; t < this.h5e.length; t++) {
      if (this.k4e === this.h5e[t].Id) {
        s = t;
        break;
      }
    }
    e = this.i5e.GetScrollItemByIndex(s);
    if (e) {
      this.i5e.LateScrollTo(e.GetRootItem());
      e.SetToggleState(true, false);
      await this.Gel(this.h5e[s], i);
    }
  }
  async f5e(t) {
    var i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.k4e);
    this.D5e(i);
    await this.R5e(i, t);
  }
  D5e(t) {
    this.t5e = t.GetHelpId();
    this.lqe.SetHelpBtnActive(this.t5e !== 0);
    this.bel.SetActive(t.LocalConfig.ShowPermanentTips);
    this.RefreshTabIcon();
  }
  async WNe(t) {
    const i = new CustomPromise_1.CustomPromise();
    var e = this.GetTexture(5);
    e.SetUIActive(false);
    var t = t.BgTexturePath;
    this.SetTextureByPath(t, e, undefined, () => {
      i.SetResult();
    });
    await i.Promise;
  }
  async R5e(t, i) {
    let e = this.a5e.get(t);
    if (!e) {
      var s = ActivityManager_1.ActivityManager.GetActivityController(t.Type);
      var n = this.GetItem(3);
      var h = s.GetActivityResource(t);
      if (!(e = s.CreateSubPageComponent(t))) {
        return;
      }
      if (this.H41) {
        e.SetOpenParam(this.H41);
        this.H41 = undefined;
      }
      e.SetData(t);
      await e.CreateByPathAsync(h, n);
      this.a5e.set(t, e);
    }
    if (this.k4e === t.Id) {
      await this.WNe(t);
      this.s5e?.SetActive(false);
      this.lqe.SetCurrencyItemVisible(false);
      this.s5e = e;
      await this.s5e.BeforeShowSelfAsync();
      this.s5e.RefreshView();
      this.GetTexture(5).SetUIActive(true);
      this.s5e.SetActive(true);
      if (i) {
        if (this.UiViewSequence.HasSequenceNameInPlaying("Switch")) {
          this.UiViewSequence.ReplaySequence("Switch");
        } else {
          this.UiViewSequence.PlaySequence("Switch");
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectActivityAndSubViewReady, this.k4e);
    }
  }
  RefreshTabIcon() {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.k4e).LocalConfig;
    var t = this.e5e ? t.TabResource : t.TabResource2;
    if (t) {
      this.lqe.SetTitleIcon(t);
    }
  }
  uxt() {
    var t = this.GetText(10);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      t.SetUIActive(true);
    } else {
      t.SetUIActive(false);
    }
  }
  W6l(t) {
    this.GetText(10).SetText("DebugId: " + t);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (!(t.length <= 0)) {
      if (t[0] === "BackToBattleViewBtn") {
        if ((i = UE.LGUIBPLibrary.GetComponentInChildren(this.GetRootActor(), UE.TsUiHomeHelper_C.StaticClass(), false)?.GetOwner()) && (i = UE.LGUIBPLibrary.GetComponentInChildren(i, UE.UIButtonComponent.StaticClass(), false)?.GetRootComponent())) {
          return [i, i];
        } else {
          return undefined;
        }
      } else if (this.s5e !== undefined) {
        return this.s5e.GetGuideUiItemAndUiItemForShowEx(t);
      } else {
        return undefined;
      }
    }
  }
  IsPermanentTab(t) {
    return t === ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID;
  }
  FilterActivitiesByTabId(t, i) {
    const e = this.IsPermanentTab(i);
    return t.filter(t => e ? t.TimeType === 1 : t.TimeType === 0 && t.LocalConfig?.FilterTabType === i);
  }
  Lwd(t, i) {
    this.Twd = i.Id;
    if (this.IsPermanentTab(this.Swd)) {
      this.Rwd(this.Swd, false);
      ModelManager_1.ModelManager.ActivityModel?.SetActivityPermanentFilterId(this.Twd);
    }
  }
  Pwd() {
    var i = ConfigManager_1.ConfigManager.ActivityConfig.GetAllActivityPermanentFilter();
    if (i) {
      var e = this.yvt?.find(t => t.Id === ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID);
      var s = [i.find(t => t.Id === ActivityCommonDefine_1.ACTIVITY_FILTER_ALL_ID)];
      if (e) {
        var n = new Set(e.Activities?.map(t => t.LocalConfig.PermanentFilterType) ?? []);
        for (const h of i) {
          if (h.Id !== ActivityCommonDefine_1.ACTIVITY_FILTER_ALL_ID && n.has(h.Id)) {
            s.push(h);
          }
        }
      }
      let t = s.findIndex(t => t.Id === this.Twd);
      if (t === -1) {
        t = 0;
      }
      this.Iwd.InitScroll(s, t => {
        return new LguiUtil_1.TableTextArgNew(t.FilterName);
      }, t);
    }
  }
}
exports.CommonActivityView = CommonActivityView;
//# sourceMappingURL=CommonActivityView.js.map