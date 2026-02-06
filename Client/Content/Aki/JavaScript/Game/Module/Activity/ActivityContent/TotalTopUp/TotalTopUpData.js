"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpWeaponPackageData = exports.TotalTopUpRolePackageData = exports.TotalTopUpRewardData = exports.TotalTopUpData = undefined;
const GiftType_1 = require("../../../../../Core/Define/Config/SubType/GiftType");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const ActivityData_1 = require("../../ActivityData");
const TotalTopUpDefine_1 = require("./TotalTopUpDefine");
const TotalTopUpViewModel_1 = require("./TotalTopUpViewModel");
class TotalTopUpData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.RewardDataList = [];
    this.RewardDataMap = new Map();
    this.ProgressData = new TotalTopUpProgressData();
    this.GoodsScoreMap = new Map();
    this.RechargeItemMap = new Map();
    this.PageViewModel = new TotalTopUpViewModel_1.TotalTopUpPageViewModel();
    this.ViewConfig = undefined;
    this.HasRequestedScoreInfo = false;
  }
  PhraseEx(t) {
    t = t?.dRf;
    if (t) {
      TotalTopUpDefine_1.TotalTopUpUtil.Debug("活动数据Phrase", ["Score", t.SMs], ["Json", JSON.stringify(t)]);
      this.ProgressData.SetScore(t.SMs ?? 0);
      this.UpdateReward(t.CRf ?? []);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, this.Id);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  InitData(t, e) {
    var a = t?.CRf ?? [];
    this.ProgressData.Reset();
    this.RewardDataMap.clear();
    this.RewardDataList.length = a.length;
    for (let t = 0; t < a.length; t++) {
      var o = a[t];
      var i = this.RewardDataList[t] ?? new TotalTopUpRewardData();
      var s = ConfigManager_1.ConfigManager.TotalTopUpConfig?.GetRewardConfigById(o.s5n);
      i.Id = o.s5n;
      i.Score = o.SMs;
      i.State = o.H6n;
      var r = Object.keys(o.fRf || {});
      for (const f of r) {
        var n = Number(f);
        var p = o.fRf ? o.fRf[f] : 0;
        if (i.FirstItemId === 0) {
          i.FirstItemId = n;
          i.FirstItemCount = p;
        }
        i.ItemIdList.push(n);
        i.ItemMap.set(n, p);
      }
      switch (s?.PreviewFunction ?? 0) {
        case 1:
          i.TotalTopUpRolePackageData = TotalTopUpRolePackageData.TryParsePackageData(i.FirstItemId);
          break;
        case 2:
          i.TotalTopUpWeaponPackageData = TotalTopUpWeaponPackageData.TryParseWeaponPackageData(i.FirstItemId);
      }
      r = s?.PreviewButtonRegistry ?? [];
      i.PreviewButtonRegistry = [...r];
      this.RewardDataList[t] = i;
      this.RewardDataMap.set(i.Id, i);
    }
    this.RewardDataList.sort((t, e) => t.Score - e.Score);
    var h = this.RewardDataList[0];
    if (!h || h.Score !== 0) {
      TotalTopUpDefine_1.TotalTopUpUtil.Error("First reward is not appropriate");
    }
    for (let t = 1; t < this.RewardDataList.length; t++) {
      var T = this.RewardDataList[t].Score;
      this.ProgressData.PushLevel(T);
    }
    this.ProgressData.SortLevel();
    this.ProgressData.SetScore(t.SMs);
    this.PageViewModel.InitData(this);
    this.ViewConfig = ConfigManager_1.ConfigManager.TotalTopUpConfig?.GetViewConfigByActivityId(e ?? 0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  UpdateReward(t) {
    TotalTopUpDefine_1.TotalTopUpUtil.Debug("更新奖励状态");
    for (const a of t) {
      var e = this.RewardDataMap.get(a.s5n);
      if (e) {
        e.State = a.H6n;
      } else {
        TotalTopUpDefine_1.TotalTopUpUtil.Error("更新领奖时，奖励数据不存在", ["RewardId", a.s5n]);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  UpdateGoodsScore(t) {
    this.GoodsScoreMap.clear();
    this.RechargeItemMap.clear();
    for (const e of t) {
      (e.h5n === 0 ? this.RechargeItemMap : this.GoodsScoreMap).set(e.mRf, e.SMs);
    }
    TotalTopUpDefine_1.TotalTopUpUtil.Debug("更新GoodsScoreMap", ["Content", [...this.GoodsScoreMap.keys()].map(t => `[${t}:${this.GoodsScoreMap.get(t)}]`).join(",")]);
    TotalTopUpDefine_1.TotalTopUpUtil.Debug("更新RechargeItemMap", ["Content", [...this.RechargeItemMap.keys()].map(t => `[${t}:${this.RechargeItemMap.get(t)}]`).join(",")]);
  }
  get RedPointShowState() {
    for (const t of this.RewardDataList) {
      if (t.State === 1) {
        return true;
      }
    }
    return false;
  }
}
exports.TotalTopUpData = TotalTopUpData;
class TotalTopUpRewardData {
  constructor() {
    this.Id = 0;
    this.Score = 0;
    this.State = 0;
    this.ItemIdList = [];
    this.ItemMap = new Map();
    this.FirstItemId = 0;
    this.FirstItemCount = 0;
    this.PreviewButtonRegistry = [];
    this.TotalTopUpRolePackageData = undefined;
    this.TotalTopUpWeaponPackageData = undefined;
  }
}
exports.TotalTopUpRewardData = TotalTopUpRewardData;
class TotalTopUpProgressData {
  constructor() {
    this.Score = 0;
    this.Level = [];
    this.Sxg = 0;
  }
  Reset() {
    this.Score = 0;
    this.Level.length = 0;
  }
  PushLevel(t) {
    this.Level.push(t);
  }
  SortLevel() {
    this.Level.sort((t, e) => t - e);
    if (this.Level.length > 0) {
      this.Sxg = this.Level[this.Level.length - 1];
    }
  }
  SetScore(t) {
    this.Score = t;
  }
  get CurrentScore() {
    return Math.min(this.Score, this.Sxg);
  }
  get NextScore() {
    for (const t of this.Level) {
      if (t > this.CurrentScore) {
        return t;
      }
    }
    if (this.Level.length > 0) {
      return this.Level[this.Level.length - 1];
    } else {
      return 0;
    }
  }
}
class TotalTopUpRolePackageData {
  constructor() {
    this.GiftBagItemId = 0;
    this.RoleList = [];
    this.RoleTrialIdList = [];
    this.ItemId = 0;
    this.ItemCount = 0;
  }
  static TryParsePackageData(t) {
    var e = ConfigManager_1.ConfigManager.ItemConfig?.GetConfig(t);
    if (e) {
      var a = e.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift);
      if (a) {
        e = ConfigManager_1.ConfigManager.GiftPackageConfig?.GetGiftPackageConfig(a);
        if (e && e.Type === GiftType_1.GiftType.TotalTopUpRole) {
          var o;
          var i;
          var s;
          var r = new TotalTopUpRolePackageData();
          for ([o, i] of e.Content) {
            if (ConfigManager_1.ConfigManager.InventoryConfig?.GetItemConfigData(o)?.ItemDataType === 1) {
              s = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(o);
              r.RoleList.push(s ? o : 0);
            } else if (r.ItemId > 0) {
              TotalTopUpDefine_1.TotalTopUpUtil.Error("TotalTopUpRolePackageData解析错误，包含多个非角色道具", ["GiftBagId", a]);
            } else {
              r.ItemId = o;
              r.ItemCount = i;
            }
          }
          r.GiftBagItemId = t;
          r.RoleTrialIdList = r.RoleList.map(t => this.okg(t));
          TotalTopUpDefine_1.TotalTopUpUtil.Debug("TotalTopUpRolePackageData解析成功");
          return r;
        }
      }
    }
  }
  static okg(t) {
    return ConfigManager_1.ConfigManager.GachaConfig?.GetGachaTextureInfo(t)?.TrialId ?? 0;
  }
}
exports.TotalTopUpRolePackageData = TotalTopUpRolePackageData;
class TotalTopUpWeaponPackageData {
  constructor() {
    this.WeaponTrialIdList = [];
  }
  static TryParseWeaponPackageData(t) {
    t = ConfigManager_1.ConfigManager.ItemConfig?.GetConfig(t);
    if (t) {
      var e = t.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift);
      if (e) {
        t = ConfigManager_1.ConfigManager.GiftPackageConfig?.GetGiftPackageConfig(e);
        if (t) {
          var a;
          var o = new TotalTopUpWeaponPackageData();
          for ([a] of t.Content) {
            if (ConfigManager_1.ConfigManager.InventoryConfig?.GetItemConfigData(a)?.ItemDataType !== 2) {
              TotalTopUpDefine_1.TotalTopUpUtil.Error("TotalTopUpWeaponPackageData解析错误，包含非武器道具", ["GiftBagId", e], ["ItemId", a]);
              return;
            }
            var i = ConfigManager_1.ConfigManager.WeaponConfig?.GetWeaponConfigByItemId(a);
            if (i) {
              o.WeaponTrialIdList.push(i.HandBookTrialId);
            }
          }
          if (o.WeaponTrialIdList.length !== 0) {
            TotalTopUpDefine_1.TotalTopUpUtil.Debug("TotalTopUpWeaponPackageData解析成功", ["TrialIds", o.WeaponTrialIdList.join(",")]);
            return o;
          }
        }
      }
    }
  }
}
exports.TotalTopUpWeaponPackageData = TotalTopUpWeaponPackageData;
//# sourceMappingURL=TotalTopUpData.js.map