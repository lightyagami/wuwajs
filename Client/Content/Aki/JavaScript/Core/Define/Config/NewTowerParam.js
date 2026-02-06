"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewTowerParam = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class NewTowerParam {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get CycleId() {
    return this.cycleid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get TimerId() {
    return this.timerid();
  }
  get ShowTimerId() {
    return this.showtimerid();
  }
  get RoleCount() {
    return this.rolecount();
  }
  get DefaultCostEnergy() {
    return this.defaultcostenergy();
  }
  get CostEnergy() {
    return GameUtils_1.GameUtils.ConvertToMap(this.costenergyLength(), this.costenergyKey, this.costenergyValue, this);
  }
  costenergyKey(t) {
    return this.costenergy(t)?.key();
  }
  costenergyValue(t) {
    return this.costenergy(t)?.value();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsNewTowerParam(t, e) {
    return (e || new NewTowerParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  cycleid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  timerid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showtimerid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolecount() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 3;
    }
  }
  defaultcostenergy() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10;
    }
  }
  GetCostenergyAt(t, e) {
    return this.costenergy(t);
  }
  costenergy(t, e) {
    var r = this.J7.__offset(this.z7, 16);
    if (r) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  costenergyLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.NewTowerParam = NewTowerParam;
//# sourceMappingURL=NewTowerParam.js.map