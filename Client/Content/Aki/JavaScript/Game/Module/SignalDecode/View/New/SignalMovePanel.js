"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalMovePanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SignalItem_1 = require("./SignalItem");
const SignalLineItem_1 = require("./SignalLineItem");
class SignalMovePanel extends UiComponentsAction_1.UiComponentsAction {
  constructor() {
    super(...arguments);
    this.UEo = undefined;
    this.AEo = undefined;
    this.PEo = undefined;
    this.xEo = undefined;
    this.aBn = undefined;
    this.$Rr = undefined;
    this.Ist = 0;
  }
  async Init(t, i) {
    t.SetAnchorOffsetY(0);
    await this.CreateThenShowByActorAsync(t.GetOwner());
    this.InitByGameplayType(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIHorizontalLayout]];
  }
  OnStart() {
    this.AEo = this.GetItem(0);
    this.PEo = this.GetItem(1);
    this.xEo = this.GetItem(2);
    this.aBn = this.GetItem(3);
    this.$Rr = this.GetHorizontalLayout(4);
    this.$Rr.SetEnable(false);
    this.$Rr.SetAlign(3);
    this.wEo();
    this.AEo.SetUIActive(false);
    this.xEo.SetUIActive(false);
    this.PEo.SetUIActive(false);
    this.aBn.SetUIActive(false);
  }
  wEo() {
    var t = ModelManager_1.ModelManager.SignalDecodeModel;
    var e = t.CurrentMorseCode;
    this.Ist = t.Speed;
    var s = t.StartDecisionSize;
    var n = t.EndDecisionSize;
    var o = t.CurrentGameplayType === 3;
    this.UEo = [];
    var h = this.RootItem.GetWidth() / 2;
    let a = 0;
    for (let i = 0; i < e.length; ++i) {
      var r;
      var l = e[i];
      var g = Number(l) ?? 0;
      if (i !== e.length - 1 && g !== 0) {
        l = LguiUtil_1.LguiUtil.CopyItem(this.xEo, this.$Rr.RootUIComp);
        (r = new SignalLineItem_1.SignalLineItem(0, h, s, n)).Init(l, a);
        this.UEo.push(r);
        a -= r.Width;
      }
      let t = undefined;
      switch (g) {
        case 1:
          var _ = LguiUtil_1.LguiUtil.CopyItem(this.PEo, this.$Rr.RootUIComp);
          (t = new SignalItem_1.SignalItem(g, h, s, n)).Init(_, a);
          break;
        case 2:
          _ = LguiUtil_1.LguiUtil.CopyItem(this.AEo, this.$Rr.RootUIComp);
          (t = new SignalItem_1.SignalItem(g, h, s, n)).Init(_, a);
          break;
        default:
          var c = LguiUtil_1.LguiUtil.CopyItem(this.xEo, this.$Rr.RootUIComp);
          (t = new SignalLineItem_1.SignalLineItem(0, h, s, n)).Init(c, a);
      }
      if (g === 0 && o) {
        t.AddWidth(this.aBn.Width);
      }
      a -= t.Width;
      this.UEo.push(t);
    }
  }
  InitByGameplayType(t) {
    if (this.UEo) {
      for (const i of this.UEo) {
        i.InitByGameplayType(t);
      }
    }
  }
  InitMoveNode() {
    this.$Rr.RootUIComp.SetAnchorOffsetX(-1280);
  }
  StartAgain() {
    if (this.UEo) {
      for (const t of this.UEo) {
        t.Reset();
      }
    }
  }
  UpdateMove(t) {
    this.BEo(t);
    this.bEo();
  }
  GetCompleteness() {
    let t = 0;
    let i = 0;
    for (const e of this.UEo) {
      if (e instanceof SignalItem_1.SignalItem) {
        i += e.GetCompleteness();
        t++;
      }
    }
    if (t === 0) {
      return 1;
    } else {
      return i / t;
    }
  }
  GetProgress() {
    let t = 0;
    let i = 0;
    for (const e of this.UEo) {
      i += e.GetProgress();
      t++;
    }
    if (t === 0) {
      return 1;
    } else {
      return i / t;
    }
  }
  BEo(t) {
    t = this.$Rr.RootUIComp.GetAnchorOffsetX() + t / 1000 * this.Ist;
    this.$Rr.RootUIComp.SetAnchorOffsetX(t);
  }
  bEo() {
    var t = this.$Rr.RootUIComp.GetAnchorOffsetX();
    for (const e of this.UEo) {
      var i = t + e.GetRootItem().GetAnchorOffsetX();
      e.Update(i);
    }
  }
  OnCatchBtnDown() {
    for (const t of this.UEo) {
      t.OnCatchBtnDown();
    }
  }
  OnCatchBtnUp() {
    for (const t of this.UEo) {
      t.OnCatchBtnUp();
    }
  }
}
exports.SignalMovePanel = SignalMovePanel;
//# sourceMappingURL=SignalMovePanel.js.map