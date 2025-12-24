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
      this.g0o(e);
    } else {
      this.a8l(e);
    }
  }
  g0o(e) {
    this.GetTexture(3)?.SetUIActive(true);
    this.GetSprite(5)?.SetUIActive(false);
    this.GetText(0).ShowTextNew(e.NameText);
    var i = this.GetTexture(3);
    var t = this.GetSprite(4);
    this.SetTextureByPath(e.ElementIconPath, i);
    this.SetSpriteByPath(e.ElementBgIconPath, t, false);
    this.n4e(e.QualityId);
  }
  a8l(e) {
    this.GetTexture(3)?.SetUIActive(false);
    this.GetSprite(5)?.SetUIActive(true);
    this.GetText(0).ShowTextNew(e.NameText);
    var i = e.QualityId;
    var t = AdvanceNoticeDefine_1.starToWeaponGachaBgResourceId[i];
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSpriteByPath(t, this.GetSprite(4), false);
    this.SetSpriteByPath(e.WeaponTypeIconPath, this.GetSprite(5), false);
    this.n4e(i);
  }
  n4e(e) {
    this.$be.RebuildLayout(e);
  }
}
exports.AdvanceNoticeNewRoleDetailItem = AdvanceNoticeNewRoleDetailItem;
//# sourceMappingURL=AdvanceNoticeNewRoleDetailItem.js.map