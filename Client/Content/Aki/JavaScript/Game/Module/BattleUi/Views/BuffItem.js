"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffItem = undefined;
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const BattleUiControl_1 = require("../BattleUiControl");
const CLOSE_ANIM_TIME = 200;
const FADE_ANIM_PERCENT = 0.2;
const BUFF = "1";
const DEBUFF = "2";
class BuffItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.Hnt = undefined;
    this.Ust = undefined;
    this.gKl = undefined;
    this.Ast = undefined;
    this.Pst = undefined;
    this.i0o = undefined;
    this.g4u = undefined;
    this.C4u = undefined;
    this.p4u = undefined;
    this.kmd = undefined;
    this.Omd = false;
    this.xst = "";
    this.fKl = 0;
    this.v4u = false;
    this.wst = 0;
    this.Bst = -0;
    this.bst = undefined;
    this.qst = undefined;
    this.Ega = undefined;
    this.Gst = 0;
    this.Nst = false;
    i = BattleUiControl_1.BattleUiControl.Pool.GetBuffItem(i);
    this.CreateThenShowByActor(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [3, UE.UIText], [2, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UITexture], [12, UE.UISprite], [11, UE.UISprite], [13, UE.UIItem], [14, UE.UIItem]];
  }
  OnStart() {
    this.Ust = this.GetTexture(1);
    this.gKl = this.GetTexture(10);
    this.Ast = this.GetText(3);
    this.Pst = this.GetSprite(2);
    this.i0o = this.GetSprite(9);
    this.g4u = this.GetSprite(12);
    this.C4u = this.GetSprite(11);
    this.kmd = this.GetItem(14);
    this.Est(5);
    this.Est(6);
    this.Est(7);
    this.Est(13);
  }
  Activate(i, t, s = false, h = 0) {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      this.RootActor?.SetActorLabel("buffItem_" + i.Id);
    }
    this.bst = t;
    var e = i.Parameters.length;
    let o = 0;
    if (e > 3 && i.Parameters[3] !== "") {
      o = Number(i.Parameters[3]);
    }
    this.Ost(i.Path, o, t === undefined);
    if (t) {
      this.SetNum(t.StackCount);
      if (t.Duration <= 0 || this.Omd) {
        this.Fst(1);
      } else {
        this.Fst(t.GetRemainDuration() / t.Duration);
      }
    } else {
      if (h > 1) {
        this.SetNum(h);
      } else {
        this.SetNum(1);
      }
      this.Fst(1);
    }
    let r = undefined;
    if (e > 0) {
      r = i.Parameters[0];
    }
    this.GetSprite(8)?.SetUIActive(r === BUFF);
    this.GetSprite(4)?.SetUIActive(r === DEBUFF);
    if (e > 1 && i.Parameters[1] !== "") {
      this.Vst(i.Parameters[1]);
    } else {
      this.Vst();
    }
    if (e > 2 && i.Parameters[2] !== "") {
      this.yga(i.Parameters[2]);
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
  ActivateExceedTip() {
    this.Ust.SetUIActive(false);
    this.gKl.SetUIActive(false);
    this.Ast.SetText("");
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_IconpropertyEllipses_UI");
    this.Ost(i, -1, false);
    this.p4u?.SetFillAmount(0);
  }
  Ost(i, t, s) {
    var h;
    if (this.xst !== i || this.fKl !== t || this.v4u !== s) {
      this.xst = i;
      this.fKl = t;
      this.v4u = s;
      h = t === 3 || t === 4;
      this.Omd = t === 2 || t === 4;
      this.kmd.SetUIActive(h);
      this.Ust.SetUIActive(false);
      this.gKl.SetUIActive(false);
      if (t === 1) {
        this.i0o.SetUIActive(false);
        this.Pst.SetUIActive(false);
        this.C4u.SetUIActive(false);
        this.g4u.SetUIActive(false);
        this.SetTextureByPath(i, this.gKl, undefined, i => {
          if (i) {
            this.gKl?.SetUIActive(true);
          }
        });
      } else {
        t = h;
        this.i0o.SetUIActive(!s && !t);
        this.Pst.SetUIActive(!s);
        this.C4u.SetUIActive(s && !t);
        this.g4u.SetUIActive(s);
        this.SetTextureByPath(i, this.Ust, undefined, i => {
          if (i) {
            this.Ust?.SetUIActive(true);
          }
        });
        this.p4u = s ? this.g4u : this.Pst;
        this.Bst = -1;
      }
    }
  }
  SetNum(i) {
    if (i !== this.wst) {
      if (i > this.wst && this.wst > 0) {
        this.bnt(5);
      }
      if ((this.wst = i) <= 1) {
        this.Ast.SetText("");
      } else {
        this.Ast.SetText(i.toString());
      }
    }
  }
  Fst(i) {
    if (i !== this.Bst) {
      this.Bst = i;
      this.p4u?.SetFillAmount(i);
      this.Hst(i <= FADE_ANIM_PERCENT);
    }
  }
  Hst(i) {
    if (this.Nst !== i) {
      if (this.Nst = i) {
        this.bnt(7);
      } else {
        this.Gnt(7);
        this.GetItem(0)?.SetAlpha(1);
      }
    }
  }
  Vst(i) {
    if (i) {
      this.p4u?.SetColor(UE.Color.FromHex(i));
    } else {
      this.qst ||= UE.Color.FromHex("FFFFFF7F");
      this.p4u?.SetColor(this.qst);
    }
  }
  yga(i) {
    if (i !== this.Ega) {
      if (this.Ega = i) {
        this.Ust.SetColor(UE.Color.FromHex(i));
      } else {
        this.Ust.SetColor(ColorUtils_1.ColorUtils.ColorWhile);
      }
    }
  }
  Tick(i) {
    if (this.bst) {
      if (this.bst.Duration > 0 && !this.Omd) {
        this.Fst(this.bst.GetRemainDuration() / this.bst.Duration);
      }
      this.SetNum(this.bst.StackCount);
    }
  }
  TickHiding(i) {
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
  PlayAddBuffAnim() {
    this.bnt(13);
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
  Est(i) {
    var t = [];
    var s = this.GetItem(i).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var h = s.Num();
    for (let i = 0; i < h; i++) {
      t.push(s.Get(i));
    }
    this.Hnt ||= new Map();
    this.Hnt.set(i, t);
  }
  bnt(i) {
    i = this.Hnt?.get(i);
    if (i) {
      for (const t of i) {
        t.Play();
      }
    }
  }
  Gnt(i) {
    i = this.Hnt?.get(i);
    if (i) {
      for (const t of i) {
        t.Stop();
      }
    }
  }
}
exports.BuffItem = BuffItem;
//# sourceMappingURL=BuffItem.js.map