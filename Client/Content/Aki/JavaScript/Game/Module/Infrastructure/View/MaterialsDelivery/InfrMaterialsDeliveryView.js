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
    this.U4m = 0;
    this.x4m = Protocol_1.Aki.Protocol.VNm.Proto_Road;
    this.gJc = 0;
    this.b5m = false;
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.LSc = new InfrMaterialsDeliveryInfoPanel_1.InfrMaterialsDeliveryInfoPanel();
    this.R5m = () => {
      UiManager_1.UiManager.OpenView("InfrRoadNetworkMainView", {
        DeliveryType: this.x4m,
        RoadId: this.U4m
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.R5m]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.U4m = e.RoadId;
    this.x4m = e.DeliveryType;
    this.gJc = e.ActionId;
    this.b5m = false;
    await InfrastructureController_1.InfrastructureController.RequestInfrastructureInfoRequest();
    await Promise.all([this.e7a(), this.w5m()]);
  }
  async e7a() {
    await this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.Qyi.SetCurrencyItemList([InfrastructureDefine_1.INFR_BATTLE_MATERIAL_ID, InfrastructureDefine_1.INFR_COLLECTION_MATERIAL_ID, InfrastructureDefine_1.INFR_QUEST_MATERIAL_ID]);
  }
  async w5m() {
    await this.LSc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner(), this.OpenParam);
  }
  OnStart() {
    this.L5m();
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
  L5m() {
    this.LSc.SetClickBtnBuildCb(() => {
      this.P5m();
    });
  }
  async P5m() {
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      this.b5m = await InfrastructureController_1.InfrastructureController.RequestInfrastructureRoadBuild(this.U4m);
    } else {
      this.b5m = await InfrastructureController_1.InfrastructureController.RequestInfrastructureLevelUp();
    }
    if (this.b5m) {
      this.CloseMe();
    }
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.OpenSystemBoardResultRequest(this.b5m ? 1 : 0, this.gJc);
  }
}
exports.InfrMaterialsDeliveryView = InfrMaterialsDeliveryView;
//# sourceMappingURL=InfrMaterialsDeliveryView.js.map