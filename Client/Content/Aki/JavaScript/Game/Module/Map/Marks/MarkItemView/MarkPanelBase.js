"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkPanelBase = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiActorPool_1 = require("../../../../Ui/UiActorPool");
const MarkSpritePool_1 = require("../../Container/MarkSpritePool");
class MarkPanelBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.Dh_ = undefined;
    this.NPt = undefined;
    this.LoadingPromiseInner = undefined;
    this.iBc = undefined;
    this.SkipDestroyActor = true;
  }
  get LoadingPromise() {
    return this.LoadingPromiseInner;
  }
  async CreateByPoolResourceIdAsync(i, t) {
    await this.Bh_(i, t);
    if (!this.IsDestroyOrDestroying && !this.WaitToDestroy && !!t?.GetOwner()?.IsValid()) {
      await this.CreateByActorAsync(this.Dh_.Actor, t);
    }
  }
  async CreateThenShowByPoolResourceIdAsync(i, t) {
    await this.Bh_(i, t);
    if (!this.IsDestroyOrDestroying && !this.WaitToDestroy && !!t?.GetOwner()?.IsValid()) {
      await this.CreateThenShowByActorAsync(this.Dh_.Actor, t);
    }
  }
  async Bh_(i, t) {
    this.NPt = i;
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    if (t !== undefined) {
      this.Dh_ = await UiActorPool_1.UiActorPool.GetAsync(i);
      this.Dh_.UiItem.SetUIParent(t);
    }
  }
  RecycleToPool() {
    this.qh_();
  }
  async qh_() {
    if (this.LoadingPromise) {
      await this.LoadingPromise;
      this.LoadingPromiseInner = undefined;
    }
    this.Destroy();
    if (this.Dh_ !== undefined) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.Dh_, this.NPt);
      this.Dh_ = undefined;
    }
  }
  OnAfterHide() {
    MarkSpritePool_1.MarkSpritePool.UnRef(this.ComponentId);
  }
  SetSpriteByPath(t, s, i, e = undefined, o = undefined) {
    var r;
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      o?.(false);
    } else if ((r = MarkSpritePool_1.MarkSpritePool.Get(this.ComponentId, t))?.IsValid()) {
      s.SetSprite(r, i);
      if (o) {
        o(true);
      }
    } else {
      super.SetSpriteByPath(t, s, i, e, i => {
        if (i) {
          MarkSpritePool_1.MarkSpritePool.Ref(this.ComponentId, t, s.GetSprite());
        }
        if (o) {
          o(i);
        }
      });
    }
  }
  SetVisible(i) {
    if (i) {
      this.rBc();
      if (!this.RootItem?.bIsUIActive) {
        this.SetUiActive(true);
      }
    } else {
      this.oBc();
      this.RootItem.SetAnchorOffsetX(MathUtils_1.MathUtils.Int32Max);
    }
  }
  oBc() {
    this.iBc = this.RootItem.GetAnchorOffsetX();
  }
  rBc() {
    if (this.iBc !== undefined) {
      this.RootItem.SetAnchorOffsetX(this.iBc);
    }
  }
}
exports.MarkPanelBase = MarkPanelBase;
//# sourceMappingURL=MarkPanelBase.js.map