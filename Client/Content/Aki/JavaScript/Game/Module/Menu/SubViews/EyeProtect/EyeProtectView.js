"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EyeProtectView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTimeDilation_1 = require("../../../../Ui/Base/UiTimeDilation");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MenuDefine_1 = require("../../MenuDefine");
const EyeProtectItem_1 = require("./EyeProtectItem");
class EyeProtectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.VmCache = undefined;
    this.lqe = undefined;
    this.W6d = undefined;
    this.qGe = [];
    this.ccc = undefined;
    this.ucc = undefined;
    this.Q6d = () => {
      var t = new EyeProtectItem_1.EyeProtectItem();
      t.SelectCallback = this.K6d;
      t.CanExecuteChange = this.Bpt;
      return t;
    };
    this.K6d = t => {
      var i = this.qGe[t];
      if (i) {
        this.W6d?.SelectGridProxy(t);
        this.VmCache?.OnModeValueChange(i.GetModeValue());
        this.X6d();
        if (i.GetModeValue() === 2) {
          this.GetItem(3).SetUIActive(true);
        } else {
          this.GetItem(3).SetUIActive(false);
        }
      }
    };
    this.Bpt = t => t !== this.W6d?.GetSelectedGridIndex();
    this.jtu = () => {
      this.Y6d();
    };
    this.Y6d = () => {
      if (this.VmCache?.ModeCurValue !== 2) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("EyeProtectMode_Tips_ResetFail");
      } else {
        let t = undefined;
        var i = this.VmCache.GetSliderDataList(2);
        if (i) {
          for (const e of i) {
            e.OnChangeValue(e.DefaultCurValue);
          }
          if (this.W6d) {
            for (const s of this.W6d.GetLayoutItemList()) {
              if (s.Data?.GetModeValue() === 2) {
                t = s;
                break;
              }
            }
            if (t) {
              t.ScrollView?.RefreshByData(i);
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("EyeProtectMode_Tips_ResetSuccess");
            }
          }
        }
      }
    };
    this.Htu = () => {
      this.zGl();
    };
    this.zGl = () => {
      var t;
      if (this.VmCache?.IsDirty) {
        this.VmCache?.OnModeValueApply();
        if (this.W6d) {
          this.W6d.GetLayoutItemList().forEach(t => {
            t.OnApply(this.VmCache.ModeCurValue);
          });
        }
        if (t = this.VmCache.GetSliderDataList(2)) {
          t.forEach(t => {
            t.OnApplyValue();
          });
          this.VmCache.IsSliderDirty = false;
        }
        ModelManager_1.ModelManager.MenuModel.IsEdited = true;
      }
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("EyeProtectMode_Tips_ApplySuccess");
      this.X6d();
    };
    this.z6d = t => {
      this.GetItem(6).SetUIActive(t === 1);
      this.GetItem(8).SetUIActive(t === 1);
    };
    this.lPe = () => {
      var t;
      if (this.VmCache?.IsDirty) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(381)).FunctionMap.set(2, () => {
          this.CloseMySelf();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        this.CloseMySelf();
      }
    };
    this.CloseMySelf = () => {
      ControllerHolder_1.ControllerHolder.FilterSettingController.CloseViewAndReturnWorld();
    };
    this.XOe = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MenuDefine_1.EYE_PROTECT_SETTING_HELP_ID);
    };
    this.X6d = () => {
      var t = this.VmCache?.IsDirty;
      this.ucc?.SetEnableClick(t);
    };
    this.bQi = t => {
      this.VmCache?.OnDragMoved?.(t);
    };
    this.Pgt = () => {
      this.VmCache?.OnDragBegin?.();
    };
    this.xgt = () => {
      this.VmCache?.OnDragEnded?.();
    };
    this.q8i = (t, i) => {
      this.VmCache?.OnInputUiLookUp?.(t, i);
    };
    this.G8i = (t, i) => {
      this.VmCache?.OnInputUiTurn?.(t, i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIItem], [7, UE.UIDraggableComponent], [8, UE.UIItem]];
  }
  OnBeforeCreate() {
    this.VmCache = this.OpenParam;
    this.VmCache.OnSliderValueChange = this.X6d;
  }
  async OnBeforeStartAsync() {
    if (this.VmCache !== undefined) {
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
      this.ccc = new ButtonItem_1.ButtonItem();
      this.ucc = new ButtonItem_1.ButtonItem();
      await Promise.all([this.VmCache.InitParam(), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.ccc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.ucc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())]);
      this.VmCache.InitSliderDataList(0);
      this.VmCache.InitSliderDataList(1);
      this.VmCache.InitSliderDataList(2);
      this.lqe.SetHelpCallBack(this.XOe);
      this.lqe.SetCloseCallBack(this.lPe);
      this.lqe.SetCurrencyItemVisible(false);
      this.lqe.SetTitleLocalText(this.VmCache.GetTitle());
      this.ccc.SetFunction(this.jtu);
      this.ccc.SetLocalTextNew("EyeProtectMode_ResetSetting");
      this.ucc.SetFunction(this.Htu);
      this.ucc.SetLocalTextNew("EyeProtectMode_ApplySetting");
      this.X6d();
      this.GetExtendToggle(5).SetToggleState(1);
      this.GetExtendToggle(5).OnStateChange.Add(this.z6d);
    }
  }
  OnBeforeShow() {
    UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag(this.Info.Name);
  }
  OnBeforeHide() {
    UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag(this.Info.Name);
  }
  OnBeforeDestroy() {
    UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.HUD, true);
    this.VmCache?.FilterCameraComponent?.ClosePhotograph();
    this.GetExtendToggle(5).OnStateChange.Remove(this.z6d);
    ControllerHolder_1.ControllerHolder.EyeProtectController.SwitchFilter(true);
    ControllerHolder_1.ControllerHolder.EyeProtectController.ApplyEyeProtectSetting();
  }
  OnStart() {
    if (this.VmCache !== undefined) {
      this.W6d = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Q6d);
      this.qGe = this.VmCache.GetModeDataList();
      this.W6d.RefreshByData(this.qGe);
      this.K6d(this.VmCache.ModeCurValue ?? 0);
    }
  }
  OnAddEventListener() {
    var t = this.GetDraggable(7);
    t?.OnPointerDragCallBack.Bind(this.bQi);
    t?.OnPointerBeginDragCallBack.Bind(this.Pgt);
    t?.OnPointerEndDragCallBack.Bind(this.xgt);
    t?.OnPointerDownCallBack.Bind(this.Pgt);
    t?.OnPointerUpCallBack.Bind(this.xgt);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
  }
  OnRemoveEventListener() {
    var t = this.GetDraggable(7);
    t?.OnPointerDragCallBack.Unbind();
    t?.OnPointerBeginDragCallBack.Unbind();
    t?.OnPointerEndDragCallBack.Unbind();
    t?.OnPointerDownCallBack.Unbind();
    t?.OnPointerUpCallBack.Unbind();
    t?.OnPointerScrollCallBack.Unbind();
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiLookUp, this.q8i);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiTurn, this.G8i);
  }
}
exports.EyeProtectView = EyeProtectView;
//# sourceMappingURL=EyeProtectView.js.map