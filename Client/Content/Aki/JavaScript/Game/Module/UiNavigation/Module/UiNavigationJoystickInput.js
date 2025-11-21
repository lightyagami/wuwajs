"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationJoystickInput = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiNavigationLogic_1 = require("../New/UiNavigationLogic");
class UiNavigationJoystickInput {
  static _d_(i) {
    if (!this.cd_) {
      var t = ModelManager_1.ModelManager.InputDistributeModel.GetAxisValue(InputMappingsDefine_1.axisMappings.NavigationTopDown);
      var s = ModelManager_1.ModelManager.InputDistributeModel.GetAxisValue(InputMappingsDefine_1.axisMappings.NavigationLeftRight);
      var n = this.Mwo(s);
      var a = this.Mwo(t);
      if (!n || !a || this.wut) {
        if (this.wut) {
          this.Ewo(s, t);
          n = this.Swo(s);
          a = this.Swo(t);
          if (n && a) {
            this.wut = false;
            this.ywo();
            this.Iwo();
            return;
          }
        }
        this.Lwo(s, t);
        this.Dwo(this.fgt, i);
        this.Rwo = s;
        this.Uwo = t;
        this.wut = true;
      }
    }
  }
  static uZd(i) {
    if (this.cZd && (UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(this.dd_, this.dZd), this.cZd = false, this.dZd === 1)) {
      this.dd_ = "";
    }
  }
  static ud_(i) {
    if (this.cd_) {
      this.Dwo(this.dd_, i);
    }
  }
  static Tick(i) {
    this._d_(i);
    this.uZd(i);
    this.ud_(i);
  }
  static Lwo(i, t) {
    var s = this.Mwo(i);
    var n = this.Mwo(t);
    if (!s || !n) {
      this.cz.Set(s ? 0 : i, n ? 0 : t, 0);
      if ((s = Vector_1.Vector.GetAngleByVector2D(this.cz)) >= -143 && s < -37) {
        this.Awo(InputMappingsDefine_1.actionMappings.Ui方向下);
      } else if (s >= -37 && s < 37) {
        this.Awo(InputMappingsDefine_1.actionMappings.Ui方向右);
      } else if (s >= 37 && s < 143) {
        this.Awo(InputMappingsDefine_1.actionMappings.Ui方向上);
      } else {
        this.Awo(InputMappingsDefine_1.actionMappings.Ui方向左);
      }
    }
  }
  static Mwo(i) {
    return Math.abs(i) < this.Pwo;
  }
  static Swo(i) {
    return Math.abs(i) < this.xwo;
  }
  static Awo(i) {
    if (i !== this.fgt) {
      this.fgt = i;
      this.wwo = false;
      this.Bwo = 0;
      this.bwo = this.qwo;
      this.Gwo = 1;
      UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(this.fgt, 0);
    }
  }
  static Iwo() {
    var i = this.fgt;
    if (!StringUtils_1.StringUtils.IsBlank(i)) {
      this.fgt = "";
      this.Bwo = 0;
      this.Rwo = 0;
      this.Uwo = 0;
      this.wwo = false;
      UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, 1);
    }
  }
  static Dwo(i, t) {
    if (!StringUtils_1.StringUtils.IsBlank(i)) {
      this.Bwo += t;
      if (this.Gwo === 0) {
        if (this.Bwo > this.Nwo) {
          this.Bwo -= this.Nwo;
          this.bwo = this.Owo;
          this.Gwo = 1;
          UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, 0);
        }
      } else if (this.Gwo === 1 && this.Bwo > this.bwo) {
        this.Bwo -= this.bwo;
        this.Gwo = 0;
        UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, 1);
      }
    }
  }
  static Ewo(i, t) {
    let s = 0;
    let n = 0;
    n = this.fgt === InputMappingsDefine_1.actionMappings.Ui方向右 || this.fgt === InputMappingsDefine_1.actionMappings.Ui方向上 ? (s = this.Rwo - i, this.Uwo - t) : (s = i - this.Rwo, t - this.Uwo);
    if (s > this.kwo || n > this.kwo) {
      this.wwo = true;
    }
  }
  static ywo() {
    if (this.wwo) {
      if (StringUtils_1.StringUtils.IsBlank(this.fgt)) {
        return;
      }
      var i = this.Fwo.get(this.fgt);
      for (const s of this.Vwo) {
        var t = s[0];
        if (!s[1]) {
          t(i);
        }
      }
    }
    for (const n of this.Vwo) {
      this.Vwo.set(n[0], false);
    }
  }
  static RegisterLeftJoystickFunction(i) {
    this.Vwo.set(i, this.wut);
  }
  static UnRegisterLeftJoystickFunction(i) {
    this.Vwo.delete(i);
  }
  static TriggerActionInputTick(i, t) {
    if (!this.wut && (!!StringUtils_1.StringUtils.IsBlank(this.dd_) || this.dd_ === i)) {
      if (t === 0) {
        this.dd_ = i;
        this.dZd = t;
        this.cZd = true;
        this.cd_ = true;
        this.Gwo = 1;
        this.Bwo = 0;
        this.bwo = this.qwo;
      } else {
        this.dd_ = i;
        this.dZd = t;
        this.cZd = true;
        this.cd_ = false;
        this.Gwo = 0;
      }
    }
  }
  static ResetJoystickActionInput() {
    if (!StringUtils_1.StringUtils.IsBlank(this.dd_)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "ResetJoystickActionInput");
      }
      UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(this.dd_, 1);
      this.dd_ = "";
      this.cd_ = false;
      this.dZd = undefined;
      this.cZd = false;
      this.Gwo = 0;
    }
  }
}
(exports.UiNavigationJoystickInput = UiNavigationJoystickInput).Pwo = 0.7;
UiNavigationJoystickInput.xwo = 0.2;
UiNavigationJoystickInput.kwo = 0.2;
UiNavigationJoystickInput.fgt = "";
UiNavigationJoystickInput.qwo = 500;
UiNavigationJoystickInput.Owo = 100;
UiNavigationJoystickInput.Nwo = 100;
UiNavigationJoystickInput.bwo = 0;
UiNavigationJoystickInput.Bwo = 0;
UiNavigationJoystickInput.Gwo = undefined;
UiNavigationJoystickInput.cz = Vector_1.Vector.Create();
UiNavigationJoystickInput.wut = false;
UiNavigationJoystickInput.dd_ = "";
UiNavigationJoystickInput.dZd = undefined;
UiNavigationJoystickInput.cd_ = false;
UiNavigationJoystickInput.cZd = false;
UiNavigationJoystickInput.Fwo = new Map([[InputMappingsDefine_1.actionMappings.Ui方向下, 0], [InputMappingsDefine_1.actionMappings.Ui方向右, 3], [InputMappingsDefine_1.actionMappings.Ui方向上, 1], [InputMappingsDefine_1.actionMappings.Ui方向左, 2]]);
UiNavigationJoystickInput.Vwo = new Map();
UiNavigationJoystickInput.Rwo = 0;
UiNavigationJoystickInput.Uwo = 0;
UiNavigationJoystickInput.wwo = false; //# sourceMappingURL=UiNavigationJoystickInput.js.map