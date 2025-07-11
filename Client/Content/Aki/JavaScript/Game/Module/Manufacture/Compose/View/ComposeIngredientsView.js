"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeIngredientsView = undefined;
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
const ComposeController_1 = require("../ComposeController");
const ComposeIngerdientsVerticalView_1 = require("./ComposeIngerdientsVerticalView");
class ComposeIngredientsView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.yTi = undefined;
    this.zOt = undefined;
    this.sOt = () => {
      if (this.GetButton(3).IsSelfInteractive) {
        CommonManager_1.CommonManager.SendManufacture(this.yTi.ConfigId, this.zOt.GetManufactureCount());
      } else {
        ComposeController_1.ComposeController.PlayCompositeFailDisplay(() => {
          ComposeController_1.ComposeController.PlayCompositeLoopDisplay();
        });
      }
    };
    this.I7e = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenHelpRole, this.yTi.ConfigId);
    };
    this.ITi = () => {
      if (this.yTi.MainType === 1) {
        this.zOt.RefreshProficiencyAndHelpRole(this.yTi);
      } else {
        this.zOt.RefreshHelpRole();
      }
    };
    this.TTi = () => {
      this.RefreshTips(this.yTi);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText]];
    this.BtnBindInfo = [[3, this.sOt]];
  }
  async OnBeforeStartAsync() {
    this.zOt = new ComposeIngerdientsVerticalView_1.ComposeIngredientsVerticalView();
    await this.zOt.CreateByActorAsync(this.GetItem(4).GetOwner());
    this.zOt.SetActive(true);
  }
  OnStart() {
    this.zOt.BindChangeClickCall(this.I7e);
    this.dde();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "ComposeButtonText");
    this.GetButton(3).SetCanClickWhenDisable(true);
  }
  OnBeforeDestroy() {
    this.Cde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseHelpRole, this.ITi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpgradeComposeLevel, this.ITi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComposeSuccess, this.TTi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComposeFail, this.TTi);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseHelpRole, this.ITi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpgradeComposeLevel, this.ITi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComposeSuccess, this.TTi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComposeFail, this.TTi);
  }
  OnSecondTimerRefresh() {
    if (this.yTi) {
      this.zOt?.OnSecondTimerRefresh();
    }
  }
  RefreshTips(e) {
    this.yTi = e;
    var e = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId);
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.ItemId);
    this.GetText(0).SetText(t);
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e.ItemId);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", t);
    this.ekt();
    switch (this.yTi.MainType) {
      case 1:
        this.LTi();
        break;
      case 2:
        this.DTi();
        break;
      case 3:
        this.RTi();
    }
  }
  ekt() {
    var e = ModelManager_1.ModelManager.ComposeModel;
    var t = e.CheckComposeMaterialEnough(this.yTi.ConfigId);
    var i = e.CheckUnlock(this.yTi);
    var s = e.CheckCoinEnough(this.yTi.ConfigId);
    var e = e.CheckLimitCount(this.yTi);
    this.GetText(7).SetText(this.ikt(i, t, s, e));
    this.GetItem(6).SetUIActive(!i || !t || !e);
    this.GetButton(3).RootUIComp.SetUIActive(i && t && e);
  }
  ikt(e, t, i, s) {
    if (e) {
      if (t) {
        if (s) {
          return "";
        } else if ((e = ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTime()) === undefined) {
          return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeCountWithoutTime");
        } else {
          return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeCount"), e);
        }
      } else {
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeMaterial");
        if (i) {
          return StringUtils_1.StringUtils.Format(t, MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Material_Text"));
        } else {
          return StringUtils_1.StringUtils.Format(t, ConfigManager_1.ConfigManager.ItemConfig.GetItemName(ComposeController_1.ComposeController.ComposeCoinId));
        }
      }
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("GenericPrompt_Unlocked_TipsText");
    }
  }
  LTi() {
    this.zOt.RefreshReagentProduction(this.yTi);
  }
  DTi() {
    this.zOt.RefreshStructure(this.yTi);
  }
  RTi() {
    this.zOt.RefreshPurification(this.yTi);
  }
}
exports.ComposeIngredientsView = ComposeIngredientsView;
//# sourceMappingURL=ComposeIngredientsView.js.map