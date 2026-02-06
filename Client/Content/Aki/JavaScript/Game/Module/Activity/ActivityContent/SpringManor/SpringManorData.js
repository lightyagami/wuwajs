"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySpringManorTaskData = exports.SpringManorData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../ActivityCommonDefine");
const ActivityData_1 = require("../../ActivityData");
const SpringManorGameHandleDefine_1 = require("./GameHandle/Base/SpringManorGameHandleDefine");
const SpringManorDefine_1 = require("./SpringManorDefine");
class SpringManorData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.ekg = new Map();
    this.A0g = new Set();
    this.twg = 0;
    this.D0g = new Map();
    this.iwg = 0;
    this.rwg = 0;
    this.N5f = new Set();
    this.j5f = new Set();
    this.tTg = new Map();
    this.EAg = new Map();
    this.Tyg = new Map();
    this.byg = [];
  }
  PhraseEx(e) {
    ModelManager_1.ModelManager.SpringManorModel?.SetActivityId(this.Id);
    var t;
    var e = e.gbf;
    if (e) {
      this.owg(e);
      this.ParseSkipEntryList(e.IBg);
      this.B0g(e.amg);
      this.k0g(e.nAu);
      this.q0g(e.hmg);
      this.ParseGuessJokerGameData(e.smg);
      this.IAg(e.Qlg);
      t = ConfigManager_1.ConfigManager.SpringManorConfig.GetMapIdByActivityId(this.Id);
      ControllerHolder_1.ControllerHolder.FurnitureController.UpdateData(this.Id, t, e.Ejf, e.vbf);
      this.ParseBrochureInfos(e.tug);
    }
  }
  ParseSkipEntryList(e) {
    this.ekg.clear();
    e.forEach(e => {
      this.ekg.set(e.s5n, e);
    });
  }
  OnSkipEntryUpdateNotify(e) {
    this.ekg.set(e.s5n, e);
  }
  IsSkipEntryUnLock(e) {
    return this.ekg.get(e)?.MT_ ?? true;
  }
  IsSkipEntryFinish(e) {
    return this.ekg.get(e)?.a3_ ?? false;
  }
  q0g(e) {
    e.forEach(e => {
      this.A0g.add(e);
    });
  }
  OnScoreRewardClaimed(e) {
    e.forEach(e => {
      this.A0g.add(e);
    });
  }
  GetCurrentMilestone() {
    var e;
    if (this.twg === 0) {
      e = ModelManager_1.ModelManager.SpringManorModel.GetActivityConfig();
      this.twg = e.ScoreItemId ?? 0;
    }
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.twg);
  }
  IsScoreRewardReceived(e) {
    return this.A0g.has(e);
  }
  IsScoreRewardCanReceived(e) {
    return !this.IsScoreRewardReceived(e) && (e = ConfigManager_1.ConfigManager.SpringManorConfig.GetScoreRewardConfigById(e), this.GetCurrentMilestone() >= e.Score);
  }
  GetCanClaimedScoreRewardList() {
    var e = [];
    for (const t of ConfigManager_1.ConfigManager.SpringManorConfig.GetScoreRewardConfigListByActivityId(this.Id)) {
      if (this.IsScoreRewardCanReceived(t.Id)) {
        e.push(t.Id);
      }
    }
    return e;
  }
  HasAnyScoreRewardCanClaim() {
    return this.GetCanClaimedScoreRewardList().length > 0;
  }
  k0g(e) {
    this.D0g.clear();
    e.forEach(e => {
      var t = new ActivitySpringManorTaskData();
      t.Refresh(e);
      this.D0g.set(t.Id, t);
    });
  }
  OnTaskUpdateNotify(e) {
    var t = this.GetRewardTaskData(e.s5n);
    if (t) {
      t.Refresh(e);
    } else {
      (t = new ActivitySpringManorTaskData()).Refresh(e);
      this.D0g.set(t.Id, t);
    }
  }
  OnRewardTaskClaimed(e) {
    for (const r of e) {
      var t = this.GetRewardTaskData(r);
      if (t) {
        t.Status = 2;
      }
    }
  }
  GetRewardTaskData(e) {
    return this.D0g.get(e);
  }
  IsTaskCanClaim(e) {
    e = this.D0g.get(e);
    return !!e && e.Status === 0;
  }
  GetTabCanClaimableTaskId(e) {
    var t = [];
    for (const r of this.GetRewardTaskListByTabId(e)) {
      if (this.IsTaskCanClaim(r)) {
        t.push(r);
      }
    }
    return t;
  }
  IsTabHasAnyClaimable(e) {
    for (const t of this.GetRewardTaskListByTabId(e)) {
      if (this.IsTaskCanClaim(t)) {
        return true;
      }
    }
    return false;
  }
  HasAnyClaimable() {
    for (const e of ModelManager_1.ModelManager.SpringManorModel.GetRewardTaskTabList()) {
      if (this.IsTabHasAnyClaimable(e)) {
        return true;
      }
    }
    return false;
  }
  GetRewardTaskListByTabId(r) {
    const a = [];
    this.D0g.forEach(e => {
      var t = ConfigManager_1.ConfigManager.SpringManorConfig.GetRewardTaskConfigById(e.Id);
      if (t && t.TabId === r) {
        a.push(e.Id);
      }
    });
    return a;
  }
  GetTotalRewardTaskProgress() {
    let t = 0;
    ModelManager_1.ModelManager.SpringManorModel.GetRewardTaskTabList().forEach(e => {
      e = this.GetRewardTaskListByTabId(e);
      t += e.length;
    });
    return t;
  }
  GetCurrentRewardTaskProgress() {
    let t = 0;
    ModelManager_1.ModelManager.SpringManorModel.GetRewardTaskTabList().forEach(e => {
      this.GetRewardTaskListByTabId(e).forEach(e => {
        e = this.GetRewardTaskData(e);
        if (e && e.Status === 2) {
          t++;
        }
      });
    });
    return t;
  }
  GetAtmosphere() {
    return this.iwg;
  }
  GetAtmosphereLevel() {
    return this.rwg;
  }
  OnAtmosphereUpdateNotify(e, t) {
    this.iwg = e;
    if (t > this.rwg) {
      this.rwg = t;
    }
  }
  owg(e) {
    e.lmg.forEach(e => {
      this.N5f.add(e);
    });
    this.rwg = e.YIg;
    this.iwg = e.ybf;
  }
  OnAtmosphereLevelRewardUpdateNotify(e) {
    e.forEach(e => {
      this.N5f.add(e);
    });
  }
  IsLevelRewardClaimed(e) {
    return this.N5f.has(e);
  }
  IsLevelCanReceive(e) {
    var t;
    return !this.IsLevelRewardClaimed(e) && !!(t = ModelManager_1.ModelManager.SpringManorModel.GetLevelConfig(e)?.DropId) && t !== 0 && e <= this.GetAtmosphereLevel();
  }
  HasAnyLevelCanReceive() {
    var t = ModelManager_1.ModelManager.SpringManorModel.GetMaxLevel();
    for (let e = 1; e <= t; e++) {
      if (this.IsLevelCanReceive(e)) {
        return true;
      }
    }
    return false;
  }
  B0g(e) {
    this.j5f.clear();
    e.forEach(e => {
      this.j5f.add(e);
    });
  }
  OnFunctionUpdateNotify(e) {
    this.j5f.add(e);
  }
  IsFunctionUnlocked(e) {
    if (e === 0) {
      return this.HasAnyGameUnlocked();
    } else {
      return this.j5f.has(e);
    }
  }
  HasAnyGameUnlocked() {
    for (const e of SpringManorDefine_1.gameTypeList) {
      if (this.IsFunctionUnlocked(e)) {
        return true;
      }
    }
    return false;
  }
  ParseGuessJokerGameData(e) {
    this.tTg.clear();
    e.forEach(e => {
      var t = {
        LevelId: e.gG_,
        Unlock: e.MT_,
        FirstPass: e.nA_,
        RewardGet: e.x3g,
        PlayerWin: e.d6g
      };
      this.tTg.set(e.gG_, t);
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuessJokerRedDotNotify);
  }
  UpdateGuessJokerGameData(e) {
    let a = false;
    let i = false;
    e.forEach(e => {
      var t;
      var r = this.tTg.get(e.gG_);
      if (r) {
        if (!r.Unlock && e.MT_) {
          a = true;
        }
        if (!r.FirstPass && !!e.nA_ && !e.x3g) {
          i = true;
          (t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GuessJokerFirstFinishAnim) ?? new Set()).add(e.gG_);
          LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GuessJokerFirstFinishAnim, t);
        }
        r.Unlock = e.MT_;
        r.RewardGet = e.x3g;
        r.FirstPass = e.nA_;
        r.PlayerWin = e.d6g;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, `UpdateGuessJokerGameData.${e.gG_}失败，因为：数据不存在`);
      }
    });
    if (a || i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuessJokerRedDotNotify);
    }
  }
  GetGuessJokerGameData(e) {
    var t = this.tTg.get(e);
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, `GetGuessJokerGameData.${e}失败，因为：数据不存在`);
    }
  }
  GetGuessJokerCurrentProgress() {
    let t = 0;
    this.tTg.forEach(e => {
      if (e.RewardGet) {
        t++;
      }
    });
    return t;
  }
  GetGuessJokerTotalProgress() {
    return this.tTg.size;
  }
  UpdateLevelGetReward(e) {
    e = this.GetGuessJokerGameData(e);
    if (e) {
      e.RewardGet = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuessJokerRedDotNotify);
    }
  }
  IAg(e) {
    e?.Klg.forEach(e => {
      var t = {
        RoleId: e.Q6n,
        FirstPass: e.Xlg,
        MaxLike: e.Ylg,
        RewardGet: e.x3g
      };
      this.EAg.set(e.Q6n, t);
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDrinksUnlockClickedNotify);
  }
  GetDrinksCurrentProgress() {
    let t = 0;
    this.EAg.forEach(e => {
      if (e.RewardGet) {
        t++;
      }
    });
    return t;
  }
  GetDrinksTotalProgress() {
    return ConfigManager_1.ConfigManager.DrinksConfig.GetAllInvite().length;
  }
  GetDrinksProgressMap() {
    return this.EAg;
  }
  ParseBrochureInfos(e) {
    this.InitTargetTypeBookItemData(0);
    this.InitTargetTypeBookItemData(1);
    this.InitTargetTypeBookItemData(2);
    if (e) {
      for (const r of e) {
        var t = r.rug;
        this.byg?.push(t);
        for (const a of r.oug) {
          this.Tyg.set(a.nug, a);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBrochureBookItemStateUpdate);
    }
  }
  InitTargetTypeBookItemData(e) {
    e = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(this.Id, e);
    if (e) {
      for (const r of e.BookItemIds) {
        var t = {
          nug: r,
          sug: Protocol_1.Aki.Protocol.sug.Proto_BookItemLock
        };
        this.Tyg.set(r, t);
      }
    }
  }
  AddUnlockBrochureId(e) {
    if (this.byg) {
      this.byg?.push(e);
    }
  }
  SetBookItemDataById(e, t) {
    if (t) {
      this.Tyg.set(e, t);
    }
  }
  GetBookItemDataById(e) {
    if (this.Tyg.has(e)) {
      return this.Tyg.get(e);
    }
  }
  SetTargetBookItemState(e, t) {
    e = this.GetBookItemDataById(e);
    if (e) {
      e.sug = t;
    }
  }
  GetBookItemStateById(e) {
    e = this.GetBookItemDataById(e);
    if (e) {
      return this.SwitchBookItemState(e.sug);
    } else {
      return -1;
    }
  }
  SwitchBookItemState(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.sug.Proto_BookItemLock:
        return 0;
      case Protocol_1.Aki.Protocol.sug.Proto_BookItemUnlock:
        return 1;
      case Protocol_1.Aki.Protocol.sug.Proto_BookItemRewarded:
        return 2;
    }
    return -1;
  }
  GetNextLockBookItemId(t) {
    var r = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(this.Id, 2);
    if (!r) {
      return 0;
    }
    let a = 0;
    for (let e = r.BookItemIds.length - 1; e >= 0; e--) {
      var i = r.BookItemIds[e];
      if (i === t && a > 0) {
        break;
      }
      if (this.GetBookItemStateById(i) === 0) {
        a = i;
      }
    }
    return a;
  }
  ReadFirstOpenRedDot() {
    ModelManager_1.ModelManager.ActivityModel?.SaveActivityData(this.Id, 0, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  HasActivityRedDot() {
    return !ModelManager_1.ModelManager.ActivityModel?.GetActivityCacheData(this.Id, 0, 0, 0, 0) || !!this.HasRewardRedDot() || !!this.HasAtmosphereRedDot() || !!this.HasAnySubQuestRedDot() || !!ModelManager_1.ModelManager.DrinksModel.CheckRedDot() || !!ModelManager_1.ModelManager.GuessJokerGamePlayModel.CheckRedDot() || !!ModelManager_1.ModelManager.FurnitureModel.CheckFurnitureEntranceRedDot() || !!ModelManager_1.ModelManager.SpringManorModel.CheckAnyBookItemRedDot();
  }
  HasRewardRedDot() {
    return !!this.HasAnyClaimable() || this.HasAnyScoreRewardCanClaim();
  }
  HasAtmosphereRedDot() {
    return this.HasAnyLevelCanReceive();
  }
  HasAnySubQuestRedDot() {
    for (const e of ModelManager_1.ModelManager.SpringManorModel.GetSubQuestList()) {
      if (this.HasSubQuestRedDot(e)) {
        return true;
      }
    }
    return false;
  }
  HasSubQuestRedDot(e) {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityCacheData(this.Id, 0, 1, e, 0) !== 1;
  }
  ReadSubQuestRedDot(e) {
    ModelManager_1.ModelManager.ActivityModel?.SaveActivityData(this.Id, 1, e, 0, 1);
  }
  GetExDataRedPointShowState() {
    return this.HasActivityRedDot();
  }
  GetExDataFinishShowState() {
    for (const a of SpringManorDefine_1.gameTypeList) {
      var e = SpringManorGameHandleDefine_1.springManorGameHandleDefine.get(a);
      if (e.GetCurrentProgress() < e.GetTotalProgress()) {
        return false;
      }
    }
    for (var [, t] of this.D0g) {
      if (t.Status !== 2) {
        return false;
      }
    }
    var r;
    return !(ModelManager_1.ModelManager.SpringManorModel.GetScoreRewardConfigList().length > this.A0g.size) && !(r = ModelManager_1.ModelManager.SpringManorModel.GetMaxLevel(), this.N5f.size < r);
  }
}
exports.SpringManorData = SpringManorData;
class ActivitySpringManorTaskData {
  constructor() {
    this.Id = 0;
    this.Status = 1;
    this.Current = 0;
    this.Target = 0;
    this.Sort = 0;
  }
  Refresh(e) {
    this.Status = ActivityCommonDefine_1.taskStateResolver[e.H6n];
    this.Current = e.lMs;
    this.Target = e.j6n;
    if (this.Id !== e.s5n) {
      this.Sort = ConfigManager_1.ConfigManager.SpringManorConfig.GetRewardTaskConfigById(e.s5n)?.Sort ?? 1;
    }
    this.Id = e.s5n;
  }
}
exports.ActivitySpringManorTaskData = ActivitySpringManorTaskData;
//# sourceMappingURL=SpringManorData.js.map