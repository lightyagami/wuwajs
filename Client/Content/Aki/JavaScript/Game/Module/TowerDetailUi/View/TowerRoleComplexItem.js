"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerRoleComplexItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerRoleComplexItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText], [4, UE.UISprite]];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(true);
    this.GetText(3).SetUIActive(false);
    this.GetSprite(4).SetUIActive(false);
  }
  RefreshRoleId(e) {
    var s;
    var r = this.GetTexture(1);
    var t = this.GetSprite(0);
    if (e) {
      r.SetUIActive(true);
      t.SetUIActive(true);
      s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      this.SetRoleIcon(s.RoleHeadIconBig, r, e);
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleQualityInfo(s.QualityId);
      this.SetSpriteByPath(e.Image, t, false);
    } else {
      r.SetUIActive(false);
      t.SetUIActive(false);
    }
  }
}
exports.TowerRoleComplexItem = TowerRoleComplexItem;
//# sourceMappingURL=TowerRoleComplexItem.js.map