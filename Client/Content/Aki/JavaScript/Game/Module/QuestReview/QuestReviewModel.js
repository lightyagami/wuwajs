"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewModel = void 0;
const QuestReviewEntryAll_1 = require("../../../Core/Define/ConfigQuery/QuestReviewEntryAll"),
  QuestReviewEntryById_1 = require("../../../Core/Define/ConfigQuery/QuestReviewEntryById"),
  QuestReviewLineById_1 = require("../../../Core/Define/ConfigQuery/QuestReviewLineById"),
  QuestReviewNodeById_1 = require("../../../Core/Define/ConfigQuery/QuestReviewNodeById"),
  QuestReviewTabById_1 = require("../../../Core/Define/ConfigQuery/QuestReviewTabById"),
  QuestReviewTreeById_1 = require("../../../Core/Define/ConfigQuery/QuestReviewTreeById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  QuestReviewEntryData_1 = require("./Data/QuestReviewEntryData"),
  QuestReviewLineData_1 = require("./Data/QuestReviewLineData"),
  QuestReviewNodeData_1 = require("./Data/QuestReviewNodeData"),
  QuestReviewTabData_1 = require("./Data/QuestReviewTabData"),
  QuestReviewTreeData_1 = require("./Data/QuestReviewTreeData"),
  QuestReviewDefine_1 = require("./QuestReviewDefine");
class QuestReviewModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.Vbc = {
      QuestReviewEntryData: QuestReviewEntryById_1.configQuestReviewEntryById,
      QuestReviewLineData: QuestReviewLineById_1.configQuestReviewLineById,
      QuestReviewNodeData: QuestReviewNodeById_1.configQuestReviewNodeById,
      QuestReviewTabData: QuestReviewTabById_1.configQuestReviewTabById,
      QuestReviewTreeData: QuestReviewTreeById_1.configQuestReviewTreeById
    }, this.NQ = new Map, this.Oz1 = new Map
  }
  OnInit() {
    var e = QuestReviewEntryAll_1.configQuestReviewEntryAll.GetConfigList();
    if (e)
      for (const t of e)
        for (const i of t.RelatedQuest) this.Oz1.set(i, t.Id);
    return !0
  }
  OnClear() {
    for (const e of this.NQ.values()) e.clear();
    return this.NQ.clear(), !0
  }
  Hbc(e, t) {
    if (e) {
      var i, r = this.Vbc[t.name].GetConfig(e, !0);
      if (r) return this.NQ.has(t.name) || this.NQ.set(t.name, new Map), (i = this.NQ.get(t.name)).has(e) || i.set(e, new t(r)), i.get(e)
    }
  }
  GetQuestReviewNodeDataById(e) {
    return this.Hbc(e, QuestReviewNodeData_1.QuestReviewNodeData)
  }
  GetQuestReviewTabDataById(e) {
    return this.Hbc(e, QuestReviewTabData_1.QuestReviewTabData)
  }
  GetQuestReviewTreeDataById(e) {
    return this.Hbc(e, QuestReviewTreeData_1.QuestReviewTreeData)
  }
  GetQuestReviewEntryDataById(e) {
    return this.Hbc(e, QuestReviewEntryData_1.QuestReviewEntryData)
  }
  GetQuestReviewLineDataById(e) {
    return this.Hbc(e, QuestReviewLineData_1.QuestReviewLineData)
  }
  GetNodeIdListByQuestLineId(t) {
    t = this.GetQuestReviewLineDataById(t);
    if (t) {
      t = this.GetQuestReviewNodeDataById(t.StartNode);
      if (t) {
        var i = [];
        for (let e = 0; e < QuestReviewDefine_1.MAX_SLOT_PER_ROW; ++e) i.push(0);
        let e = t;
        for (; e;) {
          i[e.PosIndex] = e.Id;
          var r = this.GetQuestReviewNodeDataById(e.Successor);
          if (r && (r.Predecessor = e.Id), e.IsBranching) break;
          e = r
        }
        return i
      }
    }
  }
  IsQuestLineHasAnyVisibleNode(e) {
    if (this.GetQuestReviewLineDataById(e)) {
      e = this.GetNodeIdListByQuestLineId(e);
      if (e)
        for (const t of e)
          if (this.IsNodeVisible(t)) return !0
    }
    return !1
  }
  GetSuccessorNodeByNodeId(e) {
    e = this.GetQuestReviewNodeDataById(e);
    if (e) return this.GetQuestReviewNodeDataById(e.Successor)
  }
  GetPredecessorNodeByNodeId(e) {
    e = this.GetQuestReviewNodeDataById(e);
    if (e) return this.GetQuestReviewNodeDataById(e.Predecessor)
  }
  GetQuestEntryDataByQuestId(e) {
    e = this.Oz1.get(e);
    if (e) return this.GetQuestReviewEntryDataById(e)
  }
  TabHasRedDot(e) {
    e = this.GetQuestReviewTabDataById(e);
    if (e) {
      e = this.GetQuestReviewTreeDataById(e.QuestTree);
      if (e)
        for (const s of e.QuestLines) {
          var t = this.GetQuestReviewLineDataById(s);
          if (t && 1 === t.State)
            for (const a of this.GetNodeIdListByQuestLineId(s) ?? []) {
              var i = this.GetQuestReviewNodeDataById(a),
                r = this.IsNodeVisible(a);
              if (i && i.HasRedDot && r) return !0
            }
        }
    }
    return !1
  }
  GetTempLineData() {
    var e = QuestReviewLineById_1.configQuestReviewLineById.GetConfig(1100);
    if (e) return (e = new QuestReviewLineData_1.QuestReviewLineData(e)).IsTempLine = !0, e
  }
  IsNodeVisible(e) {
    var t = this.GetQuestReviewNodeDataById(e);
    return !(!t || 0 === t.State || !t.ShowOnceUnlock && (t = this.GetPredecessorNodeByNodeId(e)) && 3 !== t.State)
  }
  HasQuestLineFused() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewHasFused) ?? !1
  }
  SetQuestLineFused() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewHasFused, !0)
  }
  IsFirstEntry() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewMainViewEntryAnim) ?? !0
  }
  UpdateAllQuestReviewEntryData(e) {
    for (const i of e) {
      var t = this.GetQuestReviewEntryDataById(i.$Y1);
      t && t.UpdateByServerData(i)
    }
  }
  UpdateAllQuestReviewLineData(e) {
    for (const i of e) {
      var t = this.GetQuestReviewLineDataById(i.VY1);
      t && t.UpdateByServerData(i)
    }
  }
  UpdateAllQuestReviewNodeData(e) {
    for (const i of e) {
      var t = this.GetQuestReviewNodeDataById(i.b5n);
      t && t.UpdateByServerData(i)
    }
  }
  UpdateAllQuestReviewTabData(e) {
    for (const i of e) {
      var t = this.GetQuestReviewTabDataById(i.mBs);
      t && t.UpdateByServerData(i)
    }
  }
}
exports.QuestReviewModel = QuestReviewModel;
//# sourceMappingURL=QuestReviewModel.js.map