"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResInstGrid = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResInstGrid {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SubLevelArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.sublevelarrayLength(), this.sublevelarray, this);
  }
  get Title() {
    return this.title();
  }
  get MapScaleMin() {
    return this.mapscalemin();
  }
  get MapScaleMax() {
    return this.mapscalemax();
  }
  get MapInitScale() {
    return this.mapinitscale();
  }
  get MapHeight() {
    return this.mapheight();
  }
  get MapWidth() {
    return this.mapwidth();
  }
  get MapBackground() {
    return this.mapbackground();
  }
  get MapMusicState() {
    return this.mapmusicstate();
  }
  get LoseTitle() {
    return this.losetitle();
  }
  get LoseDesc() {
    return this.losedesc();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRogueResInstGrid(t, s) {
    return (s || new RogueResInstGrid()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSublevelarrayAt(t) {
    return this.sublevelarray(t);
  }
  sublevelarray(t, s) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  sublevelarrayLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  title(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  mapscalemin() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1000;
    }
  }
  mapscalemax() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2000;
    }
  }
  mapinitscale() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1000;
    }
  }
  mapheight() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 6000;
    }
  }
  mapwidth() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 6000;
    }
  }
  mapbackground(t) {
    var s = this.J7.__offset(this.z7, 20);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  mapmusicstate(t) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  losetitle(t) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  losedesc(t) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.RogueResInstGrid = RogueResInstGrid;
//# sourceMappingURL=RogueResInstGrid.js.map