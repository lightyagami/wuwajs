"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillVehicleButton = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class SkillVehicleButton {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PbDataId() {
    return this.pbdataid();
  }
  get Name() {
    return this.name();
  }
  get ButtonType() {
    return this.buttontype();
  }
  get ActionType() {
    return this.actiontype();
  }
  get SkillId() {
    return this.skillid();
  }
  get SkillIdTagMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.skillidtagmapLength(), this.skillidtagmapKey, this.skillidtagmapValue, this);
  }
  skillidtagmapKey(t) {
    return this.skillidtagmap(t)?.key();
  }
  skillidtagmapValue(t) {
    return this.skillidtagmap(t)?.value();
  }
  get SkillIcon() {
    return this.skillicon();
  }
  get SkillIconTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillicontagsLength(), this.skillicontags, this);
  }
  get EnableTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.enabletagsLength(), this.enabletags, this);
  }
  get DisableTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.disabletagsLength(), this.disabletags, this);
  }
  get DisableSkillIdTags() {
    return GameUtils_1.GameUtils.ConvertToMap(this.disableskillidtagsLength(), this.disableskillidtagsKey, this.disableskillidtagsValue, this);
  }
  disableskillidtagsKey(t) {
    return this.disableskillidtags(t)?.key();
  }
  disableskillidtagsValue(t) {
    return this.disableskillidtags(t)?.value();
  }
  get IsCdVisible() {
    return this.iscdvisible();
  }
  get IsLongPressControlCamera() {
    return this.islongpresscontrolcamera();
  }
  get LongPressTime() {
    return this.longpresstime();
  }
  get DynamicEffectTagMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.dynamiceffecttagmapLength(), this.dynamiceffecttagmapKey, this.dynamiceffecttagmapValue, this);
  }
  dynamiceffecttagmapKey(t) {
    return this.dynamiceffecttagmap(t)?.key();
  }
  dynamiceffecttagmapValue(t) {
    return this.dynamiceffecttagmap(t)?.value();
  }
  get ShowLongPress() {
    return this.showlongpress();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSkillVehicleButton(t, i) {
    return (i || new SkillVehicleButton()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  pbdataid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  buttontype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  actiontype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkillidtagmapAt(t, i) {
    return this.skillidtagmap(t);
  }
  skillidtagmap(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  skillidtagmapLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillicon(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSkillicontagsAt(t) {
    return this.skillicontags(t);
  }
  skillicontags(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  skillicontagsLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillicontagsArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetEnabletagsAt(t) {
    return this.enabletags(t);
  }
  enabletags(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  enabletagsLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  enabletagsArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDisabletagsAt(t) {
    return this.disabletags(t);
  }
  disabletags(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  disabletagsLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  disabletagsArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDisableskillidtagsAt(t, i) {
    return this.disableskillidtags(t);
  }
  disableskillidtags(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return (i || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  disableskillidtagsLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  iscdvisible() {
    var t = this.J7.__offset(this.z7, 28);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  islongpresscontrolcamera() {
    var t = this.J7.__offset(this.z7, 30);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  longpresstime() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 500;
    }
  }
  GetDynamiceffecttagmapAt(t, i) {
    return this.dynamiceffecttagmap(t);
  }
  dynamiceffecttagmap(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  dynamiceffecttagmapLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showlongpress() {
    var t = this.J7.__offset(this.z7, 36);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.SkillVehicleButton = SkillVehicleButton;
//# sourceMappingURL=SkillVehicleButton.js.map