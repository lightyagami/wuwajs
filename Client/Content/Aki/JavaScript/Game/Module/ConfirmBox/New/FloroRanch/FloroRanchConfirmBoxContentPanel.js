"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchConfirmBoxContentPanel = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const PowerController_1 = require("../../../Power/PowerController");
const PowerCurrencyItem_1 = require("../../../Power/SubViews/PowerCurrencyItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ConfirmBoxButton_1 = require("../ConfirmBoxButton");
class FloroRanchConfirmBoxContentPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.lbu = t;
    this.oPn = i;
    this.ButtonList = [];
    this.Config = undefined;
    this.SelectedIndex = -1;
    this.ButtonComponentList = new Array();
    this.NXs = undefined;
    this.fea = undefined;
    this.OnClose = () => {
      this.SelectedIndex = -1;
      this.ConfirmBoxButtonClick();
    };
    this.ToggleFunction = undefined;
    this.Bke = t => {
      if (this.ToggleFunction) {
        this.ToggleFunction(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [1, UE.UIExtendToggle], [2, UE.UIText]];
    this.BtnBindInfo = [[1, this.Bke]];
  }
  GetExtraPopFrameType(t) {
    if (t) {
      return t.CustomPopType;
    }
  }
  ConfirmBoxButtonClick() {
    var t = this.lbu?.CanExecuteCloseFunc;
    if (t && !t(this.SelectedIndex)) {
      if (t = this.lbu?.FunctionMap.get(this.SelectedIndex)) {
        t();
      }
    } else {
      this.oPn(this.lbu.GetCloseFunction());
    }
  }
  vqt() {
    if (this.SelectedIndex === -1) {
      if (this.Config.ButtonText.length === 1 || this.lbu.IsEscViewTriggerCallBack) {
        this.SelectedIndex = 1;
      } else {
        this.SelectedIndex = 0;
      }
    }
  }
  async OnBeforeStartAsync() {
    this.ButtonComponentList.push(this.GetButton(4));
    this.ButtonComponentList.push(this.GetButton(5));
    this.Config = ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetConfirmBoxConfig(this.lbu.ConfigId);
    var t = this.lbu.TextArgs || [];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.Config.Content, ...t);
    await this.InitButton();
    this.Mqt();
    if (this.lbu.ShowPowerItem) {
      this.fea = new PowerCurrencyItem_1.PowerCurrencyItem();
      await this.fea.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem");
      this.fea.ShowWithoutText(ItemDefines_1.EItemId.OverPower);
      this.fea.RefreshAddButtonActive();
      this.fea.SetActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10066));
      this.NXs = new PowerCurrencyItem_1.PowerCurrencyItem();
      await this.NXs.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem");
    }
  }
  InitPowerItem(t) {
    if (this.lbu.ShowPowerItem) {
      this.fea?.GetOriginalItem()?.SetUIParent(t?.PopItem?.GetCostParent());
      this.NXs?.GetOriginalItem()?.SetUIParent(t?.PopItem?.GetCostParent());
      this.NXs.ShowWithoutText(ItemDefines_1.EItemId.Power);
      this.NXs?.SetButtonFunction(() => {
        PowerController_1.PowerController.OpenPowerView();
      });
    }
  }
  async InitButton() {
    var t = this.GetItem(3);
    var i = this.Config.ButtonText.length;
    t.SetUIActive(i > 0);
    if (i !== 0) {
      var e = [];
      for (let t = 0, i = this.ButtonComponentList.length; t < i; ++t) {
        var s = this.ButtonComponentList[t];
        e.push(this.i3e(s.RootUIComp, t, () => {
          this.SelectedIndex = t + 1;
          this.ConfirmBoxButtonClick();
        }));
      }
      this.ButtonList = await Promise.all(e);
    }
  }
  async i3e(t, i, e) {
    var s = new ConfirmBoxButton_1.ConfirmBoxButton();
    await s.CreateByActorAsync(t.GetOwner());
    if (this.Config.ButtonText.length > i) {
      s.SetClickFunction(e);
      if (i + 1 === this.Config.DelayButtonIndex && this.Config.DelayTime > 0) {
        s.SetTimer(this.Config.ButtonText[i], this.Config.DelayTime, this.lbu.CanClickDuringTimer);
      } else {
        t = this.lbu.GetBtnText(i);
        if (StringUtils_1.StringUtils.IsBlank(t)) {
          s.SetTextById(this.Config.ButtonText[i]);
        } else {
          s.SetText(t);
        }
      }
    }
    if (this.lbu.InteractionMap.has(i)) {
      e = this.lbu.InteractionMap.get(i);
      s.SetBtnCanClick(e);
    }
    if (this.Config.ButtonText.length >= i + 1) {
      await s.ShowAsync();
    }
    return s;
  }
  dbt() {
    for (let t = 0, i = this.ButtonList.length; t < i; ++t) {
      this.ButtonList[t].Destroy();
    }
    this.ButtonList = [];
  }
  Mqt() {
    var t = this.lbu;
    var i = this.GetExtendToggle(1);
    var e = this.GetText(2);
    i.RootUIComp.SetUIActive(t.HasToggle);
    this.ToggleFunction = undefined;
    if (t.HasToggle && e) {
      if (StringUtils_1.StringUtils.IsBlank(t.ToggleText)) {
        if (StringUtils_1.StringUtils.IsBlank(t.ToggleTextKey)) {
          i.RootUIComp.SetUIActive(false);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.ToggleTextKey);
        }
      } else {
        e.SetText(t.ToggleText);
      }
      this.ToggleFunction = t.GetToggleFunction();
    }
  }
  OnBeforeDestroy() {
    this.dbt();
    this.vqt();
    var t = this.lbu?.FunctionMap.get(this.SelectedIndex);
    if (t) {
      t();
    }
    this.lbu?.DestroyFunction?.();
    this.NXs?.Destroy();
    this.fea?.Destroy();
  }
}
exports.FloroRanchConfirmBoxContentPanel = FloroRanchConfirmBoxContentPanel;
//# sourceMappingURL=FloroRanchConfirmBoxContentPanel.js.map