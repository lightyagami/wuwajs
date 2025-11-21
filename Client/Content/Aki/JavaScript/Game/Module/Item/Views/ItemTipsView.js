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
    this.f7d = () => {
      UiInteractLogReport_1.UiInteractLogReport.ReportSpaceKeyInteract(11);
      this.DoCloseMe();
    };
    this.DoCloseMe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.f7d]];
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
    if (this.ExtraParam === "OpenTitlePreviewView") {
      await this.pVd(e.ItemId);
    } else {
      var t = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataByPram(e);
      if (t) {
        this.UiTipsType = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsUiType(t.ItemType);
        switch (this.UiTipsType) {
          case "ItemTipsComponent":
            await this.DDl(t);
            break;
          case "PowerTipsItem":
            await this.ADl(t);
            break;
          case "PersonalCardPreviewComponent":
            await this.xDl(t);
            break;
          case "HonamiStoryTipsItem":
            await this.nom(t);
        }
      }
    }
  }
  async DDl(e) {
    var t = new ItemTipsComponent_1.ItemTipsComponent();
    await t.CreateByResourceIdAsync("UiItem_TipsScreenTips", this.GetItem(1));
    (this.TipsProxy = t).Refresh(e);
    if (this.IncId === undefined) {
      t.SetTipsComponentLockButton(false);
    }
  }
  async ADl(e) {
    var t = new PowerTipsItem_1.PowerTipsItem();
    await t.CreateByResourceIdAsync("UiItem_ItemTips1", this.GetItem(1));
    (this.TipsProxy = t).SetBackBackCallBack(this.DoCloseMe);
    t.Refresh(e);
  }
  async xDl(e) {
    var t = new PersonalCardPreviewComponent_1.PersonalCardPreviewComponent();
    await t.CreateByResourceIdAsync("UiView_CardPreview", this.GetItem(1));
    (this.TipsProxy = t).Refresh(e);
  }
  async nom(e) {
    var t = new HonamiStoryItemTipsComponent_1.HonamiStoryItemTipsComponent();
    await t.CreateByResourceIdAsync("UiItem_TipHonamiStoryItem", this.GetItem(1));
    (this.TipsProxy = t).Refresh(e);
  }
  async pVd(e) {
    var t = new PersonalPlayerTitlePreviewComponent_1.PersonalPlayerTitlePreviewComponent();
    await t.CreateByResourceIdAsync("UiItem_TitlesPreview", this.GetItem(1));
    (this.TipsProxy = t).Refresh(e);
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