"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMarkMgr = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine");
const MarkPanelPoolFactory_1 = require("../../../Container/MarkPanelPoolFactory");
const MarkSpritePool_1 = require("../../../Container/MarkSpritePool");
const MapController_1 = require("../../../Controller/MapController");
const MapDefine_1 = require("../../../MapDefine");
const MapUtil_1 = require("../../../MapUtil");
const CustomMarkItem_1 = require("../../../Marks/MarkItem/CustomMarkItem");
const MarkItemUtil_1 = require("../../../Marks/MarkItemUtil");
const MapLogger_1 = require("../../../Misc/MapLogger");
const MapMarkContainer_1 = require("./MapMarkContainer");
class MapMarkMgr {
  constructor(e) {
    this.tUi = undefined;
    this.iUi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper();
    this.oUi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper();
    this.MapType = 2;
    this.ylh = new MapMarkContainer_1.MapMarkContainer();
    this.lUi = 1;
    this._Ui = 0;
    this.z3t = 0;
    this.Cfc = 1;
    this.uUi = e => {
      this.DUi(e, this.tUi, this.iUi);
    };
    this.mUi = e => {
      this.RUi(e, this.tUi, this.iUi);
    };
    this.ixa = e => {
      if (e === this.MapType) {
        var i = this.GetMarkItemsByType(9);
        let t = `---自定义标记信息---地图类型:${e}
`;
        i?.forEach(e => {
          t = `${"" + t}MarkId:${e.MarkId},
UiPosition:${e.UiPosition.ToString()},
WorldPosition:${e.WorldPosition.ToString()}

`;
        });
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Map", 63, t);
        }
      }
    };
    this.xll = (e, t, i) => {
      t = this.iUi.AddMarkItem(t, i);
      e.SetHierarchyIndex(t);
    };
    this.Pll = (e, t) => {
      this.iUi.RemoveMarkItem(e, t);
    };
    this.CreateDynamicMark = (e, t = true) => {
      if (t && this.ylh.ExistMarkItemTask(e.MarkType, e.MarkId)) {
        MapLogger_1.MapLogger.ErrorOnce(e.MarkId, 63, "MarkMgr.CreateDynamicMark->重复添加标记,任务队列已存在", ["MarkId", e.MarkId], ["MarkType", e.MarkType]);
        return;
      }
      if (this.ylh.ExistMarkItem(e.MarkType, e.MarkId)) {
        MapLogger_1.MapLogger.ErrorOnce(e.MarkId, 63, "MarkMgr.CreateDynamicMark->重复添加标记,已存在", ["MarkId", e.MarkId], ["MarkType", e.MarkType]);
      } else {
        t = MarkItemUtil_1.MarkItemUtil.Create(e, this.MapType, this.lUi, this.tUi);
        if (t) {
          this.AddMarkItem(t.MarkType, t);
          return t;
        }
      }
    };
    this.CreateTempMapMark = e => {
      var t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
      if (t) {
        var i = this.ylh.GetMarkItem(t.ObjectType, e);
        if (i !== undefined) {
          i.MarkItemEntity.IsTempMapMark = true;
        } else {
          i = MarkItemUtil_1.MarkItemUtil.CreateConfigMark(t.MarkId, t, this.MapType, this.lUi, this.tUi);
          if (i) {
            i.MarkItemEntity.IsTempMapMark = true;
            this.AddMarkItem(i.MarkType, i);
            return i;
          }
        }
      } else {
        MapLogger_1.MapLogger.DebugOnce(e, 63, "创建临时静态标记失败,找不到MapMark配置", ["MapMarkId", e]);
      }
    };
    this.CUi = (e, t, i) => {
      t = this.GetMarkItem(e, t);
      if (t && t instanceof CustomMarkItem_1.CustomMarkItem && (t.SetConfigId(i), t.IsTracked)) {
        this.gUi(e, t.MarkId, false);
        this.gUi(e, t.MarkId, true);
      }
    };
    this.fUi = (e, t) => {
      this.ylh.RemoveDynamicMark(e, t);
    };
    this.gUi = (e, t, i, s = false) => {
      this.ylh.TrackMapMark(e, t, i, s);
      this.RefreshMarkHierarchyIndexByTrack(e, t, i);
    };
    this.ngt = e => {
      this.ylh.TrackMark(e);
    };
    this.sgt = e => {
      this.ylh.UnTrackMark(e);
    };
    this._Xt = () => {
      this.ylh.ClearTrackMark();
    };
    this.pUi = () => {
      var e = this.GetMarkItemsByType(11);
      if (e && e.size > 0) {
        this.vUi(11);
      }
      this.MUi();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayerMarkItemChanged);
    };
    this.uRi = e => {
      e = this.GetMarkItem(0, e);
      if (e !== undefined && e.IsTracked && e.MarkType !== 34) {
        MapController_1.MapController.RequestTrackMapMark({
          MarkType: e.MarkType,
          MarkId: e.MarkId,
          Track: false
        });
      }
    };
    this.Gd_ = e => {
      if (!e) {
        e = this.GetMarkItemsByType(34, true);
        if (e) {
          for (const t of e.values()) {
            if (t.IsTracked) {
              MapController_1.MapController.RequestTrackMapMark({
                MarkType: t.MarkType,
                MarkId: t.MarkId,
                Track: false
              });
            }
          }
        }
      }
    };
    this.Jpe = (e, t, i) => {
      var s = t.Entity.GetComponent(0);
      var r = s.GetPbEntityInitData();
      var n = s.GetEntityConfigType();
      if (n !== Protocol_1.Aki.Protocol.rLs.Proto_OldEntity && n !== Protocol_1.Aki.Protocol.rLs.Proto_Character && !MapUtil_1.MapUtil.IsTemporaryTeleportEntity(r)) {
        if ((n = s.GetBaseInfo())?.MapIcon) {
          this.EUi(n.MapIcon, t.Id, i);
        }
      }
    };
    this.zpe = (e, t) => {
      this.ylh.RemoveNeedUpdateMark(t.Id);
      this.RemoveMarkItem(7, t.Id)?.Destroy();
    };
    this.MapType = e.MapType;
    this._Ui = e.MapId;
    this.z3t = e.InstanceDungeonId;
    this.lUi = e.MarkScale;
    this.tUi = e.MarkContainer;
    this.Cfc = e.Gravity ?? 1;
  }
  Initialize() {
    this.dde();
  }
  Dispose() {
    this.Cde();
    MarkPanelPoolFactory_1.MarkItemViewPoolFactory.Dispose();
    MarkSpritePool_1.MarkSpritePool.Dispose();
    this.vUi(undefined);
  }
  OnMapSetup(e) {
    this.vUi(undefined, e);
    this.SUi();
    this.yUi();
    this.MUi();
  }
  OnChangeWorldMap(e, t, i) {
    if (this.z3t !== t || this.Cfc !== i) {
      this._Ui = e;
      this.z3t = t;
      this.Cfc = i;
      this.OnMapSetup(false);
    } else {
      MapLogger_1.MapLogger.Debug(63, "地图系统->切换地图标记失败， 地图参数没有发生变化", ["InstanceDungeonIdInner", this.z3t], ["instanceId", t], ["MapId", e], ["MapGravity", this.Cfc], ["gravity", i]);
    }
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapReplaceMarkResponse, this.CUi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateMapMark, this.CreateDynamicMark);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateTempMapMark, this.CreateTempMapMark);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveMapMark, this.fUi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMapMark, this.gUi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMark, this.ngt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnTrackMark, this.sgt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearTrackMark, this._Xt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ScenePlayerChanged, this.pUi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ScenePlayerLeaveScene, this.pUi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnlockTeleport, this.uRi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Jpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMarkItemViewCreate, this.uUi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMarkItemViewDestroy, this.mUi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TakeMarkComponentEnterContainer, this.xll);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TakeMarkComponentExitContainer, this.Pll);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LogCustomMarkInfo, this.ixa);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapReplaceMarkResponse, this.CUi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateMapMark, this.CreateDynamicMark);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateTempMapMark, this.CreateTempMapMark);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveMapMark, this.fUi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMapMark, this.gUi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMark, this.ngt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearTrackMark, this._Xt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ScenePlayerChanged, this.pUi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ScenePlayerLeaveScene, this.pUi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnlockTeleport, this.uRi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Jpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnTrackMark, this.sgt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMarkItemViewCreate, this.uUi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMarkItemViewDestroy, this.mUi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TakeMarkComponentEnterContainer, this.xll);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TakeMarkComponentExitContainer, this.Pll);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LogCustomMarkInfo, this.ixa);
  }
  vUi(e, t) {
    this.ylh.ClearMarkItems(e, t);
    if (!e) {
      this.iUi.ClearData();
      this.oUi.ClearData();
    }
  }
  AddMarkItem(e, t) {
    this.ylh.AddMarkItem(e, t);
  }
  RemoveMarkItem(e, t) {
    return this.ylh.RemoveMarkItem(e, t);
  }
  DUi(e, t, i) {
    var s = e.Holder;
    if (s && this.MapType === s.MapType && t !== undefined && e.GetRootItem()) {
      e.GetRootItem().SetUIParent(t);
      e.SetScale(this.lUi);
      t = i.AddMarkItem(s.MarkType, s.ShowPriority);
      e.GetRootItem().SetHierarchyIndex(t);
    }
  }
  RUi(e, t, i) {
    var s = e.Holder;
    if (s && this.MapType === s.MapType && e.GetRootItem() && t === e.GetRootItem().GetParentAsUIItem()) {
      i.RemoveMarkItem(e.Holder.MarkType, e.Holder.ShowPriority);
      e.SetScale(this.lUi);
    }
  }
  GetMarkItemsByType(e, t = true) {
    return this.ylh.GetMarkItemsByType(e, t);
  }
  GetMarkItem(e, t) {
    return this.ylh.GetMarkItem(e, t);
  }
  GetAllMarkItems() {
    return this.ylh.GetAllMarkItems();
  }
  GetMarkItemsByClickPosition(e) {
    return this.ylh.GetMarkItemsByClickPosition(e);
  }
  UpdateNearbyMarkItem(e, t, i) {
    this.ylh.UpdateNearbyMarkItem(e, t, i);
  }
  Tick() {
    this.ylh.Tick();
    MarkPanelPoolFactory_1.MarkItemViewPoolFactory.Tick();
    MarkSpritePool_1.MarkSpritePool.Tick();
  }
  FindNearbyMarkItems(e, t, i) {
    return this.ylh.FindNearbyMarkItems(e, t, i);
  }
  SUi() {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetMapMarkListByInstanceDungeonId(this.z3t);
    var t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMarks(this._Ui);
    var i = new Map();
    for (const a of e.concat(t)) {
      if (!i.has(a.MarkId)) {
        i.set(a.MarkId, a);
      }
    }
    var s;
    var e = Array.from(i.values());
    ModelManager_1.ModelManager.WorldMapModel.EnableInstanceDungeonFilterMark = false;
    var r = ModelManager_1.ModelManager.WorldMapModel.IsPlayerInActivityInstanceDungeon();
    for (const h of e) {
      var n = ModelManager_1.ModelManager.TrackModel.IsTracking(1, h.MarkId);
      if (h.CreateOnStart === 1 || n) {
        if (r && h.InstanceDungeonId === this.z3t) {
          ModelManager_1.ModelManager.WorldMapModel.EnableInstanceDungeonFilterMark = true;
        }
        n = this._Ui === h.MapId;
        const _ = MarkItemUtil_1.MarkItemUtil.CreateConfigMark(h.MarkId, h, this.MapType, this.lUi, this.tUi);
        if (MapDefine_1.mapLoadDirectlyConfigMarkSet.has(h.ObjectType) && !_.IsInConsistentDistrict()) {
          this.AddMarkItem(h.ObjectType, _);
        } else {
          this.ylh.AddCreateMarkTask(n, h.ObjectType, h.MarkId, () => {
            this.AddMarkItem(h.ObjectType, _);
          });
        }
      }
    }
    for (const [o, M] of ModelManager_1.ModelManager.MapModel.GetEntityPendingList()) {
      const v = EntitySystem_1.EntitySystem.Get(o);
      if (v) {
        s = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(M);
        this.ylh.AddCreateMarkTask(true, s?.ObjectType ?? 0, M, () => {
          var e = v.GetComponent(1)?.Owner;
          this.EUi(M, o, e);
        });
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "找不到实体对象", ["实体ID", o.toString()]);
      }
    }
    this.no_();
  }
  no_() {
    var e;
    for (const t of ModelManager_1.ModelManager.MapModel.GetPendingAddTempMapMarkList()) {
      const i = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(t);
      if (i) {
        if ((e = this.ylh.GetMarkItem(i.ObjectType, t)) !== undefined) {
          e.MarkItemEntity.IsTempMapMark = true;
        } else {
          e = this._Ui === i.MapId;
          this.ylh.AddCreateMarkTask(e, i.ObjectType, i.MarkId, () => {
            var e = MarkItemUtil_1.MarkItemUtil.CreateConfigMark(i.MarkId, i, this.MapType, this.lUi, this.tUi);
            e.MarkItemEntity.IsTempMapMark = true;
            this.AddMarkItem(i.ObjectType, e);
          });
        }
      } else {
        MapLogger_1.MapLogger.DebugOnce(t, 63, "创建临时静态标记失败,找不到MapMark配置", ["MapMarkId", t]);
      }
    }
  }
  yUi() {
    for (const t of ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().values()) {
      for (const i of t.values()) {
        var e = this._Ui === i.MapId;
        this.ylh.AddCreateMarkTask(e, i.MarkType, i.MarkId, () => {
          this.CreateDynamicMark(i, false);
        });
      }
    }
  }
  MUi() {
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      var e;
      for (const i of ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers()) {
        if (i.GetPlayerId() !== ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
          var t = ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(i.GetPlayerId())?.PlayerNumber ?? 1;
          var t = new MapDefine_1.PlayerMarkCreateInfo(i.GetPlayerId(), t, i.GetLocation().ToUeVectorOld(), ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
          const s = MarkItemUtil_1.MarkItemUtil.Create(t, this.MapType, this.lUi, this.tUi);
          if (ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(this._Ui)) {
            s.IsInAoiRange = true;
          }
          this.ylh.AddCreateMarkTask(this._Ui === s.MapId, 11, s.MarkId, () => {
            this.AddMarkItem(11, s);
          });
        }
      }
      for (const r of ModelManager_1.ModelManager.OnlineModel.OtherScenePlayerDataList) {
        if (r.PlayerId !== ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
          e = ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(r.PlayerId)?.PlayerNumber ?? 1;
          e = new MapDefine_1.PlayerMarkCreateInfo(r.PlayerId, e, r.Location?.ToUeVectorOld() ?? Vector_1.Vector.ZeroVector, r.MapId);
          e = MarkItemUtil_1.MarkItemUtil.Create(e, this.MapType, this.lUi, this.tUi);
          if (ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(this._Ui)) {
            e.IsInAoiRange = true;
          }
          this.AddMarkItem(11, e);
        }
      }
    }
  }
  GetTrackMenuMarkList() {
    return this.ylh.GetTrackMenuMarkList();
  }
  GetNavigateMarkList() {
    return this.ylh.GetNavigateMarkList();
  }
  EUi(e, t, i) {
    if (ObjectUtils_1.ObjectUtils.IsValid(i)) {
      t = MarkItemUtil_1.MarkItemUtil.CreateEntityMark(t, e, this.tUi, i, this.MapType, this.lUi);
      this.AddMarkItem(7, t);
    }
  }
  ResetAllMapMarks() {
    this.OnMapSetup();
  }
  RefreshMarkHierarchyIndexBySelect(t, i, s) {
    i = this.GetMarkItem(t, i);
    if (i !== undefined && !i.IsDestroy && i.View && i.View.ViewInitialized && !i.IsTracked) {
      var r = i.ShowPriority;
      let e = 0;
      e = s ? (this.iUi.RemoveMarkItem(t, r), this.iUi.AddMarkItem(t, 200000)) : (this.iUi.RemoveMarkItem(t, 200000), this.iUi.AddMarkItem(t, r));
      i.View.GetRootItem().SetHierarchyIndex(e);
    }
  }
  RefreshMarkHierarchyIndexByTrack(t, i, s) {
    i = this.GetMarkItem(t, i);
    if (i !== undefined && !i.IsDestroy && i.View && i.View.ViewInitialized) {
      var r = i.ShowPriority;
      let e = 0;
      e = s ? (this.iUi.RemoveMarkItem(t, r), this.iUi.AddMarkItem(t, 100000)) : (this.iUi.RemoveMarkItem(t, 100000), this.iUi.AddMarkItem(t, r));
      i.View.GetRootItem().SetHierarchyIndex(e);
    }
  }
}
exports.MapMarkMgr = MapMarkMgr;
//# sourceMappingURL=MapMarkMgr.js.map