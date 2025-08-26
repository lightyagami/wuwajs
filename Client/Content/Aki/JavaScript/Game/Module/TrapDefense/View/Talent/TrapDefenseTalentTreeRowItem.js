"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTalentTreeRowItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
const TrapDefenseTalentTreeRowLineListItem_1 = require("./TrapDefenseTalentTreeRowLineListItem");
const TrapDefenseTalentTreeRowNodeListItem_1 = require("./TrapDefenseTalentTreeRowNodeListItem");
class TrapDefenseTalentTreeRowItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.XIt = undefined;
    this.wHc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.XIt = new TrapDefenseTalentTreeRowNodeListItem_1.TrapDefenseTalentTreeRowNodeListItem();
    this.wHc = new TrapDefenseTalentTreeRowLineListItem_1.TrapDefenseTalentTreeRowLineListItem();
    var e = [];
    e.push(this.XIt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    e.push(this.wHc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    await Promise.all(e);
  }
  Refresh(e, r, t) {
    this.LHc();
    this.AHc();
    this.PHc();
    for (const h of e.NodeList) {
      this.XIt.GetNodeItem(h.Index)?.SetNodeActive(true);
      this.XIt.GetNodeItem(h.Index)?.Refresh(h);
    }
    var s;
    var i;
    for ([s, i] of ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.LineTypeMap[e.Row].entries()) {
      var n;
      var o;
      var [a, f] = this.DHc(s);
      a.SetUIActive(i === 0);
      f.SetUIActive(i === 1);
      var a = this.wHc.GetDotsByIndexInLineId(s);
      for ([n, o] of a) {
        var T = (0, TrapDefenseDefine_1.lineIndex2NodeIndex)(s);
        if (ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.IsDotVisible(e.Row, T)) {
          if (n.IsUIActiveInHierarchy()) {
            o.SetUIActive(false);
          } else {
            n.SetUIActive(i === 0);
            o.SetUIActive(i === 1);
          }
        } else {
          n.SetUIActive(false);
          o.SetUIActive(false);
        }
      }
    }
  }
  GetKey(e, r) {
    return e.Row;
  }
  LHc() {
    var e = this.wHc.GetAllLines();
    for (const r of e) {
      r.SetUIActive(false);
      if (e.indexOf(r) < (TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW - 2) * 2) {
        r.SetStretchRight(TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_HORIZONTAL_LINE_STRETCH_RIGHT);
      }
    }
    for (const t of this.XIt.GetAllLines()) {
      t.SetUIActive(false);
    }
  }
  AHc() {
    for (let e = 0; e < TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW; e++) {
      this.XIt.GetNodeItem(e)?.SetNodeActive(false);
    }
  }
  PHc() {
    for (const e of this.wHc.GetAllDots()) {
      e.SetUIActive(false);
    }
  }
  DHc(e) {
    return this.wHc.GetLinesByIndexInLineId(e) ?? this.XIt.GetLinesByIndexInLineId(e);
  }
}
exports.TrapDefenseTalentTreeRowItem = TrapDefenseTalentTreeRowItem;
//# sourceMappingURL=TrapDefenseTalentTreeRowItem.js.map