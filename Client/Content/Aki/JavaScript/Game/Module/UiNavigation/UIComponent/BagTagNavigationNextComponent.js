"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BagTagNavigationNextComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const NavigationGroupComponent_1 = require("./NavigationGroupComponent");
class BagTagNavigationNextComponent extends NavigationGroupComponent_1.NavigationGroupNextComponent {
  OnRefreshSelfHotKeyState(e) {
    var i = e.GetFocusListener();
    if (i) {
      var i = i.GetNavigationGroup();
      var o = this.GetBindButtonTag();
      let t = undefined;
      t = o ? i.GroupNameMap.Get(o) : i.NextGroupName;
      if (!StringUtils_1.StringUtils.IsEmpty(t) && (o = e.GetNavigationGroupByName(i.NextGroupName))) {
        e = o.DefaultListener;
        this.SetVisibleMode(2, e?.IsScrollOrLayoutActive() ?? false);
      } else {
        this.SetVisibleMode(2, false);
      }
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.BagTagNavigationNextComponent = BagTagNavigationNextComponent;
//# sourceMappingURL=BagTagNavigationNextComponent.js.map