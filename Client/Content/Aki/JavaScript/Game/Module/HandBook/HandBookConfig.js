"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookConfig = undefined;
const AnimalHandBookAll_1 = require("../../../Core/Define/ConfigQuery/AnimalHandBookAll");
const AnimalHandBookById_1 = require("../../../Core/Define/ConfigQuery/AnimalHandBookById");
const AnimalHandBookByMeshId_1 = require("../../../Core/Define/ConfigQuery/AnimalHandBookByMeshId");
const ChipHandBookAll_1 = require("../../../Core/Define/ConfigQuery/ChipHandBookAll");
const ChipHandBookById_1 = require("../../../Core/Define/ConfigQuery/ChipHandBookById");
const ChipHandBookByType_1 = require("../../../Core/Define/ConfigQuery/ChipHandBookByType");
const ChipTypeAll_1 = require("../../../Core/Define/ConfigQuery/ChipTypeAll");
const ChipTypeById_1 = require("../../../Core/Define/ConfigQuery/ChipTypeById");
const GeographyHandBookAll_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookAll");
const GeographyHandBookById_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookById");
const GeographyHandBookByTabType_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookByTabType");
const GeographyHandBookByTabTypeAndType_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookByTabTypeAndType");
const GeographyHandBookByType_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookByType");
const GeographyTabTypeAll_1 = require("../../../Core/Define/ConfigQuery/GeographyTabTypeAll");
const GeographyTabTypeById_1 = require("../../../Core/Define/ConfigQuery/GeographyTabTypeById");
const GeographyTypeAll_1 = require("../../../Core/Define/ConfigQuery/GeographyTypeAll");
const GeographyTypeById_1 = require("../../../Core/Define/ConfigQuery/GeographyTypeById");
const HandBookEntranceAll_1 = require("../../../Core/Define/ConfigQuery/HandBookEntranceAll");
const HandBookEntranceById_1 = require("../../../Core/Define/ConfigQuery/HandBookEntranceById");
const HandBookQuestTabAll_1 = require("../../../Core/Define/ConfigQuery/HandBookQuestTabAll");
const ItemHandBookAll_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookAll");
const ItemHandBookById_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookById");
const ItemHandBookByType_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookByType");
const ItemHandBookTypeAll_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookTypeAll");
const ItemHandBookTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookTypeById");
const MonsterHandBookAll_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookAll");
const MonsterHandBookById_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookById");
const MonsterHandBookByMonsterId_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookByMonsterId");
const MonsterHandBookByType_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookByType");
const MonsterHandBookTypeAll_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookTypeAll");
const MonsterHandBookTypeById_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookTypeById");
const NounHandBookAll_1 = require("../../../Core/Define/ConfigQuery/NounHandBookAll");
const NounHandBookById_1 = require("../../../Core/Define/ConfigQuery/NounHandBookById");
const NounHandBookByType_1 = require("../../../Core/Define/ConfigQuery/NounHandBookByType");
const NounTypeAll_1 = require("../../../Core/Define/ConfigQuery/NounTypeAll");
const NounTypeById_1 = require("../../../Core/Define/ConfigQuery/NounTypeById");
const PhantomFetterHandBookAll_1 = require("../../../Core/Define/ConfigQuery/PhantomFetterHandBookAll");
const PhantomHandBookAll_1 = require("../../../Core/Define/ConfigQuery/PhantomHandBookAll");
const PhantomHandBookById_1 = require("../../../Core/Define/ConfigQuery/PhantomHandBookById");
const PhantomHandBookPageAll_1 = require("../../../Core/Define/ConfigQuery/PhantomHandBookPageAll");
const PhotographHandBookAll_1 = require("../../../Core/Define/ConfigQuery/PhotographHandBookAll");
const PhotographHandBookById_1 = require("../../../Core/Define/ConfigQuery/PhotographHandBookById");
const PhotographHandBookByType_1 = require("../../../Core/Define/ConfigQuery/PhotographHandBookByType");
const PlotHandBookConfigByQuestId_1 = require("../../../Core/Define/ConfigQuery/PlotHandBookConfigByQuestId");
const PlotTypeAll_1 = require("../../../Core/Define/ConfigQuery/PlotTypeAll");
const PlotTypeById_1 = require("../../../Core/Define/ConfigQuery/PlotTypeById");
const WeaponHandBookAll_1 = require("../../../Core/Define/ConfigQuery/WeaponHandBookAll");
const WeaponHandBookById_1 = require("../../../Core/Define/ConfigQuery/WeaponHandBookById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class HandBookConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.Rei = undefined;
  }
  GetPhantomHandBookConfig() {
    return PhantomHandBookAll_1.configPhantomHandBookAll.GetConfigList();
  }
  GetPhantomFetterHandBookConfig() {
    return PhantomFetterHandBookAll_1.configPhantomFetterHandBookAll.GetConfigList();
  }
  GetPhantomHandBookConfigById(e) {
    return PhantomHandBookById_1.configPhantomHandBookById.GetConfig(e);
  }
  GetPhantomHandBookPageConfig() {
    return PhantomHandBookPageAll_1.configPhantomHandBookPageAll.GetConfigList();
  }
  GetHandBookEntranceConfig(e) {
    return HandBookEntranceById_1.configHandBookEntranceById.GetConfig(e);
  }
  GetHandBookEntranceConfigList() {
    return HandBookEntranceAll_1.configHandBookEntranceAll.GetConfigList();
  }
  GetWeaponHandBookConfig(e) {
    return WeaponHandBookById_1.configWeaponHandBookById.GetConfig(e);
  }
  GetWeaponHandBookConfigList() {
    return WeaponHandBookAll_1.configWeaponHandBookAll.GetConfigList();
  }
  GetMonsterHandBookConfigById(e) {
    return MonsterHandBookById_1.configMonsterHandBookById.GetConfig(e);
  }
  GetMonsterHandBookConfigByMonsterId(e) {
    return MonsterHandBookByMonsterId_1.configMonsterHandBookByMonsterId.GetConfig(e);
  }
  GetMonsterHandBookConfigByType(e) {
    return MonsterHandBookByType_1.configMonsterHandBookByType.GetConfigList(e);
  }
  GetMonsterHandBookTypeConfig() {
    return MonsterHandBookTypeAll_1.configMonsterHandBookTypeAll.GetConfigList();
  }
  GetMonsterHandBookTypeConfigById(e) {
    return MonsterHandBookTypeById_1.configMonsterHandBookTypeById.GetConfig(e);
  }
  GetMonsterHandBookConfigList() {
    return MonsterHandBookAll_1.configMonsterHandBookAll.GetConfigList();
  }
  GetItemHandBookConfigById(e) {
    return ItemHandBookById_1.configItemHandBookById.GetConfig(e);
  }
  GetItemHandBookConfigList() {
    return ItemHandBookAll_1.configItemHandBookAll.GetConfigList();
  }
  GetItemHandBookConfigByType(e) {
    return ItemHandBookByType_1.configItemHandBookByType.GetConfigList(e);
  }
  GetItemHandBookTypeConfigList() {
    return ItemHandBookTypeAll_1.configItemHandBookTypeAll.GetConfigList();
  }
  GetItemHandBookTypeConfig(e) {
    return ItemHandBookTypeById_1.configItemHandBookTypeById.GetConfig(e);
  }
  GetAnimalHandBookConfigList() {
    return AnimalHandBookAll_1.configAnimalHandBookAll.GetConfigList();
  }
  GetAnimalHandBookConfigById(e) {
    return AnimalHandBookById_1.configAnimalHandBookById.GetConfig(e);
  }
  GetAnimalHandBookConfigByMeshId(e) {
    if (!this.Rei) {
      this.Rei = new Map();
      for (const o of AnimalHandBookAll_1.configAnimalHandBookAll.GetConfigList()) {
        this.Rei.set(o.MeshId, o.Id);
      }
    }
    if (this.Rei.get(e)) {
      return AnimalHandBookByMeshId_1.configAnimalHandBookByMeshId.GetConfig(e);
    }
  }
  GetAllChipHandBookConfig() {
    return ChipHandBookAll_1.configChipHandBookAll.GetConfigList();
  }
  GetChipHandBookConfigList(e) {
    return ChipHandBookByType_1.configChipHandBookByType.GetConfigList(e);
  }
  GetChipHandBookConfig(e) {
    return ChipHandBookById_1.configChipHandBookById.GetConfig(e);
  }
  GetChipTypeConfigList() {
    return ChipTypeAll_1.configChipTypeAll.GetConfigList();
  }
  GetChipTypeConfig(e) {
    return ChipTypeById_1.configChipTypeById.GetConfig(e);
  }
  GetNounHandBookConfig(e) {
    return NounHandBookById_1.configNounHandBookById.GetConfig(e);
  }
  GetNounHandBookConfigList(e) {
    return NounHandBookByType_1.configNounHandBookByType.GetConfigList(e);
  }
  GetNounTypeConfigList() {
    return NounTypeAll_1.configNounTypeAll.GetConfigList();
  }
  GetNounTypeConfig(e) {
    return NounTypeById_1.configNounTypeById.GetConfig(e);
  }
  GetNounTypeConfigAll() {
    return NounHandBookAll_1.configNounHandBookAll.GetConfigList();
  }
  GetGeographyHandBookConfig(e) {
    return GeographyHandBookById_1.configGeographyHandBookById.GetConfig(e);
  }
  GetAllGeographyHandBookConfig() {
    return GeographyHandBookAll_1.configGeographyHandBookAll.GetConfigList();
  }
  GetGeographyHandBookConfigByType(e) {
    return GeographyHandBookByType_1.configGeographyHandBookByType.GetConfigList(e);
  }
  GetGeographyHandBookConfigByTabType(e) {
    return GeographyHandBookByTabType_1.configGeographyHandBookByTabType.GetConfigList(e);
  }
  GetGeographyHandBookConfigByTabTypeAndType(e, o) {
    return GeographyHandBookByTabTypeAndType_1.configGeographyHandBookByTabTypeAndType.GetConfigList(e, o);
  }
  GetGeographyTypeConfig(e) {
    return GeographyTypeById_1.configGeographyTypeById.GetConfig(e);
  }
  GetGeographyTypeConfigList() {
    return GeographyTypeAll_1.configGeographyTypeAll.GetConfigList();
  }
  GetGeographyTabList() {
    return GeographyTabTypeAll_1.configGeographyTabTypeAll.GetConfigList();
  }
  GetGeographyTabTypeById(e) {
    return GeographyTabTypeById_1.configGeographyTabTypeById.GetConfig(e);
  }
  GetAllPlotHandBookConfig() {
    return PhotographHandBookAll_1.configPhotographHandBookAll.GetConfigList();
  }
  GetPlotHandBookConfig(e) {
    return PhotographHandBookById_1.configPhotographHandBookById.GetConfig(e);
  }
  GetPlotHandBookConfigByType(e) {
    return PhotographHandBookByType_1.configPhotographHandBookByType.GetConfigList(e);
  }
  GetPlotTypeConfig(e) {
    return PlotTypeById_1.configPlotTypeById.GetConfig(e);
  }
  GetPlotTypeConfigList() {
    return PlotTypeAll_1.configPlotTypeAll.GetConfigList();
  }
  GetQuestTabList() {
    return HandBookQuestTabAll_1.configHandBookQuestTabAll.GetConfigList();
  }
  GetQuestTab(e) {
    for (const o of HandBookQuestTabAll_1.configHandBookQuestTabAll.GetConfigList()) {
      if (o.Type === e) {
        return o;
      }
    }
  }
  GetQuestPlotConfig(e) {
    return PlotHandBookConfigByQuestId_1.configPlotHandBookConfigByQuestId.GetConfig(e);
  }
}
exports.HandBookConfig = HandBookConfig;
//# sourceMappingURL=HandBookConfig.js.map