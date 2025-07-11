"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonItem = undefined;
const UE = require("ue");
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
    this.PAu = undefined;
    this.OnToggleCallBack = undefined;
    this.PWa = e => {
      var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
      if (t && t.Id === e) {
        this.GetItem(9)?.SetUIActive(this.Pe.HasRedDot);
      }
    };
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.Pe);
      }
    };
    this.xAu = () => {
      return new FloroRanchSubDungeonItem_1.FloroRanchSubDungeonItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIExtendToggleSpriteTransition]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.PAu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.xAu);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
  }
  Refresh(r, e, t) {
    this.Pe = r;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r.GetDungeonName());
    var i = r.GetSubDungeonData();
    this.PAu.RefreshByData(i);
    this.GetText(4)?.SetUIActive(!r.IsUnLock);
    this.GetHorizontalLayout(2)?.RootUIComp.SetUIActive(r.IsUnLock);
    this.GetSprite(7)?.SetUIActive(!r.IsUnLock && !r.IsDifficulty);
    this.GetSprite(8)?.SetUIActive(!r.IsUnLock && r.IsDifficulty);
    this.GetSprite(5)?.SetUIActive(r.IsDifficulty);
    const s = this.GetSprite(6);
    this.SetSpriteByPath(r.RomeNumIcon, s, false, undefined, () => {
      var e;
      var t;
      var i = this.GetUiExtendToggleSpriteTransition(10);
      if (r.IsDifficulty) {
        e = UE.Color.FromHex("C8564BFF");
        (t = i.TransitionState).UnCheckedHoverState.Color = e;
        t.UnCheckedPressedState.Color = e;
        t.UnCheckedUnHoverState.Color = e;
      }
      i.SetAllStateSprite(s.GetSprite());
    });
    s?.SetUIActive(r.IsUnLock);
    this.GetItem(9)?.SetUIActive(r.HasRedDot);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
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