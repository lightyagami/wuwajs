"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueGeneralObtainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SurvivorsRogueCardObtainItem_1 = require("../../Card/SurvivorsRogueCardObtainItem");
const SurvivorsRogueViewBase_1 = require("./Components/SurvivorsRogueViewBase");
class SurvivorsRogueGeneralObtainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CommandIncId = 0;
    this.Command = undefined;
    this.CardList = undefined;
    this.cbd = undefined;
    this.dbd = undefined;
    this.mbd = 0;
    this.OnGoodsSelected = undefined;
    this.OnSeqStartFinished = undefined;
    this.L1i = () => {
      if (this.dbd) {
        switch (this.dbd.ChooseData.ObtainMode) {
          case 0:
            this.Command.SelectIds = [this.mbd];
            break;
          case 1:
            var i = this.dbd.GoodsList.map(i => i.fEd.w5n);
            this.Command.SelectIds = i;
        }
        this.Command.Execute();
      }
    };
    this.TFd = () => {
      this.OnSeqStartFinished?.();
    };
    this.Y5i = () => {
      var i = new SurvivorsRogueCardObtainItem_1.SurvivorsRogueCardObtainItem();
      i.BindOnStateChangeCallback(this.fbd);
      i.BindOnCanExecuteChangeCallback(this.LPt);
      return i;
    };
    this.fbd = (i, e) => {
      if (e === 1) {
        this.gbd(true);
      }
      this.Cbd();
      if (this.dbd.ChooseData.ObtainMode === 0) {
        this.mbd = i.IncId ?? 0;
        this.OnGoodsSelected?.(this.mbd, true);
      }
    };
    this.LPt = (i, e) => {
      if (this.dbd) {
        switch (this.dbd.ChooseData.ObtainMode) {
          case 0:
            return e !== 1;
          case 1:
            return false;
        }
      }
      return false;
    };
    this.pbd = i => {
      var e = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue.GetCommandByIncId(i);
      if (e) {
        switch (e.Type) {
          case 0:
          case 1:
          case 2:
          case 6:
            this.Command.BindView(undefined);
            this.OnGoodsSelected = undefined;
            this.OnSeqStartFinished = undefined;
            this.CommandIncId = i;
            this.Command = e;
            this.Refresh();
            this.Command.BindView(this);
            if (this.UiViewSequence.HasSequenceNameInPlaying("Switch")) {
              this.UiViewSequence.ReplaySequence("Switch");
            } else {
              this.UiViewSequence.PlaySequence("Switch");
            }
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText]];
    this.BtnBindInfo = [[3, this.L1i]];
  }
  CloseView() {
    this.CloseMe();
  }
  async OnBeforeStartAsync() {
    var i;
    this.CommandIncId = this.OpenParam.CommandIncId;
    if (this.CommandIncId) {
      if (!(i = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue.GetCommandByIncId(this.CommandIncId)) || (this.Command = i, i = [], this.CardList = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.Y5i, undefined, true), this.cbd = new SurvivorsRogueViewBase_1.SurvivorsRogueViewBase(), i.push(this.cbd.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())), await Promise.all(i), await this.Z$1(), this.Command.AfterDelete)) {
        this.CloseMe();
      } else {
        this.Command.BindView(this);
        this.UiViewSequence.AddSequenceFinishEvent("Start", this.TFd);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 界面打开时缺少CommandIncId");
    }
  }
  OnBeforeCreate() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRebindCommandView, this.pbd);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRebindCommandView, this.pbd);
  }
  OnBeforeDestroy() {
    this.Command?.BindView(undefined);
  }
  Cbd() {
    if (this.mbd) {
      this.CardList.GetLayoutItemByKey(this.mbd)?.SetSelected(false, false, true);
      this.OnGoodsSelected?.(this.mbd, false);
    }
    this.mbd = 0;
  }
  gbd(i) {
    this.GetButton(3).SetSelfInteractive(i);
  }
  Refresh() {
    var i = new UiAsyncTask_1.UiAsyncTask("SurvivorsRogueGeneralObtainView.Refresh", async () => {
      await this.OpenPromise?.Promise;
      await this.Z$1();
    });
    this.RunAsyncTask(i);
  }
  GetRoleStatePanel() {
    return this.cbd.RoleStatePanel;
  }
  async Z$1() {
    var i = this.Command.GetViewInfo();
    if (i) {
      this.dbd = i;
      this.cbd.SetMainTitle(i.TitleId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.ButtonId);
      await this.CardList.RefreshByDataAsync(i.GoodsList);
      switch (this.dbd.ChooseData.ObtainMode) {
        case 0:
          this.gbd(false);
          break;
        case 1:
          this.gbd(true);
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length !== 0 && i[0] === "WeaponEvolve") {
      return this.CardList?.GetLayoutItemByIndex(0)?.GetGuideUiItemAndUiItemForShowEx(i);
    } else {
      return undefined;
    }
  }
}
exports.SurvivorsRogueGeneralObtainView = SurvivorsRogueGeneralObtainView;
//# sourceMappingURL=SurvivorsRogueGeneralObtainView.js.map