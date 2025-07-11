"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsConfirmBoxView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const PowerController_1 = require("../../Power/PowerController");
const PowerCurrencyItem_1 = require("../../Power/SubViews/PowerCurrencyItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ConfirmBoxButton_1 = require("./ConfirmBoxButton");
class RacingBetsConfirmBoxView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ButtonList = [];
    this.Config = undefined;
    this.ConfirmBoxData = undefined;
    this.SelectedIndex = -1;
    this.ButtonComponentList = new Array();
    this.NXs = undefined;
    this.fea = undefined;
    this.OnClose = () => {
      this.SelectedIndex = -1;
      this.ConfirmBoxButtonClick();
    };
    this.lyt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.lyt], [6, this.lyt]];
  }
  async OnBeforeStartAsync() {
    this.GetText(4).SetText("");
    this.ButtonComponentList.push(this.GetButton(1));
    this.ButtonComponentList.push(this.GetButton(2));
    var t = this.OpenParam;
    this.ConfirmBoxData = t;
    this.Config = ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetConfirmBoxConfig(t.ConfigId);
    var i = StringUtils_1.StringUtils.IsBlank(t.GetTitle()) ? ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetTitle(this.Config.Title) : t.GetTitle();
    this.GetText(5).SetText(i);
    var i = t.TextArgs || [];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Config.Content, ...i);
    await this.InitButton();
    if (this.ConfirmBoxData.ShowPowerItem) {
      this.fea = new PowerCurrencyItem_1.PowerCurrencyItem();
      await this.fea.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem");
      this.fea.ShowWithoutText(ItemDefines_1.EItemId.OverPower);
      this.fea.RefreshAddButtonActive();
      this.fea.SetActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10066));
      this.NXs = new PowerCurrencyItem_1.PowerCurrencyItem();
      await this.NXs.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem");
    }
  }
  OnStart() {
    var t = this.OpenParam.AttachView?.GetRootItem();
    if (t) {
      this.ChildPopView?.GetPopViewOriginalActor().GetComponentByClass(UE.UIItem.StaticClass())?.SetUIParent(t);
    }
  }
  OnBeforeShow() {
    this.ChildPopView?.SetBackBtnShowState(this.Config.NeedClose);
    this.ChildPopView?.PopItem.SetMaskResponsibleState(this.Config.NeedMaskClose);
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.OnClose);
    if (this.ConfirmBoxData.ShowPowerItem) {
      this.fea?.GetOriginalItem()?.SetUIParent(this.ChildPopView?.PopItem?.GetCostParent());
      this.NXs?.GetOriginalItem()?.SetUIParent(this.ChildPopView?.PopItem?.GetCostParent());
      this.NXs.ShowWithoutText(ItemDefines_1.EItemId.Power);
      this.NXs?.SetButtonFunction(() => {
        PowerController_1.PowerController.OpenPowerView();
      });
    }
  }
  OnAfterShow() {
    this.ConfirmBoxData.GetAfterShowFunction()?.();
  }
  OnBeforeHide() {
    if (this.LastHide) {
      this.ConfirmBoxData?.BeforePlayCloseFunction?.();
    }
  }
  OnBeforeDestroy() {
    this.dbt();
    this.vqt();
    var t = this.ConfirmBoxData?.FunctionMap.get(this.SelectedIndex);
    if (t) {
      t();
    }
    this.ConfirmBoxData?.DestroyFunction?.();
    this.NXs?.Destroy();
    this.fea?.Destroy();
  }
  ConfirmBoxButtonClick() {
    var t = this.ConfirmBoxData?.CanExecuteCloseFunc;
    if (t && !t(this.SelectedIndex)) {
      if (t = this.ConfirmBoxData?.FunctionMap.get(this.SelectedIndex)) {
        t();
      }
    } else {
      this.CloseMe(this.ConfirmBoxData.GetCloseFunction());
    }
  }
  vqt() {
    if (this.SelectedIndex === -1) {
      if (this.Config.ButtonText.length === 1 || this.ConfirmBoxData.IsEscViewTriggerCallBack) {
        this.SelectedIndex = 1;
      } else {
        this.SelectedIndex = 0;
      }
    }
  }
  async InitButton() {
    var t = this.Config.ButtonText.length > 0;
    this.GetItem(7).SetUIActive(t);
    if (t) {
      var s = [];
      for (let t = 0, i = this.ButtonComponentList.length; t < i; ++t) {
        var e = this.ButtonComponentList[t];
        s.push(this.i3e(e.RootUIComp, t, () => {
          this.SelectedIndex = t + 1;
          this.ConfirmBoxButtonClick();
        }));
      }
      this.ButtonList = await Promise.all(s);
    }
  }
  async i3e(t, i, s) {
    var e = new ConfirmBoxButton_1.ConfirmBoxButton();
    await e.CreateByActorAsync(t.GetOwner());
    if (this.Config.ButtonText.length > i) {
      e.SetClickFunction(s);
      if (i + 1 === this.Config.DelayButtonIndex && this.Config.DelayTime > 0) {
        e.SetTimer(this.Config.ButtonText[i], this.Config.DelayTime, this.ConfirmBoxData.CanClickDuringTimer);
      } else {
        t = this.ConfirmBoxData.GetBtnText(i);
        if (StringUtils_1.StringUtils.IsBlank(t)) {
          e.SetTextById(this.Config.ButtonText[i]);
        } else {
          e.SetText(t);
        }
      }
    }
    if (this.ConfirmBoxData.InteractionMap.has(i)) {
      s = this.ConfirmBoxData.InteractionMap.get(i);
      e.SetBtnCanClick(s);
    }
    if (this.Config.ButtonText.length >= i + 1) {
      await e.ShowAsync();
    }
    return e;
  }
  dbt() {
    for (let t = 0, i = this.ButtonList.length; t < i; ++t) {
      this.ButtonList[t].Destroy();
    }
    this.ButtonList = [];
  }
}
exports.RacingBetsConfirmBoxView = RacingBetsConfirmBoxView;
//# sourceMappingURL=RacingBetsConfirmBoxView.js.map