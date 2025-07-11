"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopBuffItem = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisibleStateUtil_1 = require("../../VisibleStateUtil");
class TopBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.InnerVisibleState = 0;
  }
  SetActive(e) {
    if (this.GetVisible() !== e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "不要直接调用SetActive, 请调用SetVisible");
      }
    } else {
      super.SetActive(e);
    }
  }
  SetVisible(e, t) {
    var i = this.GetVisible();
    this.rJe(e, t);
    var e = this.GetVisible();
    if (i !== e) {
      this.SetActive(e);
    }
  }
  rJe(e, t) {
    this.InnerVisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.InnerVisibleState, t, e);
  }
  GetVisible() {
    return this.InnerVisibleState === 0;
  }
}
exports.TopBuffItem = TopBuffItem;
//# sourceMappingURL=TopBuffItem.js.map