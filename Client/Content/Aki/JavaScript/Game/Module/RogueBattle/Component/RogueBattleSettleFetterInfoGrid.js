"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleSettleFetterInfoGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleSettleFetterInfoGrid extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText]];
  }
  Refresh(e, t, r) {
    var i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(e.v9n);
    if (i !== undefined) {
      this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(1));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RogueRes_FightFormation_RoleLevel", e.F6n.toString());
    }
  }
}
exports.RogueBattleSettleFetterInfoGrid = RogueBattleSettleFetterInfoGrid;
//# sourceMappingURL=RogueBattleSettleFetterInfoGrid.js.map