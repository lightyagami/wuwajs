"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageModel = undefined;
const Info_1 = require("../../../Core/Common/Info");
const DamageByAll_1 = require("../../../Core/Define/ConfigQuery/DamageByAll");
const DamageById_1 = require("../../../Core/Define/ConfigQuery/DamageById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
class DamageModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.z9l = undefined;
  }
  OnInit() {
    var e;
    if ((Info_1.Info.IsPs5Platform() || CloudGameManager_1.CloudGameManager.IsCloudGame) && (this.z9l = new Map(), e = DamageByAll_1.configDamageByAll.GetConfigList())) {
      e.forEach(e => {
        this.z9l.set(e.Id, e);
      });
    }
    return true;
  }
  GetDamageConfigById(e) {
    if (Info_1.Info.IsPs5Platform() || CloudGameManager_1.CloudGameManager.IsCloudGame) {
      if (e > 0) {
        return this.z9l.get(e);
      } else {
        return undefined;
      }
    } else if (e > 0) {
      return DamageById_1.configDamageById.GetConfig(e);
    } else {
      return undefined;
    }
  }
  OnClear() {
    this.z9l?.clear();
    return true;
  }
}
exports.DamageModel = DamageModel;
//# sourceMappingURL=DamageModel.js.map