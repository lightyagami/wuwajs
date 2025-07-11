"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessInteractivePanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase");
const CommonCostItem_1 = require("../../../../../../Common/PropItem/CommonCostItem");
const ConfirmBoxController_1 = require("../../../../../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../../../../../ConfirmBox/ConfirmBoxDefine");
const GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../../../Util/LguiUtil");
const CharacterItem_1 = require("../Common/Character/CharacterItem");
const CharacterListModule_1 = require("../Common/Character/CharacterListModule");
class InteractiveItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Gke = undefined;
    this.Pe = undefined;
    this.U1a = undefined;
    this.xke = () => {
      this.Gke?.(this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITextureTransitionComponent], [3, UE.UIText], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.xke]];
  }
  async OnBeforeStartAsync() {
    this.U1a = new CommonCostItem_1.CommonCostItem();
    await this.U1a.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  Refresh(e, t, i) {
    this.Pe = e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.TrainContent);
    var r = ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId();
    this.U1a.UpdateItem(r, e.WishConsume);
    this.U1a.RefreshCountEnableState();
    this.GetButton(0)?.SetSelfInteractive(true);
    var r = ConfigManager_1.ConfigManager.BusinessConfig.GetRoleDevelopTypeById(e.TrainType);
    this.SetTextureByPath(r.Icon, this.GetTexture(1), undefined, () => {
      this.GetUiTextureTransitionComponent(2).SetAllStateTexture(this.GetTexture(1).GetTexture());
    });
  }
  SetButtonFunction(e) {
    this.Gke = e;
  }
}
class BusinessInteractivePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RoleId = 0;
    this.CharacterListModule = undefined;
    this.InteractiveLayout = undefined;
    this.aOn = undefined;
    this.Nke = e => {
      var t;
      if (ModelManager_1.ModelManager.MoonChasingModel.GetWishValue() < e.WishConsume) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(206)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.MoonChasingController.OpenBusinessMainView();
        });
        ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        ControllerHolder_1.ControllerHolder.MoonChasingController.RoleTrainRequest(this.RoleId, e.TrainType);
      }
    };
    this.Oke = () => {
      var e = new InteractiveItem();
      e.SetButtonFunction(this.Nke);
      return e;
    };
    this.dke = () => new CharacterItem_1.CharacterItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UILayoutBase], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.InteractiveLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(3), this.Oke, this.GetItem(4).GetOwner());
    this.CharacterListModule = new CharacterListModule_1.CharacterListModule(this.dke);
    await Promise.all([this.CharacterListModule.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]);
  }
  async OnBeforeShowAsyncImplement() {
    this.RoleId = this.aOn.SelectedRoleId;
    await this.Refresh();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.GetGuideUiItem("1");
    if (t) {
      return [t, t];
    }
  }
  RegisterViewController(e) {
    this.aOn = e;
  }
  async Refresh() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(this.RoleId);
    var t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(this.RoleId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
    this.GetText(2)?.SetText(t.Level.toString());
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetRoleDevelopCurveByGroupId(e.ExPropertyCurve);
    await Promise.all([this.InteractiveLayout.RefreshByDataAsync(e), this.CharacterListModule.RefreshByDataAsync(t.GetCharacterDataList())]);
  }
}
exports.BusinessInteractivePanel = BusinessInteractivePanel;
//# sourceMappingURL=BusinessInteractivePanel.js.map