"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MaterialItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.ItemData = undefined;
    this.ItemInfo = undefined;
    this.oft = undefined;
    this.OnClick = i => {
      if (this.oft) {
        this.oft(this.ItemData);
      }
    };
    this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UISprite]];
    this.BtnBindInfo = [[0, this.OnClick]];
  }
  Update(i) {
    this.ItemData = i;
    if (this.ItemData.L8n !== 0) {
      this.ItemInfo = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.ItemData.L8n);
    } else {
      this.ItemInfo = undefined;
    }
    this.RefreshNeed();
    this.RefreshHave();
    this.Kbe();
    this.BGt();
  }
  RefreshNeed(i = 1) {
    let e = this.ItemData.UVn;
    if (i !== 1) {
      e *= i;
    }
    this.GetText(2).SetText(e.toString());
  }
  RefreshHave() {
    var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ItemData.L8n);
    let e = undefined;
    e = this.ItemData.K6n ? i < this.ItemData.UVn ? `<color=#dc0300>${i}</color>` : `<color=#ffffff>${i}</color>` : "<color=#ffffff>--</color>";
    this.GetText(1).SetText(e);
  }
  Kbe() {
    if (this.ItemData.K6n) {
      this.GetTexture(3).SetUIActive(true);
      this.SetTextureByPath(this.ItemInfo.Icon, this.GetTexture(3));
    } else {
      this.GetTexture(3).SetUIActive(false);
    }
  }
  BGt() {
    if (this.ItemData.K6n) {
      this.GetSprite(4).SetUIActive(true);
      this.SetItemQualityIcon(this.GetSprite(4), this.ItemInfo.Id);
    } else {
      this.GetSprite(4).SetUIActive(false);
    }
  }
  BindOnClickedCallback(i) {
    this.oft = i;
  }
}
exports.MaterialItem = MaterialItem;
//# sourceMappingURL=CommonItemView.js.map