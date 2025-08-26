"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRoleHpTween = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const GlobalData_1 = require("../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const LoadAsyncPromise_1 = require("../../../../UiComponent/LoadAsyncPromise");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaRoleHpTween {
  constructor() {
    this.RoleItem = undefined;
    this.MaxLifeNum = 0;
    this.CurveDamage = undefined;
    this.Tweener = undefined;
    this.Delegate = undefined;
    this.vCu = e => {
      this.RoleItem.RefreshLifeNumTween(e, this.MaxLifeNum);
    };
    this.Mmu = () => {
      this.Tweener &&= undefined;
    };
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.vCu);
  }
  SetRoleItem(e) {
    this.RoleItem = e;
  }
  async InitCurveDamage() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleDamage");
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat);
    this.CurveDamage = await e.Promise;
  }
  PlayHpTween(e, t, i) {
    this.MaxLifeNum = i;
    this.RoleItem.RefreshLifeNumTweenStart(t, i);
    this.RoleItem.RefreshLifeNumTween(e, this.MaxLifeNum);
    this.Tweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, e, t, PhantomArenaDefine_1.DAMAGE_TWEEN_TIME);
    if (this.Tweener) {
      this.Tweener.SetEase(28);
      this.Tweener.SetCurveFloat(this.CurveDamage);
      this.Tweener.OnCompleteCallBack.Bind(this.Mmu);
    }
  }
  Clear() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.vCu);
    this.CurveDamage = undefined;
  }
}
exports.PhantomArenaRoleHpTween = PhantomArenaRoleHpTween;
//# sourceMappingURL=PhantomArenaRoleHpTween.js.map