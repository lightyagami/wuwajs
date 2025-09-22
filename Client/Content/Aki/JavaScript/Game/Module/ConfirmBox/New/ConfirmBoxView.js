"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmBoxView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const PowerController_1 = require("../../Power/PowerController");
const PowerCurrencyItem_1 = require("../../Power/SubViews/PowerCurrencyItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const ConfirmBoxButton_1 = require("./ConfirmBoxButton");
class ConfirmBoxView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ButtonList = [];
    this.PropScrollView = undefined;
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
    this.JGe = (t, i, e) => {
      var s = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      s.Initialize(i.GetOwner());
      s.RefreshByConfigId(t[0], t[1]);
      return {
        Key: e,
        Value: s
      };
    };
    this.ToggleFunction = undefined;
    this.Bke = t => {
      if (this.ToggleFunction) {
        this.ToggleFunction(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIExtendToggle], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIText]];
    this.BtnBindInfo = [[6, this.Bke]];
  }
  GetExtraPopFrameType(t) {
    if (t) {
      return t.CustomPopType;
    }
  }
  GetExtraResourceId(t) {
    return t?.CustomResourceId ?? "";
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
  OnGetTimeDilation() {
    var t = this.OpenParam;
    return ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetConfirmBoxConfig(t.ConfigId).TimeDilation;
  }
  async OnBeforeStartAsync() {
    this.ButtonComponentList.push(this.GetButton(4));
    this.ButtonComponentList.push(this.GetButton(5));
    this.PropScrollView = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(3), this.JGe);
    var t = this.OpenParam;
    this.ConfirmBoxData = t;
    this.Config = ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetConfirmBoxConfig(t.ConfigId);
    var i = StringUtils_1.StringUtils.IsBlank(t.GetTitle()) ? ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetTitle(this.Config.Title) : t.GetTitle();
    this.GetText(0).SetText(i);
    var i = t.TextArgs || [];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Config.Content, ...i);
    var i = !StringUtils_1.StringUtils.IsEmpty(t.Tip) || t.TableTxtArgNew !== undefined;
    this.GetItem(8).SetUIActive(i);
    if (t.Tip) {
      this.GetText(9).SetText(t.Tip);
    }
    if (t.TableTxtArgNew) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.TableTxtArgNew.TextKey, ...t.TableTxtArgNew.Params);
    }
    await this.InitButton();
    this.InitPropItem();
    this.Mqt();
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
      this.ChildPopView.GetPopViewOriginalActor().GetComponentByClass(UE.UIItem.StaticClass()).SetUIParent(t);
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
  async InitButton() {
    var t = this.GetItem(2);
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
        s.SetTimer(this.Config.ButtonText[i], this.Config.DelayTime, this.ConfirmBoxData.CanClickDuringTimer);
      } else {
        t = this.ConfirmBoxData.GetBtnText(i);
        if (StringUtils_1.StringUtils.IsBlank(t)) {
          s.SetTextById(this.Config.ButtonText[i]);
        } else {
          s.SetText(t);
        }
      }
    }
    if (this.ConfirmBoxData.InteractionMap.has(i)) {
      e = this.ConfirmBoxData.InteractionMap.get(i);
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
  InitPropItem() {
    var t = this.GetScrollViewWithScrollbar(3);
    var i = this.ConfirmBoxData.ItemIdMap.size;
    t.RootUIComp.SetUIActive(i > 0);
    if (i !== 0) {
      const e = [];
      this.ConfirmBoxData.ItemIdMap.forEach((t, i) => {
        e.push([i, t]);
      });
      this.PropScrollView.RefreshByData(e);
    }
  }
  Mqt() {
    var t = this.OpenParam;
    var i = this.GetExtendToggle(6);
    var e = this.GetText(7);
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
    this.PropScrollView?.ClearChildren();
    this.vqt();
    var t = this.ConfirmBoxData?.FunctionMap.get(this.SelectedIndex);
    if (t) {
      t();
    }
    this.ConfirmBoxData?.DestroyFunction?.();
    this.NXs?.Destroy();
    this.fea?.Destroy();
  }
}
exports.ConfirmBoxView = ConfirmBoxView;
//# sourceMappingURL=ConfirmBoxView.js.map