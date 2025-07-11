"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardSellTipsPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer");
const DockyardTipsPanel_1 = require("./DockyardTipsPanel");
class DockyardSellTipsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TipsPanel = undefined;
    this.SequencePlayer = undefined;
    this.Data = undefined;
    this.SellClick = undefined;
    this.$Yl = () => {
      this.SellClick?.(this.Data.IncId, this.Data.ItemId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.$Yl]];
  }
  async XXl() {
    this.TipsPanel = new DockyardTipsPanel_1.DockyardTipsPanel();
    await this.TipsPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  async OnBeforeStartAsync() {
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    await this.XXl();
  }
  XYl() {
    this.GetButton(1).RootUIComp.SetUIActive(this.Data.Price > 0);
  }
  async OnShowAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SequencePlayer.PlaySequenceAsync("Start", e);
  }
  async OnHideAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SequencePlayer.PlaySequenceAsync("Close", e);
  }
  OnBeforeDestroy() {
    this.SequencePlayer.Clear();
  }
  Refresh() {
    this.TipsPanel.Refresh(this.Data);
    this.TipsPanel.SetPanelVisible(true, false);
    this.XYl();
  }
  ShowTipsPanel(e) {
    this.Data = e;
    this.Refresh();
    this.SetActive(true);
  }
  HideTipsPanel() {
    if (this.IsShowOrShowing) {
      this.SetActive(false);
    }
  }
  SetSellClick(e) {
    this.SellClick = e;
  }
}
exports.DockyardSellTipsPanel = DockyardSellTipsPanel;
//# sourceMappingURL=DockyardSellTipsPanel.js.map