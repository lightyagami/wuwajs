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
    this.Jpe = (e, r, o) => {
      var a = r.Entity.GetComponent(0);
      var t = a.GetPbEntityInitData();
      if (a.GetEntityConfigType() !== Protocol_1.Aki.Protocol.rLs.Proto_Character && !MapUtil_1.MapUtil.IsTemporaryTeleportEntity(t)) {
        if ((t = a.GetBaseInfo())?.MapIcon) {
          ModelManager_1.ModelManager.MapModel.AddEntityIdToPendingList(r.Id, t.MapIcon);
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.zpe);
        }
      }
    };
    this.zpe = (e, r) => {
      ModelManager_1.ModelManager.MapModel.RemoveEntityIdToPendingList(r.Id);
      if (ModelManager_1.ModelManager.MapModel.GetEntityPendingList()?.has(r.Id)) {
        EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.zpe);
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
      for (const o of e.cbs) {
        var r = o.L7n === 0 ? Vector2D_1.Vector2D.Create(o.D7n, o.A7n) : Vector_1.Vector.Create(o.D7n, o.A7n, o.L7n);
        var r = new MapDefine_1.DynamicMarkCreateInfo({
          TrackTarget: r,
          MarkConfigId: o.v9n,
          MarkType: MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(o.U7n),
          MarkId: o.T7n,
          DestroyOnUnTrack: false,
          EntityConfigId: o.A5n,
          IsServerDisable: o.Kb_,
          MapAndDungeonInfo: {
            MapConfigId: o.w7n
          }
        });
        ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(r);
      }
      for (const a of e.dbs) {
        ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(a.T7n, a.q5n, false, a.Cbs);
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
      var o = ModelManager_1.ModelManager.MapModel.GetDynamicMark(r);
      if (o) {
        o.IsServerDisable = e;
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
    Net_1.Net.Register(29486, this.VLi);
    Net_1.Net.Register(16933, this.HLi);
    Net_1.Net.Register(16713, this.jLi);
    Net_1.Net.Register(16796, this.rf1);
    Net_1.Net.Register(16929, this.WLi);
    Net_1.Net.Register(15544, this.tYa);
    Net_1.Net.Register(18275, this.XLi);
    Net_1.Net.Register(27908, this.$Li);
    Net_1.Net.Register(15124, this.JLi);
    Net_1.Net.Register(21553, this.ZLi);
    Net_1.Net.Register(16112, this.jcl);
    Net_1.Net.Register(27352, this.YLi);
    Net_1.Net.Register(24678, this.tDi);
    Net_1.Net.Register(20462, this.iDi);
    Net_1.Net.Register(20155, this.oDi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29486);
    Net_1.Net.UnRegister(16933);
    Net_1.Net.UnRegister(16713);
    Net_1.Net.UnRegister(16929);
    Net_1.Net.UnRegister(16796);
    Net_1.Net.UnRegister(15544);
    Net_1.Net.UnRegister(18275);
    Net_1.Net.UnRegister(27908);
    Net_1.Net.UnRegister(15124);
    Net_1.Net.UnRegister(21553);
    Net_1.Net.UnRegister(16112);
    Net_1.Net.UnRegister(27352);
    Net_1.Net.UnRegister(24678);
    Net_1.Net.UnRegister(20462);
    Net_1.Net.UnRegister(20155);
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
  Wcc(e) {
    ModelManager_1.ModelManager.MapModel.CacheMapFishingShipMark(e.Vcc);
  }
  cNa(e, r) {
    var o = this.KLi(e);
    ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o);
    if (e.U7n === Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint && r !== undefined) {
      for (const n of r.ubs) {
        var a = this.KLi(n);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Map", 63, "添加物资箱标记", ["pointInfo.Proto_MarkId", n.T7n], ["pointInfo.Proto_ConfigId", n.v9n]);
        }
        ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(a);
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
  OpenMapViewAndFocus(e, r, o, a = true, t = 1, n = false) {
    if (!!n || !ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() || !!ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
      n = {
        MarkId: r,
        MarkType: e,
        OpenAreaId: 0,
        IsNotFocusTween: !a,
        StartScale: t
      };
      WorldMapController_1.WorldMapController.OpenView(2, false, n, o);
    }
  }
  async RequestTrackInfo() {
    var e = Protocol_1.Aki.Protocol.ias.create();
    var e = await Net_1.Net.CallAsync(23128, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15189);
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
  RequestMapMarkReplace(e, r) {
    if (ModelManager_1.ModelManager.MapModel.IsMarkIdExist(9, e)) {
      r = Protocol_1.Aki.Protocol.las.create({
        T7n: e,
        v9n: r
      });
      Net_1.Net.Call(21654, r, e => {
        ModelManager_1.ModelManager.MapModel.ReplaceCustomMarkIcon(e.T7n, e.v9n);
      });
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 63, "试图更换不存在的自定义标记样式", ["MarkId", e]);
    }
  }
  RequestCreateCustomMark(e, r) {
    var o;
    if (e) {
      if (!(ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9) >= ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize)) {
        o = e instanceof Vector_1.Vector ? e.Z : 0;
        o = this.sDi(Vector_1.Vector.Create(e.X, e.Y, o), Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_Custom, r, ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Map", 63, "[CustomMarkItem Debug]MarkAssistant.RequestCreateCustomMark->", ["trackPosition", e], ["configId", r], ["request", o]);
        }
        Net_1.Net.Call(21512, o, e => {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22858);
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
    var o;
    if (this.KFa) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Map", 63, "[地图系统]->过滤本次请求富集区信息,未收到上次返回", ["锁定状态：", this.KFa]);
      }
    } else {
      (o = Protocol_1.Aki.Protocol.Jm_.create()).L8n = e ?? 0;
      this.KFa = true;
      Net_1.Net.Call(27465, o, e => {
        this.KFa = false;
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24344);
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
  RequestRemoveMapMarks(o, e) {
    e = Protocol_1.Aki.Protocol.Zss.create({
      Ika: e
    });
    Net_1.Net.Call(25881, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23262);
      } else {
        for (const r of e.Ika) {
          ModelManager_1.ModelManager.MapModel.RemoveMapMark(o, r);
        }
      }
    });
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
          var e = await Net_1.Net.CallAsync(18875, e);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Map", 63, "向服务端请求追踪标记: 标记id:", ["markId", o]);
          }
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23912);
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
          var e = await Net_1.Net.CallAsync(27217, e);
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
    if (TeleportController_1.TeleportController.CheckCanTeleport()) {
      if (!ControllerHolder_1.ControllerHolder.TeleportController.ShowTeleportConfirmBox(() => {
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
    Net_1.Net.Call(18841, a, e => {
      if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 24553);
      }
    });
    o?.();
  }
  UpdateCustomMapMarkPosition(e, r) {
    e = Protocol_1.Aki.Protocol.vas.create({
      T7n: e,
      l8n: r
    });
    Net_1.Net.Call(18259, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16992);
      }
    });
  }
}
exports.MarkAssistant = MarkAssistant;
//# sourceMappingURL=MarkAssistant.js.map