"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCue = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const Vector_1 = require("./SubType/Vector");
class GameplayCue {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Path() {
    return this.path();
  }
  get CueType() {
    return this.cuetype();
  }
  get Comp() {
    return this.comp();
  }
  get CompName() {
    return this.compname();
  }
  get Socket() {
    return this.socket();
  }
  get Location() {
    return this.location();
  }
  get Rotation() {
    return this.rotation();
  }
  get Scale() {
    return this.scale();
  }
  get LocRule() {
    return this.locrule();
  }
  get RotaRule() {
    return this.rotarule();
  }
  get SclRule() {
    return this.sclrule();
  }
  get EndRule() {
    return this.endrule();
  }
  get Magni() {
    return this.magni();
  }
  get AttrId() {
    return this.attrid();
  }
  get Tag() {
    return this.tag();
  }
  get Max() {
    return this.max();
  }
  get Min() {
    return this.min();
  }
  get bListenAttr() {
    return this.blistenattr();
  }
  get bSoftFollow() {
    return this.bsoftfollow();
  }
  get bLockRevolution() {
    return this.blockrevolution();
  }
  get LockRotation() {
    return this.lockrotation();
  }
  get LockCamera() {
    return this.lockcamera();
  }
  get InterpSpeed() {
    return this.interpspeed();
  }
  get FarthestDistance() {
    return this.farthestdistance();
  }
  get FaultTolerance() {
    return this.faulttolerance();
  }
  get TargetScaleUp() {
    return GameUtils_1.GameUtils.ConvertToArray(this.targetscaleupLength(), this.targetscaleup, this);
  }
  get Resources() {
    return GameUtils_1.GameUtils.ConvertToArray(this.resourcesLength(), this.resources, this);
  }
  get Parameters() {
    return GameUtils_1.GameUtils.ConvertToArray(this.parametersLength(), this.parameters, this);
  }
  get Group() {
    return this.group();
  }
  get Priority() {
    return this.priority();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsGameplayCue(t, s) {
    return (s || new GameplayCue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
  path(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  cuetype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  comp() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  compname(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  socket(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  location(t) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  rotation(t) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  scale(t) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  locrule() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rotarule() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sclrule() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  endrule() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  magni() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  attrid() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tag(t) {
    var s = this.J7.__offset(this.z7, 34);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  max() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  min() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  blistenattr() {
    var t = this.J7.__offset(this.z7, 40);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  bsoftfollow() {
    var t = this.J7.__offset(this.z7, 42);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  blockrevolution() {
    var t = this.J7.__offset(this.z7, 44);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  lockrotation(t) {
    var s = this.J7.__offset(this.z7, 46);
    if (s) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  lockcamera() {
    var t = this.J7.__offset(this.z7, 48);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  interpspeed() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 5;
    }
  }
  farthestdistance() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  faulttolerance(t) {
    var s = this.J7.__offset(this.z7, 54);
    if (s) {
      return (t || new Vector_1.Vector()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  GetTargetscaleupAt(t) {
    return this.targetscaleup(t);
  }
  targetscaleup(t) {
    var s = this.J7.__offset(this.z7, 56);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  targetscaleupLength() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  targetscaleupArray() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetResourcesAt(t) {
    return this.resources(t);
  }
  resources(t, s) {
    var i = this.J7.__offset(this.z7, 58);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  resourcesLength() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParametersAt(t) {
    return this.parameters(t);
  }
  parameters(t, s) {
    var i = this.J7.__offset(this.z7, 60);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  parametersLength() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  group() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  priority() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GameplayCue = GameplayCue;
//# sourceMappingURL=GameplayCue.js.map