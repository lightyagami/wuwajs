"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FragmentMemoryMainViewOpenData = exports.FragmentMemoryTopicData = exports.FragmentMemoryCollectData = undefined;
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const LevelGeneralCommons_1 = require("../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class FragmentMemoryCollectData {
  constructor() {
    this.xe = 0;
    this.ige = 0;
    this.iwn = undefined;
    this._be = 0;
  }
  GetId() {
    return this.xe;
  }
  GetFlag() {
    return this.ige;
  }
  GetIfCanGetReward() {
    return this.GetIfUnlock() && !this.GetIfGetReward();
  }
  GetIfUnlock() {
    return (this.ige & 1) == 1;
  }
  GetTopicData() {
    return this.iwn;
  }
  GetIfGetReward() {
    return (this.ige >> 1 & 1) == 1;
  }
  GetTraceEntityId() {
    return this.GetConfig().TraceEntityId;
  }
  GetTraceMarkId() {
    return this.GetConfig().TraceMarkId;
  }
  GetTrackMapId() {
    return this.GetConfig().TrackMapId;
  }
  GetQuestList() {
    return this.GetConfig().QuestIdList;
  }
  GetFinishTime() {
    return this._be;
  }
  PhraseFromConfig(t) {
    this.xe = t.Id;
  }
  GetRank() {
    return this.GetConfig().Rank;
  }
  Phrase(t) {
    this.xe = t.s5n;
    this.ige = t.o5n;
    this._be = Number(MathUtils_1.MathUtils.LongToBigInt(t.kBs)) / 1000;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FragmentRewardRedDot, this.xe);
  }
  GetTimeText() {
    if (this._be === 0) {
      return "";
    } else {
      return TimeUtil_1.TimeUtil.DateFormatString(this._be);
    }
  }
  BindSourceTopic(t) {
    this.iwn = t;
  }
  GetClueEntrance() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueEntrance(this.GetClueId());
  }
  GetClueContent() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueContent(this.GetClueEntrance().ContentGroupId);
  }
  GetClueId() {
    return this.GetConfig().ClueId;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectById(this.xe);
  }
  GetTitle() {
    return this.GetConfig().Title;
  }
  GetTipsDesc() {
    return this.GetConfig().TipsDesc;
  }
  GetDesc() {
    return this.GetConfig().Desc;
  }
  GetDropId() {
    return this.GetConfig().DropId;
  }
  GetPreviewReward() {
    var t;
    var e;
    var r = [];
    for ([t, e] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(this.GetDropId()).DropPreview) {
      var n = [{
        IncId: 0,
        ItemId: t
      }, e];
      r.push(n);
    }
    return r;
  }
  GetThemeBg() {
    return this.GetBgResource();
  }
  GetBgResource() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (t === 1) {
      return this.rwn();
    } else if (t === 0) {
      return this.own();
    } else {
      return "";
    }
  }
  rwn() {
    return this.GetConfig().BgResourceM;
  }
  own() {
    return this.GetConfig().BgResourceF;
  }
}
exports.FragmentMemoryCollectData = FragmentMemoryCollectData;
class FragmentMemoryTopicData {
  constructor() {
    this.xe = 0;
    this.nwn = [];
    this.swn = true;
  }
  GetId() {
    return this.xe;
  }
  Phrase(e) {
    this.xe = e.s5n;
    this.swn = e.K6n;
    this.nwn = [];
    for (const i of e.NBs) {
      var t = new FragmentMemoryCollectData();
      t.Phrase(i);
      var r = ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectById(i.s5n);
      t.PhraseFromConfig(r);
      t.BindSourceTopic(this);
      this.nwn.push(t);
    }
    var n;
    for (const e of ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectConfigListByTopicId(this.xe)) {
      if (!this.nwn.find(t => t.GetId() === e.Id)) {
        (n = new FragmentMemoryCollectData()).PhraseFromConfig(e);
        n.BindSourceTopic(this);
        this.nwn.push(n);
      }
    }
    this.nwn.sort((t, e) => t.GetRank() - e.GetRank());
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FragmentRewardTopicRedDot, this.xe);
  }
  GetFirstOpen() {
    return ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicFirstOpenRedDotState(this.xe);
  }
  GetRedDotState() {
    if (this.GetFirstOpen()) {
      return true;
    }
    for (const t of this.nwn) {
      if (t.GetIfCanGetReward()) {
        return true;
      }
    }
    return false;
  }
  GetCollectRedDotState() {
    for (const t of this.nwn) {
      if (t.GetIfCanGetReward()) {
        return true;
      }
    }
    return false;
  }
  GetClueEntrance() {
    var t = ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(this.xe);
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueEntrance(t.ClueId);
  }
  GetClueContent() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueContent(this.GetClueEntrance().ContentGroupId);
  }
  GetCollectDataList() {
    return this.nwn;
  }
  GetMemoryCollectNum() {
    return this.nwn.length;
  }
  GetCollectRewardDoneState() {
    if (this.nwn.length === 0) {
      return false;
    }
    for (const t of this.nwn) {
      if (!t.GetIfGetReward()) {
        return false;
      }
    }
    return true;
  }
  GetFinishCollectNum() {
    let t = 0;
    for (const e of this.nwn) {
      if (e.GetIfUnlock()) {
        t++;
      }
    }
    return t;
  }
  GetAllCollectState() {
    for (const t of this.nwn) {
      if (!t.GetIfUnlock()) {
        return false;
      }
    }
    return true;
  }
  GetUnlockState() {
    return this.swn;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(this.xe);
  }
  GetConditionDesc() {
    var t = this.GetConfig().ConditionGroupId;
    return LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t) ?? "";
  }
}
exports.FragmentMemoryTopicData = FragmentMemoryTopicData;
class FragmentMemoryMainViewOpenData {
  constructor() {
    this.FragmentMemoryTopicData = undefined;
    this.CurrentSelectId = 0;
  }
}
exports.FragmentMemoryMainViewOpenData = FragmentMemoryMainViewOpenData;
//# sourceMappingURL=FragmentMemoryData.js.map