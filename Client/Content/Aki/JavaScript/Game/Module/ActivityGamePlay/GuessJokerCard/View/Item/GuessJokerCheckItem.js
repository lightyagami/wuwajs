"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerCheckItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const GlobalData_1 = require("../../../../../GlobalData");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GuessJokerDefine_1 = require("../../GuessJokerDefine");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
class GuessJokerCheckItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xag = undefined;
    this.Bag = undefined;
    this._Ke = false;
    this.VLf = undefined;
    this.Delegate = undefined;
    this.Igo = new UE.Vector2D();
    this.l$t = new UE.Vector2D();
    this.HLf = e => {
      var s;
      if (this.RootItem) {
        s = this.Igo.X + (this.l$t.X - this.Igo.X) * e;
        e = this.Igo.Y + (this.l$t.Y - this.Igo.Y) * e;
        this.RootItem.SetAnchorOffset(new UE.Vector2D(s, e));
      }
    };
    this.jLf = () => {
      this._Ke = false;
      this.VLf?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnBeforeShow() {
    this.SetUiActive(false);
  }
  OnStart() {
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.HLf);
  }
  OnBeforeDestroy() {
    this.StopMove();
    if (this.Delegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.HLf);
      this.Delegate = undefined;
    }
  }
  ShowAndMoveToCards(e, s) {
    var t;
    if (e.length === 0) {
      s?.();
    } else {
      this.StopMove();
      this.kag();
      if (t = e[0]) {
        t = t.GetCurrentPosition();
        t = new Vector2D_1.Vector2D(t.X, t.Y + GuessJokerDefine_1.GUESS_JOKER_CARD_CHECK_ITEM_UP_OFFSET);
        this.RootItem.SetAnchorOffset(t.ToUeVector2D());
        this.SetUiActive(true);
        if (e.length === 1) {
          this.qag(e[0], s);
        } else {
          this.Oag(e, 1, () => {
            s?.();
          });
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GuessJokerCard", 78, "第一张卡牌不存在");
        }
        s?.();
      }
    }
  }
  Oag(e, s, t) {
    this.kag();
    this.Bag = TimerSystem_1.TimerSystem.Delay(() => {
      this.Gag(e, s, t);
    }, GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerCheckItemStayTime"));
  }
  Gag(e, s, t) {
    var i;
    if (s >= e.length) {
      this.qag(e[e.length - 1], t);
    } else if (i = e[s]) {
      i = i.GetCurrentPosition();
      i = new Vector2D_1.Vector2D(i.X, i.Y + GuessJokerDefine_1.GUESS_JOKER_CARD_CHECK_ITEM_UP_OFFSET);
      this.Fag(i, () => {
        this.Oag(e, s + 1, t);
      }, GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerCheckItemMoveTime"));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, `卡牌索引${s}不存在`);
      }
      this.qag(e[e.length - 1], t);
    }
  }
  Fag(e, s, t = GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerCheckItemMoveTime")) {
    if (this._Ke) {
      this.StopMove();
    }
    this.VLf = s;
    this._Ke = true;
    s = this.$Lf();
    e = e.ToUeVector2D();
    if (Math.abs(s.X - e.X) < 0.01 && Math.abs(s.Y - e.Y) < 0.01) {
      this.jLf();
    } else {
      this.Igo.X = s.X;
      this.Igo.Y = s.Y;
      this.l$t.X = e.X;
      this.l$t.Y = e.Y;
      this.xag = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, 0, 1, t / 1000, 0, 6);
      if (this.xag) {
        this.xag.OnCompleteCallBack.Bind(this.jLf);
      }
    }
  }
  qag(e, s) {
    this.kag();
    var t = e.GetCurrentPosition();
    const i = new Vector2D_1.Vector2D(t.X, t.Y);
    this.Bag = TimerSystem_1.TimerSystem.Delay(() => {
      this.Fag(i, () => {
        s?.();
        e.SetCheckCardItem(true);
        this.HideItem();
      });
    }, GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerCheckItemStayTime"));
  }
  StopMove() {
    if (this.xag) {
      this.xag.Kill();
      this.xag.OnCompleteCallBack.Unbind();
      this.xag = undefined;
    }
    this._Ke = false;
    this.VLf = undefined;
  }
  $Lf() {
    if (this.RootItem) {
      return this.RootItem.GetAnchorOffset();
    } else {
      return new UE.Vector2D(0, 0);
    }
  }
  HideItem() {
    this.StopMove();
    this.kag();
    this.SetUiActive(false);
  }
  kag() {
    if (this.Bag) {
      if (TimerSystem_1.TimerSystem.Has(this.Bag)) {
        TimerSystem_1.TimerSystem.Remove(this.Bag);
      }
      this.Bag = undefined;
    }
  }
}
exports.GuessJokerCheckItem = GuessJokerCheckItem;
//# sourceMappingURL=GuessJokerCheckItem.js.map