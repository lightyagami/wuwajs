"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksShowView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class DrinksShowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.eGe = undefined;
    this.TZl = undefined;
    this.NeedRemove = true;
    this.jYe = () => {
      UiLayer_1.UiLayer.SetShowMaskLayer("DrinksShowView", true);
      ControllerHolder_1.ControllerHolder.DrinksController.RequestMixDrinkSettle().then(e => {
        this.NeedRemove = !e;
        if (e) {
          var i = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
          var e = ConfigManager_1.ConfigManager.DrinksConfig.GetAllInvite();
          var r = "";
          var t = ModelManager_1.ModelManager.DrinksModel.GetCurPreferenceLevel();
          for (const o of e) {
            if (o.RoleId === i) {
              ModelManager_1.ModelManager.DrinksModel.FlowSpecialRotationByRoleId(i, false);
              var r = o.AfterTalk;
              var a = o.AfterTalkStateId[t];
              var n = r.split(",");
              ControllerHolder_1.ControllerHolder.FlowController.StartFlow(n[0], Number(n[1]), a);
              ModelManager_1.ModelManager.DrinksModel.GetSceneController().Destroy();
              break;
            }
          }
        } else {
          UiLayer_1.UiLayer.SetShowMaskLayer("DrinksShowView", false);
        }
      });
    };
    this.djo = () => {
      if (this.TZl.IsGamePlay) {
        var e = ModelManager_1.ModelManager.DrinksModel.GetCurPreferenceLevel();
        var i = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
        const r = ModelManager_1.ModelManager.DrinksModel.GetSceneController();
        r.UpdateCupMontageLocation(i, e);
      }
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewChange, this.djo);
      UiLayer_1.UiLayer.SetShowMaskLayer("DrinksShowView", false);
      const r = ModelManager_1.ModelManager.DrinksModel.GetSceneController();
      r.OnEndingPlotBegin();
      this.CloseMe();
    };
    this.pXf = () => new DrinksShowTasteItem();
    this.lyt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem]];
    this.BtnBindInfo = [[8, this.jYe]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotViewChange, this.djo);
    this.NeedRemove = true;
  }
  OnRemoveEventListener() {
    if (this.NeedRemove) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewChange, this.djo);
    }
  }
  OnStart() {
    this.TZl = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(9));
    this.lqe.SetCloseBtnActive(!this.TZl.IsGamePlay);
    this.lqe.SetCloseCallBack(this.lyt);
    this.GetItem(11)?.SetUIActive(this.TZl.IsGamePlay);
    this.eGe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.pXf);
    this.Refresh();
  }
  OnBeforeShow() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
  }
  OnBeforeHide() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
  }
  OnBeforeDestroy() {
    if (!this.TZl.IsGamePlay) {
      ModelManager_1.ModelManager.DrinksModel.GetSceneController().ApplyCurrentCupState();
    }
  }
  PushCameraHandle(e, i, r) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(e, i, r);
  }
  PopCameraHandle(e, i, r, t) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(e, i, r, true);
  }
  Refresh() {
    if (this.TZl.IsGamePlay) {
      var i;
      var r = ModelManager_1.ModelManager.DrinksModel.GetCurrentFlavorValueOnStart();
      var t = [];
      for (let e = 0; e < r.length; e++) {
        if (r[e] !== 0) {
          i = {
            Type: e,
            Value: r[e]
          };
          t.push(i);
        }
      }
      this.eGe.RefreshByData(t);
      var [e] = ModelManager_1.ModelManager.DrinksModel.GetRoleState();
      var a = ModelManager_1.ModelManager.DrinksModel.GetLikenessMax();
      this.GetItem(0)?.SetUIActive(a <= e);
      var a = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
      var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a);
      var a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "DRINKS_DrinkStepFirst_ButtonText_04", a);
      this.GetButton(8)?.RootUIComp.SetUIActive(true);
    } else {
      this.GetItem(0)?.SetUIActive(false);
      this.GetButton(8)?.RootUIComp.SetUIActive(false);
      e = ModelManager_1.ModelManager.DrinksModel.GetSceneController();
      e.CacheCurrentCupState();
      e.UpdateCupActor(this.TZl.Data, this.TZl.RoleId);
    }
    a = ModelManager_1.ModelManager.DrinksModel.GetMixConfig(this.TZl.Data.DrinkBase);
    if (a) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), a.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), a.Desc);
    }
  }
}
exports.DrinksShowView = DrinksShowView;
class DrinksShowTasteItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  Refresh(e, i, r) {
    var t = ConfigManager_1.ConfigManager.DrinksConfig.GetFlavorType(e.Type);
    this.SetTextureByPath(t.Icon, this.GetTexture(0));
    this.GetText(1)?.SetText(String(e.Value));
  }
}
//# sourceMappingURL=DrinksShowView.js.map