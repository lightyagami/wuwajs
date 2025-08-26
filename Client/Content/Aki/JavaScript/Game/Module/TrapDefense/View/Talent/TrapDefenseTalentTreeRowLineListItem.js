"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTalentTreeRowLineListItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
class TrapDefenseTalentTreeRowLineListItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem]];
  }
  GetDotByIndex(e) {
    var n;
    if (!(e < 0) && !(e >= TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW)) {
      n = this.GetItem(e);
      return [this.GetItem(TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW + e), n];
    }
  }
  GetLinesByIndexInLineId(e) {
    var n;
    var e = e - TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_LEFT_LINE_OFFSET;
    if (!(e < 0) && !(e >= TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW - 1)) {
      n = this.GetItem(TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW * 2 + e);
      return [this.GetItem(TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW * 2 + TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW - 1 + e), n];
    }
  }
  GetAllLines() {
    var n = [];
    for (let e = 0; e < TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW - 1; e++) {
      var r = this.GetItem(TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW * 2 + e);
      var s = this.GetItem(TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW * 2 + TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW - 1 + e);
      n.push(r, s);
    }
    return n;
  }
  GetAllDots() {
    var n = [];
    for (let e = 0; e < TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW; e++) {
      var [r, s] = this.GetDotByIndex(e);
      n.push(r, s);
    }
    return n;
  }
  GetDotsByIndexInLineId(e) {
    var n = [];
    var r = (0, TrapDefenseDefine_1.lineIndex2NodeIndex)(e);
    if (r !== e && (n.push(this.GetDotByIndex(r)), e >= TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_LEFT_LINE_OFFSET)) {
      n.push(this.GetDotByIndex(r + 1));
    }
    return n;
  }
}
exports.TrapDefenseTalentTreeRowLineListItem = TrapDefenseTalentTreeRowLineListItem;
//# sourceMappingURL=TrapDefenseTalentTreeRowLineListItem.js.map