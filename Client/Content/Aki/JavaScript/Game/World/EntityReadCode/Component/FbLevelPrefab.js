"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelPrefab = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPrefabEffectConfig_1 = require("./FbPrefabEffectConfig");
const FbPrefabStateConfig_1 = require("./FbPrefabStateConfig");
class FbLevelPrefab {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$Qh = false;
    this.XQh = undefined;
    this.YQh = false;
    this.zQh = undefined;
    this.zP_ = false;
    this.JP_ = 0;
    this.JQh = false;
    this.ZQh = undefined;
    this.eKh = false;
    this.tKh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLevelPrefab(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BlueprintPath() {
    if (!this.$Qh) {
      this.$Qh = true;
      this.XQh = this.FbDataInternal.blueprintPath();
    }
    return this.XQh;
  }
  get PrefabPath() {
    if (!this.YQh) {
      this.YQh = true;
      this.zQh = this.FbDataInternal.prefabPath();
    }
    return this.zQh;
  }
  get NameOffsetZ() {
    if (!this.zP_) {
      this.zP_ = true;
      this.JP_ = this.FbDataInternal.nameOffsetZ();
    }
    return this.JP_;
  }
  get PrefabStateList() {
    if (!this.JQh) {
      this.JQh = true;
      this.ZQh = new Array();
      var i = this.FbDataInternal.prefabStateListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.prefabStateList(t, new fb_component_1.PrefabStateConfig());
          this.ZQh.push(FbPrefabStateConfig_1.FbPrefabStateConfig.Create(e));
        }
      }
    }
    return this.ZQh;
  }
  get EffectStateList() {
    if (!this.eKh) {
      this.eKh = true;
      this.tKh = new Array();
      var i = this.FbDataInternal.effectStateListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.effectStateList(t, new fb_component_1.PrefabEffectConfig());
          this.tKh.push(FbPrefabEffectConfig_1.FbPrefabEffectConfig.Create(e));
        }
      }
    }
    return this.tKh;
  }
}
exports.FbLevelPrefab = FbLevelPrefab;
//# sourceMappingURL=FbLevelPrefab.js.map