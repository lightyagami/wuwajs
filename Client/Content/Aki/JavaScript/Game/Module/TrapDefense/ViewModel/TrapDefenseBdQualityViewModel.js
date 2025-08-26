"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdQualityViewModel = undefined;
class TrapDefenseBdQualityViewModel {
  constructor() {
    this.Model = undefined;
    this.CurSelectBdData = undefined;
    this.CurSelectBdBuffData = undefined;
    this.IsNewQualityMode = false;
    this.ShowQuality = 5;
  }
  static Create(e) {
    var t = new TrapDefenseBdQualityViewModel();
    t.Model = e;
    return t;
  }
  SetCurSelectBdData(e) {
    this.CurSelectBdData = e;
  }
  SetCurSelectBdBuffData(e) {
    this.CurSelectBdBuffData = e;
  }
  SetNewQualityMode(e) {
    this.IsNewQualityMode = e;
  }
  SetShowQuality(e) {
    this.ShowQuality = e ?? this.ShowQuality;
  }
  OnViewClose() {
    this.CurSelectBdData = undefined;
    this.CurSelectBdBuffData = undefined;
  }
}
exports.TrapDefenseBdQualityViewModel = TrapDefenseBdQualityViewModel;
//# sourceMappingURL=TrapDefenseBdQualityViewModel.js.map