"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCountDownTipsPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SurvivorsRogueTipsPanelBase_1 = require("./SurvivorsRogueTipsPanelBase");
const ONE_HUNDRED = 100;
const ELAPSED_ANCHOR_OFFSET_Y = -30;
const COUNT_DOWN_ANCHOR_OFFSET_Y = -100;
class SurvivorsRogueCountDownTipsPanel extends SurvivorsRogueTipsPanelBase_1.SurvivorsRogueTipsPanelBase {
  constructor() {
    super(...arguments);
    this.mNe = 0;
    this.H6 = 0;
    this.HGe = undefined;
    this.AYt = undefined;
    this.o6d = undefined;
    this._fe = false;
    this.x4d = false;
    this.n6d = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIArtText], [3, UE.UIArtText], [4, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.HGe = this.GetText(1);
    this.HGe.SetUIActive(false);
    this.AYt = this.GetArtText(2);
    this.o6d = this.GetItem(4);
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("TextData_NumB1");
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LGUIArtTextData, (i, t) => {
      if (i && i.IsValid()) {
        this.AYt.SetArtTextData(i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiImageSetting", 79, "SurvivorsRogueCountDownTipsPanel找不到artTextData: TextData_NumB1");
      }
    });
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    this.x4d = true;
  }
  OnBeforeHide() {
    super.OnBeforeHide();
    this.x4d = false;
  }
  ShowTips() {
    this.Show();
    this.SequencePlayer.StopPlayingSequence();
    this.SequencePlayer.PlayLevelSequenceByName("Start01");
  }
  InitCountDown(i, t) {
    this.mNe = i;
    this.H6 = 0;
    this._fe = true;
    this.n6d = t;
    this.o6d.SetAnchorOffsetY(t ? ELAPSED_ANCHOR_OFFSET_Y : COUNT_DOWN_ANCHOR_OFFSET_Y);
    this.HGe.SetText("");
  }
  OnTick(i) {
    if (this.x4d && this._fe) {
      if (this.n6d) {
        this.a6d(i);
      } else {
        this.h6d(i);
      }
    }
  }
  a6d(i) {
    var t = this.H6;
    t += i * TimeUtil_1.TimeUtil.Millisecond;
    this.H6 = t;
    var i = Math.floor(t / TimeUtil_1.TimeUtil.Minute);
    var i = (i < 10 ? "0" : "") + i;
    var s = Math.floor(t % TimeUtil_1.TimeUtil.Minute);
    var s = (s < 10 ? "0" : "") + s;
    var t = Math.floor((t - Math.floor(t)) * ONE_HUNDRED);
    this.AYt.SetText(`${i}:${s}:${(t < 10 ? "0" : "") + t}`);
  }
  h6d(i) {
    var t = this.mNe;
    if (t <= 0) {
      this.AYt.SetText("0s");
      this._fe = false;
    } else {
      this.AYt.SetText(Math.floor(t) + "s");
      t -= i * TimeUtil_1.TimeUtil.Millisecond;
      this.mNe = t;
    }
  }
}
exports.SurvivorsRogueCountDownTipsPanel = SurvivorsRogueCountDownTipsPanel;
//# sourceMappingURL=SurvivorsRogueCountDownTipsPanel.js.map