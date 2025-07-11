"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicMapMark = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntVector_1 = require("./SubType/IntVector");
class DynamicMapMark {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MarkId() {
    return this.markid();
  }
  get InstanceDungeonId() {
    return this.instancedungeonid();
  }
  get MapId() {
    return this.mapid();
  }
  get RelativeSubType() {
    return this.relativesubtype();
  }
  get RelativeDungeonId() {
    return this.relativedungeonid();
  }
  get FogHide() {
    return this.foghide();
  }
  get RelativeType() {
    return this.relativetype();
  }
  get RelativeId() {
    return this.relativeid();
  }
  get MarkVector() {
    return this.markvector();
  }
  get EntityConfigId() {
    return this.entityconfigid();
  }
  get ObjectType() {
    return this.objecttype();
  }
  get MarkTitle() {
    return this.marktitle();
  }
  get MarkDesc() {
    return this.markdesc();
  }
  get ToBeDiscovered() {
    return this.tobediscovered();
  }
  get IsMonster() {
    return this.ismonster();
  }
  get ShowPriority() {
    return this.showpriority();
  }
  get ShowRange() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showrangeLength(), this.showrange, this);
  }
  get LockMarkPic() {
    return this.lockmarkpic();
  }
  get UnlockMarkPic() {
    return this.unlockmarkpic();
  }
  get ShowCondition() {
    return this.showcondition();
  }
  get FogShow() {
    return this.fogshow();
  }
  get MapShow() {
    return this.mapshow();
  }
  get Scale() {
    return this.scale();
  }
  get FirstReward() {
    return this.firstreward();
  }
  get Reward() {
    return this.reward();
  }
  get TrackHudEnable() {
    return this.trackhudenable();
  }
  get TrackAutoCancelDistance() {
    return this.trackautocanceldistance();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDynamicMapMark(t, i) {
    return (i || new DynamicMapMark()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  markid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instancedungeonid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 8;
    }
  }
  relativesubtype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  relativedungeonid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 8;
    }
  }
  foghide() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  relativetype() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  relativeid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markvector(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return (t || new IntVector_1.IntVector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  entityconfigid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  objecttype() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  marktitle(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  markdesc(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  tobediscovered() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ismonster() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showpriority() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetShowrangeAt(t) {
    return this.showrange(t);
  }
  showrange(t) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  showrangeLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showrangeArray() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  lockmarkpic(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  unlockmarkpic(t) {
    var i = this.J7.__offset(this.z7, 40);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  showcondition() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  fogshow() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapshow() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  scale() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  firstreward() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reward() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  trackhudenable() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  trackautocanceldistance() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return -1;
    }
  }
}
exports.DynamicMapMark = DynamicMapMark;
//# sourceMappingURL=DynamicMapMark.js.map