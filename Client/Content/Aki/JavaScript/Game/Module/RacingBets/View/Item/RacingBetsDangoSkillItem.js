"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoSkillItem = undefined;
const UE = require("ue");
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsDangoSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e, t, r) {
    e = DangoManager_1.DangoManager.GetDangoData(e.DangoId);
    this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(0));
    e = e.GetSkillConfig();
    this.GetText(1).ShowTextNew(e.Name);
    this.GetText(2).ShowTextNew(e.Desc);
  }
}
exports.RacingBetsDangoSkillItem = RacingBetsDangoSkillItem;
//# sourceMappingURL=RacingBetsDangoSkillItem.js.map