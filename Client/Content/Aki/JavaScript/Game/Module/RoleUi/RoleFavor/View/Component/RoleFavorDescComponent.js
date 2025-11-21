"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorDescComponent = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const RoleFavorViewComponentBase_1 = require("./RoleFavorViewComponentBase");
class RoleFavorDescComponent extends RoleFavorViewComponentBase_1.RoleFavorViewComponentBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIText], [2, UE.UIText]];
  }
  OnRefreshView() {
    var e;
    var o;
    var r;
    var t;
    if (this.ContentData) {
      e = this.GetText(1);
      o = this.GetText(2);
      r = this.ContentData.Title;
      t = this.ContentData.Content;
      e.SetText(r);
      o.SetText(t);
      this.GetScrollViewWithScrollbar(0).SetScrollProgress(0);
    }
  }
  OnStart() {
    var e = this.GetText(2);
    if (!ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(e)) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(e, 1, 5, 1);
    }
  }
  OnBeforeDestroy() {
    var e = this.GetText(2);
    if (ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(e)) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(e);
    }
  }
}
exports.RoleFavorDescComponent = RoleFavorDescComponent;
//# sourceMappingURL=RoleFavorDescComponent.js.map