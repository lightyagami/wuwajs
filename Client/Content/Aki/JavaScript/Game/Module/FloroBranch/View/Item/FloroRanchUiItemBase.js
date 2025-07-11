"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiItemBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const FloroRanchDefine_1 = require("../../FloroRanchDefine");
class FloroRanchUiItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Entity = undefined;
    this.CanBindEntity = true;
    this.OnEntityChangedCallback = i => {};
  }
  GetEntity() {
    return this.Entity;
  }
  BindData(i) {
    if (this.CanBindEntity) {
      this.Entity = i;
      this.CanBindEntity = false;
      this.OnEntityChangedCallback?.(i.GetPoint());
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, this.constructor.name + " 已经绑定了数据", ["entity", i.Info()]);
    }
  }
  UnbindData() {
    var i;
    if (this.Entity) {
      i = this.Entity.GetPoint();
      this.Entity = undefined;
      this.CanBindEntity = true;
      this.OnEntityChangedCallback?.(i);
    }
  }
  async ShowUiItem() {}
  async HideUiItem() {}
  async RefreshItem() {}
  async PlayShowAnim() {}
  async PlayNormalAnim() {}
  async PlayHideAnim() {}
  Pause() {}
  Resume() {}
  async MoveToItem(i) {}
  async MoveToOriginalPosition() {}
  MoveToOriginalPositionImmediate() {}
  async PlayEatAnim() {}
  async PlayBeEatAnim() {}
  async PlaySacrificeAnim() {}
  async PlayFusionHideAnim() {}
  async PlayFusionShowAnim() {}
  async PlayEvolveUpAnim() {}
  async PlaySkillAnim() {}
  ShowCoinNiagara(i) {}
  ResetLayer() {
    var i = this.Entity?.CheckGetComponent(0).Point ?? -1;
    this.GetOriginalItem().SetHierarchyIndex(i);
  }
  SetLayerTop() {
    this.GetOriginalItem().SetHierarchyIndex(FloroRanchDefine_1.FLORO_RANCH_CARD_ITEM_MAX_HIERACHY);
  }
  BindEntityChangedCallback(i) {
    this.OnEntityChangedCallback = i;
  }
}
exports.FloroRanchUiItemBase = FloroRanchUiItemBase;
//# sourceMappingURL=FloroRanchUiItemBase.js.map