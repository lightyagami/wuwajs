"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightLevelDetailView = exports.MotorFightLevelDetailViewModel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const MotorcycleUiModelUtil_1 = require("../../../../Motorcycle/Model/MotorcycleUiModelUtil");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class MotorFightLevelDetailViewModel {
  constructor(i, t) {
    this.ActivityData = i;
    this.LevelData = t;
    this.SelectedRoleId = 0;
    this.SelectedRoleId = this.ActivityData.GetLevelUsedRole(this.LevelData.Id);
  }
}
exports.MotorFightLevelDetailViewModel = MotorFightLevelDetailViewModel;
class MotorFightLevelDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.m_i = undefined;
    this.yil = undefined;
    this.lqe = undefined;
    this.H3e = undefined;
    this.Bqe = () => {
      var i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      i.ShowReceivedCallBack = () => this.m_i.IsFinished;
      return i;
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.Ecg = () => {
      UiManager_1.UiManager.OpenView("MotorFightRoleSelectView", this.yil);
    };
    this.dxl = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.EnterMotorFightDungeonDirectly(this.m_i.Id, this.yil.SelectedRoleId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [19, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UISprite], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIArtText], [11, UE.UISprite], [12, UE.UISprite], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIHorizontalLayout], [16, UE.UIItem], [17, UE.UIText], [18, UE.UIButtonComponent], [1, UE.UIText], [20, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Ecg], [18, this.dxl]];
  }
  async OnBeforeStartAsync() {
    this.yil = this.OpenParam;
    this.m_i = this.yil.LevelData;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    var i = [];
    var t = this.m_i.RewardId !== 0;
    this.GetItem(13)?.SetUIActive(t);
    if (t) {
      this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(15), this.Bqe);
      t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.m_i.RewardId);
      i.push(this.H3e.RefreshByDataAsync(t, true));
    }
    await Promise.all(i);
  }
  OnHandleLoadScene() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.CreateMotor(20);
    var i = this.yil.ActivityData.GetMotorFightRoleData(this.yil.SelectedRoleId).TrialRoleId;
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadEquippedMotorAndRole(i.GetRoleId(), i.GetRoleSkinId());
  }
  OnBeforeShow() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), this.m_i.LevelName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), this.m_i.LevelDesc);
    var i = this.m_i.Type === 1;
    var t = this.m_i.Type === 2;
    var e = this.GetArtText(10);
    e.SetUIActive(!t);
    e.SetText(this.m_i.Number);
    e.SetChangeColor(i, e.changeColor);
    var e = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightLevelType(this.m_i.Type);
    this.SetTextureByPath(e.SelectLevelStateBg, this.GetTexture(4));
    this.SetTextureByPath(this.m_i.LevelBg, this.GetTexture(5));
    var e = this.GetTexture(6);
    e.SetChangeColor(i, e.changeColor);
    var e = this.GetSprite(7);
    e.SetChangeColor(i, e.changeColor);
    var e = this.GetSprite(11);
    e.SetChangeColor(i, e.changeColor);
    this.GetSprite(12)?.SetUIActive(t);
    var i = this.GetText(17);
    if (this.m_i.BestScore !== 0) {
      i.SetText(this.m_i.BestScore.toString());
    }
    this.U5t();
    this.GetItem(20)?.SetUIActive(this.yil.ActivityData.IsRoleHasRedDot());
  }
  U5t() {
    var i = this.yil.SelectedRoleId;
    var i = this.yil.ActivityData.GetMotorFightRoleData(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.RoleName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), i.BuffName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.BuffDesc, ...i.BuffDescParams);
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i.TrialRoleId);
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.RefreshRoleInMotor(t.GetRoleId(), t.GetRoleSkinId(), i.AnimPath);
  }
  OnHandleReleaseScene() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.DestroyMotor();
  }
}
exports.MotorFightLevelDetailView = MotorFightLevelDetailView;
//# sourceMappingURL=MotorFightLevelDetailView.js.map