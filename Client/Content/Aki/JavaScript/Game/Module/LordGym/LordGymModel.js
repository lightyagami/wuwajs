"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymModel = undefined;
const LordGymEntranceSetById_1 = require("../../../Core/Define/ConfigQuery/LordGymEntranceSetById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const PayShopDefine_1 = require("../PayShop/PayShopDefine");
class LordGymModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LordId2EntranceIdMap = undefined;
    this.UnLockLordGym = [];
    this.ReadLoadGymIds = [];
    this.FirstUnLockLordGym = [];
    this.EntranceEntityId = 0;
    this.EntranceSetId = 0;
    this.CurrentChallengeLordGymId = 0;
    this.IsDeadInChallenge = false;
    this.LordGymRecord = new Map();
    this.NewLordGymEntranceIdRecord = undefined;
    this.CacheTransform = undefined;
    this.CacheLocation = undefined;
    this.CacheRotator = undefined;
    this.CacheScale = undefined;
  }
  OnInit() {
    this.LordId2EntranceIdMap = new Map();
    for (const r of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceAllConfig()) {
      for (const e of r.LordGymList) {
        this.LordId2EntranceIdMap.set(e, r.Id);
      }
    }
    return true;
  }
  GetLordGymIsUnLock(r) {
    return this.UnLockLordGym.includes(r);
  }
  GetLordGymHasRead(r) {
    return this.ReadLoadGymIds.includes(r);
  }
  ReadLordGym(r) {
    this.ReadLoadGymIds.push(r);
  }
  GetLordGymEntranceList(r) {
    return ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceLordList(r);
  }
  GetLastGymFinish(r) {
    var e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(r);
    if (e.Difficulty <= 1) {
      return true;
    }
    for (const t of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(e.Difficulty - 1)) {
      if (t.PlayId === e.PlayId) {
        return this.LordGymRecord.has(t.Id);
      }
    }
    return false;
  }
  GetNextGymId(r) {
    const e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(r);
    return ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(e.Difficulty + 1)?.find(r => r.PlayId === e.PlayId)?.Id;
  }
  GetLordGymIsFinish(r) {
    return this.LordGymRecord.has(r);
  }
  GetMarkIdByLordGymId(r) {
    r = this.LordId2EntranceIdMap.get(r);
    return ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r)?.MarkId;
  }
  GetLordGymEntranceFinish(r) {
    var e = this.GetGymCanFightMaxLevelWithoutLockCondition(r);
    return this.GetHasFinishLord(r) + "/" + e;
  }
  GetHasFinishLord(r) {
    r = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r);
    if (!r) {
      return 0;
    }
    let e = 0;
    for (const t of r.LordGymList) {
      if (this.GetLordGymIsFinish(t)) {
        e++;
      }
    }
    return e;
  }
  GetMaxDifficultyLordGymEntrance(e) {
    e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(e);
    if (e) {
      let r = 0;
      for (const n of e.LordGymList) {
        var t = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(n);
        if (this.GetLordGymIsUnLock(n) && t.Difficulty > r) {
          r = t.Difficulty;
        }
      }
      return r;
    }
  }
  GetMaxDifficultyLordGymEntranceCanFight(e) {
    e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(e);
    if (e) {
      let r = 1;
      for (const n of e.LordGymList) {
        var t = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(n);
        if (t.Difficulty > 1 && this.GetLordGymIsUnLock(n) && this.GetLordGymIsFinish(n - 1) && t.Difficulty > r) {
          r = t.Difficulty;
        }
      }
      return r;
    }
  }
  GetCanFightLordGym(r = false) {
    for (const o of this.UnLockLordGym) {
      var e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(o);
      if (r === e.IsNew) {
        var t = this.GetLordGymIsUnLock(o);
        var e = e.Difficulty === 1 || this.GetLordGymIsFinish(o - 1);
        var n = this.GetLordGymIsFinish(o);
        if (t && e && !n) {
          return o;
        }
      }
    }
    return 0;
  }
  GetGymEntranceAllFinish(r) {
    r = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r);
    if (!r) {
      return false;
    }
    for (const e of r.LordGymList) {
      if (!this.GetLordGymIsFinish(e)) {
        return false;
      }
    }
    return true;
  }
  GetGymCanFightMaxLevelWithoutLockCondition(e) {
    e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(e);
    if (e) {
      let r = 1;
      for (const n of e.LordGymList) {
        var t = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(n);
        if (t.Difficulty > 1 && this.GetLordGymIsUnLock(n) && t.Difficulty > r) {
          r = t.Difficulty;
        }
      }
      return r;
    }
  }
  GetLordGymCurrencyRewardAndTotalCount(r) {
    r = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(r).LordEntranceList;
    let e = 0;
    let t = 0;
    var n = ConfigManager_1.ConfigManager.LordGymConfig;
    var o = ConfigManager_1.ConfigManager.ExchangeRewardConfig;
    for (const s of r) {
      for (const f of n.GetLordGymEntranceConfig(s).LordGymList) {
        var i = n.GetLordGymConfig(f).RewardId;
        var i = o.GetExchangeRewardPreviewRewardList(i);
        var a = this.GetLordGymIsFinish(f);
        for (const h of i) {
          if (h[0].ItemId === PayShopDefine_1.LORD_GYM_CURRENCY_ID) {
            if (a) {
              e += h[1];
            }
            t += h[1];
          }
        }
      }
    }
    return [e, t];
  }
  IsChallenging() {
    return this.CurrentChallengeLordGymId > 0;
  }
  InitNewLordGymEntranceIdRecord() {
    this.NewLordGymEntranceIdRecord = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.NewLordGymEntranceIdRecord) ?? new Array();
  }
  RecordNewLordGymEntrance(r) {
    if (this.NewLordGymEntranceIdRecord && !this.IsNewLordGymEntranceRecord(r)) {
      this.NewLordGymEntranceIdRecord.push(r);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.NewLordGymEntranceIdRecord, this.NewLordGymEntranceIdRecord);
    }
  }
  IsNewLordGymEntranceRecord(r) {
    return this.NewLordGymEntranceIdRecord?.includes(r) ?? false;
  }
}
exports.LordGymModel = LordGymModel;
//# sourceMappingURL=LordGymModel.js.map