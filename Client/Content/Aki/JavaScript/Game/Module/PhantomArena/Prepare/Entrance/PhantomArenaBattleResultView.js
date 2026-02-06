"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleResultView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ExpTweenComponent_1 = require("../../../Common/ExpTween/ExpTweenComponent");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaBattleResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Oau = undefined;
    this.Nvr = undefined;
    this.Vnu = undefined;
    this.cmu = () => {
      this.Gau();
      this.N3u();
      this.$pu();
    };
    this.Wpu = (e, i) => {
      var t = this.Nvr.DS_.b51;
      if (e === "Unlock" && i === "LevelChange") {
        this.GetText(2).SetText(t.toString());
      } else if (e === "NameChange" && i === "NameChange") {
        e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterTitleIdByLevel(t, this.Nvr.dGm);
        i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(e).Name;
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(7), i);
      }
    };
    this.I5t = () => {
      this.CloseMe(this.Vnu);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIText], [16, UE.UISprite], [17, UE.UISprite], [18, UE.UIText], [19, UE.UIItem], [20, UE.UIText]];
    this.BtnBindInfo = [[1, this.I5t]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.Nvr = e.Result;
    if (!this.Nvr.DS_) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 75, "结算页数据为空");
      }
    }
    this.Vnu = e.CallbackOnClose;
    this.Oau = new ExpTweenComponent_1.ExpTweenComponent(this.GetSprite(16), this.GetSprite(10), this.GetSprite(17), undefined);
  }
  OnBeforeShow() {
    this.GetItem(19)?.SetUIActive(false);
    this.pO();
  }
  OnAfterShow() {
    var e = this.Nvr?.nD1 ? "Success" : "Fail";
    this.UiViewSequence.AddSequenceFinishEvent(e, this.cmu);
    this.RootActor.OnSequencePlayEvent.Bind(this.Wpu);
    this.UiViewSequence.PlaySequence(e);
  }
  OnBeforeDestroy() {
    if (this.Oau) {
      this.Oau.Destroy();
    }
    this.RootActor.OnSequencePlayEvent.Unbind();
    var e = this.Nvr?.nD1 ? "Success" : "Fail";
    this.UiViewSequence.RemoveSequenceFinishEvent(e, this.cmu);
  }
  pO() {
    this.jnu();
    this.Hnu();
    this.$nu();
  }
  jnu() {
    var e;
    var i = this.Nvr?.nD1 ? "GenericPromptTypes_3_GeneralText" : "GenericPromptTypes_4_GeneralText";
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(0), i);
    var i = this.Nvr.nD1 && this.Nvr.Mzm !== Protocol_1.Aki.Protocol.Ezm.Proto_CommonSettle && this.Nvr.Mzm !== Protocol_1.Aki.Protocol.Ezm.Proto_Skip;
    this.GetText(20)?.SetUIActive(i);
    if (i) {
      if ((i = this.Nvr.Mzm) in PhantomArenaDefine_1.phantomBattleSettleReasonToTextId) {
        e = PhantomArenaDefine_1.phantomBattleSettleReasonToTextId[i];
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 71, "声骸bvb结算类型不存在对应的结算文本", ["settleType", i]);
      }
    }
  }
  Hnu() {
    var e = this.Nvr.DS_.T51;
    var i = this.Nvr.DS_.b51;
    this.GetText(4).SetText(e.toString());
    this.GetText(5).SetText(i.toString());
    this.GetItem(3).SetUIActive(e !== i);
    this.GetText(2).SetText(e.toString());
    var i = this.Nvr.DS_.HHn;
    var t = this.Nvr.DS_.R51;
    var s = StringUtils_1.StringUtils.Format("EXP+{0}", i.toString());
    this.GetText(8).SetText(s);
    this.GetText(8).SetUIActive(i > 0);
    var s = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelConfig(e, this.Nvr.dGm);
    var i = Math.max(t - i, 0) - s.ExpNeed;
    var s = s.ExpNext;
    this.GetSprite(16).SetFillAmount(i / s);
    this.GetSprite(10).SetFillAmount(0);
    this.GetSprite(17).SetFillAmount(0);
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterTitleIdByLevel(e, this.Nvr.dGm);
    var s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(i).Name;
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(7), s);
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterExpNextNeed(this.Nvr.dGm);
    var i = StringUtils_1.StringUtils.Format("{0}/{1}", t.toString(), e.toString());
    this.GetText(9).SetText(i);
  }
  $nu() {
    var e = this.Nvr.DS_.T51;
    var i = this.Nvr.DS_.b51;
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetPointsItemId(this.Nvr.dGm);
    var s = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t);
    let h = 0;
    for (const n of this.Nvr.DS_.DS_) {
      if (n.L8n === t) {
        h = n.m9n;
      }
    }
    var r = s - h;
    var a = h >= 0 ? "+" + h.toString() : h.toString();
    this.GetText(14).SetText(r.toString());
    this.GetText(18).SetText(a);
    this.GetText(15).SetText(s.toString());
    this.GetItem(13).SetUIActive(h !== 0);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(12), PhantomArenaDefine_1.TEXT_RESULT_LEVEL_SKILL_DESC, i);
    this.GetItem(11).SetUIActive(e !== i);
  }
  Gau() {
    var i = this.Nvr.DS_.HHn;
    if (!(i <= 0)) {
      var i = this.Nvr.DS_.T51;
      var t = this.Nvr.DS_.b51;
      var s = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelConfig(t, this.Nvr.dGm);
      var s = (this.Nvr.DS_.R51 - s.ExpNeed) / s.ExpNext;
      let e = t - i + 1;
      if (e > 2) {
        e = 2;
      }
      if (s >= 1) {
        e = 1;
      }
      this.Oau.PlayExpTween(e, s, 0, 12);
    }
  }
  N3u() {
    if (this.Nvr.DS_.T51 !== this.Nvr.DS_.b51) {
      this.UiViewSequence.PlaySequence("Unlock");
    }
  }
  $pu() {
    var e = this.Nvr.DS_.T51;
    var i = this.Nvr.DS_.b51;
    if (ModelManager_1.ModelManager.PhantomArenaModel.GetMasterTitleIdByLevel(e, this.Nvr.dGm) !== ModelManager_1.ModelManager.PhantomArenaModel.GetMasterTitleIdByLevel(i, this.Nvr.dGm)) {
      this.UiViewSequence.PlaySequence("NameChange");
    }
  }
}
exports.PhantomArenaBattleResultView = PhantomArenaBattleResultView;
//# sourceMappingURL=PhantomArenaBattleResultView.js.map