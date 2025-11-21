"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingDevelopTypeItem = exports.TrapDefenseBuildingDevelopTypeGridItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseBuildingDevelopTypeGridItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.SXu = undefined;
    this.OnItemClickCallback = undefined;
    this.CanExecuteChangeCb = undefined;
    this.OnPointDownCb = undefined;
    this.OnPointUpCb = undefined;
    this.Vji = () => {
      this.OnPointDownCb?.(this, this.SXu);
    };
    this.Hji = () => {
      this.OnPointUpCb?.(this, this.SXu);
    };
  }
  OnStart() {
    this.BindOnExtendTogglePress(this.Vji);
    this.BindOnExtendToggleRelease(this.Hji);
  }
  OnRefresh(e, t, i) {
    this.SXu = e;
    this.SetSelected(t, true);
    this.UpdateInfo();
  }
  UpdateInfo() {
    var e = this.SXu.GetIsUnlock() ? "TowerDefense_Building_BdLv_Text" : "TowerDefense_Building_BdLock_Text";
    var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckNeedOrganNew(this.SXu);
    var i = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckSlotEquipped(this.SXu);
    var s = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(this.SXu.Id);
    var h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ItemQualityNormal");
    var r = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetIsRecommendOrgan(this.SXu);
    var e = {
      Type: 4,
      Data: this.SXu,
      IsRecommendVisible: r,
      BottomTextId: e,
      BottomTextParameter: [this.SXu?.GetIsUnlock ? this.SXu?.GetLevel() : ""],
      IsLockVisible: !this.SXu?.GetIsUnlock(),
      IsRedDotVisible: !this.SXu.IsInDungeon && this.SXu?.GetIsUnlock() && this.SXu?.CheckNeedRedDot(),
      IconPath: this.SXu?.GetIconPath(),
      IsDisable: !this.SXu?.GetIsUnlock(),
      IsNewVisible: r === undefined && t,
      IsReceivedFlagVisible: i ?? undefined,
      IsBranchUpgrade: s.Branch > 0 || undefined,
      QualityIcon: h
    };
    this.Apply(e);
  }
  OnForceSelected() {
    if (ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.SetOrganClicked(this.SXu)) {
      this.UpdateState();
    }
    this.SetSelected(true, true);
  }
  OnSelected(e) {
    this.SetSelected(true);
    if (ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.SetOrganClicked(this.SXu)) {
      this.UpdateState();
    }
    if (e) {
      this.OnItemClickCallback?.(this.SXu);
    }
  }
  OnCanExecuteChange() {
    return !this.CanExecuteChangeCb || this.CanExecuteChangeCb(this.SXu);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  OnBeforeDestroy() {}
  OnExtendToggleStateChanged(e) {
    if (e === 1) {
      this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, true);
    }
  }
  UpdateState() {
    this.UpdateInfo();
  }
}
exports.TrapDefenseBuildingDevelopTypeGridItem = TrapDefenseBuildingDevelopTypeGridItem;
class TrapDefenseBuildingDevelopTypeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.ypt = [];
    this.lFd = undefined;
    this._Fd = false;
    this.OnPointerDownCb = undefined;
    this.OnPointerUpCb = undefined;
    this.Layout = undefined;
    this.W2e = () => {
      var e = new TrapDefenseBuildingDevelopTypeGridItem();
      e.OnItemClickCallback = this.jbe;
      e.CanExecuteChangeCb = this.Lke;
      e.OnPointDownCb = this.Ngo;
      e.OnPointUpCb = this.GFo;
      return e;
    };
    this.jbe = e => {
      var t = this.Pe.CurSelectedData;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseBuildingDevelopSelectUpdate, e);
      if (t) {
        e = this.ypt.indexOf(t);
        this.Layout.GetLayoutItemByIndex(e)?.OnDeselected(false);
      }
    };
    this.Lke = e => e !== this.Pe.CurSelectedData;
    this.Ngo = (e, t) => {
      if (this.OnPointerDownCb) {
        this.OnPointerDownCb(e, t);
      }
    };
    this.GFo = (e, t) => {
      if (this.OnPointerUpCb) {
        this.OnPointerUpCb(e, t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIGridLayout], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(4)?.SetUIActive(false);
    this.Layout = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.W2e);
  }
  SetScrollParent(e) {
    this.lFd = e;
  }
  GetChildRefreshed() {
    return this._Fd;
  }
  Refresh(e, t, i) {
    this.Pe = e;
    this.ypt = e.GetDataList();
    if (e.IsInDungeon && e.Type === 2) {
      this.mfd();
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.GetTitleId());
    }
    this._Fd = false;
    this.Layout.RefreshByData(this.ypt, () => {
      this.SetInitSelect();
      this._Fd = true;
      if (this.lFd) {
        TimerSystem_1.TimerSystem.Next(() => {
          TimerSystem_1.TimerSystem.Next(() => {
            this.lFd?.ScrollToTop(undefined, this.RootItem);
            this.lFd = undefined;
          });
        });
      }
    }, true);
  }
  mfd() {
    let e = 0;
    for (const s of ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetSlotData()) {
      var t = s.GetSlotData();
      if (t) {
        e += t?.IsBuilding ? 0 : 1;
      }
    }
    var i = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetAuxiliaryLimit();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.GetTitleId(), e, i);
  }
  UpdateEquipped() {
    if (this.Pe.IsInDungeon && this.Pe.Type === 2) {
      this.mfd();
    }
    for (const e of this.Layout.GetLayoutItemList()) {
      e.UpdateState();
    }
  }
  SetInitSelect() {
    var e;
    if (this.Pe.CurSelectedData) {
      e = this.ypt.indexOf(this.Pe.CurSelectedData);
      this.Layout.SelectGridProxy(e, false);
      this.Layout.GetLayoutItemByIndex(e)?.OnForceSelected();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseBuildingDevelopSelectUpdate, this.Pe.CurSelectedData);
    } else {
      this.Layout.DeselectCurrentGridProxy();
    }
  }
  CheckSelectedIsInTypeItem(e) {
    this.Layout.DeselectCurrentGridProxy();
    if (this.Pe.PlacementType === e.GetPlacementType()) {
      e = this.ypt.indexOf(e);
      this.Layout?.SelectGridProxy(e);
    }
  }
  CheckBottomItemIsInTypeItem(e) {
    this.Layout.DeselectCurrentGridProxy();
    return this.Pe.PlacementType === e.GetPlacementType() && (e = this.ypt.indexOf(e), this.Layout?.SelectGridProxy(e), this.Layout.GetLayoutItemByIndex(e)?.OnForceSelected(), true);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length <= 0)) {
      var t = e[0];
      if (t === "MachineGrid") {
        if (!(e.length < 3) && (e = parseInt(e[2]), !isNaN(e) && !(e < 0) && !(e >= this.ypt.length)) && (e = this.Layout.GetItemByIndex(e))) {
          return [e, e];
        } else {
          return undefined;
        }
      }
      if (t === "FirstLevelTwoGrid") {
        e = this.ypt.findIndex(e => e.GetLevel() === 2);
        if (e >= 0) {
          if (t = this.Layout?.GetItemByIndex(e)) {
            return [t, t];
          } else {
            return undefined;
          }
        }
      }
    }
  }
}
exports.TrapDefenseBuildingDevelopTypeItem = TrapDefenseBuildingDevelopTypeItem;
//# sourceMappingURL=TrapDefenseBuildingDevelopMainViewItem.js.map