"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpenSystemPhantomArenaChallengeView = void 0;
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemPhantomArenaChallengeView extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, a) {
    e = e.BoardId;
    if (e) {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e);
      if (e && !(0 < e.CardGroupId)) return "PhantomArenaMainView"
    }
  }
  async ExecuteOpenView(e, a) {
    var n, e = e.BoardId;
    return !!e && !!(n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e)) && (0 < n.CardGroupId ? await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestEnterPhantomArenaBattleAsync(e, 0, 0) : (n = {
      ChallengeId: e,
      OpenView: "PhantomArenaChallengeDetailTabView"
    }, await UiManager_1.UiManager.OpenViewAsync("PhantomArenaMainView", n)), !0)
  }
}
exports.OpenSystemPhantomArenaChallengeView = OpenSystemPhantomArenaChallengeView;
//# sourceMappingURL=OpenSystemPhantomArenaChallengeView.js.map