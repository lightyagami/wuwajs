"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountDownChallengeView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ONE_HUNDRED = 100;
const SWITCH_ANIM = "Switch";
const ADD_ANIM = "Add";
class CountDownChallengeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.f6a = 0;
    this.mNe = 0;
    this.MYt = 0;
    this.Gqa = "";
    this.AYt = undefined;
    this.kqa = undefined;
    this.Nqa = undefined;
    this.Fqa = undefined;
    this.SequencePlayer = undefined;
    this.PYt = (e, t) => {
      var i;
      var s;
      var h;
      this.f6a = this.mNe;
      this.mNe = e;
      if (this.mNe <= 0) {
        ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing = true;
        this.CloseMe(e => {
          if (e) {
            ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing = false;
          }
        });
      } else {
        e = this.mNe >= 10;
        if (this.f6a >= 10 && !e) {
          if (this.SequencePlayer.GetCurrentSequence() === SWITCH_ANIM) {
            this.SequencePlayer.StopCurrentSequence(false, true);
          }
          this.SequencePlayer.PlayLevelSequenceByName(SWITCH_ANIM);
        }
        s = ((s = Math.floor(this.mNe % TimeUtil_1.TimeUtil.Hour / TimeUtil_1.TimeUtil.Minute)) < 10 ? "0" : "") + s;
        h = ((h = Math.floor(this.mNe % TimeUtil_1.TimeUtil.Minute)) < 10 ? "0" : "") + h;
        i = Math.floor((this.mNe - Math.floor(this.mNe)) * ONE_HUNDRED);
        this.AYt?.SetText(`${s}:${h}:${(i < 10 ? "0" : "") + i}`);
        this.AYt?.SetArtTextData(e ? this.Nqa : this.Fqa);
        if (t && (this.kqa?.SetArtTextData(e ? this.Nqa : this.Fqa), s = Math.round((t - this.MYt) / 1000), this.MYt = t, s !== 0)) {
          this.kqa?.SetText(s > 0 ? `+${s}s` : s + "s");
          if (this.SequencePlayer.GetCurrentSequence() === ADD_ANIM) {
            this.SequencePlayer.StopCurrentSequence(false, true);
          }
          this.SequencePlayer.PlayLevelSequenceByName(ADD_ANIM);
        }
        h = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Gqa);
        this.GetText(1)?.SetText(h);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIArtText], [3, UE.UIArtText]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.MYt = e.TimerEndTime;
    this.Gqa = e.UiTitleKey;
    this.AYt = this.GetArtText(2);
    this.kqa = this.GetArtText(3);
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Nqa = this.AYt.GetArtTextData();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("TextData_NumB1");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUIArtTextData, (e, t) => {
      if (e && e.IsValid()) {
        this.Fqa = e;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiImageSetting", 18, "CountDownChallengeView找不到artTextData：TextData_NumB1");
      }
    });
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGamePlayCdChanged, this.PYt);
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGamePlayCdChanged, this.PYt);
  }
}
exports.CountDownChallengeView = CountDownChallengeView;
//# sourceMappingURL=CountDownChallengeView.js.map