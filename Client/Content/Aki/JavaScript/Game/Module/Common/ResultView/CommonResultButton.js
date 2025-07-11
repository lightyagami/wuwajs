"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonResultButton = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class CommonResultButton extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.IRe = undefined;
    this.rbt = 0;
    this.nbt = undefined;
    this.sbt = undefined;
    this.ije = () => {
      if (this.nbt) {
        this.nbt();
      }
      this.DoClickCallBack();
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  OnBeforeDestroy() {
    this.ClearBtnTimer();
    this.nbt = undefined;
  }
  ResetData() {
    this.sbt = undefined;
  }
  SetData(t) {
    this.sbt = t;
  }
  DoClickCallBack() {
    this.sbt?.GetButtonClickCallBack()?.();
  }
  DoTimerCallBack(t) {
    this.sbt?.GetButtonTimerCallBack()?.(t, this);
  }
  DoRefreshCallBack() {
    this.sbt?.GetButtonRefreshCallBack()?.(this);
  }
  SetBtnFunction(t) {
    this.nbt = t;
  }
  SetBtnCanClick(t) {
    var i = this.GetButton(0);
    if (i.GetSelfInteractive() !== t) {
      i.SetSelfInteractive(t);
    }
  }
  SetBtnText(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, i);
  }
  GetBtnText() {
    return this.GetText(1);
  }
  SetTipsItem(t, i) {
    i = "×" + (i ?? ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t)).toString();
    this.GetText(4).SetText(i);
    this.SetItemIcon(this.GetTexture(3), t);
    this.GetItem(5).SetUIActive(true);
  }
  SetTipsItemTextColor(t) {
    this.GetText(4).SetColor(t);
  }
  SetFloatText(t, ...i) {
    this.GetText(2).SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), t, i);
  }
  GetBtnFloatText() {
    this.GetText(2).SetUIActive(true);
    return this.GetText(2);
  }
  SetFloatTextWithTimer(t, i, e) {
    this.ClearBtnTimer();
    if (!i) {
      this.SetBtnCanClick(i);
    }
    this.rbt = t;
    this.IRe = TimerSystem_1.GameplayTimerSystem.Loop(() => {
      if (this.rbt <= 0) {
        if (i) {
          this.ije();
        } else {
          this.SetBtnCanClick(true);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), e, this.rbt--);
      }
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND, t + 1);
    this.GetText(2).SetUIActive(true);
  }
  ClearBtnTimer() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.IRe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
    }
    this.IRe = undefined;
  }
}
exports.CommonResultButton = CommonResultButton;
//# sourceMappingURL=CommonResultButton.js.map