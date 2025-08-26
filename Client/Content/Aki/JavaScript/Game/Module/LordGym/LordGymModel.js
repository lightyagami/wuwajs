"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymModel = undefined;
const LordGymEntranceSetById_1 = require("../../../Core/Define/ConfigQuery/LordGymEntranceSetById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
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
    this.LastChallengeLordEntranceId = 0;
    this.CurrentChallengeLordGymId = 0;
    this.IsDeadInChallenge = false;
    this.LordGymRecord = new Map();
    this.LordGymEntranceInfo = [];
    this.LordGymEntrancesWithNewTag = [];
    this.NewLordGymEntranceIdRecord = undefined;
    this.CacheTransform = undefined;
    this.CacheLocation = undefined;
    this.CacheRotator = undefined;
    this.CacheScale = undefined;
  }
  OnInit() {
    this.LordId2EntranceIdMap = new Map();
    for (const r of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceAllConfig()) {
      for (const t of r.LordGymList) {
        this.LordId2EntranceIdMap.set(t, r.Id);
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
    var t = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(r);
    if (t.Difficulty <= 1) {
      return true;
    }
    for (const e of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(t.Difficulty - 1)) {
      if (e.PlayId === t.PlayId) {
        return this.LordGymRecord.has(e.Id);
      }
    }
    return false;
  }
  GetNextGymId(r) {
    const t = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(r);
    return ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(t.Difficulty + 1)?.find(r => r.PlayId === t.PlayId)?.Id;
  }
  GetLordGymIsFinish(r) {
    return this.LordGymRecord.has(r);
  }
  GetMarkIdByLordGymId(r) {
    r = this.LordId2EntranceIdMap.get(r);
    return ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r)?.MarkId;
  }
  GetLordGymEntranceFinish(r) {
    var t = this.GetGymCanFightMaxLevelWithoutLockCondition(r);
    return this.GetHasFinishLord(r) + "/" + t;
  }
  GetHasFinishLord(r) {
    r = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r);
    if (!r) {
      return 0;
    }
    let t = 0;
    for (const e of r.LordGymList) {
      if (this.GetLordGymIsFinish(e)) {
        t++;
      }
    }
    return t;
  }
  GetMaxDifficultyLordGymEntrance(t) {
    t = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(t);
    if (t) {
      let r = 0;
      for (const n of t.LordGymList) {
        var e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(n);
        if (this.GetLordGymIsUnLock(n) && e.Difficulty > r) {
          r = e.Difficulty;
        }
      }
      return r;
    }
  }
  GetMaxDifficultyLordGymEntranceCanFight(t) {
    t = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(t);
    if (t) {
      let r = 1;
      for (const n of t.LordGymList) {
        var e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(n);
        if (e.Difficulty > 1 && this.GetLordGymIsUnLock(n) && this.GetLordGymIsFinish(n - 1) && e.Difficulty > r) {
          r = e.Difficulty;
        }
      }
      return r;
    }
  }
  GetCanFightLordGym(r = false) {
    for (const o of this.UnLockLordGym) {
      var t = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(o);
      if (r === t.IsNew) {
        var e = this.GetLordGymIsUnLock(o);
        var t = t.Difficulty === 1 || this.GetLordGymIsFinish(o - 1);
        var n = this.GetLordGymIsFinish(o);
        if (e && t && !n) {
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
    for (const t of r.LordGymList) {
      if (!this.GetLordGymIsFinish(t)) {
        return false;
      }
    }
    return true;
  }
  GetGymCanFightMaxLevelWithoutLockCondition(t) {
    t = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(t);
    if (t) {
      let r = 1;
      for (const n of t.LordGymList) {
        var e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(n);
        if (e.Difficulty > 1 && this.GetLordGymIsUnLock(n) && e.Difficulty > r) {
          r = e.Difficulty;
        }
      }
      return r;
    }
  }
  GetLordGymCurrencyRewardAndTotalCount(r) {
    r = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(r).LordEntranceList;
    let t = 0;
    let e = 0;
    var n = ConfigManager_1.ConfigManager.LordGymConfig;
    var o = ConfigManager_1.ConfigManager.ExchangeRewardConfig;
    for (const s of r) {
      for (const h of n.GetLordGymEntranceConfig(s).LordGymList) {
        var i = n.GetLordGymConfig(h).RewardId;
        var i = o.GetExchangeRewardPreviewRewardList(i);
        var a = this.GetLordGymIsFinish(h);
        for (const f of i) {
          if (f[0].ItemId === PayShopDefine_1.LORD_GYM_CURRENCY_ID) {
            if (a) {
              t += f[1];
            }
            e += f[1];
          }
        }
      }
    }
    return [t, e];
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
  PhraseEntranceInfo(r) {
    if (r) {
      this.LordGymEntranceInfo.length = 0;
      for (const e of r) {
        var t = new LordGymEntranceInfo();
        t.Phrase(e);
        this.LordGymEntranceInfo.push(t);
      }
    }
  }
  GetLordGymEntranceWithNewTag() {
    this.LordGymEntrancesWithNewTag.length = 0;
    for (const t of this.LordGymEntranceInfo) {
      var r = TimeUtil_1.TimeUtil.GetServerTime();
      if (r >= t.EffectBeginTime && r <= t.EffectEndTime) {
        this.LordGymEntrancesWithNewTag.push(t.Id);
      }
    }
    return this.LordGymEntrancesWithNewTag;
  }
}
exports.LordGymModel = LordGymModel;
class LordGymEntranceInfo {
  constructor() {
    this.Id = 0;
    this.EffectBeginTime = 0;
    this.EffectEndTime = 0;
  }
  Phrase(r) {
    this.Id = r.s5n;
    this.EffectBeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(r.xE_)) / 1000;
    this.EffectEndTime = Number(MathUtils_1.MathUtils.LongToBigInt(r.UE_)) / 1000;
  }
}
//# sourceMappingURL=LordGymModel.js.map