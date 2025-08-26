"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markAssembleRegisterMap = exports.towerMapComponentConstructors = exports.ROUTE_POINT_ICON_PATH = exports.PHANTOM_POINT_ACTIVATED_ICON_PATH = exports.PHANTOM_POINT_ICON_PATH = exports.CAMP_ICON_PATH = exports.MINI_MAP_MARK_SCALE = exports.enemyResourcePreviewRecord = exports.enemyResourceBattleRecord = exports.ROUTE_POINT_PATH = exports.MARK_PREFAB_PATH = exports.BIG_MAP_CENTER_OFFSET_MULTIPLIER = exports.PHANTOM_MARK_ID = exports.PHANTOM_POINT_MARK_ID = exports.CAMP_MARK_ID = exports.PLAYER_MARK_ID = exports.worldToTrapDefenseUiUnit = exports.TRAP_DEFENSE_BATTLE_ITEM_TYPE_LIMIT = exports.trapDefenseGoodsTypeNames = exports.lineIndex2NodeIndex = exports.TRAP_DEFENSE_TALENT_TREE_HORIZONTAL_LINE_STRETCH_RIGHT = exports.TRAP_DEFENSE_TALENT_TREE_LEFT_LINE_OFFSET = exports.TRAP_DEFENSE_TALENT_TREE_BOTTOM_LINE_OFFSET = exports.TRAP_DEFENSE_TALENT_TREE_MID_LINE_OFFSET = exports.TRAP_DEFENSE_TALENT_TREE_TOP_LINE_OFFSET = exports.MAX_TALENT_NODES_IN_ROW = exports.trapDefenseTalentTreeTypeNames = exports.rewardTypeNames = exports.trapDefenseRewardServerState2ClientState = exports.trapDefenseLevelTargetRecord = exports.trapDefenseDifficultyLevelRecord = exports.UNLOCK_BD_SHARE_TXT = exports.UNLOCK_BD_TXT = exports.UNLOCK_ORGAN_SHARE_TXT = exports.UNLOCK_ORGAN_TXT = exports.RESULT_COIN_TXT = exports.RESULT_STAR_TXT = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EntityPosSyncComponent_1 = require("./Map/Components/EntityPosSyncComponent");
const MarkTransformComponent_1 = require("./Map/Components/MarkTransformComponent");
function lineIndex2NodeIndex(e) {
  if (e >= exports.TRAP_DEFENSE_TALENT_TREE_LEFT_LINE_OFFSET) {
    return e - exports.TRAP_DEFENSE_TALENT_TREE_LEFT_LINE_OFFSET;
  } else if (e >= exports.TRAP_DEFENSE_TALENT_TREE_BOTTOM_LINE_OFFSET) {
    return e - exports.TRAP_DEFENSE_TALENT_TREE_BOTTOM_LINE_OFFSET;
  } else if (e >= exports.TRAP_DEFENSE_TALENT_TREE_MID_LINE_OFFSET) {
    return e - exports.TRAP_DEFENSE_TALENT_TREE_MID_LINE_OFFSET;
  } else {
    return e;
  }
}
exports.RESULT_STAR_TXT = "TowerDefense_Ending_GainStar_Text";
exports.RESULT_COIN_TXT = "TowerDefense_Ending_GainBdUp_Text";
exports.UNLOCK_ORGAN_TXT = "TowerDefense_Ending_GainBuilding_Text";
exports.UNLOCK_ORGAN_SHARE_TXT = "TowerDefense_Ending_GainBuildingShare_Text";
exports.UNLOCK_BD_TXT = "TowerDefense_Ending_GainSchool_Text";
exports.UNLOCK_BD_SHARE_TXT = "TowerDefense_Ending_GainSchoolShare_Text";
exports.trapDefenseDifficultyLevelRecord = {
  [0]: {
    DifficultyLevel: 0,
    NameKey: "TrapDefenseLevelDifficultyNormal",
    BgKey: "T_TitleBgFrameGray",
    NameBgKey: "SP_MapDifficultyNormal",
    BgLightKey: "T_TitleBgLightGray",
    BgTitleKey: "SP_LevelTitleBgFrameGray",
    BgFlowerColor: "#FFFFFF1E",
    ArtTextShadowColor: "#FFFFFF4C"
  },
  1: {
    DifficultyLevel: 1,
    NameKey: "TrapDefenseLevelDifficultyNormal",
    BgKey: "T_TitleBgFrameBlue",
    NameBgKey: "SP_MapDifficultyNormal",
    BgLightKey: "T_TitleBgLightBlue",
    BgTitleKey: "SP_LevelTitleBgFrameBlue",
    BgFlowerColor: "#28F2FF1E",
    ArtTextShadowColor: "#00FFFF7F"
  },
  2: {
    DifficultyLevel: 2,
    NameKey: "TrapDefenseLevelDifficultyNightmare",
    BgKey: "T_TitleBgFrameYellow",
    NameBgKey: "SP_MapDifficultyNightmare",
    BgLightKey: "T_TitleBgLightYellow",
    BgTitleKey: "SP_LevelTitleBgFrameYellow",
    BgFlowerColor: "#FBC2021E",
    ArtTextShadowColor: "#FFEA487F"
  },
  3: {
    DifficultyLevel: 3,
    NameKey: "TrapDefenseLevelDifficultyHell",
    BgKey: "T_TitleBgFrameRed",
    NameBgKey: "SP_MapDifficultyHell",
    BgLightKey: "T_TitleBgLightRed",
    BgTitleKey: "SP_LevelTitleBgFrameRed",
    BgFlowerColor: "#FE39392E",
    ArtTextShadowColor: "#FF82837F"
  }
};
exports.trapDefenseLevelTargetRecord = {
  [1]: {
    TargetType: 1,
    NameKey: "TrapDefenseLevelTargetHp",
    IconKey: "TrapDefenseLevelTargetHp"
  },
  2: {
    TargetType: 2,
    NameKey: "TrapDefenseLevelTargetWave",
    IconKey: "TrapDefenseLevelTargetWave"
  }
};
exports.trapDefenseRewardServerState2ClientState = {
  [Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskRunning]: 2,
  [Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskFinish]: 3,
  [Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskTaken]: 1
};
exports.rewardTypeNames = {
  [0]: "",
  1: "TrapDefense_RewardType_Main",
  2: "TrapDefense_RewardType_Level",
  3: "TrapDefense_RewardType_Endless",
  4: "TrapDefense_RewardType_Other",
  5: ""
};
exports.trapDefenseTalentTreeTypeNames = {
  [1]: "TrapDefense_TalentTree_Economy",
  2: "TrapDefense_TalentTree_Build",
  3: "TrapDefense_TalentTree_Ability",
  4: ""
};
exports.MAX_TALENT_NODES_IN_ROW = 6;
exports.TRAP_DEFENSE_TALENT_TREE_TOP_LINE_OFFSET = 0;
exports.TRAP_DEFENSE_TALENT_TREE_MID_LINE_OFFSET = 6;
exports.TRAP_DEFENSE_TALENT_TREE_BOTTOM_LINE_OFFSET = 12;
exports.TRAP_DEFENSE_TALENT_TREE_LEFT_LINE_OFFSET = 18;
exports.TRAP_DEFENSE_TALENT_TREE_HORIZONTAL_LINE_STRETCH_RIGHT = -8.5;
exports.lineIndex2NodeIndex = lineIndex2NodeIndex;
exports.trapDefenseGoodsTypeNames = {
  [0]: "TrapDefense_Shop_GoodsType_Item",
  1: "TrapDefense_Shop_GoodsType_Buff"
};
exports.TRAP_DEFENSE_BATTLE_ITEM_TYPE_LIMIT = 8;
exports.worldToTrapDefenseUiUnit = Vector_1.Vector.Create(1, -1, 1);
exports.PLAYER_MARK_ID = 0;
exports.CAMP_MARK_ID = 1;
exports.PHANTOM_POINT_MARK_ID = 10000;
exports.PHANTOM_MARK_ID = 20000;
exports.BIG_MAP_CENTER_OFFSET_MULTIPLIER = 2;
exports.MARK_PREFAB_PATH = "/Game/Aki/UI/UIResources/UiFight/Prefabs/Activity/TowerDefense/DynMapIcon.DynMapIcon";
exports.ROUTE_POINT_PATH = "/Game/Aki/UI/UIResources/UiFight/Prefabs/Activity/TowerDefense/DynMapPointIcon.DynMapPointIcon";
exports.enemyResourceBattleRecord = {
  [0]: "",
  1: "/Game/Aki/UI/UIResources/UiFight/Atlas/TowerDefense/SP_IconTowerDefenseMapIconS3.SP_IconTowerDefenseMapIconS3",
  2: "/Game/Aki/UI/UIResources/UiFight/Atlas/TowerDefense/SP_IconTowerDefenseMapIconM2.SP_IconTowerDefenseMapIconM2",
  3: "/Game/Aki/UI/UIResources/UiFight/Atlas/TowerDefense/SP_IconTowerDefenseMapIconS2.SP_IconTowerDefenseMapIconS2"
};
exports.enemyResourcePreviewRecord = {
  [0]: "",
  1: "/Game/Aki/UI/UIResources/UiFight/Atlas/TowerDefense/SP_IconTowerDefenseMapIconS1.SP_IconTowerDefenseMapIconS1",
  2: "/Game/Aki/UI/UIResources/UiFight/Atlas/TowerDefense/SP_IconTowerDefenseMapIconM1.SP_IconTowerDefenseMapIconM1",
  3: "/Game/Aki/UI/UIResources/UiFight/Atlas/TowerDefense/SP_IconTowerDefenseMapIconS2.SP_IconTowerDefenseMapIconS2"
};
exports.MINI_MAP_MARK_SCALE = 0.5;
exports.CAMP_ICON_PATH = "/Game/Aki/UI/UIResources/UiFight/Atlas/TowerDefense/SP_IconTowerDefenseMapIcon3.SP_IconTowerDefenseMapIcon3";
exports.PHANTOM_POINT_ICON_PATH = "/Game/Aki/UI/UIResources/UiFight/Atlas/TowerDefense/SP_IconTowerDefenseMapIcon1.SP_IconTowerDefenseMapIcon1";
exports.PHANTOM_POINT_ACTIVATED_ICON_PATH = "/Game/Aki/UI/UIResources/UiFight/Atlas/TowerDefense/SP_IconTowerDefenseMapIcon2.SP_IconTowerDefenseMapIcon2";
exports.ROUTE_POINT_ICON_PATH = "/Game/Aki/UI/UIResources/Common/Image/Com/T_ComPointWhite.T_ComPointWhite";
exports.towerMapComponentConstructors = {
  [2]: EntityPosSyncComponent_1.EntityPosSyncComponent,
  1: MarkTransformComponent_1.MarkTransformComponent
};
exports.markAssembleRegisterMap = {
  [1]: [],
  2: [],
  3: [],
  4: []
}; //# sourceMappingURL=TrapDefenseDefine.js.map