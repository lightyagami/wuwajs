"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialTransitionView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const SpineBackgroundById_1 = require("../../../Core/Define/ConfigQuery/SpineBackgroundById");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const BlackScreenFadeController_1 = require("../BlackScreen/BlackScreenFadeController");
class SpecialTransitionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.pDe = undefined;
    this.nOd = undefined;
    this.EFc = -1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.pDe = this.OpenParam;
    var i = BlackScreenFadeController_1.BlackScreenFadeController.GetHierarchyIndex();
    this.RootItem?.SetHierarchyIndex(i);
    await this.Ovi();
  }
  OnBeforeHide() {
    if (this.EFc !== -1) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.EFc, 0);
      this.EFc = -1;
    }
  }
  async Ovi() {
    if (this.pDe?.SpineId !== undefined) {
      await this.LoadSpine(this.pDe.SpineId, true);
    }
    if (this.pDe?.BgPath !== undefined) {
      this.LoadTextureBg(this.pDe.BgPath);
    }
    if (this.pDe?.CustomShowUi?.IsHideCircle === undefined || !!this.pDe?.CustomShowUi?.IsHideCircle) {
      this.GetItem(3).SetUIActive(false);
    }
    if (this.pDe?.AkEvent !== undefined) {
      this.MZi(this.pDe.AkEvent);
    }
  }
  MZi(i) {
    if (!StringUtils_1.StringUtils.IsEmpty(i)) {
      if (i = (0, AudioSystem_1.parseAudioEventPath)(i)) {
        this.EFc = AudioSystem_1.AudioSystem.PostEvent(i);
      }
    }
  }
  async LoadSpine(i, t) {
    var r = SpineBackgroundById_1.configSpineBackgroundById.GetConfig(i);
    if (r) {
      let i = undefined;
      let e = undefined;
      e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? (i = StringUtils_1.StringUtils.IsEmpty(r.UiPrefabIdMaleVariant) ? r.UiPrefabId : r.UiPrefabIdMaleVariant, StringUtils_1.StringUtils.IsEmpty(r.AnimationNameMaleVariant) ? r.AnimationName : r.AnimationNameMaleVariant) : (i = r.UiPrefabId, r.AnimationName);
      r = this.GetItem(1);
      this.nOd = new ChildSpineView();
      try {
        await this.nOd.CreateThenShowByResourceIdAsync(i, r);
      } catch (i) {
        if (i instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Loading", 87, "SpecialTransitionView LoadSpine 异常", i, ["error", i.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Loading", 87, "SpecialTransitionView LoadSpine 异常", ["error", i]);
        }
      }
      this.nOd.PlaySpineAnimation(e, t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Loading", 87, "SpecialTransitionView LoadSpine 配置不存在", ["id", i]);
    }
  }
  LoadTextureBg(i) {
    this.TrySetTextureByPath(i, this.GetTexture(2));
  }
}
exports.SpecialTransitionView = SpecialTransitionView;
class ChildSpineView extends UiPanelBase_1.UiPanelBase {
  PlaySpineAnimation(e, t = true) {
    var i = (0, puerts_1.$ref)(undefined);
    if (e !== undefined && e !== "") {
      this.RootItem?.GetAllAttachUIChildren(i);
      var r = (0, puerts_1.$unref)(i);
      for (let i = 0; i < r.Num(); i++) {
        var s = r.Get(i);
        if (s.IsA(UE.UISpineRenderable.StaticClass()) && (s = s.GetOwner().GetComponentByClass(UE.SpineSkeletonAnimationComponent.StaticClass())) && (s.SetAnimation(0, e, t), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Loading", 87, "SpecialTransitionView 播放Spine动画", ["spineName", e], ["isLoop", t]);
        }
      }
    }
  }
}
//# sourceMappingURL=SpecialTransitionView.js.map