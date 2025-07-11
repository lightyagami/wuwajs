"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPanelHandleCreator = undefined;
class NavigationPanelHandleCreator {
  static RegisterSpecialPanelHandle(a, e) {
    NavigationPanelHandleCreator.nBo.set(a, e);
  }
  static GetPanelHandle(a) {
    let e = NavigationPanelHandleCreator.nBo.get(a);
    let t = a;
    if (!e) {
      e = NavigationPanelHandleCreator.nBo.get("Default");
      t = "Default";
    }
    return new e(t);
  }
}
(exports.NavigationPanelHandleCreator = NavigationPanelHandleCreator).nBo = new Map();
//# sourceMappingURL=NavigationPanelHandleCreator.js.map