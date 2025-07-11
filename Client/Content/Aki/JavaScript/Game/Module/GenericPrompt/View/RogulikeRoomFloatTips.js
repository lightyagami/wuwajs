"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeRoomFloatTips = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class RoguelikeRoomFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, UE.UISprite]);
  }
  SetMainText() {
    var e;
    if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.MainText, "RoguelikeRoomFloatTips_Normal", ModelManager_1.ModelManager.WeeklyRogueModel.CurrentLayer, ModelManager_1.ModelManager.WeeklyRogueModel.MaxLayer);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.ExtraText, "RoguelikeRoomFloatTips_NormalDesc");
    } else {
      e = ModelManager_1.ModelManager.RoguelikeModel.CurRoomType === Protocol_1.Aki.Protocol.d8s.Proto_Normal;
      this.MainText.SetUIActive(e);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.MainText, "RoguelikeRoomFloatTips_Normal", ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount, ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount);
      }
    }
  }
  SetExtraText() {
    this.GetSprite(2).SetUIActive(false);
    switch (ModelManager_1.ModelManager.RoguelikeModel.CurRoomType) {
      case Protocol_1.Aki.Protocol.d8s.Proto_Normal:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.ExtraText, "RoguelikeRoomFloatTips_NormalDesc");
        break;
      case Protocol_1.Aki.Protocol.d8s.Proto_Boss:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.ExtraText, "RoguelikeRoomFloatTips_NoHeadDesc");
        break;
      case Protocol_1.Aki.Protocol.d8s.Proto_Special:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.ExtraText, "RoguelikeRoomFloatTips_SpecialDesc");
    }
  }
}
exports.RoguelikeRoomFloatTips = RoguelikeRoomFloatTips;
//# sourceMappingURL=RogulikeRoomFloatTips.js.map