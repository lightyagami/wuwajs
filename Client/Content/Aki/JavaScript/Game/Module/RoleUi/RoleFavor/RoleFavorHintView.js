"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorHintView = exports.initFavorExpItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const RoleFavorHintItem_1 = require("./RoleFavorHintItem");
const initFavorExpItem = (e, t, i) => {
  return {
    Key: i,
    Value: new RoleFavorHintItem_1.RoleFavorHintItem(e, t)
  };
};
exports.initFavorExpItem = initFavorExpItem;
class RoleFavorHintView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.b_o = [];
    this.q_o = undefined;
    this.G_o = 0;
    this.N_o = e => {
      var t;
      var i = this.O_o(e);
      var r = i.length;
      for (let e = 0; e < r; e++) {
        var s = i[e];
        this.b_o.push(s);
      }
      this.q_o.ClearChildren();
      this.q_o.RebuildLayoutByDataNew(this.b_o);
      this.G_o = this.b_o.length;
      for ([, t] of this.q_o.GetLayoutItemMap()) {
        t.SetSequenceFinishCallBack(this.x_o);
      }
    };
    this.x_o = () => {
      this.G_o = this.G_o - 1;
      if (this.G_o === 0) {
        UiManager_1.UiManager.CloseView("RoleFavorHintView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout]];
  }
  OnStart() {
    this.b_o = this.OpenParam;
    this.b_o = this.O_o(this.b_o);
    this.q_o = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(1), exports.initFavorExpItem);
    this.q_o.RebuildLayoutByDataNew(this.b_o);
    this.G_o = this.b_o.length;
    for (var [, e] of this.q_o.GetLayoutItemMap()) {
      e.SetSequenceFinishCallBack(this.x_o);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateRoleFavorHintView, this.N_o);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateRoleFavorHintView, this.N_o);
  }
  O_o(n) {
    if (ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData) {
      var o = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData.GetRoleIdList;
      if (o.length !== 0) {
        const _ = o.length;
        var a = new Set();
        let i = 0;
        let r = true;
        let s = undefined;
        for (let e = 0; e < _; e++) {
          var h = o[e];
          var v = n.length;
          let t = false;
          for (let e = 0; e < v; e++) {
            var u = n[e];
            if (u.RoleConfig.Id === h) {
              if (i === 0) {
                i = u.Exp;
                t = true;
                s = u;
              } else {
                t = u.Exp === i;
              }
              a.add(e);
              break;
            }
          }
          if (!t) {
            r = false;
          }
        }
        if (r) {
          const _ = n.length;
          var t;
          var l = [];
          l.push(s);
          for (let e = 0; e < _; e++) {
            if (!a.has(e)) {
              t = n[e];
              l.push(t);
            }
          }
          return l;
        }
      }
    }
    return n;
  }
  OnBeforeDestroy() {
    this.b_o = [];
    if (this.q_o) {
      this.q_o.ClearChildren();
      this.q_o = undefined;
    }
    this.G_o = 0;
  }
}
exports.RoleFavorHintView = RoleFavorHintView;
//# sourceMappingURL=RoleFavorHintView.js.map