"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookingIngredientsView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CookController_1 = require("../CookController");
const CookingIngredientsVerticalView_1 = require("../CookingIngredientsVerticalView");
class CookingIngredientsView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.zOt = undefined;
    this.sOt = () => {
      if (this.GetButton(3).IsSelfInteractive) {
        if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
          ModelManager_1.ModelManager.CookModel.CleanAddExp();
          CookController_1.CookController.SendCookFoodRequest(this.fGt.ItemId, ModelManager_1.ModelManager.CookModel.CurrentCookRoleId, this.zOt.CurrentSetCount);
        } else {
          CookController_1.CookController.SendFoodProcessRequest(this.fGt.ItemId, ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList(), this.zOt.CurrentSetCount);
        }
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MaterialShort");
      }
    };
    this.ZOt = () => {
      this.ekt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText]];
    this.BtnBindInfo = [[3, this.sOt]];
  }
  async OnBeforeStartAsync() {
    this.zOt = new CookingIngredientsVerticalView_1.CookingIngredientsVerticalView();
    await this.zOt.CreateByActorAsync(this.GetItem(4).GetOwner());
    this.zOt.SetActive(true);
  }
  OnStart() {
    this.zOt.OnChangeMaterialSelectionDelegate = this.ZOt;
    this.GetButton(3).SetCanClickWhenDisable(true);
  }
  RefreshTips(e) {
    this.fGt = e;
    if (this.fGt) {
      this.tkt();
      switch (e.MainType) {
        case 0:
          this.RefreshCooking();
          break;
        case 1:
          this.lOt();
      }
    }
  }
  OnSecondTimerRefresh() {
    if (this.fGt) {
      this.zOt?.OnSecondTimerRefresh();
    }
  }
  RefreshTipsWithSavedData() {
    this.RefreshTips(this.fGt);
  }
  tkt() {
    this.P5e();
  }
  P5e() {
    var e;
    if (this.fGt.MainType === 0) {
      e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(this.fGt.ItemId);
      e = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.FoodItemId) ?? "";
      this.GetText(0).SetText(e);
    } else {
      e = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(this.fGt.ItemId);
      e = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.FinalItemId) ?? "";
      this.GetText(0).SetText(e);
    }
  }
  lOt() {
    var e = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(this.fGt.ItemId);
    var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e.FinalItemId);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", e);
    this.zOt.RefreshMachining(this.fGt);
    this.ekt();
    if (this.fGt.IsUnLock) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "CookButtonText");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "Research");
    }
  }
  RefreshCooking() {
    var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(this.fGt.ItemId);
    var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e.FoodItemId);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", e);
    this.zOt.RefreshCooking(this.fGt);
    this.ekt();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "CookButtonText");
  }
  ekt() {
    var e = this.fGt.IsUnLock;
    let i = false;
    let t = true;
    let r = true;
    if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
      var a = ModelManager_1.ModelManager.CookModel;
      i = a.CheckMaterialEnough(this.fGt.ItemId);
      t = a.CheckCoinEnough(this.fGt.ItemId);
      r = a.CheckLimitCount(this.fGt.ItemId);
    } else {
      let e = true;
      for (const s of ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList()) {
        if (!s.K6n) {
          e = false;
        }
      }
      i = ModelManager_1.ModelManager.CookModel.CheckCanProcessedNew(this.fGt.ItemId) && e;
    }
    this.GetText(7).SetText(this.ikt(e, i, t, r));
    this.GetItem(6).SetUIActive(!i || !r || !e);
    this.GetButton(3).RootUIComp.SetUIActive(i && r && e);
  }
  ikt(e, i, t, r) {
    if (e) {
      if (i) {
        if (r) {
          return "";
        } else if ((e = ModelManager_1.ModelManager.CookModel.GetRefreshLimitTime()) === undefined) {
          return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeCountWithoutTime");
        } else {
          return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeCount"), e);
        }
      } else {
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeMaterial");
        if (t) {
          return StringUtils_1.StringUtils.Format(i, MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Material_Text"));
        } else {
          return StringUtils_1.StringUtils.Format(i, ConfigManager_1.ConfigManager.ItemConfig.GetItemName(CookController_1.CookController.CookCoinId));
        }
      }
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("GenericPrompt_Unlocked_TipsText");
    }
  }
}
exports.CookingIngredientsView = CookingIngredientsView;
//# sourceMappingURL=CookingIngredientsView.js.map