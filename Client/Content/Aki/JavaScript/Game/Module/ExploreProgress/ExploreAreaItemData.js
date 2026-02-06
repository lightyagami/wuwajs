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
    this.AccessPathId = undefined;
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
    return this.IsRecommend && !this.IsFinishedPlayPoint && this.IsUnlocked() && this.IsNearestPlayPointUnlock();
  }
  Initialize(e) {
    this.AreaId = e.Area;
    this.ExploreType = e.ExploreType;
    this.QHs = e.PhantomSkillId;
    this.$Hs = e.UnlockTextId;
    this.XHs = e.LockTextId;
    this.UnlockConditionId = e.UnlockCondition;
    this.SpecialPlayPointIndexMap = e.SpecialPlayerMap;
    this.IsRecommend = e.IsRecommend;
    this.Jjl = e.IsShowProgress;
    this.SubTypes = Array.from(e.SubTypeScore.keys());
    this.SpecialPlayerDesc = e.SpecialPlayerDesc;
    this.ConfigId = e.Id;
    this.IsShowTrackBtn = e.IsShowTrack;
    this.UnlockTrackType = e.UnlockTrackType;
    this.LockTrackType = e.LockTrackType;
    this.AccessPathId = e.AccessPathId;
    this.YHs = false;
    if (this.QHs !== 0) {
      this.YHs = ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(this.QHs);
    }
    e = ConfigManager_1.ConfigManager.ExploreProgressConfig.GetExploreTypeByType(this.ExploreType);
    this.KHs = e.Name;
    this.JHs = e.CountMode;
    this.Icon = e.Icon;
    this.DescBg = e.DescBg;
    this.SortIndex = e.SortIndex;
    this.LockDescId = e.LockDescId;
    this.DescId = e.DescId;
  }
  Refresh(e) {
    this.VVt = e.BPs;
    this.ExploreProgressId = e.qPs;
    this.HPt = e.EDs;
    this.JXt = e.dvs;
    this.gQl = e.MT_;
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
    var e = "PrefabTextItem_1918495092_Text";
    var t = this.GetNameId();
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t);
    return StringUtils_1.StringUtils.Format(e, t);
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
    var e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(this.QHs);
    if (e) {
      return e.HelpId;
    }
  }
  IsUnlocked() {
    return this.gQl;
  }
  GetLockDetailId() {
    var e;
    if (this.UnlockConditionId && (e = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(this.UnlockConditionId))) {
      return e.HintText;
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
      for (let e = 0; e < this.JXt; e++) {
        this.PlayProgressDataList.push({
          ExploreType: this.ExploreType,
          PlayPointType: 0,
          PlayPointState: e < this.HPt ? 2 : 0
        });
      }
    }
  }
  IsSubType(e) {
    return this.SubTypes.includes(e);
  }
  AddPlayPointData(e) {
    this.PlayIdMap.set(e.PlayId, e);
    this.PlayPointTotalCount++;
    if (e.PlayState === 2) {
      this.PlayPointCompletedCount++;
    } else if (e.PlayState === 1) {
      this.PlayPointToBeCompletedCount++;
    } else {
      this.PlayPointLockedCount++;
    }
    this.PlayProgressDataList.push({
      ExploreType: this.ExploreType,
      PlayPointType: 0,
      PlayPointState: e.PlayState,
      PlayPointId: e.PlayId,
      EntityId: e.EntityId,
      IsClear: e.IsClear,
      ClearInfo: e.ClearInfo,
      IsUnlock: e.IsUnlock
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
      this.PlayProgressDataList.sort((e, t) => t.PlayPointState - e.PlayPointState);
      this.SpecialPlayPointIndexMap.forEach((e, t) => {
        t = this.PlayProgressDataList[t];
        if (t) {
          t.PlayPointType = e;
        }
      });
    }
  }
  HasSpecialPlayPoint() {
    return this.PlayProgressDataList.some(e => e.PlayPointType === 1);
  }
  IsNearestPlayPointUnlock() {
    var e = this.GetNearTrackMapMark();
    let t = true;
    return t = e && e.GameplayLockJumpId !== 0 && e.GameplayLockText !== "" && !this.GetPlayIdIsUnlock(e.RelativeId) ? false : t;
  }
  TrackPoint() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 87, `Track ExploreType: ${this.ExploreType}, AreaId: ${this.AreaId}`);
    }
    if (this.PlayIdMap.size > 0) {
      this.TrackPlayPoint();
    } else {
      this.gZu();
    }
  }
  gZu() {
    var e = this.SubTypes[0];
    ControllerHolder_1.ControllerHolder.ExploreProgressController.ExploreEntityTraceRequest(e, this.AreaId);
  }
  TrackPlayPoint() {
    if (!this.MOl()) {
      if (this.IsFinishedPlayPoint) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ExploreProgress", 69, "探索项已完成，不追踪");
        }
        return false;
      }
      var e = this.yOl();
      var t = this.EOl(e);
      if (t.length === 0) {
        return false;
      }
      t = this.GetMarkByPointState(e, t);
      if (!t) {
        return false;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "导航去附近标记", ["MarkId", t.MarkId], ["MarkType", t.ObjectType], ["MarkName", ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t.MarkTitle)], ["FindState", e]);
      }
      if (e === 1) {
        if (!ModelManager_1.ModelManager.MapModel.IsMarkFogUnlock(t.MarkId)) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MapAreaIsLock");
          return false;
        }
        if (!ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(t.MarkId)) {
          ModelManager_1.ModelManager.MapModel.CreateTempMapMark(t.MarkId);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
          MarkId: t.MarkId,
          MarkType: t.ObjectType,
          Focal: true,
          NeedTempShow: true
        });
      } else if (e === 0) {
        this.t6_(t);
      }
    }
    return true;
  }
  GetNearTrackMapMark() {
    if (!(this.PlayIdMap.size <= 0) && !this.IsFinishedPlayPoint) {
      var e = this.yOl();
      var t = this.EOl(e);
      if (t.length !== 0) {
        return this.GetMarkByPointState(e, t);
      }
    }
  }
  GetMarkByPointState(e, t) {
    switch (e === 0 ? this.LockTrackType : this.UnlockTrackType) {
      case 0:
        return this.IOl(t);
      case 1:
        return this.eKl(t);
    }
  }
  GetPlayIdIsUnlock(e) {
    return this.PlayIdMap.get(e)?.IsUnlock ?? true;
  }
  t6_(e) {
    if (this.e6_?.IsClear) {
      this.i6_();
    } else {
      e = {
        MarkId: e.MarkId,
        MarkType: e.ObjectType,
        Tips: "NoPlayPoint_Text",
        GamePlayId: e.RelativeId,
        ExploreTypeName: this.GetNameId()
      };
      ModelManager_1.ModelManager.WorldMapModel.NavigateMarkShowRangeInfo = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigateMarkAndShowRange, e);
    }
  }
  i6_() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(255);
    e.FunctionMap.set(2, () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "", ["FindPlayIdInfo", this.e6_]);
      }
      var e;
      var t = this.e6_?.ClearInfo;
      if (t) {
        e = (t = t.split("_"))[0].toLowerCase();
        t = t[1];
        if (e === "q") {
          this.r6_(t);
        } else if (e === "l") {
          this.o6_(t);
        }
      }
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  r6_(e) {
    var e = Number(e);
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    var i = t?.GetCurrentActiveChildQuestNode()?.NodeId ?? 0;
    var r = t?.GetDefaultMark(i) ?? 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "清场-找到任务标记", ["QuestId", e], ["QuestInfo", t], ["NodeId", i], ["QuestMarkId", r], ["IsSuspend", t?.IsSuspend()]);
    }
    if (r && !t?.IsSuspend()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: r,
        MarkType: 12,
        Focal: true,
        NeedTempShow: true
      });
      this.n6_(r, 12);
    }
  }
  o6_(e) {
    var e = Number(e);
    var t = this.GetMapMarkByPlayId(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "清场-找到玩法点标记", ["PlayId", e], ["MapMark-Id", t?.MarkId], ["MapMark-Type", t?.ObjectType]);
    }
    if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: t.MarkId,
        MarkType: t.ObjectType,
        Focal: true,
        NeedTempShow: true
      });
      this.n6_(t.MarkId, t.ObjectType);
    }
  }
  n6_(e, t) {
    var i = ModelManager_1.ModelManager.WorldMapModel.NavigateMarkShowRangeInfo;
    if (i?.MarkId === e && i?.MarkType === t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HideNavigateMarkRange);
    }
  }
  MOl() {
    return !(this.PlayIdMap.size > 0) && !(ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(`Track ExploreType: ${this.ExploreType}, AreaId: ${this.AreaId}`), 0);
  }
  yOl() {
    let e = 0;
    return e = this.PlayPointToBeCompletedCount > 0 ? 1 : e;
  }
  EOl(t) {
    const i = [];
    this.PlayIdMap.forEach(e => {
      if (e.PlayState === t) {
        i.push(e);
      }
    });
    if (i.length === 0 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "没有找到玩法状态对应的玩法点列表", ["FindState", t], ["PlayIdMap", this.PlayIdMap]);
    }
    return i;
  }
  IOl(e) {
    if (e.length === 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "没有找到附近的标记", ["InfoList", e]);
      }
    } else {
      const i = ModelManager_1.ModelManager.WorldMapModel.GetPlayerPosition();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "玩家位置(未缩小)", ["MyPos", i]);
      }
      i.DivisionEqual(1000);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "玩家位置(已缩小)", ["MyPos", i], ["Scale", 1000]);
      }
      var t = e.map(e => ({
        Info: e,
        Mark: this.Czl(e)
      })).filter(e => e.Mark !== undefined);
      if (t.length !== 0) {
        t = t.sort((e, t) => {
          if (e.Info.IsUnlock !== t.Info.IsUnlock) {
            if (e.Info.IsUnlock) {
              return -1;
            } else {
              return 1;
            }
          } else {
            e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e.Mark.EntityConfigId, e.Mark.MapId);
            t = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(t.Mark.EntityConfigId, t.Mark.MapId);
            e.DivisionEqual(MapDefine_1.UNIT * 1000);
            t.DivisionEqual(MapDefine_1.UNIT * 1000);
            return Vector_1.Vector.DistSquared(i, e) - Vector_1.Vector.DistSquared(i, t);
          }
        })[0];
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ExploreProgress", 69, "找到附近的标记", ["MarkId", t.Mark.MarkId], ["NearInfo", t.Info]);
        }
        this.e6_ = t.Info;
        return t.Mark;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "没有找到有效的标记", ["InfoList", e]);
      }
    }
  }
  eKl(e) {
    if (e.length === 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "没有找到标记id最小的玩法点", ["InfoList", e]);
      }
    } else {
      var t = e.map(e => ({
        Info: e,
        Mark: this.Czl(e)
      })).filter(e => e.Mark !== undefined);
      if (t.length !== 0) {
        t = t.sort((e, t) => e.Info.IsUnlock !== t.Info.IsUnlock ? e.Info.IsUnlock ? -1 : 1 : e.Mark.MarkId - t.Mark.MarkId)[0];
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ExploreProgress", 69, "找到标记id最小的玩法点", ["MarkId", t.Mark.MarkId], ["Info", t.Info]);
        }
        this.e6_ = t.Info;
        return t.Mark;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "没有找到有效的标记", ["InfoList", e]);
      }
    }
  }
  Czl(e) {
    return this.GetMapMarkByPlayId(e.PlayId);
  }
  GetMapMarkByPlayId(e) {
    var t = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(this.AreaId);
    return ConfigManager_1.ConfigManager.MapConfig.GetMapMarkByRelativeId(e, t.GetSceneId());
  }
  GetPlayPointStateList() {
    return this.PlayProgressDataList.map(e => e.PlayPointState);
  }
  LogInfo() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, "ExploreAreaItemData", ["ExploreType", this.ExploreType], ["ExploreItemName", ConfigManager_1.ConfigManager.TextConfig?.GetMultiTextByKey(this.GetNameId())], ["ConfigId", this.ConfigId], ["ExploreProgressId", this.ExploreProgressId]);
    }
  }
  FinishNewRecommendPlay() {
    this.IsNewRecommendPlay = false;
  }
  SetSequenceData(e) {
    this.SequenceData = e;
  }
  SetFlagSequenceData(e) {
    this.FlagSequenceData = e;
  }
  GetFlagSequenceDataAndClean() {
    var e = this.FlagSequenceData;
    this.FlagSequenceData = false;
    return e;
  }
  GetPlayProgressDataIgnoreHiddenList() {
    return this.PlayProgressDataList.map(e => ({
      ...e,
      IgnoreHiddenType: true
    }));
  }
  SetEntityList(e) {
    this.yJe = e;
    this.CalcEntityDistance();
    this.CreateEntityMark();
  }
  CalcEntityDistance() {
    if (this.yJe && !(this.yJe.length < 2)) {
      var e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(this.AreaId);
      if (e) {
        const s = e.MapConfigId;
        const o = ModelManager_1.ModelManager.WorldMapModel.GetPlayerPosition();
        let i = Number.MAX_VALUE;
        let r = 0;
        o.DivisionEqual(1000);
        this.yJe.forEach((e, t) => {
          e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, s);
          e.DivisionEqual(1000);
          e = Vector_1.Vector.DistSquared(o, e);
          if (e < i) {
            i = e;
            r = t;
          }
        });
        if (r > 0) {
          e = this.yJe[r];
          this.yJe.splice(r, 1);
          this.yJe.unshift(e);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 87, "找不到区域配置信息", ["AreaId", this.AreaId]);
      }
    }
  }
  CreateEntityMark() {
    var e;
    var t;
    var i;
    var r;
    if (this.yJe && this.yJe.length !== 0) {
      if (e = ExploreProgressDefine_1.exploreType2MarkType.get(this.ExploreType)) {
        if (t = ExploreProgressDefine_1.exploreType2Config.get(this.ExploreType)) {
          if (i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(this.AreaId)) {
            r = this.yJe[0];
            r = ModelManager_1.ModelManager.MapModel.CreateDyMarkByEntity(r, e, t, i.MapConfigId);
            ModelManager_1.ModelManager.MapModel.AddPendingTempMapMarkList(r);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
              MarkId: r,
              MarkType: e,
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