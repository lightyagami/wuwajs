"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialItemModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SpecialItemDefine_1 = require("./SpecialItemDefine");
class SpecialItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.igi = new Map();
    this.ogi = [];
    this.TagWatchedItemId = 0;
    this.TagWatchedEntityHandle = undefined;
    this.WatchedAllowTagIds = new Set();
    this.WatchedBanTagIds = new Set();
  }
  OnInit() {
    for (const t of this.ogi) {
      var e = new SpecialItemDefine_1.specialItemLogic[t](t);
      e.Init();
      this.igi.set(t, e);
    }
    return true;
  }
  GetSpecialItemLogic(t) {
    if (ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(t)) {
      let e = undefined;
      return e = (e = this.igi.get(t)) || new SpecialItemDefine_1.specialItemLogic[t](t);
    }
  }
  GetEquipSpecialItemId() {
    if (ModelManager_1.ModelManager.RouletteModel.EquipItemType === 13) {
      return ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId;
    }
  }
  OnClear() {
    this.igi.forEach(e => {
      e.Destroy();
    });
    this.igi.clear();
    return true;
  }
}
exports.SpecialItemModel = SpecialItemModel;
//# sourceMappingURL=SpecialItemModel.js.map