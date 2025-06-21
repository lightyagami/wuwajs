"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PlotReviewDynamicScrollItem = void 0;
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class PlotReviewDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Index = -1, this.Pe = void 0, this.IZ_ = new PlotReviewTalkItem, this.TZ_ = new PlotReviewOptionItem
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem]
    ]
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0), await this.WZt()
  }
  async WZt() {
    var e = this.GetItem(0),
      t = (e.SetUIActive(!1), this.GetItem(1));
    t.SetUIActive(!1), await Promise.all([this.IZ_.CreateByActorAsync(e.GetOwner()), this.TZ_.CreateByActorAsync(t.GetOwner())])
  }
  GetUsingItem(e) {
    let t = void 0;
    switch (e.Type) {
      case 0:
        t = 0;
        break;
      case 1:
        t = 1
    }
    return this.GetItem(t).GetOwner()
  }
  Update(e, t) {
    this.Pe = e, this.Index = t, this.Refresh()
  }
  Refresh() {
    let e = !1,
      t = !1;
    switch (this.Pe.Type) {
      case 0:
        e = !0, this.RefreshTalkItem();
        break;
      case 1:
        t = !0, this.RefreshOptionItem()
    }
    this.GetItem(0).SetUIActive(e), this.GetItem(1).SetUIActive(t)
  }
  RefreshTalkItem() {
    var e = this.Pe.Data;
    this.IZ_.Update(e, this.Index)
  }
  RefreshOptionItem() {
    var e = this.Pe.Data;
    this.TZ_.Update(e, this.Index)
  }
  SetTalkItemToggleClickCallBack(e) {
    this.IZ_.OnToggleClick = e
  }
  SetTalkItemCanToggleChangeCallBack(e) {
    this.IZ_.CanToggleChange = e
  }
  SetTalkItemToggleState(e) {
    this.IZ_.SetToggleState(e)
  }
  ClearItem() {
    this.Destroy()
  }
}
exports.PlotReviewDynamicScrollItem = PlotReviewDynamicScrollItem;
class PlotReviewTalkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Index = -1, this.Pe = void 0, this.OnToggleClick = void 0, this.CanToggleChange = void 0, this.bZ_ = !1, this.LZ_ = () => {
      this.OnToggleClick?.(this.Index)
    }, this.IX1 = () => !this.CanToggleChange || this.CanToggleChange(this.Index)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIExtendToggle]
    ], this.BtnBindInfo = [
      [3, this.LZ_]
    ]
  }
  OnStart() {
    this.GetExtendToggle(3).CanExecuteChange.Bind(this.IX1)
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(1))
  }
  Update(e, t) {
    var i = this.GetText(1),
      i = (ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(i) && ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(i), {
        UiText: i,
        ViewType: 0,
        Group: 1,
        Priority: t
      });
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(i), this.Pe = e, this.Index = t, this.Refresh()
  }
  Refresh() {
    this.RefreshName(), this.RefreshContent(), this.RefreshAudio()
  }
  RefreshName() {
    let e = "";
    var t, i = this.Pe.TalkItem;
    e = "Talk" === i.Type && "InnerVoice" === i?.Style?.Type ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PlotReview_3") : (t = (i = SpeakerById_1.configSpeakerById.GetConfig(i.WhoId)) ? PublicUtil_1.PublicUtil.GetConfigTextByTable(0, i.Id) : void 0, i = i ? PublicUtil_1.PublicUtil.GetConfigTextByTable(1, i.Id) : void 0, StringUtils_1.StringUtils.IsEmpty(t) ? i : t), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PlotReview_1", e ?? "")
  }
  RefreshContent() {
    var e = this.Pe.TalkItem.TidTalk;
    e && (e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(e), e = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e)) && this.GetText(1).SetText(e)
  }
  RefreshAudio() {
    var e = this.Pe.TalkItem,
      e = (this.bZ_ = e.PlayVoice ?? !1, this.GetSprite(2).SetUIActive(this.bZ_), this.Pe.IsPlaying ? 1 : 0);
    this.SetToggleState(e)
  }
  SetToggleState(e) {
    this.GetExtendToggle(3).SetToggleState(e)
  }
}
class PlotReviewOptionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Index = -1, this.Pe = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText]
    ]
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PlotReview_2");
    var e = {
      UiText: this.GetText(1),
      ViewType: 0,
      Group: 1
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e)
  }
  OnBeforeHide() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(1))
  }
  Update(e, t) {
    this.Pe = e, this.Index = t, this.Refresh()
  }
  Refresh() {
    var e, t = this.Pe.TalkItem;
    !t || !(t = t.Options) || (e = this.Pe.OptionIndex) < 0 || (t = t[e], e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidTalkOption), e = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e), this.GetText(1).SetText(e))
  }
}
//# sourceMappingURL=PlotReviewDynamicScrollItem.js.map