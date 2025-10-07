"use strict";

var EConditionLogicType;
var EAiStateType;
var ELevelPlayState;
var ESkillReadyType;
var ECheckJigsawInfoType;
var EFormationRoleInfoType;
var ERoleLevelType;
var EWeaponLevelType;
var EHasEquippedVisionType;
var EHasUpgradableVisionType;
var ETargetType;
var EPlayerAttributeType;
var EPlayerCheckType;
var ECheckPlayerCanJoinActivityType;
var ERogueThemeType;
var ECheckSystemStateType;
var EShopType;
var ETeleControlState;
var ECheckTargetType;
var ESubLevelState;
var ETargetBuffContainer;
function getExploreLevel(e) {
  if (e && e.Conditions) {
    var e = e.Conditions.filter(e => e.Type === "ExploreLevel");
    if (e && e.length !== 0) {
      if (e = e[0]) {
        return e.ExploreLevel;
      } else {
        return 0;
      }
    }
  }
}
function getPreQuests(e) {
  if (e?.Conditions) {
    e = e.Conditions.filter(e => e.Type === "PreQuest");
    if (e) {
      if (e) {
        return e.map(e => e.PreQuest);
      } else {
        return [];
      }
    }
  }
}
function getPreChildQuests(e) {
  if (e && e.Conditions) {
    e = e.Conditions.filter(e => e.Type === "PreChildQuest");
    if (e) {
      if (e) {
        return e.map(e => e.PreChildQuest);
      } else {
        return [];
      }
    }
  }
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ETargetBuffContainer = exports.ESubLevelState = exports.ECheckTargetType = exports.ETeleControlState = exports.EShopType = exports.ECheckSystemStateType = exports.ERogueThemeType = exports.ECheckPlayerCanJoinActivityType = exports.EPlayerCheckType = exports.EPlayerAttributeType = exports.ETargetType = exports.EHasUpgradableVisionType = exports.EHasEquippedVisionType = exports.EWeaponLevelType = exports.ERoleLevelType = exports.EFormationRoleInfoType = exports.ECheckJigsawInfoType = exports.ESkillReadyType = exports.ELevelPlayState = exports.EAiStateType = exports.getPreChildQuests = exports.getPreQuests = exports.getExploreLevel = exports.countNameMap = exports.EConditionLogicType = undefined;
(function (e) {
  e.BaseAccessQuest = "BaseAccessQuest";
  e.Condition2 = "Condition2";
})(EConditionLogicType = exports.EConditionLogicType ||= {});
exports.countNameMap = {
  [0]: "全部满足",
  1: "任意满足",
  2: "满足2个",
  3: "满足3个",
  4: "满足4个",
  5: "满足5个"
};
exports.getExploreLevel = getExploreLevel;
exports.getPreQuests = getPreQuests;
exports.getPreChildQuests = getPreChildQuests;
(function (e) {
  e.AnimalStandUp = "AnimalStandUp";
  e.AnimalSitDown = "AnimalSitDown";
  e.AnimalRandomAction = "AnimalRandomAction";
})(EAiStateType = exports.EAiStateType ||= {});
(function (e) {
  e[e.Close = 0] = "Close";
  e[e.Running = 1] = "Running";
  e[e.Complete = 2] = "Complete";
})(ELevelPlayState = exports.ELevelPlayState ||= {});
(function (e) {
  e.UltimateSkill = "UltimateSkill";
  e.ESkill = "ESkill";
  e.VisionSkill = "VisionSkill";
})(ESkillReadyType = exports.ESkillReadyType ||= {});
(function (e) {
  e.CheckJigsawItemPlaceIndex = "CheckJigsawItemPlaceIndex";
  e.CheckJigsawItemMove = "CheckJigsawItemMove";
})(ECheckJigsawInfoType = exports.ECheckJigsawInfoType ||= {});
(function (e) {
  e.RoleLevel = "RoleLevel";
  e.WeaponLevel = "WeaponLevel";
  e.HasEquippedVision = "HasEquippedVision";
  e.HasUpgradableVision = "HasUpgradableVision";
  e.FeatureCollection = "FeatureCollection";
})(EFormationRoleInfoType = exports.EFormationRoleInfoType ||= {});
(ERoleLevelType = exports.ERoleLevelType ||= {}).SpecifyRole = "SpecifyRole";
(EWeaponLevelType = exports.EWeaponLevelType ||= {}).SpecifyRole = "SpecifyRole";
(EHasEquippedVisionType = exports.EHasEquippedVisionType ||= {}).AnyRole = "AnyRole";
(EHasUpgradableVisionType = exports.EHasUpgradableVisionType ||= {}).AnyRole = "AnyRole";
(ETargetType = exports.ETargetType ||= {}).Player = "Player";
(EPlayerAttributeType = exports.EPlayerAttributeType ||= {}).Health = "Health";
(EPlayerCheckType = exports.EPlayerCheckType ||= {}).AnyRole = "AnyRole";
(ECheckPlayerCanJoinActivityType = exports.ECheckPlayerCanJoinActivityType ||= {}).Rogue = "Rogue";
(ERogueThemeType = exports.ERogueThemeType ||= {}).ZhongQu = "ZhongQu";
(function (e) {
  e.TrackMoonBuilding = "TrackMoonBuilding";
  e.CollectionShopFull = "CollectionShopFull";
  e.TrackMoonPopularity = "TrackMoonPopularity";
})(ECheckSystemStateType = exports.ECheckSystemStateType ||= {});
(EShopType = exports.EShopType ||= {}).ChengXiaoShan = "ChengXiaoShan";
(function (e) {
  e.Hold = "Hold";
  e.LetGo = "LetGo";
  e.Throwing = "Throwing";
  e.FreeThrowing = "FreeThrowing";
  e.LockBaseThrowing = "LockBaseThrowing";
  e.LockEntityThrowing = "LockEntityThrowing";
})(ETeleControlState = exports.ETeleControlState ||= {});
(ECheckTargetType = exports.ECheckTargetType ||= {}).AllPlayer = "AllPlayer";
(function (e) {
  e.Enable = "Enable";
  e.Disable = "Disable";
})(ESubLevelState = exports.ESubLevelState ||= {});
(ETargetBuffContainer = exports.ETargetBuffContainer ||= {}).Monster = "Monster"; //# sourceMappingURL=ICondition.js.map