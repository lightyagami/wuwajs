"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryPickUpBackpackView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryBackpackLogicController_1 = require("./Backpack/HonamiStoryBackpackLogicController");
const HonamiStoryBackpackPanel_1 = require("./Backpack/HonamiStoryBackpackPanel");
const HonamiStoryDiscardBackpackPanel_1 = require("./Backpack/HonamiStoryDiscardBackpackPanel");
const HonamiStoryEquipBackpackPanel_1 = require("./Backpack/HonamiStoryEquipBackpackPanel");
const HonamiStoryInteractController_1 = require("./Backpack/HonamiStoryInteractController");
const HonamiStoryItemTipsAttrChange_1 = require("./Backpack/Item/HonamiStoryItemTipsAttrChange");
const HonamiStoryItemTipsBase_1 = require("./Backpack/Item/HonamiStoryItemTipsBase");
const HonamiStoryItemTipsDetail_1 = require("./Backpack/Item/HonamiStoryItemTipsDetail");
const HonamiStoryItemTipsHotKey_1 = require("./Backpack/Item/HonamiStoryItemTipsHotKey");
const HonamiStorySkillDescToggle_1 = require("./Backpack/Item/HonamiStorySkillDescToggle");
class HonamiStoryPickUpBackpackView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Rgd = undefined;
    this.HXl = undefined;
    this.CCd = undefined;
    this.mCd = undefined;
    this.fCd = new HonamiStoryInteractController_1.HonamiStoryInteractController();
    this.dhm = new HonamiStoryBackpackLogicController_1.HonamiStoryBackpackLogicController();
    this.lqe = undefined;
    this._U1 = undefined;
    this.Zmm = undefined;
    this.P0m = undefined;
    this.M2m = undefined;
    this.ZNm = undefined;
    this.OTm = 0;
    this.C1m = undefined;
    this.lyt = () => {
      this.CloseMe();
    };
    this.efm = (i, t) => {
      this.tfm(i, t);
    };
    this.ifm = () => {
      this.rfm();
    };
    this.A0m = (i, t) => {
      this.D0m(i, t);
    };
    this.jbe = (i, t, e, s) => {
      this.rfm();
      this.jt_(i, t, e, s);
    };
    this.D1c = () => {
      if (this.C1m) {
        this.C1m();
      }
    };
    this.Etl = (i, t) => {
      if (i === 2) {
        ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().SwitchToKeyboardState();
      } else if (t === 2) {
        ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().SwitchToGamepadState(true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[6, this.D1c]];
  }
  async OnBeforeStartAsync() {
    this.OTm = this.GetItem(1).GetHeight();
    ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogic(this.dhm);
    this.dhm.SetInteractController(this.fCd);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(4));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HonamiStoryDefine_1.HONAMI_HELP_BACKPACK);
    });
    var i = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(i);
    this.Zmm = new HonamiStoryItemTipsDetail_1.HonamiStoryItemTipsDetail();
    this.M2m = new HonamiStoryItemTipsHotKey_1.HonamiStoryItemTipsHotKey();
    this.P0m = new HonamiStoryItemTipsAttrChange_1.HonamiStoryItemTipsAttrChange();
    this.ZNm = new HonamiStorySkillDescToggle_1.HonamiStorySkillDescToggle();
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().InitInteract(this.GetItem(3));
    await Promise.all([this.lqe.SetCurrencyItemList([i.InnerItemId]), this.fCd.Init(this.GetItem(3)), this.$Xl(), this.wgd(), this.pCd(), this.gCd(), this.ZNm.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.Zmm.CreateByResourceIdAsync("UiItem_TipHonamiStoryItemDetail", this.GetItem(5)), this.M2m.CreateByResourceIdAsync("UiItem_TipHonamiStoryHotKey", this.GetItem(5)), this.P0m.CreateByResourceIdAsync("UiItem_TipHonamiStoryAttrChange", this.GetItem(5))]);
    this.dhm.RegisterBackpackView(undefined);
    this.fCd.RegisterPickUpView(this);
    this.Zmm.SetUiActive(false);
    this.M2m.SetUiActive(false);
    this.P0m.SetUiActive(false);
    ModelManager_1.ModelManager.HonamiStoryModel.QuickAllRefresh();
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().RegisterPanel(this.Rgd);
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().RegisterPanel(this.HXl);
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().RegisterPanel(this.CCd);
    this.InitSequenceEvents();
  }
  OnStart() {
    this.rU1();
  }
  InitSequenceEvents() {
    this.UiViewSequence?.AddSequenceFinishEvent("Drag_Hide", () => {
      this.lqe.SetCloseBtnActive(false);
    });
    this.UiViewSequence?.AddSequenceFinishEvent("Drag_Show", () => {
      this.lqe.SetCloseBtnActive(true);
    });
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.HonamiStoryModel.SetGamepadLogic(undefined);
    ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogic(undefined);
  }
  async wgd() {
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData();
    this.Rgd = new HonamiStoryEquipBackpackPanel_1.HonamiStoryEquipBackpackPanel();
    this.Rgd.OnEnterGridCb = this.efm;
    this.Rgd.ViewPanelHeight = this.OTm;
    this.Rgd.OnExitGridCb = this.ifm;
    this.Rgd.OnDownGridCb = this.ifm;
    this.Rgd.OnCheckAttrGridCb = this.A0m;
    this.Rgd.OnClickedGridCb = this.jbe;
    this.fCd.RegisterPanel(this.Rgd);
    this.dhm.RegisterPanel(this.Rgd);
    this.Rgd.RegisterDragController(this.fCd);
    await this.Rgd.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.Rgd.Init(i);
  }
  async $Xl() {
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(2);
    this.HXl = new HonamiStoryBackpackPanel_1.HonamiStoryBackpackPanel();
    this.HXl.OnEnterGridCb = this.efm;
    this.HXl.OnExitGridCb = this.ifm;
    this.HXl.OnDownGridCb = this.ifm;
    this.HXl.OnClickedGridCb = this.jbe;
    this.fCd.RegisterPanel(this.HXl);
    this.dhm.RegisterPanel(this.HXl);
    this.HXl.RegisterDragController(this.fCd);
    await this.HXl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    await this.HXl.Init(i);
  }
  async gCd() {
    this.mCd = new HonamiStoryDiscardBackpackPanel_1.HonamiStoryDiscardBackpackPanel();
    this.fCd.RegisterPanel(this.mCd);
    this.mCd.RegisterDragController(this.fCd);
    await this.mCd.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
  }
  async rU1() {
    this._U1 = new HonamiStoryItemTipsBase_1.HonamiStoryItemTipsBase();
    this._U1.SetTipsState(0);
    this._U1.SetMaskAttach(this.GetButton(6));
    this.GetButton(6)?.RootUIComp.SetUIActive(false);
    this.C1m = this._U1.OnClickedMask;
    await this._U1.CreateByResourceIdAsync("UiItem_TipHonamiStoryItem", this.GetItem(5));
    this._U1.SetEnable(false);
    this.dhm.RegisterTipsItem(this._U1);
  }
  async pCd() {
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(3);
    this.CCd = new HonamiStoryBackpackPanel_1.HonamiStoryBackpackPanel();
    this.CCd.OnEnterGridCb = this.efm;
    this.CCd.OnExitGridCb = this.ifm;
    this.CCd.OnDownGridCb = this.ifm;
    this.CCd.OnClickedGridCb = this.jbe;
    this.fCd.RegisterPanel(this.CCd);
    this.dhm.RegisterPanel(this.CCd);
    this.CCd.RegisterDragController(this.fCd);
    await this.CCd.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    await this.CCd.Init(i);
  }
  jt_(i, t, e, s) {
    var a;
    if (i && i.GetData()) {
      this.fCd.OnClickedItem(true, i.GetData().GetIncId(), i);
      a = i.GetData();
      this._U1?.Refresh(a, s, a.GetPosition(), i.OnHideCallback, t, e);
    }
  }
  ShowTipsHotKeyOnly(i) {
    if (ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic()) {
      this.M2m.GetRootItem().SetUIParent(this.GetItem(5));
      this.M2m.SetAutoLocation(i.GetRootItem());
      this.M2m.SetUiActive(true);
    }
  }
  HideAllTips() {
    this._U1?.SetUiActive(false);
    this.Zmm.SetUiActive(false);
    this.P0m.SetUiActive(false);
    this.M2m.SetUiActive(false);
  }
  tfm(i, t) {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState() === 4;
    var s = this._U1.GetActive();
    if (i && i.GetData() && !e && !s) {
      e = i.GetData();
      ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().SetCurItem(i);
      this.Zmm.Refresh(e, t);
      if (Info_1.Info.IsInGamepad()) {
        this.Zmm.AddHotKey(this.M2m.GetRootItem());
      }
      this.Zmm.SetAutoLocation(i.GetRootItem());
      this.Zmm.SetUiActive(true);
    }
  }
  rfm() {
    this.Zmm.SetUiActive(false);
  }
  D0m(i, t) {
    this.Zmm.SetUiActive(false);
    this.P0m.SetUiActive(false);
    if (i && t.OperateData && t.OperateData.GetItemType() !== 2 && (i = i.GetData()) && (i = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(i.GetIncId()), t = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(t.OperateData.GetIncId()), i)) {
      this.P0m.SetUiActive(true);
      if (Info_1.Info.IsInGamepad()) {
        this.P0m.Refresh(i, t, () => {
          this.P0m.GetRootItem().SetUIParent(this.fCd.GetDragTipsRoot());
          this.P0m.AddHotKey(this.M2m.GetRootItem());
        });
      } else {
        this.P0m.Refresh(i, t, () => {
          this.P0m.GetRootItem().SetUIParent(this.fCd.GetDragTipsRoot());
        });
      }
    }
  }
  OnBeforeShow() {
    this.fCd.OnBeforeShow();
    this.ZNm?.RefreshState();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
  }
  OnEnterGamepadMask() {
    this.UiViewSequence?.PlaySequence("Drag_Hide");
  }
  OnExitGamepadMask() {
    this.UiViewSequence?.PlaySequence("Drag_Show");
  }
  OnDragBegin() {
    this.UiViewSequence?.PlaySequence("Drag_Hide");
  }
  OnDragEnd() {
    this.UiViewSequence?.PlaySequence("Drag_Show");
    this.M2m?.SetUiActive(false);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t;
    if (i.length !== 0) {
      if ((t = i[0]) === "RolePanel" || t === "Equips" || t === "AddBtn" || t === "UpdateBtn") {
        return this.Rgd?.GetGuideUiItemAndUiItemForShowEx(i);
      } else if (t === "BtnSell" || t === "ToggleSelect" || t === "BtnReset") {
        return this.HXl?.GetGuideUiItemAndUiItemForShowEx(i);
      } else {
        return undefined;
      }
    }
  }
}
exports.HonamiStoryPickUpBackpackView = HonamiStoryPickUpBackpackView;
//# sourceMappingURL=HonamiStoryPickUpBackpackView.js.map