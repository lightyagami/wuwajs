"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemUtil = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MarkFactory_1 = require("../Mark/MarkFactory");
const AreaMarkItem_1 = require("./MarkItem/AreaMarkItem");
const CaveHoleMarkItem_1 = require("./MarkItem/CaveHoleMarkItem");
const ConfigMarkItem_1 = require("./MarkItem/ConfigMarkItem");
const CorniceMeetingMarkItem_1 = require("./MarkItem/CorniceMeetingMarkItem");
const CustomMarkItem_1 = require("./MarkItem/CustomMarkItem");
const DreamLinkRunMarkItem_1 = require("./MarkItem/DreamLinkRunMarkItem");
const DynamicEntityMarkItem_1 = require("./MarkItem/DynamicEntityMarkItem");
const EnrichmentAreaItem_1 = require("./MarkItem/EnrichmentAreaItem");
const EnrichmentCollectProductItem_1 = require("./MarkItem/EnrichmentCollectProductItem");
const EntityMarkItem_1 = require("./MarkItem/EntityMarkItem");
const FishingPointMarkItem_1 = require("./MarkItem/FishingPointMarkItem");
const FishingShipMarkItem_1 = require("./MarkItem/FishingShipMarkItem");
const FixedSceneGamePlayMarkItem_1 = require("./MarkItem/FixedSceneGamePlayMarkItem");
const GreatSwordChallengeMarkItem_1 = require("./MarkItem/GreatSwordChallengeMarkItem");
const LandscapeMark_1 = require("./MarkItem/LandscapeMark");
const LevelPlayReportMarkItem_1 = require("./MarkItem/LevelPlayReportMarkItem");
const MingSuNpcMarkItem_1 = require("./MarkItem/MingSuNpcMarkItem");
const ParkourMarkItem_1 = require("./MarkItem/ParkourMarkItem");
const PlayerMarkItem_1 = require("./MarkItem/PlayerMarkItem");
const PunishReportMarkItem_1 = require("./MarkItem/PunishReportMarkItem");
const SceneGameplayMarkItem_1 = require("./MarkItem/SceneGameplayMarkItem");
const ServerMarkItem_1 = require("./MarkItem/ServerMarkItem");
const SoundBoxMarkItem_1 = require("./MarkItem/SoundBoxMarkItem");
const TaskMarkItem_1 = require("./MarkItem/TaskMarkItem");
const TeleportMarkItem_1 = require("./MarkItem/TeleportMarkItem");
const TemporaryTeleportMarkItem_1 = require("./MarkItem/TemporaryTeleportMarkItem");
const TraceExploreEntityMarkItem_1 = require("./MarkItem/TraceExploreEntityMarkItem");
const TreasureBoxDetectorMarkItem_1 = require("./MarkItem/TreasureBoxDetectorMarkItem");
const TreasureBoxMarkItem_1 = require("./MarkItem/TreasureBoxMarkItem");
class MarkItemUtil {
  static Create(r, a, t, k) {
    if (r) {
      let e = undefined;
      switch (r.CreateType) {
        case 0:
          e = MarkItemUtil.CreateConfigMark(r.MarkId, r.MarkConfig, a, t, k);
          break;
        case 2:
          e = new PlayerMarkItem_1.PlayerMarkItem(k, r, a, t);
          this.bDl(e, r.Gravity);
          break;
        case 1:
          e = MarkItemUtil.CreateDynamicMark(r, a, t, k);
      }
      return e;
    }
  }
  static CreateConfigMark(r, a, t, k, i) {
    if (a) {
      let e = undefined;
      switch (a.ObjectType) {
        case 1:
          e = new AreaMarkItem_1.AreaMarkItem(r, a, i, t, k);
          break;
        case 5:
        case 6:
          e = new TeleportMarkItem_1.TeleportMarkItem(r, a, i, t, k);
          break;
        case 8:
          e = new MingSuNpcMarkItem_1.MingSuNpcMarkItem(r, a, i, t, k);
          break;
        case 7:
          e = new EntityMarkItem_1.EntityMarkItem(r, a, i, Vector_1.Vector.Create(a.MarkVector), t, k);
          break;
        case 9:
          e = undefined;
          break;
        case 10:
          e = new SceneGameplayMarkItem_1.SceneGameplayMarkItem(r, a, i, t, k);
          break;
        case 13:
          e = new ParkourMarkItem_1.ParkourMarkItem(r, a, i, t, k);
          break;
        case 19:
          e = new FixedSceneGamePlayMarkItem_1.FixedSceneGameplayMarkItem(r, a, i, t, k);
          break;
        case 20:
          e = new LandscapeMark_1.LandscapeMarkItem(r, a, i, t, k);
          break;
        case 25:
          e = new PunishReportMarkItem_1.PunishReportMarkItem(r, a, i, t, k);
          break;
        case 24:
          e = new CorniceMeetingMarkItem_1.CorniceMeetingMarkItem(r, a, i, t, k);
          break;
        case 26:
          e = new CaveHoleMarkItem_1.CaveHoleMarkItem(r, a, i, t, k);
          break;
        case 27:
          e = new DreamLinkRunMarkItem_1.DreamLinkRunMarkItem(r, a, i, t, k);
          break;
        case 28:
          e = new LevelPlayReportMarkItem_1.LevelPlayReportMarkItem(r, a, i, t, k);
          break;
        case 42:
          e = new GreatSwordChallengeMarkItem_1.GreatSwordChallengeMarkItem(r, a, i, t, k);
          break;
        default:
          e = new ConfigMarkItem_1.ConfigMarkItem(r, a, i, t, k);
      }
      if (e) {
        this.Sn_(e);
      }
      return e;
    }
  }
  static CreateDynamicMark(r, a, t, k) {
    if (r) {
      let e = undefined;
      switch (r.MarkType) {
        case 9:
          e = new CustomMarkItem_1.CustomMarkItem(r, k, a, t);
          break;
        case 12:
          e = new TaskMarkItem_1.TaskMarkItem(r, k, a, t);
          break;
        case 7:
        case 35:
          return MarkItemUtil.CreateDynamicEntityMark(r.MarkId, r.MarkConfigId, k, r.TrackTarget, a, t);
        case 15:
          e = new TemporaryTeleportMarkItem_1.TemporaryTeleportMarkItem(r, k, a, t);
          break;
        case 16:
        case 21:
          e = new SoundBoxMarkItem_1.SoundBoxMarkItem(r, k, a, t);
          break;
        case 18:
          e = new TreasureBoxMarkItem_1.TreasureBoxMarkItem(r, k, a, t);
          break;
        case 17:
          e = new TreasureBoxDetectorMarkItem_1.TreasureBoxDetectorMarkItem(r, k, a, t);
          break;
        case 22:
          e = new EnrichmentAreaItem_1.EnrichmentAreaItem(r, k, a, t);
          break;
        case 23:
          e = new EnrichmentCollectProductItem_1.EnrichmentCollectProductItem(r, k, a, t);
          break;
        case 31:
          e = new FishingShipMarkItem_1.FishingShipMarkItem(r, k, a, t);
          break;
        case 32:
          e = new FishingPointMarkItem_1.FishingPointMarkItem(r, k, a, t);
          break;
        case 36:
        case 37:
        case 38:
          e = new TraceExploreEntityMarkItem_1.TraceExploreEntityMarkItem(r, k, a, t);
          break;
        default:
          e = new ServerMarkItem_1.ServerMarkItem(r, k, a, t);
      }
      if (e) {
        this.hf1(e, r.MapGravity);
      }
      return e;
    }
  }
  static CreateEntityMark(e, r, a, t, k, i) {
    r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(r);
    if (r) {
      e = new EntityMarkItem_1.EntityMarkItem(e, r, a, t, k, i);
      this.bDl(e, r.GravityFlip);
      return e;
    }
  }
  static CreateDynamicEntityMark(e, r, a, t, k, i) {
    r = ConfigManager_1.ConfigManager.MapConfig.GetDynamicConfigMark(r);
    if (r) {
      a = new DynamicEntityMarkItem_1.DynamicEntityMarkItem(e, r, a, t, k, i);
      if (k = ModelManager_1.ModelManager.MapModel.GetMark(r.ObjectType, e)) {
        a.OverrideMapId = k.MapId;
      }
      this.kQu(a, k?.MapGravity ?? 0, t);
      return a;
    }
  }
  static IsTrackPointedMarkInCurrentDungeon(e, r = false) {
    if (e.TrackSource !== 1) {
      return true;
    }
    var a = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.MapConfigId;
    if (e.Id <= 0) {
      const t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e.Id);
      if (t && t.MapId) {
        return t.MarkType === 12 || a === t.MapId;
      } else {
        return r;
      }
    }
    const t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e.Id);
    if (t && t.MapId) {
      return t.MarkType === 12 || a === t.MapId;
    } else if ((e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.Id)) && e.MapId) {
      return a === e.MapId;
    } else {
      return r;
    }
  }
  static IsHideTrackInView(e) {
    return e.MarkType !== 12 && (e.TrackHudEnable !== undefined ? !e.TrackHudEnable : e.TrackSource === 1);
  }
  static CanShowTrackMark(e) {
    return e !== undefined && MarkItemUtil.IsTrackPointedMarkInCurrentDungeon(e, true) && !MarkItemUtil.IsHideTrackInView(e);
  }
  static bDl(e, r) {
    e.MarkItemEntity = MarkFactory_1.MarkFactory.CreateAndAssembleMark({
      MarkId: e.MarkId,
      MarkType: e.MarkType,
      Gravity: r,
      MapId: e.MapId
    });
    e.Initialize();
  }
  static Sn_(e) {
    e.MarkItemEntity = MarkFactory_1.MarkFactory.CreateAndAssembleConfigMark({
      MarkId: e.MarkId,
      MarkType: e.MarkType,
      Gravity: e.MarkConfig.GravityFlip,
      Config: e.MarkConfig,
      EntityId: e.MarkConfig?.EntityConfigId,
      MapId: e.MapId
    });
    e.Initialize();
  }
  static hf1(e, r) {
    e.MarkItemEntity = MarkFactory_1.MarkFactory.CreateAndAssembleServerMark({
      MarkId: e.MarkId,
      MarkType: e.MarkType,
      Gravity: r,
      EntityId: e.EntityConfigId,
      MapId: e.MapId
    });
    e.Initialize();
  }
  static kQu(e, r, a) {
    e.MarkItemEntity = MarkFactory_1.MarkFactory.CreateAndAssembleDynamicConfigMark({
      MarkId: e.MarkId,
      MarkType: e.MarkType,
      Gravity: r,
      MapId: e.MapId,
      DynamicConfig: e.MarkConfig
    });
    e.Initialize();
    if (typeof a == "number") {
      e.MarkItemEntity.GetOrAddComponent(18).EntityId = a;
    }
    e.MarkItemEntity.GetOrAddComponent(18).Init();
  }
}
exports.MarkItemUtil = MarkItemUtil;
//# sourceMappingURL=MarkItemUtil.js.map