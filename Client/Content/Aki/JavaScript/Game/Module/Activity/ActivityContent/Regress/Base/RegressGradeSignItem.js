"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RegressGradeSignItem = void 0;
const RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  RegressGradeUiItem_1 = require("./RegressGradeUiItem");
class RegressGradeSignItem extends RegressGradeUiItem_1.RegressGradeUiItem {
  constructor(t, e) {
    super(), this.NormalContext = t, this.HyperContext = e, this.F01 = void 0
  }
  BindRedDot(t) {
    RedDotController_1.RedDotController.BindRedDot(t, this.NormalContext.RedDotItem), RedDotController_1.RedDotController.BindRedDot(t, this.HyperContext.RedDotItem), this.F01 = t
  }
  UnBindRedDot() {
    this.F01 && (RedDotController_1.RedDotController.UnBindGivenUi(this.F01, this.NormalContext.RedDotItem), RedDotController_1.RedDotController.UnBindGivenUi(this.F01, this.HyperContext.RedDotItem), this.F01 = void 0)
  }
  Clear() {
    this.UnBindRedDot()
  }
  OnSetToNormal() {
    this.Il1()
  }
  OnSetToHyper() {
    this.Il1()
  }
  Il1() {
    this.Tl1(this.NormalContext, 1), this.Tl1(this.HyperContext, 2)
  }
  Tl1(t, e) {
    t.Btn.RootUIComp.SetUIActive(e === this.Grade), t.CurrencyTexNode.SetUIActive(e === this.Grade), t.BubbleNode.SetUIActive(e === this.Grade)
  }
  GetActivateContext() {
    return 1 === this.Grade ? this.NormalContext : this.HyperContext
  }
  SetClaimRewardBubbleActive(t) {
    this.GetActivateContext().BubbleNode.SetUIActive(t)
  }
}
exports.RegressGradeSignItem = RegressGradeSignItem;
//# sourceMappingURL=RegressGradeSignItem.js.map