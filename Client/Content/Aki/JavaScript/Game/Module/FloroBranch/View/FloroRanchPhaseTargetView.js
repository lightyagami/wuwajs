"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchPhaseTargetView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class FloroRanchPhaseTargetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PNo = undefined;
    this.Smu = () => {
      this.CloseMe();
      if (this.PNo) {
        this.PNo();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[6, this.Smu]];
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    var i = e.StageStartData;
    this.PNo = e.CloseCallback;
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.SetStageTarget(MathUtils_1.MathUtils.LongToNumber(i.j6n));
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.CurStage;
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var a = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
    var t = t.GetFloroRanchSubDungeonData(a).GetMaxStage();
    var a = ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsEndlessMode;
    var s = this.GetText(1);
    if (a) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, "FloroRanchStageTarget2", e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, "FloroRanchStageTarget", e, t);
    }
    s.SetChangeColor(a, s.changeColor);
    this.GetItem(7)?.SetUIActive(a);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "FloroRanchDayNum", i.Ohu);
    this.GetText(4)?.SetText(MathUtils_1.MathUtils.LongToNumber(i.j6n).toString());
    this.GetText(5)?.SetText(MathUtils_1.MathUtils.LongToNumber(i.DS_).toString());
  }
}
exports.FloroRanchPhaseTargetView = FloroRanchPhaseTargetView;
//# sourceMappingURL=FloroRanchPhaseTargetView.js.map