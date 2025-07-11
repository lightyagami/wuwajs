"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankTimeItemModelBase = undefined;
class RankTimeItemModelBase {
  constructor() {
    this.InstanceId = 0;
    this.ButtonClick = () => {
      this.OnButtonClick();
    };
  }
  RefreshInstance(e) {
    this.InstanceId = e;
  }
  GetContent() {
    return this.OnGetContent();
  }
}
exports.RankTimeItemModelBase = RankTimeItemModelBase;
//# sourceMappingURL=RankTimeItemModel.js.map