"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeTabViewBase = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
class AdvanceNoticeTabViewBase extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.ViewModel = undefined;
  }
  OnBeforeCreate() {
    this.ViewModel = this.Params;
  }
  OnBeforeShow() {
    this.UiViewSequence?.PlayOrReplaySequenceByName("Start");
    this.RefreshView();
  }
  SetTextureWithPath(e, t) {
    var i = StringUtils_1.StringUtils.IsBlank(t);
    e.SetUIActive(!i);
    if (!i) {
      this.SetTextureByPath(t, e);
    }
  }
  OnSwitchSubTab(e) {
    this.UiViewSequence?.PlayOrReplaySequenceByName("Start");
    this.RefreshView();
  }
}
exports.AdvanceNoticeTabViewBase = AdvanceNoticeTabViewBase;
//# sourceMappingURL=AdvanceNoticeTabViewBase.js.map