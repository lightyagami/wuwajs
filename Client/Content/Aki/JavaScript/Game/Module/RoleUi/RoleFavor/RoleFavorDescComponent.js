"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorDescComponent = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleFavorDescComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, r) {
    super();
    this.P_o = r;
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {
    var e = this.GetText(1);
    var r = this.GetText(2);
    if (this.P_o) {
      e.SetText(this.P_o.Title);
      r.SetText(this.P_o.Desc);
    } else {
      e.SetText("");
      r.SetText("");
    }
    this.GetScrollViewWithScrollbar(0).SetScrollProgress(0);
    if (!ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(r)) {
      ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(r, 1, 5, 1);
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