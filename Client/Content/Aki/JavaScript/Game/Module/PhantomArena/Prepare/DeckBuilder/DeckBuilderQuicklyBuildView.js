"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderQuicklyBuildView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  PhantomArenaController_1 = require("../../PhantomArenaController"),
  DeckBuilderQuicklyBuildItem_1 = require("./DeckBuilderQuicklyBuildItem");
class DeckBuilderQuicklyBuildView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.DeckList = [], this.DeckLayout = void 0, this.$V1 = () => {
      var e = new DeckBuilderQuicklyBuildItem_1.DeckBuilderQuicklyBuildItem;
      return e.OnToggleStateChange = this.fA1, e
    }, this.fA1 = e => {
      this.SelectDeckByIndex(e)
    }, this.xco = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(319);
      e.FunctionMap.set(2, () => {
        var e = this.DeckLayout.GetSelectedGridIndex();
        e < 0 || (e = this.DeckList[e], this.Pe?.ConfirmCallback(e), this.CloseMe())
      }), PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(e)
    }, this.GQ1 = () => {
      var e = this.DeckLayout.GetSelectedGridIndex();
      e < 0 || (e = {
        DeckInfo: this.DeckList[e],
        ShowLocked: !0
      }, UiManager_1.UiManager.OpenView("PhantomArenaDeckDetailView", e))
    }, this.eV1 = e => {
      this.DeckLayout.GetLayoutItemList().forEach(e => {
        e.RefreshCountText()
      })
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [3, this.xco],
      [2, this.GQ1]
    ]
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.eV1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.eV1)
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam, this.DeckLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.$V1, this.GetItem(1).GetOwner());
    var e = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetQuicklyBuildDeckList(e);
    this.DeckList.length = 0;
    for (const t of e) {
      var i = ModelManager_1.ModelManager.PhantomArenaModel.CreateDeckInfoFromDeckConfigId(t);
      this.DeckList.push(i)
    }
    await this.DeckLayout.RefreshByDataAsync(this.DeckList), this.SelectDeckByIndex(0)
  }
  SelectDeckByIndex(e) {
    this.DeckLayout.SelectGridProxy(e)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return e && 0 !== e.length && "Group" === e[0] && (e = Number(e[1]), e = this.DeckLayout?.GetLayoutItemByIndex(e)?.GetRootItem()) ? [e, e] : void 0
  }
}
exports.DeckBuilderQuicklyBuildView = DeckBuilderQuicklyBuildView;
//# sourceMappingURL=DeckBuilderQuicklyBuildView.js.map