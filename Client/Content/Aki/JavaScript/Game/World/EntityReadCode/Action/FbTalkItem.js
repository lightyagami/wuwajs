"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTalkItem = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("./FbActionInfo");
const FbActorLookAt_1 = require("./FbActorLookAt");
const FbActorTurnTo_1 = require("./FbActorTurnTo");
const FbCameraData_1 = require("./FbCameraData");
const FbCaptionParam_1 = require("./FbCaptionParam");
const FbMontageData_1 = require("./FbMontageData");
const FbPlayMontage_1 = require("./FbPlayMontage");
const FbSetFlowTemplate_1 = require("./FbSetFlowTemplate");
const FbTalkOption_1 = require("./FbTalkOption");
const FbUniversalTone_1 = require("./FbUniversalTone");
const UnionPostAkEventHelper_1 = require("./UnionPostAkEventHelper");
const UnionTalkBackgroundHelper_1 = require("./UnionTalkBackgroundHelper");
class FbTalkItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tgh = false;
    this.FFe = 0;
    this.igh = false;
    this.rgh = 0;
    this.vCh = false;
    this.yCh = undefined;
    this.x_h = false;
    this.FGi = undefined;
    this.ogh = false;
    this.ngh = false;
    this.sgh = false;
    this.agh = undefined;
    this.Dmh = false;
    this.Bmh = 0;
    this.CCh = false;
    this.gCh = 0;
    this.hgh = false;
    this.lgh = undefined;
    this.vmh = false;
    this.ymh = 0;
    this._gh = false;
    this.cgh = undefined;
    this.L_h = false;
    this.A_h = undefined;
    this.ugh = false;
    this.dgh = undefined;
    this.mgh = false;
    this.Cgh = undefined;
    this.ggh = false;
    this.fgh = undefined;
    this.pgh = false;
    this.vgh = undefined;
    this.Qk_ = false;
    this.Kk_ = undefined;
    this.ygh = false;
    this.Sgh = undefined;
    this.Mgh = false;
    this.Egh = undefined;
    this.Igh = false;
    this.Tgh = undefined;
    this.bgh = false;
    this.Lgh = undefined;
    this.Agh = false;
    this.xgh = undefined;
    this.Rgh = false;
    this.wgh = undefined;
    this.Pgh = false;
    this.Ugh = false;
  }
  static Create(t) {
    if (t) {
      return new FbTalkItem(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get PlotLineId() {
    if (!this.igh) {
      this.igh = true;
      this.rgh = this.FbDataInternal.plotLineId();
    }
    return this.rgh;
  }
  get PlotLineKey() {
    if (!this.vCh) {
      this.vCh = true;
      this.yCh = this.FbDataInternal.plotLineKey();
    }
    return this.yCh;
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get _folded() {
    if (!this.ogh) {
      this.ogh = true;
      this.ngh = this.FbDataInternal.folded();
    }
    return this.ngh;
  }
  get _editFlag() {
    if (!this.sgh) {
      this.sgh = true;
      this.agh = this.FbDataInternal.editFlag();
    }
    return this.agh;
  }
  get WhoId() {
    if (!this.Dmh) {
      this.Dmh = true;
      this.Bmh = this.FbDataInternal.whoId();
    }
    return this.Bmh;
  }
  get TextId() {
    if (!this.CCh) {
      this.CCh = true;
      this.gCh = this.FbDataInternal.textId();
    }
    return this.gCh;
  }
  get TidTalk() {
    if (!this.hgh) {
      this.hgh = true;
      this.lgh = this.FbDataInternal.tidTalk();
    }
    return this.lgh;
  }
  get WaitTime() {
    if (!this.vmh) {
      this.vmh = true;
      this.ymh = this.FbDataInternal.waitTime();
    }
    return this.ymh;
  }
  get CaptionParams() {
    if (!this._gh) {
      this._gh = true;
      this.cgh = FbCaptionParam_1.FbCaptionParam.Create(this.FbDataInternal.captionParams());
    }
    return this.cgh;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.A_h;
  }
  get Options() {
    if (!this.ugh) {
      this.ugh = true;
      this.dgh = new Array();
      var i = this.FbDataInternal.optionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.options(t, new fb_action_1.TalkOption());
          this.dgh.push(FbTalkOption_1.FbTalkOption.Create(s));
        }
      }
    }
    return this.dgh;
  }
  get Montage() {
    if (!this.mgh) {
      this.mgh = true;
      this.Cgh = FbPlayMontage_1.FbPlayMontage.Create(this.FbDataInternal.montage());
    }
    return this.Cgh;
  }
  get CameraData() {
    if (!this.ggh) {
      this.ggh = true;
      this.fgh = FbCameraData_1.FbCameraData.Create(this.FbDataInternal.cameraData());
    }
    return this.fgh;
  }
  get FlowTemplate() {
    if (!this.pgh) {
      this.pgh = true;
      this.vgh = FbSetFlowTemplate_1.FbSetFlowTemplate.Create(this.FbDataInternal.flowTemplate());
    }
    return this.vgh;
  }
  get FlowTemplateList() {
    if (!this.Qk_) {
      this.Qk_ = true;
      this.Kk_ = new Array();
      var i = this.FbDataInternal.flowTemplateListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.flowTemplateList(t, new fb_action_1.SetFlowTemplate());
          this.Kk_.push(FbSetFlowTemplate_1.FbSetFlowTemplate.Create(s));
        }
      }
    }
    return this.Kk_;
  }
  get ActorMontageArray() {
    if (!this.ygh) {
      this.ygh = true;
      this.Sgh = new Array();
      var i = this.FbDataInternal.actorMontageArrayLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actorMontageArray(t, new fb_action_1.MontageData());
          this.Sgh.push(FbMontageData_1.FbMontageData.Create(s));
        }
      }
    }
    return this.Sgh;
  }
  get ActorLookAtArray() {
    if (!this.Mgh) {
      this.Mgh = true;
      this.Egh = new Array();
      var i = this.FbDataInternal.actorLookAtArrayLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actorLookAtArray(t, new fb_action_1.ActorLookAt());
          this.Egh.push(FbActorLookAt_1.FbActorLookAt.Create(s));
        }
      }
    }
    return this.Egh;
  }
  get ActorTurnToArray() {
    if (!this.Igh) {
      this.Igh = true;
      this.Tgh = new Array();
      var i = this.FbDataInternal.actorTurnToArrayLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actorTurnToArray(t, new fb_action_1.ActorTurnTo());
          this.Tgh.push(FbActorTurnTo_1.FbActorTurnTo.Create(s));
        }
      }
    }
    return this.Tgh;
  }
  get TalkAkEvent() {
    var t;
    var i;
    if (!this.bgh && (this.bgh = true, t = this.FbDataInternal.talkAkEventType(), i = UnionPostAkEventHelper_1.UnionPostAkEventHelper.GetUnionPostAkEventObject(t))) {
      this.Lgh = UnionPostAkEventHelper_1.UnionPostAkEventHelper.ReadUnionPostAkEvent(t, this.FbDataInternal.talkAkEvent(i));
    }
    return this.Lgh;
  }
  get UniversalTone() {
    if (!this.Agh) {
      this.Agh = true;
      this.xgh = FbUniversalTone_1.FbUniversalTone.Create(this.FbDataInternal.universalTone());
    }
    return this.xgh;
  }
  get BackgroundConfig() {
    var t;
    var i;
    if (!this.Rgh && (this.Rgh = true, t = this.FbDataInternal.backgroundConfigType(), i = UnionTalkBackgroundHelper_1.UnionTalkBackgroundHelper.GetUnionTalkBackgroundObject(t))) {
      this.wgh = UnionTalkBackgroundHelper_1.UnionTalkBackgroundHelper.ReadUnionTalkBackground(t, this.FbDataInternal.backgroundConfig(i));
    }
    return this.wgh;
  }
  get PlayVoice() {
    if (!this.Pgh) {
      this.Pgh = true;
      this.Ugh = this.FbDataInternal.playVoice();
    }
    return this.Ugh;
  }
}
exports.FbTalkItem = FbTalkItem;
//# sourceMappingURL=FbTalkItem.js.map