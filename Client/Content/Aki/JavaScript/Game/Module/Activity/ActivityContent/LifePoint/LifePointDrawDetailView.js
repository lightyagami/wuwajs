"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointDrawDetailItem = exports.LifePointDrawDetailView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
class LifePointDrawDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PPu = undefined;
    this.lqe = undefined;
    this.xPu = undefined;
    this.H3e = undefined;
    this.YP = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.LifePointDrawActivityController?.RequestStartChallenge(this.PPu.LifePointDrawActivityData.Id, this.PPu.GetCurrentChallengeId());
    };
    this.UPu = () => {
      var t = new LifePointDrawDetailItem();
      t.SetModel(this.PPu);
      return t;
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.PPu = this.OpenParam;
    this.PPu.RegisterView(this);
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIItem], [9, UE.UIButtonComponent], [7, UE.UITexture], [8, UE.UISprite]];
    this.BtnBindInfo = [[9, this.YP]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetTitle(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Activity_105600001_Title") ?? "");
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetCloseCallBack(this.AMo);
    this.xPu = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.UPu, this.GetItem(2).GetOwner());
    this.H3e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), () => {
      var t = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      t.ShowReceivedCallBack = t => this.PPu.GetCurrentChallengeFinishRewardState();
      return t;
    });
    await Promise.resolve();
  }
  RefreshLayout(t) {
    this.xPu.RefreshByData(t);
    this.GetVerticalLayout(1).RootUIComp.SetUIActive(t.length > 1);
  }
  RefreshRewardLayout(t) {
    this.H3e.RefreshByData(t);
  }
  OnBeforeShow() {
    this.PPu?.OnShowView();
  }
  ShowRightUpTitle(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t);
  }
  ShowDescText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t);
  }
  RefreshLevelNumSprite(t) {
    this.SetSpriteByPath(t, this.GetSprite(8), false);
  }
  RefreshDifficultTexture(t) {
    this.SetTextureByPath(t, this.GetTexture(7));
  }
  PlaySwitchSequence() {
    this.PlaySequence("Switch");
  }
}
exports.LifePointDrawDetailView = LifePointDrawDetailView;
class LifePointDrawDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.PPu = undefined;
    this.Pe = undefined;
    this.gke = () => {
      return !this.PPu?.GetChallengeLockState(this.Pe) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Colorful_Locked"), false);
    };
    this.kqe = () => {
      this.PPu?.OnSelectChallenge(this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Unbind();
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke);
  }
  SetModel(t) {
    this.PPu = t;
  }
  Refresh(t, i, e) {
    this.Pe = t;
    var r = this.PPu?.CheckChallengeIfSelect(t) ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(r);
    var r = this.PPu?.GetChallengeLockState(this.Pe);
    this.GetItem(2)?.SetUIActive(!!r);
    var r = this.PPu?.GetChallengeFinishState(t);
    this.GetItem(3)?.SetUIActive(!!r);
    var r = this.PPu?.GetChallengeTitleId(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r);
    RedDotController_1.RedDotController.UnBindGivenUi("LifePointDrawChallengeRedDot", this.GetItem(4), t);
    RedDotController_1.RedDotController.BindRedDot("LifePointDrawChallengeRedDot", this.GetItem(4), undefined, t);
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("LifePointDrawChallengeRedDot", this.GetItem(4), this.Pe);
  }
}
exports.LifePointDrawDetailItem = LifePointDrawDetailItem;
//# sourceMappingURL=LifePointDrawDetailView.js.map