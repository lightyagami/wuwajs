"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreAreaItemData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const MapDefine_1 = require("../Map/MapDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const ExploreProgressDefine_1 = require("./ExploreProgressDefine");
class ExploreAreaItemData {
  constructor() {
    this.AreaId = 0;
    this.ExploreType = 0;
    this.ExploreProgressId = 0;
    this.ConfigId = 0;
    this.VVt = 0;
    this.HPt = 0;
    this.JXt = 0;
    this.KHs = undefined;
    this.QHs = 0;
    this.$Hs = undefined;
    this.XHs = undefined;
    this.YHs = false;
    this.JHs = 0;
    this.Icon = undefined;
    this.DescBg = undefined;
    this.SortIndex = 0;
    this.LockDescId = undefined;
    this.DescId = undefined;
    this.SubTypes = [];
    this.UnlockConditionId = undefined;
    this.SpecialPlayPointIndexMap = new Map();
    this.IsRecommend = false;
    this.Jjl = false;
    this.IsShowTrackBtn = false;
    this.IsNewRecommendPlay = false;
    this.SequenceData = undefined;
    this.FlagSequenceData = false;
    this.PlayProgressDataList = [];
    this.PlayPointTotalCount = 0;
    this.PlayPointCompletedCount = 0;
    this.PlayPointToBeCompletedCount = 0;
    this.PlayPointLockedCount = 0;
    this.UnlockTrackType = 0;
    this.LockTrackType = 1;
    this.PlayIdMap = new Map();
    this.e6_ = undefined;
    this.SpecialPlayerDesc = "";
    this.gQl = false;
    this.yJe = [];
  }
  get IsShowProgressBar() {
    return this.Jjl && this.PlayPointTotalCount > 0 && !this.IsCompleted();
  }
  get IsFinishedPlayPoint() {
    return this.PlayPointCompletedCount >= this.PlayPointTotalCount;
  }
  get IsShowRecommendPlayPoint() {
    return this.IsRecommend && !this.IsFinishedPlayPoint && this.IsUnlocked();
  }
  Initialize(t) {
    this.AreaId = t.Area;
    this.ExploreType = t.ExploreType;
    this.QHs = t.PhantomSkillId;
    this.$Hs = t.UnlockTextId;
    this.XHs = t.LockTextId;
    this.UnlockConditionId = t.UnlockCondition;
    this.SpecialPlayPointIndexMap = t.SpecialPlayerMap;
    this.IsRecommend = t.IsRecommend;
    this.Jjl = t.IsShowProgress;
    this.SubTypes = Array.from(t.SubTypeScore.keys());
    this.SpecialPlayerDesc = t.SpecialPlayerDesc;
    this.ConfigId = t.Id;
    this.IsShowTrackBtn = t.IsShowTrack;
    this.UnlockTrackType = t.UnlockTrackType;
    this.LockTrackType = t.LockTrackType;
    this.YHs = false;
    if (this.QHs !== 0) {
      this.YHs = ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(this.QHs);
    }
    t = ConfigManager_1.ConfigManager.ExploreProgressConfig.GetExploreTypeByType(this.ExploreType);
    this.KHs = t.Name;
    this.JHs = t.CountMode;
    this.Icon = t.Icon;
    this.DescBg = t.DescBg;
    this.SortIndex = t.SortIndex;
    this.LockDescId = t.LockDescId;
    this.DescId = t.DescId;
  }
  Refresh(t) {
    this.VVt = t.BPs;
    this.ExploreProgressId = t.qPs;
    this.HPt = t.EDs;
    this.JXt = t.dvs;
    this.gQl = t.MT_;
    this.SOl();
  }
  GetProgress() {
    return this.VVt;
  }
  GetCurrentCount() {
    return this.HPt;
  }
  GetTotalCount() {
    return this.JXt;
  }
  GetNameId() {
    return this.KHs;
  }
  GetPlayDetailTitle() {
    var t = "PrefabTextItem_1918495092_Text";
    var e = this.GetNameId();
    var t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t);
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    return StringUtils_1.StringUtils.Format(t, e);
  }
  IsPercent() {
    return this.JHs === 0;
  }
  IsCompleted() {
    return this.VVt >= 100 || this.HPt > 0 && this.JXt > 0 && this.HPt >= this.JXt;
  }
  HasPhantomSkill() {
    return this.QHs !== 0;
  }
  GetUnlockTextId() {
    return this.$Hs;
  }
  GetLockTextId() {
    return this.XHs;
  }
  GetIsPhantomSkillUnlock() {
    return this.YHs;
  }
  GetPhantomSkillHelpId() {
    var t = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(this.QHs);
    if (t) {
      return t.HelpId;
    }
  }
  IsUnlocked() {
    return this.gQl;
  }
  GetLockDetailId() {
    var t;
    if (this.UnlockConditionId && (t = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(this.UnlockConditionId))) {
      return t.HintText;
    } else {
      return "";
    }
  }
  SOl() {
    if (!(this.PlayProgressDataList.length > 0) && this.Jjl) {
      this.PlayPointCompletedCount = this.HPt;
      this.PlayPointToBeCompletedCount = 0;
      this.PlayPointLockedCount = this.JXt - this.HPt;
      this.PlayPointTotalCount = this.JXt;
      for (let t = 0; t < this.JXt; t++) {
        this.PlayProgressDataList.push({
          ExploreType: this.ExploreType,
          PlayPointType: 0,
          PlayPointState: t < this.HPt ? 2 : 0
        });
      }
    }
  }
  IsSubType(t) {
    return this.SubTypes.includes(t);
  }
  AddPlayPointData(t) {
    this.PlayIdMap.set(t.PlayId, t);
    this.PlayPointTotalCount++;
    if (t.PlayState === 2) {
      this.PlayPointCompletedCount++;
    } else if (t.PlayState === 1) {
      this.PlayPointToBeCompletedCount++;
    } else {
      this.PlayPointLockedCount++;
    }
    this.PlayProgressDataList.push({
      ExploreType: this.ExploreType,
      PlayPointType: 0,
      PlayPointState: t.PlayState,
      PlayPointId: t.PlayId,
      EntityId: t.EntityId,
      IsClear: t.IsClear,
      ClearInfo: t.ClearInfo
    });
  }
  ClearPlayPointData() {
    this.PlayIdMap.clear();
    this.PlayPointTotalCount = 0;
    this.PlayPointCompletedCount = 0;
    this.PlayPointToBeCompletedCount = 0;
    this.PlayPointLockedCount = 0;
    this.PlayProgressDataList.length = 0;
  }
  PlayPointDataAddFinish() {
    if (this.PlayProgressDataList.length !== 0) {
      this.PlayProgressDataList.sort((t, e) => e.PlayPointState - t.PlayPointState);
      this.SpecialPlayPointIndexMap.forEach((t, e) => {
        e = this.PlayProgressDataList[e];
        if (e) {
          e.PlayPointType = t;
        }
      });
    }
  }
  HasSpecialPlayPoint() {
    return this.PlayProgressDataList.some(t => t.PlayPointType === 1);
  }
  TrackPoint() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 87, `Track ExploreType: ${this.ExploreType}, AreaId: ${this.AreaId}`);
    }
    if (this.PlayIdMap.size > 0) {
      this.TrackPlayPoint();
    } else {
      this.mKu();
    }
  }
  mKu() {
    var t = this.SubTypes[0];
    ControllerHolder_1.ControllerHolder.ExploreProgressController.ExploreEntityTraceRequest(t, this.AreaId);
  }
  TrackPlayPoint() {
    if (!this.MOl()) {
      if (this.IsFinishedPlayPoint) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ExploreProgress", 69, "探索项已完成，不追踪");
        }
        return false;
      }
      var t = this.yOl();
      var e = this.EOl(t);
      if (e.length === 0) {
        return false;
      }
      e = this.GetMarkByPointState(t, e);
      if (!e) {
        return false;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "导航去附近标记", ["MarkId", e.MarkId], ["MarkType", e.ObjectType], ["MarkName", ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e.MarkTitle)], ["FindState", t]);
      }
      if (t === 1) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
          MarkId: e.MarkId,
          MarkType: e.ObjectType,
          Focal: true,
          NeedTempShow: true
        });
      } else if (t === 0) {
        this.t6_(e);
      }
    }
    return true;
  }
  GetMarkByPointState(t, e) {
    switch (t === 0 ? this.LockTrackType : this.UnlockTrackType) {
      case 0:
        return this.IOl(e);
      case 1:
        return this.eKl(e);
    }
  }
  t6_(t) {
    if (this.e6_?.IsClear) {
      this.i6_();
    } else {
      t = {
        MarkId: t.MarkId,
        MarkType: t.ObjectType,
        Tips: "NoPlayPoint_Text",
        GamePlayId: t.RelativeId,
        ExploreTypeName: this.GetNameId()
      };
      ModelManager_1.ModelManager.WorldMapModel.NavigateMarkShowRangeInfo = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigateMarkAndShowRange, t);
    }
  }
  i6_() {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(255);
    t.FunctionMap.set(2, () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "", ["FindPlayIdInfo", this.e6_]);
      }
      var t;
      var e = this.e6_?.ClearInfo;
      if (e) {
        t = (e = e.split("_"))[0].toLowerCase();
        e = e[1];
        if (t === "q") {
          this.r6_(e);
        } else if (t === "l") {
          this.o6_(e);
        }
      }
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  r6_(t) {
    var t = Number(t);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
    var i = e?.GetCurrentActiveChildQuestNode()?.NodeId ?? 0;
    var r = e?.GetDefaultMark(i) ?? 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "清场-找到任务标记", ["QuestId", t], ["QuestInfo", e], ["NodeId", i], ["QuestMarkId", r], ["IsSuspend", e?.IsSuspend()]);
    }
    if (r && !e?.IsSuspend()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: r,
        MarkType: 12,
        Focal: true,
        NeedTempShow: true
      });
      this.n6_(r, 12);
    }
  }
  o6_(t) {
    var t = Number(t);
    var e = this.GetMapMarkByPlayId(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "清场-找到玩法点标记", ["PlayId", t], ["MapMark-Id", e?.MarkId], ["MapMark-Type", e?.ObjectType]);
    }
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: e.MarkId,
        MarkType: e.ObjectType,
        Focal: true,
        NeedTempShow: true
      });
      this.n6_(e.MarkId, e.ObjectType);
    }
  }
  n6_(t, e) {
    var i = ModelManager_1.ModelManager.WorldMapModel.NavigateMarkShowRangeInfo;
    if (i?.MarkId === t && i?.MarkType === e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HideNavigateMarkRange);
    }
  }
  MOl() {
    return !(this.PlayIdMap.size > 0) && !(ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(`Track ExploreType: ${this.ExploreType}, AreaId: ${this.AreaId}`), 0);
  }
  yOl() {
    let t = 0;
    return t = this.PlayPointToBeCompletedCount > 0 ? 1 : t;
  }
  EOl(e) {
    const i = [];
    this.PlayIdMap.forEach(t => {
      if (t.PlayState === e) {
        i.push(t);
      }
    });
    if (i.length === 0 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "没有找到玩法状态对应的玩法点列表", ["FindState", e], ["PlayIdMap", this.PlayIdMap]);
    }
    return i;
  }
  IOl(t) {
    let s = undefined;
    let o = undefined;
    let a = Number.MAX_VALUE;
    const h = ModelManager_1.ModelManager.WorldMapModel.GetPlayerPosition();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "玩家位置(未缩小)", ["MyPos", h]);
    }
    h.DivisionEqual(1000);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "玩家位置(已缩小)", ["MyPos", h], ["Scale", 1000]);
    }
    t.forEach(t => {
      var e;
      var i;
      var r = this.Czl(t);
      if (r && (e = r.EntityConfigId, i = r.MapId, e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("ExploreProgress", 69, "标记位置(未缩小)", ["MarkPos", e]), e.DivisionEqual(MapDefine_1.UNIT * 1000), Log_1.Log.CheckDebug() && Log_1.Log.Debug("ExploreProgress", 69, "标记位置(已缩小)", ["MarkPos", e]), i = Vector_1.Vector.DistSquared(h, e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("ExploreProgress", 69, "计算标记与玩家的距离", ["标记id", r.MarkId], ["标记的位置", e], ["距离的平方", i], ["Info", t]), i < a)) {
        a = i;
        s = r;
        o = t;
      }
    });
    if (s) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "找到附近的标记", ["MarkId", s.MarkId], ["NearInfo", o]);
      }
      this.e6_ = o;
      return s;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "没有找到附近的标记", ["InfoList", t]);
    }
  }
  eKl(t) {
    let i = undefined;
    let r = undefined;
    t.forEach(t => {
      var e = this.Czl(t);
      if (e && (!i || e.MarkId < i.MarkId)) {
        i = e;
        r = t;
      }
    });
    if (i) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "找到标记id最小的玩法点", ["MarkId", i.MarkId], ["Info", r]);
      }
      this.e6_ = r;
      return i;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "没有找到标记id最小的玩法点", ["InfoList", t]);
    }
  }
  Czl(t) {
    return this.GetMapMarkByPlayId(t.PlayId);
  }
  GetMapMarkByPlayId(t) {
    var e = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(this.AreaId);
    return ConfigManager_1.ConfigManager.MapConfig.GetMapMarkByRelativeId(t, e.GetSceneId());
  }
  GetPlayPointStateList() {
    return this.PlayProgressDataList.map(t => t.PlayPointState);
  }
  LogInfo() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, "ExploreAreaItemData", ["ExploreType", this.ExploreType], ["ExploreItemName", ConfigManager_1.ConfigManager.TextConfig?.GetMultiTextByKey(this.GetNameId())], ["ConfigId", this.ConfigId], ["ExploreProgressId", this.ExploreProgressId]);
    }
  }
  FinishNewRecommendPlay() {
    this.IsNewRecommendPlay = false;
  }
  SetSequenceData(t) {
    this.SequenceData = t;
  }
  SetFlagSequenceData(t) {
    this.FlagSequenceData = t;
  }
  GetFlagSequenceDataAndClean() {
    var t = this.FlagSequenceData;
    this.FlagSequenceData = false;
    return t;
  }
  GetPlayProgressDataIgnoreHiddenList() {
    return this.PlayProgressDataList.map(t => ({
      ...t,
      IgnoreHiddenType: true
    }));
  }
  SetEntityList(t) {
    this.yJe = t;
    this.CalcEntityDistance();
    this.CreateEntityMark();
  }
  CalcEntityDistance() {
    if (this.yJe && !(this.yJe.length < 2)) {
      var t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(this.AreaId);
      if (t) {
        const s = t.MapConfigId;
        const o = ModelManager_1.ModelManager.WorldMapModel.GetPlayerPosition();
        let i = Number.MAX_VALUE;
        let r = 0;
        o.DivisionEqual(1000);
        this.yJe.forEach((t, e) => {
          t = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(t, s);
          t.DivisionEqual(1000);
          t = Vector_1.Vector.DistSquared(o, t);
          if (t < i) {
            i = t;
            r = e;
          }
        });
        if (r > 0) {
          t = this.yJe[r];
          this.yJe.splice(r, 1);
          this.yJe.unshift(t);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 87, "找不到区域配置信息", ["AreaId", this.AreaId]);
      }
    }
  }
  CreateEntityMark() {
    var t;
    var e;
    var i;
    var r;
    if (this.yJe && this.yJe.length !== 0) {
      if (t = ExploreProgressDefine_1.exploreType2MarkType.get(this.ExploreType)) {
        if (e = ExploreProgressDefine_1.exploreType2Config.get(this.ExploreType)) {
          if (i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(this.AreaId)) {
            r = this.yJe[0];
            r = ModelManager_1.ModelManager.MapModel.CreateDyMarkByEntity(r, t, e, i.MapConfigId);
            ModelManager_1.ModelManager.MapModel.AddPendingTempMapMarkList(r);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
              MarkId: r,
              MarkType: t,
              Focal: true
            });
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("ExploreProgress", 87, "找不到探索项对应的区域id配置", ["ExploreType", this.ExploreType]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("ExploreProgress", 87, "找不到探索项对应的标记id配置", ["ExploreType", this.ExploreType]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ExploreProgress", 87, "找不到探索项对应的标记类型", ["ExploreType", this.ExploreType]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ExploreProgress", 87, "实体Id列表为空");
    }
  }
}
exports.ExploreAreaItemData = ExploreAreaItemData;
//# sourceMappingURL=ExploreAreaItemData.js.map