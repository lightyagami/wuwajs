"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterMarkItem = undefined;
const TrapDefenseMarkItem_1 = require("./TrapDefenseMarkItem");
class TrapDefenseMonsterMarkItem extends TrapDefenseMarkItem_1.TrapDefenseMarkItem {
  constructor(e, t) {
    super(e, t);
    this.tJu = 1;
    this.tJu = t ?? 1;
  }
  get MarkType() {
    return 3;
  }
  get WorldPosition() {
    return this.WorldPositionVector;
  }
  get EnemyType() {
    return this.tJu;
  }
  set EnemyType(e) {
    this.tJu = e;
  }
  OnInitialize() {
    this.EnableCachePosition = false;
  }
  SetWorldPosition(e, t, r) {
    this.WorldPositionVector.Set(e, t, r);
  }
}
exports.TrapDefenseMonsterMarkItem = TrapDefenseMonsterMarkItem;
//# sourceMappingURL=TrapDefenseMonsterMarkItem.js.map