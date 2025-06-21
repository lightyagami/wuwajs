"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleResultView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  ExpTweenComponent_1 = require("../../../Common/ExpTween/ExpTweenComponent"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaBattleResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Mru = void 0, this.Nvr = void 0, this.eiu = void 0, this.Iau = () => {
      this.Iru(), this.fgu(), this.O_u()
    }, this.q_u = (e, i) => {
      var t = this.Nvr.DS_.$61;
      "Unlock" === e && "LevelChange" === i ? this.GetText(2).SetText(t.toString()) : "NameChange" === e && "NameChange" === i && (e = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterTitleIdByLevel(t), i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(e).Name, LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(7), i))
    }, this.I5t = () => {
      this.CloseMe(this.eiu)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UISprite],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIText],
      [16, UE.UISprite],
      [17, UE.UISprite],
      [18, UE.UIText]
    ], this.BtnBindInfo = [
      [1, this.I5t]
    ]
  }
  OnStart() {
    var e = this.OpenParam;
    this.Nvr = e.Result, this.Nvr.DS_ || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "结算页数据为空"), this.eiu = e.CallbackOnClose, this.Mru = new ExpTweenComponent_1.ExpTweenComponent(this.GetSprite(16), this.GetSprite(10), this.GetSprite(17), void 0)
  }
  OnBeforeShow() {
    this.pO()
  }
  OnAfterShow() {
    var e = this.Nvr?.Ax1 ? "Success" : "Fail";
    this.UiViewSequence.AddSequenceFinishEvent(e, this.Iau), this.RootActor.OnSequencePlayEvent.Bind(this.q_u), this.UiViewSequence.PlaySequence(e)
  }
  OnBeforeDestroy() {
    this.RootActor.OnSequencePlayEvent.Unbind();
    var e = this.Nvr?.Ax1 ? "Success" : "Fail";
    this.UiViewSequence.RemoveSequenceFinishEvent(e, this.Iau)
  }
  pO() {
    this.tiu(), this.iiu(), this.riu()
  }
  tiu() {
    var e = this.Nvr?.Ax1 ? "GenericPromptTypes_3_GeneralText" : "GenericPromptTypes_4_GeneralText";
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(0), e)
  }
  iiu() {
    var e = this.Nvr.DS_.H61,
      i = this.Nvr.DS_.$61,
      i = (this.GetText(4).SetText(e.toString()), this.GetText(5).SetText(i.toString()), this.GetItem(3).SetUIActive(e !== i), this.GetText(2).SetText(e.toString()), this.Nvr.DS_.HHn),
      t = this.Nvr.DS_.W61,
      s = StringUtils_1.StringUtils.Format("EXP+{0}", i.toString()),
      s = (this.GetText(8).SetText(s), this.GetText(8).SetUIActive(0 < i), ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelConfig(e)),
      i = Math.max(t - i, 0) - s.ExpNeed,
      s = s.ExpNext,
      i = (this.GetSprite(16).SetFillAmount(i / s), this.GetSprite(10).SetFillAmount(0), this.GetSprite(17).SetFillAmount(0), ModelManager_1.ModelManager.PhantomArenaModel.GetMasterTitleIdByLevel(e)),
      s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(i).Name,
      e = (LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(7), s), ModelManager_1.ModelManager.PhantomArenaModel.GetMasterExpNextNeed()),
      i = StringUtils_1.StringUtils.Format("{0}/{1}", t.toString(), e.toString());
    this.GetText(9).SetText(i)
  }
  riu() {
    var e = this.Nvr.DS_.H61,
      i = this.Nvr.DS_.$61,
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetPointsItemId(),
      s = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t);
    let h = 0;
    for (const n of this.Nvr.DS_.DS_) n.L8n === t && (h = n.m9n);
    var r = s - h,
      a = 0 <= h ? "+" + h.toString() : h.toString();
    this.GetText(14).SetText(r.toString()), this.GetText(18).SetText(a), this.GetText(15).SetText(s.toString()), this.GetItem(13).SetUIActive(0 !== h), LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(12), PhantomArenaDefine_1.TEXT_RESULT_LEVEL_SKILL_DESC, i), this.GetItem(11).SetUIActive(e !== i)
  }
  Iru() {
    var i = this.Nvr.DS_.HHn;
    if (!(i <= 0)) {
      var i = this.Nvr.DS_.H61,
        t = this.Nvr.DS_.$61,
        s = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelConfig(t),
        s = (this.Nvr.DS_.W61 - s.ExpNeed) / s.ExpNext;
      let e = t - i + 1;
      2 < e && (e = 2), 1 <= s && (e = 1), this.Mru.PlayExpTween(e, s, 0, 12)
    }
  }
  fgu() {
    this.Nvr.DS_.H61 !== this.Nvr.DS_.$61 && this.UiViewSequence.PlaySequence("Unlock")
  }
  O_u() {
    var e = this.Nvr.DS_.H61,
      i = this.Nvr.DS_.$61;
    ModelManager_1.ModelManager.PhantomArenaModel.GetMasterTitleIdByLevel(e) !== ModelManager_1.ModelManager.PhantomArenaModel.GetMasterTitleIdByLevel(i) && this.UiViewSequence.PlaySequence("NameChange")
  }
}
exports.PhantomArenaBattleResultView = PhantomArenaBattleResultView;
//# sourceMappingURL=PhantomArenaBattleResultView.js.map