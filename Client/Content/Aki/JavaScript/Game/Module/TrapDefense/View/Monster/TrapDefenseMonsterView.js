"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const TabComponent_1 = require("../../../Common/TabComponent/TabComponent");
const ShipTowerTeamTabItem_1 = require("../../../ShipTower/View/ShipTowerTeamTabItem");
const DynScrollView_1 = require("../../../Util/ScrollView/DynScrollView");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const TrapDefenseMonsterDescPanel_1 = require("./TrapDefenseMonsterDescPanel");
const TrapDefenseMonsterTypeItem_1 = require("./TrapDefenseMonsterTypeItem");
const TrapDefenseMonsterWaveDynamicItem_1 = require("./TrapDefenseMonsterWaveDynamicItem");
const TrapDefenseMonsterWaveItem_1 = require("./TrapDefenseMonsterWaveItem");
class TrapDefenseMonsterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xcd = true;
    this.PopupCaption = undefined;
    this.TabComponent = undefined;
    this.TabDataList = undefined;
    this.ScrollMonsterType = undefined;
    this.ScrollMonsterWaveDynamic = undefined;
    this.PanelMonsterDesc = undefined;
    this.ViewModel = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster;
    this.OnBtnHelp = () => {
      var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetHelpIdMonster();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    };
    this.OnBtnClose = () => {
      this.CloseMe();
    };
    this.CreateTabItem = () => new ShipTowerTeamTabItem_1.ShipTowerTeamTabItem();
    this.OnClickTabItem = e => {
      switch (this.TabDataList[e].TabType) {
        case 0:
          this.ShowMonsterType();
          break;
        case 1:
          this.ShowMonsterWaveDynamic();
      }
    };
    this.CreateItemMonsterType = () => {
      var e = new TrapDefenseMonsterTypeItem_1.TrapDefenseMonsterTypeItem();
      e.OnSelectMonsterCallBack = this.OnSelectMonsterTypeMonster;
      return e;
    };
    this.CreateItemMonsterWave = () => {
      var e = new TrapDefenseMonsterWaveItem_1.TrapDefenseMonsterWaveItem();
      e.OnSelectMonsterCallBack = this.OnSelectMonsterWaveMonster;
      return e;
    };
    this.OnSelectMonsterTypeMonster = e => {
      this.PanelMonsterDesc.UpdateData(e);
    };
    this.OnSelectMonsterWaveMonster = (e, t) => {
      this.SetWaveSelectMonsterData(t, e);
      this.UpdateWaveSelectState();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIDynScrollViewComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this.OnBtnClose);
    this.PopupCaption.SetHelpBtnActive(true);
    this.PopupCaption.SetHelpCallBack(this.OnBtnHelp);
    this.TabComponent = new TabComponent_1.TabComponent(this.GetItem(1), this.CreateTabItem, this.OnClickTabItem, undefined);
    this.TabDataList = this.ViewModel.GetTabList();
    await this.TabComponent.RefreshTabItemByLengthAsync(this.TabDataList.length);
    var e = this.GetScrollViewWithScrollbar(3);
    var t = this.GetItem(4).GetOwner();
    this.ScrollMonsterType = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.CreateItemMonsterType, t, true);
    var e = this.GetUIDynScrollViewComponent(6);
    var t = this.GetItem(7);
    this.ScrollMonsterWaveDynamic = new DynScrollView_1.DynamicScrollView(e, t, new TrapDefenseMonsterWaveDynamicItem_1.TrapDefenseMonsterWaveDynamicItem(), this.CreateItemMonsterWave);
    await this.ScrollMonsterWaveDynamic.Init();
    var e = this.GetItem(9);
    this.PanelMonsterDesc = new TrapDefenseMonsterDescPanel_1.TrapDefenseMonsterDescPanel();
    await this.PanelMonsterDesc.Init(e);
  }
  OnStart() {
    this.InitTab();
  }
  InitTab() {
    var e;
    var t;
    for ([e, t] of this.TabComponent.GetTabItemMap()) {
      t.UpdateName(this.TabDataList[e].TabNameKey);
      t.UpdateRedDotVisible(false);
    }
    this.TabComponent.SelectToggleByIndex(this.GetJumpTabIndex(), true);
  }
  GetJumpTabIndex() {
    const t = this.ViewModel.JumpTabType;
    if (t) {
      return this.TabDataList.findIndex(e => e.TabType === t);
    } else {
      return 0;
    }
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {
    this.ViewModel.OnViewClose();
  }
  OnAfterDestroy() {}
  SetTabItemContentShow(e) {
    for (const t of [2, 5]) {
      this.GetItem(t)?.SetUIActive(e === t);
    }
  }
  ShowMonsterType() {
    this.SetTabItemContentShow(2);
    const e = this.ScrollMonsterType.GetSelectedIndex();
    var t = this.ViewModel.GetMonsterTypeDataList();
    this.ScrollMonsterType.RefreshByData(t, () => {
      this.ScrollMonsterType.SelectGridProxy(Math.max(e, 0));
    }, true);
    var t = t.length > 0;
    this.SetEmptyInfoVisible(!t);
    this.PanelMonsterDesc.SetActive(t);
  }
  ShowMonsterWaveDynamic() {
    this.ViewModel.GetMonsterTypeDataList(false);
    this.SetTabItemContentShow(5);
    var e = this.ViewModel.GetMonsterWaveDataList();
    this.ScrollMonsterWaveDynamic.RefreshByData(e, true);
    this.ScrollToCheckDynamic(e);
    var e = e.length > 0;
    this.SetEmptyInfoVisible(!e);
    this.PanelMonsterDesc.SetActive(e);
  }
  ScrollToCheckDynamic(e) {
    if (this.xcd) {
      this.xcd = false;
      const i = e.find(e => e.IsInTheCurrentWave());
      if (i) {
        t = e.findIndex(e => e === i);
        this.LateScrollToDynamic(t);
        this.SetWaveSelectMonsterData(i, i.GetMonsterDataList()[0]);
        return;
      }
    }
    var t;
    if (this.ViewModel.IsSameLevel() && this.ViewModel.Model.BattleData.GetBatch() > e.length) {
      t = e.length - 1;
      this.LateScrollToDynamic(t);
      this.SetWaveSelectMonsterData(e[t], e[t].GetMonsterDataList()[0]);
    }
    if (this.ViewModel.WaveSelectMonsterData) {
      this.PanelMonsterDesc.UpdateData(this.ViewModel.WaveSelectMonsterData);
    } else {
      this.SetWaveSelectMonsterData(e[0], e[0].GetMonsterDataList()[0]);
    }
  }
  LateScrollToDynamic(e) {
    this.ScrollMonsterWaveDynamic?.BindLateUpdate(() => {
      this.ScrollMonsterWaveDynamic?.ScrollToItemIndex(e);
      this.ScrollMonsterWaveDynamic?.UnBindLateUpdate();
    });
  }
  SetEmptyInfoVisible(e) {
    this.GetItem(8)?.SetUIActive(e);
  }
  SetWaveSelectMonsterData(e, t) {
    this.ViewModel.SetWaveSelectMonsterData(e, t);
    this.PanelMonsterDesc.UpdateData(t);
  }
  UpdateWaveSelectState() {
    this.ScrollMonsterWaveDynamic.GetScrollItemItems().forEach(e => {
      e.UpdateSelectState();
    });
  }
}
exports.TrapDefenseMonsterView = TrapDefenseMonsterView;
//# sourceMappingURL=TrapDefenseMonsterView.js.map