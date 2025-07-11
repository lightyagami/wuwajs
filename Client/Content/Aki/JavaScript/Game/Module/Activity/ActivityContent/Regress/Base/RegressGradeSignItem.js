"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressGradeSignItem = undefined;
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const RegressGradeUiItem_1 = require("./RegressGradeUiItem");
class RegressGradeSignItem extends RegressGradeUiItem_1.RegressGradeUiItem {
  constructor(t, e) {
    super();
    this.NormalContext = t;
    this.HyperContext = e;
    this._p1 = undefined;
  }
  BindRedDot(t) {
    RedDotController_1.RedDotController.BindRedDot(t, this.NormalContext.RedDotItem);
    RedDotController_1.RedDotController.BindRedDot(t, this.HyperContext.RedDotItem);
    this._p1 = t;
  }
  UnBindRedDot() {
    if (this._p1) {
      RedDotController_1.RedDotController.UnBindGivenUi(this._p1, this.NormalContext.RedDotItem);
      RedDotController_1.RedDotController.UnBindGivenUi(this._p1, this.HyperContext.RedDotItem);
      this._p1 = undefined;
    }
  }
  Clear() {
    this.UnBindRedDot();
  }
  OnSetToNormal() {
    this.__1();
  }
  OnSetToHyper() {
    this.__1();
  }
  __1() {
    this.c_1(this.NormalContext, 1);
    this.c_1(this.HyperContext, 2);
  }
  c_1(t, e) {
    t.Btn.RootUIComp.SetUIActive(e === this.Grade);
    t.CurrencyTexNode.SetUIActive(e === this.Grade);
    t.BubbleNode.SetUIActive(e === this.Grade);
  }
  GetActivateContext() {
    if (this.Grade === 1) {
      return this.NormalContext;
    } else {
      return this.HyperContext;
    }
  }
  SetClaimRewardBubbleActive(t) {
    this.GetActivateContext().BubbleNode.SetUIActive(t);
  }
}
exports.RegressGradeSignItem = RegressGradeSignItem;
//# sourceMappingURL=RegressGradeSignItem.js.map