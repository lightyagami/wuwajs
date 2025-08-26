"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLoopTowerData = undefined;
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TowerData_1 = require("../../../TowerDetailUi/TowerData");
const ActivityData_1 = require("../../ActivityData");
class ActivityLoopTowerData extends ActivityData_1.ActivityBaseData {
  GetExDataRedPointShowState() {
    return ModelManager_1.ModelManager.TowerModel.CurrentSeason !== -1 && ((LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickSeason) ?? -1) < ModelManager_1.ModelManager.TowerModel.CurrentSeason || ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(TowerData_1.VARIATION_RISK_DIFFICULTY));
  }
  GetExDataFinishShowState() {
    return ModelManager_1.ModelManager.TowerModel.CurrentSeason === ModelManager_1.ModelManager.TowerModel.DataSeason && ModelManager_1.ModelManager.TowerModel.IsRewardAllFinished(TowerData_1.VARIATION_RISK_DIFFICULTY);
  }
}
exports.ActivityLoopTowerData = ActivityLoopTowerData;
//# sourceMappingURL=ActivityLoopTowerData.js.map