"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseShopViewModel = undefined;
class TrapDefenseShopViewModel {
  constructor() {
    this.SelectedGoods = undefined;
    this.N$c = [];
  }
  static Create() {
    return new TrapDefenseShopViewModel();
  }
  AddOnSelectGoodsDelegate(e) {
    this.N$c.push(e);
  }
  RemoveOnSelectGoodsDelegate(e) {
    e = this.N$c.indexOf(e);
    if (e >= 0) {
      this.N$c.splice(e, 1);
    }
  }
  SelectGoods(e) {
    this.SelectedGoods = e;
    for (const s of this.N$c) {
      s(e);
    }
  }
  OnViewClose() {
    this.SelectedGoods = undefined;
    this.N$c.length = 0;
  }
}
exports.TrapDefenseShopViewModel = TrapDefenseShopViewModel;
//# sourceMappingURL=TrapDefenseShopViewModel.js.map