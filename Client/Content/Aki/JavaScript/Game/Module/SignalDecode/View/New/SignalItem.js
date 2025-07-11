"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalItem = undefined;
const UE = require("ue");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const SignalItemBase_1 = require("./SignalItemBase");
const NIAGARA_PARAM_NAME = "Dissolve";
const NIAGARA_YELLOW_COLOR = "FFFBE8FF";
const NIAGARA_RED_COLOR = "FFD6D6FF";
const NIAGARA_GREEN_COLOR = "E0FCDEFF";
const NIAGARA_ORANGE_COLOR = "FFBCA4FF";
class SignalItem extends SignalItemBase_1.SignalItemBase {
  constructor() {
    super(...arguments);
    this.i0o = undefined;
    this.CEo = undefined;
    this.gEo = undefined;
    this.fEo = undefined;
    this.pEo = undefined;
    this.vEo = undefined;
    this.MEo = undefined;
    this.EEo = undefined;
    this.sBn = undefined;
    this.LevelSequencePlayer = undefined;
    this.ac = 0;
  }
  Init(t, i) {
    this.SetRootActor(t.GetOwner(), true);
    this.Width = this.RootItem.Width;
    this.RootItem.SetAnchorOffsetX(i);
    this.vEo = UE.Color.FromHex("E8CD74");
    this.EEo = UE.Color.FromHex("FF6A6A");
    this.MEo = UE.Color.FromHex("9DED87");
    this.sBn = UE.Color.FromHex("FF6827");
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UINiagara], [2, UE.UINiagara], [3, UE.UISprite], [4, UE.UISprite]];
  }
  OnStart() {
    this.i0o = this.GetSprite(0);
    this.CEo = this.GetSprite(4);
    this.gEo = this.GetUiNiagara(1);
    this.fEo = this.GetUiNiagara(2);
    this.pEo = this.GetSprite(3);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnReset() {
    this.i0o.SetFillAmount(1);
    this.i0o.SetAlpha(1);
    this.i0o.SetUIActive(true);
    this.CEo.SetFillAmount(0);
    var t = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType;
    let i = t === 2 ? this.MEo : this.vEo;
    if (t === 3) {
      i = this.sBn;
      this.i0o.SetColor(i);
    }
    this.CEo.SetColor(i);
    this.i0o.SetAlpha(1);
    this.CEo.SetUIActive(false);
    this.gEo?.SetUIActive(t === 1);
    this.gEo.SetUIItemScale(Vector_1.Vector.OneVector);
    this.gEo.SetAlpha(1);
    this.fEo.SetNiagaraVarFloat(NIAGARA_PARAM_NAME, 1);
    this.fEo.SetUIActive(true);
    this.fEo.SetUIItemScale(Vector_1.Vector.OneVector);
    this.fEo.SetAlpha(1);
    this.SEo();
    this.pEo.SetAlpha(0);
    this.ac = 0;
  }
  InitByGameplayType(t) {
    super.InitByGameplayType(t);
    let i = t === 2 ? "SP_SignalNoteSolidLineGreen" : "SP_SignalNoteSolidLineYellow";
    if (t === 3) {
      i = "SP_SignalNoteSolidLineOrange";
    }
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(t, this.pEo, false);
    this.Reset();
  }
  SEo() {
    let t = this.GameplayType === 2 ? NIAGARA_GREEN_COLOR : NIAGARA_YELLOW_COLOR;
    if (this.GameplayType === 3) {
      t = NIAGARA_ORANGE_COLOR;
    }
    this.fEo.SetColor(UE.Color.FromHex(t));
  }
  OnUpdate() {
    return !!super.OnUpdate() && (this.UpdateState(), this.ac === 1 && this.yEo(), true);
  }
  UpdateState() {
    var t = -this.StartDecisionSize / 2;
    if (this.CurrentRelativeX < t) {
      this.Owt(0);
    } else if (this.EndDecisionSize / 2 < this.CurrentRelativeX - this.Width && this.ac !== 2 || (t = this.StartDecisionSize / 2, this.CurrentRelativeX > t && this.ac === 0)) {
      this.Owt(3);
    }
  }
  Owt(t) {
    if (this.ac !== t) {
      switch (this.ac = t) {
        case 1:
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignalCatchStart);
          break;
        case 2:
          this.zMo();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignalCatchSuccess);
          break;
        case 3:
          this.eEo();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignalCatchFailed);
      }
    }
  }
  yEo() {
    var t = this.GetProgress();
    this.fEo.SetNiagaraVarFloat(NIAGARA_PARAM_NAME, 1 - t);
    this.CEo.SetUIActive(true);
    this.i0o.SetFillAmount(1 - t);
    this.CEo.SetFillAmount(t);
  }
  eEo() {
    switch (this.Type) {
      case 1:
        this.IEo();
        break;
      case 2:
        if (this.CEo.bIsUIActive) {
          this.CEo.SetColor(this.EEo);
          this.fEo.SetColor(UE.Color.FromHex(NIAGARA_RED_COLOR));
        } else if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 2) {
          this.IEo();
          break;
        }
        this.LevelSequencePlayer.PlayLevelSequenceByName("Trans");
    }
  }
  zMo() {
    this.fEo.SetNiagaraVarFloat(NIAGARA_PARAM_NAME, 0);
    this.fEo.SetUIActive(true);
    this.gEo.SetUIActive(false);
    this.i0o.SetUIActive(false);
    this.CEo.SetUIActive(false);
    this.pEo.SetAlpha(0);
  }
  OnCatchBtnDown() {
    super.OnCatchBtnDown();
    if (this.ac === 0 && this.TEo()) {
      this.Owt(1);
    }
  }
  OnCatchBtnUp() {
    var t;
    super.OnCatchBtnUp();
    if (this.ac === 1) {
      t = this.LEo();
      this.Owt(t ? 2 : 3);
    }
  }
  TEo() {
    var t = -this.StartDecisionSize / 2;
    var i = this.StartDecisionSize / 2;
    return this.RelativeXWhenCatchDown > t && this.RelativeXWhenCatchDown < i;
  }
  LEo() {
    var t = this.EndDecisionSize / 2;
    var i = -this.EndDecisionSize / 2;
    var e = this.RelativeXWhenCatchUp - this.Width;
    return i < e && e < t;
  }
  GetProgress() {
    var t = -this.DecisionShowSize / 2;
    var t = this.CurrentRelativeX - t;
    return MathCommon_1.MathCommon.Clamp(t / this.Width, 0, 1);
  }
  GetCompleteness() {
    let t = 0;
    switch (this.ac) {
      case 1:
        t = this.GetProgress();
        break;
      case 2:
        t = 1;
        break;
      case 0:
      case 3:
        t = 0;
    }
    return t;
  }
  IEo() {
    this.CEo.SetUIActive(false);
    this.fEo.SetUIActive(false);
    this.gEo.SetUIActive(false);
    this.i0o.SetUIActive(false);
    this.pEo.SetAlpha(1);
  }
  TestCanBtnDown() {
    var t;
    var i;
    return this.ac === 0 && (t = -this.StartDecisionSize / 2, i = this.StartDecisionSize / 2, this.CurrentRelativeX > t) && this.CurrentRelativeX < i;
  }
  TestCanBtnUp() {
    var t;
    var i;
    return this.ac === 1 && (t = this.EndDecisionSize / 2, -this.EndDecisionSize / 2 < (i = this.CurrentRelativeX - this.Width)) && i < t;
  }
}
exports.SignalItem = SignalItem;
//# sourceMappingURL=SignalItem.js.map