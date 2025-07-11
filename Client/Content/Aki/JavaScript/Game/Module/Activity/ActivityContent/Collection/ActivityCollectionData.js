"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCollectionData = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityCollectionController_1 = require("./ActivityCollectionController");
class ActivityCollectionData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.TaskIdToQuestIdMap = new Map();
    this.QuestStateMap = new Map();
    this.MNe = new Map();
    this.ENe = -1;
    this.SNe = (t, e) => {
      var i = this.QuestStateMap.get(t.Id);
      var r = this.QuestStateMap.get(e.Id);
      var [,, i] = this.yNe(i.QuestState, i.ClaimedReward);
      var [,, r] = this.yNe(r.QuestState, r.ClaimedReward);
      if (i === r) {
        return t.Id - e.Id;
      } else {
        return i - r;
      }
    };
  }
  PhraseEx(t) {
    this.RefreshRewardData();
    this.GetTotalProgress();
    t = t.Hps?.vps;
    if (t) {
      for (const o of t) {
        var e;
        var i = this.MNe.get(o.gps);
        var r = this.TaskIdToQuestIdMap.get(o.gps);
        var a = this.QuestStateMap.get(r);
        if (a && i) {
          e = o.Y4n === Protocol_1.Aki.Protocol.dks.Proto_GatherTakeReward;
          [e, r] = (a.ClaimedReward = e, this.QuestStateMap.set(r, a), this.yNe(a.QuestState, a.ClaimedReward));
          i.RewardState = e;
          i.RewardButtonText = r;
          this.MNe.set(o.gps, i);
        }
      }
    }
    ActivityCollectionController_1.ActivityCollectionController.CurrentActivityId = this.Id;
    if (UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, this.GetAllRewardQuestDataList());
    }
  }
  GetExDataRedPointShowState() {
    return this.IsHasRewardRedPoint() || this.IsHasNewQuestRedDot();
  }
  IsHasRewardRedPoint() {
    for (const t of this.QuestStateMap.entries()) {
      if (t[1].QuestState === 3 && !t[1].ClaimedReward) {
        return true;
      }
    }
    return false;
  }
  IsHasNewQuestRedDot() {
    for (var [t, e] of this.QuestStateMap.entries()) {
      if (e.QuestState !== 3 && e.QuestState !== 0) {
        if (ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, t, 0, 0)) {
          return true;
        }
      }
    }
    return false;
  }
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  GetAllRewardQuestDataList() {
    this.RefreshRewardData();
    return {
      DataPageList: [{
        DataList: Array.from(this.MNe.values()).sort(this.SNe)
      }],
      Source: "Collection"
    };
  }
  GetProgressState() {
    var [t, e] = this.GetCurrentProgress();
    if (t === this.GetTotalProgress()) {
      return 2;
    } else if (e) {
      return 0;
    } else {
      return 1;
    }
  }
  GetCurrentProgress() {
    let i = 0;
    let r = true;
    this.QuestStateMap.forEach((t, e) => {
      if (t.QuestState >= 2) {
        r = false;
      }
      if (t.QuestState === 3) {
        i++;
      }
    });
    return [i, r];
  }
  GetCurrentProgressQuestId() {
    for (const t of this.QuestStateMap.entries()) {
      if (t[1].QuestState <= 2) {
        return t[0];
      }
    }
    return 0;
  }
  GetTotalProgress() {
    var t;
    if (this.ENe === -1) {
      t = ConfigManager_1.ConfigManager.ActivityCollectionConfig.GetAllActivityCollectionConfig();
      this.ENe = t.length;
    }
    return this.ENe;
  }
  RefreshRewardData() {
    let t = 0;
    for (const s of ConfigManager_1.ConfigManager.ActivityCollectionConfig.GetAllActivityCollectionConfig()) {
      var e;
      var i;
      var r;
      var a;
      var o = this.MNe.get(s.Id);
      if (o) {
        e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(s.PlayTask);
        i = this.QuestStateMap.get(s.PlayTask);
        [i, r] = this.yNe(i.QuestState, i.ClaimedReward);
        o.NameText = e?.TidName ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidName) : "";
        o.RewardState = i;
        o.RewardButtonText = r;
        this.MNe.set(s.Id, o);
      } else {
        e = this.INe(s.Reward);
        i = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(s.PlayTask);
        r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s.PlayTask);
        [o, a] = this.yNe(r, false);
        a = {
          QuestState: r,
          ClaimedReward: !(o = {
            NameText: i?.TidName ? PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TidName) : "",
            RewardState: o,
            RewardList: e,
            RewardButtonText: a,
            Id: s.PlayTask,
            ClickFunction: () => {
              ActivityCollectionController_1.ActivityCollectionController.RequestCollectionQuestReward(s.Id);
            }
          }),
          QuestUnlockStamp: this.TNe(this.BeginOpenTime, t)
        };
        this.TaskIdToQuestIdMap.set(s.Id, s.PlayTask);
        this.QuestStateMap.set(s.PlayTask, a);
        this.MNe.set(s.Id, o);
        t++;
      }
    }
  }
  TNe(t, e) {
    t = new Date(t * TimeUtil_1.TimeUtil.InverseMillisecond);
    t.setHours(TimeUtil_1.TimeUtil.CrossDayHour);
    t = t.getTime() * TimeUtil_1.TimeUtil.Millisecond;
    return t + e * TimeUtil_1.TimeUtil.OneDaySeconds;
  }
  yNe(t, e) {
    let i = 0;
    let r = "";
    let a = 0;
    switch (t) {
      case 0:
      case 1:
        i = 0;
        r = "CollectActivity_state_unopen";
        a = 2;
        break;
      case 2:
        i = 0;
        r = "CollectActivity_state_open";
        a = 1;
        break;
      case 3:
        i = e ? 2 : 1;
        r = "CollectActivity_state_CanRecive";
        a = e ? 3 : 0;
    }
    r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r);
    return [i, r, a];
  }
  INe(t) {
    var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t)?.DropPreview;
    var e = [];
    if (t) {
      for (var [i, r] of t) {
        i = [{
          IncId: 0,
          ItemId: i
        }, r];
        e.push(i);
      }
    }
    return e;
  }
}
exports.ActivityCollectionData = ActivityCollectionData;
//# sourceMappingURL=ActivityCollectionData.js.map