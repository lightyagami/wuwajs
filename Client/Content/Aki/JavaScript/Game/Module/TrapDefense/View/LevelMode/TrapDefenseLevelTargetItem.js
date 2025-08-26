"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelTargetItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseLevelTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ClickCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem]];
  }
  Refresh(e) {
    this.ItemData = e;
    this.GetText(0)?.SetText(e.TargetStar.toString());
    var r = this.GetTexture(1);
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.Info.IconKey);
    this.SetTextureByPath(t, r);
    var t = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Info.NameKey, e.TargetValue);
    this.GetItem(3)?.SetUIActive(e.IsFinish);
  }
}
exports.TrapDefenseLevelTargetItem = TrapDefenseLevelTargetItem;
//# sourceMappingURL=TrapDefenseLevelTargetItem.js.map