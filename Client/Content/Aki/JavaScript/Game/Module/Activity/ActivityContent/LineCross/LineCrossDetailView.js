"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossDetailView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const LineCrossClawItem_1 = require("./LineCrossClawItem");
class LineCrossDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Ced = [];
    this.lqe = undefined;
    this.ped = undefined;
    this.H3e = undefined;
    this.ved = undefined;
    this.YP = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.LineCrossActivityController?.RequestStartChallenge(this.ped.LineCrossActivityData.Id, this.ped.GetCurrentChallengeId());
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ped = this.OpenParam;
    this.ped.RegisterView(this);
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIText]];
    this.BtnBindInfo = [[9, this.YP]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    this.lqe.SetTitle(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LineCrossDetailTitle") ?? "");
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetCloseCallBack(this.AMo);
    var i = new Array();
    this.H3e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(7), () => {
      var i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      i.ShowReceivedCallBack = i => this.ped.GetCurrentChallengeFinishRewardState();
      return i;
    });
    var e = new DifficultLineCrossItem();
    i.push(e.CreateByActorAsync(this.GetItem(1).GetOwner()));
    this.Ced.push(e);
    var e = new DifficultLineCrossItem();
    i.push(e.CreateByActorAsync(this.GetItem(2).GetOwner()));
    this.Ced.push(e);
    var e = new DifficultLineCrossItem();
    i.push(e.CreateByActorAsync(this.GetItem(3).GetOwner()));
    this.Ced.push(e);
    this.ved = new LineCrossClawItem_1.LineCrossClawItem();
    i.push(this.ved.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    await Promise.all(i);
  }
  RefreshRewardLayout(i) {
    this.H3e.RefreshByData(i);
  }
  OnBeforeShow() {
    this.ped.OnShowView();
  }
  ShowDescText(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i);
  }
  RefreshTitleText(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i);
  }
  RefreshDifficultDescText(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), i);
  }
  RefreshNumText(i) {
    this.GetText(4).SetText(i.toString());
  }
  RefreshDifficultItem(e, t) {
    for (let i = 0; i < this.Ced.length; i++) {
      var s = this.Ced[i];
      if (i < e.length) {
        s.SetModel(this.ped);
        s.Refresh(e[i], t);
        s.Show();
      } else {
        s.Hide();
      }
    }
  }
  RefreshDifficultItemSelection(i) {
    for (const e of this.Ced) {
      e.RefreshToggle(i);
    }
  }
  RefreshMiddleByChallengeState(i, e) {
    this.ved.Refresh(i, e);
  }
  PlaySwitchSequence() {
    this.PlaySequence("Switch");
  }
}
exports.LineCrossDetailView = LineCrossDetailView;
class DifficultLineCrossItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ped = undefined;
    this.Pe = undefined;
    this.gke = () => {
      return !this.ped?.GetChallengeLockState(this.Pe) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("LineCross_Locked"), false);
    };
    this.kqe = () => {
      this.ped?.OnSelectChallenge(this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {}
  SetModel(i) {
    this.ped = i;
  }
  Refresh(i, e) {
    this.Pe = i;
    var t = this.ped?.GetChallengeTitleId(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
    this.RefreshToggle(e);
    RedDotController_1.RedDotController.UnBindGivenUi("LineCrossChallengeRedDot", this.GetItem(3), i);
    RedDotController_1.RedDotController.BindRedDot("LineCrossChallengeRedDot", this.GetItem(3), undefined, i);
    var t = this.ped?.GetChallengeFinishState(i);
    this.GetItem(2)?.SetUIActive(!!t);
  }
  RefreshToggle(i) {
    var e = this.ped?.GetChallengeLockState(this.Pe);
    this.GetExtendToggle(0).CanExecuteChange.Unbind();
    var i = this.Pe === i;
    var e = e ? 2 : i ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(e, false);
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke);
  }
}
//# sourceMappingURL=LineCrossDetailView.js.map