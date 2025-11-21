"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnderseaExperimentToggleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class UnderseaExperimentToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.awu = 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async Initialize(e, a) {
    this.awu = e;
    await this.CreateThenShowByActorAsync(a.GetOwner());
    this.RefreshPlayerIcon();
  }
  RefreshPlayerIcon() {
    var e = ConfigManager_1.ConfigManager.WorldMapConfig?.GetCustomizedThumbnailConfig(this.awu);
    var a = ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(2) ?? 0;
    this.GetItem(1).SetUIActive(a === e?.AreaId);
  }
}
exports.UnderseaExperimentToggleItem = UnderseaExperimentToggleItem;
//# sourceMappingURL=UnderseaExperimentToggleItem.js.map