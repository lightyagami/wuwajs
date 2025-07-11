"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerScoreTargetItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerScoreTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnBeforeCreate() {}
  OnStart() {}
  OnBeforeDestroy() {}
  Refresh(e) {
    this.fGt = e;
    this.GetText(2).SetText(this.fGt.Title);
    this.GetText(3).SetText(this.fGt.ScoreTarget.toString());
    this.GetSprite(0).SetUIActive(!this.fGt.IsFinish);
    this.GetSprite(1).SetUIActive(this.fGt.IsFinish);
    this.Ma_();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, this.constructor.name, ["Refresh", this.fGt]);
    }
  }
  Ma_() {
    var e = this.fGt?.ScoreGradeRes;
    this.GetItem(4).SetUIActive(!!e);
    if (e) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetTextureByPath(e, this.GetTexture(5));
    }
  }
}
exports.ShipTowerScoreTargetItem = ShipTowerScoreTargetItem;
//# sourceMappingURL=ShipTowerScoreTargetItem.js.map