"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationTrialItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FormationTrialItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.fht = undefined;
    this.CreateThenShowByResourceIdAsync("UiItem_FigthRoleHeadTest", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    if (this.fht) {
      this.GetText(0).SetText(this.fht);
    }
    this.fht = undefined;
  }
  SetNameText(e) {
    if (this.InAsyncLoading()) {
      this.fht = e;
    } else {
      this.GetText(0).SetText(e);
    }
  }
}
exports.FormationTrialItem = FormationTrialItem;
//# sourceMappingURL=FormationTrialItem.js.map