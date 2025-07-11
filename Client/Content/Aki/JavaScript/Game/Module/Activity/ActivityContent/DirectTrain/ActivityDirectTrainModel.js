"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDirectTrainModel = undefined;
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class ActivityDirectTrainModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this._xl = 0;
    this.AlreadyStartView = false;
  }
  get ActivityId() {
    return this._xl;
  }
  set ActivityId(e) {
    this._xl = e;
  }
  GetRecommendQuestId() {
    return ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(this.ActivityId).RecommendQuestId;
  }
  GetRecommendQuestTipsTextId() {
    return ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(this.ActivityId).RecommendQuestLabel;
  }
  GetSkipQuestId() {
    return ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(this.ActivityId).SkipQuestId;
  }
}
exports.ActivityDirectTrainModel = ActivityDirectTrainModel;
//# sourceMappingURL=ActivityDirectTrainModel.js.map