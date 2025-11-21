"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeChapterViewModel = undefined;
const QuestTreeNodeLocatingHelper_1 = require("../View/ChapterView/QuestTreeNodeLocatingHelper");
class QuestTreeChapterViewModel {
  constructor() {
    this.Ism = false;
    this.ZDd = [];
    this.eUd = [];
    this.$em = [];
    this.MaxToggleHeight = 0;
    this.SelectedData = undefined;
    this.LocatingHelper = undefined;
    this.NodeHeightDeltaMap = new Map();
    this.View = undefined;
  }
  get OverrideLockReasonGoto() {
    return !!this.View && this.Ism;
  }
  SetOverrideLockReasonGoto(e) {
    this.Ism = e;
  }
  get MaxTopHeight() {
    let e = 0;
    for (const t of this.NodeHeightDeltaMap.values()) {
      if (t[0] > e) {
        e = t[0];
      }
    }
    return e;
  }
  get MaxBottomHeight() {
    let e = 0;
    for (const t of this.NodeHeightDeltaMap.values()) {
      if (t[1] > e) {
        e = t[1];
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
    this.ZDd.length = 0;
    this.eUd.length = 0;
    this.$em.length = 0;
    this.SelectedData = undefined;
    if (this.LocatingHelper) {
      this.LocatingHelper.Clear();
      this.LocatingHelper = undefined;
    }
  }
  AddOnSelectedDataChange(e) {
    this.ZDd.push(e);
  }
  RemoveOnSelectedDataChange(e) {
    e = this.ZDd.indexOf(e);
    if (e !== -1) {
      this.ZDd.splice(e, 1);
    }
  }
  SelectData(e) {
    this.SelectedData = e;
    this.tUd();
  }
  AddOnLocatingNode(e) {
    this.eUd.push(e);
  }
  RemoveOnLocatingNode(e) {
    e = this.eUd.indexOf(e);
    if (e !== -1) {
      this.eUd.splice(e, 1);
    }
  }
  LocateToNode(e, t = true) {
    for (const i of this.eUd) {
      i(e, t);
    }
  }
  RecordHeightBalanceValue(e, t, i) {
    this.NodeHeightDeltaMap.set(e, [t, i]);
  }
  RecordToggleHeight(e) {
    if (e > this.MaxToggleHeight) {
      this.MaxToggleHeight = e;
    }
  }
  tUd() {
    for (const e of this.ZDd) {
      e(this.SelectedData);
    }
  }
  AddOnUpdateNode(e) {
    this.$em.push(e);
  }
  RemoveOnUpdateNode(e) {
    e = this.$em.indexOf(e);
    if (e !== -1) {
      this.$em.splice(e, 1);
    }
  }
  NotifyUpdateNode() {
    for (const e of this.$em) {
      e();
    }
  }
}
exports.QuestTreeChapterViewModel = QuestTreeChapterViewModel;
//# sourceMappingURL=QuestTreeChapterViewModel.js.map