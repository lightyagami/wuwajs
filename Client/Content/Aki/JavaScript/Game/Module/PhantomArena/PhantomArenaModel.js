"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData");
const PhantomCardData_1 = require("./Battle/Model/PhantomCardData");
const CardDetailFactorDescItem_1 = require("./Common/CardDetail/CardDetailFactorDescItem");
const PhantomArenaDefine_1 = require("./PhantomArenaDefine");
const DeckInfo_1 = require("./Prepare/DeckBuilder/DeckInfo");
class PhantomArenaModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.RoleUnlockQueue = [];
    this.BadgeUnlockQueue = [];
    this.CardUnlockQueue = [];
    this.CardOutlookUnlockQueue = [];
    this.EntranceOpenQueue = false;
    this.msf = undefined;
    this.itu = (e, t) => {
      e = e.ElementId;
      t = t.ElementId;
      if (e === 0 && t !== 0) {
        return 1;
      } else if (t === 0 && e !== 0) {
        return -1;
      } else {
        return e - t;
      }
    };
    this.xvg = (e, t) => {
      var r = e.Element;
      var a = t.Element;
      if (r === 0 && a !== 0) {
        return 1;
      } else if (a === 0 && r !== 0) {
        return -1;
      } else if (r === a) {
        return t.Cost - e.Cost;
      } else {
        return r - a;
      }
    };
    this.XOu = (e, t) => {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(e);
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(t);
      return e.SortIndex - t.SortIndex;
    };
  }
  GetPermanentPhantomArenaActivityData() {
    if (!this.msf) {
      for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values()) {
        if (e.Type === Protocol_1.Aki.Protocol.uks.Proto_PhantomBattleRecord) {
          this.msf = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityData(e.Id);
          break;
        }
      }
    }
    return this.msf;
  }
  GetPhantomArenaActivityData(e) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
  }
  GetActivityUnlock(e) {
    return !(e <= 0) && this.GetPhantomArenaActivityData(e).IsUnLock();
  }
  IsNewPhantomArenaActivity(e) {
    return this.GetPhantomArenaActivityData(e).Type === Protocol_1.Aki.Protocol.uks.Proto_PhantomBattleRecord;
  }
  CanCardUnlock(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    if (!e.EnableBuy) {
      return false;
    }
    for (const t of e.UnlockConsumeItems) {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.ItemId) < t.Count) {
        return false;
      }
    }
    return true;
  }
  IsCardUnlock(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e).ActivityId;
    return this.GetPhantomArenaActivityData(t).IsCardUnlock(e);
  }
  IsCardOutlookUnlock(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e).ActivityId;
    return this.GetPhantomArenaActivityData(t).IsCardOutlookUnlock(e);
  }
  IsBadgeUnlock(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(e).ActivityId;
    return this.GetPhantomArenaActivityData(t).IsBadgeUnlock(e);
  }
  OnCardOutlookUnlock(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e).ActivityId;
    this.GetPhantomArenaActivityData(t).OnCardOutlookUnlock(e);
  }
  AddCardListByNotify(e) {
    var e = e.gg1;
    var t = e[0].wg1;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t).ActivityId;
    this.GetPhantomArenaActivityData(t).AddCardListByNotify(e);
  }
  GetActivityIdByRoleId(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e).ActivityId;
  }
  AddRoleByNotify(e) {
    var e = e.pg1;
    var t = this.GetActivityIdByRoleId(e[0].xg1);
    var r = this.GetPhantomArenaActivityData(t);
    for (const a of e) {
      r.AddRoleInfo(a);
    }
  }
  OnRoleReward(e) {
    var t = this.GetActivityIdByRoleId(e);
    this.GetPhantomArenaActivityData(t).OnRoleReward(e);
  }
  UpdateDeckList(e, t) {
    this.GetPhantomArenaActivityData(t).UpdateProtocolDeckInfoList(e);
  }
  AddProtocolDeckInfo(e, t) {
    this.GetPhantomArenaActivityData(t).AddProtocolDeckInfo(e);
  }
  UpdateProtocolDeckInfo(e, t) {
    this.GetPhantomArenaActivityData(t).UpdateProtocolDeckInfo(e);
  }
  GetDustItemId(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(e).DustItemId;
  }
  GetExpItemId(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(e).ExpItemId;
  }
  GetPointsItemId(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(e).Integration;
  }
  GetRewardItemId(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(e).RewardItemId;
  }
  FilterCardList(e, t) {
    var r;
    var a = [];
    var n = t.CostFilter;
    var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardFilter(n).CostList;
    for (const i of e) {
      if (!!t.IncludeLocked || !i.IsLocked) {
        if (((r = t.ElementFilter) === 0 || PhantomArenaDefine_1.cardTabTypeToFilterElementList[r].includes(i.Element)) && o.includes(i.Cost)) {
          a.push(i);
        }
      }
    }
    return a;
  }
  SortCardSlotList(e, r) {
    const a = PhantomArenaDefine_1.cardSlotSortTypeToSortFunc[r.SortType];
    e.sort((e, t) => this.CompareCardSlot(e, t, a, r.IsAscending));
  }
  CompareCardSlot(e, t, r, a) {
    let n = r(e, t);
    return (n = n === 0 ? (0, PhantomArenaDefine_1.cardSlotDefaultSortFunc)(e, t) : n) * (a ? 1 : -1);
  }
  GetCardFaceType(e) {
    if (this.IsCardOutlookUnlock(e) && this.CheckCardSpineConfigValid(e)) {
      return 1;
    } else {
      return 0;
    }
  }
  CheckCardSpineConfigValid(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    return !StringUtils_1.StringUtils.IsEmpty(e.SpineAtlas) && !StringUtils_1.StringUtils.IsEmpty(e.SpineSkeleton);
  }
  CreateCardSpineData(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    return {
      CardSpineAtlasPath: e.SpineAtlas,
      CardSpineSkeletonPath: e.SpineSkeleton,
      AnimationName: "idle",
      IsLoop: true
    };
  }
  GetChallengeData(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e).ActivityId;
    return this.GetPhantomArenaActivityData(t).GetChallengeInfoById(e);
  }
  GetPermanentChallengeData(e) {
    return this.GetPermanentPhantomArenaActivityData()?.GetChallengeInfoById(e);
  }
  GetLastUsedCardRoleId(e) {
    return this.GetPhantomArenaActivityData(e).GetLastUsedCardRoleId();
  }
  SetLastUsedCardDeckServerId(e, t) {
    this.GetPhantomArenaActivityData(t).SetLastUsedDeckServerId(e);
  }
  GetLastUsedCardDeckServerId(e) {
    return this.GetPhantomArenaActivityData(e).GetLastUsedDeckServerId();
  }
  GetDeckByDeckId(e, t) {
    return this.GetPhantomArenaActivityData(t).GetClientDeckInfo(e);
  }
  CreateEditableDeckListFromProtocolData(e) {
    return this.GetPhantomArenaActivityData(e).CreateDeckInfoListFromProtocol();
  }
  CreateDeckInfoFromDeckConfigId(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetCardListByDeckConfigId(e);
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetDeckConfigInfo(e);
    var a = new DeckInfo_1.DeckInfo();
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Name);
    a.SetDeckName(n);
    a.SetDeckConfigId(e);
    a.SetElementCountLimit(r.ElementCountLimit);
    a.SetCoreCardCountLimit(r.CoreCardCountLimit);
    a.SetFieldCardCountLimit(r.FieldCardCountLimit);
    a.SetItemCardCountLimit(r.ItemCardCountLimit);
    a.SetNormalCardCountLimit(r.NormalCardCountLimit);
    a.SetCoreCost(ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost());
    for (const s of t) {
      var o = s.CardId;
      var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(o);
      var i = {
        CardId: o,
        Cost: i.Cost,
        Element: i.Element,
        MaxCount: i.CardGroupNum,
        AddCount: s.Num,
        CardType: i.Type
      };
      var i = a.AddCard(i);
      if (i !== 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 43, "从配置表中创建卡组时，添加卡牌失败", ["deckConfigId", e], ["cardId", o], ["result", i]);
      }
    }
    return a;
  }
  CreateEmptyTempDeckInfo(e) {
    var e = this.GetPhantomArenaActivityData(e).CreateClientDeckInfo();
    e.SetDeckServerId(PhantomArenaDefine_1.DECK_ID_EMPTY_TEMP);
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PhantomBattle_1038");
    e.SetDeckName(t);
    return e;
  }
  GetUnlockCardCountInDeck(e) {
    let t = 0;
    for (const a of e.GetCardSlotList()) {
      var r = a.CardId;
      if (this.IsCardUnlock(r)) {
        t += a.Count;
      }
    }
    return t;
  }
  GetPhantomBattleGymLevelList(e, t) {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleGymConfig(e);
    var r = new Array();
    for (const a of e) {
      if (!t || !a.IfRepeat) {
        r.push(a.Level);
      }
    }
    return r;
  }
  GetPhantomBattleGymConfigByLevel(e, t) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleGymConfigByLevel(t, e);
  }
  GetChallengeStateById(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e).ActivityId;
    var t = this.GetPhantomArenaActivityData(t).GetChallengeInfoById(e);
    if (!t || !t.K6n || ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e).IsReChallenge && !this.GetRepeatChallengeOpen(e)) {
      return 0;
    } else if (t.Sg1) {
      return 2;
    } else {
      return 1;
    }
  }
  GetPermanentChallengeStateById(e) {
    e = this.GetPermanentPhantomArenaActivityData()?.GetChallengeInfoById(e);
    if (e && e.K6n) {
      if (e.Sg1) {
        return 2;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }
  UpdateChallengeInfoByNotify(e) {
    var t = e.ug1[0].yg1;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(t).ActivityId;
    this.GetPhantomArenaActivityData(t).UpdateChallengeInfoList(e.ug1);
  }
  UpdateChallengeInfoBySettleResult(e, t, r, a) {
    var n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e).ActivityId;
    this.GetPhantomArenaActivityData(n).UpdateChallengeInfoById(e, t, r, a);
  }
  IsChallengeLock(e) {
    return this.GetChallengeStateById(e) === 0;
  }
  IsGymLock(e, t) {
    return (this.GetChallengeStateListByGymLevel(e, t)[0]?.State ?? 0) === 0;
  }
  IsGymUnlockChecked(e, t) {
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymCheck);
    if (r && r.has(t)) {
      return r.get(t).includes(e);
    } else {
      (r = new Map()).set(t, []);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymCheck, r);
      return false;
    }
  }
  SetGymUnlockChecked(e, t) {
    var r;
    var a = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymCheck);
    if (a && a.has(t)) {
      if (!(r = a.get(t)).includes(e)) {
        r.push(e);
        a.set(t, r);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymCheck, a);
      }
    } else {
      (r = new Map()).set(t, [e]);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymCheck, r);
    }
  }
  UpdateMasterInfoByNotify(e) {
    if (e.dg1) {
      this.GetPhantomArenaActivityData(e.w6n).UpdateMasterInfo(e.dg1);
    }
  }
  GetMasterLevel(e) {
    return this.GetPhantomArenaActivityData(e).GetMasterLevel();
  }
  GetMasterTitleId(e) {
    return this.GetPhantomArenaActivityData(e).GetMasterTitleId();
  }
  GetMasterTitleIdByLevel(e, t) {
    return this.GetMasterLevelConfig(e, t).TitleId;
  }
  GetMasterLevelConfig(e, t) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelConfigByLevel(t, e);
  }
  GetMasterLevelRewardIfTaken(e, t) {
    return !(t <= 0) && (e = this.GetMasterLevelConfig(e, t), this.GetPhantomArenaActivityData(t).GetMasterLevelRewardIfTaken(e.Id));
  }
  GetMasterLevelRewardCanTake(e, t) {
    var r = this.GetMasterLevelConfig(e, t).ExpNeed;
    var a = this.GetMasterExpNow(t);
    return this.GetMasterLevelRewardList(e, t).length !== 0 && r <= a && !this.GetMasterLevelRewardIfTaken(e, t);
  }
  GetMasterLevelRewardList(e, t) {
    e = this.GetMasterLevelConfig(e, t).NormalDropId;
    if (e <= 0) {
      return [];
    } else {
      return ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e);
    }
  }
  GetPhantomBattleMasterLevelConfigList(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelConfigByActivityId(e);
  }
  GetMasterExpNextNeed(e) {
    var t = this.GetMasterLevel(e);
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelConfigByLevel(e, t);
    return e.ExpNeed + e.ExpNext;
  }
  GetMasterExpNow(e, t) {
    var r = this.GetPhantomArenaActivityData(e).GetMasterExp();
    if (!t && (t = this.GetMasterLevelMax(e), (t = this.GetMasterLevelConfig(t, e).ExpNeed) <= r)) {
      return t;
    } else {
      return r;
    }
  }
  GetMasterExpWeek(e) {
    return this.GetPhantomArenaActivityData(e).GetMasterExpWeek();
  }
  t_u(e, t) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeIdListByGymId(t, e);
  }
  GetChallengeStateListByGymLevel(e, t) {
    var r = this.t_u(e, t);
    if (this.GetPhantomBattleGymConfigByLevel(e, t).IfRepeat && r.length !== PhantomArenaDefine_1.REPEAT_GYM_MAX_DIFFICULTY && Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 75, "错误的复刷道馆难度数量", ["配置数量", r.length]);
    }
    var a = [];
    for (let e = 0; e < r.length; e++) {
      var n = r[e];
      var n = {
        Id: n,
        State: this.GetChallengeStateById(n),
        IsLast: e === r.length - 1
      };
      a.push(n);
    }
    return a;
  }
  GetFinishedChallengeCount(e) {
    return this.GetPhantomArenaActivityData(e).GetFinishedChallengeCount();
  }
  GetPermanentFinishedChallengeCount(e) {
    e = this.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap(e);
    if (e === undefined) {
      return 0;
    }
    let t = 0;
    for (const r of e.values()) {
      for (const a of r) {
        if (this.GetPermanentChallengeStateById(a) === 2) {
          t++;
        }
      }
    }
    return t;
  }
  GetPermanentAllChallengeCount(e) {
    e = this.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap(e);
    if (e === undefined) {
      return 0;
    }
    let t = 0;
    for (const r of e.values()) {
      t += r.length;
    }
    return t;
  }
  GetMapUnlock(e) {
    e = this.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap(e);
    if (!e) {
      return false;
    }
    let t = false;
    for (const r of e.values()) {
      for (const a of r) {
        if (this.GetPermanentChallengeStateById(a) !== 0) {
          t = true;
          break;
        }
      }
    }
    return t;
  }
  GetRepeatChallengeOpen(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e);
    return !!t.IsReChallenge && (!t.EnableCheckReChallengeFunc || ((t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(t.ActivityId).FuncOpenChallenge.get(e)) === undefined ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 87, "复刷挑战未配置功能开关", ["ChallengeId", e]), false) : ModelManager_1.ModelManager.FunctionModel.IsOpen(t)));
  }
  GetFirstRewardListByChallengeId(e) {
    var t;
    var r;
    var a = [];
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e).FirstPassDropId;
    for ([t, r] of DropPackageById_1.configDropPackageById.GetConfig(e).DropPreview) {
      var n = [{
        ItemId: t,
        IncId: 0
      }, r];
      a.push(n);
    }
    return a;
  }
  GetRewardListByChallengeId(e) {
    var t = [];
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e);
    var e = this.GetChallengeStateById(e);
    if (r.IsReChallenge || e === 2) {
      for (var [a, n] of r.PassDropId) {
        a = [{
          ItemId: a,
          IncId: 0
        }, n];
        t.push(a);
      }
    } else {
      var o;
      var i;
      var e = r.FirstPassDropId;
      for ([o, i] of DropPackageById_1.configDropPackageById.GetConfig(e)?.DropPreview ?? new Map()) {
        var s = [{
          ItemId: o,
          IncId: 0
        }, i];
        t.push(s);
      }
    }
    return t;
  }
  GetPermanentRewardListByChallengeId(e) {
    var t = [];
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e);
    var e = this.GetPermanentChallengeStateById(e);
    if (r.IsReChallenge && e === 2) {
      for (var [a, n] of r.PassDropId) {
        a = [{
          ItemId: a,
          IncId: 0
        }, n];
        t.push(a);
      }
    } else {
      var o;
      var i;
      var e = r.FirstPassDropId;
      for ([o, i] of DropPackageById_1.configDropPackageById.GetConfig(e)?.DropPreview ?? new Map()) {
        var s = [{
          ItemId: o,
          IncId: 0
        }, i];
        t.push(s);
      }
    }
    return t;
  }
  GetMasterLevelData(e) {
    var t = this.GetMasterLevelMax(e);
    var r = [];
    for (const n of this.GetPhantomBattleMasterLevelConfigList(e)) {
      var a = {
        Level: n.Level,
        ExpLevel: n.ExpNeed,
        ExpNext: n.ExpNext,
        IsMax: n.Level >= t
      };
      r.push(a);
    }
    return r;
  }
  GetMasterLevelDescData(e, t) {
    var r = this.GetMasterLevelConfig(e, t).Desc;
    var a = this.GetMasterLevel(t);
    var n = [];
    for (const i of r) {
      var o = {
        Level: e,
        StringId: i,
        IsDone: e <= a
      };
      n.push(o);
    }
    return n;
  }
  GetMasterLevelMax(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelConfigByActivityId(e).length;
  }
  UpdateMasterLevelByConfigIds(e, t) {
    const r = this.GetPhantomArenaActivityData(t);
    e.forEach(e => {
      r.UpdateMasterLevelByConfigId(e);
    });
  }
  GetCardItemIdInBattleResult(e) {
    var t = [];
    for (const r of e.DS_) {
      if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r.L8n)?.ItemType === 60009) {
        t.push(r.L8n);
      }
    }
    return t;
  }
  GetRewardItemDataInBattleResult(e, t) {
    var r;
    var a = [];
    if (e) {
      for (const n of e.DS_) {
        if (!this.Mwu(n.L8n, t)) {
          r = new RewardItemData_1.RewardItemData(n.L8n, n.m9n);
          a.push(r);
        }
      }
    }
    return a;
  }
  Mwu(e, t) {
    var r = this.GetExpItemId(t);
    var t = this.GetPointsItemId(t);
    return e === r || e === t;
  }
  GetPermanentIsDifficultCompleted(e, t) {
    e = this.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap(e)?.get(t);
    if (!e) {
      return false;
    }
    for (const r of e) {
      if (this.GetPermanentChallengeStateById(r) !== 2) {
        return false;
      }
    }
    return true;
  }
  GetPermanentDefaultChallengeIdAndMarkId(t) {
    if (t !== undefined) {
      return this.rPg(t);
    }
    t = ModelManager_1.ModelManager.WorldMapModel?.WorldMapId;
    if (t) {
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleMapParamByMapId(t);
      if (t) {
        for (const e of t) {
          const a = this.rPg(e.Id);
          if (a) {
            return a;
          }
        }
      }
    }
    t = this.GetPermanentPhantomArenaActivityData()?.GetAllChallengeIds();
    if (t) {
      let e = undefined;
      for (const n of t) {
        e = {
          ChallengeId: n,
          MarkId: ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(n).MarkId
        };
        var r = this.GetPermanentChallengeStateById(n);
        if (r === 1 || r === 0) {
          return e;
        }
      }
      return e;
    }
  }
  rPg(e) {
    let t = undefined;
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallengeByMapId(e);
    if (e) {
      for (const a of e) {
        var r = a.MarkId;
        t = {
          ChallengeId: a.Id,
          MarkId: r
        };
        var r = this.GetPermanentChallengeStateById(a.Id);
        if (r === 0 || r === 1) {
          break;
        }
      }
      return t;
    }
  }
  GetPermanentSortedDifficultList(e) {
    var e = this.GetPermanentPhantomArenaActivityData()?.GetDifficultChallengeIdsMap(e);
    if (e) {
      (e = Array.from(e.keys())).sort((e, t) => e - t);
      return e;
    }
  }
  GetCollectTabDataList(e) {
    e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(e);
    const t = [];
    e.forEach(e => {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(e.FunctionId)) {
        t.push(e);
      }
    });
    return t;
  }
  GetDetailViewCardData(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    var r = this.IsCardUnlock(e);
    var a = this.IsCardOutlookUnlock(e);
    var n = t.InitAttack;
    return {
      IsLock: !r,
      CardId: e,
      Cost: t.Cost,
      Attack: n.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility) ?? 0,
      Life: n.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility) ?? 0,
      Element: t.Element,
      CardFaceType: this.GetCardFaceType(e),
      CardFaceTexturePath: t.CardFaceTexture,
      CardSpineData: this.CreateCardSpineData(e),
      OutlookUnlocked: a,
      CardType: t.Type
    };
  }
  GetCollectCardDataListByIdList(e) {
    var t = [];
    for (const o of e) {
      var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(o);
      var a = r.InitAttack;
      var n = this.IsCardOutlookUnlock(o);
      var a = {
        CardId: o,
        CardFaceTexturePath: r.CardFaceTexture,
        Cost: r.Cost,
        Element: r.Element,
        Attack: a.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility) ?? 0,
        Life: a.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility) ?? 0,
        IsLocked: !this.IsCardUnlock(o),
        OutlookUnlocked: n,
        CardFaceType: this.GetCardFaceType(o),
        CardSpineData: this.CreateCardSpineData(o),
        CardType: r.Type
      };
      t.push(a);
    }
    return t;
  }
  GetCollectCardDataList(e, t = -1, r = false) {
    var a;
    var n;
    var o;
    var i = [];
    for (const s of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardByActivityId(e)) {
      if (s.ActivityId === e && (!s.IsNpcCard || !!r) && (t === -1 || s.Element === t)) {
        a = s.Id;
        o = s.InitAttack;
        n = this.IsCardOutlookUnlock(a);
        o = {
          CardId: a,
          CardFaceTexturePath: s.CardFaceTexture,
          Cost: s.Cost,
          Element: s.Element,
          Attack: o.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility) ?? 0,
          Life: o.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility) ?? 0,
          IsLocked: !this.IsCardUnlock(a),
          CardSpineData: this.CreateCardSpineData(a),
          CardFaceType: this.GetCardFaceType(a),
          OutlookUnlocked: n,
          CardType: s.Type
        };
        i.push(o);
      }
    }
    i.sort(this.xvg);
    return i;
  }
  GetCollectCardElementCount(e) {
    var e = this.GetCollectCardDataList(e);
    var t = new Map();
    for (const n of e) {
      var r = t.get(n.Element) ?? [0, 0];
      var a = this.IsCardUnlock(n.CardId);
      t.set(n.Element, [r[0] + (a ? 1 : 0), r[1] + 1]);
    }
    return t;
  }
  GetCollectCardElementDataList(e) {
    var t;
    var r;
    var a;
    var n = this.GetCollectCardElementCount(e);
    var o = [];
    var i = this.IsNewPhantomArenaActivity(e);
    let s = undefined;
    if (i) {
      s = {
        ElementId: -1,
        Count: 0,
        All: 0
      };
    }
    for ([t, r] of n) {
      if ((t !== 0 || i) && (a = {
        ElementId: t,
        Count: r[0],
        All: r[1]
      }, o.push(a), s)) {
        s.Count += r[0];
        s.All += r[1];
      }
    }
    o.sort(this.itu);
    if (s) {
      o.unshift(s);
    }
    return o;
  }
  GetCollectBadgeIdList(e) {
    var t;
    var r = [];
    for (const a of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleBadge()) {
      if (a.ActivityId === e) {
        t = a.Id;
        r.push(t);
      }
    }
    return r;
  }
  GetCollectBadgeGroupMap(e) {
    const t = this.GetCollectBadgeIdList(e);
    var r = new Map();
    for (const o of t) {
      var a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(o).GroupId;
      var n = r.get(a) ?? [];
      n.push(o);
      r.set(a, n);
    }
    for (const [, t] of r) {
      t.sort(this.XOu);
    }
    return r;
  }
  GetCollectBadgeGroupDataList(e) {
    var t;
    var r;
    var a = [];
    for ([t, r] of this.GetCollectBadgeGroupMap(e)) {
      var n = {
        GroupId: t,
        BadgeIdList: r
      };
      a.push(n);
    }
    return a;
  }
  GetCardUnlockCount(e) {
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardByActivityId(e)) {
      if (r.ActivityId === e && !r.IsNpcCard && this.IsCardUnlock(r.Id)) {
        t += 1;
      }
    }
    return t;
  }
  GetCardAllCount(e) {
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardByActivityId(e)) {
      if (r.ActivityId === e && !r.IsNpcCard) {
        t += 1;
      }
    }
    return t;
  }
  GetBadgeUnlockCount(e) {
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleBadge()) {
      if (this.IsBadgeUnlock(r.Id) && r.ActivityId === e) {
        t += 1;
      }
    }
    return t;
  }
  GetBadgeAllCount(e) {
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleBadge()) {
      if (r.ActivityId === e) {
        t += 1;
      }
    }
    return t;
  }
  GetCardRewardStateById(e) {
    var t = this.GetCardRewardInfoById(e);
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRewardById(e).ActivityId;
    if (t && this.GetCardUnlockCount(e) >= t.bg1) {
      if (t.Rg1) {
        return 3;
      } else {
        return 2;
      }
    } else {
      return 1;
    }
  }
  GetCardRewardNeedCountById(e) {
    return this.GetCardRewardInfoById(e).bg1;
  }
  GetCardRewardProgress(e) {
    var t = [];
    for (const a of this.GetCardRewardConfigList(e)) {
      var r = this.GetCardRewardNeedCountById(a);
      t.push(r);
    }
    e = this.GetCardUnlockCount(e);
    return this.ufu(t, e);
  }
  GetCardRewardPopupTupleData(e) {
    var t;
    var r;
    var a = [];
    var n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRewardById(e).DropId;
    var n = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(n).DropPreview;
    var o = this.GetCardRewardInfoById(e).Rg1;
    for ([t, r] of n) {
      var i = {
        Id: t,
        Num: r,
        Taken: o
      };
      a.push(i);
    }
    return a;
  }
  GetBadgeRewardNeedCountById(e) {
    return this.GetBadgeRewardInfoById(e).bg1;
  }
  GetBadgeRewardStateById(e) {
    var t = this.GetBadgeRewardInfoById(e);
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeRewardById(e).ActivityId;
    if (t && this.GetBadgeUnlockCount(e) >= t.bg1) {
      if (t.Rg1) {
        return 3;
      } else {
        return 2;
      }
    } else {
      return 1;
    }
  }
  ufu(t, r) {
    var e;
    var a;
    if (t.length <= 0 || r === 0) {
      return 0;
    }
    let n = 0;
    for (let e = 0; e < t.length; e++) {
      if (!(t[e] <= r)) {
        break;
      }
      n = e + 1;
    }
    if (n >= t.length) {
      return 1;
    } else {
      e = t[n];
      a = n > 0 ? t[n - 1] : 0;
      return 1 / t.length * (n + (r - a) / (e - a));
    }
  }
  GetBadgeRewardProgress(e) {
    var t = [];
    for (const a of this.GetBadgeRewardConfigList(e)) {
      var r = this.GetBadgeRewardNeedCountById(a);
      t.push(r);
    }
    e = this.GetBadgeUnlockCount(e);
    return this.ufu(t, e);
  }
  GetBadgeRewardPopupTupleData(e) {
    var t;
    var r;
    var a = [];
    var n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeRewardById(e).DropId;
    var n = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(n).DropPreview;
    var o = this.GetBadgeRewardInfoById(e).Rg1;
    for ([t, r] of n) {
      var i = {
        Id: t,
        Num: r,
        Taken: o
      };
      a.push(i);
    }
    return a;
  }
  GetDetailViewTabDataList() {
    return [{
      Index: 0,
      NameId: "PhantomBattle_1013"
    }, {
      Index: 1,
      NameId: "PhantomBattle_1014"
    }];
  }
  GetDetailViewDetailItemData(e, t) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    if (e.Type === 3) {
      return this.GetFieldCardDetailItemData(e, t);
    } else {
      return this.GetNormalCardDetailItemData(e);
    }
  }
  j4m(e) {
    if (e.DurableSkillId > 0) {
      return {
        Desc: e.DurableSkillDescription,
        Params: e.DurableSkillDescriptionParams
      };
    }
  }
  GetFieldCardDetailItemData(e, t) {
    var r = t?.GetFieldCardSlot()?.CardId === e.Id;
    var a = r ? t?.GetFieldCardConditionCurNum() : 0;
    var r = r ? t?.GetFieldCardConditionTargetNum() : 0;
    var t = r <= a && r !== 0 ? e.FieldConditionDesc : e.FieldUnlockConditionDesc;
    var a = {
      CurrentProgress: a,
      MaxProgress: r,
      Icon: e.FieldConditionIcon,
      ConditionDesc: t
    };
    var r = e.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_MaxEffectCount) ?? 0;
    var t = e.CountSkill > 0 ? {
      CurrentEffectCount: 0,
      TotalEffectCount: r
    } : undefined;
    var r = {
      Desc: e.CountSkill > 0 ? e.CountSkillDescription : e.CardEffectDescription,
      Params: e.CountSkill > 0 ? e.CountSkillDescriptionParams : e.CardEffectDescriptionParams,
      FieldData: {
        OutData: a
      },
      EffectCountData: t
    };
    var a = this.j4m(e);
    return {
      Name: e.Name,
      ActiveSkillData: e.DurableSkillId > 0 ? a : undefined,
      PassiveSkillData: r
    };
  }
  $4m(e) {
    var t;
    if (e.CountSkill > 0) {
      t = e.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_MaxEffectCount) ?? 0;
      return {
        Desc: e.CountSkillDescription,
        Params: e.CountSkillDescriptionParams,
        EffectCountData: {
          CurrentEffectCount: 0,
          TotalEffectCount: t
        }
      };
    }
  }
  V4m(e) {
    e = e.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_DurableMax) ?? 0;
    if (e > 0) {
      return {
        DurationDesc: e + "/" + e
      };
    }
  }
  GetNormalCardDetailItemData(e) {
    var t = e.InitAttack;
    var r = [];
    for (const l of e.CardFactorId) {
      var a = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData();
      a.FactorConfigId = l;
      a.IsActive = false;
      r.push(a);
    }
    var t = {
      Cost: e.Cost,
      Attack: t.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility) ?? 0,
      Life: t.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility) ?? 0
    };
    var n = {
      Description: e.CardEffectDescription,
      DescriptionParams: e.CardEffectDescriptionParams
    };
    var o = this.V4m(e);
    var i = this.j4m(e);
    var s = this.$4m(e);
    var f = e.Type === 2;
    return {
      Name: e.Name,
      AttributeData: f ? undefined : t,
      CardDescriptionData: f ? undefined : n,
      FactorDataList: r,
      DurationData: o,
      ActiveSkillData: i,
      PassiveSkillData: s
    };
  }
  GetDetailViewEntryData(e) {
    var t = [];
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    t.push(...e.EntryIdList);
    var e = e.CardFactorId;
    for (const a of e) {
      var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(a).EntryId;
      if (r > 0 && !t.includes(r)) {
        t.push(r);
      }
    }
    return t;
  }
  UpdateCardRewardByNotify(e) {
    var e = e.Cg1;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRewardById(e[0].Pg1).ActivityId;
    this.GetPhantomArenaActivityData(t).UpdateCardReward(e);
  }
  UpdateCardRewardByIds(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRewardById(e[0]).ActivityId;
    this.GetPhantomArenaActivityData(t).UpdateCardRewardByIds(e);
  }
  AddBadgeListByNotify(e) {
    var e = e.mg1;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(e[0].Ig1).ActivityId;
    this.GetPhantomArenaActivityData(t).AddBadgeListByNotify(e);
  }
  UpdateBadgeRewardByNotify(e) {
    var e = e.fg1;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeRewardById(e[0].Tg1).ActivityId;
    this.GetPhantomArenaActivityData(t).UpdateBadgeReward(e);
  }
  UpdateBadgeRewardByIds(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeRewardById(e[0]).ActivityId;
    this.GetPhantomArenaActivityData(t).UpdateBadgeRewardByIds(e);
  }
  GetCardRewardConfigList(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRewardIdList(e);
  }
  GetBadgeRewardConfigList(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeRewardIdList(e);
  }
  GetCardRewardInfoById(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRewardById(e).ActivityId;
    return this.GetPhantomArenaActivityData(t).GetCardRewardInfoById(e);
  }
  GetBadgeRewardInfoById(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeRewardById(e).ActivityId;
    return this.GetPhantomArenaActivityData(t).GetBadgeRewardInfoById(e);
  }
  GetBadgeSkillByGroupId(e) {
    var t = [];
    for (const a of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeGroupById(e).PhantomBattleSkillId) {
      var r = {
        GroupId: e,
        SkillId: a
      };
      t.push(r);
    }
    return t;
  }
  GetBadgeCollectCountByGroupId(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeGroupById(e).ActivityId;
    var t = this.GetCollectBadgeGroupMap(t).get(e) ?? [];
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeGroupById(e);
    let r = 0;
    for (const a of t) {
      if (this.IsBadgeUnlock(a)) {
        r += 1;
      }
    }
    return {
      Now: r,
      Need: e.Num,
      All: t.length
    };
  }
  UpdateTaskInfo(e) {
    var e = e.E$s;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(e[0].s5n).ActivityId;
    this.GetPhantomArenaActivityData(t).UpdateTaskInfo(e);
  }
  UpdateTaskByIds(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(e[0]).ActivityId;
    this.GetPhantomArenaActivityData(t).UpdateTaskByIdList(e);
  }
  GetTaskTabList(e) {
    var t = [];
    for (const r of this.GetPhantomArenaActivityData(e).GetTaskTabMap()) {
      if (r[1].length > 0) {
        t.push(r[0]);
      }
    }
    t.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskTabConfigById(e);
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskTabConfigById(t).Order - e.Order;
    });
    return t;
  }
  GetTaskDataByTabId(e, t) {
    var r = this.GetPhantomArenaActivityData(t).GetTaskTabMap();
    var a = this.GetPhantomArenaActivityData(t).GetTaskMap();
    if (!r.get(e)) {
      return [];
    }
    var r = r.get(e) ?? [];
    var n = [];
    var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(t).ShopItemId;
    for (const l of r) {
      var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(l);
      var s = i.NormalDropId;
      var s = this.GetPhantomArenaActivityData(t).GetPreviewReward(s);
      if (this.IsInLimitTime(t)[0]) {
        let e = false;
        for (const g of s) {
          if (g[0].ItemId === o) {
            e = true;
            g[1] += i.LimitShopItemNum;
          }
        }
        if (!e) {
          f = [{
            IncId: 0,
            ItemId: o
          }, i.LimitShopItemNum];
          s.unshift(f);
        }
      }
      var f = {
        TaskConfig: a.get(l),
        Reward: s
      };
      n.push(f);
    }
    return n;
  }
  GetSpecialTask(e) {
    return this.GetPhantomArenaActivityData(e).GetSpecialTask();
  }
  GetAllCanReceiveTaskIdsByTabId(e, t) {
    return this.GetPhantomArenaActivityData(e).GetAllCanReceiveTaskIdsByTabId(t);
  }
  GetAllTaskProgress(e) {
    var e = this.GetPhantomArenaActivityData(e).GetTaskMap();
    var t = {
      Current: 0,
      Target: e.size
    };
    for (const r of e.values()) {
      if (r.H6n >= Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) {
        t.Current += 1;
      }
    }
    return t;
  }
  GetAllTaskSecondCurrencyNum(e) {
    var e = this.GetPhantomArenaActivityData(e).GetTaskMap();
    var t = ConfigManager_1.ConfigManager.GachaConfig?.SecondCurrency();
    let r = 0;
    for (const i of e.keys()) {
      var a = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetTaskConfigById(i)?.NormalDropId;
      if (a !== undefined) {
        a = ConfigManager_1.ConfigManager.RewardConfig?.GetDropPackage(a)?.DropPreview;
        if (a) {
          for (var [n, o] of a) {
            if (n === t) {
              r += o;
              break;
            }
          }
        }
      }
    }
    return r;
  }
  GetCacheShopOpen(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceShopRefresh) ?? "";
    if (e.length < t.length) {
      this.SetCacheShopOpen(e);
      return true;
    } else {
      return t === e;
    }
  }
  SetCacheShopOpen(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceShopRefresh, e);
  }
  GetCurrencyId(e) {
    return this.GetPhantomArenaActivityData(e).GetCurrencyId();
  }
  GetShopList(e) {
    e = this.GetPhantomArenaActivityData(e).GetShopId();
    if (e) {
      return ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e);
    } else {
      return [];
    }
  }
  OnShopViewOpen(e) {
    var e = this.GetPhantomArenaActivityData(e).GetShopId();
    if (e) {
      e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e);
      e = this.GetCurUnlockShopData(e);
      this.SetCacheShopOpen(e.toString());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaShopOpen);
    }
  }
  IsInLimitTime(e, t) {
    return this.GetPhantomArenaActivityData(e).GetIsInLimitTime(t);
  }
  IsRoleUnlock(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e).ActivityId;
    return this.GetPhantomArenaActivityData(t).IsRoleUnlock(e);
  }
  IsRoleReward(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e).ActivityId;
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(t);
    if (r.MainRoleList.includes(e)) {
      for (const a of r.MainRoleList) {
        if (this.GetPhantomArenaActivityData(t).IsRoleReward(a)) {
          return true;
        }
      }
    }
    return this.GetPhantomArenaActivityData(t).IsRoleReward(e);
  }
  IsMainRole(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e).ActivityId;
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(t).MainRoleList.includes(e);
  }
  GetCardRoleList(e) {
    var t = [];
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRoleByActivityId(e);
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    for (const a of e) {
      if (!a.IsTrail) {
        if (a.Type === 0 || a.Type === 2 && r === 0 || a.Type === 1 && r === 1) {
          t.push(a.Id);
        }
      }
    }
    return t;
  }
  CreateCardDataList(e) {
    var t = [];
    for (const a of e) {
      var r = new PhantomCardData_1.PhantomCardData();
      r.InitData(a);
      t.push(r);
    }
    return t;
  }
  GetPhantomArenaActivityRedDot(e) {
    return this.GetMasterLevelRewardRedDot(e) || this.CheckTaskRedDot(e) || this.CheckShopRedDot(e) || this.GetRoleRewardRedDot(e) || this.GetCardRewardRedDot(e) || this.GetBadgeRewardRedDot(e) || this.GetGymRedDot(e);
  }
  GetPermanentPhantomArenaActivityRedDot(e) {
    return this.CheckTaskRedDot(e) || this.GetRoleRewardRedDot(e) || this.GetCardRewardRedDot(e) || this.GetChallengeUnlockRedDot(e) || this.GetMapUnlockRedDot();
  }
  GetChallengeUnlockRedDot(e) {
    if (this.GetActivityUnlock(e)) {
      e = this.GetPermanentPhantomArenaActivityData()?.GetAllChallengeIds();
      if (e) {
        for (const t of e) {
          if (this.GetChallengeUnlockRedDotById(t)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  GetChallengeUnlockRedDotById(e) {
    var t;
    return this.GetPermanentChallengeStateById(e) !== 0 && !!(t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaChallengeUnlockRedDotCheck)) && !!t.has(e) && !t.get(e);
  }
  GetMapUnlockRedDot() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaMapUnlockRedDotCheck);
    if (e) {
      for (const t of e.values()) {
        if (t) {
          return true;
        }
      }
    }
    return false;
  }
  GetMapUnlockRedDotById(e) {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaMapUnlockRedDotCheck)?.get(e) ?? false;
  }
  SaveChallengeUnlockRedDotById(e, t) {
    let r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaChallengeUnlockRedDotCheck);
    (r = r || new Map()).set(e, t);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaChallengeUnlockRedDotCheck, r);
  }
  SaveMapUnlockRedDotById(e, t) {
    var r;
    if (e !== 1) {
      r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaMapUnlockRedDotCheck) ?? new Map();
      if (t) {
        if (!r.has(e)) {
          r.set(e, true);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaMapUnlockUpdate, e);
        }
      } else if (r?.has(e)) {
        r.set(e, false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaMapUnlockUpdate, e);
      }
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaMapUnlockRedDotCheck, r);
    }
  }
  R8u(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
  }
  GetPhantomArenaButtonRedDot(e) {
    this.R8u(e);
    return this.GetRoleRewardRedDot(e) || this.GetCardRewardRedDot(e) || this.GetBadgeRewardRedDot(e) || this.GetGymRedDot(e);
  }
  GetGymRedDot(e) {
    if (this.GetActivityUnlock(e)) {
      for (const t of this.GetPhantomBattleGymLevelList(e)) {
        if (this.GetGymRedDotById(t, e)) {
          return true;
        }
      }
    }
    return false;
  }
  GetGymRedDotById(e, t) {
    var r;
    return !this.IsGymLock(e, t) && ((r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymRedDotCheck)) && r.has(t) ? !r.get(t).includes(e) : ((r = new Map()).set(t, []), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymRedDotCheck, r), false));
  }
  SetGymRedDotChecked(e, t) {
    var r;
    var a = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymRedDotCheck);
    if (a && a.has(t)) {
      if (!(r = a.get(t)).includes(e)) {
        r.push(e);
        a.set(t, r);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymRedDotCheck, a);
      }
    } else {
      (r = new Map()).set(t, [e]);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymRedDotCheck, r);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate);
  }
  GetRoleRewardRedDot(e) {
    if (this.GetActivityUnlock(e)) {
      for (const a of ModelManager_1.ModelManager.PhantomArenaModel.GetCardRoleList(e)) {
        var t = this.GetPhantomArenaActivityData(e).IsRoleUnlock(a);
        var r = this.GetPhantomArenaActivityData(e).IsRoleReward(a);
        if (t && !r) {
          return true;
        }
      }
    }
    return false;
  }
  GetMasterLevelRewardRedDot(e) {
    if (this.GetActivityUnlock(e) && this.GetMasterExpNow(e) !== 0) {
      for (const r of this.GetPhantomBattleMasterLevelConfigList(e)) {
        var t = r.Level;
        if (this.GetMasterLevelRewardCanTake(t, e)) {
          return true;
        }
      }
    }
    return false;
  }
  CheckTaskRedDot(e) {
    var t = this.GetPhantomArenaActivityData(e);
    if (t && (this.IsInLimitTime(e)[0] || t.TimeType === 1)) {
      var r = this.GetPhantomArenaActivityData(e).GetTaskMap();
      for (const a of this.GetPhantomArenaActivityData(e).GetTaskTabMap()) {
        for (const n of a[1]) {
          if (r.get(n).H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) {
            return true;
          }
        }
      }
    }
    return false;
  }
  CheckTaskRedDotByTab(e, t) {
    var r = this.GetPhantomArenaActivityData(t).GetTaskMap();
    var t = this.GetPhantomArenaActivityData(t).GetTaskTabMap();
    if (t.has(e)) {
      for (const a of t.get(e)) {
        if (r.get(a).H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) {
          return true;
        }
      }
    }
    return false;
  }
  CheckShopRedDot(e) {
    var t;
    return !!this.GetActivityUnlock(e) && !!this.IsInLimitTime(e)[0] && !!(t = (e = this.GetPhantomArenaActivityData(e))?.GetShopId() ?? undefined) && !!e?.IsUnLock() && !(e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(t), t = this.GetCurUnlockShopData(e), this.GetCacheShopOpen(t.toString()));
  }
  GetCurUnlockShopData(e) {
    var t = [];
    for (const a of e) {
      var r = a.GetGoodsData();
      if (r.GetIfCanBuy() && (r.BuyLimit === 0 || r.BoughtCount < r.BuyLimit)) {
        t.push(r.Id);
      }
    }
    return t;
  }
  GetCardRewardRedDot(e) {
    if (this.GetActivityUnlock(e)) {
      var t = this.GetCardRewardConfigList(e);
      var r = this.GetCardUnlockCount(e);
      for (const n of t) {
        var a = this.GetPhantomArenaActivityData(e).GetCardRewardInfoById(n);
        if (a && r >= a.bg1 && !a.Rg1) {
          return true;
        }
      }
    }
    return false;
  }
  GetBadgeRewardRedDot(e) {
    if (this.GetActivityUnlock(e)) {
      var t = this.GetBadgeRewardConfigList(e);
      var r = this.GetBadgeUnlockCount(e);
      for (const n of t) {
        var a = this.GetPhantomArenaActivityData(e).GetBadgeRewardInfoById(n);
        if (a && r >= a.bg1 && !a.Rg1) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.PhantomArenaModel = PhantomArenaModel;
//# sourceMappingURL=PhantomArenaModel.js.map