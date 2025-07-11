"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridModel = undefined;
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class MediumItemGridModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ItemGridCoolDownSecond = 0;
    this.AttackBuffSpritePath = "";
    this.DefenseBuffSpritePath = "";
    this.RestoreHealthBuffSpritePath = "";
    this.RechargeBuffSpritePath = "";
    this.ResurrectionBuffSpritePath = "";
    this.ExploreBuffSpritePath = "";
  }
  OnInit() {
    this.ItemGridCoolDownSecond = CommonParamById_1.configCommonParamById.GetIntConfig("ItemGridCoolDownSecond");
    this.AttackBuffSpritePath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ItemIconAttack");
    this.DefenseBuffSpritePath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ItemIconShield");
    this.RestoreHealthBuffSpritePath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ItemIconHeart");
    this.RechargeBuffSpritePath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ItemIconPhysical");
    this.ResurrectionBuffSpritePath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ItemIconRecover");
    this.ExploreBuffSpritePath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_Iconpropertyabsorbup_UI");
    return true;
  }
  OnClear() {
    return true;
  }
}
exports.MediumItemGridModel = MediumItemGridModel;
//# sourceMappingURL=MediumItemGridModel.js.map