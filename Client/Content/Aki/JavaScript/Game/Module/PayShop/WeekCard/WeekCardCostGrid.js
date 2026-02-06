"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekCardCostGrid = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeekCardCostGrid extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture]];
  }
  Refresh(t) {
    var i = this.GetText(0);
    i.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(t.Tips));
    if (!StringUtils_1.StringUtils.IsEmpty(t.Tips)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.Tips);
    }
    this.GetText(1).SetText(t.Count.toString());
    this.SetItemIcon(this.GetTexture(2), t.ItemId);
  }
}
exports.WeekCardCostGrid = WeekCardCostGrid;
//# sourceMappingURL=WeekCardCostGrid.js.map