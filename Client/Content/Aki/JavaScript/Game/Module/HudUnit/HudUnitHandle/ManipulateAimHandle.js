"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManipulateAimHandle = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ManipulateAimUnit_1 = require("../HudUnit/ManipulateAimUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class ManipulateAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.Qoi = undefined;
    this.Xoi = undefined;
    this.$oi = undefined;
    this.Yoi = undefined;
    this.Joi = false;
    this.Moi = undefined;
    this.zoi = (t, i, s) => {
      if (!t && !this.Xoi) {
        this.Qoi?.PlayCloseAnim();
      }
    };
    this.Zoi = (t, i) => {
      this.Moi = i;
      if (this.Qoi) {
        if (this.Qoi.ResourceId !== this.Moi) {
          this.eri();
          this.tri();
        } else {
          this.iri();
          this.ori();
          this.Qoi.PlayStartAnim();
        }
      } else {
        this.tri();
      }
    };
    this.rri = (t, i) => {
      if (t) {
        this.Xoi = t.GetComponent(3);
        this.$oi = this.Xoi?.Actor.Mesh;
        this.Yoi = i?.PartSocketName;
        this.Joi = i?.IsWeakness;
        if (this.Qoi) {
          if (this.Qoi.ResourceId !== this.Moi) {
            this.eri();
            this.tri();
          } else {
            this.iri();
            this.ori();
          }
        } else {
          this.tri();
        }
      }
    };
    this.nri = () => {
      this.Xoi = undefined;
      this.$oi = undefined;
      this.Yoi = undefined;
      this.Qoi?.SetTargetAimVisible(false);
    };
    this.sri = () => {
      this.Xoi = undefined;
      this.$oi = undefined;
      this.Yoi = undefined;
      this.Moi = undefined;
      this.Qoi?.PlayCloseAnim();
    };
  }
  OnDestroyed() {
    this.eri();
    this.Qoi = undefined;
    this.Xoi = undefined;
    this.$oi = undefined;
    this.Yoi = undefined;
  }
  OnTick(t) {
    this.iri();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.zoi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManipulateStartChanting, this.Zoi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ManipulateStartLockCastTarget, this.rri);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ManipulateEndLockCastTarget, this.nri);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HiddenManipulateUI, this.sri);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.zoi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateStartChanting, this.Zoi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ManipulateStartLockCastTarget, this.rri);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ManipulateEndLockCastTarget, this.nri);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HiddenManipulateUI, this.sri);
  }
  tri() {
    if (this.Moi && this.Moi.length !== 0) {
      this.Qoi = this.NewHudUnitWithReturn(ManipulateAimUnit_1.ManipulateAimUnit, this.Moi, true, () => {
        if (this.Moi !== this.Qoi?.ResourceId) {
          this.eri();
        } else {
          this.Qoi?.SetCloseAnimCallback(() => {
            this.eri();
          });
          this.iri();
          this.ori();
        }
      });
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetCameraAimVisible, false, 1);
    }
  }
  eri() {
    if (this.Qoi) {
      this.DestroyHudUnit(this.Qoi);
      this.Qoi = undefined;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetCameraAimVisible, true, 1);
    }
  }
  iri() {
    var t;
    if (this.Qoi && !this.Qoi.InAsyncLoading()) {
      if ((t = this.ari()) && (t = this.ProjectWorldToScreen(t))) {
        this.Qoi.SetTargetItemOffset(t.X, t.Y);
        this.Qoi.SetTargetAimVisible(true);
      } else {
        this.Qoi.SetTargetAimVisible(false);
      }
    }
  }
  ori() {
    if (!!this.Qoi && !this.Qoi.InAsyncLoading()) {
      this.Qoi.SetIsWeakness(this.Joi);
    }
  }
  ari() {
    if (this.Xoi) {
      if (this.$oi && this.Yoi && this.$oi.DoesSocketExist(this.Yoi)) {
        return this.$oi.D_GetSocketLocation(this.Yoi);
      } else {
        return this.Xoi.ActorLocation;
      }
    }
  }
}
exports.ManipulateAimHandle = ManipulateAimHandle;
//# sourceMappingURL=ManipulateAimHandle.js.map