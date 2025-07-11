"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingCurrencyItem = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const HelpController_1 = require("../../../../Help/HelpController");
const FishingDefine_1 = require("../FishingDefine");
class FishingCurrencyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.cU_ = undefined;
    this.nqe = () => {
      HelpController_1.HelpController.OpenHelpById(FishingDefine_1.SAILING_DURABILITY_HELP_ID);
    };
    this.NIc = () => {
      this.RefreshItem();
    };
    this._k_ = () => {
      this.RefreshItem();
      var e = ModelManager_1.ModelManager.FishingModel.GetShipData();
      e.AddAttributeListener(CharacterAttributeTypes_1.EAttributeId.Proto_Life, this.NIc);
      e.AddAttributeListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.NIc);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UITextureTransitionComponent], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIItem]];
    this.BtnBindInfo = [[3, this.nqe]];
  }
  async OnBeforeStartAsync() {
    this.cU_ = new UiPanelBase_1.UiPanelBase();
    await this.cU_.CreateThenShowByResourceIdAsync("PnlNavigationMainCostTip", this.RootItem);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingShipDataRefresh, this._k_);
    this.GetTexture(0)?.SetUIActive(false);
    this.GetButton(2)?.RootUIComp.SetUIActive(false);
    this.GetItem(5)?.SetUIActive(false);
    this.GetItem(8)?.SetUIActive(false);
    var e = this.GetSprite(7);
    e.SetUIActive(true);
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_FightHp");
    this.SetSpriteByPath(t, e, false);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingShipDataRefresh, this._k_);
    var e = ModelManager_1.ModelManager.FishingModel.GetShipData();
    e.RemoveAttributeListener(CharacterAttributeTypes_1.EAttributeId.Proto_Life, this.NIc);
    e.RemoveAttributeListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.NIc);
  }
  OnBeforeShow() {
    this.RefreshItem();
  }
  RefreshItem() {
    var e = ModelManager_1.ModelManager.FishingModel.GetShipData();
    var t = e.GetCurrentHp();
    var e = e.GetMaxHp();
    this.GetText(1).SetText(t + "/" + e);
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("FishingLowFixTips") ?? 0;
    this.cU_?.SetUiActive(t < e);
  }
}
exports.FishingCurrencyItem = FishingCurrencyItem;
//# sourceMappingURL=FishingCurrencyItem.js.map