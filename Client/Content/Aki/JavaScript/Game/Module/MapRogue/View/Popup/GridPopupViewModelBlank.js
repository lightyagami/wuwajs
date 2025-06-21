"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GridPopupViewModelBlank = void 0;
const GridPopupViewModelBase_1 = require("./GridPopupViewModelBase");
class GridPopupViewModelBlank extends GridPopupViewModelBase_1.GridPopupViewModelBase {
  constructor() {
    super(...arguments), this.Button = void 0, this.HasBtnDetail = !1, this.Gke = () => {
      this.IsEnd || (this.IsEnd = !0, this.GameInfo.RequestMove(), this.View?.CloseMeAsync())
    }
  }
  async Init() {
    this.Button = await this.View.InitComponentButton()
  }
  RefreshFunctional() {
    var s = 0 === this.GameInfo.MoveState;
    this.Button.SetUiActive(s), s && (this.Button.SetButtonTextByTextId("RogueRes_Block_Move"), this.Button.SetButtonFunction(this.Gke))
  }
}
exports.GridPopupViewModelBlank = GridPopupViewModelBlank;
//# sourceMappingURL=GridPopupViewModelBlank.js.map