"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleSkillTips = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const LguiEventSystemManager_1 = require("../../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class PhantomArenaBattleSkillTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.IsInActive = false;
    this.TimerHandle = undefined;
    this.Nno = e => {
      if (e === "Close") {
        this.SetActive(false);
      }
    };
    this.ygf = () => {
      if (this.RootItem) {
        if (!LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0, true).enterComponentStack.Contains(this.RootItem)) {
          this.dbu();
        }
      } else {
        this.FBd();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.Nno);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
    this.FBd();
  }
  QNm(e, i, t) {
    var s = this.GetOriginalItem();
    s?.SetPivot(new UE.Vector2D(e, i));
    s?.SetAnchorHAlign(t);
    s?.SetAnchorOffset(new UE.Vector2D(0, 0));
  }
  b6f() {
    this.FBd();
    this.TimerHandle = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.ygf();
    }, 100);
  }
  FBd() {
    if (this.TimerHandle) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TimerHandle);
      this.TimerHandle = undefined;
    }
  }
  jt_() {
    this.FBd();
    this.SetActive(true);
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequence("Start");
  }
  dbu() {
    this.FBd();
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequence("Close");
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.SkillName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.SkillDesc, ...e.SkillDescParams);
  }
  SetTipsPosition(e, i) {
    this.RootItem?.SetUIParent(e);
    if (i) {
      this.QNm(1, 0, 3);
    } else {
      this.QNm(0, 1, 1);
    }
  }
  SetTipsActive(e) {
    if (this.IsInActive !== e) {
      if (this.IsInActive = e) {
        this.jt_();
      } else {
        this.b6f();
      }
    }
  }
}
exports.PhantomArenaBattleSkillTips = PhantomArenaBattleSkillTips;
//# sourceMappingURL=PhantomArenaBattleSkillTips.js.map