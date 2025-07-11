"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingAttributeItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../../Util/LguiUtil");
class BuildingAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(t, i, e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.TextId);
    this.GetText(1)?.SetText(t.ValueText);
  }
}
exports.BuildingAttributeItem = BuildingAttributeItem;
//# sourceMappingURL=BuildingAttributeItem.js.map