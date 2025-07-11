"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaShareTenPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const GachaShareResultItem_1 = require("./GachaShareResultItem");
class GachaShareTenPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.bWt = undefined;
    this.HWt = () => new GachaShareResultItem_1.GachaShareResultItem();
  }
  async OnBeforeStartAsync() {
    this.bWt = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.HWt);
    var e = this.OpenParam;
    const n = e => {
      switch (e) {
        case 1:
          return 2;
        case 2:
          return 1;
        default:
          return 0;
      }
    };
    e = [...e];
    e.sort((e, a) => {
      var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.e9n.L8n)?.QualityId ?? 0;
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(a.e9n.L8n)?.QualityId ?? 0;
      if (r === t) {
        e = n(ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e.e9n.L8n));
        return n(ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(a.e9n.L8n)) - e;
      } else {
        return t - r;
      }
    });
    await this.bWt.RefreshByDataAsync(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout]];
  }
  GetGachaResultItemLayout() {
    return this.GetGridLayout(0);
  }
  OnBeforeDestroy() {
    this.bWt?.ClearChildren();
  }
}
exports.GachaShareTenPanel = GachaShareTenPanel;
//# sourceMappingURL=GachaShareTenPanel.js.map