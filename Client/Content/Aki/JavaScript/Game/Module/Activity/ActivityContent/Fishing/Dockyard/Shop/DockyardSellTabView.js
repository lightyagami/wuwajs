"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardSellTabView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../../../Ui/Base/UiTabViewBase");
const DockyardBackpackPanel_1 = require("../Bag/DockyardBackpackPanel");
const DockyardItemListPanel_1 = require("../List/DockyardItemListPanel");
const DockyardSellTipsPanel_1 = require("../Tips/DockyardSellTipsPanel");
class DockyardSellTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.HXl = undefined;
    this.jYl = undefined;
    this.WXl = undefined;
    this.HLn = undefined;
  }
  OnRegisterComponent() {
    this.QXl();
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  QXl() {
    this.HLn = this.ExtraParams;
    this.HLn.RegisterView(this);
  }
  async $Xl() {
    this.HXl = new DockyardBackpackPanel_1.DockyardBackpackPanel(this.HLn.BackpackPanelModel);
    await this.HXl.CreateByActorAsync(this.GetItem(0).GetOwner());
    this.AddChild(this.HXl);
  }
  async OYl() {
    if (ModelManager_1.ModelManager.FishingModel?.IsInDock) {
      this.jYl = new DockyardItemListPanel_1.DockyardItemListPanel();
      await this.jYl.CreateByActorAsync(this.GetItem(1).GetOwner(), this.HLn.ListPanelModel);
    } else {
      this.GetItem(1).SetUIActive(false);
    }
  }
  async XXl() {
    this.WXl = new DockyardSellTipsPanel_1.DockyardSellTipsPanel();
    this.WXl.SetSellClick(this.HLn.SellClick);
    await this.WXl.CreateByActorAsync(this.GetItem(2).GetOwner());
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.$Xl(), this.OYl(), this.XXl()]);
    this.HLn.BackpackPanelModel.IsInSelectState = false;
  }
  async OnBeforeShowAsyncImplement() {
    if (this.HLn.IsInTrawlState) {
      await this.jYl.RefreshListItem();
    }
  }
  ShowTipsPanel(i) {
    i = this.HLn.GetItemBlockData(i);
    this.WXl.ShowTipsPanel(i);
  }
  HideTipsPanel() {
    this.WXl.HideTipsPanel();
  }
  CloseMe() {
    this.HLn.NotifyMainViewClose();
  }
  SetTrawlState(i) {
    this.jYl.SetActive(i);
    this.HLn.NotifyMainViewUiBlur(i);
  }
}
exports.DockyardSellTabView = DockyardSellTabView;
//# sourceMappingURL=DockyardSellTabView.js.map