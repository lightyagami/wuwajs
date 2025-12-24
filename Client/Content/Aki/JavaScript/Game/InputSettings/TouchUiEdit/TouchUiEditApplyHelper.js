"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchUiEditApplyHelper = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const CommonTouchUiEditDataFacade_1 = require("./Common/CommonTouchUiEditDataFacade");
class TouchUiEditApplyHelper {
  static $ra(o, r, t) {
    var i = o.GetRootActor();
    if (i && i.IsValid()) {
      var a = i.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
      if (a) {
        for (let e = -1; e < a.Components.Num(); e++) {
          var l;
          var n;
          var s = t.GetStorageId(r, e);
          if (s !== 0) {
            let o = undefined;
            if ((o = e === -1 ? i : a.Components.Get(e)) && (l = o.GetComponentByClass(UE.UIItem.StaticClass())) && s && (this.bCd.has(s) || this.bCd.set(s, [l.GetAnchorOffsetX(), l.GetAnchorOffsetY()]), (n = t.GetData(r, e)).Editable)) {
              l.SetUIItemScale(new UE.Vector(n.Scale, n.Scale, n.Scale));
              l.SetAnchorOffsetX(this.bCd.get(s)[0] + n.OffsetX);
              l.SetAnchorOffsetY(this.bCd.get(s)[1] + n.OffsetY);
              l.SetUIItemAlpha(n.Alpha);
              l.SetHierarchyIndex(n.HierarchyIndex);
            }
          }
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("TouchUiEdit", 74, "设置触屏键位失败, 传入的Panel可能已经销毁, 请检查调用时机", ["Panel", r]);
    }
  }
  static ApplyCommonTouchUiEditData(o, e, r) {
    var t;
    if (Info_1.Info.IsInTouch() && (t = ControllerHolder_1.ControllerHolder.TouchUiEditController.GetDataFacade(CommonTouchUiEditDataFacade_1.CommonTouchUiEditDataFacade))) {
      t.SetGroup(o);
      this.$ra(e, r, t);
    }
  }
}
(exports.TouchUiEditApplyHelper = TouchUiEditApplyHelper).bCd = new Map();
//# sourceMappingURL=TouchUiEditApplyHelper.js.map