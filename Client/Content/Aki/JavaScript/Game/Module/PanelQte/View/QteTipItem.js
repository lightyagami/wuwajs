"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QteTipItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class QteTipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.WOi = "";
  }
  Init(e) {
    this.CreateThenShowByResourceIdAsync("UiItem_QteTips", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    if (this.WOi) {
      this.Refresh(this.WOi);
    }
  }
  Refresh(e) {
    this.WOi = e;
    if (!this.InAsyncLoading()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
    }
  }
}
exports.QteTipItem = QteTipItem;
//# sourceMappingURL=QteTipItem.js.map