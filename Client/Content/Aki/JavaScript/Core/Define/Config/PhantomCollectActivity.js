"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomCollectActivity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class PhantomCollectActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Phantoms() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantomsLength(), this.phantoms, this);
  }
  get PhantomReward() {
    return this.phantomreward();
  }
  get PhantomDesc() {
    return GameUtils_1.GameUtils.ConvertToMap(this.phantomdescLength(), this.phantomdescKey, this.phantomdescValue, this);
  }
  phantomdescKey(t) {
    return this.phantomdesc(t)?.key();
  }
  phantomdescValue(t) {
    return this.phantomdesc(t)?.value();
  }
  get PhantomActivityImage() {
    return GameUtils_1.GameUtils.ConvertToMap(this.phantomactivityimageLength(), this.phantomactivityimageKey, this.phantomactivityimageValue, this);
  }
  phantomactivityimageKey(t) {
    return this.phantomactivityimage(t)?.key();
  }
  phantomactivityimageValue(t) {
    return this.phantomactivityimage(t)?.value();
  }
  get DataDockLevel() {
    return this.datadocklevel();
  }
  get DataDockReward() {
    return this.datadockreward();
  }
  get PhantomSideQuest() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantomsidequestLength(), this.phantomsidequest, this);
  }
  get PhantomSideQuestReward() {
    return this.phantomsidequestreward();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomCollectActivity(t, i) {
    return (i || new PhantomCollectActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantomsAt(t) {
    return this.phantoms(t);
  }
  phantoms(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  phantomsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantomsArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  phantomreward() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantomdescAt(t, i) {
    return this.phantomdesc(t);
  }
  phantomdesc(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  phantomdescLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantomactivityimageAt(t, i) {
    return this.phantomactivityimage(t);
  }
  phantomactivityimage(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  phantomactivityimageLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  datadocklevel() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  datadockreward() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantomsidequestAt(t) {
    return this.phantomsidequest(t);
  }
  phantomsidequest(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  phantomsidequestLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantomsidequestArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  phantomsidequestreward() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomCollectActivity = PhantomCollectActivity;
//# sourceMappingURL=PhantomCollectActivity.js.map