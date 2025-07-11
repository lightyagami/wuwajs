"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTagSmallIconItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleTagSmallIconItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(e, o, r) {
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTagConfig(e);
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleTagSmallIconItem无效tagId", ["TagId", e]);
      }
    } else {
      e = this.GetSprite(0);
      this.SetActive(false);
      this.SetSpriteByPath(t.TagIcon, e, false, undefined, () => {
        this.SetActive(true);
      });
    }
  }
}
exports.RoleTagSmallIconItem = RoleTagSmallIconItem;
//# sourceMappingURL=RoleTagSmallIconItem.js.map