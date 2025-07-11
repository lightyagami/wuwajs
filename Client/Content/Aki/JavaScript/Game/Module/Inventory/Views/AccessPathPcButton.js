"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessPathPcButton = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AccessPathPcButton extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.Pmi = t;
    this.CreateThenShowByResourceIdAsync("UiItem_PcAccessPathButton_Prefab", e, false);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    var e;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetAccessPathConfig(this.Pmi);
    if (t) {
      e = this.GetText(0);
      t = t.Description;
      e.ShowTextNew(t);
    }
  }
}
exports.AccessPathPcButton = AccessPathPcButton;
//# sourceMappingURL=AccessPathPcButton.js.map