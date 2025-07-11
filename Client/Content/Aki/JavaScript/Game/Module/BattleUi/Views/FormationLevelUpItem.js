"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationLevelUpItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FormationLevelUpItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.LevelHandle = undefined;
    this.CreateThenShowByResourceIdAsync("UiItem_FormationLevelUpItem", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    if (this.LevelHandle) {
      this.GetText(0).SetText(this.LevelHandle);
    }
    this.LevelHandle = undefined;
  }
  SetLevelText(e) {
    if (this.InAsyncLoading()) {
      this.LevelHandle = e;
    } else {
      this.GetText(0).SetText(e);
    }
  }
}
exports.FormationLevelUpItem = FormationLevelUpItem;
//# sourceMappingURL=FormationLevelUpItem.js.map