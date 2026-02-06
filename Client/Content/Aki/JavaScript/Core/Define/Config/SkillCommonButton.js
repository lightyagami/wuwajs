"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillCommonButton = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class SkillCommonButton {
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
  get VisibleTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.visibletagsLength(), this.visibletags, this);
  }
  get HiddenTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.hiddentagsLength(), this.hiddentags, this);
  }
  get IsCdVisible() {
    return this.iscdvisible();
  }
  get AttributeId() {
    return this.attributeid();
  }
  get MaxAttributeId() {
    return this.maxattributeid();
  }
  get AttributeIdTagMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.attributeidtagmapLength(), this.attributeidtagmapKey, this.attributeidtagmapValue, this);
  }
  attributeidtagmapKey(t) {
    return this.attributeidtagmap(t)?.key();
  }
  attributeidtagmapValue(t) {
    return this.attributeidtagmap(t)?.value();
  }
  get AttributeEnableTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.attributeenabletagsLength(), this.attributeenabletags, this);
  }
  get FormationAttributeIdTagMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.formationattributeidtagmapLength(), this.formationattributeidtagmapKey, this.formationattributeidtagmapValue, this);
  }
  formationattributeidtagmapKey(t) {
    return this.formationattributeidtagmap(t)?.key();
  }
  formationattributeidtagmapValue(t) {
    return this.formationattributeidtagmap(t)?.value();
  }
  get MaxAttributeBurstEffectId() {
    return this.maxattributebursteffectid();
  }
  get CdCompletedEffectId() {
    return this.cdcompletedeffectid();
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
  get ShowLongPressTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showlongpresstagsLength(), this.showlongpresstags, this);
  }
  get CustomHandleId() {
    return this.customhandleid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSkillCommonButton(t, i) {
    return (i || new SkillCommonButton()).__init(t.readInt32(t.position()) + t.position(), t);
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
  GetSkillicontagsAt(t) {
    return this.skillicontags(t);
  }
  skillicontags(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  skillicontagsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillicontagsArray() {
    var t = this.J7.__offset(this.z7, 16);
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
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  enabletagsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  enabletagsArray() {
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
  iscdvisible() {
    var t = this.J7.__offset(this.z7, 28);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  attributeid() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxattributeid() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAttributeidtagmapAt(t, i) {
    return this.attributeidtagmap(t);
  }
  attributeidtagmap(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    if (s) {
      return (i || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  attributeidtagmapLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAttributeenabletagsAt(t) {
    return this.attributeenabletags(t);
  }
  attributeenabletags(t) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  attributeenabletagsLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  attributeenabletagsArray() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFormationattributeidtagmapAt(t, i) {
    return this.formationattributeidtagmap(t);
  }
  formationattributeidtagmap(t, i) {
    var s = this.J7.__offset(this.z7, 38);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  formationattributeidtagmapLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxattributebursteffectid() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cdcompletedeffectid() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  islongpresscontrolcamera() {
    var t = this.J7.__offset(this.z7, 44);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  longpresstime() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDynamiceffecttagmapAt(t, i) {
    return this.dynamiceffecttagmap(t);
  }
  dynamiceffecttagmap(t, i) {
    var s = this.J7.__offset(this.z7, 48);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  dynamiceffecttagmapLength() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetShowlongpresstagsAt(t) {
    return this.showlongpresstags(t);
  }
  showlongpresstags(t) {
    var i = this.J7.__offset(this.z7, 50);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  showlongpresstagsLength() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showlongpresstagsArray() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  customhandleid() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SkillCommonButton = SkillCommonButton;
//# sourceMappingURL=SkillCommonButton.js.map