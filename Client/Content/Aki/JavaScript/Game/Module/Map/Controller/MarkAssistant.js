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
const TeleportMisc_1 = require("../../Teleport/TeleportMisc");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const MapOperationQueue_1 = require("../Container/MapOperation/MapOperationQueue");
const MapDefine_1 = require("../MapDefine");
const MapUtil_1 = require("../MapUtil");
const MarkDefine_1 = require("../Mark/MarkDefine");
const MarkItemDataUtil_1 = require("../Marks/MarkItemDataUtil");
class MarkAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.Jpe = (e, r, o) => {
      var a = r.Entity.GetComponent(0);
      var t = a.GetPbEntityInitData();
      if (a.GetEntityConfigType() !== Protocol_1.Aki.Protocol.rLs.Proto_Character && !MapUtil_1.MapUtil.IsTemporaryTeleportEntity(t)) {
        if ((t = a.GetBaseInfo())?.MapIcon) {
          ModelManager_1.ModelManager.MapModel.AddEntityIdToPendingList(r.Id, t.MapIcon);
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.zpe);
        } else {
          this.tQd(t?.Category.ExploratoryDegree, r);
        }
      }
    };
    this.zpe = (e, r) => {
      ModelManager_1.ModelManager.MapModel.RemoveEntityIdToPendingList(r.Id);
      if (ModelManager_1.ModelManager.MapModel.GetEntityPendingList()?.has(r.Id)) {
        EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
    };
    this.iQd = (e, r) => {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.iQd);
      var o = ModelManager_1.ModelManager.MapModel.GetEntityIdToMarkType(r.PbDataId);
      ModelManager_1.ModelManager.MapModel.RemoveEntityIdToMarkType(r.PbDataId);
      if (o !== undefined && e !== Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce) {
        e = ModelManager_1.ModelManager.MapModel.GetMarkByType(o);
        if (e !== undefined && e.size !== 0) {
          for (const a of e.values()) {
            if (a.EntityConfigId === r.PbDataId) {
              ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
                MarkType: o,
                MarkId: a.MarkId,
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
      for (const r of e.cbs) {
        switch (r.U7n) {
          case Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_HonamiStory:
            this._xm(r);
            break;
          case Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_HonamiStoryChild:
            this.uxm(r, true, MarkDefine_1.HONAMI_SCAN_MARK_ITEM_ID, 2);
            break;
          default:
            this.uxm(r);
        }
      }
      for (const o of e.dbs) {
        ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(o.T7n, o.q5n, false, o.Cbs);
      }
      for (const a of e.vbs) {
        ModelManager_1.ModelManager.MapModel.SetMarkServerOpenState(a, true);
      }
      ModelManager_1.ModelManager.MapModel.ClearMarkHideInfo();
      for (const t of e.pm1) {
        ModelManager_1.ModelManager.MapModel.UpdateMarkHideInfo(t);
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
      var o = e.Kb_;
      var a = ModelManager_1.ModelManager.MapModel.GetDynamicMark(r);
      if (a) {
        a.ServerMarkState = e.Kb_ ? Protocol_1.Aki.Protocol.Tom.Proto_MarkDisable : Protocol_1.Aki.Protocol.Tom.Proto_MarkNormal;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "[地图系统]->MarkAssistant动态标记状态更新失败，没找到标记", ["markId", r], ["isDisable", o]);
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
      for (const o of e.Ika) {
        ModelManager_1.ModelManager.MapModel?.RemoveDynamicMapMark(MathUtils_1.MathUtils.LongToNumber(o));
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
  nDi(e, r, o, a) {
    var t = Protocol_1.Aki.Protocol.x7n.create();
    t.D7n = e.X;
    t.A7n = e.Y;
    t.L7n = e.Z;
    t.v9n = o;
    t.U7n = r;
    t.P7n = false;
    t.w7n = a;
    return t;
  }
  sDi(e, r, o, a) {
    var t = Protocol_1.Aki.Protocol.Jss.create();
    var e = this.nDi(e, r, o, a);
    t.x7n = e;
    return t;
  }
  KLi(e, r = false, o, a) {
    let t = undefined;
    t = e.L7n === 0 ? Vector2D_1.Vector2D.Create(e.D7n, e.A7n) : Vector_1.Vector.Create(e.D7n, e.A7n, e.L7n);
    o = o ?? e.v9n;
    return new MapDefine_1.DynamicMarkCreateInfo({
      TrackTarget: t,
      MarkConfigId: o,
      TrackSource: a,
      MarkType: MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(e.U7n),
      MarkId: e.T7n ?? undefined,
      DestroyOnUnTrack: false,
      EntityConfigId: e.A5n,
      ServerMarkState: e.Y4n,
      MapAndDungeonInfo: {
        MapConfigId: e.w7n,
        DungeonId: r ? ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(o)?.InstanceDungeonId : undefined
      }
    });
  }
  OnDestroy() {
    MapOperationQueue_1.MapOperationQueue.Clear();
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(29150, this.VLi);
    Net_1.Net.Register(21565, this.HLi);
    Net_1.Net.Register(21172, this.jLi);
    Net_1.Net.Register(27021, this.rf1);
    Net_1.Net.Register(20491, this.WLi);
    Net_1.Net.Register(20654, this.tYa);
    Net_1.Net.Register(26612, this.XLi);
    Net_1.Net.Register(26844, this.$Li);
    Net_1.Net.Register(26181, this.JLi);
    Net_1.Net.Register(19857, this.ZLi);
    Net_1.Net.Register(24646, this.jcl);
    Net_1.Net.Register(16177, this.YLi);
    Net_1.Net.Register(29938, this.tDi);
    Net_1.Net.Register(18963, this.iDi);
    Net_1.Net.Register(22778, this.oDi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29150);
    Net_1.Net.UnRegister(21565);
    Net_1.Net.UnRegister(21172);
    Net_1.Net.UnRegister(20491);
    Net_1.Net.UnRegister(27021);
    Net_1.Net.UnRegister(20654);
    Net_1.Net.UnRegister(26612);
    Net_1.Net.UnRegister(26844);
    Net_1.Net.UnRegister(26181);
    Net_1.Net.UnRegister(19857);
    Net_1.Net.UnRegister(24646);
    Net_1.Net.UnRegister(16177);
    Net_1.Net.UnRegister(29938);
    Net_1.Net.UnRegister(18963);
    Net_1.Net.UnRegister(22778);
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
  tQd(e, r) {
    if (e !== undefined && (e = ExploreProgressDefine_1.exploratoryDegree2MarkType.get(e)) !== undefined) {
      ModelManager_1.ModelManager.MapModel.AddEntityIdToMarkType(r.PbDataId, e);
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.iQd);
    }
  }
  uxm(e, r = false, o, a) {
    var t = e.L7n === 0 ? Vector2D_1.Vector2D.Create(e.D7n, e.A7n) : Vector_1.Vector.Create(e.D7n, e.A7n, e.L7n);
    var o = o ?? e.v9n;
    var t = new MapDefine_1.DynamicMarkCreateInfo({
      TrackTarget: t,
      TrackSource: a,
      MarkConfigId: o,
      MarkType: MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(e.U7n),
      MarkId: e.T7n,
      DestroyOnUnTrack: false,
      EntityConfigId: e.A5n,
      MapAndDungeonInfo: {
        MapConfigId: e.w7n,
        DungeonId: r ? ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(o)?.InstanceDungeonId : undefined
      }
    });
    ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(t);
  }
  _xm(e) {
    var r = ConfigManager_1.ConfigManager.MapConfig.GetMapMarkByEntityConfigId(e.A5n);
    if (r) {
      ModelManager_1.ModelManager.MapModel.UpdateHonamiScanMarkInfo(r.MarkId, e.Y4n);
    }
  }
  Wcc(e) {
    ModelManager_1.ModelManager.MapModel.CacheMapFishingShipMark(e.Vcc);
  }
  cNa(e, r) {
    var o;
    var a;
    if (e.U7n !== Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_HonamiStory) {
      o = e.U7n === Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_HonamiStoryChild ? MarkDefine_1.HONAMI_SCAN_MARK_ITEM_ID : undefined;
      if (e.U7n === Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_HonamiStoryChild) {
        a = this.KLi(e, true, o, 2);
        ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(a);
      } else {
        a = this.KLi(e, false, o);
        ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(a);
      }
    }
    if (e.U7n === Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint && r !== undefined) {
      for (const i of r.ubs) {
        var t = this.KLi(i);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Map", 63, "添加物资箱标记", ["pointInfo.Proto_MarkId", i.T7n], ["pointInfo.Proto_ConfigId", i.v9n]);
        }
        ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(t);
      }
    }
    var n = MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(e.U7n);
    if (ModelManager_1.ModelManager.GameModeModel.InstanceDungeon === undefined) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "副本数据为空，屏蔽开启地图界面");
      }
    } else {
      switch (n) {
        case 17:
          this.OpenMapViewAndFocus(n, e.T7n, e => {
            if (e && r.ubs.length === 0) {
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ExploreBoxUnfindable");
            }
          }, false, MapDefine_1.WORLD_MAP_MAX_SCALE);
          break;
        case 16:
        case 21:
          this.OpenMapViewAndFocus(n, e.T7n, undefined, false, MapDefine_1.WORLD_MAP_MAX_SCALE);
          break;
        case 22:
          this.OpenMapViewAndFocus(n, e.T7n, undefined, false, MapDefine_1.WORLD_MAP_MAX_SCALE, true);
          break;
        case 39:
          var _;
          var M = ConfigManager_1.ConfigManager.MapConfig.GetMapMarkByEntityConfigId(e.A5n);
          if (M) {
            ModelManager_1.ModelManager.HonamiStoryModel.ScanMarkId = M.MarkId;
            ModelManager_1.ModelManager.MapModel.UpdateHonamiScanMarkInfo(M.MarkId, e.Y4n);
            _ = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetScanMachineById(M.EntityConfigId)?.FogId;
            _ = ModelManager_1.ModelManager.HonamiStoryModel.CurrentUnlockFogId === _ ? _ : undefined;
            ModelManager_1.ModelManager.HonamiStoryModel.CurrentUnlockFogId = 0;
            M = {
              MarkType: n,
              MarkId: M.MarkId,
              OpenFogId: _,
              ShowFogEffectInstant: true,
              IsNotFocal: true,
              IsNotNeedUnLockEffect: true,
              NeedRefreshMultiFloor: true
            };
            WorldMapController_1.WorldMapController.OpenView(2, false, M);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("HonamiStory", 86, "没有找到扫描仪标记配置", ["markPointInfo.Proto_EntityConfigId", e.A5n]);
          }
          break;
        case 40:
          if (e.Y4n === Protocol_1.Aki.Protocol.Tom.Proto_MarkNormal) {
            ModelManager_1.ModelManager.HonamiStoryModel.ScanMarkItemIds.add(e.T7n);
          }
      }
    }
  }
  OpenMapViewAndFocus(e, r, o, a = true, t = 1, n = false) {
    if (!!n || !ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() || !!ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
      n = {
        MarkId: r,
        MarkType: e,
        IsNotFocusTween: !a,
        StartScale: t
      };
      WorldMapController_1.WorldMapController.OpenView(2, false, n, o);
    }
  }
  async RequestTrackInfo() {
    var e = Protocol_1.Aki.Protocol.ias.create();
    var e = await Net_1.Net.CallAsync(19626, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25830);
      } else {
        for (const t of e.fbs) {
          var r;
          var o = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(t);
          if (o instanceof MapMark_1.MapMark && o.EnableQuickTransfer === 1) {
            this.RequestCancelTrackMapMark(o.ObjectType, t);
          } else {
            r = this.lDi(t);
            o = {
              TrackSource: 1,
              MarkType: o?.ObjectType,
              Id: t,
              IconPath: r.Icon,
              TrackTarget: r.TrackTarget,
              TrackInstanceId: r.TargetInstanceOrMapId,
              TrackHudEnable: r.TrackHudEnable,
              TrackAutoCancelDistance: r.TrackAutoCancelDistance
            };
            ControllerHolder_1.ControllerHolder.TrackController.StartTrack(o);
            ModelManager_1.ModelManager.MapModel.AddTrackMarkId(t);
          }
        }
        var a;
        var e = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
        if (e?.TrackMode === 0) {
          a = e.MarkId;
          if ((a = ModelManager_1.ModelManager.TrackModel.GetTrackData(1, a)) !== undefined) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrackMark, a);
          } else {
            a = this.lDi(e.MarkId);
            e = {
              TrackSource: 1,
              MarkType: e.MarkType,
              Id: e.MarkId,
              IconPath: a.Icon,
              TrackTarget: a.TrackTarget,
              TrackInstanceId: a.TargetInstanceOrMapId,
              TrackHudEnable: a.TrackHudEnable,
              TrackAutoCancelDistance: a.TrackAutoCancelDistance
            };
            ControllerHolder_1.ControllerHolder.TrackController.StartTrack(e);
          }
        }
      }
    }
  }
  lDi(r) {
    var o = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(r);
    if (o) {
      return {
        Icon: MarkItemDataUtil_1.MarkItemDataUtil.GetMarkIcon(r) ?? "",
        TrackTarget: o.EntityConfigId ?? Vector_1.Vector.Create(o.MarkVector),
        TargetInstanceOrMapId: o.RelativeDungeonId,
        TrackHudEnable: o.TrackHudEnable === 1,
        TrackAutoCancelDistance: o.TrackAutoCancelDistance
      };
    }
    o = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(r);
    if (o) {
      var r = ConfigManager_1.ConfigManager.MapConfig.GetCustomMarkConfig(o.MarkConfigId);
      var a = o.TrackTarget;
      let e = undefined;
      if (a instanceof Vector_1.Vector) {
        e = MapUtil_1.MapUtil.UiPosition2WorldPosition(a);
      } else if (a instanceof Vector2D_1.Vector2D) {
        a = Vector_1.Vector.Create(a.X, -a.Y, 0);
        e = MapUtil_1.MapUtil.UiPosition2WorldPosition(a);
      }
      return {
        Icon: r.MarkPic,
        TrackTarget: e,
        TargetInstanceOrMapId: o.MapId,
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
  RequestMapMarkReplace(r, o) {
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
          v9n: o
        });
        var e = await Net_1.Net.CallAsync(26582, e);
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20224);
        } else {
          ModelManager_1.ModelManager.MapModel.ReplaceCustomMarkIcon(e.T7n, e.v9n);
        }
      }
    };
    MapOperationQueue_1.MapOperationQueue.RunMapMark(e);
  }
  RequestCreateCustomMark(e, r, o) {
    var a;
    if (e) {
      if (ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9) >= ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Map", 63, "向服务器请求创建标记时，自定义标记数量已达上限");
        }
        o?.(false);
      } else {
        a = e instanceof Vector_1.Vector ? e.Z : 0;
        a = this.sDi(Vector_1.Vector.Create(e.X, e.Y, a), Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_Custom, r, ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Map", 63, "[CustomMarkItem Debug]MarkAssistant.RequestCreateCustomMark->", ["trackPosition", e], ["configId", r], ["request", a]);
        }
        Net_1.Net.Call(17561, a, e => {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24976);
            o?.(false);
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Map", 63, "[CustomMarkItem Debug]MarkAssistant.response->", ["response.Info", e?.YVn]);
            }
            o?.(true);
          }
        });
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "向服务器请求创建标记时，坐标不存在");
      }
      o?.(false);
    }
  }
  RequestTrackEnrichmentArea(e, r) {
    var o;
    if (this.KFa) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Map", 63, "[地图系统]->过滤本次请求富集区信息,未收到上次返回", ["锁定状态：", this.KFa]);
      }
    } else {
      (o = Protocol_1.Aki.Protocol.Jm_.create()).L8n = e ?? 0;
      this.KFa = true;
      Net_1.Net.Call(16599, o, e => {
        this.KFa = false;
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18322);
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
  RequestRemoveMapMarks(o, a) {
    var e = {
      OpName: "RequestRemoveMapMarks",
      Type: 2,
      MarkType: o,
      IsValidate: () => true,
      Execute: async () => {
        var e = a.filter(e => ModelManager_1.ModelManager.MapModel.IsMarkIdExist(o, e));
        if (e.length !== 0) {
          for (const r of e) {
            ModelManager_1.ModelManager.MapModel.RemoveMapMark(o, r);
          }
          e = Protocol_1.Aki.Protocol.Zss.create({
            Ika: e
          });
          e = await Net_1.Net.CallAsync(26974, e);
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19941);
          }
        }
      }
    };
    MapOperationQueue_1.MapOperationQueue.RunMapMark(e);
  }
  RequestTrackMapMark(r, o, a) {
    var e;
    if (o < 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "markId小于0, 请求追踪信息未发给后端");
      }
      ModelManager_1.ModelManager.MapModel.SetTrackMark(r, o, true);
      a?.(0, true);
    } else {
      e = {
        Type: 0,
        MarkType: r,
        MarkId: o,
        IsValidate: () => {
          if (ModelManager_1.ModelManager.MapModel.IsMarkIdExist(r, o)) {
            return !ModelManager_1.ModelManager.MapModel.IsMarkTracking(o) || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 63, "试图重复追踪标记", ["MarkId", o]), false);
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Map", 63, "试图追踪不存在的标记", ["MarkId", o]);
            }
            return false;
          }
        },
        Execute: async () => {
          var e = Protocol_1.Aki.Protocol.oas.create({
            T7n: o
          });
          var e = await Net_1.Net.CallAsync(16148, e);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Map", 63, "向服务端请求追踪标记: 标记id:", ["markId", o]);
          }
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21334);
            a?.(1, true);
          } else {
            ModelManager_1.ModelManager.MapModel.SetTrackMark(r, e.T7n, true);
            ModelManager_1.ModelManager.MapModel.AddTrackMarkId(e.T7n);
            a?.(0, true);
          }
        }
      };
      MapOperationQueue_1.MapOperationQueue.RunMapMark(e);
    }
  }
  RequestCancelTrackMapMark(r, o, a) {
    var e;
    if (o < 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "markId小于0, 请求取消追踪信息未发给后端");
      }
      ModelManager_1.ModelManager.MapModel.SetTrackMark(r, o, false);
      a?.(0, false);
    } else {
      e = {
        Type: 1,
        MarkType: r,
        MarkId: o,
        IsValidate: () => {
          if (ModelManager_1.ModelManager.MapModel.IsMarkIdExist(r, o)) {
            return !!ModelManager_1.ModelManager.MapModel.IsMarkTracking(o) || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 63, "试图重复取消追踪标记", ["MarkId", o]), false);
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Map", 63, "试图取消追踪不存在的标记", ["MarkId", o]);
            }
            return false;
          }
        },
        Execute: async () => {
          var e = Protocol_1.Aki.Protocol.sas.create({
            T7n: o
          });
          var e = await Net_1.Net.CallAsync(27469, e);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Map", 63, "向服务端请求取消追踪标记: 标记id:", ["markId", o]);
          }
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Map", 63, "取消追踪标记失败: ", ["标记id:", o], ["错误码:", e.Q4n]);
            }
            a?.(1, false);
          } else {
            ModelManager_1.ModelManager.MapModel.SetTrackMark(r, e.T7n, false);
            ModelManager_1.ModelManager.MapModel.RemoveTrackMarkId(e.T7n);
            a?.(0, false);
          }
        }
      };
      MapOperationQueue_1.MapOperationQueue.RunMapMark(e);
    }
  }
  RequestTeleportToTargetByTemporaryTeleport(e, r, o) {
    if (ModelManager_1.ModelManager.TeleportModel.AllowTeleportByUi) {
      if (!TeleportMisc_1.TeleportMisc.ShowTeleportConfirmBox(() => {
        ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo();
        this.$Mc(e, r, o);
      })) {
        this.$Mc(e, r, o);
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleTransmitLimit");
    }
  }
  $Mc(e, r, o) {
    var a = Protocol_1.Aki.Protocol.wCs.create();
    var t = Protocol_1.Aki.Protocol.D2s.create();
    t.Pitch = r.Pitch;
    t.Roll = r.Roll;
    t.Yaw = r.Yaw;
    a.R7n = e;
    a._8n = t;
    Net_1.Net.Call(18107, a, e => {
      if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 17698);
      }
    });
    o?.();
  }
  UpdateCustomMapMarkPosition(e, r) {
    e = Protocol_1.Aki.Protocol.vas.create({
      T7n: e,
      l8n: r
    });
    Net_1.Net.Call(20146, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28527);
      }
    });
  }
}
exports.MarkAssistant = MarkAssistant;
//# sourceMappingURL=MarkAssistant.js.map