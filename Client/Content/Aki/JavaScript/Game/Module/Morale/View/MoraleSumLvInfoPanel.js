"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleSumLvInfoPanel = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  MoraleLvInfoItem_1 = require("./MoraleLvInfoItem"),
  MoraleUnbreakableLvInfoItem_1 = require("./MoraleUnbreakableLvInfoItem");
class MoraleSumLvInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.ItemMoraleLv = void 0, this.ItemUnbreakableLv = void 0, this.dau = () => {
      UiManager_1.UiManager.OpenView("MoraleBuffView")
    }
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.dau]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetItem(0),
      a = this.GetItem(1);
    this.ItemMoraleLv = new MoraleLvInfoItem_1.MoraleLvInfoItem, this.ItemUnbreakableLv = new MoraleUnbreakableLvInfoItem_1.MoraleUnbreakableLvInfoItem, await this.ItemMoraleLv.Init(e), await this.ItemUnbreakableLv.Init(a)
  }
  OnBeforeShow() {}
  UpdateData() {
    var e = ModelManager_1.ModelManager.MoraleModel?.IsMoraleGameOver();
    this.SetActive(!e), e || (this.ItemMoraleLv.UpdateData(), this.ItemUnbreakableLv.UpdateData(), this.UpdateRedDot())
  }
  UpdateRedDot() {
    var e = ModelManager_1.ModelManager.MoraleModel.IsExistNewActiveAreaBuff();
    this.GetItem(3)?.SetUIActive(e)
  }
}
exports.MoraleSumLvInfoPanel = MoraleSumLvInfoPanel;
//# sourceMappingURL=MoraleSumLvInfoPanel.js.map