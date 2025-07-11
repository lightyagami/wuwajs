"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerRoleItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.ClickCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.GetButton(0).SetSelfInteractive(false);
  }
  Refresh(e) {
    var r;
    var t;
    this.fGt = e;
    this.va_(false);
    if (e.RoleIdEdit && (r = (e = (t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.RoleIdEdit))?.GetRoleConfig() ?? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.RoleIdEdit)).RoleHeadIconCircle, t = t?.GetRoleSkinId() ?? e.SkinId, this.SetRoleSkinIcon(r, this.GetTexture(2), t, undefined, this.va_.bind(this, true)), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerRoleItem", ["Refresh", this.fGt]);
    }
  }
  va_(e) {
    this.GetTexture(2).SetUIActive(e);
    this.GetSprite(1).SetUIActive(!e);
  }
}
exports.ShipTowerRoleItem = ShipTowerRoleItem;
//# sourceMappingURL=ShipTowerRoleItem.js.map