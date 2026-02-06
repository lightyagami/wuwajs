"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FarmGoldData = exports.FarmGoldLevelData = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const FarmGoldController_1 = require("./FarmGoldController");
const UNLOCKLOCALKEY = 100;
const DIFFICULTYLOCALKEY = 101;
class FarmGoldLevelData {
  constructor() {
    this.LOe = 0;
    this.kwl = 0;
    this.ae = 0;
    this.IsOpen = false;
    this.Owl = 0;
    this.Nwl = false;
    this.Fwl = undefined;
    this.Xy = 0;
  }
  GetInstId() {
    return this.kwl;
  }
  GetStartTime() {
    return this.ae;
  }
  GetIsOpen() {
    var t = this.GetConfig().PreLevel;
    let e = true;
    if (t > 0 && (t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe).GetLevelInfoByInstId(t))) {
      e = t.GetIfPassLevel();
    }
    return TimeUtil_1.TimeUtil.GetServerTime() >= this.ae && e;
  }
  GetIfPassLevel() {
    return this.Owl >= this.GetConfig().PassScore;
  }
  GetPoint() {
    return this.Owl;
  }
  GetHasGetLevelReward() {
    return this.Nwl;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldConfigByActivityIdAndInstId(this.LOe, this.kwl);
  }
  GetRecommendLevel() {
    return this.GetDifficultConfig().RecommendedLevel;
  }
  GetFinishState() {
    return this.GetIfPassLevel();
  }
  GetRedDotState() {
    return this.GetNewOpenState();
  }
  GetSelectDifficultIndex() {
    if (this.Fwl !== undefined) {
      var e = ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldAllDifficult();
      for (let t = 0; t < e.length; t++) {
        if (e[t].Id === this.Fwl) {
          return t;
        }
      }
    } else if (this.Xy > 0) {
      var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe).GetLevelDataByIndex(this.Xy - 1);
      if (t) {
        return t.GetSelectDifficultIndex();
      }
    }
    return 0;
  }
  SaveDifficultyState() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.LOe, this.LOe, DIFFICULTYLOCALKEY, this.kwl, this.Fwl ?? 1);
  }
  y7g() {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.LOe, 0, this.LOe, DIFFICULTYLOCALKEY, this.kwl);
    if (t !== 0) {
      this.Fwl = t;
    }
  }
  GetInstanceBg() {
    return this.GetInstanceConfig().BannerPath;
  }
  GetSelectDifficult() {
    if (this.Fwl !== undefined) {
      return this.Fwl;
    }
    if (this.Xy > 0) {
      var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe).GetLevelDataByIndex(this.Xy - 1);
      if (t) {
        return t.GetSelectDifficult();
      }
    }
    return 1;
  }
  GetDifficultConfig() {
    return ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldDifficultById(this.GetSelectDifficult());
  }
  SetDifficult(t) {
    this.Fwl = t;
    this.SaveDifficultyState();
  }
  GetNewOpenState() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.LOe, 0, this.LOe, UNLOCKLOCALKEY, this.kwl) === 0 && this.GetIsOpen();
  }
  GetUnlockTimeText() {
    var t;
    var e;
    if (TimeUtil_1.TimeUtil.GetServerTime() < this.ae) {
      t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(this.ae - TimeUtil_1.TimeUtil.GetServerTime());
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FarmGoldUnLockTime");
      return StringUtils_1.StringUtils.Format(e, t.CountDownText);
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FarmGoldUnlockCondition");
    }
  }
  SaveOpenState() {
    if (this.GetIsOpen()) {
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.LOe, this.LOe, UNLOCKLOCALKEY, this.kwl, 1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.LOe);
    }
  }
  GetNameText() {
    var t = this.GetInstanceConfig().MapName;
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
  }
  GetDescText() {
    var t = this.GetInstanceConfig().DungeonDesc;
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
  }
  GetSubTitleText() {
    return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FarmGoldHighestPoint"), this.Owl.toString());
  }
  GetRecommendElement() {
    return this.GetInstanceConfig().RecommendElement;
  }
  GetInstanceConfig() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.kwl);
  }
  GetInstanceEntranceId() {
    return this.GetConfig().EntranceId;
  }
  FinishLevelReward() {
    this.Nwl = true;
  }
  GetMonsterTips() {
    var t = this.GetInstanceConfig().MonsterTips;
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
  }
  GetMonsterPreviewState() {
    return this.GetInstanceConfig().MonsterPreview.length > 0;
  }
  Phrase(t, e, i) {
    this.Xy = i;
    this.LOe = t;
    this.kwl = e.r6n;
    this.ae = e.Mps;
    this.IsOpen = e.Sps;
    this.Owl = e.Eps;
    this.Nwl = e.Gwl;
    this.y7g();
  }
}
exports.FarmGoldLevelData = FarmGoldLevelData;
class FarmGoldData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.Vwl = new Array();
    this.DSn = [];
    this.Hwl = new Array();
    this.LSn = [];
    this.$8i = undefined;
    this.SNe = (t, e) => {
      var i = this.wSn(e);
      var r = this.wSn(t);
      if (i === r) {
        return t.Id - e.Id;
      } else {
        return i - r;
      }
    };
    this.xSn = (t, e) => {
      var i = this.wSn(t);
      var r = this.wSn(e);
      if (i === r) {
        return t.Id - e.Id;
      } else {
        return r - i;
      }
    };
  }
  PhraseEx(t) {
    this.$8i = t;
    this.Vwl = t.bwl.qwl;
    this.PhraseLevelData(t.bwl.uE_);
    this.PhraseRewardInfo();
  }
  AddFinishPointId(t) {
    for (const e of t) {
      if (!this.Vwl.includes(e)) {
        this.$8i?.bwl.qwl.push(e);
        this.Vwl.push(e);
      }
    }
  }
  FinishLevelReward(t) {
    for (const i of t) {
      var e = this.GetLevelInfoByInstId(i);
      if (e) {
        e.FinishLevelReward();
      }
      for (const r of this.$8i.bwl.uE_) {
        if (r.r6n === i) {
          r.Gwl = true;
        }
      }
    }
  }
  GetAllCanClaimLevelRewardIds() {
    var t = [];
    for (const e of this.Hwl) {
      if (!e.GetHasGetLevelReward() && e.GetIfPassLevel()) {
        t.push(e.GetInstId());
      }
    }
    return t;
  }
  GetAllCanClaimScoreRewardIds() {
    var t = [];
    var e = this.GetCurrentFullScore();
    for (const i of ConfigManager_1.ConfigManager.FarmGoldConfig.GetScoreConfigByActivityId(this.Id)) {
      if (!this.Vwl.includes(i.Id) && e >= i.Score) {
        t.push(i.Id);
      }
    }
    return t;
  }
  GetCurrentFullScore() {
    let t = 0;
    for (const e of this.Hwl) {
      t += e.GetPoint();
    }
    return t;
  }
  PhraseLevelData(e) {
    this.Hwl = [];
    this.LSn = [];
    for (let t = 0; t < e.length; t++) {
      var i = e[t];
      var r = new FarmGoldLevelData();
      r.Phrase(this.Id, i, t);
      this.S7g(r, t);
      this.Hwl.push(r);
      var i = this.bSn(r);
      this.LSn.push(i);
    }
  }
  S7g(t, e) {
    if (t.GetSelectDifficult() === undefined && e > 0 && (e = this.GetLevelDataByIndex(e - 1))) {
      t.SetDifficult(e.GetSelectDifficult());
    }
  }
  RestoreDifficultySettings() {
    for (let t = 0; t < this.Hwl.length; t++) {
      var e = this.Hwl[t];
      this.S7g(e, t);
    }
  }
  RefreshLevelData(e) {
    for (const r of this.$8i.bwl.uE_) {
      if (r.r6n === e.r6n) {
        r.Eps = e.Eps;
        r.Gwl = e.Gwl;
        break;
      }
    }
    var t;
    var i = this.Hwl.find(t => t.GetInstId() === e.r6n);
    if (i) {
      t = this.Hwl.findIndex(t => t.GetInstId() === e.r6n);
      i.Phrase(this.Id, e, t);
    }
    this.PhraseLevelData(this.$8i.bwl.uE_);
  }
  PhraseRewardInfo() {
    this.DSn = [];
    var t = this.GetCurrentFullScore();
    for (const i of ConfigManager_1.ConfigManager.FarmGoldConfig.GetScoreConfigByActivityId(this.Id)) {
      var e = this.BSn(i.Id, this.Vwl, t);
      this.DSn.push(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FarmGoldRefreshRewardRedDot, this.Id);
  }
  bSn(t) {
    var e = t.GetConfig();
    var i = t.GetHasGetLevelReward();
    var t = t.GetPoint() >= e.PassScore;
    var i = i ? 2 : t ? 1 : 0;
    return {
      Id: e.Id,
      NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.LevelRewardDesc),
      RewardState: i,
      ClickFunction: () => {
        var t = this.GetAllCanClaimLevelRewardIds();
        if (t.length > 0) {
          FarmGoldController_1.FarmGoldController.RequestFarmGoldLevelPlay(this.Id, t);
        }
      },
      RewardList: this.I2e(e.RewardId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.kbn(Number(i)))
    };
  }
  BSn(t, e, i) {
    var r = ConfigManager_1.ConfigManager.FarmGoldConfig.GetScoreConfigById(t);
    var n = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FarmGoldFullScoreTips"), r.Score.toString());
    var e = e.includes(t) ? 2 : i >= r.Score ? 1 : 0;
    return {
      Id: r.RewardId,
      NameText: n,
      RewardState: e,
      ClickFunction: () => {
        var t = this.GetAllCanClaimScoreRewardIds();
        if (t.length > 0) {
          FarmGoldController_1.FarmGoldController.RequestFarmGoldPoint(this.Id, t);
        }
      },
      RewardList: this.I2e(r.RewardId),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.kbn(e))
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
    var i;
    var r = [];
    for ([e, i] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t)) {
      r.push([{
        ItemId: e,
        IncId: 0
      }, i]);
    }
    return r;
  }
  GetExDataRedPointShowState() {
    return this.GetPreGuideQuestFinishState() && (this.qSn() || this.gu_());
  }
  GetExDataFinishShowState() {
    if (!this.$8i) {
      return false;
    }
    for (const t of this.DSn) {
      if (t.RewardState !== 2) {
        return false;
      }
    }
    for (const e of this.LSn) {
      if (e.RewardState !== 2) {
        return false;
      }
    }
    return true;
  }
  gu_() {
    for (const t of this.Hwl) {
      if (t.GetNewOpenState()) {
        return true;
      }
    }
    return false;
  }
  qSn() {
    for (const t of this.DSn) {
      if (t.RewardState === 1) {
        return true;
      }
    }
    for (const e of this.LSn) {
      if (e.RewardState === 1) {
        return true;
      }
    }
    return false;
  }
  EntranceRedDot() {
    return this.GetExDataRedPointShowState();
  }
  RebuildData() {
    if (this.$8i) {
      this.PhraseEx(this.$8i);
    }
  }
  GetRewardPopUpViewData() {
    this.RebuildData();
    return this.GetRewardViewData();
  }
  GetAllRewardClaimedAndTotalNum() {
    let t = 0;
    let e = 0;
    for (const i of this.LSn) {
      e++;
      if (i.RewardState === 2) {
        t++;
      }
    }
    for (const r of this.DSn) {
      e++;
      if (r.RewardState === 2) {
        t++;
      }
    }
    return {
      ClaimedNum: t,
      TotalNum: e
    };
  }
  GetScoreDesc() {
    return this.GetCurrentFullScore().toString();
  }
  GetRewardViewData() {
    var t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FarmGoldFullPoint"), this.GetCurrentFullScore().toString());
    return {
      DataPageList: [{
        DataList: this.LSn.sort(this.xSn),
        TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FarmGoldLevelRewardText"),
        TabTips: " "
      }, {
        DataList: this.DSn.sort(this.SNe),
        TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FarmGoldScoreRewardText"),
        TabTips: t
      }],
      Source: "FarmGold"
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
  GetLevelInfoByInstId(e) {
    return this.Hwl.find(t => t.GetInstId() === e);
  }
  HaveRewardCanTake() {
    return this.qSn();
  }
  SaveOpenState(t) {
    t = this.GetLevelInfoByInstId(t);
    if (t) {
      t.SaveOpenState();
    }
  }
  GetInsOpenState(t) {
    t = this.GetLevelInfoByInstId(t);
    return !!t && t.GetNewOpenState();
  }
  GetInsUnlockState(t) {
    t = this.GetLevelInfoByInstId(t);
    if (t) {
      return t.GetUnlockTimeText();
    } else {
      return "";
    }
  }
  GetInsUnlockText(t) {
    t = this.GetLevelInfoByInstId(t);
    if (t) {
      return t.GetUnlockTimeText();
    } else {
      return "";
    }
  }
  GetAllLevelData() {
    return this.Hwl;
  }
  GetLevelDataByIndex(t) {
    return this.Hwl[t];
  }
  GetLevelNameTextByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    if (t) {
      return t.GetNameText();
    } else {
      return "";
    }
  }
  GetLevelDescTextByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    if (t) {
      return t.GetDescText();
    } else {
      return "";
    }
  }
  GetLevelRecommendElementByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    if (t) {
      return t.GetRecommendElement();
    } else {
      return [];
    }
  }
  GetLevelSubTitleTextByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    if (t) {
      return t.GetSubTitleText();
    } else {
      return "";
    }
  }
  GetLevelLockStateByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return !!t && !t.GetIsOpen();
  }
  GetLevelInstanceDungeonIdByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    if (t) {
      return t.GetInstId();
    } else {
      return 0;
    }
  }
  GetLevelUnlockTextByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    if (t) {
      return t.GetUnlockTimeText();
    } else {
      return "";
    }
  }
  GetLevelFinishStateByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return !!t && t.GetFinishState();
  }
  GetLevelRecommendLevelByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    if (t) {
      return t.GetRecommendLevel();
    } else {
      return 0;
    }
  }
  GetLevelRedDotStateByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    return !!t && t.GetRedDotState();
  }
  GetLevelDifficultIndexByIndex(t) {
    const e = this.GetLevelDataByIndex(t);
    if (e) {
      return e.GetSelectDifficultIndex();
    }
    if (t > 0) {
      const e = this.GetLevelDataByIndex(t - 1);
      if (e) {
        return e.GetSelectDifficultIndex();
      }
    }
    return 1;
  }
  GetLevelBgByIndex(t) {
    t = this.GetLevelDataByIndex(t);
    if (t) {
      return t.GetInstanceBg();
    } else {
      return "";
    }
  }
  GetDifficultTogText(t) {
    t = ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldDifficultById(t);
    return (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Desc) ?? "") + "•" + StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FarmGoldPointMultiply") ?? "", (t.Magnification / 100).toString());
  }
  GetDifficultTitle(t) {
    t = ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldDifficultById(t);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Desc) + "•" + StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FarmGoldPointMultiply") ?? "", (t.Magnification / 100).toString());
  }
  GetDifficultRecommendLevel(t) {
    return ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldDifficultById(t).RecommendedLevel;
  }
  SetInsDifficult(t, e) {
    t = this.GetLevelInfoByInstId(t);
    if (t) {
      t.SetDifficult(e);
    }
  }
}
(exports.FarmGoldData = FarmGoldData).CurrentSelectEntranceId = 0;
//# sourceMappingURL=FarmGoldData.js.map