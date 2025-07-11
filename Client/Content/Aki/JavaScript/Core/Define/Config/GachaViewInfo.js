"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaViewInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const Vector_1 = require("./SubType/Vector");
class GachaViewInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get SummaryTitle() {
    return this.summarytitle();
  }
  get SummaryDescribe() {
    return this.summarydescribe();
  }
  get ThemeColor() {
    return this.themecolor();
  }
  get EffectLocation() {
    return this.effectlocation();
  }
  get EffectPath() {
    return this.effectpath();
  }
  get TextTexture() {
    return this.texttexture();
  }
  get ContentTexturePath() {
    return this.contenttexturepath();
  }
  get ContentTextureBgPath() {
    return this.contenttexturebgpath();
  }
  get UnderBgTexturePath() {
    return this.underbgtexturepath();
  }
  get TagNotSelectedSpritePath() {
    return this.tagnotselectedspritepath();
  }
  get TagSelectedSpritePath() {
    return this.tagselectedspritepath();
  }
  get WeaponPrefabPath() {
    return this.weaponprefabpath();
  }
  get SpinePrefabResource() {
    return this.spineprefabresource();
  }
  get UpList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.uplistLength(), this.uplist, this);
  }
  get ShowIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showidlistLength(), this.showidlist, this);
  }
  get PreviewIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.previewidlistLength(), this.previewidlist, this);
  }
  get TrialActivityId() {
    return this.trialactivityid();
  }
  get TrialRoleId() {
    return this.trialroleid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGachaViewInfo(t, i) {
    return (i || new GachaViewInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  summarytitle(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  summarydescribe(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  themecolor(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  effectlocation(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  effectpath(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  texttexture(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  contenttexturepath(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  contenttexturebgpath(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  underbgtexturepath(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  tagnotselectedspritepath(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  tagselectedspritepath(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  weaponprefabpath(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  spineprefabresource(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetUplistAt(t) {
    return this.uplist(t);
  }
  uplist(t) {
    var i = this.J7.__offset(this.z7, 34);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  uplistLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  uplistArray() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShowidlistAt(t) {
    return this.showidlist(t);
  }
  showidlist(t) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  showidlistLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showidlistArray() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetPreviewidlistAt(t) {
    return this.previewidlist(t);
  }
  previewidlist(t) {
    var i = this.J7.__offset(this.z7, 38);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  previewidlistLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  previewidlistArray() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  trialactivityid() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  trialroleid() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GachaViewInfo = GachaViewInfo;
//# sourceMappingURL=GachaViewInfo.js.map