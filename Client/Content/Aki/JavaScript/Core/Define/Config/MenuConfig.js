"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntString_1 = require("./SubType/DicIntString");
class MenuConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get FunctionId() {
    return this.functionid();
  }
  get SliderDefault() {
    return this.sliderdefault();
  }
  get OptionsDefault() {
    return this.optionsdefault();
  }
  get MainType() {
    return this.maintype();
  }
  get SubName() {
    return this.subname();
  }
  get SubType() {
    return this.subtype();
  }
  get SubSort() {
    return this.subsort();
  }
  get SubImage() {
    return this.subimage();
  }
  get Name() {
    return this.name();
  }
  get Platform() {
    return this.platform();
  }
  get Device() {
    return this.device();
  }
  get FunctionSort() {
    return this.functionsort();
  }
  get FunctionImage() {
    return this.functionimage();
  }
  get SetType() {
    return this.settype();
  }
  get SliderRange() {
    return GameUtils_1.GameUtils.ConvertToArray(this.sliderrangeLength(), this.sliderrange, this);
  }
  get SliderRangeDisplay() {
    return GameUtils_1.GameUtils.ConvertToArray(this.sliderrangedisplayLength(), this.sliderrangedisplay, this);
  }
  get Digits() {
    return this.digits();
  }
  get OptionsName() {
    return GameUtils_1.GameUtils.ConvertToArray(this.optionsnameLength(), this.optionsname, this);
  }
  get OptionsValue() {
    return GameUtils_1.GameUtils.ConvertToArray(this.optionsvalueLength(), this.optionsvalue, this);
  }
  get KeyMap() {
    return this.keymap();
  }
  get ButtonText() {
    return this.buttontext();
  }
  get BtnDisableTips() {
    return this.btndisabletips();
  }
  get BtnDisableTipsEnable() {
    return this.btndisabletipsenable();
  }
  get OpenView() {
    return this.openview();
  }
  get RelationFunction() {
    return GameUtils_1.GameUtils.ConvertToArray(this.relationfunctionLength(), this.relationfunction, this);
  }
  get DisableValue() {
    return GameUtils_1.GameUtils.ConvertToArray(this.disablevalueLength(), this.disablevalue, this);
  }
  get DisableFunction() {
    return GameUtils_1.GameUtils.ConvertToArray(this.disablefunctionLength(), this.disablefunction, this);
  }
  get AffectedValue() {
    return GameUtils_1.GameUtils.ConvertToArray(this.affectedvalueLength(), this.affectedvalue, this);
  }
  get AffectedFunction() {
    return GameUtils_1.GameUtils.ConvertToMap(this.affectedfunctionLength(), this.affectedfunctionKey, this.affectedfunctionValue, this);
  }
  affectedfunctionKey(t) {
    return this.affectedfunction(t)?.key();
  }
  affectedfunctionValue(t) {
    return this.affectedfunction(t)?.value();
  }
  get ValueTipsMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.valuetipsmapLength(), this.valuetipsmapKey, this.valuetipsmapValue, this);
  }
  valuetipsmapKey(t) {
    return this.valuetipsmap(t)?.key();
  }
  valuetipsmapValue(t) {
    return this.valuetipsmap(t)?.value();
  }
  get ClickedTipsMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.clickedtipsmapLength(), this.clickedtipsmapKey, this.clickedtipsmapValue, this);
  }
  clickedtipsmapKey(t) {
    return this.clickedtipsmap(t)?.key();
  }
  clickedtipsmapValue(t) {
    return this.clickedtipsmap(t)?.value();
  }
  get ClickedTips() {
    return this.clickedtips();
  }
  get BlockOnIosCheckServer() {
    return this.blockonioscheckserver();
  }
  get DetailText() {
    return this.detailtext();
  }
  get ConditionGroup() {
    return this.conditiongroup();
  }
  get Ps5Hide() {
    return this.ps5hide();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMenuConfig(t, i) {
    return (i || new MenuConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  functionid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sliderdefault() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  optionsdefault() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maintype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  subname(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  subtype() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  subsort() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  subimage(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  platform() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  device(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  functionsort() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  functionimage(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  settype() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSliderrangeAt(t) {
    return this.sliderrange(t);
  }
  sliderrange(t) {
    var i = this.J7.__offset(this.z7, 34);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  sliderrangeLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  sliderrangeArray() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSliderrangedisplayAt(t) {
    return this.sliderrangedisplay(t);
  }
  sliderrangedisplay(t) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  sliderrangedisplayLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  sliderrangedisplayArray() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  digits() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOptionsnameAt(t) {
    return this.optionsname(t);
  }
  optionsname(t, i) {
    var s = this.J7.__offset(this.z7, 40);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  optionsnameLength() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOptionsvalueAt(t) {
    return this.optionsvalue(t);
  }
  optionsvalue(t) {
    var i = this.J7.__offset(this.z7, 42);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  optionsvalueLength() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  optionsvalueArray() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  keymap(t) {
    var i = this.J7.__offset(this.z7, 44);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  buttontext(t) {
    var i = this.J7.__offset(this.z7, 46);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  btndisabletips(t) {
    var i = this.J7.__offset(this.z7, 48);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  btndisabletipsenable() {
    var t = this.J7.__offset(this.z7, 50);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  openview(t) {
    var i = this.J7.__offset(this.z7, 52);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetRelationfunctionAt(t) {
    return this.relationfunction(t);
  }
  relationfunction(t) {
    var i = this.J7.__offset(this.z7, 54);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  relationfunctionLength() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  relationfunctionArray() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDisablevalueAt(t) {
    return this.disablevalue(t);
  }
  disablevalue(t) {
    var i = this.J7.__offset(this.z7, 56);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  disablevalueLength() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  disablevalueArray() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDisablefunctionAt(t) {
    return this.disablefunction(t);
  }
  disablefunction(t) {
    var i = this.J7.__offset(this.z7, 58);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  disablefunctionLength() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  disablefunctionArray() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetAffectedvalueAt(t) {
    return this.affectedvalue(t);
  }
  affectedvalue(t) {
    var i = this.J7.__offset(this.z7, 60);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  affectedvalueLength() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  affectedvalueArray() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetAffectedfunctionAt(t, i) {
    return this.affectedfunction(t);
  }
  affectedfunction(t, i) {
    var s = this.J7.__offset(this.z7, 62);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  affectedfunctionLength() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetValuetipsmapAt(t, i) {
    return this.valuetipsmap(t);
  }
  valuetipsmap(t, i) {
    var s = this.J7.__offset(this.z7, 64);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  valuetipsmapLength() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetClickedtipsmapAt(t, i) {
    return this.clickedtipsmap(t);
  }
  clickedtipsmap(t, i) {
    var s = this.J7.__offset(this.z7, 66);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  clickedtipsmapLength() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  clickedtips(t) {
    var i = this.J7.__offset(this.z7, 68);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  blockonioscheckserver() {
    var t = this.J7.__offset(this.z7, 70);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  detailtext(t) {
    var i = this.J7.__offset(this.z7, 72);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  conditiongroup() {
    var t = this.J7.__offset(this.z7, 74);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ps5hide() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MenuConfig = MenuConfig;
//# sourceMappingURL=MenuConfig.js.map