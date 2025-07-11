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
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../Help/HelpController");
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
    this.o5e = undefined;
    this.r5e = undefined;
    this.n5e = undefined;
    this.qel = new Map([[0, 0], [1, 0]]);
    this.s5e = undefined;
    this.a5e = new Map();
    this.SPe = undefined;
    this.h5e = [];
    this.Nel = new Map();
    this.PRn = [];
    this.FY_ = [undefined, undefined];
    this.XY_ = [undefined, undefined];
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
    this.c5e = (t, i) => {
      if (i) {
        this.m5e(t);
      }
    };
    this.d5e = (t, i) => this.n5e !== t;
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
    this.p5e = t => {
      if ((t &&= ModelManager_1.ModelManager.ActivityModel.GetActivityById(t)) && t.CheckIfInShowTime()) {
        this.qel.set(t.TimeType, t.Id);
        if (t.TimeType !== this.n5e) {
          this.Oel(t.TimeType, true);
        } else {
          this.v5e(this.n5e, true);
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
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetToBattleView);
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
    return this.qel.get(this.n5e ?? 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UITexture], [7, UE.UITexture], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[8, this._5e], [14, this.NY_], [15, this.VY_]];
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
    this.o5e = new ActivitySwitchToggle_1.ActivitySwitchToggle(0);
    t.push(this.o5e.CreateByActorAsync(this.GetItem(3).GetOwner()));
    this.AddChild(this.o5e);
    this.o5e.BindOnToggleFunction(this.c5e);
    this.o5e.BindOnCanToggleExecuteChange(this.d5e);
    this.r5e = new ActivitySwitchToggle_1.ActivitySwitchToggle(1);
    t.push(this.r5e.CreateByActorAsync(this.GetItem(4).GetOwner()));
    this.AddChild(this.r5e);
    this.r5e.BindOnToggleFunction(this.c5e);
    this.r5e.BindOnCanToggleExecuteChange(this.d5e);
    this.bel = new ActivityTipsButton_1.ActivityTipsButton();
    t.push(this.bel.CreateByActorAsync(this.GetItem(10).GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    var [t, i, e] = this.OpenParam ?? [4, 0, undefined];
    this.H41 = e;
    ModelManager_1.ModelManager.ActivityModel.SendActivityViewOpenLogData(t);
    this.PRn = ActivityCommonDefine_1.activityViewStateSequence[0];
    this.lqe.SetTitleLocalText("Activity_Title");
    this.uxt();
    var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities();
    let s = undefined;
    var h = [];
    var n = [];
    var r = [];
    var o = [];
    for (const v of e) {
      if (v.Id === i) {
        s = v;
      }
      (v.TimeType === 0 ? (n.push(v.Id), h) : (o.push(v.Id), r)).push(v);
    }
    var [t, e] = [h.length > 0, r.length > 0];
    s = s || (t ? h : r)[0];
    this.GetItem(9).SetUIActive(t && e);
    this.BindRedDotIds(n);
    this.BindRedDotIds(o);
    this.o5e.BindRedDotIds(n);
    this.r5e.BindRedDotIds(o);
    this.XY_[0] = this.GetButton(14).RootUIComp;
    this.XY_[1] = this.GetButton(15).RootUIComp;
    this.h5e = s.TimeType === 0 ? h : r;
    this.qel.set(s.TimeType, s.Id);
    this.Oel(s.TimeType, false);
    this.m5e(s.TimeType, false);
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
  }
  m5e(t, i = true) {
    ((this.n5e = t) === 0 ? this.r5e : this.o5e).SetToggleState(false, false);
    this.GetItem(11).SetUIActive(false);
    this.GetItem(12).SetUIActive(false);
    this.XY_[0]?.SetUIActive(false);
    this.XY_[1]?.SetUIActive(false);
    this.v5e(t, false).finally(() => {
      this.SPe.PlayLevelSequenceByName(i ? "SwitchModel" : "SwitchList", true);
      this.GetItem(11).SetUIActive(true);
      this.GetItem(12).SetUIActive(true);
      this.HY_();
    });
  }
  Oel(t, i) {
    (t === 0 ? this.o5e : this.r5e).SetToggleState(true, i);
  }
  async Gel(t, i) {
    if (t.Id !== this.k4e) {
      this.i5e.GetScrollItemByKey(this.k4e)?.SetToggleState(false, false);
    }
    this.qel.set(this.n5e, t.Id);
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
  async v5e(i, t) {
    var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities();
    this.h5e = e.filter(t => t.TimeType === i);
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
      await this.Gel(this.h5e[s], t);
    }
  }
  async f5e(t) {
    var i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.k4e);
    this.D5e(i);
    await this.R5e(i, t);
  }
  D5e(t) {
    var i = t.GetTitle();
    this.t5e = t.GetHelpId();
    this.lqe.SetHelpBtnActive(this.t5e !== 0);
    this.lqe.SetTitle(i.replace(/<.*?>/g, ""));
    this.bel.SetActive(t.LocalConfig.ShowPermanentTips);
    this.RefreshTabIcon();
  }
  async WNe(t) {
    const i = new CustomPromise_1.CustomPromise();
    var e = this.GetTexture(7);
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
      var h = this.GetItem(5);
      var n = s.GetActivityResource(t);
      if (!(e = s.CreateSubPageComponent(t))) {
        return;
      }
      if (this.H41) {
        e.SetOpenParam(this.H41);
        this.H41 = undefined;
      }
      e.SetData(t);
      await e.CreateByPathAsync(n, h);
      this.a5e.set(t, e);
    }
    if (this.k4e === t.Id) {
      await this.WNe(t);
      this.s5e?.SetActive(false);
      this.lqe.SetCurrencyItemVisible(false);
      this.s5e = e;
      await this.s5e.BeforeShowSelfAsync();
      this.s5e.RefreshView();
      this.GetTexture(7).SetUIActive(true);
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
    var t = this.GetText(13);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      t.SetUIActive(true);
    } else {
      t.SetUIActive(false);
    }
  }
  W6l(t) {
    this.GetText(13).SetText("DebugId: " + t);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (this.s5e !== undefined) {
      return this.s5e.GetGuideUiItemAndUiItemForShowEx(t);
    }
  }
}
exports.CommonActivityView = CommonActivityView;
//# sourceMappingURL=CommonActivityView.js.map