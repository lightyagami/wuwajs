"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonGuideModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class InstanceDungeonGuideModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.h1i = 0;
    this.l1i = 0;
  }
  GetCurrentInstanceDungeonGuideType() {
    return this.h1i;
  }
  GetCurrentInstanceDungeonGuideValue() {
    return this.l1i;
  }
  RefreshCurrentDungeonGuide() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetGuide(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
    if (e) {
      this.h1i = e[0];
      this.l1i = e[1];
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DungeonGuideChange);
  }
  GetHaveGuide() {
    return this.h1i !== 0;
  }
}
exports.InstanceDungeonGuideModel = InstanceDungeonGuideModel;
//# sourceMappingURL=InstanceDungeonGuideModel.js.map