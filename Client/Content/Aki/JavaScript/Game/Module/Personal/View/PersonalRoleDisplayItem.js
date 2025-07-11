"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalRoleDisplayItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PersonalRoleDisplayItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super();
    this.dFe = 0;
    this.Lei = 0;
    this.Zqe = undefined;
    this.jbe = t => {
      this.Zqe(this.dFe, this.Lei);
    };
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UITexture], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[9, this.jbe]];
  }
  Refresh(t, e, i) {
    this.InitAllItemState();
    this.dFe = t;
    this.Lei = i;
    this.GetTexture(0).SetUIActive(this.dFe !== -1);
    if (this.dFe !== -1) {
      t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe) !== undefined;
      this.GetItem(12).SetUIActive(!t);
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
      this.SetTextureByPath(i.RoleHeadIconBig, this.GetTexture(0));
      this.mFe();
    }
  }
  mFe() {
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe).QualityId;
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleQualityInfo(t);
    this.SetSpriteByPath(t.Image, this.GetSprite(1), false);
  }
  ShowLevelText() {
    var t = this.GetText(2);
    t.SetUIActive(true);
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    if (e &&= e.GetLevelData()) {
      e = e.GetLevel();
      LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e);
    }
  }
  ShowNameText() {
    var t = this.GetText(4);
    t.SetUIActive(true);
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    if (e) {
      t.ShowTextNew(e.Name);
    }
  }
  InitAllItemState() {
    this.GetText(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.GetText(4).SetUIActive(false);
    this.GetTexture(5).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.GetText(8).SetUIActive(false);
    this.GetItem(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
  }
  SetToggleState(t) {}
  SetClickCallback(t) {
    this.Zqe = t;
  }
  GetRoleId() {
    return this.dFe;
  }
  GetGirdIndex() {
    return this.Lei;
  }
  SetUseState(t) {
    this.GetItem(10).SetUIActive(t);
  }
  SetSelectState(t, e = 0) {}
}
exports.PersonalRoleDisplayItem = PersonalRoleDisplayItem;
//# sourceMappingURL=PersonalRoleDisplayItem.js.map