"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AstrologyItemInspectView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../../Module/ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../../../Module/Util/LguiUtil");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const ItemInspectViewBase_1 = require("../ItemInspectViewBase");
const AstrologyDotView_1 = require("./AstrologyDotView");
const AstrologyLineView_1 = require("./AstrologyLineView");
const AstrologyPointView_1 = require("./AstrologyPointView");
const NEXT_PAGE_DELAY_TIME = 100;
const DEFAULT_TIP_SCROLL_HEIGHT = 174;
const DEFAULT_DELAY_CHAR_NUM = 25;
class AstrologyItemInspectView extends ItemInspectViewBase_1.ItemInspectViewBase {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
    this._zu = [];
    this.uzu = [];
    this.Ead = [];
    this.czu = false;
    this.Iad = new Set();
    this.Tad = new Set();
    this.mzu = (0, puerts_1.$ref)(undefined);
    this.fzu = (0, puerts_1.$ref)(undefined);
    this.gzu = (0, puerts_1.$ref)(undefined);
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.Czu = Vector2D_1.Vector2D.Create();
    this.A$e = Vector2D_1.Vector2D.Create(1, -1);
    this.ZWc = Vector2D_1.Vector2D.Create();
    this.ZZu = false;
    this.X7c = 0;
    this.Y7c = 0;
    this.z7c = undefined;
    this.J7c = undefined;
    this.pzu = [];
    this.vzu = undefined;
    this.bad = false;
    this.$_d = false;
    this.NMd = "";
    this.VMd = false;
    this.X9d = undefined;
    this.Rad = () => {
      this.eQc(false);
      this.GetButton(12).RootUIComp.SetUIActive(false);
    };
    this.xzu = t => {
      this.R_d(false);
      ControllerHolder_1.ControllerHolder.ItemInspectController.InteractPoint(t, () => {
        this.Mzu();
      });
    };
    this.w_d = () => this.bad;
    this.Ezu = () => {
      this.CloseMe();
      ControllerHolder_1.ControllerHolder.ItemInspectController.FinishItemInspect(true);
    };
    this.Izu = () => {
      if (this.ZZu || this.J7c.GetSelectorOffset() === 0) {
        this.Tzu();
      } else {
        this.Z7c();
      }
    };
    this.jtu = () => {
      if (this.bad) {
        this.R_d(false);
        ControllerHolder_1.ControllerHolder.ItemInspectController.ResetItemRotation(() => {
          this.R_d(true);
        });
      }
    };
    this.jMd = () => {
      var t;
      if (ModelManager_1.ModelManager.ItemInspectModel.CloseSkipConfirmBox) {
        this.Ezu();
      } else {
        this.VMd = false;
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(369)).HasToggle = true;
        t.ToggleText = this.NMd;
        t.SetToggleFunction(this.HMd);
        t.FunctionMap.set(2, () => {
          ModelManager_1.ModelManager.ItemInspectModel.CloseSkipConfirmBox = this.VMd;
          this.Ezu();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
    this.HMd = t => {
      this.VMd = t;
    };
    this.Fbn = 0;
    this.Vbn = 0;
    this.Hbn = undefined;
    this.jbn = undefined;
    this.ojc = () => {
      this.Kbn();
      var e = this.GetScrollView(17);
      if (e) {
        var h = this.GetText(15);
        var r = h.GetTextRenderSize().Y;
        var e = e.GetRootComponent();
        if (r <= this.Y7c) {
          e.SetHeight(this.Y7c);
        } else {
          var o = h.GetRenderLineNum();
          var _ = h.GetFontSpaceFinal().Y;
          if (o <= 6) {
            e.SetHeight(r + _);
          } else {
            let i = 0;
            for (let t = 1; t <= 6; t++) {
              i += h.GetRenderLineHeight(t) + _;
            }
            e.SetHeight(i);
            r = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedSeq;
            let t = CommonParamById_1.configCommonParamById.GetIntConfig("PlotAutoScrollDelayCharNum") ?? DEFAULT_DELAY_CHAR_NUM;
            var e = h.GetDisplayCharLength();
            var a = (t = e <= t ? h.GetRenderLineCharNum(0) : t) / r * MathUtils_1.MathUtils.SecondToMillisecond;
            var e = e - t;
            let s = e;
            if (o > 1) {
              s = e - h.GetRenderLineCharNum(0);
            }
            this.Fbn = s / r * MathUtils_1.MathUtils.SecondToMillisecond;
            this.jbn = TimerSystem_1.TimerSystem.Delay(this.Xbn, a);
          }
        }
      }
    };
    this.Xbn = () => {
      this.Vbn = 0;
      this.Hbn = TimerSystem_1.TimerSystem.Forever(() => {
        var t = this.Vbn / this.Fbn;
        this.GetScrollView(17)?.SetScrollProgress(t);
        if (t >= 1 && TimerSystem_1.TimerSystem.Has(this.Hbn)) {
          TimerSystem_1.TimerSystem.Remove(this.Hbn);
        }
        this.Vbn += 100;
      }, 100);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [10, UE.UIText], [9, UE.UIText], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIText], [16, UE.UIText], [17, UE.UIScrollViewComponent], [18, UE.UIButtonComponent], [19, UE.UIButtonComponent], [20, UE.UIItem], [22, UE.UIItem], [21, UE.UIItem], [23, UE.UIText], [24, UE.UIText]];
    this.BtnBindInfo = [[12, this.Ezu], [14, this.Izu], [18, this.jtu], [19, this.jMd]];
  }
  async OnBeforeStartAsync() {
    var t = [this.GetItem(1), this.GetItem(2), this.GetItem(3), this.GetItem(4)];
    var i = this.GetItem(7);
    var s = this.GetItem(8);
    s.SetUIActive(false);
    var e = this.GetItem(5);
    var h = this.GetItem(6);
    h.SetUIActive(false);
    var r = [];
    for (const a of t) {
      var o = new AstrologyPointView_1.AstrologyPointView();
      o.Init(this.Rad, this.xzu, this.w_d);
      this._zu.push(o);
      r.push(o.CreateByActorAsync(a.GetOwner()));
      var o = LguiUtil_1.LguiUtil.CopyItem(s, i);
      var _ = new AstrologyLineView_1.AstrologyLineView();
      this.Ead.push(_);
      r.push(_.CreateByActorAsync(o.GetOwner()));
      var _ = LguiUtil_1.LguiUtil.CopyItem(h, e);
      var o = new AstrologyDotView_1.AstrologyDotView();
      this.uzu.push(o);
      r.push(o.CreateByActorAsync(_.GetOwner()));
    }
    await Promise.all(r);
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.NMd = ConfigManager_1.ConfigManager.TextConfig?.GetTextById("PlotSkipConfirmToggle") ?? "";
    this.InitDrag(this.GetDraggable(0));
    this.Mzu();
    var t = this.OpenParam;
    var i = t.ProgressTipText;
    if (i) {
      this.GetText(16).SetText(this.iIr(i));
    }
    var i = t.FinishText;
    if (i) {
      this.GetText(23).SetText(this.iIr(i));
    }
    var i = t.SkipText;
    if (i) {
      this.GetText(24).SetText(this.iIr(i));
    }
    this.GetItem(22).SetUIActive(false);
    this.GetItem(21).SetUIActive(false);
    this.z7c = this.GetText(15).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.J7c = this.GetText(15).GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass());
    var i = this.GetScrollView(17);
    i?.SetCanScroll(false);
    i?.SetRayCastTargetForScrollView(false);
    this.Y7c = i?.GetRootComponent()?.GetHeight() ?? DEFAULT_TIP_SCROLL_HEIGHT;
    var i = () => {
      this.R_d(true);
    };
    var t = t.InitDialogues;
    if (t && t.length > 0) {
      this.R_d(false);
      this.Rzu(t, i);
    } else {
      i();
    }
  }
  OnBeforeDestroy() {
    this.ClearDrag();
    this.Kbn();
    this.X9d?.Remove();
    this.X9d = undefined;
  }
  OnTick(t) {
    super.OnTick(t);
    if (this.czu) {
      var i = Global_1.Global.CharacterController;
      if (i) {
        var s;
        var e;
        var h;
        var r;
        var o;
        var _;
        var t = this.RootItem.GetWidth();
        var a = this.RootItem.GetHeight();
        this.ZWc.Set(-t * 0.5, -a * 0.5);
        i.GetViewportSize(this.mzu, this.fzu);
        var l = (0, puerts_1.$unref)(this.mzu);
        var n = l / 2;
        var u = (0, puerts_1.$unref)(this.fzu);
        var m = u / 2;
        var U = t / l;
        var g = a / u;
        for (const d of ModelManager_1.ModelManager.ItemInspectModel.VisiblePoints) {
          if (!d.IsChecked) {
            e = d.Location;
            if (UE.GameplayStatics.D_ProjectWorldToScreen(i, e.ToUeVector(), this.gzu) && (s = (e = (0, puerts_1.$unref)(this.gzu)).X, e = e.Y, h = this.wzu(n, m, s, e), !this.Tad.has(h)) && (r = d.TagId, o = this.wad(r))) {
              (_ = this.Czu).Set(s * U, e * g);
              _.AdditionEqual(this.ZWc).MultiplyEqual(this.A$e);
              this.Lad(o, h, _, r, d.IsChecked);
              this.Tad.add(h);
              this.Iad.add(r);
            }
          }
        }
        for (let t = 0; t < this._zu.length; t++) {
          if (!this.Tad.has(t)) {
            this._zu[t].SetPointActive(false);
            this.Ead[t].SetLineActive(false);
          }
          var v = this.uzu[t];
          var E = v.GetPointTagId();
          if (E !== undefined && !this.Iad.has(E)) {
            v.SetDotActive(false);
          }
        }
        this.Tad.clear();
        this.Iad.clear();
      }
    }
  }
  wad(t) {
    let i = undefined;
    for (const e of this.uzu) {
      var s = e.GetPointTagId();
      if (s === t) {
        return e;
      }
      if (s === undefined) {
        i = e;
      }
    }
    return i;
  }
  wzu(t, i, s, e) {
    if (t < s) {
      if (i < e) {
        return 3;
      } else {
        return 1;
      }
    } else if (i < e) {
      return 2;
    } else {
      return 0;
    }
  }
  Lad(t, i, s, e, h) {
    var r = this._zu[i];
    r.BindPoint(e, h);
    t.SetChecked(h);
    var h = t.GetRootItem();
    h.SetAnchorOffset(s.ToUeVector2D());
    t.SetDotActive(true, e);
    var s = this.Ead[i];
    var t = s.GetRootItem();
    var e = h.Width / 2;
    var i = h.GetUIWorldPosition();
    this.cz.FromUeVector(i);
    var h = r.GetRootItem();
    var o = h.Width / 2;
    var h = h.GetUIWorldPosition();
    this.fz.FromUeVector(h);
    this.fz.SubtractionEqual(this.cz);
    var h = this.fz.Size() - o - e;
    var o = t.Width;
    if (o > 0) {
      this.cz.Set(h / o, 1, 0);
      t.SetUIItemScale(this.cz.ToUeVectorOld());
    }
    this.cz.Reset();
    this.cz.X = this.fz.X;
    this.cz.Y = this.fz.Z;
    this.cie.Set(0, MathUtils_1.MathUtils.GetAngleByVector2D(this.cz), 0);
    t.SetUIRelativeRotation(this.cie.ToUeRotator());
    this.cz.FromUeVector(i);
    this.fz.Normalize();
    this.fz.MultiplyEqual(h / 2 + e);
    this.cz.AdditionEqual(this.fz);
    t.SetUIWorldLocation(this.cz.ToUeVectorOld());
    var o = !this.IsInteractingItem();
    s.SetLineActive(o);
    r.SetPointActive(o);
  }
  R_d(t) {
    this.eQc(t);
    if (!(this.czu = t)) {
      for (let t = 0; t < this._zu.length; t++) {
        this.uzu[t].SetDotActive(false);
        this._zu[t].SetPointActive(false);
        this.Ead[t].SetLineActive(false);
      }
    }
  }
  eQc(t) {
    this.bad = t;
    this.SetInputEnable(t);
    this.GetItem(20).SetUIActive(t);
  }
  Mzu() {
    var t = ModelManager_1.ModelManager.ItemInspectModel.GetMaxValidPointCount();
    this.GetText(10).SetText("/" + t);
    var i = ModelManager_1.ModelManager.ItemInspectModel.GetCheckedValidPointCount();
    this.GetText(9).SetText(i.toString());
    var t = t <= i;
    this.GetItem(11).SetUIActive(t);
    this.GetButton(18).RootUIComp.SetUIActive(!t);
    this.R_d(!t);
    if (t) {
      this.$pt.PlaySequencePurely("Start");
      ControllerHolder_1.ControllerHolder.ItemInspectController.ResetItemRotation(() => {
        ControllerHolder_1.ControllerHolder.ItemInspectController.PlayFinishEffect(() => {
          this.GetButton(12).RootUIComp.SetUIActive(true);
        });
      });
    } else {
      this.GetButton(12).RootUIComp.SetUIActive(false);
    }
  }
  ExecuteTriggerDialogues(t, i) {
    this.Rzu(t, i);
  }
  Rzu(t, i) {
    if (t.length <= 0 || this.$_d) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 48, "物品检视，对话框效果无对话或重复执行");
      }
      i();
    } else {
      this.$_d = true;
      for (const s of t) {
        this.pzu.push(s);
      }
      this.vzu = i;
      this.GetItem(13).SetUIActive(true);
      this.Tzu();
    }
  }
  Tzu() {
    var t;
    var i;
    if (!(this.X7c > TimeUtil_1.TimeUtil.GetServerTimeStamp())) {
      if (t = this.pzu.pop()) {
        this.ZZu = false;
        (i = this.GetText(15)).SetGameRichText(true);
        i.SetText(this.iIr(t));
        t = i.GetDisplayCharLength();
        if (this.z7c) {
          i = t / ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedSeq;
          this.J7c.SetSelectorOffset(1);
          this.z7c.GetPlayTween().duration = i;
          this.z7c.Play();
          this.GetItem(22).SetUIActive(false);
          this.GetItem(21).SetUIActive(true);
          this.X9d?.Remove();
          this.X9d = TimerSystem_1.TimerSystem.Delay(() => {
            this.GetItem(22).SetUIActive(true);
            this.GetItem(21).SetUIActive(false);
            this.X9d = undefined;
          }, i * MathUtils_1.MathUtils.SecondToMillisecond);
        }
        TimerSystem_1.TimerSystem.Next(this.ojc);
      } else {
        this.Pzu();
      }
    }
  }
  Z7c() {
    this.Kbn();
    this.z7c.Stop();
    this.J7c.SetSelectorOffset(0);
    this.X7c = TimeUtil_1.TimeUtil.GetServerTimeStamp() + NEXT_PAGE_DELAY_TIME;
    this.ZZu = true;
    this.GetItem(22).SetUIActive(true);
    this.GetItem(21).SetUIActive(false);
    this.X9d?.Remove();
    this.X9d = undefined;
  }
  Pzu() {
    this.GetItem(22).SetUIActive(false);
    this.GetItem(21).SetUIActive(false);
    this.GetItem(13).SetUIActive(false);
    this.pzu.length = 0;
    this.vzu?.();
    this.vzu = undefined;
    this.$_d = false;
  }
  Kbn() {
    if (TimerSystem_1.TimerSystem.Has(this.Hbn)) {
      TimerSystem_1.TimerSystem.Remove(this.Hbn);
    }
    if (TimerSystem_1.TimerSystem.Has(this.jbn)) {
      TimerSystem_1.TimerSystem.Remove(this.jbn);
    }
  }
  iIr(t) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? "";
  }
}
exports.AstrologyItemInspectView = AstrologyItemInspectView;
//# sourceMappingURL=AstrologyItemInspectView.js.map