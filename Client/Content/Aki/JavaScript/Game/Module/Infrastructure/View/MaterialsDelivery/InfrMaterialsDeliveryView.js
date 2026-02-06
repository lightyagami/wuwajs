"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrMaterialsDeliveryView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const InfrastructureController_1 = require("../../InfrastructureController");
const InfrastructureDefine_1 = require("../../InfrastructureDefine");
const InfrMaterialsDeliveryInfoPanel_1 = require("./InfrMaterialsDeliveryInfoPanel");
class InfrMaterialsDeliveryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.J5m = 0;
    this.Z5m = Protocol_1.Aki.Protocol.a4m.Proto_Road;
    this.gJc = 0;
    this.$Vm = false;
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.LSc = new InfrMaterialsDeliveryInfoPanel_1.InfrMaterialsDeliveryInfoPanel();
    this.WVm = () => {
      UiManager_1.UiManager.OpenView("InfrRoadNetworkMainView", {
        DeliveryType: this.Z5m,
        RoadId: this.J5m
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.WVm]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.J5m = e.RoadId;
    this.Z5m = e.DeliveryType;
    this.gJc = e.ActionId;
    this.$Vm = ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(this.J5m)?.Status === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete;
    await InfrastructureController_1.InfrastructureController.RequestInfrastructureInfoRequest();
    await Promise.all([this.e7a(), this.QVm()]);
  }
  async e7a() {
    await this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.Qyi.SetCurrencyItemList([InfrastructureDefine_1.INFR_BATTLE_MATERIAL_ID, InfrastructureDefine_1.INFR_COLLECTION_MATERIAL_ID, InfrastructureDefine_1.INFR_QUEST_MATERIAL_ID]);
  }
  async QVm() {
    await this.LSc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner(), this.OpenParam);
  }
  OnStart() {
    this.KVm();
    this.cQa();
  }
  cQa() {
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.Qyi.SetHelpCallBack(() => {
      var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetHelpIdActivity();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    });
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("InfrTeachStageEndQuestId");
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 3;
    this.Qyi.SetCurrencyItemVisible(e);
    this.GetButton(2).RootUIComp.SetUIActive(e);
  }
  KVm() {
    this.LSc.SetClickBtnBuildCb(() => {
      this.XVm();
    });
  }
  async XVm() {
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      this.$Vm = await InfrastructureController_1.InfrastructureController.RequestInfrastructureRoadBuild(this.J5m);
    } else {
      this.$Vm = await InfrastructureController_1.InfrastructureController.RequestInfrastructureLevelUp();
    }
    if (this.$Vm) {
      this.CloseMe();
    }
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.OpenSystemBoardResultRequest(this.$Vm ? 1 : 0, this.gJc);
  }
}
exports.InfrMaterialsDeliveryView = InfrMaterialsDeliveryView;
//# sourceMappingURL=InfrMaterialsDeliveryView.js.map