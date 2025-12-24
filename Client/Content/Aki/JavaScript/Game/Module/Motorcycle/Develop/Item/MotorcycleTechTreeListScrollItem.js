"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeListScrollItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
class MotorcycleTechTreeListScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText]];
  }
  Refresh(e, r, t) {
    var i;
    var o = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e.TechId);
    if (o) {
      this.SetTextureByPath(o.Icon, this.GetTexture(1));
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Title);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "MotorBike_CurrentTechTree_TechLevelInfo", e.Level, i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), o.DescSimple);
    }
    var e = this.GetItem(0);
    e.SetChangeColor(t % 2 != 0, e.changeColor);
  }
}
exports.MotorcycleTechTreeListScrollItem = MotorcycleTechTreeListScrollItem;
//# sourceMappingURL=MotorcycleTechTreeListScrollItem.js.map