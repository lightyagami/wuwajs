"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueInfoViewRoleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class WeeklyRogueInfoViewRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnSelectedCallback = undefined;
    this.eTt = () => {
      this.OnSelectedCallback?.(this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIExtendToggle]];
    this.BtnBindInfo = [[4, this.eTt]];
  }
  Refresh(e, t, i) {
    var r;
    var o;
    var s;
    var n;
    var e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e);
    if (e !== undefined) {
      this.SetRoleSkinIcon(e.GetRoleConfig().RoleHeadIconBig, this.GetTexture(0), e.GetRoleSkinId());
      e = e.GetRoleConfig().QualityId;
      r = this.GetSprite(1);
      o = this.GetSprite(2);
      n = this.GetSprite(3);
      s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_RoleIconBgUnCheckedUnHover" + e);
      this.SetSpriteByPath(s, n, false);
      s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_RoleIconBgUnCheckedHover" + e);
      this.SetSpriteByPath(s, o, false);
      n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_RoleIconBgChecked" + e);
      this.SetSpriteByPath(n, r, false);
    }
  }
  OnSelected(e) {
    this.GetExtendToggle(4).SetToggleState(1);
    if (e) {
      this.OnSelectedCallback?.(this.GridIndex);
    }
  }
  OnDeselected(e) {
    this.GetExtendToggle(4).SetToggleState(0);
  }
}
exports.WeeklyRogueInfoViewRoleItem = WeeklyRogueInfoViewRoleItem;
//# sourceMappingURL=WeeklyRogueInfoViewRoleItem.js.map