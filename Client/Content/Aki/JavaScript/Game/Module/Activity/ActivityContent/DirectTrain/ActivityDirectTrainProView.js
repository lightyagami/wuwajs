"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDirectTrainProView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../../../GameSettings/GameSettingsDeviceRender");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const HelpController_1 = require("../../../Help/HelpController");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityManager_1 = require("../../ActivityManager");
const ActivityTipsButton_1 = require("../../View/SubView/ActivityTipsButton");
const ActivityDirectTrainProPageSelectContent_1 = require("./ActivityDirectTrainProPageSelectContent");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
class ActivityDirectTrainProView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.zjm = 0;
    this.h5e = [];
    this.Jjm = new Map();
    this.Zjm = undefined;
    this.eHm = new Map();
    this.i5e = undefined;
    this.s5e = undefined;
    this.lqe = undefined;
    this.bel = undefined;
    this.C5e = () => {
      var t = new ActivityDirectTrainProPageSelectContent_1.ActivityDirectTrainProPageSelectContent();
      t.BindCanToggleExecuteChange((t, i) => true);
      t.BindToggleClick(this.Bke);
      return t;
    };
    this.Bke = (t, i) => {
      if (i) {
        this.Gel(t);
      }
    };
    this.CLn = t => {
      if (!(t.length <= 0)) {
        this.lqe.SetCurrencyItemVisible(true);
        this.lqe.SetCurrencyItemList(t).catch(() => {});
      }
    };
    this._5e = () => {
      this.s5e?.OnCommonViewStateChange(false);
      this.JB1();
    };
    this.XOe = () => {
      HelpController_1.HelpController.OpenHelpById(this.t5e);
    };
    this.$Oe = () => {
      this.CloseMe();
    };
    this.E5e = t => {
      this.s5e?.PlaySubViewSequence(t);
    };
  }
  get tHm() {
    var t = this.Jjm.get(this.zjm) ?? 0;
    return this.h5e[t];
  }
  get t5e() {
    return this.tHm.GetHelpId();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[8, this._5e]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetActivityViewCurrency, this.CLn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetActivityViewCurrency, this.CLn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
  }
  async OnBeforeStartAsync() {
    this.Fq();
    this.I5e();
    await Promise.all([this.T5e(), this.i5e.RefreshByDataAsync(this.h5e)]);
    this.GetButton(14)?.RootUIComp.SetUIActive(false);
    this.GetButton(15)?.RootUIComp.SetUIActive(false);
    this.GetItem(2)?.SetUIActive(false);
    this.GetItem(9)?.SetUIActive(false);
    this.GetItem(10)?.SetUIActive(false);
    ControllerHolder_1.ControllerHolder.ActivityController?.EnableRefreshTimer(TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  OnStart() {
    this.lqe.SetTitleLocalText("Activity_Title");
    this.uxt();
    this.D5e();
    var t = this.Zjm?.ForceRemindIndex;
    this.Gel(this.h5e[t ?? 0]);
    this.GetButton(8).GetRootComponent().SetUIActive(false);
  }
  OnBeforeShow() {
    this.s5e?.RefreshView();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableDLSSG("CommonActivityView");
  }
  async OnBeforeHideAsync() {
    await this.s5e?.BeforeHideSelfAsync();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableDLSSG("CommonActivityView");
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.ActivityController?.DisableRefreshTimer();
  }
  OnAfterDestroy() {
    this.eHm.clear();
  }
  Fq() {
    this.Zjm = this.OpenParam;
    if (this.Zjm === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityDirectTrain", 95, "[剧情直通车]InitData()->", ["直通车数据异常", typeof this.OpenParam]);
      }
    } else {
      this.Jjm.clear();
      for (const t of this.Zjm.ActivityDataList) {
        this.Jjm.set(t.Id, this.h5e.length);
        this.h5e.push(t);
      }
    }
  }
  async bNe(t) {
    this.i5e.GetScrollItemByKey(this.zjm)?.SetToggleState(false, false);
    this.zjm = t;
    this.i5e.GetScrollItemByKey(t)?.SetToggleState(true, true);
    this.D5e();
    await this.R5e(this.tHm, true);
  }
  I5e() {
    var t = this.GetScrollViewWithScrollbar(1);
    this.i5e = new GenericScrollViewNew_1.GenericScrollViewNew(t, this.C5e);
  }
  async Gel(t) {
    if (t && t.Id !== this.zjm) {
      await this.bNe(t.Id);
    }
  }
  async T5e() {
    var t = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpCallBack(this.XOe);
    this.lqe.SetCloseCallBack(this.$Oe);
    this.bel = new ActivityTipsButton_1.ActivityTipsButton();
    t.push(this.bel.CreateByActorAsync(this.GetItem(10).GetOwner()));
    await Promise.all(t);
  }
  D5e() {
    var t = this.tHm.GetTitle();
    this.lqe.SetHelpBtnActive(this.t5e !== 0);
    this.lqe.SetTitle(t.replace(/<.*?>/g, ""));
    this.bel.SetActive(this.tHm.LocalConfig.ShowPermanentTips);
    this.JB1();
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
  async iHm(t) {
    var i = this.eHm.get(t.Id);
    if (i) {
      return i;
    }
    var i = ActivityManager_1.ActivityManager.GetActivityController(this.tHm.Type);
    var e = this.GetItem(5);
    var s = i.GetActivityResource(this.tHm);
    const r = i.CreateSubPageComponent(this.tHm);
    r.SetData(this.tHm);
    i = r.CreateByPathAsync(s, e).then(() => r);
    this.eHm.set(t.Id, i);
    return i;
  }
  async R5e(t, i) {
    var e = await this.iHm(this.tHm);
    if (this.zjm === t.Id && (await this.WNe(this.tHm), this.s5e && this.s5e.SetActive(false), this.s5e = e, await this.s5e.BeforeShowSelfAsync(), this.s5e.RefreshView(), this.GetTexture(7).SetUIActive(true), this.s5e.SetActive(true), i)) {
      if (this.UiViewSequence.HasSequenceNameInPlaying("Switch")) {
        this.UiViewSequence.ReplaySequence("Switch");
      } else {
        this.UiViewSequence.PlaySequence("Switch");
      }
    }
  }
  JB1() {
    var t = this.tHm.LocalConfig.TabResource;
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
    if (t && !(t.length <= 0) && t[0] === "ConfirmBtn") {
      return this.s5e?.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
}
exports.ActivityDirectTrainProView = ActivityDirectTrainProView;
//# sourceMappingURL=ActivityDirectTrainProView.js.map