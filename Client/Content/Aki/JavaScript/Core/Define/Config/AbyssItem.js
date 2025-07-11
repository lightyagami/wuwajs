"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbyssItem = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const ConfigPropValue_1 = require("./SubType/ConfigPropValue");
const DicIntInt_1 = require("./SubType/DicIntInt");
const StringArray_1 = require("./SubType/StringArray");
class AbyssItem {
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
  get SlotType() {
    return this.slottype();
  }
  get QualityId() {
    return this.qualityid();
  }
  get BelongLittleRole() {
    return this.belonglittlerole();
  }
  get PassiveBuffShowName() {
    return this.passivebuffshowname();
  }
  get PassiveBuffShowDesc() {
    return this.passivebuffshowdesc();
  }
  get LevelDescStrArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.leveldescstrarrayLength(), this.leveldescstrarray, this);
  }
  get AbyssBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.abyssbuffLength(), this.abyssbuff, this);
  }
  get AbyssPhantomBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.abyssphantombuffLength(), this.abyssphantombuff, this);
  }
  get Prop() {
    return GameUtils_1.GameUtils.ConvertToArray(this.propLength(), this.prop, this);
  }
  get AttributesDescription() {
    return this.attributesdescription();
  }
  get AddTag() {
    return GameUtils_1.GameUtils.ConvertToMap(this.addtagLength(), this.addtagKey, this.addtagValue, this);
  }
  addtagKey(t) {
    return this.addtag(t)?.key();
  }
  addtagValue(t) {
    return this.addtag(t)?.value();
  }
  get CertainTag() {
    return GameUtils_1.GameUtils.ConvertToMap(this.certaintagLength(), this.certaintagKey, this.certaintagValue, this);
  }
  certaintagKey(t) {
    return this.certaintag(t)?.key();
  }
  certaintagValue(t) {
    return this.certaintag(t)?.value();
  }
  get AddProp() {
    return GameUtils_1.GameUtils.ConvertToArray(this.addpropLength(), this.addprop, this);
  }
  get Name() {
    return this.name();
  }
  get TypeDescription() {
    return this.typedescription();
  }
  get BgDescription() {
    return this.bgdescription();
  }
  get Icon() {
    return this.icon();
  }
  get IconMiddle() {
    return this.iconmiddle();
  }
  get IconSmall() {
    return this.iconsmall();
  }
  get Mesh() {
    return this.mesh();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAbyssItem(t, s) {
    return (s || new AbyssItem()).__init(t.readInt32(t.position()) + t.position(), t);
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
  slottype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  belonglittlerole() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  passivebuffshowname(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  passivebuffshowdesc(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetLeveldescstrarrayAt(t, s) {
    return this.leveldescstrarray(t);
  }
  leveldescstrarray(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return (s || new StringArray_1.StringArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  leveldescstrarrayLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAbyssbuffAt(t) {
    return this.abyssbuff(t);
  }
  abyssbuff(t) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  abyssbuffLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  abyssbuffArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetAbyssphantombuffAt(t) {
    return this.abyssphantombuff(t);
  }
  abyssphantombuff(t) {
    var s = this.J7.__offset(this.z7, 22);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  abyssphantombuffLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  abyssphantombuffArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetPropAt(t, s) {
    return this.prop(t);
  }
  prop(t, s) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return (s || new ConfigPropValue_1.ConfigPropValue()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  propLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  attributesdescription(t) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetAddtagAt(t, s) {
    return this.addtag(t);
  }
  addtag(t, s) {
    var i = this.J7.__offset(this.z7, 28);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  addtagLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCertaintagAt(t, s) {
    return this.certaintag(t);
  }
  certaintag(t, s) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  certaintagLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAddpropAt(t, s) {
    return this.addprop(t);
  }
  addprop(t, s) {
    var i = this.J7.__offset(this.z7, 32);
    if (i) {
      return (s || new ConfigPropValue_1.ConfigPropValue()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  addpropLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 34);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  typedescription(t) {
    var s = this.J7.__offset(this.z7, 36);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  bgdescription(t) {
    var s = this.J7.__offset(this.z7, 38);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  icon(t) {
    var s = this.J7.__offset(this.z7, 40);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  iconmiddle(t) {
    var s = this.J7.__offset(this.z7, 42);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  iconsmall(t) {
    var s = this.J7.__offset(this.z7, 44);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  mesh(t) {
    var s = this.J7.__offset(this.z7, 46);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.AbyssItem = AbyssItem;
//# sourceMappingURL=AbyssItem.js.map