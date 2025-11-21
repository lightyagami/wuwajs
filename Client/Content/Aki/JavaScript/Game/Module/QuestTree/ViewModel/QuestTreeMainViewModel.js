"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeMainViewModel = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const QuestTreeDefine_1 = require("../QuestTreeDefine");
const QuestTreeNodeLocatingHelper_1 = require("../View/ChapterView/QuestTreeNodeLocatingHelper");
class QuestTreeMainViewModel {
  constructor() {
    this.LocatingHelper = undefined;
    this.ShouldLocateToDefaultNode = true;
    this.eUd = [];
  }
  static Create() {
    return new QuestTreeMainViewModel();
  }
  InitLocatingHelper(e) {
    this.LocatingHelper ||= new QuestTreeNodeLocatingHelper_1.QuestTreeNodeLocatingHelper(e);
  }
  OnViewClose() {
    this.Clear();
  }
  Clear() {
    this.eUd.length = 0;
    if (this.LocatingHelper) {
      this.LocatingHelper.Clear();
      this.LocatingHelper = undefined;
    }
  }
  GetViewDataList() {
    var t = [];
    var i = ModelManager_1.ModelManager.QuestTreeModel.GetVisibleChapterDataList();
    for (let e = 0; e < i.length; e += QuestTreeDefine_1.QUEST_TREE_VIEW_CHAPTER_GROUP_LENGTH) {
      var r = i.slice(e, e + QuestTreeDefine_1.QUEST_TREE_VIEW_CHAPTER_GROUP_LENGTH);
      t.push(r);
    }
    return t;
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
  LocateNode(e, t = true) {
    for (const i of this.eUd) {
      i(e, t);
    }
  }
  GetDefaultLocatingNode() {
    var e = ModelManager_1.ModelManager.QuestTreeModel.GetVisibleChapterDataList();
    let t = undefined;
    for (const i of e) {
      if (i.IsTracking) {
        return i;
      }
      if (i.IsUnlock) {
        t = i;
      }
    }
    return t ?? e[e.length - 1];
  }
  SetShouldLocateToDefaultNode(e) {
    this.ShouldLocateToDefaultNode = e;
  }
}
exports.QuestTreeMainViewModel = QuestTreeMainViewModel;
//# sourceMappingURL=QuestTreeMainViewModel.js.map