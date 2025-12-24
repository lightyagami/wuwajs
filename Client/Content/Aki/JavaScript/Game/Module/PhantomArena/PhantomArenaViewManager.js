"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roleStateInPhantomArenaMainViewTabView = exports.phantomArenaChildViewCreateInfo = undefined;
const PhantomArenaChallengeDetailTabView_1 = require("./Prepare/ChallengeDetail/PhantomArenaChallengeDetailTabView");
const PhantomArenaChallengeDetailTabViewNew_1 = require("./Prepare/ChallengeDetail/PhantomArenaChallengeDetailTabViewNew");
const PhantomArenaDeckBuilderTabView_1 = require("./Prepare/DeckBuilder/PhantomArenaDeckBuilderTabView");
const PhantomArenaDeckOverviewTabView_1 = require("./Prepare/DeckBuilder/PhantomArenaDeckOverviewTabView");
const PhantomArenaNewDeckBuilderTabView_1 = require("./Prepare/DeckBuilder/PhantomArenaNewDeckBuilderTabView");
const PhantomArenaEntranceGymTabView_1 = require("./Prepare/Entrance/PhantomArenaEntranceGymTabView");
const PhantomArenaEntranceRepeatTabView_1 = require("./Prepare/Entrance/PhantomArenaEntranceRepeatTabView");
const PhantomArenaRoleSelectTabView_1 = require("./Prepare/RoleSelect/PhantomArenaRoleSelectTabView");
exports.phantomArenaChildViewCreateInfo = {
  PhantomArenaRoleSelectTabView: [PhantomArenaRoleSelectTabView_1.PhantomArenaRoleSelectTabView, "UiItem_OutsideSelectRole"],
  PhantomArenaChallengeDetailTabView: [PhantomArenaChallengeDetailTabView_1.PhantomArenaChallengeDetailTabView, "UiItem_OutsideBattleDetail"],
  PhantomArenaChallengeDetailTabViewNew: [PhantomArenaChallengeDetailTabViewNew_1.PhantomArenaChallengeDetailTabViewNew, "UiItem_OutsideBattleDetailNew"],
  PhantomArenaDeckOverviewTabView: [PhantomArenaDeckOverviewTabView_1.PhantomArenaDeckOverviewTabView, "UiItem_DeckManagement"],
  PhantomArenaDeckBuilderTabView: [PhantomArenaDeckBuilderTabView_1.PhantomArenaDeckBuilderTabView, "UiItem_CardManagement"],
  PhantomArenaNewDeckBuilderTabView: [PhantomArenaNewDeckBuilderTabView_1.PhantomArenaNewDeckBuilderTabView, "UiItem_CardManagementNew"],
  PhantomArenaEntranceRepeatTabView: [PhantomArenaEntranceRepeatTabView_1.PhantomArenaEntranceRepeatTabView, "UiItem_SoundRemnantArenaRepeat"],
  PhantomArenaEntranceGymTabView: [PhantomArenaEntranceGymTabView_1.PhantomArenaEntranceGymTabView, "UiItem_SoundRemnantArenaLevel"]
};
exports.roleStateInPhantomArenaMainViewTabView = {
  PhantomArenaRoleSelectTabView: true,
  PhantomArenaChallengeDetailTabView: true,
  PhantomArenaDeckOverviewTabView: false,
  PhantomArenaDeckBuilderTabView: false
}; //# sourceMappingURL=PhantomArenaViewManager.js.map