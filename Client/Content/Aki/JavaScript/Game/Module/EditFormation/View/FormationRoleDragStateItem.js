"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationRoleDragStateItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FormationRoleDragStateItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite]];
  }
  GetCanChangeAlpha() {
    return this.GetItem(2).GetAlpha();
  }
  SetBarFill(e) {
    this.GetItem(3).SetUIActive(e > 0);
    this.GetSprite(4).SetFillAmount(e);
  }
}
exports.FormationRoleDragStateItem = FormationRoleDragStateItem;
//# sourceMappingURL=FormationRoleDragStateItem.js.map