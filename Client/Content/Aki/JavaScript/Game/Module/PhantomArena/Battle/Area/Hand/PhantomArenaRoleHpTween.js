"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaRoleHpTween = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  LoadAsyncPromise_1 = require("../../../../UiComponent/LoadAsyncPromise"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaRoleHpTween {
  constructor() {
    this.RoleItem = void 0, this.MaxLifeNum = 0, this.CurveDamage = void 0, this.Tweener = void 0, this.Delegate = void 0, this.vlu = e => {
      this.RoleItem.RefreshLifeNumTween(e, this.MaxLifeNum)
    }, this.Uau = () => {
      this.Tweener && (this.Tweener = void 0)
    }, this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.vlu)
  }
  SetRoleItem(e) {
    this.RoleItem = e
  }
  async InitCurveDamage() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleDamage"),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat);
    this.CurveDamage = await e.Promise
  }
  PlayHpTween(e, t, i) {
    this.MaxLifeNum = i, this.RoleItem.RefreshLifeNumTweenStart(t, i), this.RoleItem.RefreshLifeNumTween(e, this.MaxLifeNum), this.Tweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, e, t, PhantomArenaDefine_1.DAMAGE_TWEEN_TIME), this.Tweener && (this.Tweener.SetEase(28), this.Tweener.SetCurveFloat(this.CurveDamage), this.Tweener.OnCompleteCallBack.Bind(this.Uau))
  }
  Clear() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.vlu), this.CurveDamage = void 0
  }
}
exports.PhantomArenaRoleHpTween = PhantomArenaRoleHpTween;
//# sourceMappingURL=PhantomArenaRoleHpTween.js.map