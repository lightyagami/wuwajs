"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksRoleRequireItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class DrinksRoleRequireItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIText], [4, UE.UISprite]];
  }
  Refresh(i, e, r) {
    this.GetSprite(2)?.SetUIActive(i.Completed);
    this.GetSprite(4)?.SetUIActive(i.Type === 0);
    this.GetText(3).SetChangeColor(i.Completed, this.GetText(3).changeColor);
    if (i.Type === 0 && i.FlavorRangeId) {
      var t = ConfigManager_1.ConfigManager.DrinksConfig.GetFlavorRange(i.FlavorRangeId);
      var s = ConfigManager_1.ConfigManager.DrinksConfig.GetFlavorType(t.FlavorTypeRef);
      var a = t.FlavorValues[0];
      var o = t.FlavorValues[1];
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Desc, s.IconRichTxt, a, o);
    } else {
      var n = ConfigManager_1.ConfigManager.DrinksConfig.GetRequireList(i.RequireId);
      let e = "";
      switch (i.Type) {
        case 1:
          e = n.DrinkNeedKey;
          break;
        case 2:
          e = n.BatchingNeedKey;
          break;
        case 3:
          e = n.OrnamentNeedKey;
          break;
        default:
          e = "";
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
    }
  }
}
exports.DrinksRoleRequireItem = DrinksRoleRequireItem;
//# sourceMappingURL=DrinksRoleRequireItem.js.map