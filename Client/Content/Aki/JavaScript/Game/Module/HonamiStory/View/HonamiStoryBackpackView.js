"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBackpackView = undefined;
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
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
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
class HonamiStoryBackpackView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Rgd = undefined;
    this.HXl = undefined;
    this.mCd = undefined;
    this.fCd = new HonamiStoryInteractController_1.HonamiStoryInteractController();
    this.dhm = new HonamiStoryBackpackLogicController_1.HonamiStoryBackpackLogicController();
    this.lqe = undefined;
    this._U1 = undefined;
    this.Zmm = undefined;
    this.P0m = undefined;
    this.M2m = undefined;
    this.C1m = undefined;
    this.OTm = 0;
    this.ZNm = undefined;
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
    this.jbe = (i, t, e, a) => {
      this.rfm();
      this.jt_(i, t, e, a);
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
        ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().SwitchToGamepadState(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[6, this.D1c]];
  }
  async OnBeforeStartAsync() {
    this.dhm.RegisterBackpackView(this);
    this.OTm = this.GetItem(1).GetHeight();
    ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogic(this.dhm);
    this.dhm.SetInteractController(this.fCd);
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(4));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetTitleByTextIdAndArgNew(i ? "HonamiStory_BackPack" : "HonamiStory_WareHouse");
    this.lqe.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HonamiStoryDefine_1.HONAMI_HELP_BACKPACK);
    });
    var t = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(t);
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false)?.GetPreGuideQuestFinishState() ?? false;
    this.Zmm = new HonamiStoryItemTipsDetail_1.HonamiStoryItemTipsDetail();
    this.P0m = new HonamiStoryItemTipsAttrChange_1.HonamiStoryItemTipsAttrChange();
    this.ZNm = new HonamiStorySkillDescToggle_1.HonamiStorySkillDescToggle();
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().InitInteract(this.GetItem(2));
    var a = [this.lqe.SetTitleIconByResourceId(i ? "SP_TipsBtnBIcon1" : "SP_TipsBtnBIcon2"), this.fCd.Init(this.GetItem(2)), this.$Xl(), this.wgd(), this.gCd(), this.ZNm.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.Zmm.CreateByResourceIdAsync("UiItem_TipHonamiStoryItemDetail", this.GetItem(5)), this.P0m.CreateByResourceIdAsync("UiItem_TipHonamiStoryAttrChange", this.GetItem(5))];
    if (!HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      this.M2m = new HonamiStoryItemTipsHotKey_1.HonamiStoryItemTipsHotKey();
      a.push(this.M2m.CreateByResourceIdAsync("UiItem_TipHonamiStoryHotKey", this.GetItem(5)));
    }
    if (e) {
      e = i ? t.InnerItemId : t.OutCoinItemId;
      a.push(this.lqe.SetCurrencyItemList([e]));
    }
    await Promise.all(a);
    this.Zmm.SetUiActive(false);
    this.M2m?.SetUiActive(false);
    this.P0m.SetUiActive(false);
    this.fCd.RegisterBackpackView(this);
    ModelManager_1.ModelManager.HonamiStoryModel.QuickAllRefresh();
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().RegisterPanel(this.Rgd);
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().RegisterPanel(this.HXl);
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
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() ? 2 : 1;
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(i, true);
    if (i) {
      i.ClearNewInBackpack();
    }
    ModelManager_1.ModelManager.HonamiStoryModel.SetGamepadLogic(undefined);
    ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogic(undefined);
  }
  async wgd() {
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData();
    this.Rgd = new HonamiStoryEquipBackpackPanel_1.HonamiStoryEquipBackpackPanel();
    this.Rgd.ViewPanelHeight = this.OTm;
    this.Rgd.OnEnterGridCb = this.efm;
    this.Rgd.OnExitGridCb = this.ifm;
    this.Rgd.OnDownGridCb = this.ifm;
    this.Rgd.OnCheckAttrGridCb = this.A0m;
    this.Rgd.OnClickedGridCb = this.jbe;
    this.dhm.RegisterPanel(this.Rgd);
    this.fCd.RegisterPanel(this.Rgd);
    this.Rgd.RegisterDragController(this.fCd);
    await this.Rgd.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.Rgd.Init(i);
  }
  async $Xl() {
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() ? 2 : 1;
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(i);
    if (i == 1) {
      t.RefreshOverflowCapacity();
    }
    this.HXl = new HonamiStoryBackpackPanel_1.HonamiStoryBackpackPanel();
    this.dhm.RegisterPanel(this.HXl);
    this.HXl.OnEnterGridCb = this.efm;
    this.HXl.OnExitGridCb = this.ifm;
    this.HXl.OnDownGridCb = this.ifm;
    this.HXl.OnCheckAttrGridCb = this.A0m;
    this.HXl.OnClickedGridCb = this.jbe;
    this.fCd.RegisterPanel(this.HXl);
    this.HXl.RegisterDragController(this.fCd);
    await this.HXl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    await this.HXl.Init(t);
  }
  async gCd() {
    this.mCd = new HonamiStoryDiscardBackpackPanel_1.HonamiStoryDiscardBackpackPanel();
    this.fCd.RegisterPanel(this.mCd);
    this.mCd.RegisterDragController(this.fCd);
    await this.mCd.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  async rU1() {
    this._U1 = new HonamiStoryItemTipsBase_1.HonamiStoryItemTipsBase();
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() ? 0 : 1;
    this._U1.SetTipsState(i);
    this._U1.SetMaskAttach(this.GetButton(6));
    this.GetButton(6)?.RootUIComp.SetUIActive(false);
    this.C1m = this._U1.OnClickedMask;
    await this._U1.CreateByResourceIdAsync("UiItem_TipHonamiStoryItem", this.GetItem(5));
    this._U1.SetEnable(false);
    this.dhm.RegisterTipsItem(this._U1);
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
  jt_(i, t, e, a) {
    var s;
    if (i && i.GetData()) {
      this.fCd.OnClickedItem(true, i.GetData().GetIncId(), i);
      s = i.GetData();
      this._U1?.Refresh(s, a, s.GetPosition(), i.OnHideCallback, t, e);
    }
  }
  ShowTipsHotKeyOnly(i) {
    if (ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic()) {
      this.M2m?.GetRootItem().SetUIParent(this.GetItem(5));
      this.M2m?.SetAutoLocation(i.GetRootItem());
      this.M2m?.SetUiActive(true);
    }
  }
  HideAllTips() {
    this._U1?.SetTipsVisible(false);
    this.Zmm.SetUiActive(false);
    this.P0m.SetUiActive(false);
    this.M2m?.SetUiActive(false);
  }
  tfm(i, t) {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    var a = e === 4;
    var e = e === 1 || e === 2;
    var s = HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView();
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().SetCurItem(i);
    if (!!i && !!i.GetData() && !a && !e && !s) {
      a = i.GetData();
      this.Zmm.Refresh(a, t);
      if (this.M2m && Info_1.Info.IsInGamepad()) {
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
    if (i && t.OperateData && t.OperateData.GetItemType() !== 2 && (i = i.GetData()) && (i = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(i.GetIncId())) !== (t = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(t.OperateData.GetIncId()))) {
      this.P0m.SetUiActive(true);
      if (Info_1.Info.IsInGamepad()) {
        this.P0m.Refresh(i, t, () => {
          this.P0m.GetRootItem().SetUIParent(this.fCd.GetDragTipsRoot());
          if (this.M2m) {
            this.P0m.AddHotKey(this.M2m.GetRootItem());
          }
        });
      } else {
        this.P0m.Refresh(i, t, () => {
          this.P0m.GetRootItem().SetUIParent(this.fCd.GetDragTipsRoot());
        });
      }
    }
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
  SetSellMode(i) {
    this.lqe?.SetCloseBtnActive(!i);
    this.lqe?.SetHelpBtnActive(!i);
    this.lqe?.SetHomeBtnShowState(!i);
    if (i) {
      this.rfm();
    }
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetLockUseDragState(i);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length !== 0) {
      var t = i[0];
      if (t === "RolePanel" || t === "Equips" || t === "AddBtn" || t === "UpdateBtn" || t === "Capybara" || t === "SuitDesc") {
        return this.Rgd?.GetGuideUiItemAndUiItemForShowEx(i);
      }
      if (t === "BtnSell" || t === "ToggleSelect" || t === "BtnReset" || t === "Item") {
        return this.HXl?.GetGuideUiItemAndUiItemForShowEx(i);
      }
      if (t === "SkillRoleText") {
        return this._U1?.GetGuideUiItemAndUiItemForShowEx(i);
      }
      if (t === "Plugin") {
        t = this.Rgd?.GetGuideUiItemAndUiItemForShowEx(i);
        if (t && t.length > 0) {
          return t;
        }
        t = this.HXl?.GetGuideUiItemAndUiItemForShowEx(i);
        if (t && t.length > 0) {
          return t;
        }
      }
    }
  }
}
exports.HonamiStoryBackpackView = HonamiStoryBackpackView;
//# sourceMappingURL=HonamiStoryBackpackView.js.map