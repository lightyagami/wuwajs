"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevSelectionMediumItemGrid = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RoleDevSelectionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.dFe = 0;
  }
  OnRefresh(e, t, i) {
    var o;
    this.dFe = e.Id;
    if (e.TypeTag === 0) {
      o = {
        Type: 5,
        Data: e,
        BottomText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name),
        RoleDevTag: e.TypeTag
      };
      this.Apply(o);
    } else {
      o = {
        Type: 2,
        Data: e,
        ItemConfigId: e.Id,
        SkinId: e.SkinId,
        BottomText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name),
        IsInTeam: false,
        ElementId: e.ElementId,
        IsTrialRoleVisible: e.IsTrial,
        RoleDevTag: e.TypeTag
      };
      this.Apply(o);
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