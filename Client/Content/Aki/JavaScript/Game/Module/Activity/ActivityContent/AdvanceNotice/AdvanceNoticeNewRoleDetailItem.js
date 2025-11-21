"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeNewRoleDetailItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout");
const AdvanceNoticeDefine_1 = require("./AdvanceNoticeDefine");
class AdvanceNoticeNewRoleDetailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$be = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [3, UE.UITexture], [4, UE.UISprite], [2, UE.UIHorizontalLayout], [5, UE.UISprite], [6, UE.UIButtonComponent], [7, UE.UIItem]];
  }
  OnStart() {
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(2));
    this.GetItem(1).SetUIActive(false);
  }
  Refresh(e) {
    e = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabCharacterById(e);
    if (e.Type === 1) {
      this.g0o(e.RoleOrWeaponId);
    } else {
      this.a8l(e.RoleOrWeaponId);
    }
  }
  g0o(e) {
    this.GetTexture(3)?.SetUIActive(true);
    this.GetSprite(5)?.SetUIActive(false);
    var i;
    var t;
    var a;
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e);
    if (e) {
      this.GetText(0).ShowTextNew(e.Name);
      i = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e.ElementId);
      t = this.GetTexture(3);
      a = this.GetSprite(4);
      this.SetTextureByPath(i.Icon, t);
      this.SetSpriteByPath(i.GachaElementBgSpritePath, a, false);
      this.n4e(e.QualityId);
    }
  }
  a8l(e) {
    this.GetTexture(3)?.SetUIActive(false);
    this.GetSprite(5)?.SetUIActive(true);
    var i;
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e);
    if (e) {
      this.GetText(0).ShowTextNew(e.WeaponName);
      i = AdvanceNoticeDefine_1.starToWeaponGachaBgResourceId[e.QualityId];
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
      this.SetSpriteByPath(i, this.GetSprite(4), false);
      this.vWt(e.WeaponType);
      this.n4e(e.QualityId);
    }
  }
  n4e(e) {
    this.$be.RebuildLayout(e);
  }
  vWt(e) {
    for (const i of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList()) {
      if (e === i.Value) {
        this.SetSpriteByPath(i.Icon, this.GetSprite(5), false);
        break;
      }
    }
  }
}
exports.AdvanceNoticeNewRoleDetailItem = AdvanceNoticeNewRoleDetailItem;
//# sourceMappingURL=AdvanceNoticeNewRoleDetailItem.js.map