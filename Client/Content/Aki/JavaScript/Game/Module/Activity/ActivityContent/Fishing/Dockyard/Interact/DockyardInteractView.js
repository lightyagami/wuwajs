"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardInteractView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const FishingDefine_1 = require("../../FishingDefine");
const FishingCurrencyItem_1 = require("../../FishingDock/FishingCurrencyItem");
const DockyardBackpackPanel_1 = require("../Bag/DockyardBackpackPanel");
const DockyardInteractFinishTipsViewModel_1 = require("../Tips/DockyardInteractFinishTipsViewModel");
const DockyardTipsPanel_1 = require("../Tips/DockyardTipsPanel");
const DockyardInteractPanel_1 = require("./DockyardInteractPanel");
class DockyardInteractView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.jXl = undefined;
    this.lqe = undefined;
    this.HXl = undefined;
    this.WXl = undefined;
    this.HLn = undefined;
  }
  OnRegisterComponent() {
    this.QXl();
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  QXl() {
    this.HLn = this.OpenParam;
    this.HLn.RegisterView(this);
  }
  async $D_() {
    await new FishingCurrencyItem_1.FishingCurrencyItem().CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem", this.lqe.GetCostContent());
  }
  async zDn() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.HLn.CloseClick);
    await this.$D_();
    await this.lqe.SetCurrencyItemList([FishingDefine_1.FISHING_CURRENCY_ITEMID]);
    for (const i of this.lqe.GetCurrencyItemList()) {
      i.SetTextureClickCheckFunction(this.HLn.CheckCurrencyItemClick);
    }
  }
  async KXl() {
    this.jXl = new DockyardInteractPanel_1.DockyardInteractPanel(this.HLn.InteractPanelModel);
    await this.jXl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  async $Xl() {
    this.HXl = new DockyardBackpackPanel_1.DockyardBackpackPanel(this.HLn.BackpackPanelModel);
    await this.HXl.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  async XXl() {
    this.WXl = new DockyardTipsPanel_1.DockyardTipsPanel();
    await this.WXl.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.zDn(), this.KXl(), this.$Xl(), this.XXl()]);
    this.HLn.BackpackPanelModel.IsInSelectState = false;
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.OpenSystemBoardResultRequest(this.HLn.IsComplete ? 1 : 0, this.HLn.ActionIncId);
  }
  ShowTipsPanel(i) {
    i = this.HLn.GetItemBlockDataByIncId(i);
    this.WXl.Refresh(i);
    this.WXl.SetPanelVisible(true);
  }
  HideTipsPanel() {
    this.WXl.SetPanelVisible(false);
  }
  OpenInteractFinishTipsView() {
    var i = new DockyardInteractFinishTipsViewModel_1.DockyardInteractFinishTipsViewModel();
    i.CloseCallback = () => {
      this.CloseMe();
    };
    UiManager_1.UiManager.OpenView("DockyardInteractFinishTipsView", i);
  }
}
exports.DockyardInteractView = DockyardInteractView;
//# sourceMappingURL=DockyardInteractView.js.map