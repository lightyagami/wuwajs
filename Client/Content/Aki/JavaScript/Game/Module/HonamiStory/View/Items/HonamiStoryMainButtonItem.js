"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMainButtonItem = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class HonamiStoryMainButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.awi = 0;
    this.rMt = undefined;
    this.QDg = undefined;
    this.MAm = undefined;
    this.aJd = undefined;
    this.SpecialParamName = undefined;
    this.SpecialSequenceName = undefined;
    this.SPe = undefined;
    this.eje = () => {
      if (this.rMt) {
        this.rMt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eje]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetConfigData(t) {
    if (t.FunctionId) {
      this.awi = t.FunctionId;
    }
    if (t.SetTextCallback) {
      this.MAm = t.SetTextCallback;
    }
    if (t.ShowRedDot) {
      this.aJd = t.ShowRedDot;
    }
    if (t.ShowCallback) {
      this.QDg = t.ShowCallback;
    }
    if (t.SpecialParamName) {
      this.SpecialParamName = t.SpecialParamName;
    }
    if (t.SpecialSequenceName) {
      this.SpecialSequenceName = t.SpecialSequenceName;
    }
  }
  SetClickCallback(t) {
    this.rMt = t;
  }
  CheckIsSpecialSet() {
    return (this.aJd && this.aJd() && this.SpecialSequenceName !== undefined) ?? false;
  }
  SetButtonState() {
    var t = ModelManager_1.ModelManager.FunctionModel.IsOpen(this.awi);
    var e = !this.QDg || this.QDg();
    if (t && e) {
      this.SetUiActive(true);
      if (!(t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMainButtonUnlockSet) ?? new Set()).has(this.awi)) {
        this.SPe.PlaySequencePurely("Start");
        t.add(this.awi);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMainButtonUnlockSet, t);
      }
    } else {
      this.SetUiActive(false);
    }
  }
  SetText() {
    if (this.MAm) {
      this.MAm(this.GetText(1));
    } else {
      this.GetText(1).SetText("");
    }
  }
  SetRedDot() {
    if (this.aJd) {
      this.GetItem(2).SetUIActive(this.aJd());
    } else {
      this.GetItem(2).SetUIActive(false);
    }
  }
  Clear() {
    this.rMt = undefined;
    this.MAm = undefined;
    this.aJd = undefined;
    this.QDg = undefined;
    this.SpecialParamName = undefined;
    this.SpecialSequenceName = undefined;
  }
}
exports.HonamiStoryMainButtonItem = HonamiStoryMainButtonItem;
//# sourceMappingURL=HonamiStoryMainButtonItem.js.map