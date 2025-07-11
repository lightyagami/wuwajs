"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioModel = exports.AudioBox = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../Actor/ActorSystem");
const PriorityQueue_1 = require("../Container/PriorityQueue");
const ModelBase_1 = require("../Framework/ModelBase");
const MathUtils_1 = require("../Utils/MathUtils");
class AudioBox {
  constructor(e, t, r) {
    this.Priority = e;
    this.PbDataId = t;
    this.BoxType = r;
  }
}
(exports.AudioBox = AudioBox).Compare = (e, t) => {
  let r = t.Priority - e.Priority;
  if (r === 0) {
    r--;
  }
  return r;
};
class AudioModel extends ModelBase_1.ModelBase {
  constructor() {
    super();
    this.Q6 = undefined;
    this.X6 = undefined;
  }
  static GetSpectrumActor() {
    AudioModel.Y6 ||= ActorSystem_1.ActorSystem.Get(UE.BP_Wwise_AudioSpectrum_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    return AudioModel.Y6;
  }
  static DestroySpectrumActor() {
    if (AudioModel.Y6) {
      ActorSystem_1.ActorSystem.Put("AudioModel.DestroySpectrumActor", AudioModel.Y6);
      AudioModel.Y6 = undefined;
    }
  }
  OnInit() {
    this.Q6 = new PriorityQueue_1.PriorityQueue(AudioBox.Compare);
    this.X6 = new PriorityQueue_1.PriorityQueue(AudioBox.Compare);
    return true;
  }
  OnClear() {
    this.Q6 = undefined;
    return !(this.X6 = undefined);
  }
  UpdateAudioBoxQueue(e, t) {
    let r = undefined;
    let i = undefined;
    switch (e.BoxType) {
      case "AudioAMB":
        if (this.Q6 && !this.Q6.Empty) {
          r = this.Q6.Top;
        }
        i = this.Q6;
        break;
      case "AudioBGM":
        if (this.X6 && !this.X6.Empty) {
          r = this.X6.Top;
        }
        i = this.X6;
        break;
      default:
        return;
    }
    var o = r === e;
    switch (t) {
      case 0:
        i.Push(e);
        if (i.Top === e) {
          return i.Top;
        }
        break;
      case 1:
        i.Remove(e);
        if (o && !i.Empty) {
          return i.Top;
        }
        break;
      case 2:
        if (o) {
          return i.Top;
        }
        break;
      default:
        return;
    }
  }
}
(exports.AudioModel = AudioModel).Y6 = undefined;
//# sourceMappingURL=AudioModel.js.map