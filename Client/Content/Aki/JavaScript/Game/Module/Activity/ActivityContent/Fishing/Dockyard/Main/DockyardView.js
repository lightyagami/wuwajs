"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const FishingDefine_1 = require("../../FishingDefine");
const FishingCurrencyItem_1 = require("../../FishingDock/FishingCurrencyItem");
const DockyardBackpackPanel_1 = require("../Bag/DockyardBackpackPanel");
const DockyardItemListPanel_1 = require("../List/DockyardItemListPanel");
const DockyardQuestInfoPanel_1 = require("../Tips/DockyardQuestInfoPanel");
const DockyardStatePanel_1 = require("../Tips/DockyardStatePanel");
const DockyardTipsPanel_1 = require("../Tips/DockyardTipsPanel");
class DockyardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.HXl = undefined;
    this.VYl = undefined;
    this.WXl = undefined;
    this.jYl = undefined;
    this.S9_ = undefined;
    this.HLn = undefined;
    this.vQ_ = 1;
    this.oec = false;
    this.nec = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
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
  async $Xl() {
    this.HXl = new DockyardBackpackPanel_1.DockyardBackpackPanel(this.HLn.BackpackPanelModel);
    await this.HXl.CreateByActorAsync(this.GetItem(1).GetOwner());
    this.AddChild(this.HXl);
  }
  async HYl() {
    this.VYl = new DockyardStatePanel_1.DockyardStatePanel();
    await this.VYl.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  async XXl() {
    this.WXl = new DockyardTipsPanel_1.DockyardTipsPanel();
    await this.WXl.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  async OYl() {
    if (ModelManager_1.ModelManager.FishingModel?.IsInDock) {
      this.jYl = new DockyardItemListPanel_1.DockyardItemListPanel();
      await this.jYl.CreateByActorAsync(this.GetItem(4).GetOwner(), this.HLn.ListPanelModel);
    } else {
      this.GetItem(4).SetUIActive(false);
    }
  }
  async M9_() {
    this.S9_ = new DockyardQuestInfoPanel_1.DockyardQuestInfoPanel();
    await this.S9_.CreateByResourceIdAsync("PnlNavigationEntrustInfo", this.GetItem(6));
    this.S9_.SetButtonExitVisible(false);
  }
  async OnBeforeStartAsync() {
    this.QXl();
    await Promise.all([this.zDn(), this.$Xl(), this.HYl(), this.XXl(), this.OYl(), this.M9_()]);
    this.HLn.BackpackPanelModel.IsInSelectState = false;
  }
  async OnBeforeShowAsyncImplementImplement() {
    if (this.HLn.IsInTrawlState) {
      await this.jYl.RefreshListItem();
    }
  }
  OnBeforeShow() {
    this.S9_.Refresh();
  }
  OnTick(i) {
    var t;
    if (this.oec) {
      if (this.vQ_ === 0) {
        t = this.HLn.GetItemBlockData(this.nec);
        this.WXl.Refresh(t);
        this.WXl.SetPanelVisible(true);
        this.S9_.SetPanelVisible(false);
      } else if (this.vQ_ === 1) {
        this.WXl.SetPanelVisible(false);
        this.S9_.SetPanelVisible(true);
      }
      this.oec = false;
      this.nec = 0;
    }
  }
  ShowTipsPanel(i) {
    this.oec = true;
    this.vQ_ = 0;
    this.nec = i;
  }
  HideTipsPanel() {
    this.oec = true;
    this.vQ_ = 1;
  }
  SetTrawlState(i) {
    this.VYl.SetActive(!i);
    this.jYl.SetActive(i);
  }
  GetQuicklySellPanelParentItem() {
    return this.GetItem(5);
  }
  NotifyQuicklySellActive(i) {
    var t = this.vQ_ === 0 ? this.WXl : this.S9_;
    if (i) {
      t.SetPanelVisible(false);
      this.S9_.LockState = true;
      this.WXl.LockState = true;
    } else {
      this.S9_.LockState = false;
      this.WXl.LockState = false;
      t.SetPanelVisible(true);
    }
  }
}
exports.DockyardView = DockyardView;
//# sourceMappingURL=DockyardView.js.map