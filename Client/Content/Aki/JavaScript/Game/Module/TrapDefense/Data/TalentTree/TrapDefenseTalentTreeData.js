"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTalentTreeData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
const TrapDefenseTalentTreeNodeData_1 = require("./TrapDefenseTalentTreeNodeData");
const TrapDefenseTalentTreeRowData_1 = require("./TrapDefenseTalentTreeRowData");
class TrapDefenseTalentTreeData {
  constructor() {
    this.LOe = 0;
    this.MaxRow = 0;
    this.RemainPoints = 0;
    this.MaxPoints = 0;
    this.NodeRowMap = new Map();
    this.NodeIdMap = new Map();
    this.RowDataList = [];
    this.LineTypeMap = [];
  }
  static Create(e) {
    var t = new TrapDefenseTalentTreeData();
    t.LOe = e;
    t.AU();
    return t;
  }
  SetRemainPoints(e) {
    this.RemainPoints = e;
  }
  SetMaxPoints(e) {
    this.MaxPoints = e;
  }
  AU() {
    this.RowDataList = [];
    const e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseTalentTreeConfigByActivityId(this.LOe);
    for (const r of e) {
      var t = TrapDefenseTalentTreeNodeData_1.TrapDefenseTalentTreeNodeData.Create(r);
      if (!this.NodeRowMap.has(t.Row)) {
        this.NodeRowMap.set(t.Row, []);
      }
      this.NodeRowMap.get(t.Row).push(t);
      this.NodeIdMap.set(t.Id, t);
      this.MaxRow = Math.max(this.MaxRow, t.Row);
    }
    this.RefreshLineTypeMap();
    for (const [s, e] of this.NodeRowMap.entries()) {
      e.sort((e, t) => e.Index - t.Index);
      this.RowDataList.push(TrapDefenseTalentTreeRowData_1.TrapDefenseTalentTreeRowData.Create(s, e));
    }
    this.RowDataList.sort((e, t) => e.Row - t.Row);
  }
  GetNodeDataListByRow(e) {
    return this.NodeRowMap.get(e) ?? [];
  }
  CanNodeUnlock(e) {
    if (e.IsUnlock) {
      return false;
    }
    e = this.GetPreNodesByNodeData(e);
    if (e.length !== 0) {
      for (const t of e) {
        if (!t.IsUnlock) {
          return false;
        }
      }
    }
    return true;
  }
  CanNodeAfford(e) {
    e = e.GetCostData();
    return e.length === 0 || e[0].Count >= e[0].Cost;
  }
  HasAnyNodeCanUnlockAndAfford() {
    for (const e of this.NodeRowMap.values()) {
      for (const t of e) {
        if (this.CanNodeUnlock(t) && this.CanNodeAfford(t)) {
          return true;
        }
      }
    }
    return false;
  }
  GetPreNodesByNodeData(e) {
    var t = [];
    for (const s of e.Config.PreNode) {
      var r = this.NodeIdMap.get(s);
      if (r) {
        t.push(r);
      }
    }
    return t;
  }
  GetDefaultSelectNode() {
    let t = undefined;
    let r = undefined;
    var e = this.NodeRowMap.get(this.MaxRow);
    var e = e[e.length - 1];
    for (let e = 1; e <= this.MaxRow; e++) {
      for (const s of this.NodeRowMap.get(e) ?? []) {
        if (this.CanNodeUnlock(s) && this.CanNodeAfford(s) && !t) {
          t = s;
        }
        if ((!this.CanNodeUnlock(s) || !this.CanNodeAfford(s)) && !r && !s.IsUnlock) {
          r = s;
        }
      }
    }
    return t ?? r ?? e;
  }
  GetDefaultSelectNodeByFuncType(t) {
    let r = undefined;
    let s = undefined;
    let i = undefined;
    for (let e = 1; e <= this.MaxRow; e++) {
      for (const n of this.NodeRowMap.get(e) ?? []) {
        if (n.Config.FuncType === t) {
          r = r || n;
          if (this.CanNodeUnlock(n) && this.CanNodeAfford(n) && !s) {
            s = n;
          }
          if ((!this.CanNodeUnlock(n) || !this.CanNodeAfford(n)) && !n.IsUnlock) {
            i = i || n;
          }
        }
      }
    }
    return s ?? i ?? r ?? undefined;
  }
  IsDotVisible(e, t) {
    for (const r of this.NodeRowMap.get(e) ?? []) {
      if (r.Index === t) {
        return true;
      }
    }
    for (const s of this.NodeRowMap.get(e + 1) ?? []) {
      if (s.Index === t) {
        return true;
      }
    }
    return false;
  }
  gT(t, r) {
    var s = [];
    for (let e = t.Row + 1; e < r.Row; e++) {
      s.push([e, r.Index + TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_MID_LINE_OFFSET]);
    }
    s.push([t.Row, t.Index + TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_BOTTOM_LINE_OFFSET]);
    s.push([r.Row, r.Index + TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_TOP_LINE_OFFSET]);
    var i = Math.max(t.Index, r.Index);
    for (let e = Math.min(t.Index, r.Index); e < i; e++) {
      s.push([t.Row, e + TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_LEFT_LINE_OFFSET]);
    }
    return s;
  }
  M9c(e, t) {
    if (e.IsUnlock && t.IsUnlock) {
      return 0;
    } else {
      return 1;
    }
  }
  RefreshLineTypeMap() {
    this.LineTypeMap.forEach(e => {
      e.clear();
    });
    for (const r of this.NodeRowMap.keys()) {
      for (const s of this.NodeRowMap.get(r) ?? []) {
        for (const i of this.GetPreNodesByNodeData(s)) {
          var e = this.gT(i, s);
          var t = this.M9c(i, s);
          for (const n of e) {
            this.LineTypeMap[n[0]] ||= new Map();
            if (!this.LineTypeMap[n[0]].has(n[1]) || this.LineTypeMap[n[0]].get(n[1]) !== 0) {
              this.LineTypeMap[n[0]].set(n[1], t);
            }
          }
        }
      }
    }
  }
}
exports.TrapDefenseTalentTreeData = TrapDefenseTalentTreeData;
//# sourceMappingURL=TrapDefenseTalentTreeData.js.map