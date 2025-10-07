"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EyeProtectView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
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
    this.ZFd = undefined;
    this.qGe = [];
    this.ccc = undefined;
    this.ucc = undefined;
    this.eNd = () => {
      var t = new EyeProtectItem_1.EyeProtectItem();
      t.SelectCallback = this.tNd;
      t.CanExecuteChange = this.Bpt;
      return t;
    };
    this.tNd = t => {
      var i = t + 1;
      this.ZFd?.SelectGridProxy(t);
      this.VmCache?.OnModeValueChange(i);
      this.iNd();
      if (i === 3) {
        this.GetItem(3).SetUIActive(true);
      } else {
        this.GetItem(3).SetUIActive(false);
      }
    };
    this.Bpt = t => t !== this.ZFd?.GetSelectedGridIndex();
    this.jtu = () => {
      this.rNd();
    };
    this.rNd = () => {
      if (this.VmCache?.ModeCurValue !== 3) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("EyeProtectMode_Tips_ResetFail");
      } else {
        let t = undefined;
        var i = this.VmCache.GetSliderDataList(3);
        if (i) {
          for (const e of i) {
            e.OnChangeValue(e.DefaultCurValue);
          }
          if (this.ZFd) {
            for (const s of this.ZFd.GetLayoutItemList()) {
              if (s.Data?.GetModeValue() === 3) {
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
        if (this.ZFd) {
          this.ZFd.GetLayoutItemList().forEach(t => {
            t.OnApply(this.VmCache.ModeCurValue);
          });
        }
        if (t = this.VmCache.GetSliderDataList(3)) {
          t.forEach(t => {
            t.OnApplyValue();
          });
        }
        this.VmCache.IsDirty = false;
      }
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("EyeProtectMode_Tips_ApplySuccess");
      this.iNd();
    };
    this.oNd = t => {
      this.GetItem(6).SetUIActive(t === 0);
      this.GetItem(8).SetUIActive(t === 0);
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
    this.iNd = () => {
      if (this.VmCache?.IsDirty) {
        this.ucc?.SetEnableClick(true);
      } else {
        this.ucc?.SetEnableClick(false);
      }
      this.ucc?.SetLocalTextNew("EyeProtectMode_ApplySetting");
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
    this.VmCache.OnSliderValueChange = this.iNd;
  }
  async OnBeforeStartAsync() {
    if (this.VmCache !== undefined) {
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
      this.ccc = new ButtonItem_1.ButtonItem();
      this.ucc = new ButtonItem_1.ButtonItem();
      await Promise.all([this.VmCache.InitParam(), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.ccc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.ucc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())]);
      this.VmCache.InitSliderDataList(1);
      this.VmCache.InitSliderDataList(2);
      this.VmCache.InitSliderDataList(3);
      this.lqe.SetHelpCallBack(this.XOe);
      this.lqe.SetCloseCallBack(this.lPe);
      this.lqe.SetCurrencyItemVisible(false);
      this.lqe.SetTitleLocalText(this.VmCache.GetTitle());
      this.ccc.SetFunction(this.jtu);
      this.ccc.SetLocalTextNew("EyeProtectMode_ResetSetting");
      this.ucc.SetFunction(this.Htu);
      this.ucc.SetLocalTextNew("EyeProtectMode_ApplySetting");
      this.iNd();
      this.GetExtendToggle(5).OnStateChange.Add(this.oNd);
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
    this.GetExtendToggle(5).OnStateChange.Remove(this.oNd);
    ControllerHolder_1.ControllerHolder.EyeProtectController.SwitchFilter(true);
    ControllerHolder_1.ControllerHolder.EyeProtectController.ApplyEyeProtectSetting();
  }
  OnStart() {
    var t;
    if (this.VmCache !== undefined && (this.ZFd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.eNd), this.qGe = this.VmCache.GetModeDataList(), this.ZFd.RefreshByData(this.qGe), this.VmCache.ModeCurValue)) {
      t = this.VmCache.ModeCurValue - 1;
      this.tNd(t ?? 0);
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