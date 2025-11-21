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
    this.Wrm = new HonamiStoryBackpackLogicController_1.HonamiStoryBackpackLogicController();
    this.lqe = undefined;
    this._U1 = undefined;
    this.O1m = undefined;
    this.scm = undefined;
    this.cEm = undefined;
    this.Qnm = undefined;
    this.tpm = 0;
    this.abm = undefined;
    this.lyt = () => {
      this.CloseMe();
    };
    this.G1m = (i, t) => {
      this.F1m(i, t);
    };
    this.N1m = () => {
      this.V1m();
    };
    this.acm = (i, t) => {
      this.hcm(i, t);
    };
    this.jbe = (i, t, e, a) => {
      this.V1m();
      this.jt_(i, t, e, a);
    };
    this.D1c = () => {
      if (this.Qnm) {
        this.Qnm();
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
    this.tpm = this.GetItem(1).GetHeight();
    ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogic(this.Wrm);
    this.Wrm.SetInteractController(this.fCd);
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
    this.O1m = new HonamiStoryItemTipsDetail_1.HonamiStoryItemTipsDetail();
    this.scm = new HonamiStoryItemTipsAttrChange_1.HonamiStoryItemTipsAttrChange();
    this.abm = new HonamiStorySkillDescToggle_1.HonamiStorySkillDescToggle();
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().InitInteract(this.GetItem(2));
    var a = [this.fCd.Init(this.GetItem(2)), this.$Xl(), this.wgd(), this.gCd(), this.abm.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.O1m.CreateByResourceIdAsync("UiItem_TipHonamiStoryItemDetail", this.GetItem(5)), this.scm.CreateByResourceIdAsync("UiItem_TipHonamiStoryAttrChange", this.GetItem(5))];
    if (!HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      this.cEm = new HonamiStoryItemTipsHotKey_1.HonamiStoryItemTipsHotKey();
      a.push(this.cEm.CreateByResourceIdAsync("UiItem_TipHonamiStoryHotKey", this.GetItem(5)));
    }
    if (e) {
      e = i ? t.InnerItemId : t.OutCoinItemId;
      a.push(this.lqe.SetCurrencyItemList([e]));
    }
    await Promise.all(a);
    this.O1m.SetUiActive(false);
    this.cEm?.SetUiActive(false);
    this.scm.SetUiActive(false);
    this.Wrm.RegisterBackpackView(this);
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
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(i);
    if (i) {
      i.ClearNewInBackpack();
    }
    ModelManager_1.ModelManager.HonamiStoryModel.SetGamepadLogic(undefined);
    ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogic(undefined);
  }
  async wgd() {
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData();
    this.Rgd = new HonamiStoryEquipBackpackPanel_1.HonamiStoryEquipBackpackPanel();
    this.Rgd.ViewPanelHeight = this.tpm;
    this.Rgd.OnEnterGridCb = this.G1m;
    this.Rgd.OnExitGridCb = this.N1m;
    this.Rgd.OnDownGridCb = this.N1m;
    this.Rgd.OnCheckAttrGridCb = this.acm;
    this.Rgd.OnClickedGridCb = this.jbe;
    this.Wrm.RegisterPanel(this.Rgd);
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
    this.Wrm.RegisterPanel(this.HXl);
    this.HXl.OnEnterGridCb = this.G1m;
    this.HXl.OnExitGridCb = this.N1m;
    this.HXl.OnDownGridCb = this.N1m;
    this.HXl.OnCheckAttrGridCb = this.acm;
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
    this.Qnm = this._U1.OnClickedMask;
    await this._U1.CreateByResourceIdAsync("UiItem_TipHonamiStoryItem", this.GetItem(5));
    this._U1.SetUiActive(false);
    this.Wrm.RegisterTipsItem(this._U1);
  }
  OnBeforeShow() {
    this.fCd.OnBeforeShow();
    this.abm?.RefreshState();
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
      this.cEm?.GetRootItem().SetUIParent(this.GetItem(5));
      this.cEm?.SetAutoLocation(i.GetRootItem());
      this.cEm?.SetUiActive(true);
    }
  }
  HideAllTips() {
    this._U1?.SetTipsVisible(false);
    this.O1m.SetUiActive(false);
    this.scm.SetUiActive(false);
    this.cEm?.SetUiActive(false);
  }
  F1m(i, t) {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    var a = e === 4;
    var e = e === 1 || e === 2;
    var s = HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView();
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().SetCurItem(i);
    if (!!i && !!i.GetData() && !a && !e && !s) {
      a = i.GetData();
      this.O1m.Refresh(a, t);
      if (this.cEm) {
        this.O1m.AddHotKey(this.cEm.GetRootItem());
      }
      this.O1m.SetAutoLocation(i.GetRootItem());
      this.O1m.SetUiActive(true);
    }
  }
  V1m() {
    this.O1m.SetUiActive(false);
  }
  hcm(i, t) {
    this.O1m.SetUiActive(false);
    this.scm.SetUiActive(false);
    if (i && t.OperateData && t.OperateData.GetItemType() !== 2 && (i = i.GetData()) && (i = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(i.GetIncId())) !== (t = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(t.OperateData.GetIncId()))) {
      this.scm.SetUiActive(true);
      if (Info_1.Info.IsInGamepad()) {
        this.scm.Refresh(i, t, () => {
          this.scm.GetRootItem().SetUIParent(this.fCd.GetDragTipsRoot());
          if (this.cEm) {
            this.scm.AddHotKey(this.cEm.GetRootItem());
          }
        });
      } else {
        this.scm.Refresh(i, t, () => {
          this.scm.GetRootItem().SetUIParent(this.fCd.GetDragTipsRoot());
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
    this.cEm?.SetUiActive(false);
  }
  SetSellMode(i) {
    this.lqe?.SetCloseBtnActive(!i);
    this.lqe?.SetHelpBtnActive(!i);
    this.lqe?.SetHomeBtnShowState(!i);
    if (i) {
      this.V1m();
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