"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonBottomTipItem = undefined;
const ue_1 = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonBottomTipItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText]];
  }
  Refresh(t, e, i) {
    var r = t.TextId;
    var t = t.TextArgs;
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r, ...t);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r);
    }
  }
}
exports.InstanceDungeonBottomTipItem = InstanceDungeonBottomTipItem;
//# sourceMappingURL=InstanceDungeonBottomTipItem.js.map