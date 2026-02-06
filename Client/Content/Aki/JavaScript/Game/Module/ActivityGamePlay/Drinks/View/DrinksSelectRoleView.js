"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksSelectRoleView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const DrinksDefine_1 = require("../DrinksDefine");
const DrinksRoleSelectItem_1 = require("./Item/DrinksRoleSelectItem");
class DrinksSelectRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.tFe = undefined;
    this.bOe = undefined;
    this.wVl = undefined;
    this.QZt = -1;
    this.c3f = undefined;
    this.vZf = true;
    this.m8t = undefined;
    this.u9g = false;
    this.Yai = e => {
      this.QZt = e;
      this.tFe.RefreshWithoutDataSync();
      this.RefreshRoleSelect();
    };
    this.fDf = e => this.QZt === e;
    this.JGe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.uyi = () => {
      var e = new DrinksRoleSelectItem_1.DrinksRoleSelectItem();
      e.IsSelectOnCb = this.fDf;
      e.OnToggleStateChangeFunction = this.Yai;
      return e;
    };
    this.J2i = () => {
      ModelManager_1.ModelManager.DrinksModel.GetSceneController().ShowNpc();
      ModelManager_1.ModelManager.DrinksModel.EntityHideOnCloseInviteView();
      UiManager_1.UiManager.ResetToBattleView();
    };
    this.iGu = () => {
      this.vZf = false;
      UiLayer_1.UiLayer.SetShowMaskLayer("DrinksSelectRoleView", true);
      var e = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfig(this.QZt);
      var i = this.OpenParam;
      ControllerHolder_1.ControllerHolder.DrinksController.SelectRoleAndPlaySeq(e.RoleId, i).then(e => {
        this.u9g = e;
      });
    };
    this.Azf = () => {
      var e = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfig(this.QZt);
      var i = ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkMix(e.DrinksFavor);
      var t = ModelManager_1.ModelManager.DrinksModel.GetDrinksConfigById(i.MixArray[0]);
      var i = ModelManager_1.ModelManager.DrinksModel.GetDrinksConfigById(i.MixArray[1]);
      var t = {
        Data: {
          RequireId: 0,
          DrinkBase: [t.GetMenuBaseId(), i.GetMenuBaseId()],
          Batching: e.DrinksFavorBatching,
          Ornament: e.DrinksFavorOrnament
        },
        RoleId: e.RoleId,
        IsGamePlay: false
      };
      UiManager_1.UiManager.OpenView("DrinksShowView", t);
    };
    this.W3g = () => {
      var e = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfig(this.QZt);
      ControllerHolder_1.ControllerHolder.DrinksController.RequestMixDrinkRoleReward(this.QZt, e.RoleId).then(e => {
        if (e) {
          this.jqe();
        }
      });
    };
    this.djo = () => {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewChange, this.djo);
      UiLayer_1.UiLayer.SetShowMaskLayer("DrinksSelectRoleView", false);
    };
    this.MRf = () => {
      var e = [];
      for (const i of ConfigManager_1.ConfigManager.DrinksConfig.GetAllInvite()) {
        e.push(i.Id);
      }
      this.tFe.RefreshByData(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UITexture], [10, UE.UIScrollViewWithScrollbarComponent], [11, UE.UIItem], [12, UE.UISprite], [13, UE.UISprite], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIButtonComponent], [17, UE.UINiagara], [18, UE.UIButtonComponent], [19, UE.UIItem]];
    this.BtnBindInfo = [[16, this.Azf], [18, this.W3g]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotViewChange, this.djo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDrinksUnlockClickedNotify, this.MRf);
    this.vZf = true;
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDrinksUnlockClickedNotify, this.MRf);
    if (this.vZf) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewChange, this.djo);
    }
  }
  async OnBeforeStartAsync() {
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    await this.wVl.CreateThenShowByActorAsync(this.GetItem(15).GetOwner());
    this.wVl.SetButtonVisible(false);
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(this.J2i);
    this.CaptionItem.SetHelpBtnActive(true);
    this.CaptionItem.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(DrinksDefine_1.DRINKS_HELP_ID);
    });
    this.tFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.uyi);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(10), this.JGe);
  }
  OnStart() {
    this.m8t = new ButtonItem_1.ButtonItem(this.GetItem(14));
    this.m8t.SetFunction(this.iGu);
    this.InitRoleSelect();
    var e = ModelManager_1.ModelManager.DrinksModel.GetCameraNameByLevelId(this.QZt);
    this.c3f = e;
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.DrinksModel.GetSceneController().HideNpc();
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
    this.MRf();
    this.RefreshRoleSelect(true);
    ModelManager_1.ModelManager.DrinksModel.EntityShowOnOpenInviteView();
  }
  OnBeforeHide() {
    if (this.u9g) {
      this.u9g = false;
    } else {
      UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
    }
  }
  InitRoleSelect() {
    var e = [];
    for (const i of ConfigManager_1.ConfigManager.DrinksConfig.GetAllInvite()) {
      if (ModelManager_1.ModelManager.DrinksModel.CheckLevelIsUnlock(i.Id)) {
        this.QZt = i.Id;
      }
      e.push(i.Id);
    }
    if (this.QZt === -1) {
      this.QZt = e[0];
    }
    this.tFe.RefreshByData(e, undefined, true);
  }
  RefreshRoleSelect(e = false) {
    var i = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfig(this.QZt);
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i.RoleId);
    var n = ModelManager_1.ModelManager.DrinksModel.GetCameraNameByLevelId(this.QZt);
    this.c3f = n;
    if (!e) {
      this.m3f();
    }
    this.GetText(3).ShowTextNew(t.Name);
    var n = ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkMix(i.DrinksFavor);
    var e = ModelManager_1.ModelManager.DrinksModel.CheckLevelIsUnlock(this.QZt);
    let r = false;
    var t = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetDrinksProgressMap();
    if (e) {
      a = t.get(i.RoleId);
      r = a?.MaxLike ?? false;
      this.cBg();
    } else {
      this.wVl.SetTextByTextId(i.LockTxt);
    }
    var a = this.GetText(6).changeColor;
    this.GetText(6)?.SetChangeColor(r, a);
    this.GetItem(8)?.SetUIActive(!r);
    this.GetTexture(9)?.SetUIActive(r);
    this.GetSprite(4)?.SetUIActive(!r);
    this.GetItem(5)?.SetUIActive(r);
    this.GetButton(16)?.RootUIComp.SetUIActive(r);
    this.m8t.SetUiActive(e);
    var a = t.has(i.RoleId) ? "Drinks_Button_Next" : "Drinks_Button_First";
    this.m8t.SetLocalTextNew(a);
    this.wVl.SetUiActive(!e);
    if (r) {
      this.SetTextureByPath(n.Icon, this.GetTexture(9));
      this.GetText(6).ShowTextNew(n.Name);
      this.GetText(7).ShowTextNew(i.DrinksUnlock);
    } else {
      this.GetText(6).SetText("???");
      this.GetText(7).ShowTextNew(i.DrinksLock);
    }
    this.jqe();
  }
  jqe() {
    var e = ModelManager_1.ModelManager.DrinksModel.CheckLevelIsUnlock(this.QZt);
    var i = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfig(this.QZt);
    let t = false;
    let n = false;
    if (e) {
      e = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetDrinksProgressMap().get(i.RoleId);
      t = e?.FirstPass ?? false;
      n = e?.RewardGet ?? false;
      this.cBg();
    }
    e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(i.FirstAward);
    this.GetSprite(12)?.SetUIActive(!t);
    this.GetItem(19)?.SetUIActive(t && !n);
    this.GetButton(18)?.RootUIComp.SetUIActive(t && !n);
    this.GetSprite(13)?.SetUIActive(n);
    this.bOe.RefreshByData(e, () => {
      this.bOe.GetScrollItemList().forEach(e => {
        e.SetReceivedVisible(n);
      });
    });
  }
  PushCameraHandle(e, i, t) {
    if (this.c3f) {
      UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(this.c3f, i, t);
    }
  }
  PopCameraHandle(e, i, t, n) {
    if (this.c3f) {
      UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(this.c3f, i, t, n);
    }
  }
  m3f() {
    if (this.c3f) {
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByOpenView(this.c3f);
    }
  }
  cBg() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DrinksUnlockLevelClicked);
    let i = false;
    if (!e || !e.has(this.QZt)) {
      i = true;
    }
    if (e) {
      if (e.has(this.QZt)) {
        return;
      }
      e.add(this.QZt);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DrinksUnlockLevelClicked, e);
    } else {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DrinksUnlockLevelClicked, new Set([this.QZt]));
    }
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDrinksUnlockClickedNotify);
    }
  }
}
exports.DrinksSelectRoleView = DrinksSelectRoleView;
//# sourceMappingURL=DrinksSelectRoleView.js.map