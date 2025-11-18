"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryTalent = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class HonamiStoryTalent {
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
  get PreId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.preidLength(), this.preid, this);
  }
  get EffectIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.effectidsLength(), this.effectids, this);
  }
  get Area() {
    return this.area();
  }
  get Type() {
    return this.type();
  }
  get IndexId() {
    return this.indexid();
  }
  get IndexSortId() {
    return this.indexsortid();
  }
  get ConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToMap(this.consumeitemsLength(), this.consumeitemsKey, this.consumeitemsValue, this);
  }
  consumeitemsKey(t) {
    return this.consumeitems(t)?.key();
  }
  consumeitemsValue(t) {
    return this.consumeitems(t)?.value();
  }
  get Icon() {
    return this.icon();
  }
  get GreyIcon() {
    return this.greyicon();
  }
  get Name() {
    return this.name();
  }
  get Desc() {
    return this.desc();
  }
  get MidTitle() {
    return this.midtitle();
  }
  get MidDexc() {
    return this.middexc();
  }
  get LockPopTip() {
    return this.lockpoptip();
  }
  get LockPanelTip() {
    return this.lockpaneltip();
  }
  get SuccessTitle() {
    return this.successtitle();
  }
  get SuccessDesc() {
    return this.successdesc();
  }
  get SuccessDescParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.successdescparamsLength(), this.successdescparams, this);
  }
  get FlowListName() {
    return this.flowlistname();
  }
  get FlowId() {
    return this.flowid();
  }
  get StateId() {
    return this.stateid();
  }
  get BoZaiTalk() {
    return this.bozaitalk();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsHonamiStoryTalent(t, s) {
    return (s || new HonamiStoryTalent()).__init(t.readInt32(t.position()) + t.position(), t);
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
  GetPreidAt(t) {
    return this.preid(t);
  }
  preid(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  preidLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  preidArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetEffectidsAt(t) {
    return this.effectids(t);
  }
  effectids(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  effectidsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectidsArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  area() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  indexid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  indexsortid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConsumeitemsAt(t, s) {
    return this.consumeitems(t);
  }
  consumeitems(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeitemsLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  greyicon(t) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 28);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  midtitle(t) {
    var s = this.J7.__offset(this.z7, 30);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  middexc(t) {
    var s = this.J7.__offset(this.z7, 32);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  lockpoptip(t) {
    var s = this.J7.__offset(this.z7, 34);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  lockpaneltip(t) {
    var s = this.J7.__offset(this.z7, 36);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  successtitle(t) {
    var s = this.J7.__offset(this.z7, 38);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  successdesc(t) {
    var s = this.J7.__offset(this.z7, 40);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetSuccessdescparamsAt(t) {
    return this.successdescparams(t);
  }
  successdescparams(t, s) {
    var i = this.J7.__offset(this.z7, 42);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  successdescparamsLength() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  flowlistname(t) {
    var s = this.J7.__offset(this.z7, 44);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  flowid() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  stateid() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bozaitalk(t) {
    var s = this.J7.__offset(this.z7, 50);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.HonamiStoryTalent = HonamiStoryTalent;
//# sourceMappingURL=HonamiStoryTalent.js.map