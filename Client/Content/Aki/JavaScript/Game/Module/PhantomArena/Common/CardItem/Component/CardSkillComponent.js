"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardSkillComponent = undefined;
const UE = require("ue");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const CardComponentBase_1 = require("../CardComponentBase");
class CardSkillComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments);
    this.SkillBtnClick = undefined;
    this.Sequence = undefined;
    this.Data = undefined;
    this.WEu = () => {
      this.SkillBtnClick();
    };
    this.$xt = t => {
      if (t === "NorToUse") {
        this.GetItem(0).SetUIActive(false);
      } else if (t === "UseToNor" || t === "UseToCd") {
        this.GetButton(3).RootUIComp.SetUIActive(false);
      } else if (t === "CdToNor") {
        this.GetSprite(2).SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.WEu]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.$xt);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  wjm() {
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequence("UseToNor");
    this.GetItem(0).SetUIActive(true);
  }
  Ljm() {
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequence("NorToUse");
    this.GetItem(0).SetUIActive(true);
    this.GetButton(3).RootUIComp.SetUIActive(true);
  }
  Pjm() {
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequence("CdToNor");
    this.GetSprite(1).SetUIActive(true);
  }
  Ajm() {
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequence("UseToCd");
    this.GetItem(0).SetUIActive(true);
    this.GetButton(3).RootUIComp.SetUIActive(false);
    this.GetSprite(2).SetUIActive(true);
  }
  Refresh(t) {
    if (t.InFight) {
      this.SetActive(true);
      if (t.InSelect && t.SkillCd <= 0) {
        this.TriggerCanUseState();
      } else {
        this.TriggerNormalState(t);
      }
    } else {
      this.SetActive(false);
    }
    this.Data = t;
  }
  TriggerCanUseState() {
    this.Ljm();
  }
  TriggerNormalState(t) {
    var s = !!this.Data?.SkillCd && this.Data.SkillCd > 0;
    if (t.SkillCd > 0) {
      if (!s) {
        this.Ajm();
      }
    } else if (s) {
      this.Pjm();
    } else if (!t.InSelect && this.Data?.InSelect) {
      this.wjm();
    }
  }
}
exports.CardSkillComponent = CardSkillComponent;
//# sourceMappingURL=CardSkillComponent.js.map