"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonFlowTextLogic = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const LguiUtil_1 = require("../Util/LguiUtil");
class CommonFlowTextLogic {
  constructor() {
    this.pZ1 = undefined;
    this.vZ1 = undefined;
    this.yZ1 = undefined;
    this.Pe = undefined;
    this._Ct = undefined;
    this.CZi = () => {
      this._Ct = undefined;
      this.Pe.TextAnimFinishDelegate?.(this.vZ1, this.yZ1);
    };
  }
  SZ1() {
    if (this._Ct) {
      TimerSystem_1.TimerSystem.Remove(this._Ct);
      this._Ct = undefined;
    }
  }
  MZ1(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.vZ1.TidTalk);
    } else {
      let i = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.vZ1.TidTalk);
      if (StringUtils_1.StringUtils.IsEmpty(i)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Plot", 10, "字幕为空", ["id", this.vZ1.TidTalk]);
        }
        i = this.vZ1.TidTalk;
      }
      t.SetGameRichText(true);
      t.SetText(i);
    }
  }
  EZ1(i, t) {
    this.SZ1();
    this.Pe.TextAnimStartDelegate?.(this.vZ1, this.yZ1);
    var e = i.GetDisplayCharLength();
    let o = 1;
    o = t || e / ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedLevelD;
    t = Math.max(o * CommonDefine_1.MILLIONSECOND_PER_SECOND, TimerSystem_1.MIN_TIME);
    i.GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())?.SetSelectorOffset(1);
    this.pZ1 = i.GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (this.pZ1) {
      this.pZ1.GetPlayTween().duration = o;
      this.pZ1.Play();
    }
    this._Ct = TimerSystem_1.TimerSystem.Delay(this.CZi, t);
  }
  InitData(i) {
    this.Pe = i;
  }
  PlayFlowText(i, t) {
    this.vZ1 = i;
    this.yZ1 = t;
    t = this.Pe.GetTextComp(i);
    if (t) {
      this.MZi();
      this.MZ1(t);
      i = this.vZ1.CaptionParams;
      this.EZ1(t, i?.TotalTime);
    }
  }
  Clear() {
    this.pZ1?.Stop();
    this.SZ1();
    this.Pe.ClearDelegate?.();
    this.vZ1 = undefined;
    this.yZ1 = undefined;
  }
  MZi() {
    var i;
    var t;
    var e = this.vZ1.TalkAkEvent;
    if (e && (i = (0, AudioSystem_1.parseAudioEventPath)(e.AkEvent))) {
      if (e.Type === IAction_1.EPostAkEvent.Global) {
        AudioSystem_1.AudioSystem.PostEvent(i);
      } else if (e.Type === IAction_1.EPostAkEvent.Target) {
        e = e.EntityId;
        if (!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 26, "实体不存在", ["entityId", e]);
          }
        }
        if ((t = t.Entity.GetComponent(1)?.Owner)?.IsValid()) {
          AudioSystem_1.AudioSystem.PostEvent(i, t);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 26, "未能获取到该实体对应的有效Actor", ["entityId", e]);
        }
      }
    }
  }
}
exports.CommonFlowTextLogic = CommonFlowTextLogic;
//# sourceMappingURL=CommonFlowTextLogic.js.map