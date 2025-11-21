"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordCountDownView = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class GreatSwordCountDownView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.mNe = 0;
    this.MYt = 0;
    this.f6a = 0;
    this.gkd = 10;
    this.AYt = undefined;
    this.hQc = undefined;
    this.Nqa = undefined;
    this.Fqa = undefined;
    this.QWc = undefined;
    this.KWc = (e, i) => {
      this.f6a = this.mNe;
      this.mNe = e;
      if (this.mNe <= 0) {
        this.Qtd();
      } else {
        this.XWc();
        this.Ktd();
        if (i) {
          this.Xtd(i);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIArtText]];
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGamePlayCdChanged, this.KWc);
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGamePlayCdChanged, this.KWc);
  }
  OnStart() {
    this.AYt = this.GetArtText(0);
    this.hQc = this.GetArtText(3);
    this.Nqa = this.AYt.GetArtTextData();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("TextData_NumB1");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUIArtTextData, (e, i) => {
      if (e && e.IsValid()) {
        this.Fqa = e;
      }
    }, 100, this.MemoryTag);
    this.QWc = this.GetTexture(2);
  }
  Qtd() {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing = true;
    this.CloseMe(e => {
      if (e) {
        ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing = false;
      }
    });
  }
  Ktd() {
    var e = this.mNe >= this.gkd;
    var i = this.f6a >= this.gkd;
    if (i && !e) {
      this.UiViewSequence?.PlaySequence("ColorChange");
      this.AYt?.SetArtTextData(this.Fqa);
    } else if (!i && e) {
      this.UiViewSequence?.PlaySequence("ColorChange1");
      this.AYt?.SetArtTextData(this.Nqa);
    }
  }
  Xtd(e) {
    var i;
    if (this.MYt === 0) {
      this.MYt = e;
    } else {
      i = Math.round((e - this.MYt) / 1000);
      this.MYt = e;
      if (i !== 0) {
        this.Ytd(i);
      }
    }
  }
  Ytd(e) {
    this.hQc?.SetText((e > 0 ? "+" : "-") + Math.abs(e) + "s");
    e = e < 0;
    this.hQc?.SetArtTextData(e ? this.Fqa : this.Nqa);
    this.YWc(e);
    if (this.UiViewSequence?.HasSequenceNameInPlaying("TimeIn")) {
      this.UiViewSequence?.StopSequenceByKey("TimeIn", false, true);
    }
    this.UiViewSequence?.PlaySequence("TimeIn");
  }
  XWc() {
    var e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat5(this.mNe);
    this.AYt?.SetText(e);
  }
  YWc(e) {
    if (this.QWc) {
      this.QWc.SetUIActive(false);
      e = e ? "T_BlackBladeCountDownBgRed" : "T_BlackBladeCountDownBgGreen";
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetTextureByPath(e, this.QWc, undefined, () => {
        this.QWc?.SetUIActive(true);
      });
    }
  }
}
exports.GreatSwordCountDownView = GreatSwordCountDownView;
//# sourceMappingURL=GreatSwordCountDownView.js.map