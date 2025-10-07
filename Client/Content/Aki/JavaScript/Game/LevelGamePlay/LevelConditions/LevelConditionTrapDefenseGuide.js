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
    for (const a of ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetHaveList()) {
      for (const r of a) {
        return !r.GetIsMaxLevel(false);
      }
    }
    return false;
  }
}
exports.LevelConditionCheckTrapDefenseHasCanUpgradeMachine = LevelConditionCheckTrapDefenseHasCanUpgradeMachine;
class LevelConditionOnTrapDefenseAuxiliaryMachineUpgradeToMax extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...a) {
    a = a[0];
    return !!a && a.GetHasBranch() && a.GetIsUnlock() && !a.IsBuilding;
  }
}
exports.LevelConditionOnTrapDefenseAuxiliaryMachineUpgradeToMax = LevelConditionOnTrapDefenseAuxiliaryMachineUpgradeToMax;
class LevelConditionOnTrapDefenseMachineCanChooseBranch extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...a) {
    a = a[0];
    return !!a && a.GetHasBranch() && a.GetIsUnlock();
  }
}
exports.LevelConditionOnTrapDefenseMachineCanChooseBranch = LevelConditionOnTrapDefenseMachineCanChooseBranch;
class LevelConditionCheckTrapDefenseLevelFinish extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    const a = Number(e.LimitParams.get("TargetLevelId"));
    var r;
    return !!a && !isNaN(a) && (e = ModelManager_1.ModelManager.TrapDefenseModel.LevelModeData.LevelDataList.find(e => e.Id === a)?.IsPassed ?? false, r = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.LevelDataList.find(e => e.Id === a)?.IsPassed ?? false, e || r);
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
  Check(e, n, ...a) {
    var [a, r] = a[1].PreAddedBuffIsActiveNewQuality();
    var e = Number(e.LimitParams.get("TargetQuality"));
    return !!e && !isNaN(e) && a && r === e;
  }
}
exports.LevelConditionOnTrapDefenseBuffGroupUpgrade = LevelConditionOnTrapDefenseBuffGroupUpgrade;
class LevelConditionOnTrapDefenseBuildingDevelopPreviewBtnShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...a) {
    var [a] = a;
    return a;
  }
}
exports.LevelConditionOnTrapDefenseBuildingDevelopPreviewBtnShow = LevelConditionOnTrapDefenseBuildingDevelopPreviewBtnShow;
class LevelConditionOnTrapDefenseDeployingBuilding extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...a) {
    e = Number(e.LimitParams.get("MachineId"));
    return !!e && !isNaN(e) && ([a] = a, a === e);
  }
}
exports.LevelConditionOnTrapDefenseDeployingBuilding = LevelConditionOnTrapDefenseDeployingBuilding;
class LevelConditionOnTrapDefenseBuildingDevelopBottomLayoutShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...a) {
    var [a] = a;
    return a;
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
    var a = Number(e.LimitParams.get("MachineId"));
    var r = Number(e.LimitParams.get("TargetLevel"));
    var o = e.LimitParams.get("Op");
    if (a && !isNaN(a) && r && !isNaN(r)) {
      var s = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetHaveList();
      for (let e = 1; e < s.length; e++) {
        for (const t of s[e]) {
          if (t.Id === a || a === -1) {
            var l = t.GetLevel();
            let e = false;
            switch (o) {
              case "=":
                e = l === r;
                break;
              case ">":
                e = r < l;
                break;
              case "<":
                e = l < r;
                break;
              default:
                e = false;
            }
            if (a !== -1 || e) {
              return e;
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
  Check(e, n, ...a) {
    var [a] = a;
    return a;
  }
}
exports.LevelConditionOnTrapDefenseMainLevelViewOpen = LevelConditionOnTrapDefenseMainLevelViewOpen;
//# sourceMappingURL=LevelConditionTrapDefenseGuide.js.map