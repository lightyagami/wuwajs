"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkAssistant = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MapMark_1 = require("../../../../Core/Define/Config/MapMark");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ExploreProgressDefine_1 = require("../../ExploreProgress/ExploreProgressDefine");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const TeleportController_1 = require("../../Teleport/TeleportController");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const MapOperationQueue_1 = require("../Container/MapOperation/MapOperationQueue");
const MapDefine_1 = require("../MapDefine");
const MapUtil_1 = require("../MapUtil");
const MarkItemDataUtil_1 = require("../Marks/MarkItemDataUtil");
class MarkAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.Jpe = (e, r, a) => {
      var o = r.Entity.GetComponent(0);
      var t = o.GetPbEntityInitData();
      if (o.GetEntityConfigType() !== Protocol_1.Aki.Protocol.rLs.Proto_Character && !MapUtil_1.MapUtil.IsTemporaryTeleportEntity(t)) {
        if ((t = o.GetBaseInfo())?.MapIcon) {
          ModelManager_1.ModelManager.MapModel.AddEntityIdToPendingList(r.Id, t.MapIcon);
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.zpe);
        } else {
          this.r5d(t?.Category.ExploratoryDegree, r);
        }
      }
    };
    this.zpe = (e, r) => {
      ModelManager_1.ModelManager.MapModel.RemoveEntityIdToPendingList(r.Id);
      if (ModelManager_1.ModelManager.MapModel.GetEntityPendingList()?.has(r.Id)) {
        EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
    };
    this.o5d = (e, r) => {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.o5d);
      var a = ModelManager_1.ModelManager.MapModel.GetEntityIdToMarkType(r.PbDataId);
      ModelManager_1.ModelManager.MapModel.RemoveEntityIdToMarkType(r.PbDataId);
      if (a !== undefined && e !== Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce) {
        e = ModelManager_1.ModelManager.MapModel.GetMarkByType(a);
        if (e !== undefined && e.size !== 0) {
          for (const o of e.values()) {
            if (o.EntityConfigId === r.PbDataId) {
              ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
                MarkType: a,
                MarkId: o.MarkId,
                Track: false,
                TrackMode: 0
              });
              break;
            }
          }
        }
      }
    };
    this.VLi = e => {
      ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.T7n, true);
      ModelManager_1.ModelManager.MapModel.AddTrackMarkId(e.T7n);
    };
    this.HLi = e => {
      ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.T7n, false);
      ModelManager_1.ModelManager.MapModel.RemoveTrackMarkId(e.T7n);
    };
    this.jLi = e => {
      ModelManager_1.ModelManager.MapModel.ResetDynamicMarkData();
      for (const a of e.cbs) {
        var r = a.L7n === 0 ? Vector2D_1.Vector2D.Create(a.D7n, a.A7n) : Vector_1.Vector.Create(a.D7n, a.A7n, a.L7n);
        var r = new MapDefine_1.DynamicMarkCreateInfo({
          TrackTarget: r,
          MarkConfigId: a.v9n,
          MarkType: MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(a.U7n),
          MarkId: a.T7n,
          DestroyOnUnTrack: false,
          EntityConfigId: a.A5n,
          IsServerDisable: a.Kb_,
          MapAndDungeonInfo: {
            MapConfigId: a.w7n
          }
        });
        ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(r);
      }
      for (const o of e.dbs) {
        ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(o.T7n, o.q5n, false, o.Cbs);
      }
      for (const t of e.vbs) {
        ModelManager_1.ModelManager.MapModel.SetMarkServerOpenState(t, true);
      }
      ModelManager_1.ModelManager.MapModel.ClearMarkHideInfo();
      for (const n of e.pm1) {
        ModelManager_1.ModelManager.MapModel.UpdateMarkHideInfo(n);
      }
      this.Wcc(e);
    };
    this.rf1 = e => {
      for (const r of e.pm1) {
        ModelManager_1.ModelManager.MapModel.UpdateMarkHideInfo(r);
      }
    };
    this.WLi = e => {
      if (!ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() || ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() || !MapDefine_1.addMarkFilterInTeamModeSet.has(e.YVn.U7n)) {
        if (e.Xb_) {
          for (const r of e.Xb_.ubs) {
            this.cNa(r);
          }
        }
        this.cNa(e.YVn, e.pbs);
      }
    };
    this.tYa = e => {
      var r = e.T7n;
      var e = e.Kb_;
      var a = ModelManager_1.ModelManager.MapModel.GetDynamicMark(r);
      if (a) {
        a.IsServerDisable = e;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "[地图系统]->MarkAssistant动态标记状态更新失败，没找到标记", ["markId", r], ["isDisable", e]);
      }
    };
    this.XLi = e => {
      ModelManager_1.ModelManager.MapModel?.SetMarkServerOpenState(e.T7n, true);
    };
    this.$Li = e => {
      var r;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Map", 63, "移除标记列表", ["notify.Proto_MarkIds", e.Ika]);
      }
      if (e.Ika.length === 1) {
        r = e.Ika[0];
        this.cza(r);
      }
      for (const a of e.Ika) {
        ModelManager_1.ModelManager.MapModel?.RemoveDynamicMapMark(MathUtils_1.MathUtils.LongToNumber(a));
      }
    };
    this.YLi = e => {
      ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(e.T7n, e.q5n, e.gbs, e.Cbs);
    };
    this.JLi = e => {
      ModelManager_1.ModelManager.MapModel.FullUpdateTemporaryTeleportInfo(e.cGs);
    };
    this.ZLi = e => {
      ModelManager_1.ModelManager.MapModel.UpdateTemporaryTeleportInfo(e.dGs);
    };
    this.jcl = e => {
      ModelManager_1.ModelManager.MapModel.FullUpdateBoxSlotInfo(e.ET_);
    };
    this.tDi = e => {
      for (const r of e.uEs) {
        ModelManager_1.ModelManager.MapModel.AddOccupationInfo(r);
        ModelManager_1.ModelManager.GeneralLogicTreeModel.AddOccupationInfo(r);
      }
    };
    this.iDi = e => {
      for (const r of e.uEs) {
        ModelManager_1.ModelManager.MapModel.AddOccupationInfo(r);
        ModelManager_1.ModelManager.GeneralLogicTreeModel.AddOccupationInfo(r);
      }
    };
    this.oDi = e => {
      for (const r of e.GEs) {
        ModelManager_1.ModelManager.MapModel.RemoveOccupationInfo(r);
        ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveOccupationInfo(r);
      }
    };
    this.rDi = (e, r) => {
      if (r) {
        if (e.MarkId) {
          this.OpenMapViewAndFocus(e.MarkType, e.MarkId, undefined, false);
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 63, "[探索工具]->聚焦地图失败，不存在探索工具标记Id", ["MarkId", e.MarkId], ["useAgain", r], ["usingInfo", e]);
        }
      }
    };
    this.KFa = false;
  }
  nDi(e, r, a, o) {
    var t = Protocol_1.Aki.Protocol.x7n.create();
    t.D7n = e.X;
    t.A7n = e.Y;
    t.L7n = e.Z;
    t.v9n = a;
    t.U7n = r;
    t.P7n = false;
    t.w7n = o;
    return t;
  }
  sDi(e, r, a, o) {
    var t = Protocol_1.Aki.Protocol.Jss.create();
    var e = this.nDi(e, r, a, o);
    t.x7n = e;
    return t;
  }
  KLi(e) {
    let r = undefined;
    r = e.L7n === 0 ? Vector2D_1.Vector2D.Create(e.D7n, e.A7n) : Vector_1.Vector.Create(e.D7n, e.A7n, e.L7n);
    return new MapDefine_1.DynamicMarkCreateInfo({
      TrackTarget: r,
      MarkConfigId: e.v9n,
      MarkType: MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(e.U7n),
      MarkId: e.T7n ?? undefined,
      DestroyOnUnTrack: false,
      EntityConfigId: e.A5n,
      IsServerDisable: e.Kb_,
      MapAndDungeonInfo: {
        MapConfigId: e.w7n
      }
    });
  }
  OnDestroy() {
    MapOperationQueue_1.MapOperationQueue.Clear();
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(22861, this.VLi);
    Net_1.Net.Register(28375, this.HLi);
    Net_1.Net.Register(23623, this.jLi);
    Net_1.Net.Register(20157, this.rf1);
    Net_1.Net.Register(17511, this.WLi);
    Net_1.Net.Register(24266, this.tYa);
    Net_1.Net.Register(26078, this.XLi);
    Net_1.Net.Register(29989, this.$Li);
    Net_1.Net.Register(18632, this.JLi);
    Net_1.Net.Register(15681, this.ZLi);
    Net_1.Net.Register(27998, this.jcl);
    Net_1.Net.Register(21976, this.YLi);
    Net_1.Net.Register(21399, this.tDi);
    Net_1.Net.Register(19874, this.iDi);
    Net_1.Net.Register(28878, this.oDi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22861);
    Net_1.Net.UnRegister(28375);
    Net_1.Net.UnRegister(23623);
    Net_1.Net.UnRegister(17511);
    Net_1.Net.UnRegister(20157);
    Net_1.Net.UnRegister(24266);
    Net_1.Net.UnRegister(26078);
    Net_1.Net.UnRegister(29989);
    Net_1.Net.UnRegister(18632);
    Net_1.Net.UnRegister(15681);
    Net_1.Net.UnRegister(27998);
    Net_1.Net.UnRegister(21976);
    Net_1.Net.UnRegister(21399);
    Net_1.Net.UnRegister(19874);
    Net_1.Net.UnRegister(28878);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Jpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUseMapExploreToolSuccess, this.rDi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Jpe);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUseMapExploreToolSuccess, this.rDi);
  }
  r5d(e, r) {
    if (e !== undefined && (e = ExploreProgressDefine_1.exploratoryDegree2MarkType.get(e)) !== undefined) {
      ModelManager_1.ModelManager.MapModel.AddEntityIdToMarkType(r.PbDataId, e);
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.o5d);
    }
  }
  Wcc(e) {
    ModelManager_1.ModelManager.MapModel.CacheMapFishingShipMark(e.Vcc);
  }
  cNa(e, r) {
    var a = this.KLi(e);
    ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(a);
    if (e.U7n === Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint && r !== undefined) {
      for (const n of r.ubs) {
        var o = this.KLi(n);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Map", 63, "添加物资箱标记", ["pointInfo.Proto_MarkId", n.T7n], ["pointInfo.Proto_ConfigId", n.v9n]);
        }
        ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o);
      }
    }
    var t = MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(e.U7n);
    if (ModelManager_1.ModelManager.GameModeModel.InstanceDungeon === undefined) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "副本数据为空，屏蔽开启地图界面");
      }
    } else {
      switch (t) {
        case 17:
          this.OpenMapViewAndFocus(t, e.T7n, e => {
            if (e && r.ubs.length === 0) {
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ExploreBoxUnfindable");
            }
          }, false, MapDefine_1.WORLD_MAP_MAX_SCALE);
          break;
        case 16:
        case 21:
          this.OpenMapViewAndFocus(t, e.T7n, undefined, false, MapDefine_1.WORLD_MAP_MAX_SCALE);
          break;
        case 22:
          this.OpenMapViewAndFocus(t, e.T7n, undefined, false, MapDefine_1.WORLD_MAP_MAX_SCALE, true);
      }
    }
  }
  OpenMapViewAndFocus(e, r, a, o = true, t = 1, n = false) {
    if (!!n || !ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() || !!ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
      n = {
        MarkId: r,
        MarkType: e,
        OpenAreaId: 0,
        IsNotFocusTween: !o,
        StartScale: t
      };
      WorldMapController_1.WorldMapController.OpenView(2, false, n, a);
    }
  }
  async RequestTrackInfo() {
    var e = Protocol_1.Aki.Protocol.ias.create();
    var e = await Net_1.Net.CallAsync(28204, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16917);
      } else {
        for (const t of e.fbs) {
          var r;
          var a = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(t);
          if (a instanceof MapMark_1.MapMark && a.EnableQuickTransfer === 1) {
            this.RequestCancelTrackMapMark(a.ObjectType, t);
          } else {
            r = this.lDi(t);
            a = {
              TrackSource: 1,
              MarkType: a?.ObjectType,
              Id: t,
              IconPath: r.Icon,
              TrackTarget: r.TrackTarget,
              TrackInstanceId: r.TargetInstanceOrMapId,
              TrackHudEnable: r.TrackHudEnable,
              TrackAutoCancelDistance: r.TrackAutoCancelDistance
            };
            ControllerHolder_1.ControllerHolder.TrackController.StartTrack(a);
            ModelManager_1.ModelManager.MapModel.AddTrackMarkId(t);
          }
        }
        var o;
        var e = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
        if (e?.TrackMode === 0) {
          o = e.MarkId;
          if ((o = ModelManager_1.ModelManager.TrackModel.GetTrackData(1, o)) !== undefined) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrackMark, o);
          } else {
            o = this.lDi(e.MarkId);
            e = {
              TrackSource: 1,
              MarkType: e.MarkType,
              Id: e.MarkId,
              IconPath: o.Icon,
              TrackTarget: o.TrackTarget,
              TrackInstanceId: o.TargetInstanceOrMapId,
              TrackHudEnable: o.TrackHudEnable,
              TrackAutoCancelDistance: o.TrackAutoCancelDistance
            };
            ControllerHolder_1.ControllerHolder.TrackController.StartTrack(e);
          }
        }
      }
    }
  }
  lDi(r) {
    var a = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(r);
    if (a) {
      return {
        Icon: MarkItemDataUtil_1.MarkItemDataUtil.GetMarkIcon(r) ?? "",
        TrackTarget: a.EntityConfigId ?? Vector_1.Vector.Create(a.MarkVector),
        TargetInstanceOrMapId: a.RelativeDungeonId,
        TrackHudEnable: a.TrackHudEnable === 1,
        TrackAutoCancelDistance: a.TrackAutoCancelDistance
      };
    }
    a = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(r);
    if (a) {
      var r = ConfigManager_1.ConfigManager.MapConfig.GetCustomMarkConfig(a.MarkConfigId);
      var o = a.TrackTarget;
      let e = undefined;
      if (o instanceof Vector_1.Vector) {
        e = MapUtil_1.MapUtil.UiPosition2WorldPosition(o);
      } else if (o instanceof Vector2D_1.Vector2D) {
        o = Vector_1.Vector.Create(o.X, -o.Y, 0);
        e = MapUtil_1.MapUtil.UiPosition2WorldPosition(o);
      }
      return {
        Icon: r.MarkPic,
        TrackTarget: e,
        TargetInstanceOrMapId: a.MapId,
        TrackHudEnable: r?.TrackHudEnable === 1,
        TrackAutoCancelDistance: r?.TrackAutoCancelDistance
      };
    }
    return {
      Icon: "",
      TrackTarget: Vector_1.Vector.Create(0, 0, 0),
      TargetInstanceOrMapId: 0
    };
  }
  RequestMapMarkReplace(r, a) {
    var e = {
      Type: 4,
      MarkType: 9,
      MarkId: r,
      IsValidate: () => {
        var e = ModelManager_1.ModelManager.MapModel.IsMarkIdExist(9, r);
        if (!e) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Map", 86, "试图更换不存在的自定义标记样式", ["MarkId", r]);
          }
        }
        return e;
      },
      Execute: async () => {
        var e = Protocol_1.Aki.Protocol.las.create({
          T7n: r,
          v9n: a
        });
        var e = await Net_1.Net.CallAsync(28004, e);
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28798);
        } else {
          ModelManager_1.ModelManager.MapModel.ReplaceCustomMarkIcon(e.T7n, e.v9n);
        }
      }
    };
    MapOperationQueue_1.MapOperationQueue.RunMapMark(e);
  }
  RequestCreateCustomMark(e, r) {
    var a;
    if (e) {
      if (!(ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9) >= ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize)) {
        a = e instanceof Vector_1.Vector ? e.Z : 0;
        a = this.sDi(Vector_1.Vector.Create(e.X, e.Y, a), Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_Custom, r, ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Map", 63, "[CustomMarkItem Debug]MarkAssistant.RequestCreateCustomMark->", ["trackPosition", e], ["configId", r], ["request", a]);
        }
        Net_1.Net.Call(16105, a, e => {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27115);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Map", 63, "[CustomMarkItem Debug]MarkAssistant.response->", ["response.Info", e?.YVn]);
          }
        });
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 63, "向服务器请求创建标记时，坐标不存在");
    }
  }
  RequestTrackEnrichmentArea(e, r) {
    var a;
    if (this.KFa) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Map", 63, "[地图系统]->过滤本次请求富集区信息,未收到上次返回", ["锁定状态：", this.KFa]);
      }
    } else {
      (a = Protocol_1.Aki.Protocol.Jm_.create()).L8n = e ?? 0;
      this.KFa = true;
      Net_1.Net.Call(18938, a, e => {
        this.KFa = false;
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15874);
        }
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          r?.();
        }
      });
    }
  }
  cza(e) {
    var r;
    var e = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e);
    if (e && e.MarkType === 23 && (e = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(23), r = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(22), e === 1) && r === 1 && (e = ModelManager_1.ModelManager.MapModel.GetMarkByType(22))?.size === 1) {
      r = e.values().next().value;
      if (e = ConfigManager_1.ConfigManager.MapConfig.GetEnrichmentAreaConfigByEnrichmentId(r.EntityConfigId)) {
        this.RequestTrackEnrichmentArea(e.ItemId, () => {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("SearchNextRichArea");
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "[地图系统]富集区连续追踪找不到富集区配置", ["EnrichmentAreaId:", r.EntityConfigId]);
      }
    }
  }
  RequestRemoveMapMarks(a, o) {
    var e = {
      OpName: "RequestRemoveMapMarks",
      Type: 2,
      MarkType: a,
      IsValidate: () => true,
      Execute: async () => {
        var e = o.filter(e => ModelManager_1.ModelManager.MapModel.IsMarkIdExist(a, e));
        if (e.length !== 0) {
          e = Protocol_1.Aki.Protocol.Zss.create({
            Ika: e
          });
          e = await Net_1.Net.CallAsync(29534, e);
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25141);
          } else {
            for (const r of e.Ika) {
              ModelManager_1.ModelManager.MapModel.RemoveMapMark(a, r);
            }
          }
        }
      }
    };
    MapOperationQueue_1.MapOperationQueue.RunMapMark(e);
  }
  RequestTrackMapMark(r, a, o) {
    var e;
    if (a < 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "markId小于0, 请求追踪信息未发给后端");
      }
      ModelManager_1.ModelManager.MapModel.SetTrackMark(r, a, true);
      o?.(0, true);
    } else {
      e = {
        Type: 0,
        MarkType: r,
        MarkId: a,
        IsValidate: () => {
          if (ModelManager_1.ModelManager.MapModel.IsMarkIdExist(r, a)) {
            return !ModelManager_1.ModelManager.MapModel.IsMarkTracking(a) || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 63, "试图重复追踪标记", ["MarkId", a]), false);
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Map", 63, "试图追踪不存在的标记", ["MarkId", a]);
            }
            return false;
          }
        },
        Execute: async () => {
          var e = Protocol_1.Aki.Protocol.oas.create({
            T7n: a
          });
          var e = await Net_1.Net.CallAsync(19732, e);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Map", 63, "向服务端请求追踪标记: 标记id:", ["markId", a]);
          }
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21896);
            o?.(1, true);
          } else {
            ModelManager_1.ModelManager.MapModel.SetTrackMark(r, e.T7n, true);
            ModelManager_1.ModelManager.MapModel.AddTrackMarkId(e.T7n);
            o?.(0, true);
          }
        }
      };
      MapOperationQueue_1.MapOperationQueue.RunMapMark(e);
    }
  }
  RequestCancelTrackMapMark(r, a, o) {
    var e;
    if (a < 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "markId小于0, 请求取消追踪信息未发给后端");
      }
      ModelManager_1.ModelManager.MapModel.SetTrackMark(r, a, false);
      o?.(0, false);
    } else {
      e = {
        Type: 1,
        MarkType: r,
        MarkId: a,
        IsValidate: () => {
          if (ModelManager_1.ModelManager.MapModel.IsMarkIdExist(r, a)) {
            return !!ModelManager_1.ModelManager.MapModel.IsMarkTracking(a) || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 63, "试图重复取消追踪标记", ["MarkId", a]), false);
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Map", 63, "试图取消追踪不存在的标记", ["MarkId", a]);
            }
            return false;
          }
        },
        Execute: async () => {
          var e = Protocol_1.Aki.Protocol.sas.create({
            T7n: a
          });
          var e = await Net_1.Net.CallAsync(29225, e);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Map", 63, "向服务端请求取消追踪标记: 标记id:", ["markId", a]);
          }
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Map", 63, "取消追踪标记失败: ", ["标记id:", a], ["错误码:", e.Q4n]);
            }
            o?.(1, false);
          } else {
            ModelManager_1.ModelManager.MapModel.SetTrackMark(r, e.T7n, false);
            ModelManager_1.ModelManager.MapModel.RemoveTrackMarkId(e.T7n);
            o?.(0, false);
          }
        }
      };
      MapOperationQueue_1.MapOperationQueue.RunMapMark(e);
    }
  }
  RequestTeleportToTargetByTemporaryTeleport(e, r, a) {
    if (TeleportController_1.TeleportController.CheckCanTeleport()) {
      if (!ControllerHolder_1.ControllerHolder.TeleportController.ShowTeleportConfirmBox(() => {
        ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo();
        this.$Mc(e, r, a);
      })) {
        this.$Mc(e, r, a);
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleTransmitLimit");
    }
  }
  $Mc(e, r, a) {
    var o = Protocol_1.Aki.Protocol.wCs.create();
    var t = Protocol_1.Aki.Protocol.D2s.create();
    t.Pitch = r.Pitch;
    t.Roll = r.Roll;
    t.Yaw = r.Yaw;
    o.R7n = e;
    o._8n = t;
    Net_1.Net.Call(21561, o, e => {
      if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 20650);
      }
    });
    a?.();
  }
  UpdateCustomMapMarkPosition(e, r) {
    e = Protocol_1.Aki.Protocol.vas.create({
      T7n: e,
      l8n: r
    });
    Net_1.Net.Call(25546, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23073);
      }
    });
  }
}
exports.MarkAssistant = MarkAssistant;
//# sourceMappingURL=MarkAssistant.js.map