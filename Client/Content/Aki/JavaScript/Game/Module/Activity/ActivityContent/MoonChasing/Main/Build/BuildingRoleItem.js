"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingRoleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class BuildingRoleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this.GetItem(1)?.SetUIActive(false);
  }
  async RefreshSpine(e) {
    e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(e);
    await this.SetSpineAssetByPath(e.SmallSpineAtlas, e.SmallSpineSkeletonData, this.GetSpine(0));
    this.GetSpine(0).SetAnimation(0, "idle", true);
  }
}
exports.BuildingRoleItem = BuildingRoleItem;
//# sourceMappingURL=BuildingRoleItem.js.map