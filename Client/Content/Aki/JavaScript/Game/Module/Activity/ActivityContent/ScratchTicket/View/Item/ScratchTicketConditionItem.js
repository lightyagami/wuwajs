"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScratchTicketConditionItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class ScratchTicketConditionItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(t, e, r) {
    this.GetItem(0).SetUIActive(t.IsFinish());
    this.GetText(1).SetText(t.GetConditionDesc());
    this.GetText(2).SetText(t.GetConditionTypeName());
  }
}
exports.ScratchTicketConditionItem = ScratchTicketConditionItem;
//# sourceMappingURL=ScratchTicketConditionItem.js.map