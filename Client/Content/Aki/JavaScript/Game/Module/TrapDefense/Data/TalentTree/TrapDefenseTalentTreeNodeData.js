"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseTalentTreeNodeData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class TrapDefenseTalentTreeNodeData {
  constructor() {
    this.Id = 0;
    this.Config = undefined;
    this.IsUnlock = false;
  }
  get Row() {
    return this.Config.Row;
  }
  get Col() {
    return this.Config.Col;
  }
  get Type() {
    return this.Config.Type;
  }
  get Index() {
    return (this.Type - 1) * 2 + this.Col - 1;
  }
  get Icon() {
    return this.Config.IconPath;
  }
  get IconBig() {
    return this.Config.IconPathBig;
  }
  get Desc() {
    return this.Config.Desc;
  }
  get Name() {
    return this.Config.Name;
  }
  static Create(e) {
    var t = new TrapDefenseTalentTreeNodeData();
    t.Config = e;
    t.Id = e.Id;
    return t;
  }
  SetUnlock() {
    this.IsUnlock = true;
  }
  GetCostData() {
    if (this.IsUnlock) {
      return [];
    } else {
      return [{
        ItemId: ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTalentTreeCurrencyItemId(),
        Count: ModelManager_1.ModelManager.TrapDefenseModel.TalentTreeData.RemainPoints,
        Cost: this.Config.UnlockCost
      }];
    }
  }
}
exports.TrapDefenseTalentTreeNodeData = TrapDefenseTalentTreeNodeData;
//# sourceMappingURL=TrapDefenseTalentTreeNodeData.js.map