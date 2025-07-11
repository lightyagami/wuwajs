"use strict";

var __decorate = this && this.__decorate || function (i, t, a, e) {
  var s;
  var o = arguments.length;
  var n = o < 3 ? t : e === null ? e = Object.getOwnPropertyDescriptor(t, a) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(i, t, a, e);
  } else {
    for (var h = i.length - 1; h >= 0; h--) {
      if (s = i[h]) {
        n = (o < 3 ? s(n) : o > 3 ? s(t, a, n) : s(t, a)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(t, a, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiCardComponent = undefined;
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchUiItemBaseComponent_1 = require("./FloroRanchUiItemBaseComponent");
let FloroRanchUiCardComponent = class FloroRanchUiCardComponent extends FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent {
  constructor() {
    super(...arguments);
    this.A0u = undefined;
  }
  async PlayShowAnim() {
    this.A0u ||= await this.CreateUiItem();
    if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      await this.ShowUiItem();
    } else {
      await this.A0u.PlayShowAnim();
    }
    return this.A0u;
  }
  async CreateUiItem() {
    var i = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (i) {
      return i.BindSpineItem(this.OwnerEntity);
    }
  }
  async PlayHideAnim() {
    if (this.A0u) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        await this.HideUiItem();
      } else {
        await this.A0u.PlayHideAnim();
      }
      this.A0u.UnbindData();
      this.A0u = undefined;
    }
  }
  async ShowUiItem() {
    if (this.A0u) {
      await this.A0u.ShowUiItem();
    }
  }
  async HideUiItem() {
    if (this.A0u) {
      await this.A0u.HideUiItem();
    }
  }
  async PlayNormalAnim() {
    if (!!this.A0u && !ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      this.PlayVideo();
      await this.A0u.PlayNormalAnim();
    }
  }
  Pause() {
    if (this.A0u) {
      this.A0u.Pause();
    }
  }
  Resume() {
    if (this.A0u) {
      this.A0u.Resume();
    }
  }
  GetUiItem() {
    return this.A0u;
  }
  async MoveToTarget(i) {
    if (this.A0u) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        this.A0u.MoveToOriginalPositionImmediate();
      } else {
        this.A0u.SetLayerTop();
        await this.A0u.MoveToItem(i.GetRootItem());
      }
    }
  }
  async MoveToOriginalPosition() {
    if (this.A0u) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        this.A0u.MoveToOriginalPositionImmediate();
      } else {
        this.A0u.ResetLayer();
        await this.A0u.MoveToOriginalPosition();
      }
    }
  }
  RefreshEvolveItem() {
    if (this.A0u) {
      this.A0u.RefreshEvolveItem();
    }
  }
  RefreshRemainTimeItem() {
    if (this.A0u) {
      this.A0u.RefreshRemainTimeItem();
    }
  }
  async PlayEatAnim() {
    if (!!this.A0u && !ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      this.PlayVideo();
      await this.A0u.PlayEatAnim();
    }
  }
  async PlayBeEatAnim() {
    if (this.A0u) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        await this.HideUiItem();
      } else {
        this.PlayVideo();
        await this.A0u.PlayBeEatAnim();
      }
      this.A0u.UnbindData();
      this.A0u = undefined;
    }
  }
  async PlaySacrificeAnim() {
    if (this.A0u) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        await this.HideUiItem();
      } else {
        this.PlayVideo();
        await this.A0u.PlaySacrificeAnim();
      }
      this.A0u.UnbindData();
      this.A0u = undefined;
    }
  }
  async PlayFusionHideAnim() {
    if (this.A0u) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        await this.HideUiItem();
      } else {
        this.PlayVideo();
        await this.A0u.PlayFusionHideAnim();
      }
      this.A0u.UnbindData();
      this.A0u = undefined;
    }
  }
  async PlayFusionShowAnim() {
    this.A0u ||= await this.CreateUiItem();
    if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      await this.ShowUiItem();
    } else {
      this.PlayVideo();
      await this.A0u.PlayFusionShowAnim();
    }
  }
  async PlayEvolveUpAnim() {
    if (!!this.A0u && !ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      this.PlayVideo();
      await this.A0u.PlayEvolveUpAnim();
    }
  }
  PlayVideo() {
    var i;
    if (this.A0u && !ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      i = this.OwnerEntity.CheckGetComponent(1).CardData;
      AudioSystem_1.AudioSystem.PostEvent(i.Video);
    }
  }
};
FloroRanchUiCardComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(9)], FloroRanchUiCardComponent);
exports.FloroRanchUiCardComponent = FloroRanchUiCardComponent; //# sourceMappingURL=FloroRanchUiCardComponent.js.map