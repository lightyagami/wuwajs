"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonSignInData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const MAX_MOON_COUNT = 10;
class MoonSignInData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.HaveSelectMoonPhaseSelectList = [];
    this.MoonGrandReward = false;
    this.Ged = 0;
    this.SelectMoonPhaseList = [];
    this.UseItemId = 0;
    this.CurrentMoonId = 0;
  }
  PhraseEx(t) {
    this.HaveSelectMoonPhaseSelectList = t.ZZc?.oed ?? [];
    this.MoonGrandReward = t.ZZc?.ned ?? false;
    this.SelectMoonPhaseList = [];
    for (const e of this.HaveSelectMoonPhaseSelectList) {
      this.SelectMoonPhaseList.push(e.eed);
    }
    this.Ged = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonList()?.length ?? 0;
    this.UseItemId = ConfigManager_1.ConfigManager.MoonSignInConfig.GetMoonSignReward(this.Id)?.ItemId ?? 0;
    this.CurrentMoonId = t.ZZc?.lrd ?? 0;
  }
  GetMoonPhaseProgress() {
    return this.HaveSelectMoonPhaseSelectList.length + "/" + this.Ged;
  }
  GetExDataRedPointShowState() {
    return this.GetAnyRedDot();
  }
  GetAnyRedDot() {
    return this.GetCurrentItemCount() > 0 || this.GetCanGetMoonGrandReward();
  }
  GetCurrentItemCount() {
    if (this.UseItemId) {
      return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.UseItemId);
    } else {
      return 0;
    }
  }
  CheckPhaseLock(t) {
    for (const e of this.HaveSelectMoonPhaseSelectList) {
      if (e.eed === t) {
        return false;
      }
    }
    return true;
  }
  GetCanGetMoonGrandReward() {
    var t;
    return !this.MoonGrandReward && !!(t = ConfigManager_1.ConfigManager.MoonSignInConfig.GetMoonSignReward(this.Id)) && !(this.HaveSelectMoonPhaseSelectList.length < t?.NeedMoonNum);
  }
  GetMoonNormalRewardData() {
    var e = [];
    for (let t = 1; t <= MAX_MOON_COUNT; t++) {
      e.push(t);
    }
    return e;
  }
  GetMoonPhaseSelect(t) {
    for (const e of this.HaveSelectMoonPhaseSelectList) {
      if (e.eed === t) {
        return e;
      }
    }
  }
  GetExDataFinishShowState() {
    return this.HaveSelectMoonPhaseSelectList.length >= MAX_MOON_COUNT && this.MoonGrandReward;
  }
}
exports.MoonSignInData = MoonSignInData;
//# sourceMappingURL=MoonSignInData.js.map