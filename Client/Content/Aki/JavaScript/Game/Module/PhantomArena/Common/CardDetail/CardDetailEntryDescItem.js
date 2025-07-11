"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDetailEntryDescItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CardDetailEntryDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEntryConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Description);
  }
}
exports.CardDetailEntryDescItem = CardDetailEntryDescItem;
//# sourceMappingURL=CardDetailEntryDescItem.js.map