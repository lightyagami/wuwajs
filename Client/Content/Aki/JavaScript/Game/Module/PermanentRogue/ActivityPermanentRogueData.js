"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityPermanentRogueData = void 0;
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  RogueResCollectionByIdKey_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey"),
  RogueResCollectionRuleById_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionRuleById"),
  RogueResEndAwardById_1 = require("../../../Core/Define/ConfigQuery/RogueResEndAwardById"),
  RogueResEndById_1 = require("../../../Core/Define/ConfigQuery/RogueResEndById"),
  RogueResTalentTreeById_1 = require("../../../Core/Define/ConfigQuery/RogueResTalentTreeById"),
  RogueResTaskById_1 = require("../../../Core/Define/ConfigQuery/RogueResTaskById"),
  RogueResTaskThemeById_1 = require("../../../Core/Define/ConfigQuery/RogueResTaskThemeById"),
  RogueResThemeAll_1 = require("../../../Core/Define/ConfigQuery/RogueResThemeAll"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityData_1 = require("../Activity/ActivityData"),
  HelpController_1 = require("../Help/HelpController"),
  ActivityPermanentRogueController_1 = require("./ActivityPermanentRogueController"),
  RogueTaskData_1 = require("./ItemData/RogueTaskData"),
  ALL_SEASON_ID = 0,
  taskStateToRewardState = new Map([
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning, 0],
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish, 1],
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken, 2]
  ]);
