"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInteractionPanelMainTypeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ItemInteractionPanelMainTypeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.MainTypeId = 0;
    this.SPt = undefined;
    this.Jgt = () => {
      if (this.SPt) {
        this.SPt(this.MainTypeId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Jgt]];
  }
  OnStart() {
    this.MainTypeId = this.OpenParam;
    var e = ConfigManager_1.ConfigManager.InventoryConfig?.GetItemMainTypeConfig(this.MainTypeId);
    if (e) {
      this.SetSpriteByPath(e.Icon, this.GetSprite(0), false);
      this.SetActive(true);
    }
  }
  OnBeforeDestroy() {
    this.SPt = undefined;
  }
  SetSelected(e) {
    if (e) {
      this.GetExtendToggle(1).SetToggleState(1);
    } else {
      this.GetExtendToggle(1).SetToggleState(0);
    }
  }
  SetRedDotVisible(e) {
    this.GetItem(2)?.SetUIActive(e);
  }
  BindOnExtendToggleStateChanged(e) {
    this.SPt = e;
  }
}
exports.ItemInteractionPanelMainTypeItem = ItemInteractionPanelMainTypeItem;
//# sourceMappingURL=ItemInteractionPanelMainTypeItem.js.map