"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTagMediumIconItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleTagMediumIconItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UISprite]];
  }
  Refresh(e, i, r) {
    var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTagConfig(e);
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleTagMediumIconItem无效tagId", ["TagId", e]);
      }
    } else {
      const t = this.GetSprite(2);
      e = this.GetText(1);
      t?.SetUIActive(false);
      this.SetSpriteByPath(o.TagIcon, t, false, undefined, () => {
        t.SetUIActive(true);
      });
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, o.TagName);
      o = UE.Color.FromHex(o.TagNameColor);
      this.GetSprite(0).SetColor(o);
      t.SetColor(o);
      e.SetColor(o);
    }
  }
}
exports.RoleTagMediumIconItem = RoleTagMediumIconItem;
//# sourceMappingURL=RoleTagMediumIconItem.js.map