"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerInstanceDungeonViewModel = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TowerDefenseRankTimeModel_1 = require("../../TowerDefence/Rank/TowerDefenseRankTimeModel");
const TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InstanceDungeonViewModelBase_1 = require("./InstanceDungeonViewModelBase");
class TowerInstanceDungeonViewModel extends InstanceDungeonViewModelBase_1.InstanceDungeonViewModelBase {
  constructor() {
    super(...arguments);
    this.RankItemModel = new TowerDefenseRankTimeModel_1.TowerDefenseRankTimeModel();
  }
  GetInstanceByTitleMap() {
    var n;
    var r;
    var e = ModelManager_1.ModelManager.TowerDefenseModel.GetSortedByTitleEntranceInstanceIdList();
    var o = new Map();
    for ([n, r] of e) {
      let e = o.get(r);
      if (!e) {
        e = [];
        o.set(r, e);
      }
      e.push(n);
    }
    return o;
  }
  OnSortInstanceArray(e) {
    e.sort((e, n) => {
      e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e);
      n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(n);
      if (e && n) {
        return e.Difficulty - n.Difficulty;
      } else {
        return 0;
      }
    });
  }
  OnGetInstanceItemTextureBg(e) {
    if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e).IsDifficult) {
      return "T_TogHoldDeathmatch";
    } else {
      return "T_TogListNor";
    }
  }
  OnGetUnlockConditionTextId(e) {
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(e);
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigById(n[2]);
    if (ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.IsStageUnLocked(n.InstanceId)) {
      return new LguiUtil_1.TableTextArgNew("OnlineGymnasium_LevelRst");
    } else if (n = TowerDefenceController_1.TowerDefenseController.BuildInstanceCountDownTextParam(e)) {
      return new LguiUtil_1.TableTextArgNew("OnlineGymnasium_LevelRst", n);
    } else {
      return undefined;
    }
  }
  OnIsFinishInstance(e) {
    return TowerDefenceController_1.TowerDefenseController.CheckInstancePassedByInstanceId(e);
  }
  OnGetInstanceDetectItemIcon() {
    return "";
  }
  OnGetDefaultSelectData() {
    if (TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()) {
      var e = TowerDefenceController_1.TowerDefenseController.GetSuitableInstanceId();
      var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (n) {
        return {
          InstanceId: e,
          SeriesId: n.Title
        };
      }
    }
  }
  OnCheckNeedOnTimer(e) {
    return !!TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() && !TowerDefenceController_1.TowerDefenseController.CheckIsInstanceUnlock(e);
  }
  OnTimerRefreshFunction(e) {
    this.View.RefreshTowerDefenseInstance();
  }
  async OnRequestServerData() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(this.EntranceId);
    await TowerDefenceController_1.TowerDefenseController.RequestSelfRankData(e.ActivityId);
  }
  OnCheckInstanceHasRedDot(e) {
    return ModelManager_1.ModelManager.TowerDefenseModel.CheckTowerDefenseInstanceHasRedDot(e);
  }
}
exports.TowerInstanceDungeonViewModel = TowerInstanceDungeonViewModel;
//# sourceMappingURL=TowerInstanceDungeonViewModel.js.map