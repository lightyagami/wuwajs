"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchPopupRewardPanel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FloroRanchDefine_1 = require("../../FloroRanchDefine");
const FloroRanchPopupRewardItem_1 = require("./FloroRanchPopupRewardItem");
class FloroRanchPopupRewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.gHc = undefined;
    this.Hvu = new Set();
    this.$vu = [];
    this.TDe = undefined;
    this.ST1 = undefined;
    this.Wvu = undefined;
    this.aRu = undefined;
    this.mHc = undefined;
    this.J_ = e => {
      for (const i of this.Hvu) {
        i.Tick(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    const i = new CustomPromise_1.CustomPromise();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("RacingBetsRankChangeCurve");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      this.ST1 = e;
      i.SetResult(undefined);
    });
    await i.Promise;
  }
  OnStart() {
    this.Wvu = this.GetItem(1);
    this.Wvu.SetUIActive(false);
  }
  OnBeforeShow() {
    this.TDe = ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Forever(this.J_, TimerSystem_1.MIN_TIME);
  }
  OnBeforeHide() {
    if (this.TDe) {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  async Qvu() {
    let e = undefined;
    var i;
    if (this.$vu.length > 0) {
      e = this.$vu.pop();
    } else {
      i = this.GetItem(0);
      e = new FloroRanchPopupRewardItem_1.FloroRanchPopupRewardItem();
      i = LguiUtil_1.LguiUtil.CopyItem(this.Wvu, i);
      await e.CreateThenShowByActorAsync(i.GetOwner());
      e.InitCurve(this.ST1);
    }
    return e;
  }
  Eyu(e) {
    this.Hvu.delete(e);
    this.$vu.push(e);
  }
  BindCoinTargetPos(e) {
    this.gHc = Vector_1.Vector.Create(e.X, e.Y, e.Z);
  }
  BindCoinChangeCallBack(e) {
    this.aRu = e;
  }
  BindDiamondChangeCallBack(e) {
    this.mHc = e;
  }
  async ShowPopupReward(e, i, a) {
    if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      if (i === 0) {
        this.aRu(a);
      } else if (i === 1) {
        this.mHc(a);
      }
    } else {
      var r = await this.Qvu();
      this.Hvu.add(r);
      var o = Vector_1.Vector.Create();
      Vector_1.Vector.Create(e.GetRootActor().GetTransform().GetLocation()).Addition(FloroRanchDefine_1.floroRanchPopupRewardOffset, o);
      r.FollowPosition(o);
      e.ShowCoinNiagara(a);
      switch (i) {
        case 0:
          await this.Iyu(o, r, a);
          break;
        case 1:
          await this.Tyu(o, r, a);
          break;
        case 2:
          await this.byu(o, r, a);
      }
    }
  }
  async Iyu(e, i, a) {
    if (this.gHc) {
      var r = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(1);
      i.Refresh(a, r.GetSmallIcon());
      i.PlayShowRewardAnim();
      const o = Vector_1.Vector.Create();
      e.Addition(FloroRanchDefine_1.floroRanchPopupRewardOffset, o);
      const t = this.gHc;
      i.PopupReward(e, o, () => {
        AudioSystem_1.AudioSystem.PostEvent("play_ui_muchang_itemcost_close");
        i.PlayBezierCurve(o, t, () => {
          i.PlayCloseRewardAnim().then(() => {
            this.Eyu(i);
          });
          this.aRu(a);
        });
      });
      await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_REWARD_COIN_BEZIER_WAIT_TIME);
    }
  }
  async Tyu(e, i, a) {
    var r = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(2);
    i.Refresh(a, r.GetSmallIcon());
    i.PlayShowRewardAnim();
    var r = Vector_1.Vector.Create();
    e.Addition(FloroRanchDefine_1.floroRanchPopupRewardOffset, r);
    i.PopupReward(e, r, () => {
      i.PlayHideRewardAnim().then(() => {
        this.Eyu(i);
      });
      this.mHc(a);
    });
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_REWARD_POPUP_WAIT_TIME);
  }
  async byu(e, i, a) {
    var r = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(3);
    i.Refresh(a, r.GetSmallIcon());
    i.PlayShowRewardAnim();
    var a = Vector_1.Vector.Create();
    e.Addition(FloroRanchDefine_1.floroRanchPopupRewardOffset, a);
    i.PopupReward(e, a, () => {
      i.PlayHideRewardAnim().then(() => {
        this.Eyu(i);
      });
    });
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_REWARD_POPUP_WAIT_TIME);
  }
}
exports.FloroRanchPopupRewardPanel = FloroRanchPopupRewardPanel;
//# sourceMappingURL=FloroRanchPopupRewardPanel.js.map