"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonActivityView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const Lru_1 = require("../../../../Core/Container/Lru");
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
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
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ActivityCommonDefine_1 = require("../ActivityCommonDefine");
const ActivityDefine_1 = require("../ActivityDefine");
const ActivityManager_1 = require("../ActivityManager");
const ActivityPageSelectContent_1 = require("./SubView/ActivityPageSelectContent");
const ActivitySwitchToggle_1 = require("./SubView/ActivitySwitchToggle");
const ActivityTipsButton_1 = require("./SubView/ActivityTipsButton");
class CommonActivityView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Dvt = true;
    this.e5e = true;
    this.lqe = undefined;
    this.t5e = 0;
    this.H41 = undefined;
    this.bel = undefined;
    this.i5e = undefined;
    this.XPd = undefined;
    this.qel = new Map();
    this.YPd = undefined;
    this.zPd = undefined;
    this.yvt = undefined;
    this.JPd = undefined;
    this.ZPd = ActivityCommonDefine_1.ACTIVITY_FILTER_ALL_ID;
    this.lLm = false;
    this.s5e = undefined;
    this.xpm = undefined;
    this.SPe = undefined;
    this.h5e = [];
    this.Nel = new Map();
    this.PRn = [];
    this.FY_ = [undefined, undefined];
    this.XY_ = [undefined, undefined];
    this.eAd = (i, t, e) => {
      var s = new ActivitySwitchToggle_1.ActivitySwitchToggle();
      s.InitData(i);
      s.SetOnToggleClicked(this.c5e);
      return s;
    };
    this.tym = i => {
      return ActivityManager_1.ActivityManager.GetActivityController(i.Type).CreateSubPageComponent(i);
    };
    this.Bpm = i => {
      if (i.IsShowOrShowing) {
        i.Hide();
      }
      i.Destroy();
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
    this.c5e = (i, t, e) => {
      if (i.Id === this.XPd) {
        this.zPd?.SetToggleStateForce(1, false);
      } else if (e === 1) {
        if (i.TextId) {
          this.lqe?.SetTitleLocalText(i.TextId);
        }
        this.zPd?.SetToggleStateForce(0, false);
        this.zPd = t;
        this.tAd(i.Id);
      }
    };
    this.C5e = () => {
      var i = new ActivityPageSelectContent_1.ActivityPageSelectContent();
      i.BindCanToggleExecuteChange(this.A5e);
      i.BindToggleClick(this.Bke);
      return i;
    };
    this.A5e = (i, t) => true;
    this.Bke = (i, t) => {
      if (t) {
        this.Gel(i, true);
      }
    };
    this.jY_ = i => {
      this.BNe(i);
      this.HY_();
      this.Kjf(i);
    };
    this.$Y_ = () => {
      var i;
      var t = this.FY_;
      if (t[0] && t[1]) {
        i = this.i5e.IsItemInViewport(t[0], ActivityCommonDefine_1.REDDOT_TOLERANCE);
        t = this.i5e.IsItemInViewport(t[1], ActivityCommonDefine_1.REDDOT_TOLERANCE);
        this.XY_[0].SetUIActive(i === 1);
        this.XY_[1].SetUIActive(t === 2);
      } else {
        this.XY_[0].SetUIActive(false);
        this.XY_[1].SetUIActive(false);
      }
    };
    this.CLn = i => {
      if (!(i.length <= 0)) {
        this.lqe.SetCurrencyItemVisible(true);
        this.lqe.SetCurrencyItemList(i).catch(() => {});
      }
    };
    this.cMl = i => {
      this.UiBlurBehaviour?.ChangeNeedBlurState(i);
    };
    this.p5e = t => {
      if (t) {
        t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(t);
        if (t && t.CheckIfInShowTime()) {
          let i = undefined;
          i = t.TimeType === 0 ? t.LocalConfig.FilterTabType : ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID;
          this.qel.set(i, t.Id);
          if (i !== this.XPd) {
            this.iAd(i, true);
          } else {
            this.v5e(this.XPd, true);
          }
        }
      }
    };
    this.M5e = i => {
      if (this.k4e === i) {
        this.s5e?.RefreshView();
      }
    };
    this.OnActivityUpdate = () => {
      var i = () => {
        UiManager_1.UiManager.ResetToBattleView();
      };
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
      t.FunctionMap.set(1, i);
      t.FunctionMap.set(0, i);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.E5e = i => {
      this.s5e?.PlaySubViewSequence(i);
    };
    this.u5e = (i, t = 0, e) => {
      this.PRn = ActivityCommonDefine_1.activityViewStateSequence[t];
      if (i !== this.e5e) {
        this.e5e = i;
        this.UiViewSequence.PlaySequence(i ? this.PRn[0] : this.PRn[1], e);
        this.s5e?.OnCommonViewStateChange(i);
      }
      this.RefreshTabIcon();
    };
  }
  get k4e() {
    var i = this.XPd ?? this.yvt?.at(0)?.Id;
    if (i === undefined) {
      return 0;
    } else {
      return this.qel.get(i) ?? 0;
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
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetActivityViewState, this.u5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetActivityViewCurrency, this.CLn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeActivityViewNeedBlurState, this.cMl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.jY_);
  }
  async OnBeforeStartAsync() {
    ControllerHolder_1.ControllerHolder.ActivityController.EnableRefreshTimer(TimeUtil_1.TimeUtil.InverseMillisecond);
    this.I5e();
    var i = Info_1.Info.IsLowMemoryDevice ? ActivityDefine_1.LOW_MEMORY_CACHE_VIEW_COUNT : ActivityDefine_1.NORMAL_MEMORY_CACHE_VIEW_COUNT;
    this.xpm = new Lru_1.Lru(i, this.tym, this.Bpm);
    await this.T5e();
  }
  bvt() {
    var i = [];
    var t = ConfigManager_1.ConfigManager.ActivityConfig.GetAllActivityFilter();
    if (t) {
      var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities();
      for (const n of t) {
        var s = this.FilterActivitiesByTabId(e, n.Id);
        if (s.length !== 0) {
          if (n.Id === ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID) {
            i.push({
              IsLineType: true
            });
          }
          i.push({
            Id: n.Id,
            TextId: n.FilterName,
            IsLineType: false,
            IconPath: n.FilterIcon,
            Activities: s
          });
        }
      }
      this.yvt = i;
      this.YPd.RefreshByData(this.yvt);
    }
  }
  I5e() {
    var i = this.GetScrollViewWithScrollbar(1);
    this.i5e = new GenericScrollViewNew_1.GenericScrollViewNew(i, this.C5e);
  }
  async T5e() {
    var i = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpCallBack(this.XOe);
    this.lqe.SetCloseCallBack(this.$Oe);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.bel = new ActivityTipsButton_1.ActivityTipsButton();
    i.push(this.bel.CreateByActorAsync(this.GetItem(7).GetOwner()));
    this.YPd = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(15), this.GetItem(16), new ActivitySwitchToggle_1.ActivitySwitchToggleDynamicItem(), this.eAd);
    i.push(this.YPd.Init());
    this.JPd = new CommonDropDown_1.CommonDropDown(this.GetItem(14), i => new OneTextDropDownItem_1.OneTextDropDownItem(i), i => new OneTextTitleItem_1.OneTextTitleItem(i));
    this.JPd.SetOnSelectCall(this.rAd.bind(this));
    this.JPd.SetShowType(0);
    i.push(this.JPd.Init());
    await Promise.all(i);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
    var [i, t, e] = this.OpenParam ?? [4, 0, undefined];
    this.H41 = e;
    ModelManager_1.ModelManager.ActivityModel.SendActivityViewOpenLogData(i);
    this.PRn = ActivityCommonDefine_1.activityViewStateSequence[0];
    this.lqe.SetTitleLocalText("Activity_Title");
    this.uxt();
    this.bvt();
    let s = undefined;
    var n = [];
    for (const h of this.yvt) {
      if (!h.IsLineType) {
        for (const r of h.Activities) {
          n.push(r.Id);
          if (r.Id === t) {
            s = h.Id;
          }
        }
      }
    }
    if ((s = s ?? this.yvt?.at(0)?.Id) !== undefined) {
      if (ModelManager_1.ModelManager.ActivityModel.GetDebugPermanentFilterVisible()) {
        if (s !== ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID) {
          this.ZPd = ModelManager_1.ModelManager.ActivityModel.GetActivityPermanentFilterId();
        }
        this.oAd();
      }
      this.BindRedDotIds(n);
      this.XY_[0] = this.GetButton(11).RootUIComp;
      this.XY_[1] = this.GetButton(12).RootUIComp;
      this.qel.set(s, t);
      this.iAd(s, true);
    }
  }
  OnBeforeShow() {
    for (const i of this.h5e) {
      if (!i.CheckIfInShowTime()) {
        ControllerHolder_1.ControllerHolder.ActivityController.RequestActivityData().finally(() => {
          this.OnActivityUpdate();
        });
        return;
      }
    }
    this.BNe();
    this.HY_();
    if (!this.Dvt) {
      this.J$f();
    }
    this.i5e.BindScrollValueChange(this.$Y_);
    this.s5e?.RefreshView();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableFrameGeneration("CommonActivityView");
    this.Dvt = false;
  }
  async OnBeforeHideAsync() {
    await this.s5e?.BeforeHideSelfAsync();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("CommonActivityView");
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
    ControllerHolder_1.ControllerHolder.ActivityController.DisableRefreshTimer();
    this.i5e.UnBindScrollValueChange();
    if (this.YPd) {
      this.YPd.ClearChildren();
      this.YPd = undefined;
    }
  }
  OnAfterDestroy() {
    this.s5e?.Destroy();
    this.xpm.Clear();
  }
  tAd(i, t = true) {
    this.XPd = i;
    if (ModelManager_1.ModelManager.ActivityModel.GetDebugPermanentFilterVisible()) {
      this.GetItem(13)?.SetUIActive(i === ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID);
    } else {
      this.GetItem(13)?.SetUIActive(false);
    }
    this.GetItem(8).SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
    this.XY_[0]?.SetUIActive(false);
    this.XY_[1]?.SetUIActive(false);
    this.lLm = true;
    this.v5e(i, false).finally(() => {
      this.SPe.PlayLevelSequenceByName(t ? "SwitchModel" : "SwitchList", true);
      this.GetItem(8).SetUIActive(true);
      this.GetItem(9).SetUIActive(true);
      this.HY_();
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.lLm = false;
        this.HY_();
        this.$Y_();
      }, 100);
    });
  }
  iAd(t, i) {
    var e = this.yvt?.findIndex(i => i.Id === t);
    if (e !== undefined && e !== -1 && (e = this.YPd?.GetScrollItemFromIndex(e))) {
      e.OnSelected(i);
    }
  }
  async Gel(i, t) {
    if (i.Id !== this.k4e) {
      this.i5e.GetScrollItemByKey(this.k4e)?.SetToggleState(false, false);
    }
    this.qel.set(this.XPd, i.Id);
    if (!i.NeedSelfControlFirstRedPoint()) {
      ControllerHolder_1.ControllerHolder.ActivityController.RequestReadActivity(i);
    }
    await this.f5e(t);
  }
  S5e() {}
  y5e() {}
  BindRedDotIds(i) {
    for (const t of i) {
      this.BNe(t);
    }
  }
  BNe(i) {
    if (i) {
      var t = ModelManager_1.ModelManager.ActivityModel.GetActivityRedDotState(i);
      this.Nel.set(i, t);
    } else {
      for (const s of this.h5e) {
        var e = ModelManager_1.ModelManager.ActivityModel.GetActivityRedDotState(s.Id);
        this.Nel.set(s.Id, e);
      }
    }
  }
  HY_() {
    if (this.lLm) {
      this.FY_ = [undefined, undefined];
    } else {
      var t = [];
      for (let i = 0; i < this.h5e.length; i++) {
        var e = this.h5e[i].Id;
        if (this.Nel.get(e)) {
          t.push(i);
        }
      }
      this.FY_ = t.length <= 0 ? [undefined, undefined] : [this.i5e.GetItemByIndex(t[0]), this.i5e.GetItemByIndex(t[t.length - 1])];
    }
  }
  Kjf(i) {
    i = this.i5e.GetGenericLayout()?.GetLayoutItemByKey(i);
    if (i) {
      i.RefreshBubbleAndCheckTimer();
    }
  }
  J$f() {
    var i = this.i5e.GetGenericLayout()?.GetLayoutItemList();
    if (i) {
      for (const t of i) {
        t.RefreshBubbleAndCheckTimer();
      }
    }
  }
  async v5e(i, t) {
    var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities();
    this.h5e = this.FilterActivitiesByTabId(e, i);
    if (this.IsPermanentTab(i) && this.ZPd !== ActivityCommonDefine_1.ACTIVITY_FILTER_ALL_ID) {
      this.h5e = this.h5e.filter(i => i.LocalConfig.PermanentFilterType === this.ZPd);
    }
    var s = new LogReportDefine_1.OnClickActivityCategorytab();
    if (i === 1) {
      s.i_type = 1;
    } else if (i === 3) {
      s.i_type = 2;
    } else if (i === ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID) {
      s.i_type = 3;
    }
    s.o_content = [];
    for (const h of this.h5e) {
      s.o_content.push(new ActivityDefine_1.ActivityLogReportInfo(h.Id, Number(h.Type)));
    }
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(s);
    await this.i5e.RefreshByDataAsync(this.h5e);
    let n = 0;
    for (let i = 0; i < this.h5e.length; i++) {
      if (this.k4e === this.h5e[i].Id) {
        n = i;
        break;
      }
    }
    e = this.i5e.GetScrollItemByIndex(n);
    if (e) {
      this.i5e.LateScrollTo(e.GetRootItem());
      e.SetToggleState(true, false);
      await this.Gel(this.h5e[n], t);
    }
  }
  async f5e(i) {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.k4e);
    this.D5e(t);
    await this.R5e(t, i);
  }
  D5e(i) {
    this.t5e = i.GetHelpId();
    this.lqe.SetHelpBtnActive(this.t5e !== 0);
    this.bel.SetActive(i.LocalConfig.ShowPermanentTips);
    this.RefreshTabIcon();
  }
  async WNe(i) {
    const t = new CustomPromise_1.CustomPromise();
    var e = this.GetTexture(5);
    e.SetUIActive(false);
    var i = i.BgTexturePath;
    this.SetTextureByPath(i, e, undefined, () => {
      t.SetResult();
    });
    await t.Promise;
  }
  async R5e(i, t) {
    let e = this.xpm.Get(i);
    if (!e) {
      if (!(e = this.xpm.Create(i))) {
        return;
      }
      var s = ActivityManager_1.ActivityManager.GetActivityController(i.Type);
      var n = this.GetItem(3);
      var s = s.GetActivityResource(i);
      if (this.H41) {
        e.SetOpenParam(this.H41);
        this.H41 = undefined;
      }
      e.SetData(i);
      await e.CreateByPathAsync(s, n);
    }
    if (this.k4e === i.Id) {
      await this.WNe(i);
      if (this.s5e) {
        this.s5e.SetActive(false);
        this.xpm.Put(this.s5e);
      }
      this.lqe.SetCurrencyItemVisible(false);
      this.s5e = e;
      await this.s5e.BeforeShowSelfAsync();
      this.s5e.RefreshView();
      this.GetTexture(5).SetUIActive(true);
      this.s5e.SetActive(true);
      if (t) {
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
    var i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.k4e).LocalConfig;
    var i = this.e5e ? i.TabResource : i.TabResource2;
    if (i) {
      this.lqe.SetTitleIcon(i);
    }
  }
  uxt() {
    var i = this.GetText(10);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      i.SetUIActive(true);
    } else {
      i.SetUIActive(false);
    }
  }
  W6l(i) {
    this.GetText(10).SetText("DebugId: " + i);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (!(i.length <= 0)) {
      var t;
      var e = i[0];
      if (e === "BackToBattleViewBtn") {
        if ((t = UE.LGUIBPLibrary.GetComponentInChildren(this.GetRootActor(), UE.TsUiHomeHelper_C.StaticClass(), false)?.GetOwner()) && (t = UE.LGUIBPLibrary.GetComponentInChildren(t, UE.UIButtonComponent.StaticClass(), false)?.GetRootComponent())) {
          return [t, t];
        } else {
          return undefined;
        }
      }
      if (e !== "FirstRecommendActivityTog") {
        if (this.s5e !== undefined) {
          return this.s5e.GetGuideUiItemAndUiItemForShowEx(i);
        } else {
          return undefined;
        }
      }
      {
        let t = undefined;
        for (let i = 0; i < this.h5e.length; i++) {
          if (this.h5e[i].LocalConfig?.IsTabEffectNotice) {
            t = this.i5e.GetItemByIndex(i);
            this.i5e.ScrollTo(t);
            break;
          }
        }
        if (t) {
          return [t, t];
        } else {
          return undefined;
        }
      }
    }
  }
  IsPermanentTab(i) {
    return i === ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID;
  }
  FilterActivitiesByTabId(i, t) {
    const e = this.IsPermanentTab(t);
    return i.filter(i => (!i.Type || !ActivityDefine_1.hideActivityTypeList.includes(i.Type)) && !(e ? i.TimeType !== 1 : i.TimeType !== 0 || i.LocalConfig?.FilterTabType !== t));
  }
  rAd(i, t) {
    this.ZPd = t.Id;
    if (this.IsPermanentTab(this.XPd)) {
      this.tAd(this.XPd, false);
      ModelManager_1.ModelManager.ActivityModel?.SetActivityPermanentFilterId(this.ZPd);
    }
  }
  oAd() {
    var t = ConfigManager_1.ConfigManager.ActivityConfig.GetAllActivityPermanentFilter();
    if (t) {
      var e = this.yvt?.find(i => i.Id === ActivityCommonDefine_1.ACTIVITY_PERMANENT_TAB_ID);
      var s = [t.find(i => i.Id === ActivityCommonDefine_1.ACTIVITY_FILTER_ALL_ID)];
      if (e) {
        var n = new Set(e.Activities?.map(i => i.LocalConfig.PermanentFilterType) ?? []);
        for (const h of t) {
          if (h.Id !== ActivityCommonDefine_1.ACTIVITY_FILTER_ALL_ID && n.has(h.Id)) {
            s.push(h);
          }
        }
      }
      let i = s.findIndex(i => i.Id === this.ZPd);
      if (i === -1) {
        i = 0;
      }
      this.JPd.InitScroll(s, i => {
        return new LguiUtil_1.TableTextArgNew(i.FilterName);
      }, i);
    }
  }
}
exports.CommonActivityView = CommonActivityView;
//# sourceMappingURL=CommonActivityView.js.map