"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseShopViewModel = undefined;
class TrapDefenseShopViewModel {
  constructor() {
    this.SelectedGoods = undefined;
    this.dXc = [];
  }
  static Create() {
    return new TrapDefenseShopViewModel();
  }
  AddOnSelectGoodsDelegate(e) {
    this.dXc.push(e);
  }
  RemoveOnSelectGoodsDelegate(e) {
    e = this.dXc.indexOf(e);
    if (e >= 0) {
      this.dXc.splice(e, 1);
    }
  }
  SelectGoods(e) {
    this.SelectedGoods = e;
    for (const s of this.dXc) {
      s(e);
    }
  }
  OnViewClose() {
    this.SelectedGoods = undefined;
    this.dXc.length = 0;
  }
}
exports.TrapDefenseShopViewModel = TrapDefenseShopViewModel;
//# sourceMappingURL=TrapDefenseShopViewModel.js.map