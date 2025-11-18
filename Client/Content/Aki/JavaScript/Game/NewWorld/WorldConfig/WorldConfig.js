"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldConfig = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const LockOnConfigById_1 = require("../../../Core/Define/ConfigQuery/LockOnConfigById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ROLE_COMMON_SKILLINFO_PATH = "/Game/Aki/Data/Fight/DT_Common_Role_SkillInfo.DT_Common_Role_SkillInfo";
const MONSTER_COMMON_SKILLINFO_PATH = "/Game/Aki/Data/Fight/DT_Common_Monster_SkillInfo.DT_Common_Monster_SkillInfo";
const VISION_COMMON_SKILLINFO_PATH = "/Game/Aki/Data/Fight/DT_Common_Vision_SkillInfo.DT_Common_Vision_SkillInfo";
const COMMON_BULLET_PATH = "/Game/Aki/Data/Fight/CDT_CommonBulletData.CDT_CommonBulletData";
const COMMON_HIT_EFFECT_PATH = "/Game/Aki/Data/Fight/DT_CommonHitEffect.DT_CommonHitEffect";
const CAUGHT_DATA_PATH = "/Game/Aki/Data/Fight/DT_CaughtInfo.DT_CaughtInfo";
const CHARACTERFIGHTINFO_DATA_PATH = "/Game/Aki/Data/Fight/CDT_CharacterFightInfo.CDT_CharacterFightInfo";
const QTE_TAG_DATA_PATH = "/Game/Aki/Data/Fight/DT_QteTag.DT_QteTag";
class WorldConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.zsr = undefined;
    this.Zsr = undefined;
    this.ear = undefined;
    this.tar = undefined;
    this.iar = undefined;
    this.oar = undefined;
    this.rar = undefined;
    this.nar = undefined;
    this.sar = undefined;
    this.aar = undefined;
    this.nGn = undefined;
    this.sGn = undefined;
  }
  OnInit() {
    return true;
  }
  GetLockOnConfig(t) {
    return LockOnConfigById_1.configLockOnConfigById.GetConfig(t);
  }
  GetRoleCommonSkillInfo() {
    if (!this.zsr) {
      this.zsr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(ROLE_COMMON_SKILLINFO_PATH, UE.DataTable);
      this.Zsr = new Array();
      if (this.zsr) {
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this.zsr, this.Zsr);
      }
    }
    return this.zsr;
  }
  GetRoleCommonSkillRowNames() {
    if (!this.Zsr) {
      this.GetRoleCommonSkillInfo();
    }
    return this.Zsr;
  }
  GetMonsterCommonSkillInfo() {
    if (!this.ear) {
      this.ear = ResourceSystem_1.ResourceSystem.GetLoadedAsset(MONSTER_COMMON_SKILLINFO_PATH, UE.DataTable);
      this.tar = new Array();
      if (this.ear) {
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this.ear, this.tar);
      }
    }
    return this.ear;
  }
  GetMonsterCommonSkillRowNames() {
    if (!this.tar) {
      this.GetMonsterCommonSkillInfo();
    }
    return this.tar;
  }
  GetVisionCommonSkillInfo() {
    if (!this.iar) {
      this.iar = ResourceSystem_1.ResourceSystem.GetLoadedAsset(VISION_COMMON_SKILLINFO_PATH, UE.DataTable);
      this.oar = new Array();
      if (this.iar) {
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this.iar, this.oar);
      }
    }
    return this.iar;
  }
  GetVisionCommonSkillRowNames() {
    if (!this.oar) {
      this.GetVisionCommonSkillInfo();
    }
    return this.oar;
  }
  GetCaughtDataInfo() {
    this.sar ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(CAUGHT_DATA_PATH, UE.DataTable);
    return this.sar;
  }
  GetCommonBulletData() {
    this.rar ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(COMMON_BULLET_PATH, UE.DataTable);
    return this.rar;
  }
  GetCommonHitEffectData() {
    this.nar ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(COMMON_HIT_EFFECT_PATH, UE.DataTable);
    return this.nar;
  }
  GetCharacterFightInfo(t) {
    this.aar ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(CHARACTERFIGHTINFO_DATA_PATH, UE.DataTable);
    return DataTableUtil_1.DataTableUtil.GetDataTableRow(this.aar, t);
  }
  ClearCommonSkillData() {
    this.zsr = undefined;
    this.rar = undefined;
    this.ear = undefined;
    this.iar = undefined;
    this.sar = undefined;
    this.aar = undefined;
  }
  GetRoleConfig(t) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
  }
  OnClear() {
    this.ClearCommonSkillData();
    return true;
  }
  GetQteTagDataTable() {
    if (!this.nGn && (this.nGn = ResourceSystem_1.ResourceSystem.GetLoadedAsset(QTE_TAG_DATA_PATH, UE.DataTable), this.sGn = new Map(), this.nGn)) {
      var t;
      var i;
      var e = new Array();
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowWithKeysFromTable(this.nGn, e);
      for (const o of e) {
        if (o[0] !== undefined && o[1] !== undefined && (t = o[0], (i = o[1]).QteTag.TagName !== "None")) {
          if (this.sGn.has(i.QteTag.TagId)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Config", 28, "DT_QteTag重复注册QTE标签", ["tag", i.QteTag.TagName]);
            }
          } else {
            this.sGn.set(i.QteTag.TagId, t);
          }
        }
      }
    }
    return this.nGn;
  }
  GetQteTagDataMap() {
    if (!this.sGn) {
      this.GetQteTagDataTable();
    }
    return this.sGn;
  }
}
exports.WorldConfig = WorldConfig;
//# sourceMappingURL=WorldConfig.js.map