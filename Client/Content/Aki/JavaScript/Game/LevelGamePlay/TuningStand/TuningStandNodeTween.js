"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandNodeTween = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const LoadAsyncPromise_1 = require("../../Module/UiComponent/LoadAsyncPromise");
const TuningStandDefine_1 = require("./TuningStandDefine");
class TuningStandNodeTween {
  constructor(i, e) {
    this.NodeItem = i;
    this.CurveNameX = e;
    this.TweenerX = undefined;
    this.TweenerZ = undefined;
    this.DelegateX = undefined;
    this.DelegateZ = undefined;
    this.CurveX = undefined;
    this.CurveZ = undefined;
    this.SequencePlayer = undefined;
    this.Icu = i => {
      var e = this.NodeItem.D_K2_GetComponentLocation();
      var i = Vector_1.Vector.Create(i, e.Y, e.Z).ToUeVector();
      this.NodeItem.D_K2_SetWorldLocation(i, false, undefined, false);
    };
    this.Dcu = i => {
      var e = this.NodeItem.D_K2_GetComponentLocation();
      var e = Vector_1.Vector.Create(e.X, e.Y, i).ToUeVector();
      this.NodeItem.D_K2_SetWorldLocation(e, false, undefined, false);
    };
    this.Oku = () => {
      this.TweenerX &&= undefined;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandSuccessShowEnd);
    };
    this.qku = () => {
      this.TweenerZ &&= undefined;
    };
    this.DelegateX = (0, puerts_1.toManualReleaseDelegate)(this.Icu);
    this.DelegateZ = (0, puerts_1.toManualReleaseDelegate)(this.Dcu);
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.NodeItem);
  }
  async InitCurveDamage() {
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("TuningTrail03");
    var i = new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat);
    this.CurveZ = await i.Promise;
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.CurveNameX);
    var i = new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat);
    this.CurveX = await i.Promise;
  }
  PlayTween(i, e, t = true) {
    this.TweenerX = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateX, i.X, e.X, TuningStandDefine_1.FX_FLYING_TIME);
    this.TweenerZ = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateZ, i.Z, e.Z, TuningStandDefine_1.FX_FLYING_TIME);
    this.NodeItem.SetUIActive(t);
    this.NodeItem.D_K2_SetWorldLocation(i, false, undefined, false);
    this.SequencePlayer.PlayLevelSequenceByName("Start");
    if (this.TweenerX) {
      this.TweenerX.SetEase(28);
      this.TweenerX.SetCurveFloat(this.CurveX);
      this.TweenerX.OnCompleteCallBack.Bind(this.Oku);
    }
    if (this.TweenerZ) {
      this.TweenerZ.SetEase(28);
      this.TweenerZ.SetCurveFloat(this.CurveZ);
      this.TweenerZ.OnCompleteCallBack.Bind(this.qku);
    }
  }
  Clear() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.Icu);
    (0, puerts_1.releaseManualReleaseDelegate)(this.Dcu);
    this.CurveX = undefined;
    this.CurveZ = undefined;
    this.TweenerX &&= undefined;
    this.TweenerZ &&= undefined;
    this.SequencePlayer = undefined;
  }
}
exports.TuningStandNodeTween = TuningStandNodeTween;
//# sourceMappingURL=TuningStandNodeTween.js.map