"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourGameRankItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class MotorParkourGameRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e, r, t) {
    var t = t + 1;
    var t = ConfigManager_1.ConfigManager.MotorParkourConfig.GetMotorParkourRankById(t);
    this.SetSpriteByPath(t.SpriteNum, this.GetSprite(0), false);
    this.GetText(2)?.SetText(e.ShowTimeString);
    if (e.IsOwn) {
      t = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
      this.GetText(1)?.SetText(t);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
    }
  }
}
exports.MotorParkourGameRankItem = MotorParkourGameRankItem;
//# sourceMappingURL=MotorParkourGameRankItem.js.map