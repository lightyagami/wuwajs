"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemPhantomArenaChallengeView = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PhantomArenaController_1 = require("../../../Module/PhantomArena/PhantomArenaController");
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
    return !!e && !!(n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e)) && (n.CardGroupId > 0 ? (n.IsReChallenge && (await PhantomArenaController_1.PhantomArenaController.ReChallengeRequestAsync(e)), await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestEnterPhantomArenaBattleAsync(e, 0, 0)) : (e = {
      ChallengeId: e,
      OpenView: ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(n.ActivityId) ? "PhantomArenaChallengeDetailTabViewNew" : "PhantomArenaChallengeDetailTabView",
      ActivityId: n.ActivityId
    }, await UiManager_1.UiManager.OpenViewAsync("PhantomArenaMainView", e)), true);
  }
}
exports.OpenSystemPhantomArenaChallengeView = OpenSystemPhantomArenaChallengeView;
//# sourceMappingURL=OpenSystemPhantomArenaChallengeView.js.map