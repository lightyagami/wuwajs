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
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchUiItemBaseComponent_1 = require("./FloroRanchUiItemBaseComponent");
let FloroRanchUiCardComponent = class FloroRanchUiCardComponent extends FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent {
  constructor() {
    super(...arguments);
    this.wpu = undefined;
  }
  async PlayShowAnim() {
    this.wpu ||= await this.CreateUiItem();
    if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      await this.ShowUiItem();
    } else {
      await this.wpu.PlayShowAnim();
    }
    return this.wpu;
  }
  async CreateUiItem() {
    var i = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (i) {
      return i.BindSpineItem(this.OwnerEntity);
    }
  }
  async PlayHideAnim() {
    if (this.wpu) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        await this.HideUiItem();
      } else {
        await this.wpu.PlayHideAnim();
      }
      this.wpu.UnbindData();
      this.wpu = undefined;
    }
  }
  async ShowUiItem() {
    if (this.wpu) {
      await this.wpu.ShowUiItem();
    }
  }
  async HideUiItem() {
    if (this.wpu) {
      await this.wpu.HideUiItem();
    }
  }
  async PlayNormalAnim() {
    if (!!this.wpu && !ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      this.PlayVideo();
      await this.wpu.PlayNormalAnim();
    }
  }
  Pause() {
    if (this.wpu) {
      this.wpu.Pause();
    }
  }
  Resume() {
    if (this.wpu) {
      this.wpu.Resume();
    }
  }
  OnExit() {
    if (this.wpu) {
      this.wpu.UnbindData();
      this.wpu = undefined;
    }
  }
  GetUiItem() {
    if (!this.wpu) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("FloroRanchGamePlay", 78, "FloroRanchUiCardComponent GetUiItem 实体不存在", ["entityId", this.OwnerEntity.EntityId]);
      }
    }
    return this.wpu;
  }
  async MoveToTarget(i) {
    if (this.wpu) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        this.wpu.MoveToOriginalPositionImmediate();
      } else {
        this.wpu.SetLayerTop();
        await this.wpu.MoveToItem(i.GetRootItem());
      }
    }
  }
  async MoveToOriginalPosition() {
    if (this.wpu) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        this.wpu.MoveToOriginalPositionImmediate();
      } else {
        this.wpu.ResetLayer();
        await this.wpu.MoveToOriginalPosition();
      }
    }
  }
  RefreshEvolveItem() {
    if (this.wpu) {
      this.wpu.RefreshEvolveItem();
    }
  }
  RefreshRemainTimeItem() {
    if (this.wpu) {
      this.wpu.RefreshRemainTimeItem();
    }
  }
  async PlayEatAnim() {
    if (!!this.wpu && !ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      this.PlayVideo();
      await this.wpu.PlayEatAnim();
    }
  }
  async PlayBeEatAnim() {
    if (this.wpu) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        await this.HideUiItem();
      } else {
        this.PlayVideo();
        await this.wpu.PlayBeEatAnim();
      }
      this.wpu.UnbindData();
      this.wpu = undefined;
    }
  }
  async PlaySacrificeAnim() {
    if (this.wpu) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        await this.HideUiItem();
      } else {
        this.PlayVideo();
        await this.wpu.PlaySacrificeAnim();
      }
      if (!this.CheckIsExit()) {
        this.wpu.UnbindData();
        this.wpu = undefined;
      }
    }
  }
  async PlayFusionHideAnim() {
    if (this.wpu) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        await this.HideUiItem();
      } else {
        this.PlayVideo();
        await this.wpu.PlayFusionHideAnim();
      }
      this.wpu.UnbindData();
      this.wpu = undefined;
    }
  }
  async PlayFusionShowAnim() {
    this.wpu ||= await this.CreateUiItem();
    if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      await this.ShowUiItem();
    } else {
      this.PlayVideo();
      await this.wpu.PlayFusionShowAnim();
    }
  }
  async PlayEvolveUpAnim() {
    if (!!this.wpu && !ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      this.PlayVideo();
      await this.wpu.PlayEvolveUpAnim();
    }
  }
  PlayVideo() {
    var i;
    if (this.wpu && !ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      i = this.OwnerEntity.CheckGetComponent(1).CardData;
      AudioSystem_1.AudioSystem.PostEvent(i.Video);
    }
  }
};
FloroRanchUiCardComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(9)], FloroRanchUiCardComponent);
exports.FloroRanchUiCardComponent = FloroRanchUiCardComponent; //# sourceMappingURL=FloroRanchUiCardComponent.js.map