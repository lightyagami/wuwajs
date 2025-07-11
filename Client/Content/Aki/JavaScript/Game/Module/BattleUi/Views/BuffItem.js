"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffItem = undefined;
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const BattleUiControl_1 = require("../BattleUiControl");
const CLOSE_ANIM_TIME = 200;
const FADE_ANIM_PERCENT = 0.2;
const BUFF = "1";
const DEBUFF = "2";
class BuffItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Hnt = undefined;
    this.Ust = undefined;
    this.gKl = undefined;
    this.Ast = undefined;
    this.Pst = undefined;
    this.i0o = undefined;
    this.xst = "";
    this.fKl = 0;
    this.wst = 0;
    this.Bst = -0;
    this.bst = undefined;
    this.qst = undefined;
    this.Ega = undefined;
    this.Gst = 0;
    this.Nst = false;
    t = BattleUiControl_1.BattleUiControl.Pool.GetBuffItem(t);
    this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [3, UE.UIText], [2, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UITexture]];
  }
  OnStart() {
    this.Ust = this.GetTexture(1);
    this.gKl = this.GetTexture(10);
    this.Ast = this.GetText(3);
    this.Pst = this.GetSprite(2);
    this.i0o = this.GetSprite(9);
    this.Est(5);
    this.Est(6);
    this.Est(7);
  }
  Activate(t, i, s = false) {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      this.RootActor?.SetActorLabel("buffItem_" + t.Id);
    }
    this.bst = i;
    var h = t.Parameters.length;
    let e = 0;
    if (h > 3 && t.Parameters[3] !== "") {
      e = Number(t.Parameters[3]);
    }
    this.Ost(t.Path, e);
    if (i) {
      this.kst(i.StackCount);
      if (i.Duration <= 0) {
        this.Fst(1);
      } else {
        this.Fst(i.GetRemainDuration() / i.Duration);
      }
    } else {
      this.kst(1);
      this.Fst(1);
    }
    let o = undefined;
    if (h > 0) {
      o = t.Parameters[0];
    }
    this.GetSprite(8)?.SetUIActive(o === BUFF);
    this.GetSprite(4)?.SetUIActive(o === DEBUFF);
    if (h > 1 && t.Parameters[1] !== "") {
      this.Vst(t.Parameters[1]);
    } else {
      this.Vst();
    }
    if (h > 2 && t.Parameters[2] !== "") {
      this.yga(t.Parameters[2]);
    } else {
      this.yga();
    }
    this.SetUiActive(true);
    this.Gnt(6);
    if (s) {
      this.bnt(5);
    } else {
      this.RootItem?.SetAlpha(1);
      this.RootItem?.SetUIItemScale(Vector_1.Vector.OneVector);
    }
  }
  Ost(t, i) {
    if (this.xst !== t || this.fKl !== i) {
      this.xst = t;
      this.fKl = i;
      this.Ust.SetUIActive(false);
      this.gKl.SetUIActive(false);
      if (i === 1) {
        this.i0o.SetUIActive(false);
        this.Pst.SetUIActive(false);
        this.SetTextureByPath(t, this.gKl, undefined, t => {
          if (t) {
            this.gKl?.SetUIActive(true);
          }
        });
      } else {
        this.i0o.SetUIActive(true);
        this.Pst.SetUIActive(true);
        this.SetTextureByPath(t, this.Ust, undefined, t => {
          if (t) {
            this.Ust?.SetUIActive(true);
          }
        });
      }
    }
  }
  kst(t) {
    if (t !== this.wst) {
      if (t > this.wst && this.wst > 0) {
        this.bnt(5);
      }
      if ((this.wst = t) <= 1) {
        this.Ast.SetText("");
      } else {
        this.Ast.SetText(t.toString());
      }
    }
  }
  Fst(t) {
    if (t !== this.Bst) {
      this.Bst = t;
      this.Pst.SetFillAmount(t);
      this.Hst(t <= FADE_ANIM_PERCENT);
    }
  }
  Hst(t) {
    if (this.Nst !== t) {
      if (this.Nst = t) {
        this.bnt(7);
      } else {
        this.Gnt(7);
        this.GetItem(0)?.SetAlpha(1);
      }
    }
  }
  Vst(t) {
    if (t) {
      this.Pst.SetColor(UE.Color.FromHex(t));
    } else {
      this.qst ||= UE.Color.FromHex("FFFFFF7F");
      this.Pst.SetColor(this.qst);
    }
  }
  yga(t) {
    if (t !== this.Ega) {
      if (this.Ega = t) {
        this.Ust.SetColor(UE.Color.FromHex(t));
      } else {
        this.Ust.SetColor(ColorUtils_1.ColorUtils.ColorWhile);
      }
    }
  }
  Tick(t) {
    if (this.bst) {
      if (this.bst.Duration > 0) {
        this.Fst(this.bst.GetRemainDuration() / this.bst.Duration);
      }
      this.kst(this.bst.StackCount);
    }
  }
  TickHiding(t) {
    return this.Gst > Time_1.Time.Now || (this.Gnt(6), this.SetUiActive(false), false);
  }
  Deactivate() {
    this.Gnt(5);
    this.RootItem?.SetUIItemScale(Vector_1.Vector.OneVector);
    this.Gnt(6);
    this.Hst(false);
    this.SetUiActive(false);
  }
  DeactivateWithCloseAnim() {
    this.Gnt(5);
    this.RootItem?.SetUIItemScale(Vector_1.Vector.OneVector);
    this.Hst(false);
    this.bnt(6);
    this.Gst = Time_1.Time.Now + CLOSE_ANIM_TIME;
  }
  OnBeforeHide() {
    this.Hst(false);
  }
  DestroyOverride() {
    if (this.RootActor) {
      if (this.Ega && this.Ust) {
        this.Ust.SetColor(ColorUtils_1.ColorUtils.ColorWhile);
        this.Ega = undefined;
      }
      BattleUiControl_1.BattleUiControl.Pool.RecycleBuffItem(this.RootActor);
    }
    return true;
  }
  Est(t) {
    var i = [];
    var s = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var h = s.Num();
    for (let t = 0; t < h; t++) {
      i.push(s.Get(t));
    }
    this.Hnt ||= new Map();
    this.Hnt.set(t, i);
  }
  bnt(t) {
    t = this.Hnt?.get(t);
    if (t) {
      for (const i of t) {
        i.Play();
      }
    }
  }
  Gnt(t) {
    t = this.Hnt?.get(t);
    if (t) {
      for (const i of t) {
        i.Stop();
      }
    }
  }
}
exports.BuffItem = BuffItem;
//# sourceMappingURL=BuffItem.js.map