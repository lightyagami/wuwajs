"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementalReaction = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ElementalReaction {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ReactionId() {
    return this.reactionid();
  }
  get ReactionName() {
    return this.reactionname();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get ReactionTexturePath() {
    return this.reactiontexturepath();
  }
  get ReactionColor() {
    return this.reactioncolor();
  }
  get IsVisible() {
    return this.isvisible();
  }
  get ReactionDescription() {
    return this.reactiondescription();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsElementalReaction(t, i) {
    return (i || new ElementalReaction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reactionid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reactionname(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reactiontexturepath(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  reactioncolor(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  isvisible() {
    var t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  reactiondescription(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.ElementalReaction = ElementalReaction;
//# sourceMappingURL=ElementalReaction.js.map