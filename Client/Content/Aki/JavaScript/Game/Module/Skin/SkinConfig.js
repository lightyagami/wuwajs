"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinConfig = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const FlySkinConfigById_1 = require("../../../Core/Define/ConfigQuery/FlySkinConfigById");
const FlySkinConfigByType_1 = require("../../../Core/Define/ConfigQuery/FlySkinConfigByType");
const RoleSkinById_1 = require("../../../Core/Define/ConfigQuery/RoleSkinById");
const RoleSkinByRoleId_1 = require("../../../Core/Define/ConfigQuery/RoleSkinByRoleId");
const WeaponSkinById_1 = require("../../../Core/Define/ConfigQuery/WeaponSkinById");
const WeaponSkinByType_1 = require("../../../Core/Define/ConfigQuery/WeaponSkinByType");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SkinConfig extends ConfigBase_1.ConfigBase {
  GetWeaponSkinConfig(n) {
    return WeaponSkinById_1.configWeaponSkinById.GetConfig(n);
  }
  GetWeaponSkinConfigListByType(n) {
    return WeaponSkinByType_1.configWeaponSkinByType.GetConfigList(n);
  }
  GetDefaultWeaponSkinIconPath() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalWeaponSkinIcon");
  }
  GetDefaultWeaponSkinName() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalWeaponSkinName");
  }
  GetDefaultWeaponSkinDescription() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalWeaponSkinDescription");
  }
  GetDefaultFlySkinIconPath(n) {
    if (n === 1) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalParaglidingSkinIcon");
    } else if (n === 0) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalSoarWingIcon");
    } else {
      return "";
    }
  }
  GetDefaultFlySkinName(n) {
    if (n === 1) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalParaglidingSkinName");
    } else if (n === 0) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalSoarWingSkinName");
    } else {
      return "";
    }
  }
  GetDefaultFlySkinDescription(n) {
    if (n === 1) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalParaglidingSkinDescription");
    } else if (n === 0) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalSoarWingSkinDescription");
    } else {
      return "";
    }
  }
  GetDefaultFlySkinTypeDescription(n) {
    if (n === 1) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalParaglidingSkinTypeDesc");
    } else if (n === 0) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalSoarWingSkinTypeDesc");
    } else {
      return "";
    }
  }
  GetDefaultFlySkinStandAnimPath(n) {
    if (n === 1) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalParaglidingSkinStandAnim");
    } else if (n === 0) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("OriginalSoarWingSkinStandAnim");
    } else {
      return "";
    }
  }
  GetDefaultFlySkinModelId(n) {
    if (n === 1) {
      return CommonParamById_1.configCommonParamById.GetIntConfig("OriginalParaglidingSkinModelId");
    } else if (n === 0) {
      return CommonParamById_1.configCommonParamById.GetIntConfig("OriginalSoarWingSkinModelId");
    } else {
      return 0;
    }
  }
  GetFlySkinModelOffsetTransform(n) {
    if (n === 1) {
      return CommonParamById_1.configCommonParamById.GetFloatArrayConfig("ParaglidingSkinOffsetTransform");
    } else if (n === 0) {
      return CommonParamById_1.configCommonParamById.GetFloatArrayConfig("SoarWingSkinOffsetTransform");
    } else {
      return undefined;
    }
  }
  GetFlySkinModelCameraId(n) {
    if (n === 1) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("ParaglidingSkinCameraId");
    } else if (n === 0) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("SoarWingSkinCameraId");
    } else {
      return "";
    }
  }
  GetFlySkinTabName(n) {
    if (n === 1) {
      return "Text_ParaglidingSkinTab_Text";
    } else if (n === 0) {
      return "Text_SoarWingSkinTab_Text";
    } else {
      return "";
    }
  }
  GetFlySkinBottomIconResourceId(n) {
    if (n === 1) {
      return "T_IconParagliding";
    } else if (n === 0) {
      return "T_IconSoarWing";
    } else {
      return "";
    }
  }
  GetFlySkinEquipBtnTextId(n, i) {
    if (n === 1) {
      if (i) {
        return "GliderSkin_EquipmentStatus_Equip";
      } else {
        return "GliderSkin_EquipmentStatus_IsEquipped";
      }
    } else if (n === 0) {
      if (i) {
        return "SoarWingSkin_EquipmentStatus_Equip";
      } else {
        return "SoarWingSkin_EquipmentStatus_IsEquipped";
      }
    } else {
      return "";
    }
  }
  GetFlySkinSpawnEffectId(n) {
    if (n === 1) {
      return "GliderEffect";
    } else if (n === 0) {
      return "SoarWingEffect";
    } else {
      return "";
    }
  }
  GetFlySkinSpawnMaterialController(n) {
    if (n === 1) {
      return "GliderMaterialController";
    } else if (n === 0) {
      return "SoarWingMaterialController";
    } else {
      return "";
    }
  }
  GetRoleSkinConfig(n) {
    return RoleSkinById_1.configRoleSkinById.GetConfig(n);
  }
  GetRoleSkinConfigList(n) {
    return RoleSkinByRoleId_1.configRoleSkinByRoleId.GetConfigList(n);
  }
  GetSkinDetailButtonGap() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("SkinDetailButtonGap");
  }
  GetSkinDetailButtonSwitchGap() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("SkinDetailButtonSwitchGap");
  }
  GetFlySkinConfig(n) {
    return FlySkinConfigById_1.configFlySkinConfigById.GetConfig(n);
  }
  GetFlySkinConfigListByType(n) {
    return FlySkinConfigByType_1.configFlySkinConfigByType.GetConfigList(n);
  }
}
exports.SkinConfig = SkinConfig;
//# sourceMappingURL=SkinConfig.js.map