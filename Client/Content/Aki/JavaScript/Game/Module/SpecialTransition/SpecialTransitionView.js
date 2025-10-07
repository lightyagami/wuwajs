"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialTransitionView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
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
    this.oBd = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem]];
  }
  OnStart() {
    this.pDe = this.OpenParam;
    var i = BlackScreenFadeController_1.BlackScreenFadeController.GetHierarchyIndex();
    this.RootItem?.SetHierarchyIndex(i);
    this.Ovi();
  }
  Ovi() {
    if (this.pDe?.SpineId !== undefined) {
      this.LoadSpine(this.pDe.SpineId, true);
    }
    if (this.pDe?.BgPath !== undefined) {
      this.LoadTextureBg(this.pDe.BgPath);
    }
    if (this.pDe?.CustomShowUi?.IsHideCircle === undefined || !!this.pDe?.CustomShowUi?.IsHideCircle) {
      this.GetItem(3).SetUIActive(false);
    }
  }
  async LoadSpine(i, r) {
    var t = SpineBackgroundById_1.configSpineBackgroundById.GetConfig(i);
    if (t) {
      let i = undefined;
      let e = undefined;
      e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? (i = StringUtils_1.StringUtils.IsEmpty(t.UiPrefabIdMaleVariant) ? t.UiPrefabId : t.UiPrefabIdMaleVariant, StringUtils_1.StringUtils.IsEmpty(t.AnimationNameMaleVariant) ? t.AnimationName : t.AnimationNameMaleVariant) : (i = t.UiPrefabId, t.AnimationName);
      t = this.GetItem(1);
      this.oBd = new ChildSpineView();
      try {
        await this.oBd.CreateThenShowByResourceIdAsync(i, t);
      } catch (i) {
        if (i instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Loading", 87, "SpecialTransitionView LoadSpine 异常", i, ["error", i.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Loading", 87, "SpecialTransitionView LoadSpine 异常", ["error", i]);
        }
      }
      this.oBd.PlaySpineAnimation(e, r);
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
  PlaySpineAnimation(e, r = true) {
    var i = (0, puerts_1.$ref)(undefined);
    if (e !== undefined && e !== "") {
      this.RootItem?.GetAllAttachUIChildren(i);
      var t = (0, puerts_1.$unref)(i);
      for (let i = 0; i < t.Num(); i++) {
        var o = t.Get(i);
        if (o.IsA(UE.UISpineRenderable.StaticClass()) && (o = o.GetOwner().GetComponentByClass(UE.SpineSkeletonAnimationComponent.StaticClass())) && (o.SetAnimation(0, e, r), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Loading", 87, "SpecialTransitionView 播放Spine动画", ["spineName", e], ["isLoop", r]);
        }
      }
    }
  }
}
//# sourceMappingURL=SpecialTransitionView.js.map