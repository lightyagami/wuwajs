"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeChapterViewModel = undefined;
const QuestTreeNodeLocatingHelper_1 = require("../View/ChapterView/QuestTreeNodeLocatingHelper");
class QuestTreeChapterViewModel {
  constructor() {
    this.VWd = false;
    this.pPd = [];
    this.vPd = [];
    this.yjd = [];
    this.MaxToggleHeight = 0;
    this.SelectedData = undefined;
    this.LocatingHelper = undefined;
    this.NodeHeightDeltaMap = new Map();
    this.View = undefined;
  }
  get OverrideLockReasonGoto() {
    return !!this.View && this.VWd;
  }
  SetOverrideLockReasonGoto(e) {
    this.VWd = e;
  }
  get MaxHeightBalanceValue() {
    let e = 0;
    for (const t of this.NodeHeightDeltaMap.values()) {
      if (Math.abs(t) > Math.abs(e) || e * t < 0) {
        e = t;
      }
    }
    return e;
  }
  static Create() {
    return new QuestTreeChapterViewModel();
  }
  InitLocatingHelper(e) {
    this.LocatingHelper ||= new QuestTreeNodeLocatingHelper_1.QuestTreeNodeLocatingHelper(e);
  }
  OnViewOpen(e) {
    this.View = e;
  }
  OnViewClose() {
    this.Clear();
    this.View = undefined;
  }
  Clear() {
    this.pPd.length = 0;
    this.vPd.length = 0;
    this.yjd.length = 0;
    this.SelectedData = undefined;
    if (this.LocatingHelper) {
      this.LocatingHelper.Clear();
      this.LocatingHelper = undefined;
    }
  }
  AddOnSelectedDataChange(e) {
    this.pPd.push(e);
  }
  RemoveOnSelectedDataChange(e) {
    e = this.pPd.indexOf(e);
    if (e !== -1) {
      this.pPd.splice(e, 1);
    }
  }
  SelectData(e) {
    this.SelectedData = e;
    this.yPd();
  }
  AddOnLocatingNode(e) {
    this.vPd.push(e);
  }
  RemoveOnLocatingNode(e) {
    e = this.vPd.indexOf(e);
    if (e !== -1) {
      this.vPd.splice(e, 1);
    }
  }
  LocateToNode(e) {
    for (const t of this.vPd) {
      t(e);
    }
  }
  RecordHeightBalanceValue(e, t) {
    this.NodeHeightDeltaMap.set(e, t);
  }
  RecordToggleHeight(e) {
    if (e > this.MaxToggleHeight) {
      this.MaxToggleHeight = e;
    }
  }
  yPd() {
    for (const e of this.pPd) {
      e(this.SelectedData);
    }
  }
  AddOnUpdateNode(e) {
    this.yjd.push(e);
  }
  RemoveOnUpdateNode(e) {
    e = this.yjd.indexOf(e);
    if (e !== -1) {
      this.yjd.splice(e, 1);
    }
  }
  NotifyUpdateNode() {
    for (const e of this.yjd) {
      e();
    }
  }
}
exports.QuestTreeChapterViewModel = QuestTreeChapterViewModel;
//# sourceMappingURL=QuestTreeChapterViewModel.js.map