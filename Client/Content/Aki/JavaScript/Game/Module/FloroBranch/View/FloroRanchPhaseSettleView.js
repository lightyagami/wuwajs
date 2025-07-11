"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchPhaseSettleView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FloroRanchController_1 = require("../FloroRanchController");
class FloroRanchPhaseSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Zge = 0;
    this.Nvu = 0;
    this.$It = false;
    this.Vvu = false;
    this.PNo = undefined;
    this.Smu = () => {
      var i = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().Id;
      var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
      if (this.$It) {
        FloroRanchController_1.FloroRanchController.SendFloroRanchPlayTributeRequest(i, t, i => {
          this.Vvu = i.Rru;
          if (this.Zge !== 0) {
            AudioSystem_1.AudioSystem.ExecuteAction(this.Zge, 0);
          }
          this.CloseMe();
        });
      } else {
        if (this.Zge !== 0) {
          AudioSystem_1.AudioSystem.ExecuteAction(this.Zge, 0);
        }
        this.Vvu = true;
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.SpineSkeletonAnimationComponent]];
    this.BtnBindInfo = [[5, this.Smu]];
  }
  OnBeforeShow() {
    var i = this.OpenParam;
    var t = i.StageEndData;
    this.PNo = i.CloseCallback;
    var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.CurStage;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "FloroRanchStageResult", i);
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var s = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
    var e = e.GetFloroRanchSubDungeonData(s).GetMaxStage() <= i;
    this.$It = t.qhu;
    var s = e || !this.$It ? "Farm_Confirm" : "Farm_NewState";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), s);
    this.Nvu = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetStageTarget();
    this.GetText(3)?.SetText(this.Nvu.toString());
    var i = Number(MathUtils_1.MathUtils.LongToBigInt(t.lru));
    this.GetText(4)?.SetText(i.toString());
    var e = this.$It ? "FloroRanchStageSuccess" : "FloroRanchStageFail";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
    this.GetItem(9)?.SetUIActive(this.$It);
    this.GetItem(10)?.SetUIActive(!this.$It);
    var s = this.$It ? "happy" : "fail";
    this.GetSpine(11)?.SetAnimation(0, s, true);
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRandomAudioDataByType(this.$It ? 2 : 3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t.GetAudioText());
    this.Zge = AudioSystem_1.AudioSystem.PostEvent(t.GetAudioEvent());
    if (this.$It) {
      this.GetSpine(11).SetAnimation(0, "success", false).AnimationComplete.Add(() => {
        this.GetSpine(11).SetAnimation(0, "success_loop", true);
      });
    } else {
      this.GetSpine(11).SetAnimation(0, "fail", false).AnimationComplete.Add(() => {
        this.GetSpine(11).SetAnimation(0, "fail_loop", true);
      });
    }
  }
  OnAfterDestroy() {
    this.PNo(this.Vvu);
  }
}
exports.FloroRanchPhaseSettleView = FloroRanchPhaseSettleView;
//# sourceMappingURL=FloroRanchPhaseSettleView.js.map