"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Area = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class Area {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get AreaId() {
    return this.areaid();
  }
  get Level() {
    return this.level();
  }
  get CountryId() {
    return this.countryid();
  }
  get DeliveryMarkId() {
    return this.deliverymarkid();
  }
  get AreaName() {
    return this.areaname();
  }
  get MapConfigId() {
    return this.mapconfigid();
  }
  get DungeonId() {
    return this.dungeonid();
  }
  get Title() {
    return this.title();
  }
  get Father() {
    return this.father();
  }
  get Tag() {
    return GameUtils_1.GameUtils.ConvertToArray(this.tagLength(), this.tag, this);
  }
  get Record() {
    return this.record();
  }
  get Tips() {
    return this.tips();
  }
  get IsInitActived() {
    return this.isinitactived();
  }
  get WorldMonsterLevelMax() {
    return GameUtils_1.GameUtils.ConvertToMap(this.worldmonsterlevelmaxLength(), this.worldmonsterlevelmaxKey, this.worldmonsterlevelmaxValue, this);
  }
  worldmonsterlevelmaxKey(t) {
    return this.worldmonsterlevelmax(t)?.key();
  }
  worldmonsterlevelmaxValue(t) {
    return this.worldmonsterlevelmax(t)?.value();
  }
  get WuYinQuID() {
    return this.wuyinquid();
  }
  get StateId() {
    return this.stateid();
  }
  get AtmosphereId() {
    return this.atmosphereid();
  }
  get EdgeWallName() {
    return this.edgewallname();
  }
  get DeliveryMarkType() {
    return this.deliverymarktype();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get EnterAreaTags() {
    return GameUtils_1.GameUtils.ConvertToMap(this.enterareatagsLength(), this.enterareatagsKey, this.enterareatagsValue, this);
  }
  enterareatagsKey(t) {
    return this.enterareatags(t)?.key();
  }
  enterareatagsValue(t) {
    return this.enterareatags(t)?.value();
  }
  get LeaveAreaTags() {
    return GameUtils_1.GameUtils.ConvertToMap(this.leaveareatagsLength(), this.leaveareatagsKey, this.leaveareatagsValue, this);
  }
  leaveareatagsKey(t) {
    return this.leaveareatags(t)?.key();
  }
  leaveareatagsValue(t) {
    return this.leaveareatags(t)?.value();
  }
  get PhantomFormationId() {
    return this.phantomformationid();
  }
  get PhantomFormationMultiSwitch() {
    return this.phantomformationmultiswitch();
  }
  get IsDisableInExplore() {
    return this.isdisableinexplore();
  }
  get IsPlayerPosNeedCheck() {
    return this.isplayerposneedcheck();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsArea(t, e) {
    return (e || new Area()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  areaid() {
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
  countryid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  deliverymarkid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  areaname(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  mapconfigid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 8;
    }
  }
  dungeonid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 8;
    }
  }
  title(t) {
    var e = this.J7.__offset(this.z7, 18);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  father() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTagAt(t) {
    return this.tag(t);
  }
  tag(t) {
    var e = this.J7.__offset(this.z7, 22);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  tagLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  tagArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  record() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tips() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isinitactived() {
    var t = this.J7.__offset(this.z7, 28);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetWorldmonsterlevelmaxAt(t, e) {
    return this.worldmonsterlevelmax(t);
  }
  worldmonsterlevelmax(t, e) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  worldmonsterlevelmaxLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  wuyinquid() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  stateid() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  atmosphereid() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  edgewallname(t) {
    var e = this.J7.__offset(this.z7, 38);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  deliverymarktype() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEnterareatagsAt(t, e) {
    return this.enterareatags(t);
  }
  enterareatags(t, e) {
    var i = this.J7.__offset(this.z7, 44);
    if (i) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  enterareatagsLength() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLeaveareatagsAt(t, e) {
    return this.leaveareatags(t);
  }
  leaveareatags(t, e) {
    var i = this.J7.__offset(this.z7, 46);
    if (i) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  leaveareatagsLength() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantomformationid() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantomformationmultiswitch() {
    var t = this.J7.__offset(this.z7, 50);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isdisableinexplore() {
    var t = this.J7.__offset(this.z7, 52);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isplayerposneedcheck() {
    var t = this.J7.__offset(this.z7, 54);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.Area = Area;
//# sourceMappingURL=Area.js.map