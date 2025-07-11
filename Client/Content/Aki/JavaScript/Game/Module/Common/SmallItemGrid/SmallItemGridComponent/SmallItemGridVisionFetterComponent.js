"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGridVisionFetterComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridVisionFetterComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  constructor() {
    super(...arguments);
    this.bxt = undefined;
  }
  GetResourceId() {
    return "UiItem_ItemBElementB";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(0));
    await this.bxt.Init().finally(() => {
      this.GetItem(0).SetUIActive(true);
    });
  }
  OnRefresh(e) {
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e);
    this.SetActive(true);
    this.bxt.Update(e);
  }
}
exports.SmallItemGridVisionFetterComponent = SmallItemGridVisionFetterComponent;
//# sourceMappingURL=SmallItemGridVisionFetterComponent.js.map