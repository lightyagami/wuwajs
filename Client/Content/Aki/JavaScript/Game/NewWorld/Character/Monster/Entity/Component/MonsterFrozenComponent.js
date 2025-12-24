"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var s = arguments.length;
  var i = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, n);
  } else {
    for (var C = e.length - 1; C >= 0; C--) {
      if (r = e[C]) {
        i = (s < 3 ? r(i) : s > 3 ? r(t, o, i) : r(t, o)) || i;
      }
    }
  }
  if (s > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterFrozenComponent = undefined;
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const BaseFrozenComponent_1 = require("../../../Common/Component/Abilities/BaseFrozenComponent");
const GameplayCueController_1 = require("../../../Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
const FROZEN_CUE_ID = 1003;
const CANCEL_FROZEN_CUE_ID = 100302;
let MonsterFrozenComponent = class MonsterFrozenComponent extends BaseFrozenComponent_1.BaseFrozenComponent {
  constructor() {
    super(...arguments);
    this.FrozenHandle = undefined;
    this.FrozenCueHandle = GameplayCueController_1.INVALID_CUE_HANDLE;
    this.IsFrozenInternal = false;
  }
  IsFrozen() {
    return this.IsFrozenInternal;
  }
  SetFrozen(e) {
    if (this.IsFrozenInternal !== e) {
      this.IsFrozenInternal = e;
      var t = this.Entity.GetComponent(131);
      const n = this.Entity.GetComponent(21);
      var o = this.Entity.GetComponent(215)?.TagContainer;
      if (e) {
        this.FrozenHandle = this.FrozenHandle ?? t?.SetTimeScale(Infinity, 0, undefined, Infinity, 6);
        if (this.FrozenCueHandle === GameplayCueController_1.INVALID_CUE_HANDLE) {
          this.FrozenCueHandle = n.AddCue(FROZEN_CUE_ID);
        }
        if (o) {
          o.AddExactTag(6, -752177221);
          o.AddExactTag(6, 1447214865);
        }
      } else {
        if (this.FrozenHandle !== undefined) {
          t?.RemoveTimeScale(this.FrozenHandle);
          this.FrozenHandle = undefined;
        }
        n.RemoveCueByHandle(this.FrozenCueHandle);
        this.FrozenCueHandle = n.AddCue(CANCEL_FROZEN_CUE_ID, {
          EndCallback: () => {
            n.RemoveCueByHandle(this.FrozenCueHandle);
            this.FrozenCueHandle = GameplayCueController_1.INVALID_CUE_HANDLE;
          }
        });
        if (o) {
          o.RemoveTag(6, -752177221);
          o.RemoveTag(6, 1447214865);
        }
      }
    }
  }
};
MonsterFrozenComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(194)], MonsterFrozenComponent);
exports.MonsterFrozenComponent = MonsterFrozenComponent; //# sourceMappingURL=MonsterFrozenComponent.js.map