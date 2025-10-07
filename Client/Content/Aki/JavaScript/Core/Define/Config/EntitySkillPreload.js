"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntitySkillPreload = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class EntitySkillPreload {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SkillId() {
    return this.skillid();
  }
  get ActorBlueprint() {
    return this.actorblueprint();
  }
  get IsCommon() {
    return this.iscommon();
  }
  get HasMontagePath() {
    return this.hasmontagepath();
  }
  get ActorClass() {
    return GameUtils_1.GameUtils.ConvertToArray(this.actorclassLength(), this.actorclass, this);
  }
  get Animations() {
    return GameUtils_1.GameUtils.ConvertToArray(this.animationsLength(), this.animations, this);
  }
  get Effects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.effectsLength(), this.effects, this);
  }
  get Audios() {
    return GameUtils_1.GameUtils.ConvertToArray(this.audiosLength(), this.audios, this);
  }
  get Meshes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.meshesLength(), this.meshes, this);
  }
  get Materials() {
    return GameUtils_1.GameUtils.ConvertToArray(this.materialsLength(), this.materials, this);
  }
  get AnimationBlueprints() {
    return GameUtils_1.GameUtils.ConvertToArray(this.animationblueprintsLength(), this.animationblueprints, this);
  }
  get Others() {
    return GameUtils_1.GameUtils.ConvertToArray(this.othersLength(), this.others, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsEntitySkillPreload(t, s) {
    return (s || new EntitySkillPreload()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  actorblueprint(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  iscommon() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  hasmontagepath() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetActorclassAt(t) {
    return this.actorclass(t);
  }
  actorclass(t, s) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  actorclassLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAnimationsAt(t) {
    return this.animations(t);
  }
  animations(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  animationsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEffectsAt(t) {
    return this.effects(t);
  }
  effects(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  effectsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAudiosAt(t) {
    return this.audios(t);
  }
  audios(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  audiosLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMeshesAt(t) {
    return this.meshes(t);
  }
  meshes(t, s) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  meshesLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMaterialsAt(t) {
    return this.materials(t);
  }
  materials(t, s) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  materialsLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAnimationblueprintsAt(t) {
    return this.animationblueprints(t);
  }
  animationblueprints(t, s) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  animationblueprintsLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOthersAt(t) {
    return this.others(t);
  }
  others(t, s) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  othersLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.EntitySkillPreload = EntitySkillPreload;
//# sourceMappingURL=EntitySkillPreload.js.map