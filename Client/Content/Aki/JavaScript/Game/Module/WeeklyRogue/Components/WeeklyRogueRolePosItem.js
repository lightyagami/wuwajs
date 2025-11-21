"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueRolePosItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class WeeklyRogueRolePosItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.LAe = undefined;
    this.OnBtnClickFunc = undefined;
    this.eje = () => {
      this.OnBtnClickFunc?.(this.LAe?.Data);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eje]];
  }
  Refresh(e, t, s) {
    var i;
    var r;
    if ((this.LAe = e).Data === undefined) {
      this.JGu(false);
      this.GetItem(2).SetUIActive(false);
    } else {
      r = (i = e.Data).GetRoleConfig();
      i = i?.GetRoleSkinId() ?? r.SkinId;
      if (r = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(i)) {
        this.SetTextureShowUntilLoaded(r.RoleHeadIconCircle, this.GetTexture(1));
        this.GetItem(2).SetUIActive(e.IsRecommend);
      }
    }
  }
  JGu(e) {
    this.GetTexture(1).SetUIActive(e);
  }
}
exports.WeeklyRogueRolePosItem = WeeklyRogueRolePosItem;
//# sourceMappingURL=WeeklyRogueRolePosItem.js.map