"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardQuicklySellPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const FishingDefine_1 = require("../../FishingDefine");
class DockyardQuicklySellPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ConfirmBtnClick = undefined;
    this.CloseBtnClick = undefined;
    this.SequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.ConfirmBtnClick], [5, this.CloseBtnClick]];
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SequencePlayer.BindSequenceCloseEvent(e => {
      if (e === "Close") {
        this.SetActive(false);
      }
    });
  }
  OnBeforeDestroy() {
    this.SequencePlayer.Clear();
  }
  SetPanelVisible(e) {
    if (e) {
      this.SequencePlayer.StopCurrentSequence(false, true);
      this.SequencePlayer.PlaySequencePurely("Start");
      this.SetActive(true);
    } else {
      this.SequencePlayer.StopCurrentSequence(false, true);
      this.SequencePlayer.PlaySequencePurely("Close");
    }
  }
  RefreshPanel(e, i) {
    var s = i === 0;
    this.GetButton(2)?.RootUIComp.SetUIActive(s);
    this.GetItem(3)?.SetUIActive(!s);
    this.GetText(0)?.SetText(e.toString());
    this.SetItemIcon(this.GetTexture(1), FishingDefine_1.FISHING_CURRENCY_ITEMID);
    if (!s) {
      if (i === 1) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "Fishing_ShapeNotMatch");
      } else if (i === 2) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "Fishing_ShapeCantSell");
      }
    }
  }
}
exports.DockyardQuicklySellPanel = DockyardQuicklySellPanel;
//# sourceMappingURL=DockyardQuicklySellPanel.js.map