"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessShopRoleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../../Util/LguiUtil");
class BusinessShopRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.RoleId = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(1)?.SetUIActive(false);
  }
  SwitchRoleSpineAnim(i, e) {
    this.GetSpine(0).SetAnimation(0, i, true)?.SetMixDuration(e);
  }
  Refresh(i) {
    this.RoleId = i;
  }
  async RefreshAsync() {
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(this.RoleId);
    await this.SetSpineAssetByPath(i.SmallSpineAtlas, i.SmallSpineSkeletonData, this.GetSpine(0));
    this.GetSpine(0).SetAnimation(0, "idle", true);
  }
  ShowDialog(i) {
    this.GetItem(1)?.SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i);
  }
}
exports.BusinessShopRoleItem = BusinessShopRoleItem;
//# sourceMappingURL=BusinessShopRoleItem.js.map