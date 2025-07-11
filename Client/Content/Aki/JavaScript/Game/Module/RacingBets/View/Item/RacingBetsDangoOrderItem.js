"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoOrderItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsDangoOrderItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture]];
  }
  Refresh(e) {
    var r = DangoManager_1.DangoManager.GetDangoData(e.Kz_);
    this.SetTextureShowUntilLoaded(r.Icon, this.GetTexture(0));
    var r = ConfigManager_1.ConfigManager.DangoConfig.GetDiceById(e.pJ_);
    this.SetTextureShowUntilLoaded(r.RollDiceBackgroundIcon, this.GetTexture(1));
  }
}
exports.RacingBetsDangoOrderItem = RacingBetsDangoOrderItem;
//# sourceMappingURL=RacingBetsDangoOrderItem.js.map