"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonLevelUpAttributeItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../Util/LguiUtil");
class CommonLevelUpAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture]];
  }
  Refresh(t) {
    if (t.IconPath !== undefined) {
      this.SetTextureByPath(t.IconPath, this.GetTexture(4));
    }
    this.GetTexture(4).SetUIActive(t.IconPath !== undefined);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
    if (t.PreText) {
      this.GetText(1).SetText(t.PreText);
    } else {
      this.GetText(1).SetUIActive(false);
    }
    this.GetItem(2).SetUIActive(t.ShowArrow ?? false);
    if (t.CurText) {
      this.GetText(3).SetText(t.CurText);
    } else {
      this.GetText(3).SetUIActive(false);
    }
  }
}
exports.CommonLevelUpAttributeItem = CommonLevelUpAttributeItem;
//# sourceMappingURL=CommonLevelUpAttributeItem.js.map