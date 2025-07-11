"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextLanguageToggle = exports.TextLanguageSettingView = undefined;
const LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class TextLanguageSettingView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
  CreateToggle(e, t, g) {
    var a = new TextLanguageToggle();
    a.Initialize(e, t, g);
    return a;
  }
  OnRefreshView(e) {
    var t = this.MenuDataIns.OptionsNameList[e.GetIndex()];
    e.SetMainText(t);
  }
  OnSelected(e, t) {
    e.SetSpriteActive(true);
  }
}
exports.TextLanguageSettingView = TextLanguageSettingView;
class TextLanguageToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
  OnStart() {
    super.OnStart();
    this.GetText(2).SetUIActive(false);
  }
  SetSpriteActive(e) {}
}
exports.TextLanguageToggle = TextLanguageToggle;
//# sourceMappingURL=TextLanguageSettingView.js.map