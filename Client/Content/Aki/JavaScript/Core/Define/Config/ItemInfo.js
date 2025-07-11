"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class ItemInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ItemType() {
    return this.itemtype();
  }
  get Name() {
    return this.name();
  }
  get ShowTypes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showtypesLength(), this.showtypes, this);
  }
  get AttributesDescription() {
    return this.attributesdescription();
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
  get QualityId() {
    return this.qualityid();
  }
  get MainTypeId() {
    return this.maintypeid();
  }
  get RedDotDisableRule() {
    return this.reddotdisablerule();
  }
  get UseCountLimit() {
    return this.usecountlimit();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get MaxCapcity() {
    return this.maxcapcity();
  }
  get MaxStackableNum() {
    return this.maxstackablenum();
  }
  get DecomposeInfo() {
    return GameUtils_1.GameUtils.ConvertToMap(this.decomposeinfoLength(), this.decomposeinfoKey, this.decomposeinfoValue, this);
  }
  decomposeinfoKey(t) {
    return this.decomposeinfo(t)?.key();
  }
  decomposeinfoValue(t) {
    return this.decomposeinfo(t)?.value();
  }
  get UseLevel() {
    return this.uselevel();
  }
  get BeginTimeStamp() {
    return this.begintimestamp();
  }
  get DurationStamp() {
    return this.durationstamp();
  }
  get ItemAccess() {
    return GameUtils_1.GameUtils.ConvertToArray(this.itemaccessLength(), this.itemaccess, this);
  }
  get Parameters() {
    return GameUtils_1.GameUtils.ConvertToMap(this.parametersLength(), this.parametersKey, this.parametersValue, this);
  }
  parametersKey(t) {
    return this.parameters(t)?.key();
  }
  parametersValue(t) {
    return this.parameters(t)?.value();
  }
  get ShowUseButton() {
    return this.showusebutton();
  }
  get ObtainedShow() {
    return this.obtainedshow();
  }
  get ObtainedShowDescription() {
    return this.obtainedshowdescription();
  }
  get CompositeItem() {
    return GameUtils_1.GameUtils.ConvertToArray(this.compositeitemLength(), this.compositeitem, this);
  }
  get EntityConfig() {
    return this.entityconfig();
  }
  get NumLimit() {
    return this.numlimit();
  }
  get ShowInBag() {
    return this.showinbag();
  }
  get Destructible() {
    return this.destructible();
  }
  get ItemBuffType() {
    return this.itembufftype();
  }
  get SpecialItem() {
    return this.specialitem();
  }
  get UiPlayItem() {
    return this.uiplayitem();
  }
  get IsBuffItem() {
    return this.isbuffitem();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsItemInfo(t, i) {
    return (i || new ItemInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemtype() {
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
  GetShowtypesAt(t) {
    return this.showtypes(t);
  }
  showtypes(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  showtypesLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showtypesArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  attributesdescription(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bgdescription(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  iconmiddle(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  iconsmall(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mesh(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maintypeid() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reddotdisablerule() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  usecountlimit() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxcapcity() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 999999999;
    }
  }
  maxstackablenum() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 99999999;
    }
  }
  GetDecomposeinfoAt(t, i) {
    return this.decomposeinfo(t);
  }
  decomposeinfo(t, i) {
    var s = this.J7.__offset(this.z7, 38);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  decomposeinfoLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  uselevel() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  begintimestamp() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  durationstamp() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetItemaccessAt(t) {
    return this.itemaccess(t);
  }
  itemaccess(t) {
    var i = this.J7.__offset(this.z7, 46);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  itemaccessLength() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemaccessArray() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetParametersAt(t, i) {
    return this.parameters(t);
  }
  parameters(t, i) {
    var s = this.J7.__offset(this.z7, 48);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  parametersLength() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showusebutton() {
    var t = this.J7.__offset(this.z7, 50);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  obtainedshow() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  obtainedshowdescription(t) {
    var i = this.J7.__offset(this.z7, 54);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetCompositeitemAt(t) {
    return this.compositeitem(t);
  }
  compositeitem(t) {
    var i = this.J7.__offset(this.z7, 56);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  compositeitemLength() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  compositeitemArray() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  entityconfig() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  numlimit() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showinbag() {
    var t = this.J7.__offset(this.z7, 62);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  destructible() {
    var t = this.J7.__offset(this.z7, 64);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  itembufftype() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialitem() {
    var t = this.J7.__offset(this.z7, 68);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  uiplayitem() {
    var t = this.J7.__offset(this.z7, 70);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isbuffitem() {
    var t = this.J7.__offset(this.z7, 72);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.ItemInfo = ItemInfo;
//# sourceMappingURL=ItemInfo.js.map