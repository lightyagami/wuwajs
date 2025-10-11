"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeChapterData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const QuestTreeNodeData_1 = require("./QuestTreeNodeData");
class QuestTreeChapterData {
  constructor() {
    this.Id = 0;
    this.Config = undefined;
    this.NodeMap = new Map();
  }
  get IsUnlock() {
    return Array.from(this.NodeMap.values()).some(e => e.State > 1);
  }
  get IsTracking() {
    for (const e of this.NodeMap.values()) {
      if (e.IsTracking) {
        return true;
      }
    }
    return false;
  }
  get HasAvailableQuest() {
    for (const e of this.NodeMap.values()) {
      if (e.State === 2) {
        return true;
      }
    }
    return false;
  }
  get Progress() {
    let e = 0;
    let r = this.NodeMap.size;
    for (const t of this.NodeMap.values()) {
      if (t.State === 4 && t.Config.NodeType !== 3) {
        e++;
      }
      if (t.Config.NodeType === 3 || t.IsMoonChasingQuest() && t.State === 0) {
        r--;
      }
    }
    return [e, r];
  }
  get Image() {
    if (this.IsUnlock) {
      return this.Config.Image;
    } else if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0) {
      return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_QuestTree_Chapter_Nv_Small");
    } else {
      return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_QuestTree_Chapter_Nan_Small");
    }
  }
  static Create(e) {
    var r = new QuestTreeChapterData();
    r.Config = e;
    r.Id = e.Id;
    var e = ConfigManager_1.ConfigManager.QuestTreeConfig.GetNodeListByChapterId(e.Id);
    for (const o of e) {
      var t = QuestTreeNodeData_1.QuestTreeNodeData.Create(o);
      r.NodeMap.set(t.Id, t);
    }
    for (const a of r.NodeMap.values()) {
      for (const s of a.Config.IncludeNodes) {
        r.NodeMap.get(s)?.SetBelongedNode(a);
      }
    }
    return r;
  }
  Clear() {
    for (const e of this.NodeMap.values()) {
      e.Clear();
    }
    this.NodeMap.clear();
  }
  GetAvailableNodeList() {
    var e = [];
    for (const r of this.NodeMap.values()) {
      if (r.State === 2) {
        e.push(r);
      }
    }
    return e;
  }
  GetMainNodeList() {
    var r = [];
    let t = undefined;
    for (const e of this.NodeMap.values()) {
      if (e.Config.QuestType === 1 && e.State !== 0 && e.PreQuestNodes.length === 0) {
        t = e;
        break;
      }
    }
    if (t) {
      r.push(t);
      let e = t.NextQuestNode;
      while (e && e.State !== 0) {
        r.push(e);
        e = e.NextQuestNode;
      }
      var o = r[r.length - 1];
      if (!o.Config.IsChapterEnding && o.State === 4) {
        r.push(ModelManager_1.ModelManager.QuestTreeModel.GetOrCreateDummyQuestTreeNodeData(o.Config));
      }
    }
    return r;
  }
  GetNoParentNodeGroupList() {
    var e;
    var r = new Map();
    for (const o of this.NodeMap.values()) {
      if (o.Config.QuestType !== 1 && !o.BelongedNode && !(o.PreQuestNodes.length > 0) && !(o.Config.SortOrder <= 0)) {
        e = o.Config.NextNode;
        if (!r.has(e)) {
          r.set(e, []);
        }
        r.get(e).push(o);
      }
    }
    for (const a of r.values()) {
      a.sort((e, r) => e.Config.SortOrder - r.Config.SortOrder);
    }
    var t = [];
    for (const s of Array.from(r.keys()).sort((e, r) => (this.NodeMap.get(e)?.Config.SortOrder ?? 0) - (this.NodeMap.get(r)?.Config.SortOrder ?? 0))) {
      t.push(r.get(s));
    }
    return t;
  }
  GetDefaultLocatingNode() {
    for (const r of this.NodeMap.values()) {
      if (r.IsTracking) {
        return r;
      }
    }
    var e = this.GetMainNodeList();
    return e[e.length - 1] ?? undefined;
  }
  GetAcceptableNodeList() {
    var e = [];
    for (const r of this.NodeMap.values()) {
      if (r.State === 2) {
        e.push(r);
      }
    }
    return e;
  }
  GetCurTrackingNode() {
    for (const e of this.NodeMap.values()) {
      if (e.IsTracking) {
        return e;
      }
    }
  }
}
exports.QuestTreeChapterData = QuestTreeChapterData;
//# sourceMappingURL=QuestTreeChapterData.js.map