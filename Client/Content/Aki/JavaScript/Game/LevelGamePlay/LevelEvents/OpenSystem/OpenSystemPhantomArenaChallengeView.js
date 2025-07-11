"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemPhantomArenaChallengeView = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemPhantomArenaChallengeView extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, a) {
    e = e.BoardId;
    if (e) {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e);
      if (e && !(e.CardGroupId > 0)) {
        return "PhantomArenaMainView";
      }
    }
  }
  async ExecuteOpenView(e, a) {
    var n;
    var e = e.BoardId;
    return !!e && !!(n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e)) && (n.CardGroupId > 0 ? await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestEnterPhantomArenaBattleAsync(e, 0, 0) : (n = {
      ChallengeId: e,
      OpenView: "PhantomArenaChallengeDetailTabView"
    }, await UiManager_1.UiManager.OpenViewAsync("PhantomArenaMainView", n)), true);
  }
}
exports.OpenSystemPhantomArenaChallengeView = OpenSystemPhantomArenaChallengeView;
//# sourceMappingURL=OpenSystemPhantomArenaChallengeView.js.map