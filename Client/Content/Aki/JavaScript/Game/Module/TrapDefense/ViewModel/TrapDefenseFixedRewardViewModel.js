"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseFixedRewardViewModel = undefined;
class TrapDefenseFixedRewardViewModel {
  constructor() {
    this.Model = undefined;
  }
  static Create(e) {
    var r = new TrapDefenseFixedRewardViewModel();
    r.Model = e;
    return r;
  }
  OnViewClose() {}
  GetFixedRewardDataList() {
    this.Model.RewardData.SortFixedRewardList();
    return this.Model.RewardData.FixedRewardDataList;
  }
}
exports.TrapDefenseFixedRewardViewModel = TrapDefenseFixedRewardViewModel;
//# sourceMappingURL=TrapDefenseFixedRewardViewModel.js.map