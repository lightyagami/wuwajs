"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonCountPanel_1 = require("../../Common/CommonCountPanel");
const UiNavigationView_1 = require("../../UiNavigation/UiNavigationView");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const CookController_1 = require("../CookController");
const CookModel_1 = require("../CookModel");
const CookItemView_1 = require("./CookItemView");
class CookView extends UiNavigationView_1.UiNavigationView {
  constructor() {
    super(...arguments);
    this.oOt = undefined;
    this.LOt = undefined;
    this.DOt = undefined;
    this.ROt = undefined;
    this.UOt = true;
    this.ETt = 0;
    this.dFe = 0;
    this.t6 = 1;
    this.AOt = undefined;
    this.POt = undefined;
    this.nOt = (t, e, i) => {
      e = new CookItemView_1.MaterialItem(e);
      e.Update(t, i);
      e.BindOnClickedCallback(this.xOt);
      return {
        Key: i,
        Value: e
      };
    };
    this.wOt = () => CookController_1.CookController.GetMaxCreateCount(this.ETt, ModelManager_1.ModelManager.CookModel.CurrentCookListType);
    this.LGt = t => {
      this.t6 = t;
      this.DGt();
    };
    this.bl = () => {
      if (this.GetActive()) {
        if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
          this.dFe = ModelManager_1.ModelManager.CookModel.GetCookRoleId(this.ETt);
          ModelManager_1.ModelManager.CookModel.CurrentCookRoleId = this.dFe;
          this.AOt = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(this.ETt);
        } else {
          this.POt = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(this.ETt);
        }
        this.t6 = 1;
        this.T2e();
        this.BOt();
        this.bOt();
        this.qOt();
        this.M3e();
        this.GOt();
      }
    };
    this.NOt = () => {
      this.dFe = ModelManager_1.ModelManager.CookModel.CurrentCookRoleId;
      this.bOt();
    };
    this.OOt = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenCookRole, this.ETt);
    };
    this.Mke = () => {
      if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
        ModelManager_1.ModelManager.CookModel.CleanAddExp();
        CookController_1.CookController.SendCookFoodRequest(this.ETt, this.dFe, this.t6);
      } else {
        CookController_1.CookController.SendFoodProcessRequest(this.ETt, ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList(), this.t6);
      }
    };
    this.aOt = () => {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MaterialShort");
    };
    this.xOt = t => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t.L8n);
    };
    this.kOt = () => {
      this.bl();
    };
    this.FOt = () => {
      var t;
      if (this.GetActive()) {
        (t = new CookModel_1.CookRewardPopData()).CookRewardPopType = 2;
        UiManager_1.UiManager.OpenView("CookSuccessView", t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIHorizontalLayout], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.Mke], [6, this.aOt]];
  }
  OnStart() {
    this.LOt = new OpenCookRoleButton(this.GetItem(4));
    this.LOt.BindOnCallback(this.OOt);
    this.oOt = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(2), this.nOt);
    this.ROt = new AmountItem(this.GetItem(5));
    this.ROt.BindGetMaxCallback(this.wOt);
    this.ROt.BindSetSumCallback(this.LGt);
    this.DOt = new CookItemView_1.IconItem(this.GetItem(1));
  }
  OnBeforeDestroy() {
    this.Cde();
    this.oOt.ClearChildren();
    this.oOt = undefined;
    this.ROt = undefined;
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CookSuccess, this.kOt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MachiningSuccess, this.FOt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MachiningSuccess, this.bl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseCookRole, this.NOt);
  }
  Cde() {
    if (!this.UOt) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CookSuccess, this.kOt);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MachiningSuccess, this.FOt);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MachiningSuccess, this.bl);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseCookRole, this.NOt);
    }
  }
  HideView(t) {
    this.SetActive(!t);
    if (!t) {
      ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 3;
    }
  }
  ShowView(t) {
    ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 3;
    this.SetActive(true);
    if (this.UOt) {
      this.dde();
      this.UOt = false;
    }
    this.ETt = t;
    this.bl();
  }
  T2e() {
    let t = undefined;
    t = (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0 ? this.AOt : this.POt).Name;
    this.GetText(0).ShowTextNew(t);
  }
  BOt() {
    let t = undefined;
    t = ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0 ? this.AOt.FoodItemId : this.POt.FinalItemId;
    this.DOt.SetIcon(t);
    this.DOt.SetQuality(t);
  }
  bOt() {
    if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
      this.LOt.SetActive(true);
      this.LOt.RefreshIcon(this.dFe);
      this.LOt.RefreshRedDot(this.dFe, this.ETt);
    } else {
      this.LOt.SetActive(false);
    }
  }
  qOt() {
    var t = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(this.ETt, ModelManager_1.ModelManager.CookModel.CurrentCookListType);
    this.oOt.RebuildLayoutByDataNew(t);
  }
  DGt() {
    for (const t of this.oOt.GetLayoutItemMap().values()) {
      t.RefreshNeed(this.t6);
    }
  }
  M3e() {
    var t;
    var e = this.GetButton(3).GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass());
    var i = this.GetButton(6).GetOwner();
    if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
      t = CookController_1.CookController.CheckCanCook(this.ETt);
      e.SetInteractable(t);
      i.GetUIItem().SetUIActive(!t);
    } else {
      t = CookController_1.CookController.CheckCanProcessed(this.ETt);
      e.SetInteractable(t);
      i.GetUIItem().SetUIActive(!t);
    }
  }
  GOt() {
    this.ROt.ResetSum();
    this.ROt.RefreshAddAndDelButton();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    t = this.GetGuideUiItem(t[1]);
    if (t) {
      return [t, t];
    }
  }
}
exports.CookView = CookView;
class OpenCookRoleButton extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.G6e = undefined;
    this.VOt = () => {
      if (this.G6e) {
        this.G6e();
      }
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.VOt]];
  }
  RefreshIcon(t) {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    this.SetRoleIcon(e.GetRoleConfig().RoleHeadIcon, this.GetTexture(1), t);
  }
  RefreshRedDot(t, e) {
    this.GetItem(2).SetUIActive(CookController_1.CookController.CheckIsBuffEx(t, e));
  }
  BindOnCallback(t) {
    this.G6e = t;
  }
}
class AmountItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.HOt = 1;
    this.jOt = undefined;
    this.WOt = undefined;
    this.KOt = undefined;
    this.QOt = t => {
      var e = this.XOt();
      this.HOt = e < t ? e : t;
      if (this.HOt < 1) {
        this.HOt = 1;
      }
      if (this.WOt) {
        this.WOt(this.HOt);
      }
      this.GetText(3).SetText(this.HOt.toString());
      this.RefreshAddAndDelButton();
    };
    this._o = () => {
      this.HOt += 1;
      if (this.WOt) {
        this.WOt(this.HOt);
      }
      this.RefreshAddAndDelButton();
      this.GetText(3).SetText(this.HOt.toString());
    };
    this.MTt = () => {
      --this.HOt;
      if (this.WOt) {
        this.WOt(this.HOt);
      }
      this.RefreshAddAndDelButton();
      this.GetText(3).SetText(this.HOt.toString());
    };
    this.$Ot = () => {
      this.YOt();
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this._o], [1, this.MTt], [2, this.$Ot]];
  }
  OnStart() {
    this.GetText(3).SetText(this.HOt.toString());
  }
  async JOt() {
    this.KOt = new CommonCountPanel_1.CommonItemCountPanel();
    await this.KOt.CreateThenShowByResourceIdAsync("UiItem_ShopCountPanel_Prefab", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Normal));
    this.KOt.SetConfirmFunction(this.QOt);
  }
  ResetSum() {
    this.HOt = 1;
    this.GetText(3).SetText(this.HOt.toString());
  }
  RefreshAddAndDelButton() {
    this.GetButton(1).GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass()).SetInteractable(this.HOt !== 1);
    this.GetButton(0).GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass()).SetInteractable(this.HOt < this.XOt());
  }
  BindGetMaxCallback(t) {
    this.jOt = t;
  }
  BindSetSumCallback(t) {
    this.WOt = t;
  }
  XOt() {
    if (this.jOt) {
      var t = this.jOt();
      if (t !== 0) {
        return t;
      }
    }
    return 1;
  }
  async YOt() {
    if (!this.KOt) {
      await this.JOt();
    }
    this.KOt.PlayStartSequence(this.HOt);
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("CookInputCount");
    this.KOt.SetTitleText(t);
  }
}
//# sourceMappingURL=CookView.js.map