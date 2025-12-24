"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShortMessage = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ShortMessage {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get WhichChat() {
    return this.whichchat();
  }
  get FlowParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.flowparamLength(), this.flowparam, this);
  }
  get TipType() {
    return this.tiptype();
  }
  get ListenQuestId() {
    return this.listenquestid();
  }
  get FinallPopType() {
    return this.finallpoptype();
  }
  get DropId() {
    return this.dropid();
  }
  get QuestId() {
    return this.questid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsShortMessage(t, s) {
    return (s || new ShortMessage()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  whichchat() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFlowparamAt(t) {
    return this.flowparam(t);
  }
  flowparam(t, s) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  flowparamLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  tiptype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  listenquestid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  finallpoptype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  questid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ShortMessage = ShortMessage;
//# sourceMappingURL=ShortMessage.js.map