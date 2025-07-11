"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarqueeView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MarqueeController_1 = require("../MarqueeController");
const TARGETPOSITIONOFFSET = 10;
class MarqueeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.tPi = 0;
    this.iPi = undefined;
    this.oPi = undefined;
    this.xbt = undefined;
    this.rPi = 0;
    this.nPi = undefined;
    this.Ist = 0;
    this.sPi = undefined;
    this.aPi = true;
    this.hPi = () => {
      if (ModelManager_1.ModelManager.MarqueeModel.CurMarquee) {
        ModelManager_1.ModelManager.MarqueeModel.CurMarquee.RefreshContent();
        this.T2e(ModelManager_1.ModelManager.MarqueeModel.CurMarquee);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UISprite]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.hPi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.hPi);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.MarqueeModel.PeekMarqueeData();
    if (e) {
      ModelManager_1.ModelManager.MarqueeModel.CurMarquee = e;
      this.oPi = this.GetItem(1);
      this.iPi = this.GetText(0);
      this.T2e(e);
      this.xbt = this.GetSprite(2);
      this.tPi = this.oPi.GetWidth() / 2 + this.xbt.GetWidth();
      this.rPi = this.tPi;
      this.iPi.SetAnchorOffsetX(this.rPi);
      this.Ist = CommonParamById_1.configCommonParamById.GetIntConfig("marquee_speed");
    }
  }
  OnTick() {
    var e = ModelManager_1.ModelManager.MarqueeModel.CurMarquee;
    if (e && MarqueeController_1.MarqueeController.CheckCurMarqueeValid(e)) {
      if (!e.UseLocalTextKey && e.Content !== this.sPi?.Content) {
        this.T2e(e);
      }
      var i = TimeUtil_1.TimeUtil.GetServerTime();
      var t = ModelManager_1.ModelManager.MarqueeModel.GetNextMarquee();
      if (t && t.BeginTime <= i) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Marquee", 8, "下一条跑马灯到播放时间");
        }
        MarqueeController_1.MarqueeController.CloseMarqueeView();
      } else {
        if (this.rPi < this.tPi - this.oPi.GetWidth() - (this.iPi.GetWidth() + this.xbt.GetWidth()) - TARGETPOSITIONOFFSET) {
          this.nPi ||= i;
          if (!(i > this.nPi + e.ScrollInterval)) {
            if (this.aPi) {
              this.RootItem?.SetUIActive(false);
              this.aPi = false;
            }
            return;
          }
          this.rPi = this.tPi;
          this.iPi.SetAnchorOffsetX(this.rPi);
          ModelManager_1.ModelManager.MarqueeModel.UpdateMarqueeStorageDataByDate(e);
          this.nPi = undefined;
          if (!this.aPi) {
            this.RootItem?.SetUIActive(true);
            this.aPi = true;
          }
        }
        this.rPi -= this.Ist;
        this.iPi.SetAnchorOffsetX(this.rPi);
      }
    } else {
      MarqueeController_1.MarqueeController.CloseMarqueeView();
    }
  }
  T2e(t) {
    if ((this.sPi = t).UseLocalTextKey) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.iPi, t.LocalTextKey);
    } else {
      let i = t.Content.replace(/\r\n/g, " ");
      if (i.includes("{EndTime}")) {
        var t = ModelManager_1.ModelManager.MarqueeModel.GetMarqueeDataLeftTime(t);
        var t = Math.ceil(t / 60);
        var r = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("ShopMinuteText");
        let e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r);
        e = e.replace("{0}", t.toString());
        i = i.replace("{EndTime}", e);
      }
      this.iPi.SetText(i);
    }
  }
}
exports.MarqueeView = MarqueeView;
//# sourceMappingURL=MarqueeView.js.map