"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerReviewItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
class ShipTowerReviewItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.ClickCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  Refresh(e) {
    this.fGt = e;
    this.GetText(0)?.SetText(this.fGt.Title);
    var e = ShipTowerDefine_1.shipTowerTextKey.ScorePointNoColor;
    var i = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, e, this.fGt.Score.toString());
    var i = this.fGt.Grade !== undefined;
    var e = this.GetTexture(2);
    e?.SetUIActive(i);
    if (i) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.fGt.Grade);
      this.SetTextureByPath(i, e);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerReviewItem", ["Refresh", this.fGt]);
    }
  }
}
exports.ShipTowerReviewItem = ShipTowerReviewItem;
//# sourceMappingURL=ShipTowerReviewItem.js.map