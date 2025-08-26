"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityShipTowerData = undefined;
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityShipTowerData extends ActivityData_1.ActivityBaseData {
  GetExDataRedPointShowState() {
    return this.HasNewCycle() || ModelManager_1.ModelManager.ShipTowerModel.IsCanReceiveAward();
  }
  HasNewCycle() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.CurSeason;
    return !(e <= 0) && (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerSeason) ?? 0) < e;
  }
}
exports.ActivityShipTowerData = ActivityShipTowerData;
//# sourceMappingURL=ActivityShipTowerData.js.map