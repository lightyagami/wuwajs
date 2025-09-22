"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardComponentEvolveBond = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SurvivorsRogueCardAttributeItem_1 = require("./SurvivorsRogueCardAttributeItem");
const SurvivorsRogueCardComponent_1 = require("./SurvivorsRogueCardComponent");
class SurvivorsRogueCardComponentEvolveBond extends SurvivorsRogueCardComponent_1.SurvivorsRogueCardComponent {
  constructor() {
    super(...arguments);
    this.xyd = undefined;
    this.Uyd = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.xyd = new SurvivorsRogueCardAttributeItem_1.SurvivorsRogueCardAttributeItem();
    e.push(this.xyd.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Uyd = new SurvivorsRogueCardAttributeItem_1.SurvivorsRogueCardAttributeItem();
    e.push(this.Uyd.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    await Promise.all(e);
    this.xyd.SetIsUp(false);
    this.Uyd.SetIsUp(true);
    var e = {
      UiText: this.GetText(2),
      ViewType: 0,
      ReportType: 10
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  OnGetResourceId() {
    return "UiItem_SurvivorsCardBind";
  }
  GetLayoutLevel() {
    return 1;
  }
  OnRefresh(e) {
    var r;
    if (e && (r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e)) && (this.xyd.SetIsUp(false), this.xyd.SetTextureIcon(r.Icon), r = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponBondOwnedWeaponId(e))) {
      e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(r);
      this.Uyd.SetIsUp(true);
      this.Uyd.SetTextureIcon(e.Icon);
      this.Uyd.SetTextureIcon(e.Icon);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
}
exports.SurvivorsRogueCardComponentEvolveBond = SurvivorsRogueCardComponentEvolveBond;
//# sourceMappingURL=SurvivorsRogueCardComponentEvolveBond.js.map