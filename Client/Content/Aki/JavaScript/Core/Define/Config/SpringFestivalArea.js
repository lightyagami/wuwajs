"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringFestivalArea = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
const Vector_1 = require("./SubType/Vector");
class SpringFestivalArea {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Floor() {
    return this.floor();
  }
  get ActivityId() {
    return this.activityid();
  }
  get MaxAtmosphere() {
    return this.maxatmosphere();
  }
  get SlotEntityIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.slotentityidsLength(), this.slotentityids, this);
  }
  get QuestId() {
    return this.questid();
  }
  get NodeId() {
    return this.nodeid();
  }
  get AtmosphereLevelId() {
    return this.atmospherelevelid();
  }
  get DefaultFurnitures() {
    return GameUtils_1.GameUtils.ConvertToMap(this.defaultfurnituresLength(), this.defaultfurnituresKey, this.defaultfurnituresValue, this);
  }
  defaultfurnituresKey(t) {
    return this.defaultfurnitures(t)?.key();
  }
  defaultfurnituresValue(t) {
    return this.defaultfurnitures(t)?.value();
  }
  get CameraLocation() {
    return this.cameralocation();
  }
  get CameraRotator() {
    return this.camerarotator();
  }
  get CameraFov() {
    return this.camerafov();
  }
  get CameraList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cameralistLength(), this.cameralist, this);
  }
  get AreaName() {
    return this.areaname();
  }
  get AreaDescription() {
    return this.areadescription();
  }
  get AreaFinishedSmallIcon() {
    return this.areafinishedsmallicon();
  }
  get AreaUnFinishedSmallIcon() {
    return this.areaunfinishedsmallicon();
  }
  get AreaFinishedBigIcon() {
    return this.areafinishedbigicon();
  }
  get AreaUnFinishedBigIcon() {
    return this.areaunfinishedbigicon();
  }
  get MaxSlotCount() {
    return this.maxslotcount();
  }
  get RangeEntityList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rangeentitylistLength(), this.rangeentitylist, this);
  }
  get TeleportLocation() {
    return this.teleportlocation();
  }
  get TeleportRotator() {
    return this.teleportrotator();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSpringFestivalArea(t, i) {
    return (i || new SpringFestivalArea()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  floor() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxatmosphere() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSlotentityidsAt(t) {
    return this.slotentityids(t);
  }
  slotentityids(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  slotentityidsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  slotentityidsArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  questid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nodeid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  atmospherelevelid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDefaultfurnituresAt(t, i) {
    return this.defaultfurnitures(t);
  }
  defaultfurnitures(t, i) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return (i || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  defaultfurnituresLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cameralocation(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  camerarotator(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  camerafov() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 90;
    }
  }
  GetCameralistAt(t) {
    return this.cameralist(t);
  }
  cameralist(t) {
    var i = this.J7.__offset(this.z7, 28);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  cameralistLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cameralistArray() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  areaname(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  areadescription(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  areafinishedsmallicon(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  areaunfinishedsmallicon(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  areafinishedbigicon(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  areaunfinishedbigicon(t) {
    var i = this.J7.__offset(this.z7, 40);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  maxslotcount() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRangeentitylistAt(t) {
    return this.rangeentitylist(t);
  }
  rangeentitylist(t) {
    var i = this.J7.__offset(this.z7, 44);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rangeentitylistLength() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rangeentitylistArray() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  teleportlocation(t) {
    var i = this.J7.__offset(this.z7, 46);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  teleportrotator(t) {
    var i = this.J7.__offset(this.z7, 48);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
}
exports.SpringFestivalArea = SpringFestivalArea;
//# sourceMappingURL=SpringFestivalArea.js.map