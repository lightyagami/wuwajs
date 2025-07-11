"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridLevelAndLockComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridLevelAndLockComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite]];
  }
  OnActivate() {
    this.GetItem(1).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
  }
  OnRefresh(e) {
    var t;
    if (e) {
      this.SetLevel(e.Level, e.IsUseVision);
      this.SetLock(e.IsLockVisible);
      this.SetDeprecate(e.IsDeprecate);
      (t = this.GetText(2)).SetChangeColor(e.IsLevelUseChangeColor, t.changeColor);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
  SetLock(e) {
    this.GetSprite(0).SetUIActive(e ?? false);
  }
  SetDeprecate(e) {
    this.GetSprite(5).SetUIActive(e ?? false);
  }
  SetLevel(e, t) {
    if (t) {
      this.Twt(undefined);
      this.Lwt(e);
    } else {
      this.Lwt(undefined);
      this.Twt(e);
    }
  }
  Twt(e) {
    var t = this.GetItem(1);
    if (e === undefined) {
      if (t.IsUIActiveSelf()) {
        t.SetUIActive(false);
      }
    } else {
      this.GetText(2).SetText(e.toString());
      if (!t.IsUIActiveSelf()) {
        t.SetUIActive(true);
      }
    }
  }
  Lwt(e) {
    var t = this.GetItem(3);
    if (e === undefined) {
      if (t.IsUIActiveSelf()) {
        t.SetUIActive(false);
      }
    } else {
      this.GetText(4).SetText(e.toString());
      if (!t.IsUIActiveSelf()) {
        t.SetUIActive(true);
      }
    }
  }
  GetResourceId() {
    return "UiItem_ItemState";
  }
}
exports.MediumItemGridLevelAndLockComponent = MediumItemGridLevelAndLockComponent;
//# sourceMappingURL=MediumItemGridLevelAndLockComponent.js.map