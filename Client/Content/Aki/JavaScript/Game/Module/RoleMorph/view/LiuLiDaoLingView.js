"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LiuLiDaoLingView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../Input/InputEnums");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const LiuLiDaoLingSkillItem_1 = require("./LiuLiDaoLingSkillItem");
class LiuLiDaoLingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.det = [];
    this.f1c = i => {
      for (let e = 0; e < this.det.length; e++) {
        if (e !== i) {
          this.det[e].Press(false);
        }
      }
    };
    this.bMe = (e, i) => {
      if (Info_1.Info.IsInGamepad()) {
        var t = i === 0;
        switch (e) {
          case InputMappingsDefine_1.actionMappings.Ui方向左:
            this.det[0].Press(t);
            break;
          case InputMappingsDefine_1.actionMappings.Ui方向右:
            this.det[1].Press(t);
            break;
          case InputMappingsDefine_1.actionMappings.Ui方向上:
            this.det[2].Press(t);
            break;
          case InputMappingsDefine_1.actionMappings.Ui方向下:
            this.det[3].Press(t);
        }
      }
    };
    this.Etl = (e, i) => {
      if (e === 2) {
        this.Zhc();
      }
    };
    this.Fc_ = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChallengeAgain, InputMappingsDefine_1.actionMappings.重新挑战);
    };
    this.I5t = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChallengeAgain, InputMappingsDefine_1.actionMappings.玩法放弃);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.Fc_], [6, this.I5t]];
  }
  async OnBeforeStartAsync() {
    await this.NewAllSkillItems();
    this.Cet();
  }
  async NewAllSkillItems() {
    if (!Info_1.Info.IsInTouch()) {
      this.GetItem(0).SetUIActive(false);
    }
    var e = [this.GetItem(1).GetOwner(), this.GetItem(2).GetOwner(), this.GetItem(3).GetOwner(), this.GetItem(4).GetOwner()];
    await Promise.all(e.map(async (e, i) => this.fet(e, i)));
  }
  async fet(e, i) {
    var t = new LiuLiDaoLingSkillItem_1.LiuLiDaoLingSkillItem();
    await t.CreateThenShowByActorAsync(e, i);
    this.det.push(t);
    return t;
  }
  Cet() {
    this.det[0].RefreshByMoveType(0, InputEnums_1.EInputAxis.MoveRight, -1, this.f1c);
    this.det[1].RefreshByMoveType(1, InputEnums_1.EInputAxis.MoveRight, 1, this.f1c);
    this.det[2].RefreshByMoveType(2, InputEnums_1.EInputAxis.MoveForward, 1, this.f1c);
    this.det[3].RefreshByMoveType(3, InputEnums_1.EInputAxis.MoveForward, -1, this.f1c);
  }
  OnAddEventListener() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.Ui方向上, InputMappingsDefine_1.actionMappings.Ui方向下, InputMappingsDefine_1.actionMappings.Ui方向左, InputMappingsDefine_1.actionMappings.Ui方向右], this.bMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
  }
  OnRemoveEventListener() {
    this.Zhc();
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.Ui方向上, InputMappingsDefine_1.actionMappings.Ui方向下, InputMappingsDefine_1.actionMappings.Ui方向左, InputMappingsDefine_1.actionMappings.Ui方向右], this.bMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
  }
  OnBeforeDestroy() {
    for (const e of this.det) {
      e.Destroy();
    }
    this.det.length = 0;
  }
  Zhc() {
    for (const e of this.det) {
      e.Press(false);
    }
  }
  OnTick(e) {
    for (const i of this.det) {
      i.Tick(e);
    }
  }
}
exports.LiuLiDaoLingView = LiuLiDaoLingView;
//# sourceMappingURL=LiuLiDaoLingView.js.map