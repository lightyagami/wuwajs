"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTalentTreeRowNodeListItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
const TrapDefenseTalentTreeNodeItem_1 = require("./TrapDefenseTalentTreeNodeItem");
class TrapDefenseTalentTreeRowNodeListItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xHc = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    for (let e = 0; e < TrapDefenseDefine_1.MAX_TALENT_NODES_IN_ROW; e++) {
      this.xHc.push(new TrapDefenseTalentTreeNodeItem_1.TrapDefenseTalentTreeNodeItem());
    }
    var n = [];
    for (let e = 0; e < this.xHc.length; e++) {
      n.push(this.xHc[e].CreateThenShowByActorAsync(this.GetItem(e).GetOwner()));
    }
    await Promise.all(n);
  }
  GetNodeItem(e) {
    if (!(e < 0) && !(e >= this.xHc.length)) {
      return this.xHc[e];
    }
  }
  GetAllLines() {
    var e = [];
    for (const n of this.xHc) {
      e.push(...n.GetAllLines());
    }
    return e;
  }
  GetLinesByIndexInLineId(e) {
    if (e < TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_MID_LINE_OFFSET) {
      return this.xHc[e].GetUpLines();
    } else if (e >= TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_BOTTOM_LINE_OFFSET && e < TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_LEFT_LINE_OFFSET) {
      return this.xHc[e - TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_BOTTOM_LINE_OFFSET].GetDownLines();
    } else if (e >= TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_MID_LINE_OFFSET && e < TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_BOTTOM_LINE_OFFSET) {
      return this.xHc[e - TrapDefenseDefine_1.TRAP_DEFENSE_TALENT_TREE_MID_LINE_OFFSET].GetMidLines();
    } else {
      return undefined;
    }
  }
}
exports.TrapDefenseTalentTreeRowNodeListItem = TrapDefenseTalentTreeRowNodeListItem;
//# sourceMappingURL=TrapDefenseTalentTreeRowNodeListItem.js.map