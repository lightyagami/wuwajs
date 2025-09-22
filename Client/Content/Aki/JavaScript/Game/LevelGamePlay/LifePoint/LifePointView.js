"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointView = undefined;
const UE = require("ue");
const ue_1 = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Deque_1 = require("../../../Core/Container/Deque");
const Pool_1 = require("../../../Core/Container/Pool");
const Queue_1 = require("../../../Core/Container/Queue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const UiViewSequence_1 = require("../../Ui/Base/UiViewSequence");
const LifePointModel_1 = require("./LifePointModel");
const TIPS_FAILED = "LNXT_YiCaiHua_Tips0001";
const TIPS_RESET = "LNXT_YiCaiHua_Tips0002";
const TIPS_REPEAT = "LNXT_YiCaiHua_Tips0003";
const HELP_CONFIG_ID = 170;
class AnimTask {
  constructor() {
    this.Time = 0;
    this.Color = IAction_1.EPieceColorType.White;
    this.DirectionParam = 0;
    this.PlayRate = 1;
    this.Order = 0;
  }
  static Get(e, i, t, s, o) {
    let r = this.Pool.Get();
    (r = r || this.Pool.Create()).Time = e;
    r.Color = i;
    r.DirectionParam = t;
    r.PlayRate = s;
    r.Order = o;
    return r;
  }
  Recycle() {
    AnimTask.Pool.Put(this);
  }
}
AnimTask.Pool = new Pool_1.Pool(LifePointModel_1.LINE_SIZE * LifePointModel_1.COLUMN_SIZE, () => new AnimTask());
class Grid extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t, s) {
    super();
    this.X = e;
    this.Y = i;
    this.Color = t;
    this.Callback = s;
    this.AnimTask = new Deque_1.Deque();
    this.ColorExpressed = IAction_1.EPieceColorType.White;
    this.IsBlock = false;
    this.mMl = undefined;
    this.eTt = () => {
      this.Callback(this.X, this.Y);
    };
    this.ColorExpressed = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [2, UE.UITexture], [1, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UITexture]];
  }
  OnBeforeCreate() {
    this.mMl = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.mMl);
  }
  OnStart() {
    this.IsBlock = this.ColorExpressed === IAction_1.EPieceColorType.Gray;
    this.GetTexture(0).SetTexture(ModelManager_1.ModelManager.LifePointModel.GridTextureMap.get(this.Color));
    var e = this.Color === ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.TargetColor;
    this.GetTexture(2).GetParentAsUIItem().SetUIActive(e);
    this.GetTexture(2).SetTexture(ModelManager_1.ModelManager.LifePointModel.HitGridTextureMap.get(this.Color));
    this.GetTexture(1).GetParentAsUIItem().SetUIActive(false);
    this.GetTexture(3).GetParentAsUIItem().SetUIActive(false);
    this.GetTexture(5).SetUIActive(this.IsBlock);
    this.GetItem(4).SetUIActive(!this.IsBlock);
    if (!this.IsBlock) {
      this.GetRootActor().GetComponentByClass(UE.UIButtonComponent.StaticClass()).OnClickCallBack.Bind(this.eTt);
    }
  }
  OnBeforeDestroy() {
    this.GetRootActor().GetComponentByClass(UE.UIButtonComponent.StaticClass()).OnClickCallBack.Unbind();
    this.mMl.StopSequenceByKey("Change");
    this.mMl = undefined;
  }
  Paint(e, i, t) {
    this.Color = e;
    var s = ModelManager_1.ModelManager.LifePointModel.CalcCountDownTime(i);
    for (var o = AnimTask.Get(Time_1.Time.Now + s, e, ModelManager_1.ModelManager.LifePointModel.DirectionParam.get(t), ModelManager_1.ModelManager.LifePointModel.CalPlayRate(s), i); this.AnimTask.Size > 0 && !(this.AnimTask.Rear.Time < o.Time);) {
      this.AnimTask.RemoveRear();
    }
    this.AnimTask.AddRear(o);
  }
  TryBlendAnim(i, e, t) {
    var s = Time_1.Time.Now + ModelManager_1.ModelManager.LifePointModel.CalcCountDownTime(e);
    for (let e = 0; e < this.AnimTask.Size; e++) {
      var o = this.AnimTask.Get(e);
      if (o.Color === i && MathUtils_1.MathUtils.IsNearlyEqual(s, o.Time, 1)) {
        o.DirectionParam = ModelManager_1.ModelManager.LifePointModel.BlendDirectionParam(o.DirectionParam, t);
        break;
      }
    }
  }
  BeforeReset() {
    this.AnimTask.Clear();
  }
  Reset(e) {
    if (!this.IsBlock) {
      var i = this.ColorExpressed === ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.TargetColor ? ModelManager_1.ModelManager.LifePointModel.HitGridTextureMap : ModelManager_1.ModelManager.LifePointModel.GridTextureMap;
      this.mMl.StopPrevSequence(false, true);
      var t = this.GetTexture(1);
      var s = this.GetTexture(3);
      t.SetTexture(i.get(this.ColorExpressed));
      s.SetTexture(i.get(this.ColorExpressed));
      t.GetParentAsUIItem().SetUIActive(true);
      s.GetParentAsUIItem().SetUIActive(true);
      const o = e === ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.TargetColor;
      const r = ModelManager_1.ModelManager.LifePointModel.GridTextureMap.get(e);
      const h = ModelManager_1.ModelManager.LifePointModel.HitGridTextureMap.get(e);
      TimerSystem_1.TimerSystem.Next(() => {
        this.GetTexture(0).SetTexture(r);
        this.GetTexture(2).GetParentAsUIItem().SetUIActive(o);
        this.GetTexture(2).SetTexture(h);
      });
      this.Color = e;
      this.ColorExpressed = this.Color;
    }
  }
  AfterReset() {
    this.GetTexture(1).GetParentAsUIItem().SetUIActive(false);
    this.GetTexture(3).GetParentAsUIItem().SetUIActive(false);
    this.GetTexture(1).SetColor(ModelManager_1.ModelManager.LifePointModel.InitColor);
    this.GetTexture(3).SetColor(ModelManager_1.ModelManager.LifePointModel.InitColor);
  }
  CheckAnim() {
    var e;
    if (this.AnimTask.Size === 0) {
      return this.mMl.IsInSequence();
    } else {
      if (!(this.AnimTask.Front.Time > Time_1.Time.Now)) {
        e = this.AnimTask.RemoveFront();
        this.Gti(e);
        e.Recycle();
      }
      return true;
    }
  }
  Gti(e) {
    const i = e.Color === ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.TargetColor;
    var t = this.ColorExpressed === ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.TargetColor ? ModelManager_1.ModelManager.LifePointModel.HitGridTextureMap : ModelManager_1.ModelManager.LifePointModel.GridTextureMap;
    const s = ModelManager_1.ModelManager.LifePointModel.GridTextureMap.get(e.Color);
    const o = ModelManager_1.ModelManager.LifePointModel.HitGridTextureMap.get(e.Color);
    TimerSystem_1.TimerSystem.Next(() => {
      this.GetTexture(0).SetTexture(s);
      this.GetTexture(2).GetParentAsUIItem().SetUIActive(i);
      this.GetTexture(2).SetTexture(o);
    });
    var r = this.GetTexture(1);
    var h = this.GetTexture(3);
    r.SetTexture(t.get(this.ColorExpressed));
    h.SetTexture(t.get(this.ColorExpressed));
    r.GetParentAsUIItem().SetUIActive(true);
    h.GetParentAsUIItem().SetUIActive(true);
    if (e.DirectionParam < 0) {
      if (this.mMl.HasSequenceNameInPlaying("PointChange")) {
        this.mMl.ReplaySequence("PointChange");
      } else {
        this.mMl.PlaySequence("PointChange", false);
      }
    } else {
      r.SetCustomMaterialScalarParameter(ModelManager_1.ModelManager.LifePointModel.ParamName, e.DirectionParam);
      h.SetCustomMaterialScalarParameter(ModelManager_1.ModelManager.LifePointModel.ParamName, e.DirectionParam);
      if (this.mMl.HasSequenceNameInPlaying("Change")) {
        this.mMl.ReplaySequence("Change");
      } else {
        this.mMl.PlaySequence("Change", false, e.PlayRate);
      }
    }
    this.ColorExpressed = e.Color;
    var t = ModelManager_1.ModelManager.LifePointModel.AudioMap.get(e.Order) ?? [0, 0];
    t[0] = t[0] + 1;
    t[1] = e.PlayRate;
    ModelManager_1.ModelManager.LifePointModel.AudioMap.set(e.Order, t);
  }
}
class LifePointView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.HDe = undefined;
    this.hB = [];
    this.Alh = undefined;
    this.Rlh = 0;
    this.OFl = 0;
    this.CUl = false;
    this.gUl = false;
    this.pUl = new Map();
    this.mju = false;
    this.fju = 0;
    this.Rni = 0;
    this.v6e = () => {
      if (ModelManager_1.ModelManager.LifePointModel.Config.CloseUiAfterCompletion !== undefined) {
        this.CloseMe();
      }
    };
    this.$An = e => {
      this.GetLayoutBase(2).GetOwner().GetComponentByClass(ue_1.UIInturnAnimController.StaticClass()).Play();
    };
    this.B_e = () => {
      this.CloseMe();
    };
    this.hBi = () => {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(TIPS_RESET);
      this.gUl = true;
      for (let e = 0; e < LifePointModel_1.LINE_SIZE; e++) {
        var i = this.hB[e];
        for (let e = 0; e < LifePointModel_1.COLUMN_SIZE; e++) {
          i[e].BeforeReset();
        }
      }
      this.mju = false;
    };
    this.NFl = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HELP_CONFIG_ID);
    };
    this.FFl = () => {
      for (let e = 0; e < LifePointModel_1.LINE_SIZE; e++) {
        var i = this.hB[e];
        for (let e = 0; e < LifePointModel_1.COLUMN_SIZE; e++) {
          i[e].AfterReset();
        }
      }
      var e = ModelManager_1.ModelManager.LifePointModel.Config.StepLimit + ModelManager_1.ModelManager.LifePointModel.GetStepBonus();
      if (this.OFl < e) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(239)).FunctionMap.set(1, this.Jke);
        e.FunctionMap.set(2, this.Mke);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        this.Jke();
      }
    };
    this.Mke = () => {
      this.OFl = ModelManager_1.ModelManager.LifePointModel.Config.StepLimit + ModelManager_1.ModelManager.LifePointModel.GetStepBonus();
      this.Rlh = this.OFl;
      var e = this.GetText(8);
      e.SetText(this.Rlh.toString());
      e.SetColor(ModelManager_1.ModelManager.LifePointModel.NormalStepColor);
      this.fju++;
    };
    this.Jke = () => {
      this.Rlh = this.OFl;
      var e = this.GetText(8);
      e.SetText(this.Rlh.toString());
      e.SetColor(ModelManager_1.ModelManager.LifePointModel.NormalStepColor);
    };
    this.xlh = (e, i) => {
      if (!this.gUl && !!this.Alh && !(this.Rlh <= 0) && !(this.Rlh > this.OFl)) {
        var t = this.hB[e][i];
        if (t.Color === this.Alh) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(TIPS_REPEAT);
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 点击", ["x", e], ["y", i]);
          }
          ModelManager_1.ModelManager.LifePointModel.AddStep();
          this.CUl = true;
          this.Rlh--;
          var e = this.GetText(8);
          e.SetText(this.Rlh.toString());
          if (this.Rlh === 1) {
            e.SetColor(ModelManager_1.ModelManager.LifePointModel.DangerStepColor);
          }
          var s = t.Color;
          var o = new Queue_1.Queue();
          t.Paint(this.Alh, 0, 4);
          o.Push([t, 0]);
          while (o.Size > 0) {
            var r;
            var h;
            var n = o.Pop();
            var a = n[0];
            var n = n[1] + 1;
            if (a.X !== 0) {
              if ((r = this.hB[a.X - 1][a.Y]).Color === s) {
                r.Paint(this.Alh, n, 0);
                o.Push([r, n]);
              } else if (r.Color === this.Alh) {
                r.TryBlendAnim(this.Alh, n, 0);
              }
            }
            if (a.Y !== 0) {
              if ((r = this.hB[a.X][a.Y - 1]).Color === s) {
                r.Paint(this.Alh, n, 2);
                o.Push([r, n]);
              } else if (r.Color === this.Alh) {
                r.TryBlendAnim(this.Alh, n, 2);
              }
            }
            if (a.X !== LifePointModel_1.LINE_SIZE - 1) {
              if ((h = this.hB[a.X + 1][a.Y]).Color === s) {
                h.Paint(this.Alh, n, 1);
                o.Push([h, n]);
              } else if (h.Color === this.Alh) {
                h.TryBlendAnim(this.Alh, n, 1);
              }
            }
            if (a.Y !== LifePointModel_1.COLUMN_SIZE - 1) {
              if ((h = this.hB[a.X][a.Y + 1]).Color === s) {
                h.Paint(this.Alh, n, 3);
                o.Push([h, n]);
              } else if (h.Color === this.Alh) {
                h.TryBlendAnim(this.Alh, n, 3);
              }
            }
          }
        }
      }
    };
  }
  get wlh() {
    return ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.TargetColor;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseRewardView, this.v6e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseRewardView, this.v6e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UILayoutBase], [3, UE.UIItem], [4, UE.UIExtendToggle], [5, UE.UIExtendToggle], [6, UE.UIExtendToggle], [7, UE.UIExtendToggle], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [11, UE.UIText], [12, UE.UINiagara], [13, UE.UIButtonComponent]];
    const e = this.pUl;
    e.set(IAction_1.EPieceColorType.Blue, 4);
    e.set(IAction_1.EPieceColorType.Red, 5);
    e.set(IAction_1.EPieceColorType.Yellow, 6);
    e.set(IAction_1.EPieceColorType.Green, 7);
    var i = i => [e.get(i), e => {
      this.Blh(e, i);
    }];
    this.BtnBindInfo = [[10, this.B_e], [9, this.hBi], [13, this.NFl], i(IAction_1.EPieceColorType.Blue), i(IAction_1.EPieceColorType.Red), i(IAction_1.EPieceColorType.Yellow), i(IAction_1.EPieceColorType.Green)];
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam;
    this.Rni = t.EntityId;
    var s = [];
    this.HDe = t.Callback;
    await ModelManager_1.ModelManager.LifePointModel.LoadDataAsync(t.Config, t.EntityId);
    var o = this.GetItem(3);
    var r = this.GetLayoutBase(2).RootUIComp;
    for (let i = 0; i < LifePointModel_1.LINE_SIZE; i++) {
      var h = new Array();
      for (let e = 0; e < LifePointModel_1.COLUMN_SIZE; e++) {
        var n = LguiUtil_1.LguiUtil.CopyItem(o, r);
        var a = t.Config.ColorBoard.Config[i * LifePointModel_1.COLUMN_SIZE + e].Color;
        var a = new Grid(i, e, a, this.xlh);
        h.push(a);
        s.push(a.CreateThenShowByActorAsync(n.GetOwner()));
      }
      this.hB.push(h);
    }
    s.push(this.SetTextureAsync(ModelManager_1.ModelManager.LifePointModel.GetFramePath(this.wlh), this.GetTexture(1)));
    await Promise.all(s);
  }
  OnStart() {
    this.GetItem(3).SetUIActive(false);
    this.gUl = false;
    this.CUl = false;
    this.OFl = ModelManager_1.ModelManager.LifePointModel.Config.StepLimit + ModelManager_1.ModelManager.LifePointModel.GetStepBonus();
    this.Rlh = this.OFl;
    this.GetText(8).SetText(this.Rlh.toString());
    this.GetText(11).ShowTextNew(ModelManager_1.ModelManager.LifePointModel.GetText(this.wlh));
    this.GetUiNiagara(12).ColorParameter.Get("Color").Constant = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(ModelManager_1.ModelManager.LifePointModel.GetColorHex(this.wlh)));
    for (var [e, i] of this.pUl) {
      i = this.GetExtendToggle(i);
      if (ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.Colors.includes(e)) {
        i.RootUIComp.SetUIActive(true);
        if (this.Alh === undefined) {
          i.SetToggleStateForce(1);
          this.Alh = e;
        }
      } else {
        i.RootUIComp.SetUIActive(false);
      }
    }
  }
  OnBeforeHide() {
    if (!this.LastHide) {
      this.CloseMe();
    }
  }
  OnBeforeDestroy() {
    for (const e of this.hB) {
      for (const i of e) {
        i.Destroy();
      }
    }
    AnimTask.Pool.Clear();
    ModelManager_1.ModelManager.LifePointModel.UnloadData();
    ModelManager_1.ModelManager.LifePointDrawModel.CurrentChallengeFinishState = false;
    this.gju();
  }
  av() {
    for (let i = 0; i < LifePointModel_1.LINE_SIZE; i++) {
      var t = this.hB[i];
      for (let e = 0; e < LifePointModel_1.COLUMN_SIZE; e++) {
        var s = t[e];
        var o = ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.Config[i * LifePointModel_1.COLUMN_SIZE + e].Color;
        s.Reset(o);
      }
    }
    this.PlaySequence("Renew", this.FFl, true);
    ModelManager_1.ModelManager.LifePointModel.AudioMap.clear();
  }
  Blh(e, i) {
    if (e && this.Alh !== i) {
      if (this.Alh) {
        this.GetExtendToggle(this.pUl.get(this.Alh)).SetToggleStateForce(0);
      }
      this.Alh = i;
    }
  }
  OnTick(e) {
    if (this.CUl || this.gUl) {
      let e = false;
      for (const i of this.hB) {
        for (const t of i) {
          e = t.CheckAnim() || e;
        }
      }
      if (e) {
        this.Zbl();
      } else {
        this.kxe();
      }
    }
  }
  Zbl() {
    for (var [e, i] of ModelManager_1.ModelManager.LifePointModel.AudioMap) {
      AudioSystem_1.AudioSystem.SetRtpcValue(ModelManager_1.ModelManager.LifePointModel.RtpcCount, e, undefined);
      AudioSystem_1.AudioSystem.SetRtpcValue(ModelManager_1.ModelManager.LifePointModel.RtpcGrids, i[0]);
      AudioSystem_1.AudioSystem.SetRtpcValue(ModelManager_1.ModelManager.LifePointModel.RtpcSpeed, i[1]);
      AudioSystem_1.AudioSystem.PostEvent(ModelManager_1.ModelManager.LifePointModel.AudioEvent, undefined);
    }
    ModelManager_1.ModelManager.LifePointModel.AudioMap.clear();
  }
  kxe() {
    var e;
    if (this.CUl || this.gUl) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 检查生命点完成");
      }
      if (this.gUl) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 生命点重置");
        }
        this.av();
      } else if (this.blh()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 生命点成功");
        }
        ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestFinishUiGameplay(Protocol_1.Aki.Protocol.h3s.Proto_LifePoint, "");
        this.HDe?.();
        this.mju = true;
        if (ModelManager_1.ModelManager.LifePointModel.Config.CloseUiAfterCompletion === undefined || !!ModelManager_1.ModelManager.LifePointDrawModel.CurrentChallengeFinishState) {
          this.PlaySequence("Complete", this.B_e);
        }
        if (ModelManager_1.ModelManager.LifePointDrawModel.CurrentChallengeFinishState) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Colorful_Challenge_Pass");
        }
        if (!(e = EntitySystem_1.EntitySystem.Get(this.Rni)) || !e.Active) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Gameplay_Locked");
        }
      } else if (this.Rlh <= 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(TIPS_FAILED);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 生命点失败");
        }
        this.av();
      }
      this.CUl = false;
      this.gUl = false;
    }
  }
  blh() {
    for (const e of this.hB) {
      for (const i of e) {
        if (this.wlh !== i.Color && !i.IsBlock) {
          return false;
        }
      }
    }
    return true;
  }
  GmFinish() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 生命点成功");
    }
    ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestFinishUiGameplay(Protocol_1.Aki.Protocol.h3s.Proto_LifePoint, "");
    this.HDe?.();
    this.PlaySequence("Complete", this.B_e);
  }
  gju() {
    var e = new LogReportDefine_1.LifePointDrawLogEvent();
    e.i_config_id = this.Rni;
    e.i_result = this.mju ? 1 : 0;
    var i = EntitySystem_1.EntitySystem.Get(this.Rni);
    if (i) {
      i = i?.GetComponent(0);
      e.s_type_name = i?.GetPbEntityInitData()?.BlueprintType ?? "";
    }
    e.i_try_count = this.fju;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
  }
}
exports.LifePointView = LifePointView;
//# sourceMappingURL=LifePointView.js.map