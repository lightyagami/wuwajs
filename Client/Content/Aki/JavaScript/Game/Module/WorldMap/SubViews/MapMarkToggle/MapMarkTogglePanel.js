"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMarkTogglePanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const MapMarkToggleItem_1 = require("../MapMarkToggle/MapMarkToggleItem");
class MapMarkTogglePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments);
    this.zJa = undefined;
    this.bNl = undefined;
    this.qNl = () => {
      if (ModelManager_1.ModelManager.WorldMapModel.CustomMarksIsShow) {
        return 1;
      } else {
        return 0;
      }
    };
    this.GNl = e => ModelManager_1.ModelManager.WorldMapModel.SetCustomMarksShow(e === 1);
    this.kNl = () => {
      if (ModelManager_1.ModelManager.WorldMapModel.CompletedPlayPointMarkIsShow) {
        return 1;
      } else {
        return 0;
      }
    };
    this.ONl = e => ModelManager_1.ModelManager.WorldMapModel.SetCompletedPlayPointMarkShow(e === 1);
  }
  GetResourceId() {
    return "UiView_MapPopupAssistant";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.zJa.SetCloseCallBack(this.Close);
    this.bNl = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), () => new MapMarkToggleItem_1.MapMarkToggleItem());
    await this.bNl.RefreshByDataAsync(this.NNl());
  }
  OnShowWorldMapSecondaryUi() {}
  OnCloseWorldMapSecondaryUi() {}
  OnBeforeDestroy() {
    this.zJa = undefined;
    this.bNl = undefined;
  }
  GetNeedBgItem() {
    return true;
  }
  NNl() {
    var e = [];
    e.push({
      NameId: "CustomMark_Text",
      GetToggleResultCallback: this.qNl,
      SetToggleStateCallback: this.GNl
    });
    e.push({
      NameId: "CompletedGamePlayPoints_Text",
      GetToggleResultCallback: this.kNl,
      SetToggleStateCallback: this.ONl
    });
    return e;
  }
}
exports.MapMarkTogglePanel = MapMarkTogglePanel;
//# sourceMappingURL=MapMarkTogglePanel.js.map