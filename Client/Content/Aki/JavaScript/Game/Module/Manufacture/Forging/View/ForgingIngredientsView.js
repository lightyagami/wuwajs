"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgingIngredientsView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CommonManager_1 = require("../../Common/CommonManager");
const ForgingController_1 = require("../ForgingController");
const ForgingIngredientsVerticalView_1 = require("./ForgingIngredientsVerticalView");
class ForgingIngredientsView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ELi = undefined;
    this.zOt = undefined;
    this.TTi = () => {
      this.RefreshTips(this.ELi);
    };
    this.SLi = () => {
      this.zOt.RefreshHelpRole();
    };
    this.sOt = () => {
      if (this.GetButton(3).IsSelfInteractive) {
        if (this.ELi.IsUnlock) {
          CommonManager_1.CommonManager.SendManufacture(this.ELi.ItemId, this.zOt.GetManufactureCount());
        } else {
          ForgingController_1.ForgingController.SendForgeFormulaUnlockRequest(this.ELi.ItemId);
        }
      } else {
        ForgingController_1.ForgingController.PlayForgingFailDisplay(() => {
          ForgingController_1.ForgingController.PlayForgingLoopDisplay();
        });
      }
    };
    this.I7e = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenHelpRole, this.ELi.ItemId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText]];
    this.BtnBindInfo = [[3, this.sOt]];
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseHelpRole, this.SLi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ForgingSuccess, this.TTi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ForgingFail, this.TTi);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseHelpRole, this.SLi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ForgingSuccess, this.TTi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ForgingFail, this.TTi);
  }
  async OnBeforeStartAsync() {
    this.zOt = new ForgingIngredientsVerticalView_1.ForgingIngredientsVerticalView();
    await this.zOt.CreateByActorAsync(this.GetItem(4).GetOwner());
    this.zOt.SetActive(true);
  }
  OnStart() {
    this.dde();
    this.zOt.BindChangeClickCall(this.I7e);
    this.GetButton(3).SetCanClickWhenDisable(true);
  }
  OnBeforeDestroy() {
    this.Cde();
    this.zOt.Destroy();
  }
  OnSecondTimerRefresh() {
    if (this.ELi) {
      this.zOt?.OnSecondTimerRefresh();
    }
  }
  RefreshTips(e) {
    this.ELi = e;
    var e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e.ItemId);
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e.ItemId);
    this.GetText(0).ShowTextNew(t?.WeaponName ?? "");
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.ItemId);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", t);
    this.zOt.RefreshForging(this.ELi);
    this.ekt();
  }
  ekt() {
    let e = true;
    var t = ModelManager_1.ModelManager.ForgingModel;
    var i = t.CheckUnlock(this.ELi);
    var n = t.CheckCoinEnough(this.ELi.ItemId);
    var r = t.CheckLimitCount(this.ELi);
    let s = "";
    if (i) {
      s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponMaking");
      e = t.CheckMaterialEnough(this.ELi.ItemId);
      this.GetItem(2).SetUIActive(true);
    } else {
      s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("UnlockWeapon");
      this.GetItem(2).SetUIActive(false);
    }
    this.GetText(5).SetText(s);
    this.GetText(7).SetText(this.ikt(i, e, n, r));
    this.GetItem(6).SetUIActive(!i || !e || !r);
    this.GetButton(3).RootUIComp.SetUIActive(i && e && r);
  }
  ikt(e, t, i, n) {
    if (e) {
      if (t) {
        if (n) {
          return "";
        } else if ((e = ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTime()) === undefined) {
          return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeCountWithoutTime");
        } else {
          return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeCount"), e);
        }
      } else {
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeMaterial");
        if (i) {
          return StringUtils_1.StringUtils.Format(t, MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Material_Text"));
        } else {
          return StringUtils_1.StringUtils.Format(t, ConfigManager_1.ConfigManager.ItemConfig.GetItemName(ForgingController_1.ForgingController.ForgingCostId));
        }
      }
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("GenericPrompt_Unlocked_TipsText");
    }
  }
}
exports.ForgingIngredientsView = ForgingIngredientsView;
//# sourceMappingURL=ForgingIngredientsView.js.map