"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleVisionCommonItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RoleVisionCommonItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i, s = false) {
    super();
    this.AnimationState = false;
    this.CurrentIndex = undefined;
    this.CurrentData = undefined;
    this.RoleData = undefined;
    this.ShowType = 0;
    this.wqe = undefined;
    this.NeedRedDot = false;
    this.OnDragItemDragBegin = () => {
      this.OnDragBegin();
    };
    this.OnDragItemDragEnd = () => {
      this.OnDragEnd();
    };
    this.OnClickVision = () => {};
    this.OnUnOverlay = () => {
      this.OnItemUnOverlay();
    };
    this.OnOverlay = () => {
      this.OnItemOverlay();
    };
    this.OnScrollToScrollView = () => {
      this.OnScrollToScrollViewEvent();
    };
    this.OnRemoveFromScrollView = () => {
      this.OnRemoveFromScrollViewEvent();
    };
    this.CurrentIndex = e;
    this.wqe = t;
    this.RoleData = i;
    this.NeedRedDot = s;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
    this.SetUiActive(true);
  }
  OnDragBegin() {}
  OnDragEnd() {}
  SetShowType(t) {
    this.ShowType = t;
  }
  ResetPosition() {
    this.OnResetPosition();
  }
  OnResetPosition() {}
  SetAnimationState(t) {
    this.AnimationState = t;
    this.OnChangeAnimationState();
  }
  OnChangeAnimationState() {}
  GetCurrentIndex() {
    return this.CurrentIndex;
  }
  GetCurrentData() {
    return this.CurrentData;
  }
  SetAniLightState(t) {}
  UpdateItem(t, e) {
    this.CurrentData = t;
    this.RoleData = e || this.RoleData;
    this.xCo(t);
    this.Kbe(t);
    this.BGt(t);
    this.OnUpdateItem(t);
  }
  Kbe(t) {
    this.GetVisionTextureComponent().SetUIActive(t !== undefined);
    if (t) {
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.GetConfigId(true));
      this.SetTextureByPath(t.IconMiddle, this.GetVisionTextureComponent(), "VisionEquipmentView");
    }
  }
  BGt(t) {
    this.GetVisionQualitySprite().SetUIActive(t !== undefined);
  }
  PlaySequence(t) {
    this.OnPlaySequence(t);
  }
  OnPlaySequence(t) {}
  xCo(t) {}
  SetSelected() {
    this.OnSelected();
  }
  OnSelected() {}
  SetUnSelected() {
    this.OnUnSelected();
  }
  OnUnSelected() {}
  OnUpdateItem(t) {}
  OnItemUnOverlay() {}
  OnScrollToScrollViewEvent() {}
  OnRemoveFromScrollViewEvent() {}
  OnItemOverlay() {}
  OnBeforeDestroy() {
    this.OnBeforeClearComponent();
  }
  SetToggleState(t, e = false, i = false) {
    if (this.GetSelectToggle().ToggleState !== t) {
      this.GetSelectToggle().SetToggleStateForce(t, e, i);
    }
  }
  OnBeforeClearComponent() {}
}
exports.RoleVisionCommonItem = RoleVisionCommonItem;
//# sourceMappingURL=RoleVisionCommonItem.js.map