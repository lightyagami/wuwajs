"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisQte = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const IntArray_1 = require("./SubType/IntArray");
class ArtemisQte {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Comment() {
    return this.comment();
  }
  get RandomArea() {
    return GameUtils_1.GameUtils.ConvertToArray(this.randomareaLength(), this.randomarea, this);
  }
  get InvalidArea() {
    return GameUtils_1.GameUtils.ConvertToArray(this.invalidareaLength(), this.invalidarea, this);
  }
  get MaxScore() {
    return this.maxscore();
  }
  get HitAreaScore() {
    return this.hitareascore();
  }
  get PerfectSize() {
    return this.perfectsize();
  }
  get PerfectAppearRate() {
    return GameUtils_1.GameUtils.ConvertToMap(this.perfectappearrateLength(), this.perfectappearrateKey, this.perfectappearrateValue, this);
  }
  perfectappearrateKey(t) {
    return this.perfectappearrate(t)?.key();
  }
  perfectappearrateValue(t) {
    return this.perfectappearrate(t)?.value();
  }
  get PerfectScore() {
    return this.perfectscore();
  }
  get CursorSpeed() {
    return GameUtils_1.GameUtils.ConvertToMap(this.cursorspeedLength(), this.cursorspeedKey, this.cursorspeedValue, this);
  }
  cursorspeedKey(t) {
    return this.cursorspeed(t)?.key();
  }
  cursorspeedValue(t) {
    return this.cursorspeed(t)?.value();
  }
  get HitColdTime() {
    return this.hitcoldtime();
  }
  get ScoreUp() {
    return this.scoreup();
  }
  get MultiBoxGroup() {
    return this.multiboxgroup();
  }
  get HiddenInterval() {
    return GameUtils_1.GameUtils.ConvertToArray(this.hiddenintervalLength(), this.hiddeninterval, this);
  }
  get RouletteRotateSpeed() {
    return GameUtils_1.GameUtils.ConvertToMap(this.rouletterotatespeedLength(), this.rouletterotatespeedKey, this.rouletterotatespeedValue, this);
  }
  rouletterotatespeedKey(t) {
    return this.rouletterotatespeed(t)?.key();
  }
  rouletterotatespeedValue(t) {
    return this.rouletterotatespeed(t)?.value();
  }
  get MistakeScore() {
    return this.mistakescore();
  }
  get IsAnticlockwise() {
    return this.isanticlockwise();
  }
  get RefreshType() {
    return this.refreshtype();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsArtemisQte(t, e) {
    return (e || new ArtemisQte()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  comment(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  GetRandomareaAt(t) {
    return this.randomarea(t);
  }
  randomarea(t) {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  randomareaLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  randomareaArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetInvalidareaAt(t, e) {
    return this.invalidarea(t);
  }
  invalidarea(t, e) {
    var r = this.J7.__offset(this.z7, 10);
    if (r) {
      return (e || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  invalidareaLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxscore() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  hitareascore() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10;
    }
  }
  perfectsize() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPerfectappearrateAt(t, e) {
    return this.perfectappearrate(t);
  }
  perfectappearrate(t, e) {
    var r = this.J7.__offset(this.z7, 18);
    if (r) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  perfectappearrateLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  perfectscore() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCursorspeedAt(t, e) {
    return this.cursorspeed(t);
  }
  cursorspeed(t, e) {
    var r = this.J7.__offset(this.z7, 22);
    if (r) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  cursorspeedLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  hitcoldtime() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  scoreup() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  multiboxgroup() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetHiddenintervalAt(t) {
    return this.hiddeninterval(t);
  }
  hiddeninterval(t) {
    var e = this.J7.__offset(this.z7, 30);
    if (e) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  hiddenintervalLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  hiddenintervalArray() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRouletterotatespeedAt(t, e) {
    return this.rouletterotatespeed(t);
  }
  rouletterotatespeed(t, e) {
    var r = this.J7.__offset(this.z7, 32);
    if (r) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rouletterotatespeedLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mistakescore() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isanticlockwise() {
    var t = this.J7.__offset(this.z7, 36);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  refreshtype() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ArtemisQte = ArtemisQte;
//# sourceMappingURL=ArtemisQte.js.map