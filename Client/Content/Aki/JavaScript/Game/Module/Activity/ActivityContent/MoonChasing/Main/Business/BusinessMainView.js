"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessMainView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../../../Common/Button/ButtonItem");
const ActivityMoonChasingController_1 = require("../../Activity/ActivityMoonChasingController");
const PopularityModule_1 = require("../PopularityModule");
const BusinessSkipItem_1 = require("./BusinessSkipItem");
const BusinessViewController_1 = require("./BusinessViewController");
const DelegationDetailsModule_1 = require("./Delegation/DelegationDetailsModule");
const DelegationNonDetailsModule_1 = require("./Delegation/DelegationNonDetailsModule");
class BusinessMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Details = undefined;
    this.CaptionItem = undefined;
    this.eke = undefined;
    this.NonDetailsList = [];
    this.SkipItem = undefined;
    this.kKs = undefined;
    this.tfa = undefined;
    this.FDa = false;
    this.aOn = new BusinessViewController_1.BusinessViewController();
    this.VDa = () => {
      this.GetItem(11)?.SetUIActive(false);
      if (ModelManager_1.ModelManager.MoonChasingBusinessModel.IsUnlockRoleIdEmpty() && this.FDa) {
        this.FDa = true;
        this.UiViewSequence?.PlaySequence("Refresh");
      }
    };
    this.$Oe = e => {
      if (e === "MoonChasingUnlockRoleView" && this.FDa) {
        this.FDa = true;
        this.UiViewSequence?.PlaySequence("Refresh");
      }
    };
    this.rke = () => {
      this.GetItem(11)?.SetUIActive(true);
      this.aOn.BackToState(0);
    };
    this.msa = () => {
      this.dsa();
    };
    this.iha = e => {
      if (e) {
        this.FDa = true;
        this.vJs();
      } else {
        this.Vqa();
      }
      this.eke.RefreshPopularity();
    };
    this.Gwa = () => {
      this.Vqa();
      this.eke.RefreshPopularity();
    };
    this.SkipToMainView = () => {
      this.vJs();
      this.GetItem(7)?.SetUIActive(true);
      this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon3");
      this.UiViewSequence?.PlaySequenceAsync("SwitchOut", new CustomPromise_1.CustomPromise(), true).finally(() => {
        this.Details?.SetActive(false);
      });
    };
    this.SkipToDelegationDetails = (...e) => {
      e = e[0];
      this.Npa(e).finally(undefined);
      this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon7");
      this.UiViewSequence?.PlaySequenceAsync("SwitchIn", new CustomPromise_1.CustomPromise(), true).finally(() => {
        this.GetItem(7)?.SetUIActive(false);
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
  }
  async ERn() {
    this.eke = new PopularityModule_1.PopularityModule();
    await this.eke.CreateByActorAsync(this.GetItem(9).GetOwner());
    this.AddChild(this.eke);
  }
  async U3e() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(2));
    this.CaptionItem.SetCloseCallBack(this.aOn.BackToLastState);
    this.CaptionItem.SetHelpCallBack(this.aOn.OpenHelpView);
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetPowerItemId();
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId();
    await Promise.all([this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon3"), this.CaptionItem.SetCurrencyItemList([e, t, i])]);
  }
  async MJs(e) {
    var t = new DelegationNonDetailsModule_1.DelegationNonDetailsModule();
    t.RegisterViewController(this.aOn);
    await t.CreateThenShowByActorAsync(e.GetOwner());
    this.NonDetailsList.push(t);
  }
  async Csa() {
    this.SkipItem = new BusinessSkipItem_1.BusinessSkipItem();
    this.SkipItem.RegisterViewController(this.aOn);
    await this.SkipItem.CreateByActorAsync(this.GetItem(10).GetOwner());
  }
  async Fpa() {
    this.Details = new DelegationDetailsModule_1.DelegationDetailsModule();
    await this.Details.CreateByResourceIdAsync("UiItem_EntrustQuest", this.GetItem(8));
  }
  ifa() {
    this.kKs = new ButtonItem_1.ButtonItem(this.GetItem(0));
    this.kKs.SetFunction(this.aOn.SkipToBuild);
    this.tfa = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.tfa.SetFunction(this.aOn.SkipToHelper);
  }
  async SJs() {
    await Promise.all([this.MJs(this.GetItem(3)), this.MJs(this.GetItem(4)), this.MJs(this.GetItem(5)), this.MJs(this.GetItem(6))]);
    this.vJs();
  }
  vJs() {
    var t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetDelegationDataList();
    for (let e = 0; e < this.NonDetailsList.length; e++) {
      var i = this.NonDetailsList[e];
      if (e < t.length) {
        i.Refresh(t[e]);
      } else {
        i.SetActive(false);
      }
    }
  }
  Vqa() {
    var t = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetDelegationDataList();
    for (let e = 0; e < this.NonDetailsList.length; e++) {
      var i = this.NonDetailsList[e];
      if (e < t.length) {
        i.RefreshConsume();
      }
    }
  }
  async OnBeforeStartAsync() {
    this.aOn.RegisterView(this);
    await Promise.all([this.ERn(), this.U3e(), this.SJs(), this.Csa(), this.Fpa()]);
    this.ifa();
    this.GetItem(11)?.SetUIActive(false);
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.aOn.BeforeShowAsync();
  }
  OnBeforeShow() {
    this.aOn.Show();
    this.RefreshRedDot();
    ActivityMoonChasingController_1.ActivityMoonChasingController.CheckIsActivityClose();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenTipsTravelView, this.rke);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnlockMoonChasingData, this.msa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshDelegate, this.iha);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BusinessInvestResult, this.Gwa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ConditionUnlockRole, this.VDa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Oe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenTipsTravelView, this.rke);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnlockMoonChasingData, this.msa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshDelegate, this.iha);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BusinessInvestResult, this.Gwa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ConditionUnlockRole, this.VDa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Oe);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(false);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length < 1) && e[0] === "Delegation") {
      return this.Details?.GetGuideUiItemAndUiItemForShowEx(e);
    } else {
      return undefined;
    }
  }
  async Npa(e) {
    e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetDelegationData(e);
    this.Details.SetDelegationData(e);
    await this.Details.ShowAsync();
  }
  dsa() {
    if (ModelManager_1.ModelManager.MoonChasingModel?.GetFirstUnlockData() === undefined) {
      this.SkipItem.SetActive(false);
    } else {
      this.SkipItem.SetActive(true);
      this.SkipItem.Refresh();
    }
  }
  async BeforeShowAsync(e) {
    if (!e) {
      await this.Details.RefreshAsync();
    }
  }
  Refresh() {
    this.dsa();
  }
  RefreshRedDot() {
    this.kKs.BindRedDot("MoonChasingBuilding");
    this.tfa.BindRedDot("MoonChasingRole");
  }
  SwitchShowViewSequence(e) {
    this.UiViewSequence.ShowSequenceName = e ? "ShowView" : "ShowView01";
  }
}
exports.BusinessMainView = BusinessMainView;
//# sourceMappingURL=BusinessMainView.js.map