"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderQuicklyBuildView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const DeckBuilderQuicklyBuildItem_1 = require("./DeckBuilderQuicklyBuildItem");
class DeckBuilderQuicklyBuildView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.DeckList = [];
    this.DeckLayout = undefined;
    this.M61 = () => {
      var e = new DeckBuilderQuicklyBuildItem_1.DeckBuilderQuicklyBuildItem();
      e.OnToggleStateChange = this.jA1;
      return e;
    };
    this.jA1 = e => {
      this.SelectDeckByIndex(e);
    };
    this.xco = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(319);
      e.FunctionMap.set(2, () => {
        var e = this.DeckLayout.GetSelectedGridIndex();
        if (!(e < 0)) {
          e = this.DeckList[e];
          this.Pe?.ConfirmCallback(e);
          this.CloseMe();
        }
      });
      var i = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.Pe.ActivityId);
      PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(e, i);
    };
    this.bK1 = () => {
      var e;
      var i = this.DeckLayout.GetSelectedGridIndex();
      if (!(i < 0)) {
        i = {
          DeckInfo: this.DeckList[i],
          ShowLocked: true,
          ActivityId: this.Pe.ActivityId
        };
        e = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.Pe.ActivityId) ? "PhantomArenaDeckDetailViewNew" : "PhantomArenaDeckDetailView";
        UiManager_1.UiManager.OpenView(e, i);
      }
    };
    this.PV1 = e => {
      this.DeckLayout.GetLayoutItemList().forEach(e => {
        e.RefreshCountText();
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.xco], [2, this.bK1]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.PV1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.PV1);
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    this.DeckLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.M61, this.GetItem(1).GetOwner());
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetQuicklyBuildDeckList(this.Pe.ActivityId);
    this.DeckList.length = 0;
    for (const t of e) {
      var i = ModelManager_1.ModelManager.PhantomArenaModel.CreateDeckInfoFromDeckConfigId(t);
      this.DeckList.push(i);
    }
    await this.DeckLayout.RefreshByDataAsync(this.DeckList);
    this.SelectDeckByIndex(0);
  }
  SelectDeckByIndex(e) {
    this.DeckLayout.SelectGridProxy(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && e.length !== 0 && e[0] === "Group" && (e = Number(e[1]), e = this.DeckLayout?.GetLayoutItemByIndex(e)?.GetRootItem())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.DeckBuilderQuicklyBuildView = DeckBuilderQuicklyBuildView;
//# sourceMappingURL=DeckBuilderQuicklyBuildView.js.map