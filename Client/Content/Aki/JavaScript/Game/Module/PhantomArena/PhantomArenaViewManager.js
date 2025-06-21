"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.roleStateInPhantomArenaMainViewTabView = exports.phantomArenaChildViewCreateInfo = void 0;
const PhantomArenaChallengeDetailTabView_1 = require("./Prepare/ChallengeDetail/PhantomArenaChallengeDetailTabView"),
  PhantomArenaDeckBuilderTabView_1 = require("./Prepare/DeckBuilder/PhantomArenaDeckBuilderTabView"),
  PhantomArenaDeckOverviewTabView_1 = require("./Prepare/DeckBuilder/PhantomArenaDeckOverviewTabView"),
  PhantomArenaEntranceGymTabView_1 = require("./Prepare/Entrance/PhantomArenaEntranceGymTabView"),
  PhantomArenaEntranceRepeatTabView_1 = require("./Prepare/Entrance/PhantomArenaEntranceRepeatTabView"),
  PhantomArenaRoleSelectTabView_1 = require("./Prepare/RoleSelect/PhantomArenaRoleSelectTabView");
exports.phantomArenaChildViewCreateInfo = {
  PhantomArenaRoleSelectTabView: [PhantomArenaRoleSelectTabView_1.PhantomArenaRoleSelectTabView, "UiItem_OutsideSelectRole"],
  PhantomArenaChallengeDetailTabView: [PhantomArenaChallengeDetailTabView_1.PhantomArenaChallengeDetailTabView, "UiItem_OutsideBattleDetail"],
  PhantomArenaDeckOverviewTabView: [PhantomArenaDeckOverviewTabView_1.PhantomArenaDeckOverviewTabView, "UiItem_DeckManagement"],
  PhantomArenaDeckBuilderTabView: [PhantomArenaDeckBuilderTabView_1.PhantomArenaDeckBuilderTabView, "UiItem_CardManagement"],
  PhantomArenaEntranceRepeatTabView: [PhantomArenaEntranceRepeatTabView_1.PhantomArenaEntranceRepeatTabView, "UiItem_SoundRemnantArenaRepeat"],
  PhantomArenaEntranceGymTabView: [PhantomArenaEntranceGymTabView_1.PhantomArenaEntranceGymTabView, "UiItem_SoundRemnantArenaLevel"]
}, exports.roleStateInPhantomArenaMainViewTabView = {
  PhantomArenaRoleSelectTabView: !0,
  PhantomArenaChallengeDetailTabView: !0,
  PhantomArenaDeckOverviewTabView: !1,
  PhantomArenaDeckBuilderTabView: !1
};
//# sourceMappingURL=PhantomArenaViewManager.js.map