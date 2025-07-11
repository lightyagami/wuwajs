"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnderseaExperimentToggleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ExploreProgressDefine_1 = require("../../../ExploreProgress/ExploreProgressDefine");
class UnderseaExperimentToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.twu = 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async Initialize(e, r) {
    this.twu = e;
    await this.CreateThenShowByActorAsync(r.GetOwner());
    this.RefreshPlayerIcon();
  }
  RefreshPlayerIcon() {
    var e = ConfigManager_1.ConfigManager.WorldMapConfig?.GetCustomizedThumbnailConfig(this.twu);
    var r = ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(ExploreProgressDefine_1.AREA_LEVEL) ?? 0;
    this.GetItem(1).SetUIActive(r === e?.AreaId);
  }
}
exports.UnderseaExperimentToggleItem = UnderseaExperimentToggleItem;
//# sourceMappingURL=UnderseaExperimentToggleItem.js.map