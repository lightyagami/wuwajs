"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropRewardConf = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const ConfigPropValue_1 = require("./SubType/ConfigPropValue");
const DicStringInt_1 = require("./SubType/DicStringInt");
class PropRewardConf {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Props() {
    return GameUtils_1.GameUtils.ConvertToArray(this.propsLength(), this.props, this);
  }
  get Tips() {
    return GameUtils_1.GameUtils.ConvertToMap(this.tipsLength(), this.tipsKey, this.tipsValue, this);
  }
  tipsKey(t) {
    return this.tips(t)?.key();
  }
  tipsValue(t) {
    return this.tips(t)?.value();
  }
  get IsFormation() {
    return this.isformation();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPropRewardConf(t, i) {
    return (i || new PropRewardConf()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPropsAt(t, i) {
    return this.props(t);
  }
  props(t, i) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return (i || new ConfigPropValue_1.ConfigPropValue()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  propsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTipsAt(t, i) {
    return this.tips(t);
  }
  tips(t, i) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return (i || new DicStringInt_1.DicStringInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  tipsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  isformation() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.PropRewardConf = PropRewardConf;
//# sourceMappingURL=PropRewardConf.js.map