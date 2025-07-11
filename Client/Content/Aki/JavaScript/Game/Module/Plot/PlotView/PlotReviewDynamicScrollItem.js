"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotReviewDynamicScrollItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PlotReviewDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Index = -1;
    this.Pe = undefined;
    this.IZ_ = new PlotReviewTalkItem();
    this.TZ_ = new PlotReviewOptionItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
    await this.WZt();
  }
  async WZt() {
    var e = this.GetItem(0);
    e.SetUIActive(false);
    var t = this.GetItem(1);
    t.SetUIActive(false);
    await Promise.all([this.IZ_.CreateByActorAsync(e.GetOwner()), this.TZ_.CreateByActorAsync(t.GetOwner())]);
  }
  GetUsingItem(e) {
    let t = undefined;
    switch (e.Type) {
      case 0:
        t = 0;
        break;
      case 1:
        t = 1;
    }
    return this.GetItem(t).GetOwner();
  }
  Update(e, t) {
    this.Pe = e;
    this.Index = t;
    this.Refresh();
  }
  Refresh() {
    let e = false;
    let t = false;
    switch (this.Pe.Type) {
      case 0:
        e = true;
        this.RefreshTalkItem();
        break;
      case 1:
        t = true;
        this.RefreshOptionItem();
    }
    this.GetItem(0).SetUIActive(e);
    this.GetItem(1).SetUIActive(t);
  }
  RefreshTalkItem() {
    var e = this.Pe.Data;
    this.IZ_.Update(e, this.Index);
  }
  RefreshOptionItem() {
    var e = this.Pe.Data;
    this.TZ_.Update(e, this.Index);
  }
  SetTalkItemToggleClickCallBack(e) {
    this.IZ_.OnToggleClick = e;
  }
  SetTalkItemCanToggleChangeCallBack(e) {
    this.IZ_.CanToggleChange = e;
  }
  SetTalkItemToggleState(e) {
    this.IZ_.SetToggleState(e);
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.PlotReviewDynamicScrollItem = PlotReviewDynamicScrollItem;
class PlotReviewTalkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Index = -1;
    this.Pe = undefined;
    this.OnToggleClick = undefined;
    this.CanToggleChange = undefined;
    this.bZ_ = false;
    this.LZ_ = () => {
      this.OnToggleClick?.(this.Index);
    };
    this.CY1 = () => !this.CanToggleChange || this.CanToggleChange(this.Index);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIExtendToggle]];
    this.BtnBindInfo = [[3, this.LZ_]];
  }
  OnStart() {
    this.GetExtendToggle(3).CanExecuteChange.Bind(this.CY1);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(1));
  }
  Update(e, t) {
    var i = this.GetText(1);
    if (ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(i)) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(i);
    }
    var i = {
      UiText: i,
      ViewType: 0,
      Group: 1,
      Priority: t,
      ReportType: 2
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(i);
    this.Pe = e;
    this.Index = t;
    this.Refresh();
  }
  Refresh() {
    this.RefreshName();
    this.RefreshContent();
    this.RefreshAudio();
  }
  RefreshName() {
    let e = "";
    var t;
    var i = this.Pe.TalkItem;
    e = i.Type === "Talk" && i?.Style?.Type === "InnerVoice" ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PlotReview_3") : (t = (i = SpeakerById_1.configSpeakerById.GetConfig(i.WhoId)) ? PublicUtil_1.PublicUtil.GetConfigTextByTable(0, i.Id) : undefined, i = i ? PublicUtil_1.PublicUtil.GetConfigTextByTable(1, i.Id) : undefined, StringUtils_1.StringUtils.IsEmpty(t) ? i : t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PlotReview_1", e ?? "");
  }
  RefreshContent() {
    var e = this.Pe.TalkItem.TidTalk;
    if (e && (e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(e), e = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e))) {
      this.GetText(1).SetText(e);
    }
  }
  RefreshAudio() {
    var e = this.Pe.TalkItem;
    this.bZ_ = e.PlayVoice ?? false;
    this.GetSprite(2).SetUIActive(this.bZ_);
    var e = this.Pe.IsPlaying ? 1 : 0;
    this.SetToggleState(e);
  }
  SetToggleState(e) {
    this.GetExtendToggle(3).SetToggleState(e);
  }
}
class PlotReviewOptionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Index = -1;
    this.Pe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PlotReview_2");
    var e = {
      UiText: this.GetText(1),
      ViewType: 0,
      Group: 1,
      ReportType: 2
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  OnBeforeHide() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(1));
  }
  Update(e, t) {
    this.Pe = e;
    this.Index = t;
    this.Refresh();
  }
  Refresh() {
    var e;
    var t = this.Pe.TalkItem;
    if (!!t && !!(t = t.Options) && !((e = this.Pe.OptionIndex) < 0)) {
      t = t[e];
      e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidTalkOption);
      e = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e);
      this.GetText(1).SetText(e);
    }
  }
}
//# sourceMappingURL=PlotReviewDynamicScrollItem.js.map