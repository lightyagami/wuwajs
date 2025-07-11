"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiWander = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AiWander {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TurnSpeed() {
    return this.turnspeed();
  }
  get WanderMoveState() {
    return this.wandermovestate();
  }
  get ResetMoveState() {
    return this.resetmovestate();
  }
  get MoveStateGA() {
    return this.movestatega();
  }
  get CompleteDistance() {
    return this.completedistance();
  }
  get ShowEffectDaPath() {
    return this.showeffectdapath();
  }
  get HideEffectDaPath() {
    return this.hideeffectdapath();
  }
  get ShowMaterialDaPath() {
    return this.showmaterialdapath();
  }
  get HideMaterialDaPath() {
    return this.hidematerialdapath();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsAiWander(t, e) {
    return (e || new AiWander()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  turnspeed() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 180;
    }
  }
  wandermovestate() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2;
    }
  }
  resetmovestate() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2;
    }
  }
  movestatega() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  completedistance() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 10;
    }
  }
  showeffectdapath(t) {
    var e = this.J7.__offset(this.z7, 16);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  hideeffectdapath(t) {
    var e = this.J7.__offset(this.z7, 18);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  showmaterialdapath(t) {
    var e = this.J7.__offset(this.z7, 20);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  hidematerialdapath(t) {
    var e = this.J7.__offset(this.z7, 22);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.AiWander = AiWander;
//# sourceMappingURL=AiWander.js.map