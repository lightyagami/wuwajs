"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleConfig = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const AutoRoleById_1 = require("../../../Core/Define/ConfigQuery/AutoRoleById");
const MainRoleConfigAll_1 = require("../../../Core/Define/ConfigQuery/MainRoleConfigAll");
const MainRoleConfigByGender_1 = require("../../../Core/Define/ConfigQuery/MainRoleConfigByGender");
const MainRoleConfigById_1 = require("../../../Core/Define/ConfigQuery/MainRoleConfigById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const RoleAnimAudioByRoleId_1 = require("../../../Core/Define/ConfigQuery/RoleAnimAudioByRoleId");
const RoleBreachByBreachGroupId_1 = require("../../../Core/Define/ConfigQuery/RoleBreachByBreachGroupId");
const RoleBreachByBreachGroupIdAndBreachLevel_1 = require("../../../Core/Define/ConfigQuery/RoleBreachByBreachGroupIdAndBreachLevel");
const RoleExpItemAll_1 = require("../../../Core/Define/ConfigQuery/RoleExpItemAll");
const RoleExpItemById_1 = require("../../../Core/Define/ConfigQuery/RoleExpItemById");
const RoleInfoAll_1 = require("../../../Core/Define/ConfigQuery/RoleInfoAll");
const RoleInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleInfoById");
const RoleInfoByRoleType_1 = require("../../../Core/Define/ConfigQuery/RoleInfoByRoleType");
const RoleLevelConsumeByConsumeGroupIdAndLevel_1 = require("../../../Core/Define/ConfigQuery/RoleLevelConsumeByConsumeGroupIdAndLevel");
const RoleMorphByRoleId_1 = require("../../../Core/Define/ConfigQuery/RoleMorphByRoleId");
const RoleQualityInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleQualityInfoById");
const RoleTagAll_1 = require("../../../Core/Define/ConfigQuery/RoleTagAll");
const RoleTagById_1 = require("../../../Core/Define/ConfigQuery/RoleTagById");
const RoleTrainingDegreeByDifficultyLevel_1 = require("../../../Core/Define/ConfigQuery/RoleTrainingDegreeByDifficultyLevel");
const TrialRoleInfoByGroupId_1 = require("../../../Core/Define/ConfigQuery/TrialRoleInfoByGroupId");
const TrialRoleInfoById_1 = require("../../../Core/Define/ConfigQuery/TrialRoleInfoById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleDefine_1 = require("./RoleDefine");
class RoleConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.Gdo = new Map();
  }
  GetRoleName(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  LimitStringCount() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("character_name_def_limit");
  }
  GetRoleResonanceGrowthDescribe(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  GetRoleConfig(e) {
    if (e !== 0) {
      e = this.GetBaseRoleId(e);
      return RoleInfoById_1.configRoleInfoById.GetConfig(e);
    }
  }
  GetRoleMorphConfig(e, o, r) {
    e = RoleMorphByRoleId_1.configRoleMorphByRoleId.GetConfigList(e);
    if (e && !(e.length <= 0)) {
      return e.find(e => e.Morph === r && e.SkinId === o);
    }
  }
  GetRoleMorphConfigList(e, o) {
    e = RoleMorphByRoleId_1.configRoleMorphByRoleId.GetConfigList(e);
    if (e && !(e.length <= 0)) {
      return e.filter(e => e.SkinId === o);
    }
  }
  GetAutoRoleConfig(e) {
    e = this.GetBaseRoleId(e);
    return AutoRoleById_1.configAutoRoleById.GetConfig(e);
  }
  GetBaseRoleId(o) {
    let r = o;
    if (this.IsTrialRole(o)) {
      let e = this.GetTrialRoleConfigByGroupId(o);
      e = e || this.GetTrialRoleConfig(o);
      r = e?.ParentId ?? 0;
    }
    return r;
  }
  IsTrialRole(e) {
    return e > RoleDefine_1.ROBOT_DATA_MIN_ID;
  }
  GetRoleHeadIcon(e, o = false) {
    e = this.GetRoleConfig(e);
    if (o) {
      return e.RoleHeadIconBig;
    } else {
      return e.RoleHeadIcon;
    }
  }
  GetRoleTrialGroupId(r) {
    r = TrialRoleInfoByGroupId_1.configTrialRoleInfoByGroupId.GetConfigList(r);
    if (r && !(r.length <= 0)) {
      var n;
      var l = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
      let e = undefined;
      let o = l - r[0].WorldLevel;
      for (const i of r) {
        if (i.WorldLevel === l) {
          return i;
        }
        if (!(i.WorldLevel > l)) {
          if ((n = l - i.WorldLevel) <= o) {
            o = n;
            e = i;
          }
        }
      }
      return e;
    }
  }
  GetGenderRoleTrialByGroupId(r) {
    r = TrialRoleInfoByGroupId_1.configTrialRoleInfoByGroupId.GetConfigList(r);
    if (r && !(r.length <= 0)) {
      var n = this.ar1();
      var l = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
      let e = undefined;
      let o = l - r[0].WorldLevel;
      for (const t of r) {
        var i = t.Gender;
        if (!(i >= 0) || n === i) {
          if (t.WorldLevel === l) {
            return t;
          }
          if (!(t.WorldLevel > l)) {
            if ((i = l - t.WorldLevel) <= o) {
              o = i;
              e = t;
            }
          }
        }
      }
      return e;
    }
  }
  GetDamageConfig(e) {
    return ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(e);
  }
  GetRoleBreachList(e) {
    return RoleBreachByBreachGroupId_1.configRoleBreachByBreachGroupId.GetConfigList(e);
  }
  GetRoleBreachConfig(e, o) {
    return RoleBreachByBreachGroupIdAndBreachLevel_1.configRoleBreachByBreachGroupIdAndBreachLevel.GetConfig(e, o);
  }
  GetRoleExpItemList() {
    return RoleExpItemAll_1.configRoleExpItemAll.GetConfigList();
  }
  GetRoleExpItemExp(e) {
    return RoleExpItemById_1.configRoleExpItemById.GetConfig(e)?.BasicExp;
  }
  GetRolePerformanceDelayTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("action_stand_show_time");
  }
  GetRoleHuluModelId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("role_panel_using_model");
  }
  GetRoleAudioMap(e) {
    return RoleAnimAudioByRoleId_1.configRoleAnimAudioByRoleId.GetConfigList(e);
  }
  GetRoleList() {
    return RoleInfoAll_1.configRoleInfoAll.GetConfigList();
  }
  GetRoleListByType(e) {
    return RoleInfoByRoleType_1.configRoleInfoByRoleType.GetConfigList(e);
  }
  GetResonAnimationInterval() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("role_reson_animation_interval");
  }
  GetRoleLevelUpSuccessDelayTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("RoleLevelUpSuccessDelayTime");
  }
  GetRoleBreachSuccessDelayTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("RoleBreachSuccessDelayTime");
  }
  GetWeaponLevelUpSuccessDelayTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("WeaponLevelUpSuccessDelayTime");
  }
  GetWeaponBreachDaDelayTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("WeaponBreachChangeDelay");
  }
  GetRoleElementSwitchDelayTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("RoleElementSwitchDelayTime");
  }
  GetRoleElementTransferFunctionId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("RoleElementTransferFunctionId");
  }
  GetRoleGenderSwitchDelayTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("RoleGenderSwitchDelayTime");
  }
  GetRoleLevelConsume(e, o) {
    return RoleLevelConsumeByConsumeGroupIdAndLevel_1.configRoleLevelConsumeByConsumeGroupIdAndLevel.GetConfig(e, o);
  }
  GetRoleQualityInfo(e) {
    return RoleQualityInfoById_1.configRoleQualityInfoById.GetConfig(e);
  }
  GetTrialRoleConfig(e) {
    return TrialRoleInfoById_1.configTrialRoleInfoById.GetConfig(e);
  }
  GetTrialRoleConfigByGroupId(e) {
    return this.GetGenderRoleTrialByGroupId(e);
  }
  GetTrialRoleIdConfigByGroupId(e) {
    var o = this.GetGenderRoleTrialByGroupId(e);
    if (o) {
      return o.Id;
    } else {
      return e;
    }
  }
  GetRoleTrainingDegreeConfig(e) {
    return RoleTrainingDegreeByDifficultyLevel_1.configRoleTrainingDegreeByDifficultyLevel.GetConfig(e);
  }
  GetMainRoleByGender(e) {
    return MainRoleConfigByGender_1.configMainRoleConfigByGender.GetConfigList(e);
  }
  GetMainRoleById(e) {
    return MainRoleConfigById_1.configMainRoleConfigById.GetConfig(e);
  }
  GetAllMainRoleConfig() {
    return MainRoleConfigAll_1.configMainRoleConfigAll.GetConfigList();
  }
  GetRoleTagConfig(e) {
    return RoleTagById_1.configRoleTagById.GetConfig(e);
  }
  GetAllRoleTagList() {
    const o = [];
    var e = this.GetAllRoleTagConfig();
    const r = [];
    e.forEach(e => {
      r.push(e);
    });
    r.sort((e, o) => e.SortId - o.SortId);
    r.forEach(e => {
      o.push(e.Id);
    });
    return o;
  }
  GetAllRoleTagConfig() {
    return RoleTagAll_1.configRoleTagAll.GetConfigList();
  }
  OnClear() {
    this.Gdo.clear();
    return true;
  }
  ar1() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else {
      return -1;
    }
  }
}
exports.RoleConfig = RoleConfig;
//# sourceMappingURL=RoleUiConfig.js.map