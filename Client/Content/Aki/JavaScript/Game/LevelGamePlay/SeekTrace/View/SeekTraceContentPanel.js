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
    this.jtd = [];
    this.Htd = UE.NewArray(UE.BuiltinInt);
    this.$td = UE.NewArray(UE.BuiltinInt);
    this.Wtd = UE.NewArray(UE.BuiltinInt);
    this.uhd = UE.NewArray(UE.BuiltinInt);
    this.Ktd = new UE.FName("GridArray");
    this.Xtd = new UE.FName("StateArray");
    this.Jtd = undefined;
    this.hql = undefined;
    this.Ytd = [5, 6];
    this.ztd = [9, 10];
    this.chd = [5, 6, 9, 10];
    this.rod = false;
    this.Ztd = 1;
    this.dhd = 0;
    this.eid = 1;
    this.xad = false;
    this.eld = [-1, -1];
    this.Uad = undefined;
    this.Q_t = Vector2D_1.Vector2D.Create();
    this.LLe = [0, 0];
    this.tid = [0, 0];
    this.mhd = [0, 0];
    this.fhd = [0, 0];
    this.iid = Vector2D_1.Vector2D.Create();
    this.GIl = undefined;
    this.rid = undefined;
    this.oid = () => {
      var t = new Map();
      for (const U of this.chd) {
        var i = this.GetUiNiagara(U).NiagaraComponent;
        if (!i) {
          TimerSystem_1.TimerSystem.Next(this.oid);
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
        this.Wtd.Add(0);
        this.uhd.Add(0);
        l.Add(3);
      }
      for ([e, s] of t) {
        s.SetIntParameter(a, r);
        s.SetIntParameter(o, h);
        s.SetIntParameter(n, h);
        switch (e) {
          case 5:
          case 6:
            UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(s, this.Ktd, this.Htd);
            UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(s, this.Xtd, this.$td);
            break;
          case 9:
          case 10:
            UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(s, this.Ktd, this.uhd);
            UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(s, this.Xtd, l);
        }
      }
    };
    this.Bad = t => {
      if (t === "Move") {
        this.kad();
      }
    };
    this.ghd = t => {
      var i;
      var e;
      var s;
      var h;
      var r;
      var a;
      if (!!t && !(a = ModelManager_1.ModelManager.SeekTraceModel).SelectedItem) {
        if (this.rod && (i = this.Q_t, LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t.pointerPosition, i), t = i.X / this.eid + this.Ztd, e = -i.Y / this.eid + this.Ztd, (s = this.LLe)[0] = Math.ceil(t), s[1] = Math.ceil(e), ControllerHolder_1.ControllerHolder.SeekTraceController.SelectItem(s))) {
          h = s[0];
          r = s[1];
          this.mhd[0] = h;
          this.mhd[1] = r;
          a = a.SelectedItem.BasePosition;
          this.tid[0] = h - a[0];
          this.tid[1] = r - a[1];
          this.iid.X = -(t - s[0] + 0.5) * this.eid;
          this.iid.Y = (e - s[1] + 0.5) * this.eid;
          this.cid(true);
          this.Chd(i, true);
          this.GIl?.();
        }
      }
    };
    this.vKe = t => {
      var i;
      if (t && ModelManager_1.ModelManager.SeekTraceModel.SelectedItem) {
        i = this.Q_t;
        LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t.pointerPosition, i);
        (t = this.LLe)[0] = Math.ceil(i.X / this.eid + this.Ztd) - this.tid[0];
        t[1] = Math.ceil(-i.Y / this.eid + this.Ztd) - this.tid[1];
        ControllerHolder_1.ControllerHolder.SeekTraceController.MoveSelectedItem(t);
        this.V7e();
        this.Chd(i, false);
      }
    };
    this.phd = t => {
      this.aid(false, false);
    };
    this.hid = () => {
      return new SeekTraceGridStateView_1.SeekTraceGridStateView();
    };
    this.lid = () => {
      return new SeekTraceGridBackgroundView_1.SeekTraceGridBackgroundView();
    };
  }
  SetItemCallback(t, i) {
    this.GIl = t;
    this.rid = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout], [1, UE.UIItem], [2, UE.UIGridLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UINiagara], [6, UE.UINiagara], [7, UE.UIDraggableComponent], [8, UE.UIItem], [9, UE.UINiagara], [10, UE.UINiagara], [11, UE.UIItem], [12, UE.UINiagara], [13, UE.UINiagara], [14, UE.UINiagara]];
  }
  async OnBeforeStartAsync() {
    var t = ModelManager_1.ModelManager.SeekTraceModel.PanelWidth;
    var i = t * t;
    for (let t = 0; t < i; t++) {
      this.Htd.Add(0);
      this.$td.Add(0);
    }
    this._id();
    this.Jtd = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.lid, this.GetItem(1).GetOwner());
    await this.Jtd.RefreshByDataAsync(ModelManager_1.ModelManager.SeekTraceModel.EnableGridList);
    this.hql = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.hid, this.GetItem(3).GetOwner());
    await this.hql.RefreshByDataAsync(this.jtd);
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
      this.eid = t / i;
      this.Ztd = i / 2 - 1;
      this.dhd = this.Ztd + 0.5;
      (t = this.GetDraggable(7)).OnPointerBeginDragCallBack.Bind(this.ghd);
      t.OnPointerDragCallBack.Bind(this.vKe);
      t.OnPointerEndDragCallBack.Bind(this.phd);
      t.OnPointerDownCallBack.Bind(this.ghd);
      t.OnPointerCancelCallBack.Bind(this.phd);
      t.OnPointerUpCallBack.Bind(this.phd);
      this.GetItem(4).SetUIActive(true);
      this.GetItem(8).SetUIActive(true);
      this.kad();
      this.oid();
    }
  }
  OnBeforeShow() {
    this.vhd(12, NIAGARA_DURATION);
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
    this.rod = t;
  }
  ResetView() {
    this.cid(false);
    this.vhd(13, NIAGARA_DURATION, () => {
      for (const i of this.Ytd) {
        var t = this.GetUiNiagara(i).NiagaraComponent;
        UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(t, this.Ktd, this.uhd);
      }
    }, () => {
      this.V7e();
      this.vhd(12, NIAGARA_DURATION);
    });
  }
  OnInputControllerChange() {
    if (ModelManager_1.ModelManager.SeekTraceModel.SelectedItem) {
      this.aid(true, Info_1.Info.IsInGamepad());
    }
    this.kad();
  }
  OnSeekTraceSucceed() {
    this.vhd(14, NIAGARA_DURATION);
  }
  kad() {
    var t = Info_1.Info.IsInTouch();
    this.xad = !t;
    if (t) {
      this.Uad?.Clear();
      this.Uad = undefined;
    } else {
      t = this.GetItem(11);
      if (!this.Uad) {
        this.Uad = new UiSequencePlayer_1.UiSequencePlayer(t);
        this.Uad.BindOnEndSequenceEvent(this.Bad);
      }
      this.fhd[0] = 0;
      this.fhd[1] = 0;
      this.yhd(0, 0);
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
        t = Math.ceil(i.X / this.eid + this.Ztd);
        i = Math.ceil(-i.Y / this.eid + this.Ztd);
        e = s.PanelWidth;
        s = s.PanelHeight;
        if (!(t < 0) && !(e <= t) && !(i < 0) && !(s <= i)) {
          this.yhd(t, i);
        }
      }
    }
  }
  yhd(t, i) {
    var e;
    if (t !== this.eld[0] || i !== this.eld[1]) {
      this.Uad?.StopPrevSequence(false, true);
      this.Uad?.PlaySequencePurely("Float");
      this.eld[0] = t;
      this.eld[1] = i;
      (e = this.Q_t).X = (t - this.dhd) * this.eid;
      e.Y = -(i - this.dhd) * this.eid;
      this.GetItem(11).SetAnchorOffset(e.ToUeVector2D());
    }
  }
  gad() {
    if (this.xad && !ModelManager_1.ModelManager.SeekTraceModel.SelectedItem) {
      this.Uad.StopPrevSequence(false, true);
      this.Uad.PlaySequencePurely("Move");
    }
  }
  GamePadMovePosition(t, i) {
    var e = ModelManager_1.ModelManager.SeekTraceModel;
    var s = this.fhd;
    var t = (s[0] + t + e.PanelWidth) % e.PanelWidth;
    var s = (s[1] + i + e.PanelHeight) % e.PanelHeight;
    this.Shd(t, s);
  }
  Shd(t, i) {
    var e = this.fhd;
    e[0] = t;
    e[1] = i;
    this.yhd(t, i);
    var e = ModelManager_1.ModelManager.SeekTraceModel;
    if (e.SelectedItem) {
      this.Mhd();
    }
  }
  Mhd() {
    var t;
    var i;
    var e;
    if (ModelManager_1.ModelManager.SeekTraceModel.SelectedItem) {
      t = this.fhd[0];
      i = this.fhd[1];
      (e = this.Q_t).X = (t - this.dhd - this.mhd[0]) * this.eid;
      e.Y = -(i - this.dhd - this.mhd[1]) * this.eid;
      this.GetItem(8).SetAnchorOffset(e.ToUeVector2D());
      (e = this.LLe)[0] = t - this.tid[0];
      e[1] = i - this.tid[1];
      ControllerHolder_1.ControllerHolder.SeekTraceController.MoveSelectedItem(e);
      this.V7e();
    }
  }
  GamePadSelectItem() {
    var t;
    var i;
    var e;
    if (this.rod) {
      if ((t = ModelManager_1.ModelManager.SeekTraceModel).SelectedItem) {
        this.aid(false, true);
      } else if (ControllerHolder_1.ControllerHolder.SeekTraceController.SelectItem(this.fhd)) {
        e = this.fhd;
        t = t.SelectedItem.BasePosition;
        i = e[0];
        e = e[1];
        this.mhd[0] = i;
        this.mhd[1] = e;
        this.tid[0] = i - t[0];
        this.tid[1] = e - t[1];
        this.Mhd();
        this.cid(true);
        this.Uad.StopPrevSequence(false, true);
        this.Uad.PlaySequencePurely("Sle");
        this.GIl?.();
      }
    }
  }
  GamePadResetItem() {
    this.aid(true, true);
  }
  aid(t, i) {
    var e = ModelManager_1.ModelManager.SeekTraceModel.SelectedItem;
    if (e) {
      var s = e.FilledIndexSet.size;
      var t = t ? undefined : ControllerHolder_1.ControllerHolder.SeekTraceController.PlaceSelectedItem();
      if (t === 0) {
        var h = e.FilledIndexSet;
        if (s !== h.size) {
          var r = e.ItemType;
          var a = this.Htd.Num();
          for (let t = 0; t < a; t++) {
            this.Htd.Set(t, h.has(t) ? r : 0);
          }
          this.vhd(12, NIAGARA_DURATION);
          AudioSystem_1.AudioSystem.PostEvent("play_ui_seektrace_gem_moved");
        }
      } else {
        s = ModelManager_1.ModelManager.SeekTraceModel.SelectedStartPosition;
        ControllerHolder_1.ControllerHolder.SeekTraceController.MoveSelectedItem(s);
        ControllerHolder_1.ControllerHolder.SeekTraceController.PlaceSelectedItem();
        if (t === 2) {
          this.gad();
        }
        if (i) {
          this.Shd(this.mhd[0], this.mhd[1]);
        }
      }
      e = this.eld;
      e[0] = -1;
      e[1] = -1;
      this.V7e();
      this.cid(false);
      this.rid?.();
    }
  }
  cid(t) {
    if (t) {
      var i = ModelManager_1.ModelManager.SeekTraceModel.SelectedItem;
      var e = i.ItemType;
      var s = i.FilledIndexSet;
      for (let t = 0; t < this.Wtd.Num(); t++) {
        var h = s.has(t) ? e : 0;
        this.Wtd.Set(t, h);
      }
    }
    var r = t ? this.Wtd : this.uhd;
    for (const o of this.ztd) {
      var a = this.GetUiNiagara(o).NiagaraComponent;
      UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(a, this.Ktd, r);
    }
  }
  Chd(t, i) {
    t.AdditionEqual(this.iid);
    var e = (UiLayer_1.UiLayer.UiRootItem.GetWidth() - this.eid) / 2;
    var s = (UiLayer_1.UiLayer.UiRootItem.GetHeight() - this.eid) / 2;
    var h = this.mhd[0] * this.eid;
    var r = this.mhd[1] * this.eid;
    t.X = MathUtils_1.MathUtils.Clamp(t.X, -e, e);
    t.Y = MathUtils_1.MathUtils.Clamp(t.Y, -s, s);
    if (this.xad && (this.GetItem(11).SetAnchorOffset(t.ToUeVector2D()), i)) {
      this.Uad.StopPrevSequence(false, true);
      this.Uad.PlaySequencePurely("Sle");
    }
    t.X -= h;
    t.Y += r;
    this.GetItem(8).SetAnchorOffset(t.ToUeVector2D());
  }
  V7e() {
    this._id();
    for (const i of this.Ytd) {
      var t = this.GetUiNiagara(i).NiagaraComponent;
      UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(t, this.Ktd, this.Htd);
      UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(t, this.Xtd, this.$td);
    }
    this.hql?.RefreshByData(this.jtd);
  }
  _id() {
    var i = this.jtd;
    var e = this.Htd;
    var s = this.$td;
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
  vhd(t, i, e, s) {
    this.GetUiNiagara(t).SetUIActive(true);
    this.Ehd(t, () => {
      e?.();
      if (s) {
        TimerSystem_1.TimerSystem.Delay(s, i);
      }
    });
  }
  Ehd(t, i) {
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
      UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(e, this.Ktd, this.Htd);
      i();
    } else {
      TimerSystem_1.TimerSystem.Next(() => {
        this.Ehd(t, i);
      });
    }
  }
}
exports.SeekTraceContentPanel = SeekTraceContentPanel;
//# sourceMappingURL=SeekTraceContentPanel.js.map