"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkNameComponent = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const MarkPanelBase_1 = require("../MarkPanelBase");
class MarkNameComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeShow() {
    this.oCo();
  }
  SetNameParam(e) {
    this.OPt = e;
    if (this.IsShowOrShowing) {
      this.oCo();
    }
  }
  oCo() {
    if (this.OPt !== undefined) {
      this.SetName(this.OPt.FormatStr, this.OPt.Name, this.OPt.Progress, this.OPt.FontSize);
    }
  }
  SetName(e, t, i, s) {
    var r = this.GetText(0);
    if (r) {
      if (s) {
        r.SetFontSize(s);
      }
      s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
      r.SetText(StringUtils_1.StringUtils.Format(s, e, i));
    }
  }
}
exports.MarkNameComponent = MarkNameComponent;
//# sourceMappingURL=MarkNameComponent.js.map