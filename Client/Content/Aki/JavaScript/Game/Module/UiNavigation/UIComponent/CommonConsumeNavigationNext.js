"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonConsumeNavigationNext = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class CommonConsumeNavigationNext extends HotKeyComponent_1.HotKeyComponent {
  OnRelease(e) {
    UiNavigationNewController_1.UiNavigationNewController.HandleCommonConsumeNavigation(e.BindButtonTag);
  }
  OnRefreshSelfHotKeyState(t) {
    var o = t.GetFocusListener();
    if (o) {
      var o = o.GetNavigationGroup();
      var i = this.GetBindButtonTag();
      let e = undefined;
      e = i ? o.GroupNameMap.Get(i) : o.NextGroupName;
      if (!StringUtils_1.StringUtils.IsEmpty(e) && (i = t.GetActiveNavigationGroupByNameCheckAll(e))) {
        o = i.ActiveListenerList.length > 0;
        this.SetVisibleMode(2, o);
      } else {
        this.SetVisibleMode(2, false);
      }
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.CommonConsumeNavigationNext = CommonConsumeNavigationNext;
//# sourceMappingURL=CommonConsumeNavigationNext.js.map