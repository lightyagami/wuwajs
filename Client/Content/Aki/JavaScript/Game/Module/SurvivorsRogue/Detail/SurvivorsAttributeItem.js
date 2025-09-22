"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsAttributeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class SurvivorsAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UISprite]];
  }
  Refresh(t, e, r) {
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetPropertyConfig(t.AttrId);
    this.SetTextByTextId(i.Name);
    this.SetIcon(i.Icon);
    this.SetValue(t.Value, i.IsPercent, t.IsAddition ?? false);
    this.SetRecommend(t.IsRecommend);
    this.SetBgVisible(r % 2 == 0);
  }
  SetIcon(t) {
    this.SetTextureByPath(t, this.GetTexture(2));
  }
  SetRecommend(t) {
    this.GetSprite(4)?.SetUIActive(t);
  }
  SetValue(t, e = false, r = false) {
    if (e) {
      t *= 100;
    }
    let i = Number.isInteger(t) ? t.toString() : t.toFixed(2);
    if (e) {
      i += "%";
    }
    if (r) {
      i = "+" + i;
    }
    this.GetText(1)?.SetText(i);
  }
  SetTextByTextId(t) {
    this.GetText(0)?.ShowTextNew(t);
  }
  SetBgVisible(t) {
    this.GetSprite(3)?.SetUIActive(t);
  }
}
exports.SurvivorsAttributeItem = SurvivorsAttributeItem;
//# sourceMappingURL=SurvivorsAttributeItem.js.map