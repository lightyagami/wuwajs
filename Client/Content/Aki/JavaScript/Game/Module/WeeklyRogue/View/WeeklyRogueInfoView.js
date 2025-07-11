"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueInfoView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const WeeklyRogueTeamInfoPanel_1 = require("../Components/WeeklyRogueTeamInfoPanel");
const WeeklyRogueTokenInfoPanel_1 = require("../Components/WeeklyRogueTokenInfoPanel");
const ModelManager_1 = require("../../../Manager/ModelManager");
class WeeklyRogueInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.nV_ = undefined;
    this.sV_ = undefined;
    this.dmo = undefined;
    this.V2i = () => {
      this.CloseMe();
    };
    this._V_ = () => {
      ModelManager_1.ModelManager.WeeklyRogueModel.ChangeDescMode();
    };
    this.aV_ = () => {
      this.GetExtendToggle(2).SetToggleState(0, false);
      this.nV_.SetActive(true);
      this.sV_.SetActive(false);
      this.GetExtendToggle(5).GetRootComponent()?.SetUIActive(false);
      this.GetText(6).SetUIActive(false);
      this.dmo?.Model?.CheckGetComponent(0)?.SetVisible(true);
    };
    this.hV_ = () => {
      this.GetExtendToggle(1).SetToggleState(0, false);
      this.nV_.SetActive(false);
      this.sV_.SetActive(true);
      this.GetExtendToggle(5).GetRootComponent()?.SetUIActive(true);
      this.GetText(6).SetUIActive(true);
      this.dmo?.Model?.CheckGetComponent(0)?.SetVisible(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIExtendToggle], [2, UE.UIExtendToggle], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIText]];
    this.BtnBindInfo = [[0, this.V2i], [1, this.aV_], [2, this.hV_], [5, this._V_]];
  }
  async OnBeforeStartAsync() {
    this.nV_ = new WeeklyRogueTeamInfoPanel_1.WeeklyRogueTeamInfoPanel();
    this.sV_ = new WeeklyRogueTokenInfoPanel_1.WeeklyRogueTokenInfoPanel();
    this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
    await Promise.all([this.nV_.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.sV_.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())]);
    this.GetExtendToggle(1).SetToggleState(1, false);
    this.GetExtendToggle(2).SetToggleState(0, false);
    this.nV_.SetActive(true);
    this.sV_.SetActive(false);
    this.GetExtendToggle(5).GetRootComponent()?.SetUIActive(false);
    this.GetText(6).SetUIActive(false);
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.DescMode === 0 ? 1 : 0;
    this.GetExtendToggle(5).SetToggleState(e);
  }
  OnHandleLoadScene() {
    this.dmo ||= UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
    this.dmo.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo);
    this.dmo = undefined;
  }
}
exports.WeeklyRogueInfoView = WeeklyRogueInfoView;
//# sourceMappingURL=WeeklyRogueInfoView.js.map