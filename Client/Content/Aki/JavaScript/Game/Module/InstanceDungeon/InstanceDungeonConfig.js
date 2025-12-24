"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById");
const InstanceDungeonTitleById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonTitleById");
const InstanceEnterControlById_1 = require("../../../Core/Define/ConfigQuery/InstanceEnterControlById");
const InstanceGameplayModeById_1 = require("../../../Core/Define/ConfigQuery/InstanceGameplayModeById");
const InstanceTrialRoleConfigById_1 = require("../../../Core/Define/ConfigQuery/InstanceTrialRoleConfigById");
const TowerDefenceInstanceById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceById");
const TowerDefenceInstanceByInstanceId_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceByInstanceId");
const TowerDefencePhantomById_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomById");
const TowerDefenseConfigById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenseConfigById");
const TowerDefenseSettleById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenseSettleById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
class InstanceDungeonConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.thi = new Map();
    this._ec = new Map();
    this.cec = () => {
      if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
        return !this.uec();
      } else if (ModelManager_1.ModelManager.ShipTowerModel?.CheckInBattleShipTower()) {
        return !UiManager_1.UiManager.IsViewOpen("ShipTowerDescView");
      } else {
        return !ControllerHolder_1.ControllerHolder.LordGymController.IsInLordGymDungeon() || !this.uec();
      }
    };
    this.mec = () => this.cec();
    this.uec = () => !!UiManager_1.UiManager.IsViewOpen("TeamRoleSelectView") || !!UiManager_1.UiManager.IsViewOpen("MultiTeamRoleSelectView") || !!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView");
  }
  OnInit() {
    this._ec.set("RoleRootView", this.cec);
    this._ec.set("WeaponRootView", this.mec);
    return true;
  }
  ihi(e) {
    let n = this.thi.get(e);
    if (!n) {
      n = new Array();
      (n = Array.from(this.GetConfig(e).RecommendLevel)).sort((e, n) => e[0] - n[0]);
      this.thi.set(e, n);
    }
    return n;
  }
  GetConfig(e) {
    var n = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e);
    if (n) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 16, "获取副本配置错误", ["id", e]);
    }
  }
  GetCountConfig(e) {
    var n = InstanceEnterControlById_1.configInstanceEnterControlById.GetConfig(e);
    if (n) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 16, "获取副本配置错误", ["id", e]);
    }
  }
  GetTitleConfig(e) {
    var n = InstanceDungeonTitleById_1.configInstanceDungeonTitleById.GetConfig(e);
    if (n) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 16, "获取副本标题配置错误", ["id", e]);
    }
  }
  GetTrialRoleConfig(e) {
    var n = InstanceTrialRoleConfigById_1.configInstanceTrialRoleConfigById.GetConfig(e);
    if (n) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 48, "获取副本试用角色配置错误", ["id", e]);
    }
  }
  GetGameplayModeConfig(e) {
    var n = InstanceGameplayModeById_1.configInstanceGameplayModeById.GetConfig(e);
    if (n) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 48, "获取副本玩法模式配置错误", ["id", e]);
    }
  }
  GetLimitChallengeTimes(e) {
    return this.GetCountConfig(e)?.EnterCount ?? 0;
  }
  CheckViewShield(e, n) {
    e = this.GetConfig(e);
    return !!e?.LimitViewName?.length && !!e.LimitViewName.some(e => e === n) && (!this._ec.has(n) || this._ec.get(n)());
  }
  GetUnlockCondition(e) {
    return this.GetConfig(e)?.EnterCondition ?? undefined;
  }
  GetUnlockConditionGroupHintText(e) {
    return this.GetConfig(e).EnterConditionText ?? undefined;
  }
  GetRecommendLevel(e, n) {
    e = this.ihi(e);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "推荐等级区间配置错误");
      }
      return 0;
    }
    let r = 0;
    for (const o of e) {
      if (!r || n >= o[0]) {
        r = o[1];
      }
    }
    return r;
  }
  GetInstanceRewardId(e) {
    return this.GetConfig(e)?.RewardId;
  }
  GetInstanceFirstRewardId(e) {
    return this.GetConfig(e)?.FirstRewardId;
  }
  IsMiniMapShow(e) {
    return (this.GetConfig(e)?.MiniMapId ?? 0) !== 0;
  }
  GetGuide(e) {
    e = this.GetConfig(e);
    return [e?.GuideType ?? 0, e?.GuideValue ?? 0];
  }
  GetTowerDefenseInstanceByInstance(e) {
    return TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e);
  }
  GetTowerDefenseConfigByActivityId(e) {
    return TowerDefenseConfigById_1.configTowerDefenseConfigById.GetConfig(e);
  }
  GetTowerDefenseSettleById(e) {
    return TowerDefenseSettleById_1.configTowerDefenseSettleById.GetConfig(e);
  }
  GetTowerDefenseConfigById(e) {
    return TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(e);
  }
  GetTowerDefenseRankListSize() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TowerDefenceRankListSize");
  }
  GetTowerDefensePhantomById(e) {
    return TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(e);
  }
  GetInstanceMapConfigId(e) {
    return this.GetConfig(e)?.MapConfigId;
  }
}
exports.InstanceDungeonConfig = InstanceDungeonConfig;
//# sourceMappingURL=InstanceDungeonConfig.js.map