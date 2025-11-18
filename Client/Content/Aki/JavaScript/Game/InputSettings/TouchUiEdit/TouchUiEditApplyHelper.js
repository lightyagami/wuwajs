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
  static $ra(o, e, r) {
    o = o.GetRootActor();
    if (o && o.IsValid()) {
      var t = o.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
      if (t) {
        for (let o = 0; o < t.Components.Num(); o++) {
          var i;
          var a;
          var l = t.Components.Get(o);
          if (l && (l = l.GetComponentByClass(UE.UIItem.StaticClass()), i = r.GetStorageId(e, o), l) && i && (this.bCd.has(i) || this.bCd.set(i, [l.GetAnchorOffsetX(), l.GetAnchorOffsetY()]), (a = r.GetData(e, o)).Editable)) {
            l.SetUIItemScale(new UE.Vector(a.Scale, a.Scale, a.Scale));
            l.SetAnchorOffsetX(this.bCd.get(i)[0] + a.OffsetX);
            l.SetAnchorOffsetY(this.bCd.get(i)[1] + a.OffsetY);
            l.SetUIItemAlpha(a.Alpha);
            l.SetHierarchyIndex(a.HierarchyIndex);
          }
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("TouchUiEdit", 74, "设置触屏键位失败, 传入的Panel可能已经销毁, 请检查调用时机", ["Panel", e]);
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