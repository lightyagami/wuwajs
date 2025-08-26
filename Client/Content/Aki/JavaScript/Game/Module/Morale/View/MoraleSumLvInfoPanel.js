"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleSumLvInfoPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const MoraleLvInfoItem_1 = require("./MoraleLvInfoItem");
const MoraleUnbreakableLvInfoItem_1 = require("./MoraleUnbreakableLvInfoItem");
class MoraleSumLvInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ItemMoraleLv = undefined;
    this.ItemUnbreakableLv = undefined;
    this.imu = () => {
      UiManager_1.UiManager.OpenView("MoraleBuffView");
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem]];
    this.BtnBindInfo = [[2, this.imu]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetItem(0);
    var a = this.GetItem(1);
    this.ItemMoraleLv = new MoraleLvInfoItem_1.MoraleLvInfoItem();
    this.ItemUnbreakableLv = new MoraleUnbreakableLvInfoItem_1.MoraleUnbreakableLvInfoItem();
    await this.ItemMoraleLv.Init(e);
    await this.ItemUnbreakableLv.Init(a);
  }
  OnBeforeShow() {}
  UpdateData() {
    var e = ModelManager_1.ModelManager.MoraleModel?.IsMoraleGameOver();
    this.SetActive(!e);
    if (!e) {
      this.ItemMoraleLv.UpdateData();
      this.ItemUnbreakableLv.UpdateData();
      this.UpdateRedDot();
    }
  }
  UpdateRedDot() {
    var e = ModelManager_1.ModelManager.MoraleModel.RedDotAreaBuff();
    this.GetItem(3)?.SetUIActive(e);
  }
}
exports.MoraleSumLvInfoPanel = MoraleSumLvInfoPanel;
//# sourceMappingURL=MoraleSumLvInfoPanel.js.map