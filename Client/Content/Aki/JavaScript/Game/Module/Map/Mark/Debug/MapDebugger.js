"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapDebugger = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine");
const MapLogger_1 = require("../../Misc/MapLogger");
const MarkUiUtils_1 = require("../Misc/MarkUiUtils");
class MapDebugger {
  static I4c(e, r) {
    const a = r.MarkItemEntity.GetComponent(18)?.EntityId ?? 0;
    var e = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(e, r);
    var $ = r.MarkItemEntity.GetComponent(15)?.MapMarkConfig;
    var i = r.MarkItemEntity.GamePlay.IsHide;
    let t = "";
    if (i) {
      var d = r.MarkItemEntity.GetComponent(14);
      var n = d?.GetRelativeDungeonId();
      var M = d?.GetRelativeId();
      if (d !== undefined && n !== undefined && M !== undefined) {
        t = ModelManager_1.ModelManager.LevelPlayReportModel.GetLevelPlayHideReason(n, M);
      } else {
        const a = r.MarkItemEntity.GetComponent(18).EntityId ?? 0;
        t = ModelManager_1.ModelManager.MapModel.GetMarkHideReason(r.MapId, a);
      }
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        t = "PlayPointClearDesc_Text";
      }
    }
    return `
        ------------------------标记信息Start--------------------

        标记Id:${r.MarkId}

        标记类型Type:${r.MarkType}

        地图类型Type:${r.MapType}

        地图Id:${r.MapId}

        副本Id:${r.InstanceDungeonId}

        追踪区域Id(不一定有值):${r.TrackAreaId}

        归属迷雾FogHide:${$?.FogHide}

        区域Id:${ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(r.MapId, a)?.AreaId ?? 0}

        区域名字:${ModelManager_1.ModelManager.MapModel.GetMarkAreaText(r.MapId, a)}

        分层地图Id:${r.GetMultiMapId()}

        是否分层标记:${r.IsMultiMap()}

        世界坐标X:${r.WorldPosition.X},
        世界坐标Y:${r.WorldPosition.Y},
        世界坐标Z:${r.WorldPosition.Z}

        Ui坐标X:${r.UiPosition.X},
        Ui坐标Y:${r.UiPosition.Y},
        Ui坐标Z:${r.UiPosition.Z}

        重力方向:${r.MarkItemEntity.GamePlay.Gravity}

        是否在对应的重力面:${r.MarkItemEntity.GamePlay.InGravityLayer}

        配置Id:${$?.MarkId}

        玩法Id:${$?.RelativeId}

        玩法绑定的副本Id:${r.MarkItemEntity.GetComponent(15)?.MapMarkConfig?.RelativeDungeonId}

        绑定的实体Id:${a}

        绑定的二级弹窗类型:${WorldMapDefine_1.ESecondaryPanel[r.GetSecondaryUiType()]}

        玩法是否被清场:${i}

        清场原因:${ConfigManager_1.ConfigManager.TextConfig.GetMultiText(t ?? "")}

        传送点被锁或被禁用:${r.MarkItemEntity.GamePlay.IsTeleportLocked}

        玩法状态:${r.MarkItemEntity.GamePlay.GamePlayState}

        附近可前往的标记信息-MarkId:${e?.MarkId}

        ------------------------标记信息End------------------`;
  }
  static DumpMarkItemForUi(e, r) {
    var a = r.MarkItemEntity.GetComponent(18)?.EntityId ?? 0;
    var e = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(e, r);
    var $ = r.MarkItemEntity.GetComponent(15)?.MapMarkConfig;
    return `---简单标记信息Start---        
标记Id:${r.MarkId}类型:${r.MarkType}地图Id:${r.MapId} 副本Id:${r.InstanceDungeonId}        
追踪区域:${r.TrackAreaId}迷雾FogHide:${$?.FogHide}区域:${ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(r.MapId, a)?.AreaId ?? 0}分层地图Id:${r.GetMultiMapId()}        
世界坐标X:${r.WorldPosition.X.toFixed(2)},世界坐标Y:${r.WorldPosition.Y.toFixed(2)},世界坐标Z:${r.WorldPosition.Z.toFixed(2)}        
Ui坐标X:${r.UiPosition.X.toFixed(2)},Ui坐标Y:${r.UiPosition.Y.toFixed(2)},Ui坐标Z:${r.UiPosition.Z.toFixed(2)}        
重力方向:${r.MarkItemEntity.GamePlay.Gravity} 配置Id:${$?.MarkId} 玩法Id:${$?.RelativeId} 玩法绑定的副本Id:${r.MarkItemEntity.GetComponent(15)?.MapMarkConfig?.RelativeDungeonId}        
绑定的实体Id:${a} 绑定的二级弹窗类型:${WorldMapDefine_1.ESecondaryPanel[r.GetSecondaryUiType()]}        
玩法被清场:${r.MarkItemEntity.GamePlay.IsHide} 传送点被锁或被禁用:${r.MarkItemEntity.GamePlay.IsTeleportLocked}        
玩法状态:${r.MarkItemEntity.GamePlay.GamePlayState} 附近可前往的标记信息-MarkId:${e?.MarkId}        
---标记信息End---`;
  }
  static PrintMarkItemDumpInfo(e, r) {
    MapLogger_1.MapLogger.Error(63, "地图调试信息->当前标记ItemDump信息", ["标记信息", MapDebugger.I4c(e, r)]);
  }
  static PrintTrackDataInfo(e, r) {
    r = `
        ------------------------追踪信息Start--------------------

        TrackSource:${r.TrackSource}

        MarkType:${r.MarkType}

        TrackId:${r.Id}

        IconPath:${r.IconPath}

        TrackTarget:${r.TrackTarget}

        TrackInstanceId:${r.TrackInstanceId}

        TrackAutoCancelDistance:${r.TrackAutoCancelDistance}

        IsSubTrack:${r.IsSubTrack}

        TrackHideDis:${r.TrackHideDis}

        ShowGroupId:${r.ShowGroupId}

        TrackType:${r.TrackType}

        AutoHideTrack:${r.AutoHideTrack}

        PrefabPath:${r.PrefabPath}

        Offset:${r.Offset}

        IsInTrackRange:${r.IsInTrackRange}

        AreaId:${r.AreaId}

        MultiMapId:${r.MultiMapId}

        ------------------------追踪信息End------------------`;
    MapLogger_1.MapLogger.Error(63, "地图调试信息->" + e, ["追踪信息", r]);
  }
}
exports.MapDebugger = MapDebugger;
//# sourceMappingURL=MapDebugger.js.map