"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneActorRefGroup = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbSceneActorRefGroup {
  constructor(t) {
    this.FbDataInternal = t;
    this._vh = false;
    this.cvh = undefined;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSceneActorRefGroup(t);
    }
  }
  get EntityState() {
    if (!this._vh) {
      this._vh = true;
      this.cvh = this.FbDataInternal.entityState();
    }
    return this.cvh;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
      }
    }
    return this.A_h;
  }
}
exports.FbSceneActorRefGroup = FbSceneActorRefGroup;
//# sourceMappingURL=FbSceneActorRefGroup.js.map