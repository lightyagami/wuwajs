"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourRankItem = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class MotorParkourRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText]];
  }
  Refresh(e, r, i) {
    var i = i + 1;
    var i = ConfigManager_1.ConfigManager.MotorParkourConfig.GetMotorParkourRankById(i);
    this.SetSpriteByPath(i.SpriteNum, this.GetSprite(0), false);
    this.SetSpriteByPath(i.SpriteBg, this.GetSprite(1), false);
    var i = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat5(e.Time * TimeUtil_1.TimeUtil.Millisecond);
    this.GetText(3)?.SetText(i);
    if (e.IsOwn) {
      i = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
      this.GetText(2)?.SetText(i);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
    }
  }
}
exports.MotorParkourRankItem = MotorParkourRankItem;
//# sourceMappingURL=MotorParkourRankItem.js.map