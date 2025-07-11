"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiBase = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringString_1 = require("./SubType/DicStringString");
class AiBase {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get StateMachine() {
    return this.statemachine();
  }
  get AiController() {
    return this.aicontroller();
  }
  get BehaviorTree() {
    return this.behaviortree();
  }
  get SubBehaviorConfigs() {
    return GameUtils_1.GameUtils.ConvertToMap(this.subbehaviorconfigsLength(), this.subbehaviorconfigsKey, this.subbehaviorconfigsValue, this);
  }
  subbehaviorconfigsKey(t) {
    return this.subbehaviorconfigs(t)?.key();
  }
  subbehaviorconfigsValue(t) {
    return this.subbehaviorconfigs(t)?.value();
  }
  get Team() {
    return this.team();
  }
  get MonsterType() {
    return this.monstertype();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAiBase(t, i) {
    return (i || new AiBase()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  statemachine(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  aicontroller(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  behaviortree(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSubbehaviorconfigsAt(t, i) {
    return this.subbehaviorconfigs(t);
  }
  subbehaviorconfigs(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  subbehaviorconfigsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  team() {
    var t = this.J7.__offset(this.z7, 14);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  monstertype() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 4;
    }
  }
}
exports.AiBase = AiBase;
//# sourceMappingURL=AiBase.js.map