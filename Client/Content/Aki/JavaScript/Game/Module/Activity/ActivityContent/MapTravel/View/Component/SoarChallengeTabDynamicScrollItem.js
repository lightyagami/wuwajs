"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoarChallengeTabDynamicScrollItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class SoarChallengeTabDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.JZ = undefined;
    this.fuo = undefined;
    this.Data = undefined;
    this.SelectedCallBack = undefined;
    this.IsSelectedOn = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.JZ = new MapTravelTabItem();
    await this.JZ.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.JZ.SelectedCallBack = this.SelectedCallBack;
    this.fuo = new MapTravelTabItemLock();
    await this.fuo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.fuo.SelectedCallBack = this.SelectedCallBack;
  }
  GetUsingItem(t) {
    if (t.IsUnlock) {
      return this.cma(1);
    } else {
      return this.cma(0);
    }
  }
  cma(t) {
    return this.GetItem(t).GetOwner();
  }
  Update(t, e) {
    this.Data = t;
    this.fuo.SetUiActive(!t.IsUnlock);
    this.JZ.SetUiActive(t.IsUnlock);
    (t.IsUnlock ? this.JZ : this.fuo).RefreshByData(t);
    if (this.IsSelectedOn?.(t)) {
      this.SetSelected(true, false);
    } else {
      this.SetSelected(false, false);
    }
  }
  SetSelected(t, e) {
    this.fuo.SetToggleState(t, !!e && !this.Data.IsUnlock);
    this.JZ.SetToggleState(t, !!e && this.Data.IsUnlock);
  }
  SetItemNewVisible(t) {
    if (this.Data?.IsUnlock) {
      this.JZ.SetItemNewVisible(t);
    }
  }
  BindSelectedCallBack(t) {
    this.SelectedCallBack = t;
  }
  BindIsSelectedOn(t) {
    this.IsSelectedOn = t;
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.SoarChallengeTabDynamicScrollItem = SoarChallengeTabDynamicScrollItem;
class MapTravelTabItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.SelectedCallBack = undefined;
    this.AVl = () => {
      if (this.Data) {
        this.SelectedCallBack?.(this.Data);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.AVl]];
  }
  SetToggleState(t, e) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, e);
  }
}
class MapTravelTabItem extends MapTravelTabItemBase {
  RefreshByData(t) {
    this.Data = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NameTextId);
    this.GetItem(2).SetUIActive(t.IsFinished);
    this.GetItem(3).SetUIActive(!t.IsUnlock);
    this.GetItem(4).SetUIActive(t.HasRedDot);
    this.GetItem(5).SetUIActive(t.IsUnlock && t.IsNew && !t.HasRedDot);
  }
  SetItemNewVisible(t) {
    this.GetItem(5).SetUIActive(t);
  }
}
class MapTravelTabItemLock extends MapTravelTabItemBase {
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(true);
    this.GetItem(4).SetUIActive(false);
  }
  RefreshByData(t) {
    this.Data = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NameTextId);
  }
}
//# sourceMappingURL=SoarChallengeTabDynamicScrollItem.js.map