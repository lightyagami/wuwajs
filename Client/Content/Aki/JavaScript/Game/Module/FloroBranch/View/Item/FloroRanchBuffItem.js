"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchBuffItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FloroRanchBuffItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIText]];
  }
  OnStart() {
    var r = {
      UiText: this.GetText(3),
      ViewType: 0,
      Style: 2,
      ReportType: 8
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(r);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(3));
  }
  Refresh(r, e, t) {
    var o = r.RemindDay;
    var s = o > 0;
    this.GetItem(1)?.SetUIActive(s);
    if (s) {
      this.GetText(2)?.SetText(o.toString());
    }
    this.GetText(3)?.ShowTextNew(r.GetBuffName());
    this.GetTexture(4)?.SetUIActive(false);
    this.GetText(5)?.SetUIActive(false);
  }
}
exports.FloroRanchBuffItem = FloroRanchBuffItem;
//# sourceMappingURL=FloroRanchBuffItem.js.map