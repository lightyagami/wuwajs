"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryPickUpMobileView = undefined;
const UE = require("ue");
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
const HonamiStoryInteractController_1 = require("./Backpack/HonamiStoryInteractController");
const HonamiStoryMobileEquipPanel_1 = require("./Backpack/HonamiStoryMobileEquipPanel");
const HonamiStoryItemTipsAttrChange_1 = require("./Backpack/Item/HonamiStoryItemTipsAttrChange");
const HonamiStoryItemTipsBase_1 = require("./Backpack/Item/HonamiStoryItemTipsBase");
const HonamiStoryItemTipsDetail_1 = require("./Backpack/Item/HonamiStoryItemTipsDetail");
const HonamiStorySkillDescToggle_1 = require("./Backpack/Item/HonamiStorySkillDescToggle");
class HonamiStoryPickUpMobileView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.EIm = undefined;
    this.CCd = undefined;
    this.mCd = undefined;
    this.fCd = new HonamiStoryInteractController_1.HonamiStoryInteractController();
    this.dhm = new HonamiStoryBackpackLogicController_1.HonamiStoryBackpackLogicController();
    this.lqe = undefined;
    this._U1 = undefined;
    this.Zmm = undefined;
    this.P0m = undefined;
    this.p4m = undefined;
    this.C1m = undefined;
    this.D1c = () => {
      if (this.C1m) {
        this.C1m();
      }
    };
    this.lyt = () => {
      this.CloseMe();
    };
    this.IIm = () => {
      this.EIm.OnClickedEquipToggle();
    };
    this.TIm = () => {
      this.EIm.OnClickedBackpackToggle();
    };
    this.efm = (i, t) => {
      this.tfm(i, t);
    };
    this.ifm = () => {
      this.rfm();
    };
    this.jbe = (i, t, s, e) => {
      this.rfm();
      this.jt_(i, t, s, e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIExtendToggle], [7, UE.UIExtendToggle], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[5, this.D1c], [6, this.IIm], [7, this.TIm]];
  }
  async OnBeforeStartAsync() {
    ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogic(this.dhm);
    this.dhm.SetInteractController(this.fCd);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(3));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HonamiStoryDefine_1.HONAMI_HELP_BACKPACK);
    });
    var i = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(i);
    this.Zmm = new HonamiStoryItemTipsDetail_1.HonamiStoryItemTipsDetail();
    this.P0m = new HonamiStoryItemTipsAttrChange_1.HonamiStoryItemTipsAttrChange();
    this.p4m = new HonamiStorySkillDescToggle_1.HonamiStorySkillDescToggle();
    await Promise.all([this.lqe.SetCurrencyItemList([i.InnerItemId]), this.fCd.Init(this.GetItem(2)), this.pCd(), this.bIm(), this.gCd(), this.p4m.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()), this.Zmm.CreateByResourceIdAsync("UiItem_TipHonamiStoryItemDetail", this.GetItem(4)), this.P0m.CreateByResourceIdAsync("UiItem_TipHonamiStoryAttrChange", this.GetItem(4))]);
    this.dhm.RegisterBackpackView(undefined);
    this.Zmm.SetUiActive(false);
    this.P0m.SetUiActive(false);
    ModelManager_1.ModelManager.HonamiStoryModel.QuickAllRefresh();
  }
  OnStart() {
    this.GetItem(8).SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
    this.rU1();
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
    await this.CCd.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    await this.CCd.Init(i);
  }
  async bIm() {
    this.EIm = new HonamiStoryMobileEquipPanel_1.HonamiStoryMobileEquipPanel();
    this.EIm.ToggleA = this.GetExtendToggle(6);
    this.EIm.ToggleB = this.GetExtendToggle(7);
    this.EIm.MoveUpItem = this.GetItem(8);
    this.EIm.MoveDownItem = this.GetItem(9);
    this.EIm.OnEnterGridCb = this.efm;
    this.EIm.OnExitGridCb = this.ifm;
    this.EIm.OnDownGridCb = this.ifm;
    this.EIm.OnClickedGridCb = this.jbe;
    this.fCd.RegisterPanel(this.EIm);
    this.dhm.RegisterPanel(this.EIm);
    this.EIm.RegisterDragController(this.fCd);
    await this.EIm.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.EIm.Init();
  }
  async gCd() {
    this.mCd = new HonamiStoryDiscardBackpackPanel_1.HonamiStoryDiscardBackpackPanel();
    this.fCd.RegisterPanel(this.mCd);
    this.mCd.RegisterDragController(this.fCd);
    await this.mCd.CreateThenShowByActorAsync(this.GetItem(11).GetOwner());
  }
  async rU1() {
    this._U1 = new HonamiStoryItemTipsBase_1.HonamiStoryItemTipsBase();
    this._U1.SetTipsState(0);
    this._U1.SetMaskAttach(this.GetButton(5));
    this.GetButton(5)?.RootUIComp.SetUIActive(false);
    this.C1m = this._U1.OnClickedMask;
    await this._U1.CreateByResourceIdAsync("UiItem_TipHonamiStoryItem", this.GetItem(4));
    this._U1.SetEnable(false);
    this.dhm.RegisterTipsItem(this._U1);
  }
  jt_(i, t, s, e) {
    var a;
    if (i && i.GetData()) {
      this.fCd.OnClickedItem(true, i.GetData().GetIncId(), i);
      a = i.GetData();
      this._U1?.Refresh(a, e, a.GetPosition(), i.OnHideCallback, t, s);
    }
  }
  ShowTipsAttrChange(i, t) {
    this.Zmm.SetUiActive(false);
    this.P0m.SetUiActive(false);
    if (i && t.OperateData && t.OperateData.GetItemType() !== 2 && (i = i.GetData()) && (i = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(i.GetIncId()), t = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(t.OperateData.GetIncId()), i)) {
      this.P0m.SetUiActive(true);
      this.P0m.Refresh(i, t, () => {
        this.P0m.GetRootItem().SetUIParent(this.fCd.GetDragTipsRoot());
      });
    }
  }
  OnBeforeShow() {
    this.fCd.OnBeforeShow();
    this.p4m?.RefreshState();
  }
  rfm() {
    this.Zmm.SetUiActive(false);
  }
  tfm(i, t) {
    var s = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState() === 4;
    var e = this._U1?.GetActive() ?? false;
    var a = HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView();
    if (!!i && !!i.GetData() && !s && !e && !a) {
      s = i.GetData();
      this.Zmm.Refresh(s, t);
      this.Zmm.SetAutoLocation(i.GetRootItem());
      this.Zmm.SetUiActive(true);
    }
  }
}
exports.HonamiStoryPickUpMobileView = HonamiStoryPickUpMobileView;
//# sourceMappingURL=HonamiStoryPickUpMobileView.js.map