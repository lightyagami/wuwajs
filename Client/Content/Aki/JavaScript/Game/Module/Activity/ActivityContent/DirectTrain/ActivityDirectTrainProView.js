"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDirectTrainProView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../../../GameSettings/GameSettingsDeviceRender");
const GlobalData_1 = require("../../../../GlobalData");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const HelpController_1 = require("../../../Help/HelpController");
const ActivityManager_1 = require("../../ActivityManager");
const ActivityTipsButton_1 = require("../../View/SubView/ActivityTipsButton");
class ActivityDirectTrainProView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.zB1 = undefined;
    this.s5e = undefined;
    this.lqe = undefined;
    this.bel = undefined;
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
  get gV_() {
    if (this.zB1 === undefined) {
      this.zB1 = this.OpenParam;
    }
    return this.zB1;
  }
  get t5e() {
    return this.gV_.GetHelpId();
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
    await this.T5e();
    this.GetButton(14)?.RootUIComp.SetUIActive(false);
    this.GetButton(15)?.RootUIComp.SetUIActive(false);
    this.GetScrollViewWithScrollbar(1)?.RootUIComp.SetUIActive(false);
    this.GetItem(2)?.SetUIActive(false);
    this.GetItem(9)?.SetUIActive(false);
    this.GetItem(10)?.SetUIActive(false);
  }
  OnStart() {
    this.lqe.SetTitleLocalText("Activity_Title");
    this.uxt();
    this.D5e();
    this.R5e(true);
  }
  OnBeforeShow() {
    this.s5e?.RefreshView();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableDLSSG("CommonActivityView");
  }
  async OnBeforeHideAsync() {
    await this.s5e?.BeforeHideSelfAsync();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableDLSSG("CommonActivityView");
  }
  OnBeforeDestroy() {}
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
    var t = this.gV_.GetTitle();
    this.lqe.SetHelpBtnActive(this.t5e !== 0);
    this.lqe.SetTitle(t.replace(/<.*?>/g, ""));
    this.bel.SetActive(this.gV_.LocalConfig.ShowPermanentTips);
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
  async R5e(t) {
    var i;
    var e;
    var s;
    if (this.s5e === undefined) {
      s = ActivityManager_1.ActivityManager.GetActivityController(this.gV_.Type);
      i = this.GetItem(5);
      e = s.GetActivityResource(this.gV_);
      (s = s.CreateSubPageComponent(this.gV_)).SetData(this.gV_);
      await s.CreateByPathAsync(e, i);
      this.s5e = s;
    }
    await this.WNe(this.gV_);
    await this.s5e.BeforeShowSelfAsync();
    this.s5e.RefreshView();
    this.GetTexture(7).SetUIActive(true);
    this.s5e.SetActive(true);
    if (t) {
      if (this.UiViewSequence.HasSequenceNameInPlaying("Switch")) {
        this.UiViewSequence.ReplaySequence("Switch");
      } else {
        this.UiViewSequence.PlaySequence("Switch");
      }
    }
  }
  JB1() {
    var t = this.gV_.LocalConfig.TabResource;
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