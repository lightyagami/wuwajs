"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPopupViewModelBlank = undefined;
const GridPopupViewModelBase_1 = require("./GridPopupViewModelBase");
class GridPopupViewModelBlank extends GridPopupViewModelBase_1.GridPopupViewModelBase {
  constructor() {
    super(...arguments);
    this.Button = undefined;
    this.HasBtnDetail = false;
    this.Gke = () => {
      if (!this.IsEnd) {
        this.IsEnd = true;
        this.GameInfo.RequestMove();
        this.View?.CloseMeAsync();
      }
    };
  }
  async Init() {
    this.Button = await this.View.InitComponentButton();
  }
  RefreshFunctional() {
    var s = this.GameInfo.MoveState === 0;
    this.Button.SetUiActive(s);
    if (s) {
      this.Button.SetButtonTextByTextId("RogueRes_Block_Move");
      this.Button.SetButtonFunction(this.Gke);
    }
  }
}
exports.GridPopupViewModelBlank = GridPopupViewModelBlank;
//# sourceMappingURL=GridPopupViewModelBlank.js.map