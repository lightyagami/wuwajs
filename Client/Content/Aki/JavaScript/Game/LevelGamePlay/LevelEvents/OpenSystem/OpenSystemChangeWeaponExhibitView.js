"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemChangeWeaponExhibitView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemChangeWeaponExhibitView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, i) {
    e = {
      TargetWeaponExhibitEntities: e.TargetWeaponExhibitEntities
    };
    await UiManager_1.UiManager.OpenViewAsync("Spring26WeaponExhibitView", e);
    return true;
  }
  GetViewName(e) {
    return "Spring26WeaponExhibitView";
  }
}
exports.OpenSystemChangeWeaponExhibitView = OpenSystemChangeWeaponExhibitView;
//# sourceMappingURL=OpenSystemChangeWeaponExhibitView.js.map