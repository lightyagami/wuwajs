"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infiniteMowingTowerColor = exports.lockMowingTowerColor = exports.normalMowingTowerColor = exports.bgInfiniteMowingTowerColor = exports.bgLockMowingTowerColor = exports.bgNormalMowingTowerColor = exports.MowingTowerData = exports.MowingTowerLevelRewardData = exports.MowingTowerLevelDetailInfo = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const MowingTowerController_1 = require("./MowingTowerController");
const MowingTowerModel_1 = require("./MowingTowerModel");
const UNLOCKLOCALKEY = 100;
class MowingTowerLevelDetailInfo {
  constructor() {
    this.LOe = 0;
    this.xe = 0;
    this.ULl = 0;
    this.DLl = 0;
    this.SSn = 0;
    this.ySn = [];
    this.xAn = [];
    this.ALl = [];
    this.xLl = [];
    this.jFe = false;
  }
  Phrase(e, t) {
    this.LOe = e;
    this.SetId(t.ELl);
    this.SetFirstScore(t.DM_);
    this.SetLowerScore(t.BM_);
    this.SetUnLockTime(Number(t.yzs));
    this.jFe = t.K6n;
    this.ySn = [];
    this.xAn = [];
    if (t.Dks.length === 0) {
      e = new MowingTowerModel_1.MowingTowerBuffInfo();
      e.BuffId = 0;
      e.Slot = 1;
      e.ChangeAble = true;
      this.ySn.push(e);
    } else {
      for (const a of t.Dks) {
        var r = new MowingTowerModel_1.MowingTowerBuffInfo();
        r.BuffId = a;
        r.Slot = 1;
        r.ChangeAble = true;
        this.ySn.push(r);
      }
    }
    for (const h of this.GetConfig().OptionalBuff) {
      var i = new MowingTowerModel_1.MowingTowerBuffInfo();
      i.BuffId = h;
      i.Slot = 1;
      i.ChangeAble = true;
      this.xAn.push(i);
    }
    this.ALl = [];
    let o = 0;
    for (const l of t.qM_) {
      var s = new MowingTowerModel_1.MowingTowerRoleInfo();
      s.RoleId = l;
      s.Slot = o;
      o++;
      this.ALl.push(s);
    }
    this.xLl = [];
    for (const u of t.OM_) {
      var n = new MowingTowerModel_1.MowingTowerRoleInfo();
      n.RoleId = u;
      n.Slot = o;
      o++;
      this.xLl.push(n);
    }
  }
  SetId(e) {
    this.xe = e;
  }
  SetFirstScore(e) {
    this.ULl = e;
  }
  SetLowerScore(e) {
    this.DLl = e;
  }
  SetUnLockTime(e) {
    this.SSn = e;
  }
  GetId() {
    return this.xe;
  }
  GetNormalTexturePath() {
    return this.GetConfig().NormalTexture;
  }
  GetLockTexturePath() {
    return this.GetConfig().LockTexture;
  }
  GetRecommendElementIdArray(e) {
    return this.GetInstanceDungeonConfig(e).RecommendElement;
  }
  GetUnLockState() {
    return this.jFe;
  }
  GetScore() {
    return this.ULl + this.DLl;
  }
  GetFirstScore() {
    return this.ULl;
  }
  GetLowScore() {
    return this.DLl;
  }
  GetLevelTips() {
    return this.GetConfig().LevelTips;
  }
  GetUnlockTimeText() {
    var e;
    var t;
    if (TimeUtil_1.TimeUtil.GetServerTime() < this.SSn) {
      e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(this.GetUnLockTime() - TimeUtil_1.TimeUtil.GetServerTime());
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MowingTowerUnLockTime");
      return StringUtils_1.StringUtils.Format(t, e.CountDownText);
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MowingTowerUnlockCondition");
    }
  }
  GetUnLockTime() {
    return this.SSn;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.MowingTowerConfig.GetBossMowingTowerConfigById(this.xe);
  }
  GetMaxBuffCount() {
    return this.GetConfig().BuffCount;
  }
  GetInstanceDungeonId() {
    return this.GetConfig().InstIds[0];
  }
  GetIsInfinite() {
    return this.GetConfig().IsInfinite;
  }
  GetLevelDesc() {
    return this.GetConfig().LevelDesc;
  }
  GetInstanceDungeonConfig(e) {
    e = this.GetConfig().InstIds[e];
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
  }
  ConvertToTeamInfo() {
    var e = new MowingTowerModel_1.MowingTowerTeamInfo();
    e.SetCurrentSelectLevel(this);
    var t = [];
    for (const i of this.ALl) {
      t.push(i.RoleId);
    }
    var r = [];
    for (const o of this.xLl) {
      r.push(o.RoleId);
    }
    e.SetCurrentTeamMembers(t, r);
    e.LevelInfo = this;
    e.InitLevelBuff(this.ySn, this.xAn);
    e.InitPrepareSelectBuff();
    e.ActivityId = this.LOe;
    return e;
  }
}
exports.MowingTowerLevelDetailInfo = MowingTowerLevelDetailInfo;
class MowingTowerLevelRewardData {
  constructor() {
    this.LevelInfo = undefined;
    this.RewardInfo = [];
  }
}
exports.MowingTowerLevelRewardData = MowingTowerLevelRewardData;
class MowingTowerData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.rll = new Map();
    this.PLl = false;
    this.USn = false;
    this.MUl = new Map();
    this.$8i = undefined;
  }
  PhraseEx(e) {
    this.MUl.clear();
    this.rll.clear();
    this.PhraseLevelInfo(e.WS_.wLl);
    this.CheckIfNewMowingTowerOpen();
    this.PhraseRewardInfo(e.WS_.wLl);
    this.$8i = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMowingTowerData);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMowingTowerRewardRedDot, this.Id);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  RebuildData() {
    if (this.$8i) {
      this.PhraseEx(this.$8i);
    }
  }
  PhraseRewardInfo(e) {
    for (const r of e) {
      var t = this.bSn(r.ELl, r);
      this.rll.set(r.ELl, t);
    }
  }
  PhraseLevelInfo(t) {
    for (const r of t) {
      let e = this.MUl.get(r.ELl);
      (e = e || new MowingTowerLevelDetailInfo()).Phrase(this.Id, r);
      this.MUl.set(r.ELl, e);
      const t = this.bSn(e.GetId(), r);
      this.rll.set(e.GetId(), t);
    }
    if (this.$8i) {
      this.$8i.WS_.wLl = t;
    }
  }
  GetMowingTowerLevelDetailInfoById(e) {
    for (var [, t] of this.MUl) {
      if (t.GetId() === e) {
        return t;
      }
    }
  }
  GetMowingTowerLevelDetailInfo() {
    return Array.from(this.MUl.values());
  }
  GetExDataRedPointShowState() {
    return this.GetPreGuideQuestFinishState() && (this.PLl || this.qSn());
  }
  GetNewUnlockState() {
    return this.USn;
  }
  qSn() {
    for (var [, e] of this.rll) {
      for (const t of e) {
        if (t.RewardState === 1) {
          return true;
        }
      }
    }
    return false;
  }
  oll(e) {
    var t = this.rll.get(e);
    if (t) {
      for (const r of t) {
        if (r.Id === e && r.RewardState === 1) {
          return true;
        }
      }
    }
    return false;
  }
  CheckIfNewMowingTowerOpen() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, this.Id, 0, 0);
    var t = this.GSn();
    this.PLl = e < t;
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, this.Id, UNLOCKLOCALKEY, 0);
    this.USn = e < t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetCurrentCheckBuffIndex() {
    let t = 0;
    var r = this.GetMowingTowerLevelDetailInfo();
    var i = r.length;
    for (let e = 0; e < i; e++) {
      if (r[e].GetUnLockState()) {
        t = e;
      }
    }
    return t;
  }
  GSn() {
    let e = 0;
    for (const t of this.GetMowingTowerLevelDetailInfo()) {
      if (t.GetUnLockState()) {
        e++;
      }
    }
    return e;
  }
  CacheNewUnlock() {
    this.USn = false;
    var e = this.GSn();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, this.Id, UNLOCKLOCALKEY, 0, e);
    this.CheckIfNewMowingTowerOpen();
  }
  CacheCurrentOpenBossNum() {
    var e = this.GSn();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, this.Id, 0, 0, e);
    this.CheckIfNewMowingTowerOpen();
  }
  EntranceRedDot() {
    return this.GetExDataRedPointShowState();
  }
  HaveRewardCanTake() {
    return this.qSn();
  }
  HaveLevelRewardCanTake(e) {
    return this.oll(e);
  }
  GetFullScore() {
    let e = 0;
    for (var [, t] of this.MUl) {
      e += t.GetScore();
    }
    return e;
  }
  kbn(e) {
    let t = "";
    switch (e) {
      case 0:
        t = "PrefabTextItem_1443074454_Text";
        break;
      case 1:
        t = "CollectActivity_state_CanRecive";
        break;
      case 2:
        t = "CollectActivity_state_recived";
    }
    return t;
  }
  I2e(e) {
    var t;
    var r;
    var i = [];
    for ([t, r] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(e)) {
      i.push([{
        ItemId: t,
        IncId: 0
      }, r]);
    }
    return i;
  }
  bSn(t, r) {
    var i = [];
    var o = Object.keys(r.kM_);
    for (let e = 0; e < o.length; e++) {
      var s = o[e];
      const a = ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerRewardById(Number(s));
      var s = r.kM_[s];
      var n = a.Score;
      var n = {
        Id: t,
        NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a.LevelRewardDesc),
        NameTextArgs: ["" + n, "" + (r.DM_ + r.BM_)],
        RewardState: Number(s),
        ClickFunction: () => {
          MowingTowerController_1.MowingTowerController.RequestGetMowingTowerLevelReward(this.Id, a.Id, a.MowTowerLevelsId, e++);
        },
        RewardList: this.I2e(a.RewardId),
        RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.kbn(Number(s)))
      };
      i.push(n);
    }
    return i;
  }
  GetRewardByLevelId(e) {
    return this.rll.get(e ?? 0) ?? [];
  }
  SetRewardStateClaimed(e, t) {
    var e = this.rll.get(e);
    if (e &&= e[t]) {
      e.RewardState = 2;
    }
  }
}
exports.MowingTowerData = MowingTowerData;
exports.bgNormalMowingTowerColor = UE.Color.FromHex("ab9559");
exports.bgLockMowingTowerColor = UE.Color.FromHex("757575");
exports.bgInfiniteMowingTowerColor = UE.Color.FromHex("e8713f");
exports.normalMowingTowerColor = UE.Color.FromHex("cfc48a");
exports.lockMowingTowerColor = UE.Color.FromHex("757575");
exports.infiniteMowingTowerColor = UE.Color.FromHex("f1ac61"); //# sourceMappingURL=MowingTowerData.js.map