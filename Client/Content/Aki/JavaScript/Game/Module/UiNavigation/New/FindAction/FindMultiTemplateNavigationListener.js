"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindMultiTemplateNavigationListener = undefined;
const TsUiNavigationBehaviorListener_1 = require("../TsUiNavigationBehaviorListener");
const FindActionBase_1 = require("./FindActionBase");
class FindMultiTemplateNavigationListener extends FindActionBase_1.FindActionBase {
  FindNavigation(i) {
    var e;
    var t;
    var a;
    var s = this.Params[0];
    if (s && s.ScrollProxy && s.ScrollProxy.ScrollView) {
      e = s.ScrollProxy.ScrollView;
      t = this.Params[1];
      if (a = e.GetNavigationComponentByGridIndex(t)) {
        i.Listener = a.GetOwner()?.GetComponentByClass(TsUiNavigationBehaviorListener_1.TsUiNavigationBehaviorListener.StaticClass());
        i.Result = 1;
      } else if (e.IsInDisplayRange(t)) {
        i.Listener = s;
        i.Result = 1;
      } else {
        i.Listener = undefined;
        i.Result = 8;
      }
    } else {
      i.Listener = undefined;
      i.Result = 2;
    }
  }
}
exports.FindMultiTemplateNavigationListener = FindMultiTemplateNavigationListener;
//# sourceMappingURL=FindMultiTemplateNavigationListener.js.map