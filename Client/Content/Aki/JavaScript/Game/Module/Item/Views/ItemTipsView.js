"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemTipsView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiInteractLogReport_1 = require("../../../Ui/LogReport/UiInteractLogReport");
const FurnitureDetailTipItem_1 = require("../../ActivityGamePlay/Furniture/View/FurnitureDetailTipItem");
const ItemTipsComponent_1 = require("../../Common/ItemTips/ItemTipsComponent");
const ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool");
const HonamiStoryItemTipsComponent_1 = require("../../HonamiStory/View/Backpack/Item/HonamiStoryItemTipsComponent");
const PersonalCardPreviewComponent_1 = require("../../Personal/View/PersonalCardPreviewComponent");
const PersonalPlayerTitlePreviewComponent_1 = require("../../Personal/View/PersonalPlayerTitlePreviewComponent");
const PowerTipsItem_1 = require("../../Power/SubViews/PowerTipsItem");
class ItemTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.IncId = 0;
    this.ConfigId = 0;
    this.ExtraParam = undefined;
    this.UiTipsType = "ItemTipsComponent";
    this.TipsProxy = undefined;
    this.Jvt = () => {
      UiInteractLogReport_1.UiInteractLogReport.ReportSpaceKeyInteract(11);
      this.DoCloseMe();
    };
    this.DoCloseMe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Jvt], [2, this.Jvt]];
  }
  async OnBeforeStartAsync() {
    let e = undefined;
    if (ModelManager_1.ModelManager.ItemTipsModel.SharpTempOpenParam) {
      e = ModelManager_1.ModelManager.ItemTipsModel.SharpTempOpenParam;
      ModelManager_1.ModelManager.ItemTipsModel.SharpTempOpenParam = undefined;
    } else {
      e = this.OpenParam;
    }
    this.IncId = e?.ItemUid;
    this.ConfigId = e.ItemId;
    this.ExtraParam = e.ExtraParam;
    this.GetButton(0).RootUIComp.SetUIActive(true);
    this.GetButton(2).RootUIComp.SetUIActive(false);
    if (this.ExtraParam === "OpenTitlePreviewView") {
      this.GetButton(0).RootUIComp.SetUIActive(false);
      this.GetButton(2).RootUIComp.SetUIActive(true);
      await this.pVd(e.ItemId);
    } else {
      var i = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataByPram(e);
      if (i) {
        this.UiTipsType = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsUiType(i.ItemType);
        switch (this.UiTipsType) {
          case "ItemTipsComponent":
            await this.DDl(i);
            break;
          case "PowerTipsItem":
            await this.ADl(i);
            break;
          case "PersonalCardPreviewComponent":
            this.GetButton(0).RootUIComp.SetUIActive(false);
            this.GetButton(2).RootUIComp.SetUIActive(true);
            await this.xDl(i);
            break;
          case "HonamiStoryTipsItem":
            await this.bhm(i);
            break;
          case "FurnitureTipsItem":
            await this.Fcg(i);
        }
      }
    }
  }
  async DDl(e) {
    var i = new ItemTipsComponent_1.ItemTipsComponent();
    await i.CreateByResourceIdAsync("UiItem_TipsScreenTips", this.GetItem(1));
    (this.TipsProxy = i).Refresh(e);
    if (this.IncId === undefined) {
      i.SetTipsComponentLockButton(false);
    }
  }
  async ADl(e) {
    var i = new PowerTipsItem_1.PowerTipsItem();
    await i.CreateByResourceIdAsync("UiItem_ItemTips1", this.GetItem(1));
    (this.TipsProxy = i).SetBackBackCallBack(this.DoCloseMe);
    i.Refresh(e);
  }
  async xDl(e) {
    var i = new PersonalCardPreviewComponent_1.PersonalCardPreviewComponent();
    await i.CreateByResourceIdAsync("UiView_CardPreview", this.GetItem(1));
    (this.TipsProxy = i).Refresh(e);
  }
  async bhm(e) {
    var i = new HonamiStoryItemTipsComponent_1.HonamiStoryItemTipsComponent();
    await i.CreateByResourceIdAsync("UiItem_TipHonamiStoryItem", this.GetItem(1));
    (this.TipsProxy = i).Refresh(e);
  }
  async pVd(e) {
    var i = new PersonalPlayerTitlePreviewComponent_1.PersonalPlayerTitlePreviewComponent();
    await i.CreateByResourceIdAsync("UiItem_TitlesPreview", this.GetItem(1));
    (this.TipsProxy = i).Refresh(e);
  }
  async Fcg(e) {
    var i = new FurnitureDetailTipItem_1.FurnitureDetailTipItem();
    await i.CreateByResourceIdAsync("UiItem_FurnitureTips", this.GetItem(1));
    i.GetRootItem().SetAnchorOffsetX(0);
    i.TipViewCloseDelegate = () => {
      this.CloseMe();
    };
    (this.TipsProxy = i).Refresh(e);
  }
  OnBeforeShow() {
    this.TipsProxy?.SetActive(true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeChildView, this.DoCloseMe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeChildView, this.DoCloseMe);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseItemTips, this.ConfigId, this.IncId);
  }
  async OnPlayingCloseSequenceAsync() {
    await this.TipsProxy?.PlayCloseSequence();
    this.TipsProxy?.SetActive(false);
  }
}
exports.ItemTipsView = ItemTipsView;
//# sourceMappingURL=ItemTipsView.js.map