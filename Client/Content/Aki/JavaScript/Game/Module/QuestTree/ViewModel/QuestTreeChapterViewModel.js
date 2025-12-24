"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeChapterViewModel = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const QuestTreeNodeLocatingHelper_1 = require("../View/ChapterView/QuestTreeNodeLocatingHelper");
class QuestTreeChapterViewModel {
  constructor() {
    this.l_m = false;
    this.ZDd = [];
    this.eUd = [];
    this.Orm = [];
    this.MaxToggleHeight = 0;
    this.SelectedData = undefined;
    this.LocatingHelper = undefined;
    this.NodeHeightDeltaMap = new Map();
    this.View = undefined;
  }
  get OverrideLockReasonGoto() {
    return !!this.View && this.l_m;
  }
  SetOverrideLockReasonGoto(e) {
    this.l_m = e;
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
    this.Orm.length = 0;
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
    this.Orm.push(e);
  }
  RemoveOnUpdateNode(e) {
    e = this.Orm.indexOf(e);
    if (e !== -1) {
      this.Orm.splice(e, 1);
    }
  }
  NotifyUpdateNode() {
    for (const e of this.Orm) {
      e();
    }
  }
  async RefreshViewByData(e, t = true) {
    if (this.View && (t && (await ControllerHolder_1.ControllerHolder.BlackScreenController.AddBlackScreenAsync("Start", "QuestTreeViewRefresh")), await this.View.RefreshByData(e), t)) {
      await TimerSystem_1.TimerSystem.Wait(500);
      ControllerHolder_1.ControllerHolder.BlackScreenController.RemoveBlackScreen("Close", "QuestTreeViewRefresh");
    }
  }
}
exports.QuestTreeChapterViewModel = QuestTreeChapterViewModel;
//# sourceMappingURL=QuestTreeChapterViewModel.js.map