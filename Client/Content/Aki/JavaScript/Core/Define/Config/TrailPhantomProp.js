"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrailPhantomProp = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const ConfigPropValue_1 = require("./SubType/ConfigPropValue");
const IntArray_1 = require("./SubType/IntArray");
class TrailPhantomProp {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Level() {
    return this.level();
  }
  get MainProp() {
    return this.mainprop();
  }
  get BreachProp() {
    return this.breachprop();
  }
  get SubProp() {
    return GameUtils_1.GameUtils.ConvertToArray(this.subpropLength(), this.subprop, this);
  }
  get MainProps() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mainpropsLength(), this.mainprops, this);
  }
  get MainPropGrowth() {
    return this.mainpropgrowth();
  }
  get SubProps() {
    return GameUtils_1.GameUtils.ConvertToArray(this.subpropsLength(), this.subprops, this);
  }
  get SubPropList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.subproplistLength(), this.subproplist, this);
  }
  get FetterGroupId() {
    return this.fettergroupid();
  }
  get SkinItemId() {
    return this.skinitemid();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsTrailPhantomProp(t, r) {
    return (r || new TrailPhantomProp()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mainprop(t) {
    var r = this.J7.__offset(this.z7, 8);
    if (r) {
      return (t || new ConfigPropValue_1.ConfigPropValue()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
  breachprop(t) {
    var r = this.J7.__offset(this.z7, 10);
    if (r) {
      return (t || new ConfigPropValue_1.ConfigPropValue()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
  GetSubpropAt(t, r) {
    return this.subprop(t);
  }
  subprop(t, r) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return (r || new ConfigPropValue_1.ConfigPropValue()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  subpropLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMainpropsAt(t) {
    return this.mainprops(t);
  }
  mainprops(t) {
    var r = this.J7.__offset(this.z7, 14);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  mainpropsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mainpropsArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  mainpropgrowth() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetSubpropsAt(t, r) {
    return this.subprops(t);
  }
  subprops(t, r) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return (r || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  subpropsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSubproplistAt(t) {
    return this.subproplist(t);
  }
  subproplist(t) {
    var r = this.J7.__offset(this.z7, 20);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  subproplistLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  subproplistArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  fettergroupid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  skinitemid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrailPhantomProp = TrailPhantomProp;
//# sourceMappingURL=TrailPhantomProp.js.map