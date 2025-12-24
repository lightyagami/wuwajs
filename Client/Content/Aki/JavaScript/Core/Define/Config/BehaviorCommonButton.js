"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorCommonButton = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class BehaviorCommonButton {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
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
  get SkillIcons() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skilliconsLength(), this.skillicons, this);
  }
  get SkillIconTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillicontagsLength(), this.skillicontags, this);
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
  get VisibleTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.visibletagsLength(), this.visibletags, this);
  }
  get HiddenTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.hiddentagsLength(), this.hiddentags, this);
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
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsBehaviorCommonButton(t, i) {
    return (i || new BehaviorCommonButton()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  buttontype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  actiontype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillid() {
    var t = this.J7.__offset(this.z7, 12);
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
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  skillidtagmapLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkilliconsAt(t) {
    return this.skillicons(t);
  }
  skillicons(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  skilliconsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkillicontagsAt(t) {
    return this.skillicontags(t);
  }
  skillicontags(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  skillicontagsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillicontagsArray() {
    var t = this.J7.__offset(this.z7, 18);
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
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  disabletagsLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  disabletagsArray() {
    var t = this.J7.__offset(this.z7, 20);
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
    var s = this.J7.__offset(this.z7, 22);
    if (s) {
      return (i || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  disableskillidtagsLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetVisibletagsAt(t) {
    return this.visibletags(t);
  }
  visibletags(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  visibletagsLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  visibletagsArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetHiddentagsAt(t) {
    return this.hiddentags(t);
  }
  hiddentags(t) {
    var i = this.J7.__offset(this.z7, 26);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  hiddentagsLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  hiddentagsArray() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDynamiceffecttagmapAt(t, i) {
    return this.dynamiceffecttagmap(t);
  }
  dynamiceffecttagmap(t, i) {
    var s = this.J7.__offset(this.z7, 28);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  dynamiceffecttagmapLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BehaviorCommonButton = BehaviorCommonButton;
//# sourceMappingURL=BehaviorCommonButton.js.map