"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevSelectionMediumItemGrid = undefined;
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RoleDevSelectionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.dFe = 0;
  }
  OnRefresh(e, t, o) {
    var i;
    this.dFe = e.Id;
    if (e.TypeTag === 0) {
      i = {
        Type: 5,
        Data: e,
        BottomText: e.Name,
        RoleDevTag: e.TypeTag
      };
      this.Apply(i);
    } else {
      i = {
        Type: 2,
        Data: e,
        ItemConfigId: e.Id,
        SkinId: e.SkinId,
        BottomText: e.Name,
        IsInTeam: false,
        ElementId: e.ElementId,
        IsTrialRoleVisible: e.IsTrial,
        RoleDevTag: e.TypeTag
      };
      this.Apply(i);
    }
    this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  GetKey() {
    return this.dFe;
  }
}
exports.RoleDevSelectionMediumItemGrid = RoleDevSelectionMediumItemGrid;
//# sourceMappingURL=RoleDevSelectionMediumItemGrid.js.map