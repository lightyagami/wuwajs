"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MapMark_1 = require("../../../Core/Define/Config/MapMark");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const AreaByLevel_1 = require("../../../Core/Define/ConfigQuery/AreaByLevel");
const BlockSwitchById_1 = require("../../../Core/Define/ConfigQuery/BlockSwitchById");
const CustomMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/CustomMarkByMarkId");
const DynamicMapMarkAll_1 = require("../../../Core/Define/ConfigQuery/DynamicMapMarkAll");
const DynamicMapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/DynamicMapMarkByMarkId");
const EnrichmentAreaConfigByEnrichmentId_1 = require("../../../Core/Define/ConfigQuery/EnrichmentAreaConfigByEnrichmentId");
const EnrichmentAreaConfigByItemId_1 = require("../../../Core/Define/ConfigQuery/EnrichmentAreaConfigByItemId");
const FogBlockAll_1 = require("../../../Core/Define/ConfigQuery/FogBlockAll");
const FogBlockByBlockAndMapId_1 = require("../../../Core/Define/ConfigQuery/FogBlockByBlockAndMapId");
const FogTextureConfigAll_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigAll");
const FogTextureConfigByMapId_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigByMapId");
const LevelEntityConfigByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapIdAndEntityId");
const MapBorderAll_1 = require("../../../Core/Define/ConfigQuery/MapBorderAll");
const MapMarkAll_1 = require("../../../Core/Define/ConfigQuery/MapMarkAll");
const MapMarkByEntityConfigId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByEntityConfigId");
const MapMarkByInstanceDungeonId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByInstanceDungeonId");
const MapMarkByMapId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMapId");
const MapMarkByRelativeId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByRelativeId");
const MapMarkRelativeSubTypeAll_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeAll");
const MapMarkRelativeSubTypeByFunctionId_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeByFunctionId");
const MapMarkRelativeSubTypeById_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeById");
const MapPeriodicActivityAll_1 = require("../../../Core/Define/ConfigQuery/MapPeriodicActivityAll");
const MapPeriodicActivityById_1 = require("../../../Core/Define/ConfigQuery/MapPeriodicActivityById");
const MonsterDetectionAll_1 = require("../../../Core/Define/ConfigQuery/MonsterDetectionAll");
const MultiMapAll_1 = require("../../../Core/Define/ConfigQuery/MultiMapAll");
const MultiMapAreaConfigAll_1 = require("../../../Core/Define/ConfigQuery/MultiMapAreaConfigAll");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const SoundBoxMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/SoundBoxMarkByMarkId");
const TaskMarkAll_1 = require("../../../Core/Define/ConfigQuery/TaskMarkAll");
const TaskMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TaskMarkByMarkId");
const TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById");
const TemporaryTeleportMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TemporaryTeleportMarkByMarkId");
const TreasureBoxDetectorMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TreasureBoxDetectorMarkByMarkId");
const TreasureBoxMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TreasureBoxMarkByMarkId");
const UiResourceById_1 = require("../../../Core/Define/ConfigQuery/UiResourceById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const MapLogger_1 = require("./Misc/MapLogger");
class MapConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.Yt1 = new Map();
    this.pDi = undefined;
    this.vDi = undefined;
    this.aVa = undefined;
    this.vSl = undefined;
    this.MSl = undefined;
    this.rO_ = undefined;
    this.vYa = undefined;
    this.MYa = undefined;
    this.dfc = [];
    this.mlh = new Map();
    this.Qy1 = new Map();
    this.o41 = new Map();
    this.n41 = [];
  }
  OnInit() {
    this.pDi = new Map();
    this.vDi = new Map();
    var e = MapMarkRelativeSubTypeAll_1.configMapMarkRelativeSubTypeAll.GetConfigList();
    if (e) {
      for (const r of e) {
        this.pDi.set(r.FunctionId, true);
      }
    }
    e = FogBlockAll_1.configFogBlockAll.GetConfigList();
    if (e) {
      for (const i of e) {
        this.vDi.set(i.Block + "_" + i.MapId, true);
      }
    }
    e = TaskMarkAll_1.configTaskMarkAll.GetConfigList();
    if (e) {
      this.aVa = new Map();
      for (const t of e) {
        this.aVa.set(t.QuestId, t);
      }
    }
    e = MonsterDetectionAll_1.configMonsterDetectionAll.GetConfigList();
    if (e) {
      this.rO_ = new Map();
      for (const a of e) {
        this.rO_.set(a.MarkId, a);
      }
    }
    e = MapMarkAll_1.configMapMarkAll.GetConfigList();
    if (e) {
      this.vSl = new Map();
      for (const o of e) {
        this.vSl.set(o.MarkId, o);
      }
    }
    e = DynamicMapMarkAll_1.configDynamicMapMarkAll.GetConfigList();
    if (e) {
      this.MSl = new Map();
      for (const n of e) {
        this.MSl.set(n.MarkId, n);
      }
    }
    this.SYa();
    this.zt1();
    this.Ky1();
    this.s41();
    return true;
  }
  OnClear() {
    this.pDi?.clear();
    this.vDi?.clear();
    this.aVa?.clear();
    this.vSl?.clear();
    this.MSl?.clear();
    this.WorldMapNavigateAreaMap?.clear();
    this.WorldMapNavigateCountryMap?.clear();
    this.rO_?.clear();
    this.mlh.clear();
    this.Yt1?.clear();
    this.pDi = undefined;
    this.vDi = undefined;
    this.Qy1.clear();
    this.o41.clear();
    return !(this.n41.length = 0);
  }
  SYa() {
    this.vYa = new Map();
    this.MYa = new Map();
    var e = AreaByLevel_1.configAreaByLevel.GetConfigList(2);
    if (e) {
      this.yYa(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 63, "[地图系统]->不存在1级区域配置，请联系策划检查q.区域配置!");
    }
  }
  zt1() {
    var e = this.GetAllTileConfig();
    if (e) {
      for (const i of e) {
        var r = this.Jt1(i.Block, i.MapId, i.GravityFlip);
        this.Yt1.set(r, i);
      }
    }
  }
  Ky1() {
    var e = this.GetMapBorderConfigList();
    if (e) {
      for (const i of e) {
        var r = this.Xy1(i.BorderId, i.MapId);
        this.Qy1.set(r, i);
      }
    }
  }
  s41() {
    var e = MultiMapAll_1.configMultiMapAll.GetConfigList();
    if (e) {
      for (const r of e) {
        this.o41.set(r.Id, r);
        this.n41.push(r);
      }
    }
  }
  yYa(e) {
    e.forEach(e => {
      var r = {
        AreaId: e.AreaId,
        StateId: e.StateId,
        CountryId: e.CountryId,
        MarkId: e.DeliveryMarkId,
        MarkType: e.DeliveryMarkType
      };
      this.vYa.set(e.AreaId, r);
      let i = this.MYa.get(e.CountryId);
      if (i === undefined) {
        i = {
          StateMap: undefined,
          AreaNavigateList: []
        };
        this.MYa.set(e.CountryId, i);
        e = {
          CountryId: e.CountryId,
          NavigateCountry: i
        };
        this.dfc.push(e);
        this.dfc.sort((e, r) => {
          return (ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e.CountryId)?.SortIndex ?? 0) - (ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(r.CountryId)?.SortIndex ?? 0);
        });
      }
      e = r.StateId;
      if (e !== 0) {
        if (i.StateMap === undefined) {
          i.StateMap = new Map();
        }
        if (!i.StateMap.has(e)) {
          i.StateMap.set(e, {
            StateId: e,
            AreaNavigateList: []
          });
        }
        i.StateMap.get(e).AreaNavigateList.push(r);
      }
      i.AreaNavigateList.push(r);
    });
  }
  get WorldMapNavigateAreaMap() {
    return this.vYa;
  }
  get WorldMapNavigateCountryMap() {
    return this.MYa;
  }
  get WorldMapNavigateCountryList() {
    return this.dfc;
  }
  GetTaskMarkConfig(e) {
    return TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
  }
  GetTaskMarkConfigByQuestId(e) {
    return this.aVa?.get(e);
  }
  GetMonsterDetectionConfig(e) {
    return this.rO_?.get(e);
  }
  GetConfigMarks(e) {
    var r = MapMarkByMapId_1.configMapMarkByMapId.GetConfigList(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "找不到MapMark表", ["mapId", e]);
      }
    }
    return r;
  }
  GetConfigMark(e) {
    return this.vSl.get(e);
  }
  GetConfigMarkMap() {
    return this.vSl;
  }
  GetDynamicConfigMark(e) {
    var r = DynamicMapMarkByMarkId_1.configDynamicMapMarkByMarkId.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "找不到DynamicMapMark表", ["markId", e]);
      }
    }
    return r;
  }
  SearchMarkConfig(e) {
    if (this.vSl.has(e)) {
      return this.vSl.get(e);
    } else if (this.MSl.has(e)) {
      return this.MSl.get(e);
    } else {
      MapLogger_1.MapLogger.Debug(63, "查询标记配置失败->MapMark和DynamicMark配置都不存在相关配置", ["MarkId", e]);
      return;
    }
  }
  SearchMapConfigByType(e, r) {
    var i = this.vSl.get(e);
    if (i && i.ObjectType === r || (i = this.MSl.get(e)) && i.ObjectType === r) {
      return i;
    } else {
      return undefined;
    }
  }
  SearchMarkInstanceDungeonId(e, r) {
    if (r !== 9) {
      if ((e = this.SearchMapConfigByType(e, r)) instanceof MapMark_1.MapMark) {
        return e.RelativeDungeonId;
      } else {
        return e?.InstanceDungeonId;
      }
    }
  }
  GetTeleportConfigById(e) {
    var r = TeleporterById_1.configTeleporterById.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 18, "找不到Teleporter表的配置,Id = ", ["teleportId", e]);
      }
    }
    return r;
  }
  GetTemporaryTeleportMarkConfigById(e) {
    var r = TemporaryTeleportMarkByMarkId_1.configTemporaryTeleportMarkByMarkId.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 49, "找不到TemporaryTeleportMark表的配置,Id = ", ["markId", e]);
      }
    }
    return r;
  }
  Jt1(e, r, i) {
    return `${e}_${r}_${i}`;
  }
  GetTileConfig(e, r, i) {
    e = this.Jt1(e, r, i);
    return this.Yt1.get(e);
  }
  GetAllTileConfig() {
    return FogTextureConfigAll_1.configFogTextureConfigAll.GetConfigList();
  }
  GetAllTileConfigByMapId(e) {
    return FogTextureConfigByMapId_1.configFogTextureConfigByMapId.GetConfigList(e);
  }
  GetUnlockMapTileConfigById(e) {
    return BlockSwitchById_1.configBlockSwitchById.GetConfig(e);
  }
  GetSubMapConfigByGroupId(e) {
    var r = [];
    for (const i of this.n41) {
      if (i.GroupId === e) {
        r.push(i);
      }
    }
    return r;
  }
  GetSubMapConfigById(e) {
    return this.o41.get(e);
  }
  GetAllSubMapConfig() {
    return this.n41;
  }
  GetSubMapConfigByAreaId(e) {
    for (const r of this.n41) {
      if (r.Area.includes(e)) {
        return r;
      }
    }
  }
  GetCustomMarkConfig(e) {
    var r = CustomMarkByMarkId_1.configCustomMarkByMarkId.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 18, "找不到CustomMark表的配置", ["MarkId", e]);
      }
    }
    return r;
  }
  GetFogBlockConfig(e, r) {
    if (this.vDi.has(e + "_" + r)) {
      return FogBlockByBlockAndMapId_1.configFogBlockByBlockAndMapId.GetConfig(e, r);
    }
  }
  GetLocalText(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetEntityConfigByMapIdAndEntityId(e, r) {
    var i = e + "-" + r;
    if (!this.mlh.has(i)) {
      if ((e = LevelEntityConfigByMapIdAndEntityId_1.configLevelEntityConfigByMapIdAndEntityId.GetConfig(e, r)) === undefined) {
        this.mlh.set(i, true);
      }
      return e;
    }
  }
  Xy1(e, r) {
    return e + "_" + r;
  }
  GetMapBorderConfig(e, r) {
    e = this.Xy1(e, r);
    return this.Qy1.get(e);
  }
  GetMapBorderConfigList() {
    return MapBorderAll_1.configMapBorderAll.GetConfigList();
  }
  GetMapDissolveTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MapDissolveTime");
  }
  GetSoundBoxMarkConfig(e) {
    var r = SoundBoxMarkByMarkId_1.configSoundBoxMarkByMarkId.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 49, "找不到SoundBoxMark表的配置", ["MarkId", e]);
      }
    }
    return r;
  }
  GetTreasureBoxMarkConfig(e) {
    var r = TreasureBoxMarkByMarkId_1.configTreasureBoxMarkByMarkId.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 49, "找不到TreasureBoxMark表的配置", ["MarkId", e]);
      }
    }
    return r;
  }
  GetTreasureBoxDetectorMarkConfig(e) {
    var r = TreasureBoxDetectorMarkByMarkId_1.configTreasureBoxDetectorMarkByMarkId.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 49, "找不到TreasureBoxDetectorMark表的配置", ["MarkId", e]);
      }
    }
    return r;
  }
  GetMapMarkFuncTypeConfigByFuncId(e) {
    if (this.pDi.has(e)) {
      return MapMarkRelativeSubTypeByFunctionId_1.configMapMarkRelativeSubTypeByFunctionId.GetConfig(e);
    }
  }
  GetMapMarkFuncTypeConfigById(e) {
    return MapMarkRelativeSubTypeById_1.configMapMarkRelativeSubTypeById.GetConfig(e);
  }
  GetUiResourcePathById(e) {
    var r;
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      return "";
    } else if (r = UiResourceById_1.configUiResourceById.GetConfig(e)) {
      return r.Path;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "找不到UiResource表的配置", ["key", e]);
      }
      return "";
    }
  }
  GetMultiMapAreaConfigList() {
    return MultiMapAreaConfigAll_1.configMultiMapAreaConfigAll.GetConfigList();
  }
  GetEnrichmentAreaConfigByItemId(e) {
    return EnrichmentAreaConfigByItemId_1.configEnrichmentAreaConfigByItemId.GetConfigList(e);
  }
  GetEnrichmentAreaConfigByEnrichmentId(e) {
    e = EnrichmentAreaConfigByEnrichmentId_1.configEnrichmentAreaConfigByEnrichmentId.GetConfigList(e);
    if (e) {
      return e[0];
    }
  }
  GetMapMarkByRelativeId(e, r) {
    return MapMarkByRelativeId_1.configMapMarkByRelativeId.GetConfig(e, r);
  }
  GetMapMarkByEntityConfigId(e) {
    return MapMarkByEntityConfigId_1.configMapMarkByEntityConfigId.GetConfig(e);
  }
  GetMapMarkListByInstanceDungeonId(e) {
    return MapMarkByInstanceDungeonId_1.configMapMarkByInstanceDungeonId.GetConfigList(e);
  }
  GetMapPeriodicActivityConfig(e) {
    return MapPeriodicActivityById_1.configMapPeriodicActivityById.GetConfig(e);
  }
  GetMapPeriodicActivityListConfigs() {
    return MapPeriodicActivityAll_1.configMapPeriodicActivityAll.GetConfigList();
  }
}
(exports.MapConfig = MapConfig).EnableAsyncMiniMap = false;
//# sourceMappingURL=MapConfig.js.map