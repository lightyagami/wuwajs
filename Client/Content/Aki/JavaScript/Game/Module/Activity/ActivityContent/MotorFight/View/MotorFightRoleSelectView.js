"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightRoleSelectView = undefined;
const UE = require("ue");
const LevelGeneralCommons_1 = require("../../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const MotorcycleUiModelUtil_1 = require("../../../../Motorcycle/Model/MotorcycleUiModelUtil");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const MotorFightRoleItem_1 = require("./Item/MotorFightRoleItem");
class MotorFightRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yil = undefined;
    this.Wst = undefined;
    this.lqe = undefined;
    this.tFe = undefined;
    this.BZa = undefined;
    this.aui = i => this.yil.SelectedRoleId === i;
    this.Pcg = i => {
      this.Wst = i;
      this.Og(i);
      this.PlayOrReplaySequence("Switch");
      this.tFe?.SelectGridProxyByKey(i.Id);
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i.TrialRoleId);
      MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.RefreshRoleInMotor(t.GetRoleId(), t.GetRoleSkinId(), i.AnimPath);
    };
    this.uyi = () => {
      var i = new MotorFightRoleItem_1.MotorFightRoleItem();
      i.RecommendRoleIds = this.yil.LevelData.RecommendRoleIds;
      i.OnToggleClickCallback = this.Pcg;
      i.IsSelected = this.aui;
      return i;
    };
    this.tWt = () => {
      this.yil.SelectedRoleId = this.Wst.Id;
      this.CloseMe();
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIText], [8, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem], [9, UE.UIText]];
    this.BtnBindInfo = [[6, this.tWt]];
  }
  async OnBeforeStartAsync() {
    this.yil = this.OpenParam;
    var i = this.yil.SelectedRoleId;
    this.Wst = this.yil.ActivityData.GetMotorFightRoleData(i);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1));
    this.lqe.SetCloseCallBack(this.AMo);
    var i = [];
    this.tFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.uyi);
    var t = this.yil.ActivityData.GetMotorFightRoleList();
    i.push(this.tFe.RefreshByDataAsync(t, true));
    this.BZa = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    i.push(this.BZa.CreateByActorAsync(this.GetItem(7).GetOwner()));
    await Promise.all(i);
  }
  OnBeforeShow() {
    var i = this.yil.LevelData;
    var i = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightLevelType(i.Type);
    this.SetTextureByPath(i.SelectLevelStateBg, this.GetTexture(0));
    this.tFe?.SelectGridProxyByKey(this.Wst.Id);
    this.Og(this.Wst);
  }
  Og(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.RoleName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.BuffName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.BuffDesc, ...i.BuffDescParams);
    this.BZa?.SetUiActive(!i.IsUnLock);
    if (!i.IsUnLock) {
      t = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(i.ConditionId);
      this.BZa?.SetTextByTextId(t);
    }
    this.GetButton(6)?.RootUIComp.SetUIActive(i.IsUnLock);
    var t = this.aui(i.Id);
    this.GetButton(6)?.SetSelfInteractive(!t);
    var i = t ? "MotorFightGame_CharacterCondition_04" : "MotorFightGame_CharacterCondition_03";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), i);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i[0] === "sword_role") {
      i = Number(i[1]);
      if (i = this.tFe?.GetLayoutItemByIndex(i)?.GetRootItem()) {
        return [i, i];
      } else {
        return undefined;
      }
    }
  }
}
exports.MotorFightRoleSelectView = MotorFightRoleSelectView;
//# sourceMappingURL=MotorFightRoleSelectView.js.map