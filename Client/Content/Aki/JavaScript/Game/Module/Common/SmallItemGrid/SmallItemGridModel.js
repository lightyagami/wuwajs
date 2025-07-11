"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGridModel = undefined;
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class SmallItemGridModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ItemGridCoolDownSecond = 0;
    this.ItemGridNameMaxLength = 0;
    this.DefaultQualitySpritePath = "";
  }
  OnInit() {
    this.ItemGridNameMaxLength = CommonParamById_1.configCommonParamById.GetIntConfig("ItemGridNameMaxLength");
    this.DefaultQualitySpritePath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_QualityVisionB");
    this.ItemGridCoolDownSecond = CommonParamById_1.configCommonParamById.GetIntConfig("ItemGridCoolDownSecond");
    return true;
  }
}
exports.SmallItemGridModel = SmallItemGridModel;
//# sourceMappingURL=SmallItemGridModel.js.map