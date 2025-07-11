"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PartState = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView");
const HpBufferStateMachine_1 = require("./HeadState/HpBufferStateMachine");
const PERCENT_TOLERATION = 0.01;
class PartState extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor(t, i) {
    super();
    this.Jh = undefined;
    this.Yct = undefined;
    this.R$e = undefined;
    this.g1t = undefined;
    this.Jct = (0, puerts_1.$ref)(undefined);
    this.tfe = undefined;
    this.zct = false;
    this.snt = -0;
    this.j1t = -0;
    this.W1t = -0;
    this.K1t = -1;
    this.Zct = -0;
    this.Z1t = new HpBufferStateMachine_1.HpBufferStateMachine();
    this.pnt = 0;
    this.emt = (t, i) => {
      var e = this.Yct.Life;
      this.SetVisible(2, e > 0);
      this.tmt(true);
    };
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_PartState_Prefab");
    this.CreateThenShowByPathAsync(e, UiLayer_1.UiLayer.GetBattleViewUnit(2), true).finally(() => {
      this.InitializePartState(t, i);
    });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite]];
  }
  OnStart() {
    this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
  }
  OnBeforeDestroy() {
    this.ResetPartState();
  }
  InitializePartState(t, i) {
    if (this.RootItem?.IsValid()) {
      this.Jh = t;
      this.Yct = i;
      this.R$e = Global_1.Global.CharacterController;
      this.g1t = i.PartSocketName;
      t = this.Jh.GetComponent(3).Actor;
      this.tfe = t.Mesh;
      this.InitChildType(15);
      this.imt();
      if (this.zct) {
        this.tmt();
        this.RefreshPosition();
        this.ShowBattleVisibleChildView();
        this.Ore();
      } else {
        this.HideBattleVisibleChildView();
      }
    }
  }
  imt() {
    if (this.Jh) {
      if (this.tfe) {
        if (this.tfe.DoesSocketExist(this.g1t)) {
          this.zct = true;
        } else {
          this.zct = false;
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Battle", 17, "怪物部位血条非法：不存在SocketName", ["", this.g1t]);
          }
        }
      } else {
        this.zct = false;
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 17, "怪物部位血条非法：不存在SkeletalMesh");
        }
      }
    } else {
      this.zct = false;
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 17, "怪物部位血条非法：不存在Entity");
      }
    }
  }
  ResetPartState() {
    if (this.zct) {
      this.kre();
      this.ist();
    }
    this.Jh = undefined;
    this.Yct = undefined;
    this.R$e = undefined;
    this.tfe = undefined;
    this.snt = undefined;
    this.zct = false;
  }
  Ore() {
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.CharPartDamage, this.emt)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharPartDamage, this.emt);
    }
  }
  kre() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharPartDamage, this.emt);
  }
  tmt(t = false) {
    var i;
    var e;
    var s = this.GetSprite(0);
    if (s) {
      i = this.Yct.Life;
      e = this.Yct.LifeMax;
      s.SetFillAmount(s = i / e);
      if (t) {
        if (this.snt === undefined) {
          this.snt = s;
        }
        this.fst(s);
      } else {
        this.ist();
        this.snt = s;
      }
    }
  }
  fst(t) {
    var i = t;
    var e = this.snt;
    var s = this.Z1t.IsOriginState();
    if (e <= i) {
      if (s) {
        this.snt = t;
      }
    } else {
      this.Z1t.GetHit(i, e);
      this.j1t = i;
      this.W1t = e;
      this.snt = t;
      this.K1t = 0;
      if (s && !this.Z1t.IsOriginState()) {
        this.omt(e);
      }
    }
  }
  omt(t) {
    this.ast(t);
  }
  ist() {
    this.j1t = 0;
    this.W1t = 0;
    this.K1t = -1;
    this.Z1t.Reset();
    this.GetSprite(1).SetUIActive(false);
  }
  M_t(t) {
    if (!(Math.abs(this.Zct - t) < PERCENT_TOLERATION)) {
      if (t) {
        this.rmt(t);
      } else {
        this.rmt(this.snt);
      }
      this.Zct = t;
    }
  }
  rmt(t) {
    this.ast(t);
  }
  ast(t) {
    var i = this.GetSprite(1);
    i.SetFillAmount(t);
    if (!i.IsUIActiveSelf()) {
      i.SetUIActive(true);
    }
    var i = this.GetSprite(2);
    i.SetStretchLeft(this.pnt * this.snt - 2);
    i.SetStretchRight(this.pnt * (1 - t) - 2);
  }
  RefreshPosition() {
    var t;
    var i;
    if (this.zct && (i = UiLayer_1.UiLayer.UiRootItem)) {
      t = this.tfe.D_GetSocketLocation(this.g1t);
      if (UE.GameplayStatics.D_ProjectWorldToScreen(this.R$e, t, this.Jct, false)) {
        t = (0, puerts_1.$unref)(this.Jct);
        i = i.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t);
        this.RootItem.SetAnchorOffset(i);
        this.SetVisible(1, true);
      } else {
        this.SetVisible(1, false);
      }
    }
  }
  Tick(t) {
    if (this.zct) {
      this.RefreshPosition();
      this.nmt(t);
    }
  }
  nmt(t) {
    var i;
    if (this.K1t !== -1 && !((i = this.Z1t.UpdatePercent(t)) < 0 ? this.ist() : this.M_t(i), this.j1t >= this.W1t)) {
      this.K1t = this.K1t + t;
    }
  }
}
exports.PartState = PartState;
//# sourceMappingURL=PartState.js.map