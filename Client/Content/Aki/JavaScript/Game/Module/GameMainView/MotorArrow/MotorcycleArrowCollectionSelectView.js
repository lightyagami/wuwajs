"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowCollectionSelectView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MultiTemplateScrollView_1 = require("../../Util/ScrollView/MultiTemplateScrollView");
const MotorcycleArrowCollectionGridItem_1 = require("./ChildItem/MotorcycleArrowCollectionGridItem");
const MotorcycleArrowCollectionItem_1 = require("./ChildItem/MotorcycleArrowCollectionItem");
const MotorcycleArrowCollectionTypeItem_1 = require("./ChildItem/MotorcycleArrowCollectionTypeItem");
class MotorcycleArrowCollectionSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ViewModel = undefined;
    this.PopupCaption = undefined;
    this.CollectionListParent = undefined;
    this.CollectionItemList = [];
    this.CollectionItem = undefined;
    this.RefreshButton = undefined;
    this.ConfirmButton = undefined;
    this.Scg = undefined;
    this.CollectionEmpty = undefined;
    this.$pt = undefined;
    this.ycg = [];
    this.OnBtnClose = () => {
      if (this.ViewModel.CollectionList.length <= 0) {
        this.CloseMeWithCallBack();
      }
    };
    this.Bco = (t, e) => {
      e.SetToggleState(false);
      UiManager_1.UiManager.OpenView("MotorcycleArrowCollectionTipsView", t);
    };
    this.OnClickRefreshBuff = () => {
      this.ViewModel.RequestUpdateCollectionList().then(t => {
        if (t) {
          this.ViewModel.RemainRefreshCount = this.ViewModel.RemainRefreshCount - 1;
          this.UpdateData(true);
          ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
        }
      });
    };
    this.OnClickBtnSure = () => {
      if (this.ViewModel.CollectionList.length <= 0) {
        this.CloseMeWithCallBack();
      } else {
        this.SureBuffSelect();
      }
    };
    this.OnSelectCollection = t => {
      this.ViewModel.SetSelectCollectionItem(t);
      this.UpdateCollectionPanelSelectState();
      this.UpdateSureBtnEnable();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIMultiTemplateScrollViewComponent], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.ViewModel = this.OpenParam;
    await super.OnBeforeStartAsync();
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this.OnBtnClose);
    this.PopupCaption.SetHelpBtnActive(false);
    this.CollectionListParent = this.GetItem(1);
    this.CollectionItem = this.GetItem(2);
    const t = [];
    this.ViewModel.CollectionList.forEach(() => {
      t.push(this.elg());
    });
    await Promise.all(t);
    this.CollectionItem.SetUIActive(false);
    var e = this.GetItem(3);
    this.RefreshButton = new ButtonItem_1.ButtonItem(e);
    this.RefreshButton.SetFunction(this.OnClickRefreshBuff);
    if (this.ViewModel.CollectionList.length === 1 || this.ViewModel.MaxRefreshCount <= 0) {
      this.RefreshButton.SetActive(false);
    }
    var e = this.GetItem(4);
    this.ConfirmButton = new ButtonItem_1.ButtonItem(e);
    this.ConfirmButton.SetFunction(this.OnClickBtnSure);
    this.CollectionEmpty = this.GetItem(6);
    this.UpdateCollectionEmptyState();
    this.Scg = new MultiTemplateScrollView_1.MultiTemplateScrollView(this.GetMultiTemplateScrollViewComponent(5));
    this.Mcg();
    var e = new MultiTemplateScrollView_1.MultiTemplateScrollViewRefreshContext(this.ycg);
    e.ScrollToGridIndex = 0;
    this.Scg.RefreshByData(e);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.$pt.PlaySequencePurely("Start");
    this.UpdateData(false);
  }
  OnAfterDestroy() {
    this.ViewModel.OnViewClose();
  }
  Mcg() {
    for (const o of this.ViewModel.GetSortedMotorFightItemTypeList()) {
      var t = new MotorcycleArrowCollectionTypeItem_1.CollectionTypeItemData();
      var e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetCollectionTypeConfigById(o);
      t.Data = e;
      this.ycg.push(t);
      var e = this.ViewModel.GetMotorFightItemDataListByType(o);
      if (e) {
        for (const s of e) {
          var i = new MotorcycleArrowCollectionGridItem_1.CollectionGridItemData();
          i.Data = s;
          i.OnClickCb = this.Bco;
          this.ycg.push(i);
        }
      }
    }
  }
  async elg() {
    var t = new MotorcycleArrowCollectionItem_1.MotorcycleArrowCollectionItem();
    var e = LguiUtil_1.LguiUtil.CopyItem(this.CollectionItem, this.CollectionListParent);
    this.CollectionItemList.push(t);
    await t.CreateThenShowByActorAsync(e.GetOwner());
    t.OnSelectCallback = this.OnSelectCollection;
  }
  async SureBuffSelect() {
    await this.ViewModel.RequestCollectionSelect();
    this.CloseMeWithCallBack();
  }
  UpdateData(i) {
    const o = this.ViewModel.CollectionList;
    this.ViewModel.SetSelectCollectionItem();
    this.CollectionItemList.forEach((t, e) => {
      e = o[e];
      t.SetActive(!!e);
      if (e) {
        t.UpdateData(e, i);
        t.SetSelect(false);
      }
    });
    this.UpdateSureBtnEnable();
    this.UpdateRefreshBtn();
  }
  UpdateSureBtnEnable() {
    var t = !!this.ViewModel.CurSelectCollectionItem || this.ViewModel.CollectionList.length <= 0;
    this.ConfirmButton?.SetEnableClick(t);
  }
  UpdateRefreshBtn() {
    var t = this.ViewModel.RemainRefreshCount > 0;
    this.RefreshButton?.SetLocalTextNew("PrefabTextItem_1210882995_Text", this.ViewModel.RemainRefreshCount, this.ViewModel.MaxRefreshCount);
    this.RefreshButton?.SetEnableClick(t);
  }
  UpdateCollectionPanelSelectState() {
    const e = this.ViewModel.CurSelectCollectionItem;
    this.CollectionItemList.forEach(t => {
      t.SetSelect(e === t.CollectionData);
    });
  }
  UpdateCollectionEmptyState() {
    this.CollectionEmpty.SetUIActive(this.ViewModel.IsMotorFightItemEmpty());
  }
  CloseMeWithCallBack() {
    this.CloseMe(t => {
      if (t) {
        this.ViewModel.OnViewClose();
      }
    });
  }
}
exports.MotorcycleArrowCollectionSelectView = MotorcycleArrowCollectionSelectView;
//# sourceMappingURL=MotorcycleArrowCollectionSelectView.js.map