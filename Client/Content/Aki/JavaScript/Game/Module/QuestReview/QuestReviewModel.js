"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewModel = undefined;
const QuestReviewEntryAll_1 = require("../../../Core/Define/ConfigQuery/QuestReviewEntryAll");
const QuestReviewEntryById_1 = require("../../../Core/Define/ConfigQuery/QuestReviewEntryById");
const QuestReviewLineById_1 = require("../../../Core/Define/ConfigQuery/QuestReviewLineById");
const QuestReviewNodeById_1 = require("../../../Core/Define/ConfigQuery/QuestReviewNodeById");
const QuestReviewTabById_1 = require("../../../Core/Define/ConfigQuery/QuestReviewTabById");
const QuestReviewTreeById_1 = require("../../../Core/Define/ConfigQuery/QuestReviewTreeById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const QuestReviewEntryData_1 = require("./Data/QuestReviewEntryData");
const QuestReviewLineData_1 = require("./Data/QuestReviewLineData");
const QuestReviewNodeData_1 = require("./Data/QuestReviewNodeData");
const QuestReviewTabData_1 = require("./Data/QuestReviewTabData");
const QuestReviewTreeData_1 = require("./Data/QuestReviewTreeData");
const QuestReviewDefine_1 = require("./QuestReviewDefine");
class QuestReviewModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Vbc = {
      QuestReviewEntryData: QuestReviewEntryById_1.configQuestReviewEntryById,
      QuestReviewLineData: QuestReviewLineById_1.configQuestReviewLineById,
      QuestReviewNodeData: QuestReviewNodeById_1.configQuestReviewNodeById,
      QuestReviewTabData: QuestReviewTabById_1.configQuestReviewTabById,
      QuestReviewTreeData: QuestReviewTreeById_1.configQuestReviewTreeById
    };
    this.NQ = new Map();
    this.wJ1 = new Map();
  }
  OnInit() {
    var e = QuestReviewEntryAll_1.configQuestReviewEntryAll.GetConfigList();
    if (e) {
      for (const t of e) {
        for (const i of t.RelatedQuest) {
          this.wJ1.set(i, t.Id);
        }
      }
    }
    return true;
  }
  OnClear() {
    for (const e of this.NQ.values()) {
      e.clear();
    }
    this.NQ.clear();
    return true;
  }
  Hbc(e, t) {
    if (e) {
      var i;
      var r = this.Vbc[t.name].GetConfig(e, true);
      if (r) {
        if (!this.NQ.has(t.name)) {
          this.NQ.set(t.name, new Map());
        }
        if (!(i = this.NQ.get(t.name)).has(e)) {
          i.set(e, new t(r));
        }
        return i.get(e);
      }
    }
  }
  GetQuestReviewNodeDataById(e) {
    return this.Hbc(e, QuestReviewNodeData_1.QuestReviewNodeData);
  }
  GetQuestReviewTabDataById(e) {
    return this.Hbc(e, QuestReviewTabData_1.QuestReviewTabData);
  }
  GetQuestReviewTreeDataById(e) {
    return this.Hbc(e, QuestReviewTreeData_1.QuestReviewTreeData);
  }
  GetQuestReviewEntryDataById(e) {
    return this.Hbc(e, QuestReviewEntryData_1.QuestReviewEntryData);
  }
  GetQuestReviewLineDataById(e) {
    return this.Hbc(e, QuestReviewLineData_1.QuestReviewLineData);
  }
  GetNodeIdListByQuestLineId(t) {
    t = this.GetQuestReviewLineDataById(t);
    if (t) {
      t = this.GetQuestReviewNodeDataById(t.StartNode);
      if (t) {
        var i = [];
        for (let e = 0; e < QuestReviewDefine_1.MAX_SLOT_PER_ROW; ++e) {
          i.push(0);
        }
        let e = t;
        while (e) {
          i[e.PosIndex] = e.Id;
          var r = this.GetQuestReviewNodeDataById(e.Successor);
          if (r) {
            r.Predecessor = e.Id;
          }
          if (e.IsBranching) {
            break;
          }
          e = r;
        }
        return i;
      }
    }
  }
  IsQuestLineHasAnyVisibleNode(e) {
    if (this.GetQuestReviewLineDataById(e)) {
      e = this.GetNodeIdListByQuestLineId(e);
      if (e) {
        for (const t of e) {
          if (this.IsNodeVisible(t)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  GetSuccessorNodeByNodeId(e) {
    e = this.GetQuestReviewNodeDataById(e);
    if (e) {
      return this.GetQuestReviewNodeDataById(e.Successor);
    }
  }
  GetPredecessorNodeByNodeId(e) {
    e = this.GetQuestReviewNodeDataById(e);
    if (e) {
      return this.GetQuestReviewNodeDataById(e.Predecessor);
    }
  }
  GetQuestEntryDataByQuestId(e) {
    e = this.wJ1.get(e);
    if (e) {
      return this.GetQuestReviewEntryDataById(e);
    }
  }
  TabHasRedDot(e) {
    e = this.GetQuestReviewTabDataById(e);
    if (e) {
      e = this.GetQuestReviewTreeDataById(e.QuestTree);
      if (e) {
        for (const s of e.QuestLines) {
          var t = this.GetQuestReviewLineDataById(s);
          if (t && t.State === 1) {
            for (const a of this.GetNodeIdListByQuestLineId(s) ?? []) {
              var i = this.GetQuestReviewNodeDataById(a);
              var r = this.IsNodeVisible(a);
              if (i && i.HasRedDot && r) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  GetTempLineData() {
    var e = QuestReviewLineById_1.configQuestReviewLineById.GetConfig(1100);
    if (e) {
      (e = new QuestReviewLineData_1.QuestReviewLineData(e)).IsTempLine = true;
      return e;
    }
  }
  IsNodeVisible(e) {
    var t = this.GetQuestReviewNodeDataById(e);
    return !!t && t.State !== 0 && (!!t.ShowOnceUnlock || !(t = this.GetPredecessorNodeByNodeId(e)) || t.State === 3);
  }
  HasQuestLineFused() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewHasFused) ?? false;
  }
  SetQuestLineFused() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewHasFused, true);
  }
  IsFirstEntry() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewMainViewEntryAnim) ?? true;
  }
  UpdateAllQuestReviewEntryData(e) {
    for (const i of e) {
      var t = this.GetQuestReviewEntryDataById(i.qz1);
      if (t) {
        t.UpdateByServerData(i);
      }
    }
  }
  UpdateAllQuestReviewLineData(e) {
    for (const i of e) {
      var t = this.GetQuestReviewLineDataById(i.Bz1);
      if (t) {
        t.UpdateByServerData(i);
      }
    }
  }
  UpdateAllQuestReviewNodeData(e) {
    for (const i of e) {
      var t = this.GetQuestReviewNodeDataById(i.b5n);
      if (t) {
        t.UpdateByServerData(i);
      }
    }
  }
  UpdateAllQuestReviewTabData(e) {
    for (const i of e) {
      var t = this.GetQuestReviewTabDataById(i.mBs);
      if (t) {
        t.UpdateByServerData(i);
      }
    }
  }
}
exports.QuestReviewModel = QuestReviewModel;
//# sourceMappingURL=QuestReviewModel.js.map