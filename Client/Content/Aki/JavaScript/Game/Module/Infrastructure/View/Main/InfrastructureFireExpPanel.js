"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureFireExpPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const numEnum = [1, 2, 3, 4, 5];
const preNumEnum = [11, 12, 13, 14, 15];
const nextNumEnum = [6, 7, 8, 9, 10];
const sequenceName = ["FirstDigit", "SecondDigit", "ThirdDigit", "FourthDigit", "FifthDigit"];
class InfrastructureFireExpPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.YRf = [];
    this.Hea = undefined;
    this.g4m = undefined;
    this.pNf = undefined;
    this.fFo = () => {
      this.g4m?.();
    };
    this.yct = e => {
      if (sequenceName.includes(e)) {
        this.pNf?.();
      }
    };
    this.Tct = (e, i) => {
      if (sequenceName.includes(e) && i === "On") {
        i = sequenceName.indexOf(e);
        e = this.YRf[i];
        this.GetArtText(numEnum[i]).SetText(e.toString());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIArtText], [2, UE.UIArtText], [3, UE.UIArtText], [4, UE.UIArtText], [5, UE.UIArtText], [6, UE.UIArtText], [7, UE.UIArtText], [8, UE.UIArtText], [9, UE.UIArtText], [10, UE.UIArtText], [11, UE.UIArtText], [12, UE.UIArtText], [13, UE.UIArtText], [14, UE.UIArtText], [15, UE.UIArtText], [16, UE.UIItem]];
    this.BtnBindInfo = [[0, this.fFo]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(16));
    this.Hea.BindSequenceCloseEvent(this.yct);
    this.GetItem(16).GetOwner().OnSequencePlayEvent.Bind(this.Tct);
    this.C4m(0, true);
  }
  UpdateExp() {
    return this.C4m();
  }
  RefreshExpBeforeRoadBuilt(e) {
    e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigById(e);
    this.C4m(e.FireExpReward, true);
  }
  C4m(e = 0, i = false) {
    let t = 10 ** (numEnum.length - 1);
    var n = this.YRf;
    this.YRf = [];
    let s = ModelManager_1.ModelManager.InfrastructureModel.FireExp - e;
    let r = 0;
    while (r < numEnum.length) {
      var u = Math.floor(s / t);
      this.YRf.push(u);
      s %= t;
      t /= 10;
      r++;
    }
    let a = false;
    let h = !(r = 0);
    while (r < numEnum.length) {
      var E = this.GetArtText(numEnum[r]);
      var m = this.GetArtText(preNumEnum[r]);
      var o = this.GetArtText(nextNumEnum[r]);
      var l = this.YRf[r];
      if (h = h && l === 0 && r < numEnum.length - 1) {
        E.SetChangeColor(true, E.changeColor);
      } else {
        E.SetChangeColor(false, E.Color);
      }
      if (i) {
        E.SetText(l.toString());
      }
      if (r < n.length && l !== n[r] || a) {
        a = true;
        m.SetText(((n[r] + 9) % 10).toString());
        o.SetText(((n[r] + 1) % 10).toString());
        if (!i) {
          this.Hea.PlayLevelSequenceByName(sequenceName[r]);
        }
      }
      r++;
    }
    return a;
  }
  SetOnClickHelpCb(e) {
    this.g4m = e;
  }
  SetOnDigitSequenceFinishCb(e) {
    this.pNf = e;
  }
}
exports.InfrastructureFireExpPanel = InfrastructureFireExpPanel;
//# sourceMappingURL=InfrastructureFireExpPanel.js.map