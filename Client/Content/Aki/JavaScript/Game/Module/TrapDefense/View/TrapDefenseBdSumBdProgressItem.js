"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdSumBdProgressItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class TrapDefenseBdSumBdProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ClickCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [2, UE.UISprite], [1, UE.UIItem]];
  }
  Refresh(e) {
    var r = (this.ItemData = e).IsShowQualityArrow;
    var s = this.GetSprite(0);
    s.SetUIActive(false);
    this.GetItem(1)?.SetUIActive(e.IsActive);
    if (r) {
      const t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.QualityArrowRes);
      this.SetSpriteByPath(t, s, false);
    }
    r = e.BdData.GetCurActiveQualityPool();
    const t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_BdProgress_" + r);
    this.SetSpriteByPath(t, this.GetSprite(2), false);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefenseEvent", 69, this.constructor.name, ["", this.ItemData]);
    }
  }
  SetQualityArrowShow(e) {
    if (this.ItemData.IsShowQualityArrow) {
      this.GetSprite(0)?.SetUIActive(e);
    }
  }
}
exports.TrapDefenseBdSumBdProgressItem = TrapDefenseBdSumBdProgressItem;
//# sourceMappingURL=TrapDefenseBdSumBdProgressItem.js.map