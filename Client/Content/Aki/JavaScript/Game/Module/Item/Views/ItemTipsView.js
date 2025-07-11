"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemTipsView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ItemTipsComponent_1 = require("../../Common/ItemTips/ItemTipsComponent");
const ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool");
const PersonalCardPreviewComponent_1 = require("../../Personal/View/PersonalCardPreviewComponent");
const PowerTipsItem_1 = require("../../Power/SubViews/PowerTipsItem");
class ItemTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.IncId = 0;
    this.ConfigId = 0;
    this.ExtraParam = undefined;
    this.UiTipsType = "ItemTipsComponent";
    this.TipsProxy = undefined;
    this.DoCloseMe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.DoCloseMe]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.IncId = e?.ItemUid;
    this.ConfigId = e.ItemId;
    this.ExtraParam = e.ExtraParam;
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
          await this.xDl(i);
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
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ConfigId).ItemType;
    if (e === 0) {
      i.SetTipsNumShow(false);
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