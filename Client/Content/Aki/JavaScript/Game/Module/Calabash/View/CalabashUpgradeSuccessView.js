"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashUpgradeSuccessView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class CalabashUpgradeSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.WMt = false;
    this.KMt = false;
    this.QMt = false;
    this.XMt = 0;
    this.$Mt = 0;
    this.YMt = 0;
    this.JMt = 0;
    this.zMt = 0;
    this._Ct = undefined;
    this.eEt = CommonParamById_1.configCommonParamById.GetIntConfig("ExpDisplayTime");
    this.tEt = CommonParamById_1.configCommonParamById.GetIntConfig("ExpDisplayCloseTime");
    this.iEt = i => {
      this.XMt += this.zMt * i;
      if (this.XMt >= this.YMt) {
        this.XMt = this.YMt;
        this.xHe();
        if (this.WMt) {
          this.GetItem(6).SetUIActive(true);
          this.GetItem(5).SetUIActive(false);
          this.UiViewSequence?.PlaySequence("LevelUp");
        } else {
          this.CloseMe();
        }
      }
      this.oEt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    var i;
    var t = this.OpenParam;
    this.WMt = t.CurLevel > t.PreLevel;
    this.KMt = t.AddExp;
    this.QMt = false;
    this.GetItem(6).SetUIActive(!this.KMt);
    this.GetItem(5).SetUIActive(this.KMt);
    if (this.WMt) {
      this.GetText(3).SetText(t.CurLevel.toString());
      if ((i = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(t.CurLevel)) && !StringUtils_1.StringUtils.IsEmpty(i.LevelUpDescription)) {
        this.GetItem(7).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.LevelUpDescription);
      } else {
        this.GetItem(7).SetUIActive(false);
      }
    }
    if (this.KMt) {
      this.GetText(0).SetText(t.PreLevel.toString());
      this.XMt = t.PreExp;
      this.$Mt = ModelManager_1.ModelManager.CalabashModel.GetMaxExpByLevel(t.PreLevel);
      this.JMt = ModelManager_1.ModelManager.CalabashModel.GetMaxExpByLevel(t.CurLevel);
      this.YMt = this.WMt ? t.CurExp + this.$Mt : t.CurExp;
      this.zMt = (this.YMt - this.XMt) / this.eEt;
      this.oEt();
    }
    this.UiViewSequence.AddSequenceFinishEvent("LevelUp", () => {
      this.xHe();
      this.CloseMe();
    });
  }
  get rEt() {
    return this.WMt && this.XMt >= this.$Mt;
  }
  oEt() {
    var i = this.rEt ? this.XMt - this.$Mt : this.XMt;
    var t = this.rEt ? this.JMt : this.$Mt;
    this.GetText(1).SetText(Math.round(i) + "/" + t);
    this.GetSprite(2).SetFillAmount(i / t);
    if (this._Ct && t < i && !this.QMt) {
      this.QMt = true;
      this.UiViewSequence.PlaySequence("Stuck");
    }
  }
  xHe() {
    if (this._Ct) {
      TimerSystem_1.GameplayTimerSystem.Remove(this._Ct);
      this._Ct = undefined;
    }
  }
  OnAfterPlayStartSequence() {
    if (this.KMt) {
      this._Ct = TimerSystem_1.GameplayTimerSystem.Forever(this.iEt, TimerSystem_1.MIN_TIME);
    } else {
      this._Ct = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.xHe();
        this.CloseMe();
      }, this.tEt);
    }
  }
}
exports.CalabashUpgradeSuccessView = CalabashUpgradeSuccessView;
//# sourceMappingURL=CalabashUpgradeSuccessView.js.map