"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeListLevelItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MotorcycleTechTreeListLevelItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
  }
  Refresh(e, t, r) {
    var i = e.TargetLevel;
    var s = e.CurLevel;
    var o = this.GetItem(3);
    var l = this.GetItem(2);
    var u = this.GetText(0);
    var c = this.GetText(1);
    o.SetChangeColor(r % 2 != 0, o.changeColor);
    var r = i < s;
    var o = s === i;
    let a = "";
    if (r) {
      a = "ece5d8";
    } else if (o) {
      a = "fff7b4";
    } else if (s < i) {
      a = "adadad";
    }
    u.SetColor(UE.Color.FromHex(a));
    l.SetUIActive(o);
    r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title);
    LguiUtil_1.LguiUtil.SetLocalTextNew(u, "MotorBike_CurrentTechTree_TechLevelInfo", i, r);
    LguiUtil_1.LguiUtil.SetLocalTextNew(c, e.Desc);
  }
}
exports.MotorcycleTechTreeListLevelItem = MotorcycleTechTreeListLevelItem;
//# sourceMappingURL=MotorcycleTechTreeListLevelItem.js.map