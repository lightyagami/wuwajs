"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgTipViewB = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiFloatTween_1 = require("../../Util/Lgui/LguiFloatTween");
const PhoneSystemDefine_1 = require("../PhoneSystemDefine");
const CLOSE_TIME = 4000;
class PhoneMsgTipViewB extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Fsf = undefined;
    this.Ybe = CLOSE_TIME;
    this.vNi = false;
    this.Hea = undefined;
    this.fLf = undefined;
    this.gLf = undefined;
    this.CLf = undefined;
    this.pLf = undefined;
    this.Wpu = (i, e) => {
      var t;
      if (e === "Close_UI") {
        this.CloseMe();
      }
      if (e === "Particle_In" && (e = undefined, t = UiManager_1.UiManager.GetViewByName("BattleView").OpenParam) && (e = t.GetTopPanelPhoneMsgButtonItem())) {
        this.vLf(e);
      }
    };
    this.TipsWorldPos = Vector_1.Vector.Create(0, 0, 0);
    this.cUf = false;
    this.raf = () => {
      this.cUf = true;
      this.CloseMe();
    };
    this.OnAfterDestroyImplement = () => {
      if (this.cUf) {
        UiManager_1.UiManager.OpenView("PhoneMsgPanelViewBig", this.Fsf);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite]];
    this.BtnBindInfo = [[0, this.raf]];
  }
  OnStart() {
    this.Fsf = this.OpenParam;
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    if (this.Fsf === undefined) {
      this.CloseMe();
    }
    this.RootActor.OnSequencePlayEvent.Bind(this.Wpu);
  }
  OnTick(i) {
    if (!this.vNi) {
      this.Ybe -= i;
      i = this.Ybe / CLOSE_TIME;
      this.GetSprite(1).SetFillAmount(i);
      if (this.Ybe <= 0) {
        this.vNi = true;
        this.Hea?.StopSequenceByKey("Out");
        this.Hea?.PlayLevelSequenceByName("Out");
      }
    }
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
    this.fLf?.Destroy();
    this.gLf?.Destroy();
  }
  GetMessageDataId() {
    return this.Fsf?.Id;
  }
  vLf(i) {
    this.fLf = new LguiFloatTween_1.LguiFloatTween();
    this.fLf.BindUpdateTween(i => {
      this.TipsWorldPos.X = i;
      this.RootItem.SetUIWorldLocation(this.TipsWorldPos.ToUeVectorOld());
    });
    this.gLf = new LguiFloatTween_1.LguiFloatTween();
    this.gLf.BindUpdateTween(i => {
      this.TipsWorldPos.Z = i;
      this.RootItem.SetUIWorldLocation(this.TipsWorldPos.ToUeVectorOld());
    });
    var e = PhoneSystemDefine_1.TIPS_ITEM_FLY_TO_LOCATION_DURATION;
    var t = this.RootItem.D_K2_GetComponentLocation();
    var i = i.D_K2_GetComponentLocation();
    this.TipsWorldPos.DeepCopy(t);
    this.fLf.PlayTween(t.X, i.X, e, this.CLf);
    this.gLf.PlayTween(t.Z, i.Z, e, this.pLf);
  }
}
exports.PhoneMsgTipViewB = PhoneMsgTipViewB;
//# sourceMappingURL=PhoneMsgTipViewB.js.map