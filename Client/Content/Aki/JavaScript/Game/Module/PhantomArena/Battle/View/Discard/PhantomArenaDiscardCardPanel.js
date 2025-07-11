"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaDiscardCardPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const PhantomArenaDiscardCardItem_1 = require("./PhantomArenaDiscardCardItem");
class PhantomArenaDiscardCardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ViewProxy = undefined;
    this.Scroll = undefined;
    this.SelectedIdSet = new Set();
    this.Data = undefined;
    this.sGe = () => {
      var i = new PhantomArenaDiscardCardItem_1.PhantomArenaDiscardCardItem();
      i.ClickCallback = this.Ui1;
      return i;
    };
    this.CG1 = i => {
      i = i !== 1;
      this.ViewProxy.SetIsMainInVisible(!i);
      this.ViewProxy.HideCardTips();
      this.GetItem(3).SetUIActive(i);
    };
    this.tWt = () => {
      this.Data.ConfirmFunc(Array.from(this.SelectedIdSet));
    };
    this.z31 = () => {
      this.ViewProxy.HideCardTips();
    };
    this.Ui1 = (i, t) => {
      this.jt_(i);
      if (t && this.SelectedIdSet.size >= this.Data.LimitCount) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1046");
      } else {
        if (t) {
          this.SelectedIdSet.add(i);
        } else {
          this.SelectedIdSet.delete(i);
        }
        this.dU1(i, t);
        this.mGe();
        this.pG1();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIExtendToggle], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.CG1], [5, this.tWt], [6, this.z31]];
  }
  OnStart() {
    this.Scroll = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.sGe, this.GetItem(2).GetOwner());
  }
  async OnBeforeShowAsyncImplement() {
    this.ViewProxy.RegisterCantDragReason(2);
    this.SelectedIdSet.clear();
    await this.Scroll.RefreshByDataAsync(this.Data.CardDataList);
    this.mGe();
    this.pG1();
    this.ViewProxy.HideCardTips();
    this.ViewProxy.SetCaptionItemActive(false);
    this.ViewProxy.IsInPanelInteract = true;
    this.ViewProxy.SetIsMainInVisible(false);
  }
  OnAfterHide() {
    this.GetItem(3).SetUIActive(true);
    this.ViewProxy.HideCardTips();
    this.ViewProxy.SetCaptionItemActive(true);
    this.ViewProxy.UnRegisterCantDragReason(2);
    this.ViewProxy.SetIsMainInVisible(true);
    this.ViewProxy.IsInPanelInteract = false;
  }
  dU1(i, t) {
    i = this.Scroll.GetScrollItemByKey(i);
    if (i) {
      i.SetSelectState(t);
    }
  }
  mGe() {
    this.GetText(0).SetText(this.SelectedIdSet.size + "/" + this.Data.LimitCount);
  }
  pG1() {
    this.GetButton(5).SetSelfInteractive(this.SelectedIdSet.size >= this.Data.LimitCount);
  }
  jt_(i) {
    i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(i);
    this.ViewProxy.ShowCardTips(i);
  }
  RegisterViewProxy(i) {
    this.ViewProxy = i;
  }
  SetDiscardCardData(i) {
    this.Data = i;
  }
}
exports.PhantomArenaDiscardCardPanel = PhantomArenaDiscardCardPanel;
//# sourceMappingURL=PhantomArenaDiscardCardPanel.js.map