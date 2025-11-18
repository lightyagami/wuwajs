"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreAreaData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelPlayReportController_1 = require("../LevelPlayReport/LevelPlayReportController");
const ExploreAreaItemData_1 = require("./ExploreAreaItemData");
const ExploreProgressDefine_1 = require("./ExploreProgressDefine");
class ExploreAreaData {
  constructor() {
    this.AreaId = 0;
    this.CountryId = 0;
    this.StateId = 0;
    this.MapId = 0;
    this.VVt = 0;
    this.mOl = 1;
    this.MaxExploreProgress = 100;
    this.HVt = new Map();
    this.jVt = [];
    this.x7l = new Map();
    this.WVt = "";
    this.KVt = 0;
    this.dOl = [];
    this.COl = new Map();
    this.gOl = false;
    this.pOl = false;
    this.v8l = {
      [LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaShow]: false,
      [LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaStory]: false
    };
    this.R7l = false;
    this.PreviewImage = "";
  }
  get IsReachMaxProgress() {
    return this.VVt >= this.MaxExploreProgress;
  }
  fOl(t) {
    if (this.VVt !== t) {
      this.VVt = t;
      this.mOl = this.MaxExploreProgress;
      let e = false;
      for (const r of this.dOl) {
        if (r.Goal > t) {
          this.mOl = r.Goal;
          break;
        }
        if (!r.Achieved) {
          r.State = 1;
          e = true;
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAreaExploreProgressUpdate, this.AreaId);
      if (e) {
        ModelManager_1.ModelManager.ExploreProgressModel.SureHasAreaRewardBox();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMapAreaBoxReward);
      }
    }
  }
  Initialize(e) {
    this.AreaId = e.AreaId;
    this.WVt = e.Title;
    this.KVt = e.SortIndex;
    this.CountryId = e.CountryId;
    this.StateId = e.StateId;
    this.MapId = e.MapConfigId;
    this.vOl();
    e = ConfigManager_1.ConfigManager.AreaConfig.GetStoryConfigByAreaIdAndStage(this.AreaId, 1);
    if (e) {
      this.PreviewImage = e.PicResource;
    }
  }
  vOl() {
    ConfigManager_1.ConfigManager.ExploreProgressConfig.GetAreaStageAwardConfigByAreaId(this.AreaId)?.forEach(e => {
      var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e.DropReward);
      const r = [];
      t?.DropPreview.forEach((e, t) => {
        r.push([{
          ItemId: t,
          IncId: 0
        }, e]);
      });
      t = ModelManager_1.ModelManager.ExploreProgressModel.IsAreaStageRewardIdAchieved(e.Id);
      t = {
        Id: e.Id,
        Goal: e.NeedExploreProgress,
        Rewards: r,
        Achieved: t,
        State: t ? 3 : 2
      };
      this.dOl.push(t);
      this.COl.set(e.Id, t);
    });
    this.mOl = this.dOl[0]?.Goal ?? this.MaxExploreProgress;
  }
  Clear() {
    this.AreaId = 0;
    this.VVt = 0;
    this.mOl = 1;
    this.HVt.clear();
  }
  AddExploreAreaItemData(e) {
    var t;
    var r = e.ExploreType;
    if (!this.HVt.has(r)) {
      (t = new ExploreAreaItemData_1.ExploreAreaItemData()).Initialize(e);
      this.HVt.set(r, t);
      this.jVt.push(t);
    }
  }
  AddExploreAreaItemDataFinish() {
    this.SortExploreAreaItemDataList(this.jVt);
    this.w7l();
  }
  SortExploreAreaItemDataList(e) {
    e.sort((e, t) => {
      if (e.SortIndex !== t.SortIndex) {
        return e.SortIndex - t.SortIndex;
      } else {
        return e.ConfigId - t.ConfigId;
      }
    });
  }
  w7l() {
    this.x7l.clear();
    this.jVt.forEach(t => {
      t.SubTypes.forEach(e => {
        this.x7l.set(e, t.ExploreType);
      });
    });
  }
  Refresh(e) {
    this.fOl(e.BPs);
    var t = ConfigManager_1.ConfigManager.ExploreProgressConfig;
    for (const a of e.HVn) {
      var r = t.GetExploreProgressConfigById(a.qPs)?.ExploreType ?? 0;
      this.HVt.get(r)?.Refresh(a);
    }
  }
  GetExploreAreaItemData(e) {
    return this.HVt.get(e);
  }
  GetAllExploreAreaItemData() {
    return this.jVt;
  }
  GetProgress() {
    return this.VVt;
  }
  GetNameId() {
    return this.WVt;
  }
  GetSortIndex() {
    return this.KVt;
  }
  GetNextStageNeedProgress() {
    return this.mOl;
  }
  GetStageProgress(e = false) {
    e = e ? 100 : 1;
    return this.GetProgress() / this.GetNextStageNeedProgress() * e;
  }
  GetStageRewardDataList() {
    return this.dOl;
  }
  UpdateAchievedStageReward(e) {
    e = this.COl.get(e);
    if (e) {
      e.Achieved = true;
      e.State = 3;
    }
  }
  HasCanTakeStageReward() {
    return this.dOl.some(e => e.State === 1);
  }
  IsCollectAllStageReward() {
    return this.dOl.every(e => e.State === 3);
  }
  IsShowRecommendPlayPoint() {
    for (const e of this.jVt) {
      if (e.IsShowRecommendPlayPoint) {
        return true;
      }
    }
    return false;
  }
  GetRecommendExploreItemDataList(e = true) {
    var t = [];
    for (const r of this.jVt) {
      if (r.IsShowRecommendPlayPoint && (t.push(r), e) && t.length >= ExploreProgressDefine_1.MAX_RECOMMEND_PLAY_POINT_SHOW_NUM) {
        break;
      }
    }
    return t;
  }
  GetShowRecommendExploreItemDataList() {
    const r = [];
    var e = this.GetRecommendExploreItemDataList();
    const i = this.GetLocalAreaExplorePlayStateMap();
    e.forEach(a => {
      const o = i.get(a.ExploreType);
      if (o) {
        a.PlayProgressDataList.forEach((e, t) => {
          var t = o.PlayPointStateList[t];
          var r = e.PlayPointState === 1;
          if (t === 0 && r) {
            e.LastPlayPointState = t;
          }
          i.delete(a.ExploreType);
        });
      } else {
        a.IsNewRecommendPlay = true;
      }
      r.push(a);
    });
    i.forEach((e, t) => {
      t = this.HVt.get(t);
      if (t && t.IsFinishedPlayPoint) {
        r.push(t);
      }
    });
    this.SortExploreAreaItemDataList(r);
    const a = [];
    var t = [];
    for (const o of r) {
      if (o.IsFinishedPlayPoint) {
        a.push(o);
      } else if (o.IsNewRecommendPlay) {
        t.push(o);
      } else {
        t.forEach((e, t) => {
          if (a[t]) {
            a[t].SetSequenceData(e);
            e.SetFlagSequenceData(true);
          }
        });
        t.length = 0;
        a.length = 0;
      }
    }
    return r.filter(e => !e.GetFlagSequenceDataAndClean());
  }
  UpdatePlayPointData(o) {
    this.P7l(o).forEach((e, t) => {
      const a = this.HVt.get(t);
      a.ClearPlayPointData();
      e.forEach(e => {
        var t = o[e];
        var e = Number(e);
        var r = this.qx_(e, t, a);
        a.AddPlayPointData({
          PlayId: e,
          EntityId: t.Nb_,
          PlayState: r ?? 0,
          IsClear: !!t.Y4_,
          ClearInfo: t.Y4_,
          LevelPlayMarkUnlock: t.azd,
          IsUnlock: t.K6n
        });
      });
      a.PlayPointDataAddFinish();
    });
    this.gOl = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AreaPlayPointUpdate, this.AreaId);
  }
  UpdateTraceEntities(e, t) {
    e = this.x7l.get(e);
    if (e) {
      this.HVt.get(e)?.SetEntityList(t);
    }
  }
  qx_(e, t, r) {
    var a = ExploreProgressDefine_1.serverPlayState2Client[t.xI_];
    if (a !== 2) {
      if (t.Bb_ > 0) {
        var o = r.GetMapMarkByPlayId(e);
        if (o?.HistoryState === 1) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("ExploreProgress", 69, "玩法状态转换成已完成", ["PlayId", e], ["MarkId", o?.MarkId], ["MarkName", ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(o?.MarkTitle ?? "")], ["ToState", a], ["ProtoData", t]);
          }
          return 2;
        }
      }
      if (a === 0) {
        o = r.GetMapMarkByPlayId(e);
        if (o && ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(o.MarkId)) {
          return 1;
        }
      }
    }
    return a;
  }
  P7l(e) {
    const a = new Map();
    Object.entries(e).forEach(([e, t]) => {
      var r = this.x7l.get(t.Vb_);
      if (r) {
        if (!a.has(r)) {
          a.set(r, []);
        }
        a.get(r).push(e);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 69, "没有找到探索项子类型映射到的探索类型", ["playId", e], ["playData", t]);
      }
    });
    return a;
  }
  async CheckUpdatePlayPointData() {
    if (!this.gOl) {
      await this.RequestPlayPointData();
    }
  }
  ClearFlagUpdatePlayPointData() {
    this.gOl = false;
  }
  async RequestPlayPointData() {
    await LevelPlayReportController_1.LevelPlayReportController.RequestPlayPointStateAsync(this.AreaId, this.GetSceneId());
  }
  GetSceneId() {
    return this.MapId;
  }
  GetStoryList() {
    const r = this.GetProgress();
    const a = this.GetLocalAreaStoryProgress();
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetStoryList(this.AreaId);
    const o = [];
    e?.forEach(e => {
      var t = {
        IsOpen: r >= e.Unlock
      };
      if (t.IsOpen) {
        t.StoryContent = e.Content;
        t.StoryTitle = e.StageTitle;
      }
      t.LockedDesc = e.LockText;
      t.IsNewOpen = t.IsOpen && e.Unlock > a;
      o.push(t);
    });
    return o;
  }
  GetStoryProgress(e = false) {
    var t = ConfigManager_1.ConfigManager.AreaConfig.GetStoryList(this.AreaId);
    if (!t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "区域故事进度获取失败", ["areaId", this.AreaId]);
      }
      return 0;
    }
    var e = e ? 100 : 1;
    var r = this.GetProgress();
    var a = t[t?.length - 1]?.Unlock ?? this.MaxExploreProgress;
    let o = a;
    for (let e = 0; e < t.length; e++) {
      if (t[e].Unlock > r) {
        o = t[e - 1]?.Unlock ?? 0;
        break;
      }
    }
    return o / a * e;
  }
  HasNewStoryUnlocked() {
    return !!ConfigManager_1.ConfigManager.AreaConfig.GetStoryList(this.AreaId) && this.GetLocalAreaStoryProgress() < this.GetStoryProgress(true) && (this.pOl = true);
  }
  GetLocalAreaStoryProgress() {
    return (LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.AreaStoryProgress) ?? new Map()).get(this.AreaId) ?? 0;
  }
  SaveLocalAreaStoryProgress() {
    var e;
    return !!this.pOl && ((e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.AreaStoryProgress) ?? new Map()).set(this.AreaId, this.GetStoryProgress(true)), LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.AreaStoryProgress, e), this.pOl = true, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AreaStoryProgressSave), true);
  }
  y8l() {
    var e = this.GetProgress();
    return Math.floor(e / ExploreProgressDefine_1.AREA_ICON_UNLOCK_PERCENT);
  }
  GetIconPercentData(e) {
    var t = this.y8l();
    var r = Math.min(t, this.S8l(e));
    var a = r;
    var t = Math.max(0, t - r);
    if (t > 0) {
      this.v8l[e] = true;
    }
    return {
      OpenCount: a,
      NewOpenCount: t,
      IconPath: this.PreviewImage
    };
  }
  GetIconPercentDataAreaShow() {
    return this.GetIconPercentData(LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaShow);
  }
  SaveLocalIconPercentAreaShow() {
    this.M8l(LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaShow);
  }
  GetIconPercentDataAreaStory() {
    return this.GetIconPercentData(LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaStory);
  }
  SaveLocalIconPercentAreaStory() {
    this.M8l(LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaStory);
  }
  S8l(e) {
    return (LocalStorage_1.LocalStorage.GetGlobal(e) ?? new Map()).get(this.AreaId) ?? 0;
  }
  M8l(e) {
    var t;
    if (this.v8l[e]) {
      (t = LocalStorage_1.LocalStorage.GetGlobal(e) ?? new Map()).set(this.AreaId, this.y8l());
      LocalStorage_1.LocalStorage.SetGlobal(e, t);
      this.v8l[e] = false;
    }
  }
  GetStoryViewTitle() {
    var e = "AreaReportName_Text";
    var t = this.GetNameId();
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t);
    return StringUtils_1.StringUtils.Format(e, t);
  }
  SaveLocalAreaExplorePlayState() {
    var e;
    if (!this.R7l) {
      if (this.IsShowRecommendPlayPoint()) {
        (e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.AreaExplorePlayState) ?? new Map()).set(this.AreaId, this.U7l());
        LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.AreaExplorePlayState, e);
        this.R7l = true;
      }
    }
  }
  ClearFlagSaveLocalAreaExplorePlayState() {
    this.R7l = false;
  }
  ClearLocalAreaExplorePlayState() {
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.AreaExplorePlayState, new Map());
  }
  U7l() {
    const r = new Map();
    this.GetRecommendExploreItemDataList().forEach(e => {
      var t = {
        ExploreType: e.ExploreType,
        PlayPointStateList: e.GetPlayPointStateList()
      };
      r.set(e.ExploreType, t);
    });
    return r;
  }
  GetLocalAreaExplorePlayStateMap() {
    return (LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.AreaExplorePlayState) ?? new Map()).get(this.AreaId) ?? new Map();
  }
  GetLocalFinishRecommendExploreItems() {
    if (this.IsShowRecommendPlayPoint()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 69, "当前区域还存在未完成的推荐探索项显示");
      }
      return [];
    }
    var e = this.GetLocalAreaExplorePlayStateMap();
    const t = [];
    e.forEach(e => {
      e = this.GetExploreAreaItemData(e.ExploreType);
      if (e) {
        t.push(e);
      }
    });
    return t;
  }
}
exports.ExploreAreaData = ExploreAreaData;
//# sourceMappingURL=ExploreAreaData.js.map