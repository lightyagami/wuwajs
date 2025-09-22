"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekTraceContentPanel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GenericLayout_1 = require("../../../Module/Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Module/Util/LguiUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../Ui/Base/UiSequencePlayer");
const UiLayer_1 = require("../../../Ui/UiLayer");
const SeekTraceGridBackgroundView_1 = require("./SeekTraceGridBackgroundView");
const SeekTraceGridStateView_1 = require("./SeekTraceGridStateView");
const DEFAULT_GRID_SIZE = 5;
const NIAGARA_DURATION = 400;
class SeekTraceContentPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xod = [];
    this.Uod = UE.NewArray(UE.BuiltinInt);
    this.Bod = UE.NewArray(UE.BuiltinInt);
    this.kod = UE.NewArray(UE.BuiltinInt);
    this.Zcd = UE.NewArray(UE.BuiltinInt);
    this.qod = new UE.FName("GridArray");
    this.God = new UE.FName("StateArray");
    this.Vod = undefined;
    this.hql = undefined;
    this.Fod = [5, 6];
    this.Nod = [9, 10];
    this.edd = [5, 6, 9, 10];
    this.Sod = false;
    this.jod = 1;
    this.idd = 0;
    this.Hod = 1;
    this.Qud = false;
    this.Qdd = [-1, -1];
    this.Kud = undefined;
    this.Q_t = Vector2D_1.Vector2D.Create();
    this.LLe = [0, 0];
    this.$od = [0, 0];
    this.rdd = [0, 0];
    this.odd = [0, 0];
    this.Wod = Vector2D_1.Vector2D.Create();
    this.GIl = undefined;
    this.Qod = undefined;
    this.Kod = () => {
      var t = new Map();
      for (const U of this.edd) {
        var i = this.GetUiNiagara(U).NiagaraComponent;
        if (!i) {
          TimerSystem_1.TimerSystem.Next(this.Kod);
          return;
        }
        t.set(U, i);
      }
      var e;
      var s;
      var h = ModelManager_1.ModelManager.SeekTraceModel.PanelWidth;
      var r = h === DEFAULT_GRID_SIZE ? 0 : 1;
      var a = new UE.FName("NiagaraType");
      var o = new UE.FName("XSize");
      var n = new UE.FName("YSize");
      var l = UE.NewArray(UE.BuiltinInt);
      var _ = h * h;
      for (let t = 0; t < _; t++) {
        this.kod.Add(0);
        this.Zcd.Add(0);
        l.Add(3);
      }
      for ([e, s] of t) {
        s.SetIntParameter(a, r);
        s.SetIntParameter(o, h);
        s.SetIntParameter(n, h);
        switch (e) {
          case 5:
          case 6:
            UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(s, this.qod, this.Uod);
            UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(s, this.God, this.Bod);
            break;
          case 9:
          case 10:
            UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(s, this.qod, this.Zcd);
            UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(s, this.God, l);
        }
      }
    };
    this.Xud = t => {
      if (t === "Move") {
        this.Yud();
      }
    };
    this.ndd = t => {
      var i;
      var e;
      var s;
      var h;
      var r;
      var a;
      if (!!t && !(a = ModelManager_1.ModelManager.SeekTraceModel).SelectedItem) {
        if (this.Sod && (i = this.Q_t, LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t.pointerPosition, i), t = i.X / this.Hod + this.jod, e = -i.Y / this.Hod + this.jod, (s = this.LLe)[0] = Math.ceil(t), s[1] = Math.ceil(e), ControllerHolder_1.ControllerHolder.SeekTraceController.SelectItem(s))) {
          h = s[0];
          r = s[1];
          this.rdd[0] = h;
          this.rdd[1] = r;
          a = a.SelectedItem.BasePosition;
          this.$od[0] = h - a[0];
          this.$od[1] = r - a[1];
          this.Wod.X = -(t - s[0] + 0.5) * this.Hod;
          this.Wod.Y = (e - s[1] + 0.5) * this.Hod;
          this.ind(true);
          this.sdd(i, true);
          this.GIl?.();
        }
      }
    };
    this.vKe = t => {
      var i;
      if (t && ModelManager_1.ModelManager.SeekTraceModel.SelectedItem) {
        i = this.Q_t;
        LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t.pointerPosition, i);
        (t = this.LLe)[0] = Math.ceil(i.X / this.Hod + this.jod) - this.$od[0];
        t[1] = Math.ceil(-i.Y / this.Hod + this.jod) - this.$od[1];
        ControllerHolder_1.ControllerHolder.SeekTraceController.MoveSelectedItem(t);
        this.V7e();
        this.sdd(i, false);
      }
    };
    this.hdd = t => {
      this.zod(false, false);
    };
    this.Jod = () => {
      return new SeekTraceGridStateView_1.SeekTraceGridStateView();
    };
    this.Zod = () => {
      return new SeekTraceGridBackgroundView_1.SeekTraceGridBackgroundView();
    };
  }
  SetItemCallback(t, i) {
    this.GIl = t;
    this.Qod = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout], [1, UE.UIItem], [2, UE.UIGridLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UINiagara], [6, UE.UINiagara], [7, UE.UIDraggableComponent], [8, UE.UIItem], [9, UE.UINiagara], [10, UE.UINiagara], [11, UE.UIItem], [12, UE.UINiagara], [13, UE.UINiagara], [14, UE.UINiagara]];
  }
  async OnBeforeStartAsync() {
    var t = ModelManager_1.ModelManager.SeekTraceModel.PanelWidth;
    var i = t * t;
    for (let t = 0; t < i; t++) {
      this.Uod.Add(0);
      this.Bod.Add(0);
    }
    this.tnd();
    this.Vod = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.Zod, this.GetItem(1).GetOwner());
    await this.Vod.RefreshByDataAsync(ModelManager_1.ModelManager.SeekTraceModel.EnableGridList);
    this.hql = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.Jod, this.GetItem(3).GetOwner());
    await this.hql.RefreshByDataAsync(this.xod);
  }
  OnStart() {
    var t;
    var i = ModelManager_1.ModelManager.SeekTraceModel.PanelWidth;
    if (i === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 48, "SeekTrace初始化时面板大小为0");
      }
    } else {
      t = this.GetGridLayout(0).RootUIComp.Width;
      this.Hod = t / i;
      this.jod = i / 2 - 1;
      this.idd = this.jod + 0.5;
      (t = this.GetDraggable(7)).OnPointerBeginDragCallBack.Bind(this.ndd);
      t.OnPointerDragCallBack.Bind(this.vKe);
      t.OnPointerEndDragCallBack.Bind(this.hdd);
      t.OnPointerDownCallBack.Bind(this.ndd);
      t.OnPointerCancelCallBack.Bind(this.hdd);
      t.OnPointerUpCallBack.Bind(this.hdd);
      this.GetItem(4).SetUIActive(true);
      this.GetItem(8).SetUIActive(true);
      this.Yud();
      this.Kod();
    }
  }
  OnBeforeShow() {
    this.ldd(12, NIAGARA_DURATION);
  }
  OnBeforeDestroy() {
    var t = this.GetDraggable(7);
    t.OnPointerBeginDragCallBack.Unbind();
    t.OnPointerDragCallBack.Unbind();
    t.OnPointerEndDragCallBack.Unbind();
    t.OnPointerDownCallBack.Unbind();
    t.OnPointerCancelCallBack.Unbind();
    t.OnPointerUpCallBack.Unbind();
  }
  SetInteractEnable(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelPlay", 48, "寻痕玩法设置可否交互", ["Enable", t]);
    }
    this.Sod = t;
  }
  ResetView() {
    this.ind(false);
    this.ldd(13, NIAGARA_DURATION, () => {
      for (const i of this.Fod) {
        var t = this.GetUiNiagara(i).NiagaraComponent;
        UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(t, this.qod, this.Zcd);
      }
    }, () => {
      this.V7e();
      this.ldd(12, NIAGARA_DURATION);
    });
  }
  OnInputControllerChange() {
    if (ModelManager_1.ModelManager.SeekTraceModel.SelectedItem) {
      this.zod(true, Info_1.Info.IsInGamepad());
    }
    this.Yud();
  }
  OnSeekTraceSucceed() {
    this.ldd(14, NIAGARA_DURATION);
  }
  Yud() {
    var t = Info_1.Info.IsInTouch();
    var i = !t;
    this.Qud = i;
    var e = this.GetItem(11);
    e.SetUIActive(i);
    if (t) {
      this.Kud?.Clear();
      this.Kud = undefined;
    } else {
      if (!this.Kud) {
        this.Kud = new UiSequencePlayer_1.UiSequencePlayer(e);
        this.Kud.BindOnEndSequenceEvent(this.Xud);
      }
      this.odd[0] = 0;
      this.odd[1] = 0;
      this._dd(0, 0);
    }
  }
  UpdateKeyBoardSelectFrame() {
    var t;
    var i;
    var e;
    var s;
    if (!!Info_1.Info.IsInKeyBoard() && !(s = ModelManager_1.ModelManager.SeekTraceModel).SelectedItem) {
      if ((t = Global_1.Global.CharacterController) && (t = t.GetCursorPosition())) {
        i = this.Q_t;
        LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t.ToUeVector2D(), i);
        t = Math.ceil(i.X / this.Hod + this.jod);
        i = Math.ceil(-i.Y / this.Hod + this.jod);
        e = s.PanelWidth;
        s = s.PanelHeight;
        if (!(t < 0) && !(e <= t) && !(i < 0) && !(s <= i)) {
          this._dd(t, i);
        }
      }
    }
  }
  _dd(t, i) {
    var e;
    if (t !== this.Qdd[0] || i !== this.Qdd[1]) {
      this.Kud?.StopPrevSequence(false, true);
      this.Kud?.PlaySequencePurely("Float");
      this.Qdd[0] = t;
      this.Qdd[1] = i;
      (e = this.Q_t).X = (t - this.idd) * this.Hod;
      e.Y = -(i - this.idd) * this.Hod;
      this.GetItem(11).SetAnchorOffset(e.ToUeVector2D());
    }
  }
  Lud() {
    if (this.Qud && !ModelManager_1.ModelManager.SeekTraceModel.SelectedItem) {
      this.Kud.StopPrevSequence(false, true);
      this.Kud.PlaySequencePurely("Move");
    }
  }
  GamePadMovePosition(t, i) {
    var e = ModelManager_1.ModelManager.SeekTraceModel;
    var s = this.odd;
    var t = (s[0] + t + e.PanelWidth) % e.PanelWidth;
    var s = (s[1] + i + e.PanelHeight) % e.PanelHeight;
    this.udd(t, s);
  }
  udd(t, i) {
    var e = this.odd;
    e[0] = t;
    e[1] = i;
    this._dd(t, i);
    var e = ModelManager_1.ModelManager.SeekTraceModel;
    if (e.SelectedItem) {
      this.cdd();
    }
  }
  cdd() {
    var t;
    var i;
    var e;
    if (ModelManager_1.ModelManager.SeekTraceModel.SelectedItem) {
      t = this.odd[0];
      i = this.odd[1];
      (e = this.Q_t).X = (t - this.idd - this.rdd[0]) * this.Hod;
      e.Y = -(i - this.idd - this.rdd[1]) * this.Hod;
      this.GetItem(8).SetAnchorOffset(e.ToUeVector2D());
      (e = this.LLe)[0] = t - this.$od[0];
      e[1] = i - this.$od[1];
      ControllerHolder_1.ControllerHolder.SeekTraceController.MoveSelectedItem(e);
      this.V7e();
    }
  }
  GamePadSelectItem() {
    var t;
    var i;
    var e;
    if (this.Sod) {
      if ((t = ModelManager_1.ModelManager.SeekTraceModel).SelectedItem) {
        this.zod(false, true);
      } else if (ControllerHolder_1.ControllerHolder.SeekTraceController.SelectItem(this.odd)) {
        e = this.odd;
        t = t.SelectedItem.BasePosition;
        i = e[0];
        e = e[1];
        this.rdd[0] = i;
        this.rdd[1] = e;
        this.$od[0] = i - t[0];
        this.$od[1] = e - t[1];
        this.cdd();
        this.ind(true);
        this.Kud.StopPrevSequence(false, true);
        this.Kud.PlaySequencePurely("Sle");
        this.GIl?.();
      }
    }
  }
  GamePadResetItem() {
    this.zod(true, true);
  }
  zod(t, i) {
    var e = ModelManager_1.ModelManager.SeekTraceModel.SelectedItem;
    if (e) {
      var s = e.FilledIndexSet.size;
      var t = t ? undefined : ControllerHolder_1.ControllerHolder.SeekTraceController.PlaceSelectedItem();
      if (t === 0) {
        var h = e.FilledIndexSet;
        if (s !== h.size) {
          var r = e.ItemType;
          var a = this.Uod.Num();
          for (let t = 0; t < a; t++) {
            this.Uod.Set(t, h.has(t) ? r : 0);
          }
          this.ldd(12, NIAGARA_DURATION);
          AudioSystem_1.AudioSystem.PostEvent("play_ui_seektrace_gem_moved");
        }
      } else {
        s = ModelManager_1.ModelManager.SeekTraceModel.SelectedStartPosition;
        ControllerHolder_1.ControllerHolder.SeekTraceController.MoveSelectedItem(s);
        ControllerHolder_1.ControllerHolder.SeekTraceController.PlaceSelectedItem();
        if (t === 2) {
          this.Lud();
        }
        if (i) {
          this.udd(this.rdd[0], this.rdd[1]);
        }
      }
      e = this.Qdd;
      e[0] = -1;
      e[1] = -1;
      this.V7e();
      this.ind(false);
      this.Qod?.();
    }
  }
  ind(t) {
    if (t) {
      var i = ModelManager_1.ModelManager.SeekTraceModel.SelectedItem;
      var e = i.ItemType;
      var s = i.FilledIndexSet;
      for (let t = 0; t < this.kod.Num(); t++) {
        var h = s.has(t) ? e : 0;
        this.kod.Set(t, h);
      }
    }
    var r = t ? this.kod : this.Zcd;
    for (const o of this.Nod) {
      var a = this.GetUiNiagara(o).NiagaraComponent;
      UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(a, this.qod, r);
    }
  }
  sdd(t, i) {
    t.AdditionEqual(this.Wod);
    var e = (UiLayer_1.UiLayer.UiRootItem.GetWidth() - this.Hod) / 2;
    var s = (UiLayer_1.UiLayer.UiRootItem.GetHeight() - this.Hod) / 2;
    var h = this.rdd[0] * this.Hod;
    var r = this.rdd[1] * this.Hod;
    t.X = MathUtils_1.MathUtils.Clamp(t.X, -e, e);
    t.Y = MathUtils_1.MathUtils.Clamp(t.Y, -s, s);
    if (this.Qud && (this.GetItem(11).SetAnchorOffset(t.ToUeVector2D()), i)) {
      this.Kud.StopPrevSequence(false, true);
      this.Kud.PlaySequencePurely("Sle");
    }
    t.X -= h;
    t.Y += r;
    this.GetItem(8).SetAnchorOffset(t.ToUeVector2D());
  }
  V7e() {
    this.tnd();
    for (const i of this.Fod) {
      var t = this.GetUiNiagara(i).NiagaraComponent;
      UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(t, this.qod, this.Uod);
      UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(t, this.God, this.Bod);
    }
    this.hql?.RefreshByData(this.xod);
  }
  tnd() {
    var i = this.xod;
    var e = this.Uod;
    var s = this.Bod;
    var h = new Set();
    var r = ModelManager_1.ModelManager.SeekTraceModel;
    var t = r.MainItemMap;
    var a = r.SelectedItem;
    for (const I of r.ItemDataList) {
      if (I.IsValid && I !== a) {
        var o = I.ItemType;
        var n = t.get(o);
        var l = o;
        var _ = !n || n === I ? 2 : 1;
        for (const w of I.FilledIndexSet) {
          i[w] = 0;
          e.Set(w, l);
          s.Set(w, _);
          h.add(w);
        }
      }
    }
    var U = r.EnableGridList;
    if (a) {
      var d = r.SelectedStartFilledIndexSet;
      for (const G of d) {
        i[G] = 0;
        e.Set(G, a.ItemType);
        s.Set(G, 0);
        h.add(G);
      }
      var v = a.BasePosition;
      var c = r.SelectedStartPosition;
      if (v[0] !== c[0] || v[1] !== c[1]) {
        let t = 0;
        var M = ControllerHolder_1.ControllerHolder.SeekTraceController.CheckCanPlaceSelectedItem() === 0;
        t = M ? 2 : 3;
        var f = r.PanelWidth;
        var u = r.PanelHeight;
        var E = r.IndexToItemMap;
        var S = r.PreSelectedIndexToItemsMap;
        var g = a.ItemType;
        var m = new Set();
        for (const T of a.FilledIndexSet) {
          var y = T % f;
          var A = Math.floor(T / f);
          if (!(y < 0) && !(f <= y) && !(A < 0) && !(u <= A)) {
            if (E.get(T)) {
              i[T] = 3;
            } else if (d.has(T)) {
              i[T] = t;
            } else {
              i[T] = U[T] ? t : 0;
              e.Set(T, 0);
              s.Set(T, 2);
              h.add(T);
            }
            if (M) {
              y = S.get(T);
              if (y) {
                for (const C of y) {
                  if (C !== a && C.IsValid && C.ItemType === g) {
                    m.add(C);
                  }
                }
              }
            }
          }
        }
        for (const p of m) {
          for (const L of p.FilledIndexSet) {
            s.Set(L, 3);
          }
        }
      }
    }
    for (let t = 0; t < U.length; t++) {
      if (!h.has(t)) {
        i[t] = 0;
        e.Set(t, 0);
        s.Set(t, 2);
      }
    }
  }
  ldd(t, i, e, s) {
    this.GetUiNiagara(t).SetUIActive(true);
    this.ddd(t, () => {
      e?.();
      if (s) {
        TimerSystem_1.TimerSystem.Delay(s, i);
      }
    });
  }
  ddd(t, i) {
    var e;
    var s;
    var h;
    var r;
    var a;
    var o;
    if (t !== 12 && t !== 13 && t !== 14) {
      i();
    } else if (e = this.GetUiNiagara(t).NiagaraComponent) {
      e.ResetOverrideParametersAndActivate();
      h = (s = ModelManager_1.ModelManager.SeekTraceModel.PanelWidth) === DEFAULT_GRID_SIZE ? 0 : 1;
      r = new UE.FName("NiagaraType");
      a = new UE.FName("XSize");
      o = new UE.FName("YSize");
      e.SetIntParameter(r, h);
      e.SetIntParameter(a, s);
      e.SetIntParameter(o, s);
      UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(e, this.qod, this.Uod);
      i();
    } else {
      TimerSystem_1.TimerSystem.Next(() => {
        this.ddd(t, i);
      });
    }
  }
}
exports.SeekTraceContentPanel = SeekTraceContentPanel;
//# sourceMappingURL=SeekTraceContentPanel.js.map