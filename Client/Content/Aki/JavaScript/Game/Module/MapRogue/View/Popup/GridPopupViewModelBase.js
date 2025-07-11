"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPopupViewModelBase = undefined;
class GridPopupViewModelBase {
  constructor(t, i) {
    this.GridData = t;
    this.GameInfo = i;
    this.View = undefined;
    this.IsEnd = false;
    this.MoveButtonFunction = () => {
      if (!this.IsEnd) {
        this.IsEnd = true;
        this.GameInfo.RequestMove(t => {
          if (this.IsEnd = t) {
            this.View?.CloseMeAsync();
          }
        });
      }
    };
  }
  BindView(t) {
    this.View = t;
  }
  EventAvailable() {
    var t = this.GameInfo.MoveState === 0;
    var i = this.GridData.IsUnlock();
    return t && i;
  }
  async Init() {}
  GetSubTxtInfo() {}
  GetBtnDetailFunc() {}
  OnClickedClose() {
    if (!this.IsEnd) {
      this.IsEnd = true;
      this.GameInfo.GameStage = 1;
      this.View?.CloseMeAsync();
    }
  }
  RefreshTop() {}
  RefreshBottom() {}
  RefreshFunctional() {}
  GetGuideUiItemAndUiItemForShowEx(t) {}
}
exports.GridPopupViewModelBase = GridPopupViewModelBase;
//# sourceMappingURL=GridPopupViewModelBase.js.map