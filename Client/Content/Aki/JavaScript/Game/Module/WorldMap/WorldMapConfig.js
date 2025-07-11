"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapConfig = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const AkiMapAll_1 = require("../../../Core/Define/ConfigQuery/AkiMapAll");
const AkiMapSourceByMapId_1 = require("../../../Core/Define/ConfigQuery/AkiMapSourceByMapId");
const AudioById_1 = require("../../../Core/Define/ConfigQuery/AudioById");
const ConditionGroupById_1 = require("../../../Core/Define/ConfigQuery/ConditionGroupById");
const CustomizedThumbnailById_1 = require("../../../Core/Define/ConfigQuery/CustomizedThumbnailById");
const CustomMarkAll_1 = require("../../../Core/Define/ConfigQuery/CustomMarkAll");
const EntityGravityConfigAll_1 = require("../../../Core/Define/ConfigQuery/EntityGravityConfigAll");
const ExploreProgressById_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressById");
const InstanceDungeonAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonAll");
const MapFogByFog_1 = require("../../../Core/Define/ConfigQuery/MapFogByFog");
const MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById");
const MapRangeByMapId_1 = require("../../../Core/Define/ConfigQuery/MapRangeByMapId");
const PunishReportById_1 = require("../../../Core/Define/ConfigQuery/PunishReportById");
const TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../Common/PublicUtil");
const MapUtil_1 = require("../Map/MapUtil");
class WorldMapConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.KYa = new Map();
    this.z0l = new Map();
    this.wbc = new Map();
    this.Bu1 = new Map();
  }
  OnInit() {
    var e = AkiMapAll_1.configAkiMapAll.GetConfigList();
    if (e) {
      e.forEach(e => {
        this.KYa.set(e.MapId, e);
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 63, "[地图系统]->不存在地图配置，请联系策划检查akiMap配置!");
    }
    var e = InstanceDungeonAll_1.configInstanceDungeonAll.GetConfigList();
    if (e) {
      e.forEach(e => {
        this.z0l.set(e.Id, e);
      });
    }
    this.ku1();
    return true;
  }
  OnClear() {
    this.KYa.clear();
    this.z0l.clear();
    return true;
  }
  IsDungeonInWorld(e) {
    var e = this.z0l.get(e);
    return e !== undefined && (e = e.MapConfigId, this.IsMapInWorld(e));
  }
  IsMapInWorld(e) {
    return this.GetAkiMapConfig(e, false) !== undefined;
  }
  GetDungeonConfig(e) {
    return this.z0l.get(e);
  }
  GetCommonValue(e) {
    return CommonParamById_1.configCommonParamById.GetIntConfig(e) ?? 0;
  }
  GetCommonIntArray(e) {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(e);
  }
  GetCustomMarks() {
    return CustomMarkAll_1.configCustomMarkAll.GetConfigList();
  }
  GetTeleportEntityConfigId(e) {
    var r = TeleporterById_1.configTeleporterById.GetConfig(e);
    if (r) {
      return r.TeleportEntityConfigId;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 18, "传送表找不到配置", ["Id", e]);
      }
      return 0;
    }
  }
  GetAkiMapConfig(e, r = true) {
    var i = this.KYa.get(e);
    if (!i && r && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 18, "AkiMap表找不到配置", ["MapId", e]);
    }
    return i;
  }
  GetAkiMapSourceConfig(e) {
    var r = AkiMapSourceByMapId_1.configAkiMapSourceByMapId.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 39, "AkiMapSource表找不到配置", ["MapId", e]);
      }
    }
    return r;
  }
  GetAudioConfig(e) {
    var r = AudioById_1.configAudioById.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 18, "Audio表找不到配置", ["Id", e]);
      }
    }
    return r;
  }
  GetDailyTaskMarkItem(e) {
    var r = MapNoteById_1.configMapNoteById.GetConfig(1).MarkIdMap.get(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 49, "d.地图便签表DailyMarkId列找不到对应配置", ["国家Id:", e]);
      }
    }
    return r;
  }
  GetExploreProgressInfoById(e) {
    var r = ExploreProgressById_1.configExploreProgressById.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 49, `t.探索度配置表
            找不到对应配置`, ["Id", e]);
      }
    }
    return r;
  }
  GetPunishReportConfig(e) {
    return PunishReportById_1.configPunishReportById.GetConfig(e);
  }
  GetConditionGroup(e) {
    return ConditionGroupById_1.configConditionGroupById.GetConfig(e);
  }
  GetMapFogConfig(e) {
    return MapFogByFog_1.configMapFogByFog.GetConfig(e);
  }
  GetAllMapRangeConfigByMapId(e) {
    return MapRangeByMapId_1.configMapRangeByMapId.GetConfigList(e);
  }
  ReloadConfig() {
    this.ku1();
  }
  ku1() {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.wbc.clear();
      var e = EntityGravityConfigAll_1.configEntityGravityConfigAll.GetConfigList();
      if (e) {
        for (const t of e) {
          var r = this.wbc.get(t.MapId) ?? new Map();
          this.wbc.set(t.MapId, r);
          r.set(t.EntityId, t);
        }
      }
    } else {
      this.Bu1.clear();
      e = UE.KismetSystemLibrary.ConvertToAbsolutePath(UE.BlueprintPathsLibrary.ProjectDir());
      e = UE.KismetSystemLibrary.ConvertToAbsolutePath("" + e + IGlobal_1.globalConfigTemp.GravityAbnormalEntityListPath);
      if (UE.BlueprintPathsLibrary.FileExists(e)) {
        var i = (0, puerts_1.$ref)("");
        UE.KuroStaticLibrary.LoadFileToString(i, e);
        i = (0, puerts_1.$unref)(i);
        var i = JSON.parse(i);
        for (const n of i.AllConfig) {
          for (const a of n.EntityDirectionConfig) {
            var o = this.Bu1.get(n.LevelId) ?? new Map();
            this.Bu1.set(n.LevelId, o);
            o.set(a.EntityId, a);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Editor", 63, "文件不存在", ["Path", e]);
      }
    }
  }
  GetEntityGravityConfig(e, r) {
    return this.wbc.get(e)?.get(r);
  }
  GetEditorEntityGravityConfig(e, r) {
    return this.Bu1.get(e)?.get(r);
  }
  GetEntityGravityDirection(e, r) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var i = this.GetEntityGravityConfig(e, r);
      if (i && i.GravityDirection.length >= 3) {
        if (MapUtil_1.MapUtil.IsStandardGravity(i.GravityDirection[2])) {
          return 1;
        } else {
          return 2;
        }
      }
    } else {
      i = this.GetEditorEntityGravityConfig(e, r);
      if (i && i.GravityDirection?.Z !== undefined) {
        if (MapUtil_1.MapUtil.IsStandardGravity(i.GravityDirection?.Z)) {
          return 1;
        } else {
          return 2;
        }
      }
    }
    return 0;
  }
  GetEditorEntityGravityMap() {
    return this.Bu1;
  }
  GetCustomizedThumbnailConfig(e) {
    return CustomizedThumbnailById_1.configCustomizedThumbnailById.GetConfig(e);
  }
}
exports.WorldMapConfig = WorldMapConfig;
//# sourceMappingURL=WorldMapConfig.js.map