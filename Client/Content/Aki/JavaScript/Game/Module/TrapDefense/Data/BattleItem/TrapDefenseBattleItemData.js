"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBattleItemData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
class TrapDefenseBattleItemData {
  constructor() {
    this.Config = undefined;
    this.InventoryCount = 0;
    this.LimitCount = 1;
  }
  static Create(e) {
    var t = new TrapDefenseBattleItemData();
    t.Config = e;
    return t;
  }
  get Name() {
    return this.Config.Name;
  }
  get Desc() {
    return this.Config.Desc;
  }
  get Icon() {
    return this.Config.Icon;
  }
  get Type() {
    return this.Config.ItemType;
  }
  get ExploreToolId() {
    return this.Config.ExploreToolId;
  }
  get IsUseSkill() {
    return this.Config.SkillIndex >= 0;
  }
  get SkillIndex() {
    return this.Config.SkillIndex;
  }
  UpdateByServerData(e, t) {
    this.InventoryCount = e;
    this.LimitCount = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseInventoryDataUpdate);
  }
}
exports.TrapDefenseBattleItemData = TrapDefenseBattleItemData;
//# sourceMappingURL=TrapDefenseBattleItemData.js.map