"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressGradeUiItem = undefined;
class RegressGradeUiItem {
  constructor() {
    this.u_1 = 1;
  }
  get Grade() {
    return this.u_1;
  }
  set Grade(e) {
    this.u_1 = e;
    this.Cl();
  }
  Cl() {
    switch (this.Grade) {
      case 1:
        this.OnSetToNormal();
        break;
      case 2:
        this.OnSetToHyper();
    }
  }
  OnSetToNormal() {}
  OnSetToHyper() {}
  BindRedDot(e) {}
}
exports.RegressGradeUiItem = RegressGradeUiItem;
//# sourceMappingURL=RegressGradeUiItem.js.map