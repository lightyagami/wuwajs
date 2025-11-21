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
    this.DQu = undefined;
    this.Vyu = new Set();
    this.jyu = [];
    this.TDe = undefined;
    this.ST1 = undefined;
    this.Hyu = undefined;
    this.ARu = undefined;
    this.PQu = undefined;
    this.J_ = e => {
      for (const i of this.Vyu) {
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
    }, 100, this.MemoryTag);
    await i.Promise;
  }
  OnStart() {
    this.Hyu = this.GetItem(1);
    this.Hyu.SetUIActive(false);
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
  async $yu() {
    let e = undefined;
    var i;
    if (this.jyu.length > 0) {
      e = this.jyu.pop();
    } else {
      i = this.GetItem(0);
      e = new FloroRanchPopupRewardItem_1.FloroRanchPopupRewardItem();
      i = LguiUtil_1.LguiUtil.CopyItem(this.Hyu, i);
      await e.CreateThenShowByActorAsync(i.GetOwner());
      e.InitCurve(this.ST1);
    }
    return e;
  }
  SSu(e) {
    this.Vyu.delete(e);
    this.jyu.push(e);
  }
  BindCoinTargetPos(e) {
    this.DQu = Vector_1.Vector.Create(e.X, e.Y, e.Z);
  }
  BindCoinChangeCallBack(e) {
    this.ARu = e;
  }
  BindDiamondChangeCallBack(e) {
    this.PQu = e;
  }
  async ShowPopupReward(e, i, a) {
    var r = Vector_1.Vector.Create();
    var t = e.GetRewardPopTransform();
    if (t) {
      Vector_1.Vector.Create(t.GetLocation()).Addition(FloroRanchDefine_1.floroRanchPopupRewardOffset, r);
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        if (i === 0) {
          this.ARu(a);
        } else if (i === 1) {
          this.PQu(a);
        }
      } else {
        var o = await this.$yu();
        this.Vyu.add(o);
        o.FollowPosition(r);
        e.ShowCoinNiagara(a);
        switch (i) {
          case 0:
            await this.MSu(r, o, a);
            break;
          case 1:
            await this.ESu(r, o, a);
            break;
          case 2:
            await this.ISu(r, o, a);
        }
      }
    }
  }
  async MSu(e, i, a) {
    if (this.DQu) {
      var r = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(1);
      i.Refresh(a, r.GetSmallIcon());
      i.PlayShowRewardAnim();
      const t = Vector_1.Vector.Create();
      e.Addition(FloroRanchDefine_1.floroRanchPopupRewardOffset, t);
      const o = this.DQu;
      i.PopupReward(e, t, () => {
        AudioSystem_1.AudioSystem.PostEvent("play_ui_muchang_itemcost_close");
        i.PlayBezierCurve(t, o, () => {
          i.PlayCloseRewardAnim().then(() => {
            this.SSu(i);
          });
          this.ARu(a);
        });
      });
      await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_REWARD_COIN_BEZIER_WAIT_TIME);
    }
  }
  async ESu(e, i, a) {
    var r = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(2);
    i.Refresh(a, r.GetSmallIcon());
    i.PlayShowRewardAnim();
    var r = Vector_1.Vector.Create();
    e.Addition(FloroRanchDefine_1.floroRanchPopupRewardOffset, r);
    i.PopupReward(e, r, () => {
      i.PlayHideRewardAnim().then(() => {
        this.SSu(i);
      });
      this.PQu(a);
    });
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetPopupRewardWaitTime();
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(e);
  }
  async ISu(e, i, a) {
    var r = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(3);
    i.Refresh(a, r.GetSmallIcon());
    i.PlayShowRewardAnim();
    var a = Vector_1.Vector.Create();
    e.Addition(FloroRanchDefine_1.floroRanchPopupRewardOffset, a);
    i.PopupReward(e, a, () => {
      i.PlayHideRewardAnim().then(() => {
        this.SSu(i);
      });
    });
    var r = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetPopupRewardWaitTime();
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(r);
  }
}
exports.FloroRanchPopupRewardPanel = FloroRanchPopupRewardPanel;
//# sourceMappingURL=FloroRanchPopupRewardPanel.js.map