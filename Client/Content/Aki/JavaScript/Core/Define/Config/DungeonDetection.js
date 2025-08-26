"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DungeonDetection = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class DungeonDetection {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DungeonId() {
    return this.dungeonid();
  }
  get Name() {
    return this.name();
  }
  get RoleId() {
    return this.roleid();
  }
  get GuideId() {
    return this.guideid();
  }
  get LevelPlayList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.levelplaylistLength(), this.levelplaylist, this);
  }
  get InstanceSubTypeDescription() {
    return this.instancesubtypedescription();
  }
  get TypeDescription1() {
    return this.typedescription1();
  }
  get Secondary() {
    return this.secondary();
  }
  get MatType() {
    return this.mattype();
  }
  get TypeDescription2() {
    return this.typedescription2();
  }
  get AttributesDescriptionLock() {
    return this.attributesdescriptionlock();
  }
  get AttributesDescriptionUnlock() {
    return this.attributesdescriptionunlock();
  }
  get BigIcon() {
    return this.bigicon();
  }
  get Icon() {
    return this.icon();
  }
  get LockBigIcon() {
    return this.lockbigicon();
  }
  get TemporaryIconUnLock() {
    return this.temporaryiconunlock();
  }
  get TemporaryIconlock() {
    return this.temporaryiconlock();
  }
  get ShowReward() {
    return this.showreward();
  }
  get ShowRewardMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.showrewardmapLength(), this.showrewardmapKey, this.showrewardmapValue, this);
  }
  showrewardmapKey(t) {
    return this.showrewardmap(t)?.key();
  }
  showrewardmapValue(t) {
    return this.showrewardmap(t)?.value();
  }
  get ShowRewardMapCalabash() {
    return GameUtils_1.GameUtils.ConvertToMap(this.showrewardmapcalabashLength(), this.showrewardmapcalabashKey, this.showrewardmapcalabashValue, this);
  }
  showrewardmapcalabashKey(t) {
    return this.showrewardmapcalabash(t)?.key();
  }
  showrewardmapcalabashValue(t) {
    return this.showrewardmapcalabash(t)?.value();
  }
  get BeginTimeStamp() {
    return this.begintimestamp();
  }
  get PreOpenId() {
    return this.preopenid();
  }
  get LockCon() {
    return this.lockcon();
  }
  get PhantomId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantomidLength(), this.phantomid, this);
  }
  get SubDungeonId() {
    return this.subdungeonid();
  }
  get SortId() {
    return this.sortid();
  }
  get NewContent() {
    return this.newcontent();
  }
  get DetectionTabType() {
    return this.detectiontabtype();
  }
  get PhantomFetterGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantomfettergroupLength(), this.phantomfettergroup, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDungeonDetection(t, i) {
    return (i || new DungeonDetection()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dungeonid() {
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
  roleid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  guideid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLevelplaylistAt(t) {
    return this.levelplaylist(t);
  }
  levelplaylist(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  levelplaylistLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelplaylistArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  instancesubtypedescription(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  typedescription1() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  secondary() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mattype() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  typedescription2(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  attributesdescriptionlock(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  attributesdescriptionunlock(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bigicon(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  lockbigicon(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  temporaryiconunlock(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  temporaryiconlock(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  showreward() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetShowrewardmapAt(t, i) {
    return this.showrewardmap(t);
  }
  showrewardmap(t, i) {
    var s = this.J7.__offset(this.z7, 42);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  showrewardmapLength() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetShowrewardmapcalabashAt(t, i) {
    return this.showrewardmapcalabash(t);
  }
  showrewardmapcalabash(t, i) {
    var s = this.J7.__offset(this.z7, 44);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  showrewardmapcalabashLength() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  begintimestamp() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  preopenid() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lockcon() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantomidAt(t) {
    return this.phantomid(t);
  }
  phantomid(t) {
    var i = this.J7.__offset(this.z7, 52);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  phantomidLength() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantomidArray() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  subdungeonid() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  newcontent(t) {
    var i = this.J7.__offset(this.z7, 58);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  detectiontabtype() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantomfettergroupAt(t) {
    return this.phantomfettergroup(t);
  }
  phantomfettergroup(t) {
    var i = this.J7.__offset(this.z7, 62);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  phantomfettergroupLength() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantomfettergroupArray() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.DungeonDetection = DungeonDetection;
//# sourceMappingURL=DungeonDetection.js.map