"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTowerGuideData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityTowerGuideController_1 = require("./ActivityTowerGuideController");
class ActivityTowerGuideData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.TowerDifficultIdList = [1, 2];
    this.i4e = new Map();
    this.o4e = new Map();
    this.TrialRoleId = 0;
    this.MapMarkId = 0;
  }
  PhraseEx(e) {
    ActivityTowerGuideController_1.ActivityTowerGuideController.CurrentActivityId = this.Id;
    for (const r of this.TowerDifficultIdList) {
      this.SetRewardClaimed(r, false);
    }
    ActivityTowerGuideController_1.ActivityTowerGuideController.RequestTowerRewardInfo();
    var t = ConfigManager_1.ConfigManager.ActivityTowerGuideConfig?.GetTowerGuideById(1);
    if (t) {
      this.TrialRoleId = t.TrialRoleId;
      this.MapMarkId = t.MapMark;
    }
  }
  GetExDataRedPointShowState() {
    for (const e of this.TowerDifficultIdList) {
      if (this.GetTowerProgressState(e) === 2) {
        return true;
      }
    }
    return false;
  }
  GetExDataFinishShowState() {
    for (const e of this.TowerDifficultIdList) {
      if (this.GetTowerProgressState(e) !== 3) {
        return false;
      }
    }
    return true;
  }
  GetViewState() {
    if (!this.IsUnLock()) {
      return 0;
    }
    let e = true;
    for (const t of this.TowerDifficultIdList) {
      if (this.GetTowerProgressState(t) !== 3) {
        e = false;
        break;
      }
    }
    if (e) {
      return 2;
    } else {
      return 1;
    }
  }
  SetRewardClaimed(e, t) {
    this.o4e.set(e, t);
    this.RefreshRewardState(e);
  }
  RefreshRewardState(e) {
    var t = this.r4e(e);
    this.i4e.set(e, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  r4e(e) {
    if (this.IsUnLock()) {
      if (ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(e)) {
        if ((e = this.o4e.get(e)) !== undefined && e) {
          return 3;
        } else {
          return 2;
        }
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }
  GetTowerProgress(e) {
    return ModelManager_1.ModelManager.TowerModel.GetDifficultyProgress(e);
  }
  GetTowerProgressState(e) {
    return this.i4e.get(e) ?? 0;
  }
  GetTrialRoleData() {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.TrialRoleId);
  }
}
exports.ActivityTowerGuideData = ActivityTowerGuideData;
//# sourceMappingURL=ActivityTowerGuideData.js.map