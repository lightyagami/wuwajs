"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapNotePanel = undefined;
const UE = require("ue");
const MapNoteById_1 = require("../../../../../Core/Define/ConfigQuery/MapNoteById");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapNoteItemNew_1 = require("./WorldMapNoteItemNew");
class WorldMapNotePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments);
    this.zJa = undefined;
    this.jNl = undefined;
  }
  GetResourceId() {
    return "UiView_MapPopupTrack";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.zJa.SetCloseCallBack(this.Close);
    this.jNl = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), () => new WorldMapNoteItemNew_1.WorldMapNoteItemNew());
  }
  OnShowWorldMapSecondaryUi(e) {
    e = e.map(e => {
      var o = MapNoteById_1.configMapNoteById.GetConfig(e.MapNoteId);
      var t = o.Icon;
      var r = o.Desc;
      var o = o.Style;
      return {
        Id: e.MapMarkId,
        IconRes: t,
        DescId: r,
        NoteStyle: o,
        ClickCallback: e.ClickCallBack
      };
    });
    this.jNl.RefreshByData(e, undefined, true);
  }
  OnCloseWorldMapSecondaryUi() {}
  OnBeforeDestroy() {
    this.zJa = undefined;
    this.jNl = undefined;
  }
  GetNeedBgItem() {
    return false;
  }
}
exports.WorldMapNotePanel = WorldMapNotePanel;
//# sourceMappingURL=WorldMapNotePanel.js.map