"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnTrapDefenseMainLevelViewOpen = exports.LevelConditionCheckTrapDefenseMachineLevel = exports.LevelConditionCheckTrapDefenseTalentUnlock = exports.LevelConditionOnTrapDefenseBuildingDevelopBottomLayoutShow = exports.LevelConditionOnTrapDefenseDeployingBuilding = exports.LevelConditionOnTrapDefenseBuildingDevelopPreviewBtnShow = exports.LevelConditionOnTrapDefenseBuffGroupUpgrade = exports.LevelConditionCheckTrapDefenseRogueUnlock = exports.LevelConditionCheckTrapDefenseLevelFinish = exports.LevelConditionOnTrapDefenseMachineCanChooseBranch = exports.LevelConditionOnTrapDefenseAuxiliaryMachineUpgradeToMax = exports.LevelConditionCheckTrapDefenseHasCanUpgradeMachine = exports.LevelConditionCheckTrapDefenseTalentCanUnlock = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTrapDefenseTalentCanUnlock extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.HasAnyNodeCanUnlockAndAfford();
  }
}
exports.LevelConditionCheckTrapDefenseTalentCanUnlock = LevelConditionCheckTrapDefenseTalentCanUnlock;
class LevelConditionCheckTrapDefenseHasCanUpgradeMachine extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    for (const r of ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetHaveList()) {
      for (const a of r) {
        return !a.GetIsMaxLevel(false);
      }
    }
    return false;
  }
}
exports.LevelConditionCheckTrapDefenseHasCanUpgradeMachine = LevelConditionCheckTrapDefenseHasCanUpgradeMachine;
class LevelConditionOnTrapDefenseAuxiliaryMachineUpgradeToMax extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    r = r[0];
    return !!r && r.GetHasBranch() && r.GetIsUnlock() && !r.IsBuilding;
  }
}
exports.LevelConditionOnTrapDefenseAuxiliaryMachineUpgradeToMax = LevelConditionOnTrapDefenseAuxiliaryMachineUpgradeToMax;
class LevelConditionOnTrapDefenseMachineCanChooseBranch extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    r = r[0];
    return !!r && r.GetHasBranch() && r.GetIsUnlock();
  }
}
exports.LevelConditionOnTrapDefenseMachineCanChooseBranch = LevelConditionOnTrapDefenseMachineCanChooseBranch;
class LevelConditionCheckTrapDefenseLevelFinish extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    const r = Number(e.LimitParams.get("TargetLevelId"));
    var a;
    return !!r && !isNaN(r) && (e = ModelManager_1.ModelManager.TrapDefenseModel.LevelModeData.LevelDataList.find(e => e.Id === r)?.IsPassed ?? false, a = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.LevelDataList.find(e => e.Id === r)?.IsPassed ?? false, e || a);
  }
}
exports.LevelConditionCheckTrapDefenseLevelFinish = LevelConditionCheckTrapDefenseLevelFinish;
class LevelConditionCheckTrapDefenseRogueUnlock extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.CanEnterRougeMode();
  }
}
exports.LevelConditionCheckTrapDefenseRogueUnlock = LevelConditionCheckTrapDefenseRogueUnlock;
class LevelConditionOnTrapDefenseBuffGroupUpgrade extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    var [r, a] = r[1].PreAddedBuffIsActiveNewQuality();
    var e = Number(e.LimitParams.get("TargetQuality"));
    return !!e && !isNaN(e) && r && a === e;
  }
}
exports.LevelConditionOnTrapDefenseBuffGroupUpgrade = LevelConditionOnTrapDefenseBuffGroupUpgrade;
class LevelConditionOnTrapDefenseBuildingDevelopPreviewBtnShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    var [r] = r;
    return r;
  }
}
exports.LevelConditionOnTrapDefenseBuildingDevelopPreviewBtnShow = LevelConditionOnTrapDefenseBuildingDevelopPreviewBtnShow;
class LevelConditionOnTrapDefenseDeployingBuilding extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    e = Number(e.LimitParams.get("MachineId"));
    return !!e && !isNaN(e) && ([r] = r, r === e);
  }
}
exports.LevelConditionOnTrapDefenseDeployingBuilding = LevelConditionOnTrapDefenseDeployingBuilding;
class LevelConditionOnTrapDefenseBuildingDevelopBottomLayoutShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    var [r] = r;
    return r;
  }
}
exports.LevelConditionOnTrapDefenseBuildingDevelopBottomLayoutShow = LevelConditionOnTrapDefenseBuildingDevelopBottomLayoutShow;
class LevelConditionCheckTrapDefenseTalentUnlock extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = Number(e.LimitParams.get("TalentId"));
    return !!e && !isNaN(e) && (ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.NodeIdMap.get(e)?.IsUnlock ?? false);
  }
}
exports.LevelConditionCheckTrapDefenseTalentUnlock = LevelConditionCheckTrapDefenseTalentUnlock;
class LevelConditionCheckTrapDefenseMachineLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var r = Number(e.LimitParams.get("MachineId"));
    var a = Number(e.LimitParams.get("TargetLevel"));
    var o = e.LimitParams.get("Op");
    if (r && !isNaN(r) && a && !isNaN(a)) {
      var s = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetHaveList();
      for (let e = 1; e < s.length; e++) {
        for (const t of s[e]) {
          if (t.Id === r || r === -1) {
            var l = t.GetLevel();
            switch (o) {
              case "=":
                return l === a;
              case ">":
                return a < l;
              case "<":
                return l < a;
              default:
                return false;
            }
          }
        }
      }
    }
    return false;
  }
}
exports.LevelConditionCheckTrapDefenseMachineLevel = LevelConditionCheckTrapDefenseMachineLevel;
class LevelConditionOnTrapDefenseMainLevelViewOpen extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    var [r] = r;
    return r;
  }
}
exports.LevelConditionOnTrapDefenseMainLevelViewOpen = LevelConditionOnTrapDefenseMainLevelViewOpen;
//# sourceMappingURL=LevelConditionTrapDefenseGuide.js.map