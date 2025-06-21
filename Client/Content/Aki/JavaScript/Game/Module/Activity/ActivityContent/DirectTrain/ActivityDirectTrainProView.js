"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityDirectTrainProView = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Macro_1 = require("../../../../../Core/Preprocessor/Macro"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GameSettingsDeviceRender_1 = require("../../../../GameSettings/GameSettingsDeviceRender"),
  GlobalData_1 = require("../../../../GlobalData"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  HelpController_1 = require("../../../Help/HelpController"),
  ActivityManager_1 = require("../../ActivityManager"),
  ActivityTipsButton_1 = require("../../View/SubView/ActivityTipsButton");
class ActivityDirectTrainProView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.yB1 = void 0, this.s5e = void 0, this.lqe = void 0, this.bel = void 0, this.CLn = t => {
      t.length <= 0 || (this.lqe.SetCurrencyItemVisible(!0), this.lqe.SetCurrencyItemList(t).catch(() => {}))
    }, this._5e = () => {
      this.s5e?.OnCommonViewStateChange(!1), this.SB1()
    }, this.XOe = () => {
      HelpController_1.HelpController.OpenHelpById(this.t5e)
    }, this.$Oe = () => {
      this.CloseMe()
    }, this.E5e = t => {
      this.s5e?.PlaySubViewSequence(t)
    }
  }
  get gV_() {
    return void 0 === this.yB1 && (this.yB1 = this.OpenParam), this.yB1
  }
  get t5e() {
    return this.gV_.GetHelpId()
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIButtonComponent],
      [15, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [8, this._5e]
    ]
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetActivityViewCurrency, this.CLn), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetActivityViewCurrency, this.CLn), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e)
  }
  async OnBeforeStartAsync() {
    await this.T5e(), this.GetButton(14)?.RootUIComp.SetUIActive(!1), this.GetButton(15)?.RootUIComp.SetUIActive(!1), this.GetScrollViewWithScrollbar(1)?.RootUIComp.SetUIActive(!1), this.GetItem(2)?.SetUIActive(!1), this.GetItem(9)?.SetUIActive(!1), this.GetItem(10)?.SetUIActive(!1)
  }
  OnStart() {
    this.lqe.SetTitleLocalText("Activity_Title"), this.uxt(), this.D5e(), this.R5e(!0)
  }
  OnBeforeShow() {
    this.s5e?.RefreshView(), GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableDLSSG("CommonActivityView")
  }
  async OnBeforeHideAsync() {
    await this.s5e?.BeforeHideSelfAsync(), GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableDLSSG("CommonActivityView")
  }
  OnBeforeDestroy() {}
  async T5e() {
    var t = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)), this.lqe.SetHelpCallBack(this.XOe), this.lqe.SetCloseCallBack(this.$Oe), this.bel = new ActivityTipsButton_1.ActivityTipsButton, t.push(this.bel.CreateByActorAsync(this.GetItem(10).GetOwner())), await Promise.all(t)
  }
  D5e() {
    var t = this.gV_.GetTitle();
    this.lqe.SetHelpBtnActive(0 !== this.t5e), this.lqe.SetTitle(t.replace(/<.*?>/g, "")), this.bel.SetActive(this.gV_.LocalConfig.ShowPermanentTips), this.SB1()
  }
  async WNe(t) {
    const i = new CustomPromise_1.CustomPromise;
    var e = this.GetTexture(7),
      t = (e.SetUIActive(!1), t.BgTexturePath);
    this.SetTextureByPath(t, e, void 0, () => {
      i.SetResult()
    }), await i.Promise
  }
  async R5e(t) {
    var i, e, s;
    void 0 === this.s5e && (s = ActivityManager_1.ActivityManager.GetActivityController(this.gV_.Type), i = this.GetItem(5), e = s.GetActivityResource(this.gV_), (s = s.CreateSubPageComponent(this.gV_)).SetData(this.gV_), await s.CreateByPathAsync(e, i), this.s5e = s), await this.WNe(this.gV_), await this.s5e.BeforeShowSelfAsync(), this.s5e.RefreshView(), this.GetTexture(7).SetUIActive(!0), this.s5e.SetActive(!0), t && (this.UiViewSequence.HasSequenceNameInPlaying("Switch") ? this.UiViewSequence.ReplaySequence("Switch") : this.UiViewSequence.PlaySequence("Switch"))
  }
  SB1() {
    var t = this.gV_.LocalConfig.TabResource;
    t && this.lqe.SetTitleIcon(t)
  }
  uxt() {
    var t = this.GetText(13);
    GlobalData_1.GlobalData.IsPlayInEditor ? t.SetUIActive(!0) : t.SetUIActive(!1)
  }
  W6l(t) {
    this.GetText(13).SetText("DebugId: " + t)
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    return t && !(t.length <= 0) && "ConfirmBtn" === t[0] ? this.s5e?.GetGuideUiItemAndUiItemForShowEx(t) : void 0
  }
}
exports.ActivityDirectTrainProView = ActivityDirectTrainProView;
//# sourceMappingURL=ActivityDirectTrainProView.js.map