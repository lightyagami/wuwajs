"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMainLevelViewModel = undefined;
class TrapDefenseMainLevelViewModel {
  constructor() {
    this.Model = undefined;
    this.JumpDifficulty = undefined;
    this.JumpLevelData = undefined;
    this.IsInstance = false;
  }
  static Create(e) {
    var t = new TrapDefenseMainLevelViewModel();
    t.Model = e;
    return t;
  }
  OnViewClose() {}
  SetJumpDifficulty(e) {
    this.JumpDifficulty = e;
  }
  SetJumpLevelData(e) {
    this.JumpLevelData = this.Model.LevelDataFromIdMap.get(e ?? 0);
  }
  SetIsInstance(e) {
    this.IsInstance = e;
  }
}
exports.TrapDefenseMainLevelViewModel = TrapDefenseMainLevelViewModel;
//# sourceMappingURL=TrapDefenseMainLevelViewModel.js.map