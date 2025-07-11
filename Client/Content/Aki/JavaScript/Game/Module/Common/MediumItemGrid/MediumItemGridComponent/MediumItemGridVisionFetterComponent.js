"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridVisionFetterComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridVisionFetterComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments);
    this.bxt = undefined;
  }
  GetResourceId() {
    return "UiItem_ItemRogue";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(0));
    await this.bxt.Init().finally(() => {
      this.GetItem(0).SetUIActive(true);
    });
  }
  OnActivate() {
    this.GetText(1).SetUIActive(false);
  }
  OnRefresh(e) {
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e);
    this.SetActive(true);
    this.bxt.Update(e);
  }
}
exports.MediumItemGridVisionFetterComponent = MediumItemGridVisionFetterComponent;
//# sourceMappingURL=MediumItemGridVisionFetterComponent.js.map