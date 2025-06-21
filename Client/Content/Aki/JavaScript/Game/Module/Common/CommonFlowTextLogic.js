"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CommonFlowTextLogic = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LguiUtil_1 = require("../Util/LguiUtil");
class CommonFlowTextLogic {
  constructor() {
    this.eJ1 = void 0, this.tJ1 = void 0, this.iJ1 = void 0, this.Pe = void 0, this._Ct = void 0, this.CZi = () => {
      this._Ct = void 0, this.Pe.TextAnimFinishDelegate?.(this.tJ1, this.iJ1)
    }
  }
  rJ1() {
    this._Ct && (TimerSystem_1.TimerSystem.Remove(this._Ct), this._Ct = void 0)
  }
  oJ1(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.tJ1.TidTalk);
    else {
      let i = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.tJ1.TidTalk);
      StringUtils_1.StringUtils.IsEmpty(i) && (Log_1.Log.CheckError() && Log_1.Log.Error("Plot", 10, "字幕为空", ["id", this.tJ1.TidTalk]), i = this.tJ1.TidTalk), t.SetGameRichText(!0), t.SetText(i)
    }
  }
  nJ1(i, t) {
    this.rJ1(), this.Pe.TextAnimStartDelegate?.(this.tJ1, this.iJ1);
    var e = i.GetDisplayCharLength();
    let o = 1;
    o = t || e / ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedLevelD;
    t = Math.max(o * CommonDefine_1.MILLIONSECOND_PER_SECOND, TimerSystem_1.MIN_TIME);
    i.GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())?.SetSelectorOffset(1), this.eJ1 = i.GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass()), this.eJ1 && (this.eJ1.GetPlayTween().duration = o, this.eJ1.Play()), this._Ct = TimerSystem_1.TimerSystem.Delay(this.CZi, t)
  }
  InitData(i) {
    this.Pe = i
  }
  PlayFlowText(i, t) {
    this.tJ1 = i, this.iJ1 = t;
    t = this.Pe.GetTextComp(i);
    t && (this.MZi(), this.oJ1(t), i = this.tJ1.CaptionParams, this.nJ1(t, i?.TotalTime))
  }
  Clear() {
    this.eJ1?.Stop(), this.rJ1(), this.Pe.ClearDelegate?.(), this.tJ1 = void 0, this.iJ1 = void 0
  }
  MZi() {
    var i, t, e = this.tJ1.TalkAkEvent;
    e && (i = (0, AudioSystem_1.parseAudioEventPath)(e.AkEvent)) && (e.Type === IAction_1.EPostAkEvent.Global ? AudioSystem_1.AudioSystem.PostEvent(i) : e.Type === IAction_1.EPostAkEvent.Target && (e = e.EntityId, (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)) || Log_1.Log.CheckError() && Log_1.Log.Error("Event", 26, "实体不存在", ["entityId", e]), (t = t.Entity.GetComponent(1)?.Owner)?.IsValid() ? AudioSystem_1.AudioSystem.PostEvent(i, t) : Log_1.Log.CheckError() && Log_1.Log.Error("Event", 26, "未能获取到该实体对应的有效Actor", ["entityId", e])))
  }
}
exports.CommonFlowTextLogic = CommonFlowTextLogic;
//# sourceMappingURL=CommonFlowTextLogic.js.map