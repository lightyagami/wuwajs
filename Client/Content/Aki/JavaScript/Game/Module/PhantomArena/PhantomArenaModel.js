"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData"),
  CardDetailFactorDescItem_1 = require("./Common/CardDetail/CardDetailFactorDescItem"),
  PhantomArenaDefine_1 = require("./PhantomArenaDefine"),
  DeckInfo_1 = require("./Prepare/DeckBuilder/DeckInfo");
class PhantomArenaModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.ActivityId = 0, this.RoleUnlockQueue = [], this.BadgeUnlockQueue = [], this.CardUnlockQueue = [], this.CardOutlookUnlockQueue = [], this.EntranceOpenQueue = !1, this.BZ1 = (e, t) => {
      return e.ElementId - t.ElementId
    }, this.Nfu = (e, t) => {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(e), t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(t);
      return e.SortIndex - t.SortIndex
    }
  }
  GetPhantomArenaActivityData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.ActivityId)
  }
  CanCardUnlock(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    if (!e.EnableBuy) return !1;
    for (const t of e.UnlockConsumeItems)
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.ItemId) < t.Count) return !1;
    return !0
  }
  IsCardUnlock(e) {
    return this.GetPhantomArenaActivityData().IsCardUnlock(e)
  }
  IsCardOutlookUnlock(e) {
    return this.GetPhantomArenaActivityData().IsCardOutlookUnlock(e)
  }
  IsBadgeUnlock(e) {
    return this.GetPhantomArenaActivityData().IsBadgeUnlock(e)
  }
  OnCardOutlookUnlock(e) {
    this.GetPhantomArenaActivityData().OnCardOutlookUnlock(e)
  }
  AddCardListByNotify(e) {
    e = e.Qf1;
    this.GetPhantomArenaActivityData().AddCardListByNotify(e)
  }
  AddRoleByNotify(e) {
    var e = e.Xf1,
      t = this.GetPhantomArenaActivityData();
    for (const r of e) t.AddRoleInfo(r)
  }
  OnRoleReward(e) {
    this.GetPhantomArenaActivityData().OnRoleReward(e)
  }
  UpdateDeckList(e) {
    this.GetPhantomArenaActivityData().UpdateProtocolDeckInfoList(e)
  }
  AddProtocolDeckInfo(e) {
    this.GetPhantomArenaActivityData().AddProtocolDeckInfo(e)
  }
  DeleteProtocolDeckInfo(e) {
    this.GetPhantomArenaActivityData().DeleteProtocolDeckInfo(e)
  }
  UpdateProtocolDeckInfo(e) {
    this.GetPhantomArenaActivityData().UpdateProtocolDeckInfo(e)
  }
  GetDustItemId() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.ActivityId).DustItemId
  }
  GetExpItemId() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.ActivityId).ExpItemId
  }
  GetPointsItemId() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.ActivityId).Integration
  }
  FilterCardList(e, t) {
    var r, a = [],
      o = t.CostFilter,
      n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardFilter(o).CostList;
    for (const i of e) !t.IncludeLocked && i.IsLocked || (0 === (r = t.ElementFilter) || PhantomArenaDefine_1.cardTabTypeToFilterElementList[r].includes(i.Element)) && n.includes(i.Cost) && a.push(i);
    return a
  }
  SortCardSlotList(e, r) {
    const a = PhantomArenaDefine_1.cardSlotSortTypeToSortFunc[r.SortType];
    e.sort((e, t) => this.CompareCardSlot(e, t, a, r.IsAscending))
  }
  CompareCardSlot(e, t, r, a) {
    let o = r(e, t);
    return (o = 0 === o ? (0, PhantomArenaDefine_1.cardSlotDefaultSortFunc)(e, t) : o) * (a ? 1 : -1)
  }
  GetCardFaceType(e) {
    return this.IsCardOutlookUnlock(e) && this.CheckCardSpineConfigValid(e) ? 1 : 0
  }
  CheckCardSpineConfigValid(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    return !StringUtils_1.StringUtils.IsEmpty(e.SpineAtlas) && !StringUtils_1.StringUtils.IsEmpty(e.SpineSkeleton)
  }
  CreateCardSpineData(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    return {
      CardSpineAtlasPath: e.SpineAtlas,
      CardSpineSkeletonPath: e.SpineSkeleton,
      AnimationName: "idle",
      IsLoop: !0
    }
  }
  GetChallengeData(e) {
    return this.GetPhantomArenaActivityData().GetChallengeInfoById(e)
  }
  GetLastUsedCardRoleId() {
    return this.GetPhantomArenaActivityData().GetLastUsedCardRoleId()
  }
  SetLastUsedCardDeckServerId(e) {
    this.GetPhantomArenaActivityData().SetLastUsedDeckServerId(e)
  }
  GetLastUsedCardDeckServerId() {
    return this.GetPhantomArenaActivityData().GetLastUsedDeckServerId()
  }
  GetDeckList() {
    return this.GetPhantomArenaActivityData().GetClientDeckInfoList()
  }
  GetDeckByDeckId(e) {
    return this.GetPhantomArenaActivityData().GetClientDeckInfo(e)
  }
  CreateEditableDeckListFromProtocolData() {
    return this.GetPhantomArenaActivityData().CreateDeckInfoListFromProtocol()
  }
  CreateDeckInfoFromDeckConfigId(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetCardListByDeckConfigId(e),
      r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetDeckConfigInfo(e),
      a = new DeckInfo_1.DeckInfo,
      o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Name);
    a.SetDeckName(o), a.SetDeckConfigId(e), a.SetElementCountLimit(r.ElementCountLimit), a.SetCoreCardCountLimit(r.CoreCardCountLimit), a.SetNormalCardCountLimit(r.NormalCardCountLimit), a.SetCoreCost(ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost());
    for (const s of t) {
      var n = s.CardId,
        i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(n),
        i = {
          CardId: n,
          Cost: i.Cost,
          Element: i.Element,
          MaxCount: i.CardGroupNum,
          AddCount: s.Num
        },
        i = a.AddCard(i);
      0 !== i && Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "从配置表中创建卡组时，添加卡牌失败", ["deckConfigId", e], ["cardId", n], ["result", i])
    }
    return a
  }
  CreateEmptyTempDeckInfo() {
    var e = this.GetPhantomArenaActivityData().CreateClientDeckInfo(),
      t = (e.SetDeckServerId(PhantomArenaDefine_1.DECK_ID_EMPTY_TEMP), MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PhantomBattle_1038"));
    return e.SetDeckName(t), e
  }
  GetUnlockCardCountInDeck(e) {
    let t = 0;
    for (const a of e.GetCardSlotList()) {
      var r = a.CardId;
      this.IsCardUnlock(r) && (t += a.Count)
    }
    return t
  }
  GetPhantomBattleGymLevelList(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleGymConfig(this.ActivityId),
      r = new Array;
    for (const a of t) e && a.IfRepeat || r.push(a.Level);
    return r
  }
  GetPhantomBattleGymConfigByLevel(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleGymConfigByLevel(this.ActivityId, e)
  }
  GetChallengeStateById(e) {
    var t = this.GetPhantomArenaActivityData().GetChallengeInfoById(e);
    return !t || !t.K6n || ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e).IsReChallenge && !this.GetRepeatChallengeOpen(e) ? 0 : t.Jf1 ? 2 : 1
  }
  UpdateChallengeInfoByNotify(e) {
    this.GetPhantomArenaActivityData().UpdateChallengeInfoList(e.jf1)
  }
  UpdateChallengeInfoBySettleResult(e, t, r) {
    this.GetPhantomArenaActivityData().UpdateChallengeInfoById(e, t, r)
  }
  IsChallengeLock(e) {
    return 0 === this.GetChallengeStateById(e)
  }
  IsGymLock(e) {
    return 0 === (this.GetChallengeStateListByGymLevel(e)[0]?.State ?? 0)
  }
  IsGymUnlockChecked(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymCheck);
    return t && t.has(this.ActivityId) ? t.get(this.ActivityId).includes(e) : ((t = new Map).set(this.ActivityId, []), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymCheck, t), !1)
  }
  SetGymUnlockChecked(e) {
    var t, r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymCheck);
    r && r.has(this.ActivityId) ? (t = r.get(this.ActivityId)).includes(e) || (t.push(e), r.set(this.ActivityId, t), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymCheck, r)) : ((t = new Map).set(this.ActivityId, [e]), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymCheck, t))
  }
  UpdateMasterInfoByNotify(e) {
    this.GetPhantomArenaActivityData().UpdateMasterInfo(e.Hf1)
  }
  GetMasterInfo() {
    return this.GetPhantomArenaActivityData().GetMasterInfo()
  }
  GetMasterLevel() {
    return this.GetPhantomArenaActivityData().GetMasterLevel()
  }
  GetMasterTitleId() {
    return this.GetPhantomArenaActivityData().GetMasterTitleId()
  }
  GetMasterTitleIdByLevel(e) {
    return this.GetMasterLevelConfig(e).TitleId
  }
  GetMasterLevelConfig(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelConfigByLevel(this.ActivityId, e)
  }
  GetMasterLevelRewardIfTaken(e) {
    return !(this.ActivityId <= 0) && (e = this.GetMasterLevelConfig(e), this.GetPhantomArenaActivityData().GetMasterLevelRewardIfTaken(e.Id))
  }
  GetMasterLevelRewardCanTake(e) {
    var t = this.GetMasterLevelConfig(e).ExpNeed,
      r = this.GetMasterExpNow();
    return !(0 === this.GetMasterLevelRewardList(e).length) && t <= r && !this.GetMasterLevelRewardIfTaken(e)
  }
  GetMasterLevelRewardList(e) {
    e = this.GetMasterLevelConfig(e).NormalDropId;
    return e <= 0 ? [] : ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e)
  }
  GetPhantomBattleMasterLevelConfigList() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelConfigByActivityId(this.ActivityId)
  }
  GetMasterExpNextNeed() {
    var e = this.GetMasterLevel(),
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelConfigByLevel(this.ActivityId, e);
    return e.ExpNeed + e.ExpNext
  }
  GetMasterExpNow(e) {
    var t = this.GetPhantomArenaActivityData().GetMasterExp();
    return !e && (e = this.GetMasterLevelMax(), (e = this.GetMasterLevelConfig(e).ExpNeed) <= t) ? e : t
  }
  GetMasterExpWeek() {
    return this.GetPhantomArenaActivityData().GetMasterExpWeek()
  }
  rnu(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeIdListByGymId(this.ActivityId, e)
  }
  GetChallengeStateListByGymLevel(e) {
    var t = this.rnu(e),
      r = (this.GetPhantomBattleGymConfigByLevel(e).IfRepeat && t.length !== PhantomArenaDefine_1.REPEAT_GYM_MAX_DIFFICULTY && Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "错误的复刷道馆难度数量", ["配置数量", t.length]), []);
    for (let e = 0; e < t.length; e++) {
      var a = t[e],
        a = {
          Id: a,
          State: this.GetChallengeStateById(a),
          IsLast: e === t.length - 1
        };
      r.push(a)
    }
    return r
  }
  GetRepeatChallengeOpen(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.ActivityId).FuncOpenChallenge.get(e);
    return void 0 === t ? (Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "复刷挑战未配置功能开关", ["ChallengeId", e]), !1) : ModelManager_1.ModelManager.FunctionModel.IsOpen(t)
  }
  GetElementIconByIdList(e) {
    var t = [];
    for (const a of e) {
      var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(a);
      t.push(r.CardElementIcon)
    }
    return t
  }
  GetFirstRewardListByChallengeId(e) {
    var t, r, a = [],
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e).FirstPassDropId;
    for ([t, r] of DropPackageById_1.configDropPackageById.GetConfig(e).DropPreview) {
      var o = [{
        ItemId: t,
        IncId: 0
      }, r];
      a.push(o)
    }
    return a
  }
  GetRewardListByChallengeId(e) {
    var t = [],
      r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e),
      e = this.GetChallengeStateById(e);
    if (r.IsReChallenge || 2 === e)
      for (var [a, o] of r.PassDropId) {
        a = [{
          ItemId: a,
          IncId: 0
        }, o];
        t.push(a)
      } else {
        var n, i, e = r.FirstPassDropId;
        for ([n, i] of DropPackageById_1.configDropPackageById.GetConfig(e)?.DropPreview ?? new Map) {
          var s = [{
            ItemId: n,
            IncId: 0
          }, i];
          t.push(s)
        }
      }
    return t
  }
  GetMasterLevelData() {
    var e = this.GetMasterLevelMax(),
      t = [];
    for (const a of this.GetPhantomBattleMasterLevelConfigList()) {
      var r = {
        Level: a.Level,
        ExpLevel: a.ExpNeed,
        ExpNext: a.ExpNext,
        IsMax: a.Level >= e
      };
      t.push(r)
    }
    return t
  }
  GetMasterLevelDescData(e) {
    var t = this.GetMasterLevelConfig(e).Desc,
      r = this.GetMasterLevel(),
      a = [];
    for (const n of t) {
      var o = {
        Level: e,
        StringId: n,
        IsDone: e <= r
      };
      a.push(o)
    }
    return a
  }
  GetMasterLevelMax() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelConfigByActivityId(this.ActivityId).length
  }
  UpdateMasterLevelByConfigId(e) {
    this.GetPhantomArenaActivityData().UpdateMasterLevelByConfigId(e)
  }
  GetCardItemIdInBattleResult(e) {
    var t = [];
    for (const r of e.DS_) 60009 === ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r.L8n)?.ItemType && t.push(r.L8n);
    return t
  }
  GetRewardItemDataInBattleResult(e) {
    var t, r = [];
    if (e)
      for (const a of e.DS_) this.wdu(a.L8n) || (t = new RewardItemData_1.RewardItemData(a.L8n, a.m9n), r.push(t));
    return r
  }
  wdu(e) {
    var t = this.GetExpItemId(),
      r = this.GetPointsItemId();
    return e === t || e === r
  }
  GetCollectTabDataList() {
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("PhantomArenaCollectView");
    const t = [];
    return e.forEach(e => {
      ModelManager_1.ModelManager.FunctionModel.IsOpen(e.FunctionId) && t.push(e)
    }), t
  }
  GetDetailViewCardData(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e),
      r = this.IsCardUnlock(e),
      a = this.IsCardOutlookUnlock(e),
      o = t.InitAttack;
    return {
      IsLock: !r,
      CardId: e,
      Cost: t.Cost,
      Attack: o.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility) ?? 0,
      Life: o.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility) ?? 0,
      Element: t.Element,
      CardFaceType: this.GetCardFaceType(e),
      CardFaceTexturePath: t.CardFaceTexture,
      CardSpineData: this.CreateCardSpineData(e),
      OutlookUnlocked: a
    }
  }
  GetCollectCardDataListByIdList(e) {
    var t = [];
    for (const n of e) {
      var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(n),
        a = r.InitAttack,
        o = this.IsCardOutlookUnlock(n),
        r = {
          CardId: n,
          CardFaceTexturePath: r.CardFaceTexture,
          Cost: r.Cost,
          Element: r.Element,
          Attack: a.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility) ?? 0,
          Life: a.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility) ?? 0,
          IsLocked: !this.IsCardUnlock(n),
          OutlookUnlocked: o,
          CardFaceType: this.GetCardFaceType(n),
          CardSpineData: this.CreateCardSpineData(n)
        };
      t.push(r)
    }
    return t
  }
  GetCollectCardDataList() {
    var e, t, r, a = [];
    for (const o of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleCard()) o.ActivityId === this.ActivityId && (e = o.Id, r = o.InitAttack, t = this.IsCardOutlookUnlock(e), r = {
      CardId: e,
      CardFaceTexturePath: o.CardFaceTexture,
      Cost: o.Cost,
      Element: o.Element,
      Attack: r.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility) ?? 0,
      Life: r.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility) ?? 0,
      IsLocked: !this.IsCardUnlock(e),
      CardSpineData: this.CreateCardSpineData(e),
      CardFaceType: this.GetCardFaceType(e),
      OutlookUnlocked: t
    }, a.push(r));
    return a
  }
  GetCollectCardElementCount() {
    var e = this.GetCollectCardDataList(),
      t = new Map;
    for (const o of e) {
      var r = t.get(o.Element) ?? [0, 0],
        a = this.IsCardUnlock(o.CardId);
      t.set(o.Element, [r[0] + (a ? 1 : 0), r[1] + 1])
    }
    return t
  }
  GetCollectCardElementDataList() {
    var e, t, r, a = [];
    for ([e, t] of this.GetCollectCardElementCount()) 0 !== e && (r = {
      ElementId: e,
      Count: t[0],
      All: t[1]
    }, a.push(r));
    return a.sort(this.BZ1), a
  }
  GetCollectBadgeIdList() {
    var e, t = [];
    for (const r of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleBadge()) r.ActivityId === this.ActivityId && (e = r.Id, t.push(e));
    return t
  }
  GetCollectBadgeGroupMap() {
    const e = this.GetCollectBadgeIdList();
    var t = new Map;
    for (const o of e) {
      var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(o).GroupId,
        a = t.get(r) ?? [];
      a.push(o), t.set(r, a)
    }
    for (const [, e] of t) e.sort(this.Nfu);
    return t
  }
  GetCollectBadgeGroupDataList() {
    var e, t, r = [];
    for ([e, t] of this.GetCollectBadgeGroupMap()) {
      var a = {
        GroupId: e,
        BadgeIdList: t
      };
      r.push(a)
    }
    return r
  }
  GetCardUnlockCount() {
    let e = 0;
    for (const t of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleCard()) this.IsCardUnlock(t.Id) && t.ActivityId === this.ActivityId && (e += 1);
    return e
  }
  GetCardAllCount() {
    let e = 0;
    for (const t of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleCard()) t.ActivityId === this.ActivityId && (e += 1);
    return e
  }
  GetBadgeUnlockCount() {
    let e = 0;
    for (const t of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleBadge()) this.IsBadgeUnlock(t.Id) && t.ActivityId === this.ActivityId && (e += 1);
    return e
  }
  GetBadgeAllCount() {
    let e = 0;
    for (const t of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleBadge()) t.ActivityId === this.ActivityId && (e += 1);
    return e
  }
  GetCardRewardStateById(e) {
    e = this.GetCardRewardInfoById(e);
    return this.GetCardUnlockCount() >= e.rg1 ? e.og1 ? 3 : 2 : 1
  }
  GetCardRewardNeedCountById(e) {
    return this.GetCardRewardInfoById(e).rg1
  }
  GetCardRewardProgress() {
    var e = [];
    for (const a of this.GetCardRewardConfigList()) {
      var t = this.GetCardRewardNeedCountById(a);
      e.push(t)
    }
    var r = this.GetCardUnlockCount();
    return this.zau(e, r)
  }
  GetCardRewardPopupTupleData(e) {
    var t, r, a = [],
      o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRewardById(e).DropId,
      o = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(o).DropPreview,
      n = this.GetCardRewardInfoById(e).og1;
    for ([t, r] of o) {
      var i = {
        Id: t,
        Num: r,
        Taken: n
      };
      a.push(i)
    }
    return a
  }
  GetBadgeRewardNeedCountById(e) {
    return this.GetBadgeRewardInfoById(e).rg1
  }
  GetBadgeRewardStateById(e) {
    e = this.GetBadgeRewardInfoById(e);
    return e && this.GetBadgeUnlockCount() >= e.rg1 ? e.og1 ? 3 : 2 : 1
  }
  zau(t, r) {
    var e, a;
    if (t.length <= 0 || 0 === r) return 0;
    let o = 0;
    for (let e = 0; e < t.length; e++) {
      if (!(t[e] <= r)) break;
      o = e + 1
    }
    return o >= t.length ? 1 : (e = t[o], a = 0 < o ? t[o - 1] : 0, 1 / t.length * (o + (r - a) / (e - a)))
  }
  GetBadgeRewardProgress() {
    var e = [];
    for (const a of this.GetBadgeRewardConfigList()) {
      var t = this.GetBadgeRewardNeedCountById(a);
      e.push(t)
    }
    var r = this.GetBadgeUnlockCount();
    return this.zau(e, r)
  }
  GetBadgeRewardPopupTupleData(e) {
    var t, r, a = [],
      o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeRewardById(e).DropId,
      o = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(o).DropPreview,
      n = this.GetBadgeRewardInfoById(e).og1;
    for ([t, r] of o) {
      var i = {
        Id: t,
        Num: r,
        Taken: n
      };
      a.push(i)
    }
    return a
  }
  GetDetailViewTabDataList() {
    return [{
      Index: 0,
      NameId: "PhantomBattle_1013"
    }, {
      Index: 1,
      NameId: "PhantomBattle_1014"
    }]
  }
  GetDetailViewDetailItemData(e) {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e),
      t = e.InitAttack,
      r = [];
    for (const o of e.CardFactorId) {
      var a = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData;
      a.FactorConfigId = o, a.IsActive = !1, r.push(a)
    }
    return {
      Name: e.Name,
      Cost: e.Cost,
      Attack: t.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility) ?? 0,
      Life: t.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility) ?? 0,
      CardDescription: e.CardEffectDescription,
      CardDescriptionParams: e.CardEffectDescriptionParams,
      FactorDataList: r
    }
  }
  GetDetailViewEntryData(e) {
    var t = [],
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e),
      e = (t.push(...e.EntryIdList), e.CardFactorId);
    for (const a of e) {
      var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(a).EntryId;
      0 < r && !t.includes(r) && t.push(r)
    }
    return t
  }
  UpdateCardRewardByNotify(e) {
    e = e.Kf1;
    this.GetPhantomArenaActivityData().UpdateCardReward(e)
  }
  UpdateCardRewardByIds(e) {
    this.GetPhantomArenaActivityData().UpdateCardRewardByIds(e)
  }
  AddBadgeListByNotify(e) {
    e = e.$f1;
    this.GetPhantomArenaActivityData().AddBadgeListByNotify(e)
  }
  UpdateBadgeRewardByNotify(e) {
    e = e.Wf1;
    this.GetPhantomArenaActivityData().UpdateBadgeReward(e)
  }
  UpdateBadgeRewardByIds(e) {
    this.GetPhantomArenaActivityData().UpdateBadgeRewardByIds(e)
  }
  GetCardRewardConfigList() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRewardIdList(this.ActivityId)
  }
  GetBadgeRewardConfigList() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeRewardIdList(this.ActivityId)
  }
  GetCardRewardInfoById(e) {
    return this.GetPhantomArenaActivityData().GetCardRewardInfoById(e)
  }
  GetBadgeRewardInfoById(e) {
    return this.GetPhantomArenaActivityData().GetBadgeRewardInfoById(e)
  }
  GetBadgeSkillByGroupId(e) {
    var t = [];
    for (const a of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeGroupById(e).PhantomBattleSkillId) {
      var r = {
        GroupId: e,
        SkillId: a
      };
      t.push(r)
    }
    return t
  }
  GetBadgeCollectCountByGroupId(e) {
    var t = this.GetCollectBadgeGroupMap().get(e) ?? [],
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeGroupById(e);
    let r = 0;
    for (const a of t) this.IsBadgeUnlock(a) && (r += 1);
    return {
      Now: r,
      Need: e.Num,
      All: t.length
    }
  }
  UpdateTaskInfo(e) {
    e = e.E$s;
    this.GetPhantomArenaActivityData().UpdateTaskInfo(e)
  }
  UpdateTaskById(e) {
    this.GetPhantomArenaActivityData().UpdateTaskById(e)
  }
  GetTaskTabList() {
    var e = [];
    for (const t of this.GetPhantomArenaActivityData().GetTaskTabMap()) 0 < t[1].length && e.push(t[0]);
    return e.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskTabConfigById(e);
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskTabConfigById(t).Order - e.Order
    }), e
  }
  GetTaskDataByTabId(e) {
    var t = this.GetPhantomArenaActivityData().GetTaskTabMap(),
      r = this.GetPhantomArenaActivityData().GetTaskMap();
    if (!t.get(e)) return [];
    var t = t.get(e) ?? [],
      a = [],
      o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.ActivityId).ShopItemId;
    for (const h of t) {
      var n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(h),
        i = n.NormalDropId,
        i = this.GetPhantomArenaActivityData().GetPreviewReward(i);
      if (this.IsInLimitTime()[0]) {
        let e = !1;
        for (const d of i) d[0].ItemId === o && (e = !0, d[1] += n.LimitShopItemNum);
        e || (s = [{
          IncId: 0,
          ItemId: o
        }, n.LimitShopItemNum], i.unshift(s))
      }
      var s = {
        TaskConfig: r.get(h),
        Reward: i
      };
      a.push(s)
    }
    return a
  }
  GetTaskCountData() {
    var e = [0, 0],
      t = this.GetPhantomArenaActivityData().GetTaskMap();
    e[1] = t.size;
    for (const r of t) r[1].H6n !== Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning && e[0]++;
    return e
  }
  GetCacheShopOpen(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceShopRefresh) ?? "";
    return !!t && (e.length < t.length ? (this.SetCacheShopOpen(e), !0) : t === e)
  }
  SetCacheShopOpen(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceShopRefresh, e)
  }
  GetCurrencyId() {
    return this.GetPhantomArenaActivityData().GetCurrencyId()
  }
  GetShopList() {
    var e = this.GetPhantomArenaActivityData().GetShopId();
    return e ? ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e) : []
  }
  OnShopViewOpen() {
    var e = this.GetPhantomArenaActivityData().GetShopId();
    e && (e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e), e = this.GetCurUnlockShopData(e), this.SetCacheShopOpen(e.toString()), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaShopOpen))
  }
  IsInLimitTime(e) {
    return this.GetPhantomArenaActivityData().GetIsInLimitTime(e)
  }
  IsRoleUnlock(e) {
    return this.GetPhantomArenaActivityData().IsRoleUnlock(e)
  }
  IsRoleReward(e) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.ActivityId);
    if (t.MainRoleList.includes(e))
      for (const r of t.MainRoleList)
        if (this.GetPhantomArenaActivityData().IsRoleReward(r)) return !0;
    return this.GetPhantomArenaActivityData().IsRoleReward(e)
  }
  IsMainRole(e) {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.ActivityId).MainRoleList.includes(e)
  }
  GetCardRoleList() {
    var e = [],
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleCardRole(),
      r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    for (const a of t) a.IsTrail || (0 === a.Type || 2 === a.Type && 0 === r || 1 === a.Type && 1 === r) && e.push(a.Id);
    return e
  }
  GetPhantomArenaActivityRedDot() {
    return this.GetMasterLevelRewardRedDot() || this.CheckTaskRedDot() || this.CheckShopRedDot() || this.GetRoleRewardRedDot() || this.GetCardRewardRedDot() || this.GetBadgeRewardRedDot() || this.GetGymRedDot()
  }
  gCu() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityId)
  }
  GetPhantomArenaButtonRedDot() {
    return this.gCu(), this.GetRoleRewardRedDot() || this.GetCardRewardRedDot() || this.GetBadgeRewardRedDot() || this.GetGymRedDot()
  }
  GetGymRedDot() {
    for (const e of this.GetPhantomBattleGymLevelList())
      if (this.GetGymRedDotById(e)) return !0;
    return !1
  }
  GetGymRedDotById(e) {
    var t;
    return !this.IsGymLock(e) && ((t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymRedDotCheck)) && t.has(this.ActivityId) ? !t.get(this.ActivityId).includes(e) : ((t = new Map).set(this.ActivityId, []), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymRedDotCheck, t), !1))
  }
  SetGymRedDotChecked(e) {
    var t, r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymRedDotCheck);
    r && r.has(this.ActivityId) ? (t = r.get(this.ActivityId)).includes(e) || (t.push(e), r.set(this.ActivityId, t), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymRedDotCheck, r)) : ((t = new Map).set(this.ActivityId, [e]), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomArenaEntranceGymRedDotCheck, t)), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate)
  }
  GetRoleRewardRedDot() {
    for (const r of ModelManager_1.ModelManager.PhantomArenaModel.GetCardRoleList()) {
      var e = this.IsRoleUnlock(r),
        t = this.IsRoleReward(r);
      if (e && !t) return !0
    }
    return !1
  }
  GetMasterLevelRewardRedDot() {
    if (!(this.ActivityId <= 0))
      for (const t of this.GetPhantomBattleMasterLevelConfigList()) {
        var e = t.Level;
        if (this.GetMasterLevelRewardCanTake(e)) return !0
      }
    return !1
  }
  CheckTaskRedDot() {
    if (this.GetPhantomArenaActivityData()) {
      var e = this.GetPhantomArenaActivityData().GetTaskMap();
      for (const t of this.GetPhantomArenaActivityData().GetTaskTabMap())
        for (const r of t[1])
          if (e.get(r).H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) return !0
    }
    return !1
  }
  CheckTaskRedDotByTab(e) {
    var t = this.GetPhantomArenaActivityData().GetTaskMap(),
      r = this.GetPhantomArenaActivityData().GetTaskTabMap();
    if (r.has(e))
      for (const a of r.get(e))
        if (t.get(a).H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) return !0;
    return !1
  }
  CheckShopRedDot() {
    var e = this.GetPhantomArenaActivityData(),
      t = e?.GetShopId() ?? void 0;
    return !!t && !!e?.IsUnLock() && (e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(t), t = this.GetCurUnlockShopData(e), !this.GetCacheShopOpen(t.toString()))
  }
  GetCurUnlockShopData(e) {
    var t = [];
    for (const a of e) {
      var r = a.GetGoodsData();
      r.GetIfCanBuy() && (0 === r.BuyLimit || r.BoughtCount < r.BuyLimit) && t.push(r.Id)
    }
    return t
  }
  GetCardRewardRedDot() {
    if (!(this.ActivityId <= 0))
      for (const e of this.GetCardRewardConfigList())
        if (2 === this.GetCardRewardStateById(e)) return !0;
    return !1
  }
  GetBadgeRewardRedDot() {
    if (!(this.ActivityId <= 0))
      for (const e of this.GetBadgeRewardConfigList())
        if (2 === this.GetBadgeRewardStateById(e)) return !0;
    return !1
  }
}
exports.PhantomArenaModel = PhantomArenaModel;
//# sourceMappingURL=PhantomArenaModel.js.map