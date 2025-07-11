"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPermanentRogueData = undefined;
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const RogueResCollectionByIdKey_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey");
const RogueResCollectionRuleById_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionRuleById");
const RogueResEndAwardById_1 = require("../../../Core/Define/ConfigQuery/RogueResEndAwardById");
const RogueResEndById_1 = require("../../../Core/Define/ConfigQuery/RogueResEndById");
const RogueResTalentTreeById_1 = require("../../../Core/Define/ConfigQuery/RogueResTalentTreeById");
const RogueResTaskById_1 = require("../../../Core/Define/ConfigQuery/RogueResTaskById");
const RogueResTaskThemeById_1 = require("../../../Core/Define/ConfigQuery/RogueResTaskThemeById");
const RogueResThemeAll_1 = require("../../../Core/Define/ConfigQuery/RogueResThemeAll");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityData_1 = require("../Activity/ActivityData");
const ActivityPermanentRogueController_1 = require("./ActivityPermanentRogueController");
const RogueTaskData_1 = require("./ItemData/RogueTaskData");
const ALL_SEASON_ID = 0;
const taskStateToRewardState = new Map([[Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning, 0], [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish, 1], [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken, 2]]);
class ActivityPermanentRogueData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.D6c = new Map();
    this.U6c = new Map();
    this.B6c = new Map();
    this.k6c = new Map();
    this.O6c = new Map();
    this.q6c = new Map();
    this.TaskEndTime = 0;
    this.G6c = new Map();
    this.Ts1 = new Map();
    this.tm1 = new Map();
    this.im1 = new Map();
    this.rm1 = new Map();
    this.F6c = 0;
  }
  GetExDataRedPointShowState() {
    var e;
    var t;
    return !!this.GetPreGuideQuestFinishState() && (!!this.CheckAllRightSideRedDot() || !(e = ModelManager_1.ModelManager.ActivityPermanentRogueModel, t = this.GetNewSeasonId(), !e.CheckAllTaskRedDot()) || !!e.CheckShopRedDot(t));
  }
  GetFirstCheckRedDotState(e) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, e, 0, 0) === 0;
  }
  SaveFirstCheckRedDotState(e) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, e, 0, 0) === 1 || (ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, e, 0, 0, 1), false);
  }
  CheckAllRightSideRedDot() {
    var e;
    var t;
    return !!this.GetPreGuideQuestFinishState() && !!(e = this.GetNewSeasonId(), (t = ModelManager_1.ModelManager.ActivityPermanentRogueModel).CheckSkillTreeRedDot(e) || t.CheckIllustratedRedDot() || t.CheckEndingAwardRedDot(e) || t.CheckDungeonRedDot(e));
  }
  IsIllustratedReward() {
    for (const e of this.U6c) {
      if (e[1] === Protocol_1.Aki.Protocol.zps.CMs) {
        return true;
      }
    }
    return false;
  }
  IsTaskReward() {
    if (this.GetFirstCheckRedDotState(1)) {
      return true;
    }
    for (const e of this.q6c) {
      if (e[1].Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) {
        return true;
      }
    }
    return false;
  }
  PhraseEx(e) {
    var t = e.uhc;
    if (t) {
      for (const e of t.HBc) {
        this.D6c.set(e.UHn, e);
      }
      this.V6c(t);
      this.j6c(t);
      this.bs1(t.HBc);
      this.InitShopItem(t.HBc);
    }
  }
  GetSeasonDataById(e) {
    return this.D6c.get(e);
  }
  GetNewSeasonId() {
    let e = -1;
    for (const t of this.D6c) {
      if (t[0] > e) {
        e = t[0];
      }
    }
    return e;
  }
  GetCycleRemainTime() {
    var e = this.GetNewSeasonId();
    var e = this.GetSeasonDataById(e);
    return MathUtils_1.MathUtils.LongToNumber(e.dps);
  }
  V6c(e) {
    if (this.B6c.size === 0) {
      this.H6c();
    }
    for (const o of Object.keys(e.$Bc.vhc)) {
      var t = Number(o);
      this.U6c.set(t, e.$Bc.vhc[o]);
      var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(t);
      if (t.Type === 0) {
        this.$6c(Number(o));
      } else if (t.Type === 1) {
        this.W6c(Number(o));
      } else {
        this.Q6c(Number(o));
      }
    }
  }
  H6c() {
    var e = RogueResThemeAll_1.configRogueResThemeAll.GetConfigList();
    this.B6c.set(ALL_SEASON_ID, new Set());
    this.k6c.set(ALL_SEASON_ID, new Set());
    this.O6c.set(ALL_SEASON_ID, new Set());
    if (e) {
      for (const t of e) {
        this.B6c.set(t.Id, new Set());
        this.k6c.set(t.Id, new Set());
        this.O6c.set(t.Id, new Set());
      }
    }
  }
  $6c(e) {
    this.B6c.get(ALL_SEASON_ID).add(e);
    var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e);
    var o = RogueResCollectionRuleById_1.configRogueResCollectionRuleById.GetConfig(t.RuleId);
    var r = !o || o.Type === 2;
    for (const s of this.B6c) {
      var i = s[0];
      if (r) {
        if (!o || !o.Seasons.includes(i)) {
          this.B6c.get(i).add(e);
        }
      } else if (o && o.Seasons.includes(i)) {
        this.B6c.get(i).add(e);
      }
    }
  }
  W6c(e) {
    this.k6c.get(ALL_SEASON_ID).add(e);
    var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e);
    var o = RogueResCollectionRuleById_1.configRogueResCollectionRuleById.GetConfig(t.RuleId);
    var r = !o || o.Type === 2;
    for (const s of this.k6c) {
      var i = s[0];
      if (r) {
        if (!o || !o.Seasons.includes(i)) {
          this.k6c.get(i).add(e);
        }
      } else if (o && o.Seasons.includes(i)) {
        this.k6c.get(i).add(e);
      }
    }
  }
  Q6c(e) {
    this.O6c.get(ALL_SEASON_ID).add(e);
    var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e);
    var o = RogueResCollectionRuleById_1.configRogueResCollectionRuleById.GetConfig(t.RuleId);
    var r = !o || o.Type === 2;
    for (const s of this.O6c) {
      var i = s[0];
      if (r) {
        if (!o || !o.Seasons.includes(i)) {
          this.O6c.get(i).add(e);
        }
      } else if (o && o.Seasons.includes(i)) {
        this.O6c.get(i).add(e);
      }
    }
  }
  UpdateIllustrateState(e) {
    for (const o of Object.keys(e.vhc)) {
      var t = Number(o);
      this.U6c.set(t, e.vhc[o]);
      var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(t);
      if (t.Type === 0) {
        this.$6c(Number(o));
      } else if (t.Type === 1) {
        this.W6c(Number(o));
      } else {
        this.Q6c(Number(o));
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate);
  }
  GetTokenIndexSet(e) {
    return this.B6c.get(e) ?? new Set();
  }
  GetTokenInSeason(e) {
    var t = [];
    for (const o of this.B6c) {
      if (o[1].has(e)) {
        t.push(o[0]);
      }
    }
    return t;
  }
  GetNormalIndexSet(e) {
    return this.k6c.get(e) ?? new Set();
  }
  GetEventNormalInSeason(e) {
    var t = [];
    for (const o of this.k6c) {
      if (o[1].has(e)) {
        t.push(o[0]);
      }
    }
    return t;
  }
  GetMapIndexSet(e) {
    return this.O6c.get(e) ?? new Set();
  }
  GetEventMapInSeason(e) {
    var t = [];
    for (const o of this.O6c) {
      if (o[1].has(e)) {
        t.push(o[0]);
      }
    }
    return t;
  }
  GetCollectItemState(e) {
    if (this.U6c.get(e)) {
      return this.U6c.get(e);
    } else {
      return Protocol_1.Aki.Protocol.zps.Z6n;
    }
  }
  GetAllIllustratedState() {
    return this.U6c;
  }
  SetIllustratedRewardGot(e) {
    for (const t of e) {
      this.U6c.set(t, Protocol_1.Aki.Protocol.zps.ovs);
    }
  }
  j6c(e) {
    e = e.$Bc.xhc;
    if (e.ONc && e.ONc.qNc !== 0) {
      this.F6c = e.ONc.qNc;
      var t = RogueResTaskThemeById_1.configRogueResTaskThemeById.GetConfig(this.F6c);
      if (t) {
        this.TaskEndTime = e.ONc.dps;
        this.G6c.clear();
        this.q6c.clear();
        for (const r of t.TabNames) {
          this.G6c.set(r[0], []);
        }
        for (const i of e.ONc.Chc) {
          var o = new RogueTaskData_1.RogueTaskData(i.s5n);
          o.Current = i.lMs;
          o.Target = i.j6n;
          o.Status = i.H6n;
          this.q6c.set(i.s5n, o);
          var o = RogueResTaskById_1.configRogueResTaskById.GetConfig(i.s5n);
          this.G6c.get(o.Type).push(i.s5n);
        }
      }
    }
  }
  GetTaskListByType(e) {
    return this.G6c.get(e) ?? [];
  }
  GetTaskById(e) {
    return this.q6c.get(e);
  }
  GetTaskThemeId() {
    return this.F6c;
  }
  SetTaskRewardGot(e) {
    if (this.q6c.get(e)) {
      this.q6c.get(e).Status = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
    }
  }
  UpdateTaskNotify(e) {
    if (e.ONc) {
      for (const o of e.ONc.Chc) {
        var t = new RogueTaskData_1.RogueTaskData(o.s5n);
        t.Current = o.lMs;
        t.Target = o.j6n;
        t.Status = o.H6n;
        this.q6c.set(o.s5n, t);
        var t = RogueResTaskById_1.configRogueResTaskById.GetConfig(o.s5n).Type;
        if (!this.G6c.get(t).includes(o.s5n)) {
          this.G6c.get(t).push(o.s5n);
        }
      }
      if (e.ONc.qNc !== 0) {
        this.F6c = e.ONc.qNc;
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate);
  }
  bs1(e) {
    for (const t of e) {
      if (!this.Ts1.get(t.UHn)) {
        this.Ts1.set(t.UHn, new Set());
      }
      for (const o of t.dhc) {
        this.Ts1.get(t.UHn)?.add(o);
      }
      if (!this.tm1.get(t.UHn)) {
        this.tm1.set(t.UHn, []);
      }
      for (const r of t.mhc) {
        if (!this.tm1.get(t.UHn).includes(r.s5n)) {
          this.tm1.get(t.UHn)?.push(r.s5n);
          this.om1(r);
        }
      }
    }
  }
  GetEndingReachedById(e, t) {
    return this.Ts1.get(e)?.has(t) ?? false;
  }
  UpdateEndingAward(e) {
    var t = this.im1.get(e);
    t.RewardState = 2;
    this.im1.set(e, t);
  }
  UpdateEndingNotify(e) {
    var t = new Set();
    for (const i of e.dhc) {
      var o = RogueResEndById_1.configRogueResEndById.GetConfig(i);
      if (!this.Ts1.get(o.SeasonId)) {
        this.Ts1.set(o.SeasonId, new Set());
      }
      this.Ts1.get(o.SeasonId)?.add(i);
    }
    for (const s of e.mhc) {
      var r = RogueResEndAwardById_1.configRogueResEndAwardById.GetConfig(s.s5n);
      t.add(r.SeasonId);
      if (!this.tm1.get(r.SeasonId)) {
        this.tm1.set(r.SeasonId, []);
      }
      if (!this.tm1.get(r.SeasonId).includes(s.s5n)) {
        this.tm1.get(r.SeasonId)?.push(s.s5n);
      }
      this.om1(s);
    }
    for (const n of t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, n);
    }
  }
  om1(e) {
    let t = this.im1.get(e.s5n);
    var o = taskStateToRewardState.get(e.H6n) === 1 ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Moonfiesta_AwardGet") : MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Moonfiesta_Underway");
    if (t) {
      t.NameTextArgs = [e.lMs + "/" + e.j6n];
      t.RewardState = taskStateToRewardState.get(e.H6n);
      t.RewardButtonText = o;
    } else {
      const r = RogueResEndAwardById_1.configRogueResEndAwardById.GetConfig(e.s5n);
      t = {
        Id: e.s5n,
        NameText: "",
        NameTextId: r.Desc,
        NameTextArgs: [e.lMs + "/" + e.j6n],
        RewardList: this.GetPreviewReward(r.Award),
        RewardState: taskStateToRewardState.get(e.H6n),
        ClickFunction: () => {
          ActivityPermanentRogueController_1.ActivityPermanentRogueController.RequestRogueResEndingReward(r.SeasonId, e.s5n, r.Index);
        },
        RewardButtonText: o
      };
    }
    this.im1.set(e.s5n, t);
  }
  GetEndingAwardList(e) {
    e = this.tm1.get(e);
    if (!e) {
      return [];
    }
    var t = [];
    for (const o of e) {
      t.push(this.im1.get(o));
    }
    return t;
  }
  InitShopItem(e) {
    for (const t of e) {
      this.UpdateTotalShopItem(t.UHn, t.Cd1);
    }
  }
  UpdateTotalShopItem(e, t) {
    this.rm1.set(e, t);
  }
  GetTotalShopItem(e) {
    return this.rm1.get(e) ?? 0;
  }
  UpgradeSkill(e, t) {
    var o = RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(e);
    this.GetSeasonDataById(o.SeasonId).Mqs[e] = t;
  }
}
exports.ActivityPermanentRogueData = ActivityPermanentRogueData;
//# sourceMappingURL=ActivityPermanentRogueData.js.map