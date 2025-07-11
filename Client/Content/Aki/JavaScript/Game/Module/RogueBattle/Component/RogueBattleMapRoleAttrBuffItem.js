"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapRoleAttributeBuffsItem = exports.RougeBattleAttributeBuffItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class RougeBattleAttributeBuffItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eHr = 0;
    this.OnClickCall = undefined;
    this.eTt = () => {
      this.GetExtendToggle(11)?.SetToggleState(0);
      if (this.OnClickCall) {
        this.OnClickCall(this.eHr);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UIItem], [11, UE.UIExtendToggle], [12, UE.UIItem]];
    this.BtnBindInfo = [[11, this.eTt]];
  }
  Refresh(e, t, i) {
    this.eHr = e;
    this.GetItem(10)?.SetUIActive(false);
    e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResCharacterBuff(e);
    this.SetSpriteByPath(e.AffixIcon, this.GetSprite(9), false);
  }
}
exports.RougeBattleAttributeBuffItem = RougeBattleAttributeBuffItem;
class RogueBattleMapRoleAttributeBuffsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Ay1 = undefined;
    this.QC1 = [];
    this.dFe = 0;
    this.Fao = () => {
      var e = new RougeBattleAttributeBuffItem();
      e.OnClickCall = this.Os_;
      return e;
    };
    this.Os_ = e => {
      e = {
        Index: this.QC1.indexOf(e),
        AffixIds: this.QC1,
        RoleId: this.dFe
      };
      UiManager_1.UiManager.OpenView("RogueBattleRoleAffixDetailView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    this.Ay1 = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.Fao);
  }
  OnBeforeDestroy() {
    this.Ay1 = undefined;
  }
  Refresh(e) {
    this.dFe = e;
    e = ModelManager_1.ModelManager.RogueBattleModel.GetIncIdByRoleId(e);
    e = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(e).Ol1;
    if (e.length === 0) {
      this.GetItem(3)?.SetUIActive(true);
      this.Ay1.GetRootUiItem().SetUIActive(false);
    } else {
      this.GetItem(3)?.SetUIActive(false);
      this.Ay1.GetRootUiItem().SetUIActive(true);
      this.Ay1?.RefreshByData(e);
      this.QC1 = e;
    }
  }
}
exports.RogueBattleMapRoleAttributeBuffsItem = RogueBattleMapRoleAttributeBuffsItem;
//# sourceMappingURL=RogueBattleMapRoleAttrBuffItem.js.map