"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsActivityConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class SurvivorsActivityConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get CurrencyItemId() {
    return this.currencyitemid();
  }
  get ScoreItemId() {
    return this.scoreitemid();
  }
  get TalentTreeItemId() {
    return this.talenttreeitemid();
  }
  get MaxTalentTreeItemCount() {
    return this.maxtalenttreeitemcount();
  }
  get TaskDisplayItemId() {
    return this.taskdisplayitemid();
  }
  get TaskType() {
    return GameUtils_1.GameUtils.ConvertToMap(this.tasktypeLength(), this.tasktypeKey, this.tasktypeValue, this);
  }
  tasktypeKey(t) {
    return this.tasktype(t)?.key();
  }
  tasktypeValue(t) {
    return this.tasktype(t)?.value();
  }
  get HelpId() {
    return this.helpid();
  }
  get AreaBoundLevelId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.areaboundlevelidLength(), this.areaboundlevelid, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSurvivorsActivityConfig(t, i) {
    return (i || new SurvivorsActivityConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
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
  currencyitemid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  scoreitemid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  talenttreeitemid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxtalenttreeitemcount() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 999;
    }
  }
  taskdisplayitemid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTasktypeAt(t, i) {
    return this.tasktype(t);
  }
  tasktype(t, i) {
    var e = this.J7.__offset(this.z7, 18);
    if (e) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  tasktypeLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  helpid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAreaboundlevelidAt(t) {
    return this.areaboundlevelid(t);
  }
  areaboundlevelid(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  areaboundlevelidLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  areaboundlevelidArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.SurvivorsActivityConfig = SurvivorsActivityConfig;
//# sourceMappingURL=SurvivorsActivityConfig.js.map