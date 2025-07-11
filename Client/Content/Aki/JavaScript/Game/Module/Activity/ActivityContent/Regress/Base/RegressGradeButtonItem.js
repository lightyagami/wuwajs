"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressGradeButtonItem = undefined;
const RegressGradeUiItem_1 = require("./RegressGradeUiItem");
class RegressGradeButtonItem extends RegressGradeUiItem_1.RegressGradeUiItem {
  constructor(t, s) {
    super();
    this.NormalButtonItem = t;
    this.HyperButtonItem = s;
    this.rMt = undefined;
    this.n_1 = () => {
      this.rMt?.(1);
    };
    this.s_1 = () => {
      this.rMt?.(2);
    };
    this.NormalButtonItem.SetFunction(this.n_1);
    this.HyperButtonItem.SetFunction(this.s_1);
  }
  Bind(t) {
    this.rMt = t;
  }
  BindRedDot(t) {
    this.NormalButtonItem.BindRedDot(t);
    this.HyperButtonItem.BindRedDot(t);
  }
  UnBind() {
    this.rMt = undefined;
  }
  Clear() {
    this.NormalButtonItem.UnBindRedDot();
    this.HyperButtonItem.UnBindRedDot();
    this.UnBind();
  }
  OnSetToNormal() {
    this.a_1();
  }
  OnSetToHyper() {
    this.a_1();
  }
  a_1() {
    this.NormalButtonItem.SetActive(this.Grade === 1);
    this.HyperButtonItem.SetActive(this.Grade === 2);
  }
}
exports.RegressGradeButtonItem = RegressGradeButtonItem;
//# sourceMappingURL=RegressGradeButtonItem.js.map