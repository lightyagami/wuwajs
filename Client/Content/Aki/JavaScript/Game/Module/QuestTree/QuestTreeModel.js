"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const QuestTreeChapterData_1 = require("./Data/QuestTreeChapterData");
const QuestTreeNodeData_1 = require("./Data/QuestTreeNodeData");
const QuestTreeChapterViewModel_1 = require("./ViewModel/QuestTreeChapterViewModel");
const QuestTreeMainViewModel_1 = require("./ViewModel/QuestTreeMainViewModel");
class QuestTreeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.byd = new Map();
    this.ViewModelMain = QuestTreeMainViewModel_1.QuestTreeMainViewModel.Create();
    this.ViewModelChapter = QuestTreeChapterViewModel_1.QuestTreeChapterViewModel.Create();
    this.xGd = undefined;
  }
  OnInit() {
    for (const t of ConfigManager_1.ConfigManager.QuestTreeConfig.GetAllChapters()) {
      var e = QuestTreeChapterData_1.QuestTreeChapterData.Create(t);
      this.byd.set(e.Id, e);
    }
    return true;
  }
  OnClear() {
    for (const e of this.byd.values()) {
      e.Clear();
    }
    this.byd.clear();
    this.ViewModelMain.Clear();
    return true;
  }
  GetChapterDataById(e) {
    return this.byd.get(e);
  }
  GetAllChapterData() {
    return Array.from(this.byd.values());
  }
  GetVisibleChapterDataList() {
    var e = [];
    var t = this.GetAllChapterData();
    let r = 0;
    let a = t.length - 1;
    while (a >= 0) {
      if (t[a].IsUnlock) {
        break;
      }
      a--;
    }
    while (r < t.length && r <= a + 1) {
      var o = t[r];
      e.push(o);
      r++;
    }
    return e;
  }
  GetAllAcceptableNodeList() {
    var e = [];
    for (const t of this.byd.values()) {
      for (const r of t.GetAcceptableNodeList()) {
        e.push(r);
      }
    }
    return e;
  }
  GetCurTrackingChapterData() {
    for (const e of this.byd.values()) {
      if (e.IsTracking) {
        return e;
      }
    }
  }
  GetOrCreateDummyQuestTreeNodeData(e) {
    this.xGd ||= QuestTreeNodeData_1.QuestTreeNodeData.CreateDummyNode(e);
    return this.xGd;
  }
  GetNodeDataFromQuestId(e) {
    for (const t of this.byd.values()) {
      for (const r of t.NodeMap.values()) {
        if (r.Config.NodeType !== 3 && r.Config.QuestArray.includes(e)) {
          return r;
        }
      }
    }
  }
  GetNodeDataFromNodeId(e) {
    for (const r of this.byd.values()) {
      var t = r.NodeMap.get(e);
      if (t) {
        return t;
      }
    }
  }
}
exports.QuestTreeModel = QuestTreeModel;
//# sourceMappingURL=QuestTreeModel.js.map