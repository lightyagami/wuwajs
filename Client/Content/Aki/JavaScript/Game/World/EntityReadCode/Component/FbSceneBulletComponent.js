"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneBulletComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSceneBulletGroup_1 = require("./FbSceneBulletGroup");
class FbSceneBulletComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.ejl = false;
    this.tjl = false;
    this.a7h = false;
    this.h7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSceneBulletComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get DisableGenerateByRange() {
    if (!this.ejl) {
      this.ejl = true;
      this.tjl = this.FbDataInternal.disableGenerateByRange();
    }
    return this.tjl;
  }
  get BulletGroups() {
    if (!this.a7h) {
      this.a7h = true;
      this.h7h = new Array();
      var e = this.FbDataInternal.bulletGroupsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var s = this.FbDataInternal.bulletGroups(t, new fb_component_1.SceneBulletGroup());
          this.h7h.push(FbSceneBulletGroup_1.FbSceneBulletGroup.Create(s));
        }
      }
    }
    return this.h7h;
  }
}
exports.FbSceneBulletComponent = FbSceneBulletComponent;
//# sourceMappingURL=FbSceneBulletComponent.js.map