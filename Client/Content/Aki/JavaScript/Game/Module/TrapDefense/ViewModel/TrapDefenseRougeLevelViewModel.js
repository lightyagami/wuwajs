"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRougeLevelViewModel = undefined;
class TrapDefenseRougeLevelViewModel {
  constructor() {
    this.Model = undefined;
    this.JumpLevelData = undefined;
    this.IsInstance = false;
  }
  static Create(e) {
    var s = new TrapDefenseRougeLevelViewModel();
    s.Model = e;
    return s;
  }
  OnViewClose() {}
  SetJumpLevelData(e) {
    this.JumpLevelData = this.Model.LevelDataFromIdMap.get(e ?? 0);
  }
  SetIsInstance(e) {
    this.IsInstance = e;
  }
}
exports.TrapDefenseRougeLevelViewModel = TrapDefenseRougeLevelViewModel;
//# sourceMappingURL=TrapDefenseRougeLevelViewModel.js.map