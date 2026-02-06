"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemChangePhantomExhibitView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemChangePhantomExhibitView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return !!t && (t = {
      TargetPhantomExhibitEntity: t.EntityId
    }, await UiManager_1.UiManager.OpenViewAsync("Spring26PhantomExhibitView", t), true);
  }
  GetViewName(e) {
    return "Spring26PhantomExhibitView";
  }
}
exports.OpenSystemChangePhantomExhibitView = OpenSystemChangePhantomExhibitView;
//# sourceMappingURL=OpenSystemChangePhantomExhibitView.js.map