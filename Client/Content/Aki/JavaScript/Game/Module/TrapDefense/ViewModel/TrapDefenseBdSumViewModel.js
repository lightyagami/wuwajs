"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdSumViewModel = undefined;
class TrapDefenseBdSumViewModel {
  constructor() {
    this.Model = undefined;
    this.JumpTabType = undefined;
    this.JumpBdBuffId = undefined;
    this.JumpBdId = undefined;
    this.IsInstance = false;
    this.CurSelectBdBuffData = undefined;
    this.CurSelectBdData = undefined;
  }
  static Create(t) {
    var e = new TrapDefenseBdSumViewModel();
    e.Model = t;
    return e;
  }
  GetTabList() {
    return [{
      TabType: 0,
      TabNameKey: "TrapDefense_BdSumTab_BdProgress"
    }, {
      TabType: 1,
      TabNameKey: "TrapDefense_BdSumTab_BuffSum"
    }];
  }
  GetBdListForProgress() {
    if (this.IsInstance) {
      var t = this.Model.GetCurInstToLevelData();
      if (t) {
        const e = t.GetShowBdList();
        e.sort(this.SortBdProgress.bind(this));
        return e;
      }
    }
    const e = this.Model.RougeModeData.BdDataListIgnoreZero;
    e.sort(this.SortBdUnlock.bind(this));
    return e;
  }
  SortBdProgress(t, e) {
    var s = t.GetCurrentActiveProgressNum();
    var i = e.GetCurrentActiveProgressNum();
    if (s !== i) {
      return i - s;
    } else {
      return this.SortBdId(t, e);
    }
  }
  SortBdUnlock(t, e) {
    if (t.IsUnlock !== e.IsUnlock) {
      if (t.IsUnlock) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return this.SortBdId(t, e);
    }
  }
  SortBdId(t, e) {
    return t.Id - e.Id;
  }
  GetBdListForBuffSum() {
    if (this.IsInstance) {
      const t = this.Model.RougeModeData.GetBdDataListIsActive();
      t.sort(this.SortBdProgress.bind(this));
      return t;
    }
    const t = this.Model.RougeModeData.BdDataList;
    t.sort(this.SortBdUnlock.bind(this));
    return t;
  }
  SetIsInstance(t) {
    this.IsInstance = t;
  }
  SetSelectBdBuffData(t) {
    this.CurSelectBdBuffData = t;
  }
  SetSelectBdData(t) {
    this.CurSelectBdData = t;
  }
  SetJumpTabType(t) {
    this.JumpTabType = t;
  }
  SetJumpBdId(t) {
    this.JumpBdId = t;
  }
  IsShowBuffLockState(t) {
    if (this.IsInstance) {
      return !t.IsActive;
    } else {
      return !t.IsUnlock;
    }
  }
  OnViewClose() {
    this.CurSelectBdData = undefined;
    this.CurSelectBdBuffData = undefined;
    this.IsInstance = false;
  }
}
exports.TrapDefenseBdSumViewModel = TrapDefenseBdSumViewModel;
//# sourceMappingURL=TrapDefenseBdSumViewModel.js.map