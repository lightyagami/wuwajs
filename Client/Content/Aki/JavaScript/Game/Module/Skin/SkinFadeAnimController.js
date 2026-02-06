"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinFadeAnimController = undefined;
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
const fadeCurveMap = new Map([[0, new Map([[1, [0, "WeaponSkinRoleFadeInCurve"]], [2, [0, "FlySkinRoleFadeInCurve"]], [3, [0, "TerminalSkinRoleFadeInCurve"]]])], [1, new Map([[0, [1, "WeaponSkinRoleFadeOutCurve"]]])], [2, new Map([[0, [1, "FlySkinRoleFadeOutCurve"]]])], [3, new Map([[0, [1, "TerminalSkinRoleFadeOutCurve"]]])]]);
class SkinFadeAnimController {
  constructor() {
    this.TsUiSceneRoleActor = undefined;
    this.S6c = 0;
  }
  ChangeModelState(e) {
    var i;
    var l;
    var n;
    if (this.S6c !== e && (l = this.S6c, e = this.S6c = e, i = this.TsUiSceneRoleActor?.Model) && (l = fadeCurveMap.get(l)) && (n = l.get(e))) {
      if (n[0] === 0) {
        UiModelUtil_1.UiModelUtil.ModelFadeIn(i, n[1]);
      } else {
        UiModelUtil_1.UiModelUtil.ModelFadeOut(i, n[1]);
      }
    }
  }
}
exports.SkinFadeAnimController = SkinFadeAnimController;
//# sourceMappingURL=SkinFadeAnimController.js.map