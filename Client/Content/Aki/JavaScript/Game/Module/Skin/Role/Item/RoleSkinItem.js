"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinItem = undefined;
const UE = require("ue");
const AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem");
const INDEXQUARTER = 0.25;
const INDEXHALF = 0.5;
const INDEXTHREEQUARTER = 0.75;
const MAXHIERARCHYINDEX = 2;
const MINHIERARCHYINDEX = 1;
class RoleSkinItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.ButtonFunction = undefined;
    this.GIl = () => {
      this.ButtonFunction?.(this.CurrentShowItemIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem]];
    this.BtnBindInfo = [[0, this.GIl]];
  }
  OnRefreshItem(t) {
    this.SetTextureByPath(t.GetBuyPreviewRoleQualityBgPath(), this.GetTexture(1));
    this.SetTextureByPath(t.GetBuyPreviewRoleCardPath(), this.GetTexture(2));
    var e;
    var i = t.GetSuitWeaponSkinId() > 0;
    if (i) {
      e = t.GetSuitWeaponPreviewTexturePath();
      this.SetTextureByPath(e, this.GetTexture(5));
      this.GetTexture(5).SetUIActive(true);
      e = t.GetSuitWeaponQualityBgPath();
      this.SetTextureByPath(e, this.GetTexture(4));
      this.GetItem(4).SetUIActive(true);
      e = UE.Color.FromHex(t.GetRoleSkinConfig().SuitWeaponSkinColor);
      this.GetTexture(10).SetColor(e);
    } else {
      this.GetTexture(5).SetUIActive(false);
      this.GetItem(4).SetUIActive(false);
    }
    this.GetItem(15).SetUIActive(t.GetHasNewFlag());
    this.GetItem(6).SetUIActive(t.IsWear());
    this.GetItem(7).SetUIActive(t.IsLocked());
    this.f7l(i);
  }
  f7l(t) {
    this.GetItem(14).SetUIActive(t);
    this.GetItem(13).SetUIActive(t);
  }
  OnSelect() {
    this.GIl();
    this.GetItem(12).SetUIActive(true);
    this.GetItem(11).SetUIActive(false);
    this.GetItem(15).SetUIActive(false);
  }
  OnUnSelect() {
    this.GetItem(12).SetUIActive(false);
    this.GetItem(11).SetUIActive(true);
  }
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage();
    this.Qkl(t);
    this.Kkl(t);
    this.$kl(t);
    this.Xkl(t);
  }
  Qkl(t) {
    t = RoleSkinItem.ScaleCurve.GetFloatValue(t);
    t = new UE.Vector(t, t, t);
    this.RootItem.SetUIItemScale(t);
  }
  Kkl(t) {
    t = RoleSkinItem.AlphaCurve.GetFloatValue(t);
    this.RootItem.SetUIItemAlpha(t);
  }
  $kl(t) {
    var e = RoleSkinItem.OffsetCurve.GetFloatValue(t);
    if (t > INDEXHALF) {
      this.GetButton(0)?.RootUIComp.SetAnchorOffsetX(e * -1);
    } else {
      this.GetButton(0)?.RootUIComp.SetAnchorOffsetX(e);
    }
  }
  Xkl(t) {
    let e = MAXHIERARCHYINDEX;
    if (t <= INDEXQUARTER || t >= INDEXTHREEQUARTER) {
      e = MINHIERARCHYINDEX;
    }
    if (this.RootItem.GetHierarchyIndex() !== e) {
      this.RootItem.SetHierarchyIndex(e);
    }
  }
}
(exports.RoleSkinItem = RoleSkinItem).OffsetCurve = undefined;
RoleSkinItem.ScaleCurve = undefined;
RoleSkinItem.AlphaCurve = undefined; //# sourceMappingURL=RoleSkinItem.js.map