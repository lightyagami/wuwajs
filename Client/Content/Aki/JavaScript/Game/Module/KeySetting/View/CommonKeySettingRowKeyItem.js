"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonKeySettingRowKeyItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const KeySettingItemProxy_1 = require("../KeySettingItemProxy");
class CommonKeySettingRowKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.MSr = undefined;
    this.MSr = new KeySettingItemProxy_1.KeySettingItemProxy(this);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIButtonComponent]];
  }
  OnStart() {
    this.MSr.OnStart();
  }
  OnBeforeDestroy() {
    this.MSr.OnBeforeDestroy();
  }
  Refresh(e, t) {
    this.MSr.Refresh(e, t);
  }
  SetDetailItemVisible(e) {
    this.MSr.SetDetailItemVisible(e);
  }
  GetTitleUiText() {
    return this.GetText(0);
  }
  GetKeySetToggle() {
    return this.GetExtendToggle(1);
  }
  GetKeyNameUiText() {
    return this.GetText(2);
  }
  GetCursorItem() {
    return this.GetItem(8);
  }
  GetDetailUiItem() {
    return this.GetItem(3);
  }
  GetDetailUiText() {
    return this.GetText(4);
  }
  GetDetailSprite() {
    return this.GetSprite(5);
  }
  GetLockSprite() {
    return this.GetSprite(6);
  }
  GetSelectSprite() {
    return this.GetSprite(7);
  }
  GetCancelButton() {
    return this.GetButton(9);
  }
}
exports.CommonKeySettingRowKeyItem = CommonKeySettingRowKeyItem;
//# sourceMappingURL=CommonKeySettingRowKeyItem.js.map