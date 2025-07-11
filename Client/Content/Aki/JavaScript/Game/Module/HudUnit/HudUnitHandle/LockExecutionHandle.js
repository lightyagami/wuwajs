"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockExecutionHandle = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const CameraController_1 = require("../../../Camera/CameraController");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LockExecutionUnit_1 = require("../HudUnit/LockExecutionUnit");
const HudUnitUtils_1 = require("../Utils/HudUnitUtils");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const hitCaseSocket = new UE.FName("HitCase");
class LockExecutionHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.jma = new Vector2D_1.Vector2D();
    this.koi = undefined;
    this.sDe = undefined;
    this.v$e = false;
    this.dce = false;
    this.Foi = 0;
    this.VJe = (t, e) => {
      if (t) {
        this.Voi(e);
      } else {
        this.Hoi(e);
      }
    };
    this.zpe = () => {
      if (this.sDe) {
        this.fat();
      }
    };
  }
  OnInitialize() {
    this.Foi = CommonParamById_1.configCommonParamById.GetIntConfig("LockExecutionShowDistance");
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, this.VJe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, this.VJe);
  }
  Voi(t) {
    if (this.sDe?.Id !== t) {
      if (t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t)) {
        this.m$e();
        this.sDe = t;
        this._o();
      } else {
        this.fat();
      }
    }
  }
  Hoi(t) {
    if (this.sDe?.Id === t) {
      this.fat();
    }
  }
  _o() {
    this.c$e();
    this.uoi();
  }
  fat() {
    this.m$e();
    this.dce = false;
    this.joi();
    this.sDe = undefined;
  }
  c$e() {
    if (this.sDe) {
      EventSystem_1.EventSystem.AddWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  m$e() {
    if (this.sDe) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  OnTick(t) {
    super.OnTick(t);
    if (!this.v$e) {
      if (this.koi) {
        this.Woi();
        if (this.dce) {
          this.koi.TryShow();
        } else {
          this.koi.TryHide(true);
        }
      }
    }
  }
  Woi() {
    var t;
    var e;
    if (this.sDe?.Valid && (t = this.Koi()) && (e = CameraController_1.CameraController.CameraLocation, !(Math.pow(e.X - t.X, 2) + Math.pow(e.Y - t.Y, 2) + Math.pow(e.Z - t.Z, 2) < this.Foi)) && HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(t, this.jma)) {
      this.dce = true;
      this.koi.GetRootItem().SetAnchorOffset(this.jma.ToUeVector2D(true));
    } else {
      this.dce = false;
    }
  }
  uoi() {
    if (this.koi) {
      this.Woi();
      if (this.dce) {
        this.koi.TryShow();
      } else {
        this.koi.TryHide(true);
      }
    } else {
      this.foi();
    }
  }
  foi() {
    if (!this.v$e) {
      this.v$e = true;
      this.NewHudUnit(LockExecutionUnit_1.LockExecutionUnit, "UiItem_PutDeath", false).then(t => {
        if (t && !this.IsDestroyed) {
          this.v$e = false;
          this.koi = t;
          this.Woi();
          if (this.dce) {
            this.koi.TryShow();
          } else {
            this.koi.TryHide(false);
          }
        }
      }, () => {});
    }
  }
  joi() {
    if (this.koi) {
      this.koi.TryHide(true);
    }
  }
  Koi() {
    var t = this.sDe.Entity.GetComponent(1).Owner;
    if (t instanceof TsBaseCharacter_1.default) {
      return t.Mesh.D_GetSocketLocation(hitCaseSocket);
    }
  }
}
exports.LockExecutionHandle = LockExecutionHandle;
//# sourceMappingURL=LockExecutionHandle.js.map