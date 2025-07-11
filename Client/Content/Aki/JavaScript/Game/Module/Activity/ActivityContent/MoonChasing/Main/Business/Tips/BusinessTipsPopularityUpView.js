"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessTipsPopularityUpView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../../../../Core/Common/Log");
const GlobalData_1 = require("../../../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase");
const UiViewData_1 = require("../../../../../../../Ui/Define/UiViewData");
const LguiUtil_1 = require("../../../../../../Util/LguiUtil");
const TWEEN_TIME = 2;
class BusinessTipsPopularityUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ExpTweener = undefined;
    this.Delegate = undefined;
    this.efa = undefined;
    this.PopularityValue = 0;
    this.P1a = 0;
    this.Oko = 0;
    this.w1a = undefined;
    this.B1a = undefined;
    this.b1a = undefined;
    this.Mke = () => {
      this.CloseMe();
    };
    this.OAn = i => {
      this.b1a.SetFillAmount(i / this.PopularityValue);
      this.B1a.SetText("<color=#ffd52b>" + i + "</color>/" + this.PopularityValue);
    };
    this.q1a = (i, t) => {
      this.gzi();
      if (!(t >= this.P1a)) {
        this.G1a(i, t + 1);
        AudioSystem_1.AudioSystem.PostEvent("play_ui_zhuiyuejie_levelup");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIItem], [11, UE.SpineSkeletonAnimationComponent], [12, UE.UIItem], [13, UE.UITexture]];
    this.BtnBindInfo = [[4, this.Mke]];
  }
  Qpa() {
    var i;
    if (this.efa.LastPopularity >= this.efa.CurrentPopularity) {
      (i = new UiViewData_1.UiViewData()).StartSequenceName = "Start01";
      this.UiViewSequence?.SetSequenceName(i);
    }
  }
  async OnBeforeStartAsync() {
    var i;
    var t;
    this.efa = this.OpenParam;
    if (this.efa === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MoonChasing", 58, "BusinessTipsPopularityUpView无效输入");
      }
    } else {
      this.Qpa();
      this.b1a = this.GetSprite(8);
      this.w1a = this.GetSprite(7);
      this.B1a = this.GetText(6);
      this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn);
      i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(this.efa.CurrentPopularity);
      t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(this.efa.LastPopularity);
      this.PopularityValue = t.PopularityValue;
      this.P1a = i.Id - t.Id + 1;
      await Promise.all([this.ooa(this.P1a > 1), this.noa(this.P1a > 1)]);
      this.soa();
      this.aoa(this.P1a > 1);
      this.XNi();
      this.hoa();
      this.GetButton(4)?.RootUIComp.SetUIActive(false);
    }
  }
  OnAfterPlayStartSequence() {
    this.UiViewSequence?.PlaySequencePurely("PopStart");
    var i = this.efa.CurrentPopularity;
    var t = this.efa.LastPopularity;
    var i = i - t;
    this.Kpa();
    if (i > 0) {
      this.O1a(t);
    }
  }
  OnBeforeDestroy() {
    if (this.Delegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.OAn);
      this.Delegate = undefined;
    }
    this.gzi();
    AudioSystem_1.AudioSystem.ExecuteAction("play_ui_figure_up_2s", 0);
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(false);
  }
  async ooa(i) {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(this.efa.RoleId);
    await this.SetSpineAssetByPath(t.SmallSpineAtlas, t.SmallSpineSkeletonData, this.GetSpine(11));
    var t = i ? "happy" : "idle";
    this.GetSpine(11).SetAnimation(0, t, true);
  }
  async noa(i) {
    i = i ? "EntrustTipsBgBigSuccess" : "EntrustTipsBgNoPromotion";
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    await this.SetTextureAsync(i, this.GetTexture(13));
  }
  soa() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.efa.DialogName);
  }
  aoa(i) {
    this.GetItem(9)?.SetUIActive(i);
    this.GetItem(10)?.SetUIActive(!i);
    this.GetItem(12)?.SetUIActive(i);
  }
  XNi() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.efa.Title);
  }
  hoa() {
    var i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetCurrentPopularityConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.PopularityRating);
    var i = this.efa.CurrentPopularity;
    var t = this.efa.LastPopularity;
    var i = i - t;
    this.GetText(5)?.SetUIActive(i > 0);
    if (i > 0) {
      this.GetText(5)?.SetText("+" + i);
    }
    this.GetSprite(8)?.SetFillAmount(t / this.PopularityValue);
    this.w1a.SetFillAmount(t / this.PopularityValue);
    this.B1a.SetText("<color=#ffd52b>" + t + "</color>/" + this.PopularityValue);
  }
  O1a(i) {
    AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_2s");
    this.Oko = TWEEN_TIME / this.P1a;
    this.G1a(i, 1);
  }
  G1a(i, t) {
    var s = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(i);
    this.PopularityValue = s.PopularityValue;
    if (this.P1a > t) {
      this.w1a.SetFillAmount(1);
      this.ExpTweener = UE.LTweenBPLibrary.IntTo(GlobalData_1.GlobalData.World, this.Delegate, i, this.PopularityValue, this.Oko);
      this.ExpTweener?.OnCompleteCallBack.Bind(() => {
        this.q1a(this.PopularityValue, t);
      });
    } else {
      const e = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
      this.w1a.SetFillAmount(e / this.PopularityValue);
      this.ExpTweener = UE.LTweenBPLibrary.IntTo(GlobalData_1.GlobalData.World, this.Delegate, i, e, this.Oko);
      this.ExpTweener?.OnCompleteCallBack.Bind(() => {
        this.q1a(e, t);
      });
    }
  }
  gzi() {
    if (this.ExpTweener) {
      this.ExpTweener.Kill();
      this.ExpTweener = undefined;
    }
  }
  Kpa() {
    this.GetButton(4)?.RootUIComp.SetUIActive(true);
    this.UiViewSequence?.PlaySequencePurely("BtnStart");
  }
}
exports.BusinessTipsPopularityUpView = BusinessTipsPopularityUpView;
//# sourceMappingURL=BusinessTipsPopularityUpView.js.map