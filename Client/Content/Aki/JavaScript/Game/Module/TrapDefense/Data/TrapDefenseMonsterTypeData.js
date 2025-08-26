"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterTypeData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class TrapDefenseMonsterTypeData {
  constructor(e) {
    this.Id = 0;
    this.Config = undefined;
    this.q9c = [];
    this.Id = e;
  }
  static Create(e) {
    var t = new TrapDefenseMonsterTypeData(e.Id);
    t.Config = e;
    t.AU();
    return t;
  }
  AU() {}
  GetMonsterDataList(e = true) {
    if (this.q9c.length <= 0) {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster.GetMonsterMap().forEach(e => {
        if (e.ConfigType.RiskType === this.Id) {
          this.q9c.push(e);
        }
      });
      this.q9c.sort((e, t) => e.SortId - t.SortId);
    }
    if (e) {
      return this.q9c.filter(e => e.InTheInstance);
    } else {
      return this.q9c;
    }
  }
}
exports.TrapDefenseMonsterTypeData = TrapDefenseMonsterTypeData;
//# sourceMappingURL=TrapDefenseMonsterTypeData.js.map