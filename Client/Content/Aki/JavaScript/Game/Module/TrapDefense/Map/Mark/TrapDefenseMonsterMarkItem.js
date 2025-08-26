"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterMarkItem = undefined;
const TrapDefenseMarkItem_1 = require("./TrapDefenseMarkItem");
class TrapDefenseMonsterMarkItem extends TrapDefenseMarkItem_1.TrapDefenseMarkItem {
  constructor(e, t) {
    super(e, t);
    this.H9c = 1;
    this.H9c = t ?? 1;
  }
  get MarkType() {
    return 3;
  }
  get WorldPosition() {
    return this.WorldPositionVector;
  }
  get EnemyType() {
    return this.H9c;
  }
  set EnemyType(e) {
    this.H9c = e;
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