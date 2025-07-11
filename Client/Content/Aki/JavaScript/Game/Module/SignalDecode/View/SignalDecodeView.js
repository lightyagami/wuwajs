"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalDecodeView = undefined;
const UE = require("ue");
const Json_1 = require("../../../../Core/Common/Json");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const SignalDecodeGamePlayById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeGamePlayById");
const SignalDecodeTabColorById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeTabColorById");
const SignalDecodeWaveformById_1 = require("../../../../Core/Define/ConfigQuery/SignalDecodeWaveformById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const SignalDecodeTabItem_1 = require("./SignalDecodeTabItem");
const ANIM_TIME = 1500;
const SLOT_OUTLINE_WIDTH = 3;
const SLOT_WIDTH = 60;
const SLOT_INTERVAL = 19;
const SLOT_PADDING_LEFT = 10;
const UNIT_HEIGHT = 100;
class SignalDecodeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.qEo = "";
    this.GEo = undefined;
    this.NEo = undefined;
    this.OEo = undefined;
    this.kEo = undefined;
    this.FEo = undefined;
    this.VEo = 0;
    this.HEo = 0;
    this.jEo = 0;
    this.WEo = -0;
    this.KEo = -0;
    this.ict = 0;
    this.QEo = 0;
    this.XEo = false;
    this.L6e = 0;
    this.$Eo = 0;
    this.YEo = 0;
    this.JEo = () => {
      if (this.OEo && this.OEo.length && !(TimeUtil_1.TimeUtil.GetServerTime() - this.L6e <= this.$Eo)) {
        this.L6e = TimeUtil_1.TimeUtil.GetServerTime();
        var i = this.OEo[0].GetAnchorOffsetX();
        var t = this.FEo.get(0);
        var t = this.zEo(t);
        var t = Math.abs(t - i);
        if (!(t > this.YEo)) {
          for (let i = 0; i < this.OEo.length; i++) {
            var e = this.OEo[i];
            if (!e.IsUIActiveInHierarchy()) {
              return;
            }
            var s = this.FEo.get(i);
            var s = this.zEo(s);
            e.SetAnchorOffsetX(s);
          }
          this.GEo[this.jEo - 1].SetComplete();
          TimerSystem_1.TimerSystem.Delay(() => {
            for (const t of this.OEo) {
              this.ZEo(t);
            }
            this.OEo.length = 0;
            this.FEo.clear();
            var i = ++this.jEo;
            if (i <= 4) {
              this.eSo(i);
            } else {
              this.Gti(-1);
            }
          }, this.$Eo * 1000);
        }
      }
    };
    this.AMo = () => {
      UiManager_1.UiManager.CloseView("SignalDecodeView");
    };
    this.tSo = () => {
      GeneralLogicTreeController_1.GeneralLogicTreeController.RequestFinishUiGameplay(Protocol_1.Aki.Protocol.h3s.Proto_SignalBreak, this.qEo);
      UiManager_1.UiManager.CloseView("SignalDecodeView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UITexture], [10, UE.UITexture], [11, UE.UITexture], [12, UE.UIItem]];
    this.BtnBindInfo = [[3, this.JEo], [4, this.AMo]];
  }
  OnStart() {
    this.GetItem(5).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    var i = this.GetTexture(11);
    this.VEo = i.GetWidth();
    var i = this.GetSprite(2);
    this.NEo = [];
    this.NEo.push(i);
    this.OEo = [];
    this.kEo = [];
    this.FEo = new Map();
    this.jEo = 1;
    this.ict = 0;
    this.WEo = 0;
    this.KEo = 0;
    this.L6e = 0;
    this.$Eo = CommonParamById_1.configCommonParamById.GetFloatConfig("SignalDecodeFailStopTime") ?? 0.8;
    this.YEo = CommonParamById_1.configCommonParamById.GetFloatConfig("SignalDecodeSuccessRange") ?? 50;
    this.qEo = this.OpenParam;
    if (this.qEo) {
      if (i = SignalDecodeGamePlayById_1.configSignalDecodeGamePlayById.GetConfig(this.qEo)) {
        this.sso(i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "找不到信号破译配置", ["id", this.qEo]);
      }
    }
  }
  OnAfterShow() {
    this.Gti(++this.ict);
  }
  OnTick(i) {
    this.KEo += i;
    this.iSo();
    this.oSo(i);
    this.WEo = this.KEo;
  }
  iSo() {
    if (this.KEo > ANIM_TIME && this.WEo <= ANIM_TIME) {
      this.Gti(++this.ict);
      this.KEo = 0;
      this.WEo = 0;
    }
  }
  oSo(i) {
    this.XEo = TimeUtil_1.TimeUtil.GetServerTime() - this.L6e > this.$Eo;
    if (this.OEo && this.OEo.length !== 0 && this.XEo) {
      for (const e of this.OEo) {
        var t = e.GetAnchorOffsetX();
        e.SetAnchorOffsetX(t + i / 1000 * 250 * this.HEo);
        var t = e.GetAnchorOffsetX();
        if (t >= this.VEo) {
          e.SetAnchorOffsetX(t - this.VEo - 85);
          e.SetUIActive(true);
        }
      }
    }
  }
  Gti(i) {
    switch (i) {
      case 1:
        this.GetItem(5).SetUIActive(true);
        break;
      case 2:
        this.GetItem(5).SetUIActive(false);
        this.GetItem(6).SetUIActive(true);
        break;
      case 3:
        this.GetItem(6).SetUIActive(false);
        this.GetItem(7).SetUIActive(true);
        this.eSo(this.jEo);
        break;
      case -1:
        this.GetItem(7).SetUIActive(false);
        this.GetItem(8).SetUIActive(true);
        TimerSystem_1.TimerSystem.Delay(this.tSo, 1000);
    }
  }
  sso(i) {
    var t;
    var e;
    var s;
    if (i.SignalData1) {
      this.GEo = [];
      s = this.GetItem(1);
      t = this.GetItem(0);
      e = new SignalDecodeTabItem_1.SignalDecodeTabItem(1, i.SignalData1, s);
      this.GEo.push(e);
      s.SetUIActive(true);
      if (i.SignalData2) {
        e = LguiUtil_1.LguiUtil.CopyItem(s, t);
        e = new SignalDecodeTabItem_1.SignalDecodeTabItem(2, i.SignalData2, e);
        this.GEo.push(e);
      }
      if (i.SignalData3) {
        e = LguiUtil_1.LguiUtil.CopyItem(s, t);
        e = new SignalDecodeTabItem_1.SignalDecodeTabItem(3, i.SignalData3, e);
        this.GEo.push(e);
      }
      if (i.SignalData4) {
        e = LguiUtil_1.LguiUtil.CopyItem(s, t);
        s = new SignalDecodeTabItem_1.SignalDecodeTabItem(4, i.SignalData4, e);
        this.GEo.push(s);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Quest", 18, "找不到信号1", ["id", this.qEo]);
    }
  }
  eSo(i) {
    var t;
    var e;
    var s;
    if (this.GEo && this.GEo.length !== 0) {
      t = this.GEo[i - 1].WaveformId;
      if (e = SignalDecodeWaveformById_1.configSignalDecodeWaveformById.GetConfig(t)) {
        if (s = SignalDecodeTabColorById_1.configSignalDecodeTabColorById.GetConfig(i)) {
          this.rSo(s);
          this.nSo(s);
          this.sSo(e);
          this.aSo(e, s);
          this.hSo();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 18, "找不到信号破译页签的颜色配置", ["tabIndex", i]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "找不到信号谱面配置", ["id", t]);
      }
    }
  }
  rSo(i) {
    for (const t of this.GEo) {
      t.UpdateColor(i);
      t.OnProcess(this.jEo);
    }
  }
  nSo(i) {
    this.GetTexture(9).SetColor(UE.Color.FromHex(i.VacancyColor));
    this.GetTexture(10).SetColor(UE.Color.FromHex(i.VacancyColor));
    this.GetTexture(11).SetColor(UE.Color.FromHex(i.DefaultColor));
  }
  sSo(i) {
    const s = this.GetSprite(2);
    const h = s.GetParentAsUIItem();
    this.HEo = i.SpeedRate;
    Json_1.Json.Parse(i.SignalFragment).forEach((i, t) => {
      let e = undefined;
      if (t < this.NEo.length) {
        e = this.NEo[t];
      } else {
        e = this.lSo(s, h);
        this.NEo.push(e);
      }
      t = this.zEo(t);
      e.SetAnchorOffsetX(t);
      e.SetHeight(UNIT_HEIGHT * i);
    });
  }
  aSo(i, t) {
    var e = this.GetItem(12);
    var s = Json_1.Json.Parse(i.MissingParts);
    this.QEo = i.Offset;
    for (let i = s.length - 1; i >= 0; --i) {
      var h;
      var r = s[i] === 1;
      var o = this.NEo[i];
      if (r) {
        o.SetUIActive(true);
        o.SetColor(UE.Color.FromHex(t.VacancyColor));
        (r = this._So(o, e)).SetColor(UE.Color.FromHex(t.HighlightColor));
        h = this.zEo(i);
        r.SetAnchorOffsetX(h);
        this.OEo.push(r);
        this.FEo.set(this.OEo.length - 1, i);
        if (this.QEo > this.OEo.length) {
          r.SetUIActive(false);
        }
      } else {
        o.SetUIActive(false);
      }
    }
  }
  hSo() {
    var i = this.FEo.get(this.QEo);
    var t = this.zEo(i + 1);
    for (const s of this.OEo) {
      var e = s.GetAnchorOffsetX();
      s.SetAnchorOffsetX(e - t);
    }
  }
  zEo(i) {
    return i * (SLOT_OUTLINE_WIDTH * 2 + SLOT_WIDTH + SLOT_INTERVAL) + SLOT_PADDING_LEFT + SLOT_OUTLINE_WIDTH;
  }
  _So(i, t) {
    if (this.kEo.length === 0) {
      return this.lSo(i, t);
    } else {
      (t = this.kEo.pop()).SetHeight(i.GetHeight());
      return t;
    }
  }
  lSo(i, t) {
    return LguiUtil_1.LguiUtil.DuplicateActor(i.GetOwner(), t).GetComponentByClass(UE.UISprite.StaticClass());
  }
  ZEo(i) {
    i.SetAnchorOffsetX(-10000);
    this.kEo.push(i);
  }
}
exports.SignalDecodeView = SignalDecodeView;
//# sourceMappingURL=SignalDecodeView.js.map