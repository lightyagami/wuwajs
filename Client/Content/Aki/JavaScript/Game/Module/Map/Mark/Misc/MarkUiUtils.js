"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkUiUtils = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil");
const TrackHelper_1 = require("../../../Track/TrackHelper");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine");
const WorldMapSecondaryUiDefine_1 = require("../../../WorldMap/WorldMapSecondaryUiDefine");
const MapController_1 = require("../../Controller/MapController");
const MapDefine_1 = require("../../MapDefine");
const DynamicEntityMarkItem_1 = require("../../Marks/MarkItem/DynamicEntityMarkItem");
const FixedSceneGamePlayMarkItem_1 = require("../../Marks/MarkItem/FixedSceneGamePlayMarkItem");
const HonamiScanMarkItem_1 = require("../../Marks/MarkItem/HonamiScanMarkItem");
const SceneGameplayMarkItem_1 = require("../../Marks/MarkItem/SceneGameplayMarkItem");
const TaskMarkItem_1 = require("../../Marks/MarkItem/TaskMarkItem");
const TeleportMarkItem_1 = require("../../Marks/MarkItem/TeleportMarkItem");
const TemporaryTeleportMarkItem_1 = require("../../Marks/MarkItem/TemporaryTeleportMarkItem");
class MarkUiUtils {
  static IsShowGoto(e) {
    if (e instanceof TeleportMarkItem_1.TeleportMarkItem && !e.IsActivity) {
      return e.IsLocked;
    }
    if (e instanceof HonamiScanMarkItem_1.HonamiScanMarkItem) {
      return e.IsLocked;
    }
    if (e.MarkType !== 24) {
      if (e instanceof SceneGameplayMarkItem_1.SceneGameplayMarkItem) {
        return !!e.IsLocked || (r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(e.MarkConfig.RelativeId)) === undefined || r.IsClose;
      }
      if (e instanceof FixedSceneGamePlayMarkItem_1.FixedSceneGameplayMarkItem) {
        return e.IsLocked;
      }
    }
    if (e instanceof TaskMarkItem_1.TaskMarkItem) {
      return true;
    }
    if (e.MarkType === 25 || e.MarkType === 28) {
      return e.IsLocked;
    }
    if (this.odl.has(e.MarkType)) {
      return true;
    }
    if (e instanceof DynamicEntityMarkItem_1.DynamicEntityMarkItem) {
      var r = ConfigManager_1.ConfigManager.MapConfig.GetMonsterDetectionConfig(e.MarkConfigId);
      if (r !== undefined) {
        r = r.DangerType;
        if (this.E8a.get(r) ?? false) {
          return true;
        }
      }
      if (typeof e.TrackTarget == "number") {
        return !ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(e.TrackTarget);
      } else {
        return true;
      }
    }
    return (WorldMapSecondaryUiDefine_1.markPanelTypeMap.get(e.MarkType) ?? WorldMapDefine_1.ESecondaryPanel.GeneralPanel) === WorldMapDefine_1.ESecondaryPanel.GeneralPanel;
  }
  static FindNearbyValidGotoMark(e, o) {
    var r = CommonParamById_1.configCommonParamById.GetIntConfig("QuickTransferRange") * MapDefine_1.UNIT;
    var e = e.FindNearbyMarkItems(o, r, e => {
      var r;
      var a;
      return !!e.MarkItemEntity?.GamePlay.InGravityLayer && (r = e.MarkItemEntity?.GamePlay.Gravity, (a = o.MarkItemEntity?.GamePlay.Gravity) === 0 ? e !== o : e !== o && r === a);
    });
    for (const [o] of e) {
      if (o instanceof TeleportMarkItem_1.TeleportMarkItem && !o.IsLocked && o.CanConditionShowView()) {
        return o;
      }
      if (o instanceof TemporaryTeleportMarkItem_1.TemporaryTeleportMarkItem) {
        return o;
      }
      if ((o instanceof FixedSceneGamePlayMarkItem_1.FixedSceneGameplayMarkItem || o instanceof SceneGameplayMarkItem_1.SceneGameplayMarkItem) && !o.IsLocked && !o.IsLordGym()) {
        var a = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(o.MarkConfig.RelativeId);
        if (a && !a.IsClose) {
          if (!ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(a.Id).IsOccupied) {
            return o;
          }
        }
      }
      if (o.MarkItemEntity.IsConfigMark) {
        a = o;
        if (a.MarkConfig.EnableQuickTransfer === 1 && !a.IsLocked && a.CanConditionShowView()) {
          return a;
        }
      }
    }
  }
  static QuickGotoTeleport(r, a, o) {
    const n = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (n) {
      const M = () => {
        TrackHelper_1.TrackHelper.SetMarkItemTrack(r);
      };
      let e = true;
      if (e = a instanceof TeleportMarkItem_1.TeleportMarkItem ? !a.IsLocked : e) {
        const l = () => {
          if (a instanceof TemporaryTeleportMarkItem_1.TemporaryTeleportMarkItem) {
            MapController_1.MapController.RequestTeleportToTargetByTemporaryTeleport(a.TeleportId, o);
          }
          if (a.MarkItemEntity.IsConfigMark) {
            WorldMapController_1.WorldMapController.TryTeleport(a.MarkConfigId, o);
          }
        };
        const m = () => {
          M();
          l();
        };
        var t;
        var i = () => {
          var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
          if (!MarkUiUtils.IsDungeonBelongDiffMap(e, r.MapId) && Vector_1.Vector.DistSquared(n, r.WorldPosition) <= Vector_1.Vector.DistSquared(a.WorldPosition, r.WorldPosition)) {
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(223)).FunctionMap.set(2, () => {
              m();
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
          } else {
            m();
          }
        };
        if (!ModelManager_1.ModelManager.WorldMapModel.HideQuickTransferConfirmBox) {
          (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(216)).HasToggle = true;
          t.ToggleTextKey = "Text_FastTravelConfirmToggle_text";
          t.SetToggleFunction(e => {
            ModelManager_1.ModelManager.WorldMapModel.HideQuickTransferConfirmBox = e;
          });
          t.FunctionMap.set(1, () => {
            ModelManager_1.ModelManager.WorldMapModel.HideQuickTransferConfirmBox = false;
          });
          t.FunctionMap.set(2, i);
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
        } else {
          i();
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 63, "[地图系统]MarkUiUtils->没有玩家坐标，快速前往失败", ["markId", a.MarkId]);
    }
  }
  static IsDungeonBelongDiffMap(e, r) {
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
    var o = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r);
    return (a?.MapConfigId ?? e) !== (o?.MapConfigId ?? r);
  }
}
(exports.MarkUiUtils = MarkUiUtils).E8a = new Map([[0, true], [1, true], [2, false], [3, false]]);
MarkUiUtils.odl = new Set([26]); //# sourceMappingURL=MarkUiUtils.js.map