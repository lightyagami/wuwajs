"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteListDataBase = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteDefine_1 = require("./RouletteDefine");
class RouletteListDataBase {
  constructor() {
    this.RouletteIdListServer = new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
    this.ExtraItemIdServer = 0;
    this.EquipExploreSkillIdServer = 0;
  }
  UpdateData(e) {
    this.RouletteIdListServer = e.KHn;
    this.ExtraItemIdServer = e.QHn;
    this.EquipExploreSkillIdServer = e.$Ps;
  }
  IsFirstExplorePriority() {
    return ModelManager_1.ModelManager.RouletteModel.GetCurrentExploreRouletteListData().RouletteType === this.RouletteType;
  }
  IsExploreSkillIdAllowEquip(e) {
    e = ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.get(e);
    return !!e && e.RouletteType.includes(this.RouletteType);
  }
  GetRouletteListSaveData() {
    return {
      RouletteType: this.RouletteType,
      RouletteIdList: Array.from(this.RouletteIdListServer),
      ExtraItemId: this.ExtraItemIdServer,
      EquipExploreSkillId: this.EquipExploreSkillIdServer
    };
  }
}
exports.RouletteListDataBase = RouletteListDataBase;
//# sourceMappingURL=RouletteListDataBase.js.map