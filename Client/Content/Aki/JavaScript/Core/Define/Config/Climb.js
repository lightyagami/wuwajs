"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Climb = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const FloatRange_1 = require("./SubType/FloatRange");
const Vector_1 = require("./SubType/Vector");
class Climb {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ClimbDetectPoints() {
    return GameUtils_1.GameUtils.ConvertToArray(this.climbdetectpointsLength(), this.climbdetectpoints, this);
  }
  get DetectRadius() {
    return this.detectradius();
  }
  get ClimbRadius() {
    return this.climbradius();
  }
  get ClimbFromTop() {
    return this.climbfromtop();
  }
  get ClimbVault() {
    return this.climbvault();
  }
  get ClimbOnTop() {
    return this.climbontop();
  }
  get VaultRange() {
    return this.vaultrange();
  }
  get UpArriveRange() {
    return this.uparriverange();
  }
  get ClimbSprintVault() {
    return this.climbsprintvault();
  }
  get SprintVaultRange() {
    return this.sprintvaultrange();
  }
  get ForwardBlockHeight() {
    return this.forwardblockheight();
  }
  get ForwardBlockRadius() {
    return this.forwardblockradius();
  }
  get ForwardBlockDistance() {
    return this.forwardblockdistance();
  }
  get SprintVaultLongNeedDistance() {
    return this.sprintvaultlongneeddistance();
  }
  get SprintVaultLongHeight() {
    return this.sprintvaultlongheight();
  }
  get SprintVaultLongRange() {
    return this.sprintvaultlongrange();
  }
  get BlockUpOffset() {
    return this.blockupoffset();
  }
  get BlockUpDetectRadius() {
    return this.blockupdetectradius();
  }
  get BlockUpDetectDistance() {
    return this.blockupdetectdistance();
  }
  get BlockUpBackDistance() {
    return this.blockupbackdistance();
  }
  get BlockUpBackMinDist() {
    return this.blockupbackmindist();
  }
  get BlockUpFinalMove() {
    return this.blockupfinalmove();
  }
  get BlockUpVerticalRange() {
    return this.blockupverticalrange();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsClimb(t, i) {
    return (i || new Climb()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetClimbdetectpointsAt(t, i) {
    return this.climbdetectpoints(t);
  }
  climbdetectpoints(t, i) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return (i || new Vector_1.Vector()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  climbdetectpointsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  detectradius() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 20;
    }
  }
  climbradius() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 40;
    }
  }
  climbfromtop(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  climbvault(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  climbontop(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  vaultrange(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  uparriverange(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  climbsprintvault(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  sprintvaultrange(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  forwardblockheight() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 50;
    }
  }
  forwardblockradius() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 30;
    }
  }
  forwardblockdistance(t) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  sprintvaultlongneeddistance() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 48;
    }
  }
  sprintvaultlongheight() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 75;
    }
  }
  sprintvaultlongrange(t) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  blockupoffset(t) {
    var i = this.J7.__offset(this.z7, 38);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  blockupdetectradius() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 20;
    }
  }
  blockupdetectdistance() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 250;
    }
  }
  blockupbackdistance() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 100;
    }
  }
  blockupbackmindist() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 50;
    }
  }
  blockupfinalmove(t) {
    var i = this.J7.__offset(this.z7, 48);
    if (i) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  blockupverticalrange(t) {
    var i = this.J7.__offset(this.z7, 50);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
}
exports.Climb = Climb;
//# sourceMappingURL=Climb.js.map