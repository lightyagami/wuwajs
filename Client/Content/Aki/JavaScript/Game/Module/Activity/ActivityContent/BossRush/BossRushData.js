"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushData = exports.BossRushLevelRewardData = exports.BossRushLevelDetailInfo = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoleDefine_1 = require("../../../RoleUi/RoleDefine");
const ActivityCommonDefine_1 = require("../../ActivityCommonDefine");
const ActivityData_1 = require("../../ActivityData");
const BossRushController_1 = require("./BossRushController");
const BossRushModel_1 = require("./BossRushModel");
const UNLOCKLOCALKEY = 100;
const UNLOCKBUFFKEY = 200;
class BossRushLevelDetailInfo {
  constructor() {
    this.LOe = 0;
    this.xe = 0;
    this.AAe = 0;
    this.SSn = 0;
    this.ySn = [];
    this.ISn = [];
    this.xAn = [];
    this.tll = [];
    this.ill = [];
    this.TSn = [];
    this.jFe = false;
  }
  Phrase(t, e, s) {
    this.LOe = t;
    this.SetId(e.r6n);
    this.SetScore(e.SMs);
    this.SetUnLockTime(e.Mps);
    this.jFe = e.Sps;
    this.ySn = [];
    this.ISn = [];
    this.xAn = [];
    this.tll = [];
    this.ill = [];
    for (const _ of e.yMs) {
      var i = new BossRushModel_1.BossRushBuffInfo();
      i.BuffId = _.b6n;
      i.Slot = _.q6n;
      i.ChangeAble = _.G6n !== Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked && _.G6n !== Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive;
      i.State = _.G6n;
      this.ySn.push(i);
    }
    for (const c of this.GetConfig().OptionalBuff) {
      var r = new BossRushModel_1.BossRushBuffInfo();
      r.BuffId = c;
      r.Slot = -1;
      r.ChangeAble = true;
      this.xAn.push(r);
    }
    for (const v of s) {
      var n = new BossRushModel_1.BossRushBuffInfo();
      n.BuffId = v;
      n.Slot = -1;
      n.ChangeAble = true;
      this.ISn.push(n);
    }
    let o = 1;
    for (const d of e.Zal) {
      var a = new BossRushModel_1.BossRushBuffInfo();
      a.BuffId = d;
      a.Slot = o++;
      a.ChangeAble = true;
      a.State = Protocol_1.Aki.Protocol.Iks.Proto_BuffSelected;
      this.tll.push(a);
    }
    for (let t = o; t <= 2; t++) {
      var h = new BossRushModel_1.BossRushBuffInfo();
      h.BuffId = 0;
      h.Slot = o++;
      h.ChangeAble = this.GetConfig().ScoreBuffCount >= t;
      h.State = this.GetConfig().ScoreBuffCount >= t ? Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty : Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive;
      this.tll.push(h);
    }
    for (const R of this.GetConfig().ScoreBuff) {
      var u = new BossRushModel_1.BossRushBuffInfo();
      u.BuffId = R;
      u.Slot = -1;
      u.ChangeAble = true;
      this.ill.push(u);
    }
    this.TSn = [];
    let l = 0;
    for (const g of e.EMs) {
      var f = new BossRushModel_1.BossRushRoleInfo();
      f.RoleId = g;
      f.Slot = l;
      l++;
      this.TSn.push(f);
    }
  }
  SetId(t) {
    this.xe = t;
  }
  SetScore(t) {
    this.AAe = t;
  }
  SetUnLockTime(t) {
    this.SSn = t;
  }
  GetId() {
    return this.xe;
  }
  GetMonsterTexturePath() {
    return this.GetConfig().PreviewTexture;
  }
  GetBigMonsterTexturePath() {
    return this.GetConfig().StageTexture;
  }
  GetMonsterName() {
    var t = this.GetConfig().BossInfo;
    var t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(t);
    if (t) {
      return t.Name;
    } else {
      return "";
    }
  }
  GetLevelDesc() {
    return this.GetConfig().LevelDesc;
  }
  GetRecommendElementIdArray() {
    return this.GetInstanceDungeonConfig().RecommendElement;
  }
  GetUnLockState() {
    return this.jFe;
  }
  GetScore() {
    return this.AAe;
  }
  GetUnlockTimeText() {
    var t;
    var e;
    if (TimeUtil_1.TimeUtil.GetServerTime() < this.SSn) {
      t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(this.GetUnLockTime() - TimeUtil_1.TimeUtil.GetServerTime());
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushUnLockTime");
      return StringUtils_1.StringUtils.Format(e, t.CountDownText);
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushUnlockCondition");
    }
  }
  GetUnLockTime() {
    return this.SSn;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushByActivityIdAndInstanceId(this.LOe, this.xe);
  }
  GetMaxBuffCount() {
    if (ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName === 0) {
      return this.GetConfig().BuffCount;
    } else {
      return this.GetConfig().ScoreBuffCount;
    }
  }
  GetInstanceDungeonId() {
    return this.GetConfig().InstId;
  }
  GetInstanceDungeonFormationId() {
    return this.GetInstanceDungeonConfig().FightFormationId;
  }
  GetInstanceDungeonFormationNumb() {
    return ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(this.GetInstanceDungeonFormationId()).LimitCount.length;
  }
  GetInstanceDungeonConfig() {
    var t = this.GetConfig().InstId;
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
  }
  ConvertToTeamInfo() {
    var t = new BossRushModel_1.BossRushTeamInfo();
    t.SetCurrentSelectLevel(this);
    var e = [];
    for (const r of this.TSn) {
      var s;
      var i = r.RoleId;
      if (i >= RoleDefine_1.ROBOT_DATA_MIN_ID) {
        s = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(i);
        s = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(s.GroupId);
        e.push(s.Id);
      } else {
        e.push(i);
      }
    }
    t.SetCurrentTeamMembers(e);
    t.LevelInfo = this;
    t.InitLevelBuff(this.ySn, this.ISn, this.xAn, this.tll, this.ill);
    t.InitPrepareSelectBuff();
    t.InitPrepareSelectScoreBuff();
    t.ActivityId = this.LOe;
    return t;
  }
}
exports.BossRushLevelDetailInfo = BossRushLevelDetailInfo;
class BossRushLevelRewardData {
  constructor() {
    this.LevelInfo = undefined;
    this.RewardInfo = [];
  }
}
exports.BossRushLevelRewardData = BossRushLevelRewardData;
class BossRushData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.LSn = [];
    this.rll = new Map();
    this.sOn = new Map();
    this.TB_ = new Map();
    this.DSn = [];
    this.RSn = false;
    this.USn = false;
    this.s1a = false;
    this.ASn = [];
    this.PSn = [];
    this.$8i = undefined;
    this.bB_ = new Map();
    this.xSn = (t, e) => {
      var s = this.wSn(t);
      var i = this.wSn(e);
      if (s === i) {
        return t.Id - e.Id;
      } else {
        return i - s;
      }
    };
    this.SNe = (t, e) => {
      var s = this.wSn(e);
      var i = this.wSn(t);
      if (s === i) {
        return t.Id - e.Id;
      } else {
        return s - i;
      }
    };
  }
  PhraseEx(t) {
    this.PSn = t.Xps.MMs;
    this.PhraseLevelInfo(this.PSn, t.Xps.vMs);
    this.CheckIfNewBossRushOpen();
    this.PhraseRewardInfo(t.Xps.pMs);
    this.RefreshTaskData(t.Xps.E$s);
    this.$8i = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRushDataUpdate);
    if (UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, this.GetRewardViewData());
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot, this.Id);
  }
  RefreshSingleTaskData(e) {
    let s = this.sOn.get(e.s5n);
    if (!s) {
      s = new ActivityCommonDefine_1.ActivityTaskData();
      var i = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushTaskConfig(e.s5n).TabId;
      let t = this.TB_.get(i);
      (t = t || []).push(s);
      this.TB_.set(i, t);
    }
    s.Refresh(e);
    this.sOn.set(e.s5n, s);
  }
  RefreshTaskData(t) {
    for (const e of t) {
      this.RefreshSingleTaskData(e);
    }
  }
  GetFinishTaskCount() {
    let t = 0;
    for (const e of this.sOn.values()) {
      if (e.Status === 0 || e.Status === 2) {
        t++;
      }
    }
    return t;
  }
  GetAllTaskCount() {
    return this.sOn.size;
  }
  GetBossRushAllTabData() {
    var t = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushTabListByActivityId(this.Id);
    var e = new Array();
    for (const s of t) {
      e.push(s);
    }
    return e;
  }
  GetTabRedDotState(t) {
    t = this.TB_.get(t);
    if (t) {
      for (const e of t) {
        if (e.Status === 0) {
          return true;
        }
      }
    }
    return false;
  }
  RebuildData() {
    if (this.$8i) {
      this.PhraseEx(this.$8i);
    }
  }
  SetInsSelectedBuffIdMap(t, e) {
    this.bB_.set(t, e);
  }
  GetInsSelectedBuffId(t) {
    return this.bB_.get(t) ?? [];
  }
  PhraseRewardInfo(t) {
    this.DSn = [];
    for (const s of t) {
      var e = this.BSn(s);
      this.DSn.push(e);
    }
    if (this.$8i) {
      this.$8i.Xps.pMs = t;
    }
  }
  PhraseLevelInfo(t, e) {
    this.ASn = [];
    this.LSn = [];
    this.rll.clear();
    for (const i of e) {
      var s = new BossRushLevelDetailInfo();
      s.Phrase(this.Id, i, t);
      this.ASn.push(s);
      const e = this.bSn(s, i);
      this.LSn.push(...e);
      this.rll.set(s.GetId(), e);
    }
    this.LSn = this.LSn.reverse();
    if (this.$8i) {
      this.$8i.Xps.vMs = e;
      this.$8i.Xps.MMs = t;
    }
  }
  GetBossRushLevelDetailInfoById(t) {
    for (const e of this.ASn) {
      if (e.GetId() === t) {
        return e;
      }
    }
  }
  GetBossRushLevelDetailInfo() {
    return this.ASn;
  }
  GetExDataRedPointShowState() {
    return this.GetPreGuideQuestFinishState() && (this.RSn || this.qSn());
  }
  GetNewUnlockState() {
    return this.USn;
  }
  GetNewBuffState() {
    return this.s1a;
  }
  qSn() {
    for (const t of this.sOn.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    return false;
  }
  oll(t) {
    for (const e of this.LSn) {
      if (e.Id === t && e.RewardState === 1) {
        return true;
      }
    }
    return false;
  }
  GetUnlockedBuffIndices() {
    return this.PSn;
  }
  CheckIfNewBossRushOpen() {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, this.Id, 0, 0);
    var e = this.GSn();
    this.RSn = t < e;
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, this.Id, UNLOCKLOCALKEY, 0);
    this.USn = t < e;
    this.a1a();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  a1a() {
    this.s1a = false;
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, this.Id, UNLOCKBUFFKEY, 0);
    var e = this.h1a();
    if (t < e && e > 0 && (t = this.GetBossRushLevelDetailInfo()[e - 1]) && t.GetConfig()) {
      this.s1a = t.GetConfig().UnlockBuff.length > 0;
    }
  }
  h1a() {
    let e = 0;
    var s = this.GetBossRushLevelDetailInfo();
    var i = s.length;
    for (let t = 0; t < i; t++) {
      if (s[t].GetUnLockState()) {
        e = t;
      }
    }
    return e;
  }
  GSn() {
    let t = 0;
    for (const e of this.GetBossRushLevelDetailInfo()) {
      if (e.GetUnLockState()) {
        t++;
      }
    }
    return t;
  }
  CacheNewBuffUnlock() {
    this.s1a = false;
    var t = this.h1a();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, this.Id, UNLOCKBUFFKEY, 0, t);
    this.a1a();
  }
  CacheNewUnlock() {
    this.USn = false;
    var t = this.GSn();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, this.Id, UNLOCKLOCALKEY, 0, t);
    this.CheckIfNewBossRushOpen();
  }
  CacheCurrentOpenBossNum() {
    var t = this.GSn();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, this.Id, 0, 0, t);
    this.CheckIfNewBossRushOpen();
  }
  EntranceRedDot() {
    return this.GetExDataRedPointShowState();
  }
  HaveRewardCanTake() {
    return this.qSn();
  }
  HaveLevelRewardCanTake(t) {
    return this.oll(t);
  }
  GetRewardPopUpViewData() {
    this.RebuildData();
    return this.GetRewardViewData();
  }
  GetRewardViewData() {
    var t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushFullPoint"), this.GetFullScore().toString());
    return {
      DataPageList: [{
        DataList: this.LSn.sort(this.xSn),
        TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushLevelRewardText"),
        TabTips: " "
      }, {
        DataList: this.DSn.sort(this.SNe),
        TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushScoreRewardText"),
        TabTips: t
      }],
      Source: "BossRush"
    };
  }
  wSn(t) {
    let e = 0;
    switch (t.RewardState) {
      case 0:
        e = 2;
        break;
      case 1:
        e = 3;
        break;
      case 2:
        e = 1;
        break;
      default:
        e = 4;
    }
    return e;
  }
  GetFullScore() {
    let t = 0;
    for (const e of this.ASn) {
      t += e.GetScore();
    }
    return t;
  }
  BSn(t) {
    var e = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushScoreConfigById(t.N6n);
    var s = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushFullScoreTips"), e.Score.toString());
    return {
      Id: t.N6n,
      NameText: s,
      RewardState: Number(t.TMs),
      ClickFunction: () => {
        BossRushController_1.BossRushController.RequestGetBossRushReward(this.Id, t.N6n, Protocol_1.Aki.Protocol.Tks.SMs);
      },
      RewardList: this.I2e(e.RewardId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.kbn(Number(t.TMs)))
    };
  }
  kbn(t) {
    let e = "";
    switch (t) {
      case 0:
        e = "PrefabTextItem_1443074454_Text";
        break;
      case 1:
        e = "CollectActivity_state_CanRecive";
        break;
      case 2:
        e = "CollectActivity_state_recived";
    }
    return e;
  }
  I2e(t) {
    var e;
    var s;
    var i = [];
    for ([e, s] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t)) {
      i.push([{
        ItemId: e,
        IncId: 0
      }, s]);
    }
    return i;
  }
  bSn(e, s) {
    const i = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushByActivityIdAndInstanceId(this.Id, s.r6n);
    var r = [];
    for (let t = 0; t < s.YM_.length; t++) {
      var n = s.YM_[t];
      var o = i.LevelScoreRewardList[t];
      var o = {
        Id: e.GetId(),
        NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.LevelRewardDesc),
        NameTextArgs: ["" + o?.Item1, "" + s.SMs],
        RewardState: Number(n),
        ClickFunction: () => {
          BossRushController_1.BossRushController.RequestGetBossRushLevelReward(this.Id, i.Id, i.InstId, t++);
        },
        RewardList: this.I2e(o.Item2),
        RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.kbn(Number(n)))
      };
      r.push(o);
    }
    return r;
  }
  LB_(t) {
    var e = t.Status;
    var s = t.Current;
    var i = t.Target;
    const r = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushTaskConfig(t.Id);
    return {
      Id: t.Id,
      NameText: StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Title), i.toString()),
      NameTextArgs: ["" + s, "" + i],
      RewardState: ActivityCommonDefine_1.taskStateToRewardStateResolver[e],
      ClickFunction: () => {
        BossRushController_1.BossRushController.RequestBossRushTaskReward(r.ActivityId);
      },
      RewardList: this.I2e(r.DropId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.kbn(ActivityCommonDefine_1.taskStateToRewardStateResolver[e]))
    };
  }
  GetTabRewardData(t) {
    if (t === 0) {
      return [];
    }
    t = this.TB_.get(t);
    if (!t) {
      return [];
    }
    var e = [];
    for (const i of t) {
      var s = this.LB_(i);
      e.push(s);
    }
    return e.sort(this.SNe);
  }
  GetRewardByLevelId(t) {
    return this.rll.get(t ?? 0) ?? [];
  }
  SetRewardStateClaimed(t, e) {
    var t = this.rll.get(t);
    if (t &&= t[e]) {
      t.RewardState = 2;
    }
  }
  GetExDataFinishShowState() {
    for (const t of this.sOn.values()) {
      if (t.Status !== 2) {
        return false;
      }
    }
    return true;
  }
  GetFinishAndUnclaimedTaskList() {
    var t = [];
    for (const e of this.sOn.values()) {
      if (e.Status === 0) {
        t.push(e.Id);
      }
    }
    return t;
  }
}
exports.BossRushData = BossRushData;
//# sourceMappingURL=BossRushData.js.map