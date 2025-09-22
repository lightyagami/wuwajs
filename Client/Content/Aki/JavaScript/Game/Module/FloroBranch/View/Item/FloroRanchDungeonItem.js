"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FloroRanchSubDungeonItem_1 = require("./FloroRanchSubDungeonItem");
class FloroRanchDungeonItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.oPu = undefined;
    this.TDe = undefined;
    this.OnToggleCallBack = undefined;
    this.PWa = e => {
      var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
      if (t && t.Id === e) {
        this.GetItem(9)?.SetUIActive(this.Pe.HasRedDot);
      }
    };
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.Pe, this.Pe.GetLatestSubDungeonData());
      }
    };
    this.nPu = () => {
      return new FloroRanchSubDungeonItem_1.FloroRanchSubDungeonItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIExtendToggleSpriteTransition]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.oPu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.nPu);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
  }
  Refresh(e, t, i) {
    this.sbi(e);
  }
  sbi(s) {
    this.Pe = s;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.GetDungeonName());
    var e = s.GetSubDungeonData();
    this.oPu.RefreshByData(e);
    if (!this.Pe.IsUnLock) {
      this.kot();
    }
    this.GetText(4)?.SetUIActive(!s.IsUnLock);
    this.GetHorizontalLayout(2)?.RootUIComp.SetUIActive(s.IsUnLock);
    this.GetSprite(7)?.SetUIActive(!s.IsUnLock && !s.IsDifficulty);
    this.GetSprite(8)?.SetUIActive(!s.IsUnLock && s.IsDifficulty);
    this.GetSprite(5)?.SetUIActive(s.IsDifficulty);
    const r = this.GetSprite(6);
    this.SetSpriteByPath(s.RomeNumIcon, r, false, undefined, () => {
      var e;
      var t;
      var i = this.GetUiExtendToggleSpriteTransition(10);
      if (s.IsDifficulty) {
        e = UE.Color.FromHex("C8564BFF");
        (t = i.TransitionState).UnCheckedHoverState.Color = e;
        t.UnCheckedPressedState.Color = e;
        t.UnCheckedUnHoverState.Color = e;
      }
      i.SetAllStateSprite(r.GetSprite());
    });
    r?.SetUIActive(s.IsUnLock);
    this.GetItem(9)?.SetUIActive(s.HasRedDot);
  }
  imd() {
    if (this.Pe.IsUnLock) {
      this.sbi(this.Pe);
    }
  }
  kot() {
    this.xHe();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.imd();
    }, 1000);
  }
  xHe() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
  }
  OnBeforeDestroy() {
    this.xHe();
  }
  SetToggleCallBack(e) {
    this.OnToggleCallBack = e;
  }
  GetKey(e, t) {
    return e.Id;
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
}
exports.FloroRanchDungeonItem = FloroRanchDungeonItem;
//# sourceMappingURL=FloroRanchDungeonItem.js.map