class ActivityPermanentRogueData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), this.D6c = new Map, this.U6c = new Map, this.B6c = new Map, this.k6c = new Map, this.O6c = new Map, this.q6c = new Map, this.TaskEndTime = 0, this.G6c = new Map, this.rs1 = new Map, this.xd1 = new Map, this.Ud1 = new Map, this.Dd1 = new Map, this.F6c = 0
  }
  GetExDataRedPointShowState() {
    var e, t;
    return !!this.GetPreGuideQuestFinishState() && (e = this.GetNewSeasonId(), !!(t = ModelManager_1.ModelManager.ActivityPermanentRogueModel).CheckSkillTreeRedDot(e) || !!(t.CheckAllTaskRedDot() || t.CheckIllustratedRedDot() || t.CheckEndingAwardRedDot(e) || t.CheckDungeonRedDot(e)))
  }
  OnSetFirstOpenFalse() {
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId(),
      e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSeasonHelpId(e);
    e && HelpController_1.HelpController.OpenHelpById(e)
  }
  CheckAllRedDot() {
    return this.GetExDataRedPointShowState()
  }
  IsIllustratedReward() {
    for (const e of this.U6c)
      if (e[1] === Protocol_1.Aki.Protocol.zps.CMs) return !0;
    return !1
  }
  IsTaskReward() {
    for (const e of this.q6c)
      if (e[1].Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) return !0;
    return !1
  }
  PhraseEx(e) {
    var t = e.uhc;
    if (t) {
      for (const e of t.HBc) this.D6c.set(e.UHn, e);
      this.V6c(t), this.j6c(t), this.os1(t.HBc), this.InitShopItem(t.HBc)
    }
  }
  GetSeasonDataById(e) {
    return this.D6c.get(e)
  }
  GetNewSeasonId() {
    let e = -1;
    for (const t of this.D6c) t[0] > e && (e = t[0]);
    return e
  }
  GetCycleRemainTime() {
    var e = this.GetNewSeasonId(),
      e = this.GetSeasonDataById(e);
    return MathUtils_1.MathUtils.LongToNumber(e.dps)
  }
  V6c(e) {
    0 === this.B6c.size && this.H6c();
    for (const o of Object.keys(e.$Bc.vhc)) {
      var t = Number(o),
        t = (this.U6c.set(t, e.$Bc.vhc[o]), RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(t));
      0 === t.Type ? this.$6c(Number(o)) : 1 === t.Type ? this.W6c(Number(o)) : this.Q6c(Number(o))
    }
  }
  H6c() {
    var e = RogueResThemeAll_1.configRogueResThemeAll.GetConfigList();
    if (this.B6c.set(ALL_SEASON_ID, new Set), this.k6c.set(ALL_SEASON_ID, new Set), this.O6c.set(ALL_SEASON_ID, new Set), e)
      for (const t of e) this.B6c.set(t.Id, new Set), this.k6c.set(t.Id, new Set), this.O6c.set(t.Id, new Set)
  }
  $6c(e) {
    this.B6c.get(ALL_SEASON_ID).add(e);
    var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e),
      o = RogueResCollectionRuleById_1.configRogueResCollectionRuleById.GetConfig(t.RuleId),
      r = !o || 2 === o.Type;
    for (const s of this.B6c) {
      var i = s[0];
      r ? o && o.Seasons.includes(i) || this.B6c.get(i).add(e) : o && o.Seasons.includes(i) && this.B6c.get(i).add(e)
    }
  }
  W6c(e) {
    this.k6c.get(ALL_SEASON_ID).add(e);
    var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e),
      o = RogueResCollectionRuleById_1.configRogueResCollectionRuleById.GetConfig(t.RuleId),
      r = !o || 2 === o.Type;
    for (const s of this.k6c) {
      var i = s[0];
      r ? o && o.Seasons.includes(i) || this.k6c.get(i).add(e) : o && o.Seasons.includes(i) && this.k6c.get(i).add(e)
    }
  }
  Q6c(e) {
    this.O6c.get(ALL_SEASON_ID).add(e);
    var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e),
      o = RogueResCollectionRuleById_1.configRogueResCollectionRuleById.GetConfig(t.RuleId),
      r = !o || 2 === o.Type;
    for (const s of this.O6c) {
      var i = s[0];
      r ? o && o.Seasons.includes(i) || this.O6c.get(i).add(e) : o && o.Seasons.includes(i) && this.O6c.get(i).add(e)
    }
  }
  UpdateIllustrateState(e) {
    for (const o of Object.keys(e.vhc)) {
      var t = Number(o),
        t = (this.U6c.set(t, e.vhc[o]), RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(t));
      0 === t.Type ? this.$6c(Number(o)) : 1 === t.Type ? this.W6c(Number(o)) : this.Q6c(Number(o))
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate)
  }
  GetTokenIndexSet(e) {
    return this.B6c.get(e) ?? new Set
  }
  GetTokenInSeason(e) {
    var t = [];
    for (const o of this.B6c) o[1].has(e) && t.push(o[0]);
    return t
  }
  GetNormalIndexSet(e) {
    return this.k6c.get(e) ?? new Set
  }
  GetEventNormalInSeason(e) {
    var t = [];
    for (const o of this.k6c) o[1].has(e) && t.push(o[0]);
    return t
  }
  GetMapIndexSet(e) {
    return this.O6c.get(e) ?? new Set
  }
  GetEventMapInSeason(e) {
    var t = [];
    for (const o of this.O6c) o[1].has(e) && t.push(o[0]);
    return t
  }
  GetCollectItemState(e) {
    return this.U6c.get(e) ? this.U6c.get(e) : Protocol_1.Aki.Protocol.zps.Z6n
  }
  GetAllIllustratedState() {
    return this.U6c
  }
  SetIllustratedRewardGot(e) {
    for (const t of e) this.U6c.set(t, Protocol_1.Aki.Protocol.zps.ovs)
  }
  j6c(e) {
    e = e.$Bc.xhc;
    if (e.ONc && 0 !== e.ONc.qNc) {
      this.F6c = e.ONc.qNc;
      var t = RogueResTaskThemeById_1.configRogueResTaskThemeById.GetConfig(this.F6c);
      if (t) {
        this.TaskEndTime = e.ONc.dps, this.G6c.clear(), this.q6c.clear();
        for (const r of t.TabNames) this.G6c.set(r[0], []);
        for (const i of e.ONc.Chc) {
          var o = new RogueTaskData_1.RogueTaskData(i.s5n),
            o = (o.Current = i.lMs, o.Target = i.j6n, o.Status = i.H6n, this.q6c.set(i.s5n, o), RogueResTaskById_1.configRogueResTaskById.GetConfig(i.s5n));
          this.G6c.get(o.Type).push(i.s5n)
        }
      }
    }
  }
  GetTaskListByType(e) {
    return this.G6c.get(e) ?? []
  }
  GetTaskById(e) {
    return this.q6c.get(e)
  }
  GetTaskThemeId() {
    return this.F6c
  }
  SetTaskRewardGot(e) {
    this.q6c.get(e) && (this.q6c.get(e).Status = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken)
  }
  UpdateTaskNotify(e) {
    if (e.ONc) {
      for (const o of e.ONc.Chc) {
        var t = new RogueTaskData_1.RogueTaskData(o.s5n),
          t = (t.Current = o.lMs, t.Target = o.j6n, t.Status = o.H6n, this.q6c.set(o.s5n, t), RogueResTaskById_1.configRogueResTaskById.GetConfig(o.s5n).Type);
        this.G6c.get(t).includes(o.s5n) || this.G6c.get(t).push(o.s5n)
      }
      0 !== e.ONc.qNc && (this.F6c = e.ONc.qNc)
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate)
  }
  os1(e) {
    for (const t of e) {
      this.rs1.get(t.UHn) || this.rs1.set(t.UHn, new Set);
      for (const o of t.dhc) this.rs1.get(t.UHn)?.add(o);
      this.xd1.get(t.UHn) || this.xd1.set(t.UHn, []);
      for (const r of t.mhc) this.xd1.get(t.UHn).includes(r.s5n) || (this.xd1.get(t.UHn)?.push(r.s5n), this.Bd1(r))
    }
  }
  GetEndingReachedById(e, t) {
    return this.rs1.get(e)?.has(t) ?? !1
  }
  UpdateEndingAward(e) {
    var t = this.Ud1.get(e);
    t.RewardState = 2, this.Ud1.set(e, t)
  }
  UpdateEndingNotify(e) {
    var t = new Set;
    for (const i of e.dhc) {
      var o = RogueResEndById_1.configRogueResEndById.GetConfig(i);
      this.rs1.get(o.SeasonId) || this.rs1.set(o.SeasonId, new Set), this.rs1.get(o.SeasonId)?.add(i)
    }
    for (const s of e.mhc) {
      var r = RogueResEndAwardById_1.configRogueResEndAwardById.GetConfig(s.s5n);
      t.add(r.SeasonId), this.xd1.get(r.SeasonId) || this.xd1.set(r.SeasonId, []), this.xd1.get(r.SeasonId).includes(s.s5n) || this.xd1.get(r.SeasonId)?.push(s.s5n), this.Bd1(s)
    }
    for (const n of t) EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, n)
  }
  Bd1(e) {
    let t = this.Ud1.get(e.s5n);
    var o = 1 === taskStateToRewardState.get(e.H6n) ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Moonfiesta_AwardGet") : MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Moonfiesta_Underway");
    if (t) t.NameTextArgs = [e.lMs + "/" + e.j6n], t.RewardState = taskStateToRewardState.get(e.H6n), t.RewardButtonText = o;
    else {
      const r = RogueResEndAwardById_1.configRogueResEndAwardById.GetConfig(e.s5n);
      t = {
        Id: e.s5n,
        NameText: "",
        NameTextId: r.Desc,
        NameTextArgs: [e.lMs + "/" + e.j6n],
        RewardList: this.GetPreviewReward(r.Award),
        RewardState: taskStateToRewardState.get(e.H6n),
        ClickFunction: () => {
          ActivityPermanentRogueController_1.ActivityPermanentRogueController.RequestRogueResEndingReward(r.SeasonId, e.s5n, r.Index)
        },
        RewardButtonText: o
      }
    }
    this.Ud1.set(e.s5n, t)
  }
  GetEndingAwardList(e) {
    e = this.xd1.get(e);
    if (!e) return [];
    var t = [];
    for (const o of e) t.push(this.Ud1.get(o));
    return t
  }
  InitShopItem(e) {
    for (const t of e) this.UpdateTotalShopItem(t.UHn, t.Qu1)
  }
  UpdateTotalShopItem(e, t) {
    this.Dd1.set(e, t)
  }
  GetTotalShopItem(e) {
    return this.Dd1.get(e) ?? 0
  }
  UpgradeSkill(e, t) {
    var o = RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(e);
    this.GetSeasonDataById(o.SeasonId).Mqs[e] = t
  }
}
exports.ActivityPermanentRogueData = ActivityPermanentRogueData;
//# sourceMappingURL=ActivityPermanentRogueData.js.map