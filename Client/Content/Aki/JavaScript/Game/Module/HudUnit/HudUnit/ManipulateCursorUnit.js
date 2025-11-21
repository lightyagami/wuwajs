"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManipulateCursorUnit = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Time_1 = require("../../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 300;
const RAD_2_DEG = 180 / Math.PI;
class ManipulateCursorUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.zti = new UE.Rotator();
    this.Dmt = undefined;
    this.Zti = undefined;
    this.eii = undefined;
    this.Qtt = undefined;
    this.mct = undefined;
    this.tii = undefined;
    this._at = undefined;
    this.$ti = undefined;
    this.dce = false;
    this.iii = 0;
    this.oii = 0;
    this.rii = false;
    this.xst = undefined;
    this.V7l = undefined;
    this.j7l = 0;
    this.nii = () => {
      this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME);
      this.mct?.SetUIActive(false);
      this.PlayTweenAnim(12);
    };
    this.dat = () => {
      this._at = undefined;
      this.$ti?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UINiagara], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([13, UE.UIItem]);
    }
  }
  OnStart() {}
  async OnBeforeStartAsync() {
    var i;
    this.eii = this.GetItem(2);
    this.mct = this.GetItem(3);
    this.tii = this.GetSprite(4);
    if (Info_1.Info.IsInTouch()) {
      this.Dmt = this.GetSprite(0);
      this.Zti = this.GetSprite(1);
      this.Dmt.SetUIActive(true);
      this.Zti.SetUIActive(false);
    } else if (i = this.GetItem(13)) {
      this.Qtt = new CombineKeyItem_1.CombineKeyItem();
      this.Qtt.SkipDestroyActor = true;
      await this.Qtt.CreateThenShowByActorAsync(i.GetOwner());
      this.SetKeyAction(InputMappingsDefine_1.actionMappings.幻象1);
    }
    this.Qnt();
    this.Appear();
    if (this.iii > 0) {
      this.mct?.SetUIActive(true);
    }
  }
  OnBeforeDestroy() {
    this.Jti();
    if (this.xst && this.V7l && this.Dmt) {
      this.Dmt.SetSprite(this.V7l, false);
    }
    this.xst = undefined;
    this.V7l = undefined;
    this.Dmt = undefined;
    this.Zti = undefined;
    this.eii = undefined;
    if (this.Qtt) {
      this.Qtt.Destroy();
      this.Qtt = undefined;
    }
    this.mct = undefined;
    this.tii = undefined;
    this.$ti = undefined;
    if (this.j7l !== 0) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.j7l);
      this.j7l = 0;
    }
    super.OnBeforeDestroy();
  }
  Refresh(i, t, s) {
    this.sii();
    this.zti.Yaw = Math.atan2(t.Y, t.X) * RAD_2_DEG - 90;
    this.zti.Roll = 0;
    this.zti.Pitch = 0;
    i = !i;
    if (this.eii.IsUIActiveInHierarchy() !== i) {
      this.eii.SetUIActive(i);
    }
    if (i) {
      this.eii.SetUIRelativeRotation(this.zti);
    }
    this.SetAnchorOffset(t.X, t.Y);
    this.aii(s);
  }
  aii(i) {
    if (this.rii !== i) {
      this.rii = i;
      if (Info_1.Info.OperationType === 2) {
        if (i) {
          this.SetKeyAction(InputMappingsDefine_1.actionMappings.攻击);
        } else {
          this.SetKeyAction(InputMappingsDefine_1.actionMappings.幻象1);
        }
      } else {
        this.Dmt.SetUIActive(!i);
        this.Zti.SetUIActive(i);
      }
    }
  }
  SetIconPath(t) {
    if (this.Dmt && this.xst !== t) {
      if (this.xst === undefined && this.V7l === undefined) {
        this.V7l = this.Dmt.GetSprite();
      }
      this.xst = t;
      if (this.j7l !== 0) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.j7l);
        this.j7l = 0;
      }
      if (t === undefined) {
        this.Dmt.SetSprite(this.V7l, false);
        this.Dmt.SetUIActive(true);
      } else {
        this.Dmt.SetUIActive(false);
        this.j7l = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LGUISpriteData_BaseObject, i => {
          if (this.Dmt && this.xst === t && i) {
            this.Dmt.SetSprite(i, false);
            this.Dmt.SetUIActive(true);
          }
        }, 103, this.MemoryTag);
      }
    }
  }
  SetKeyAction(i) {
    this.Qtt?.RefreshAction(i);
  }
  StartProcess(i) {
    this.mct?.SetUIActive(true);
    this.hii(0);
    this.iii = i > 0 ? 1 / (i * TimeUtil_1.TimeUtil.InverseMillisecond) : 0;
    this.oii = Time_1.Time.WorldTime;
  }
  EndProcess(i) {
    this.StopProcessAnim();
    this.iii = 0;
    if (i) {
      this.hii(0);
    }
  }
  sii() {
    var i;
    if (!(this.iii <= 0)) {
      i = Time_1.Time.WorldTime;
      i = Math.min((i - this.oii) * this.iii, 1);
      this.hii(i);
    }
  }
  hii(i) {
    this.tii?.SetFillAmount(i);
  }
  PlayActivateEffect() {
    var i = this.GetUiNiagara(6);
    i.SetUIActive(true);
    i.ActivateSystem(true);
  }
  Qnt() {
    this.InitTweenAnim(7);
    this.InitTweenAnim(8);
    this.InitTweenAnim(9);
    this.InitTweenAnim(10);
    this.InitTweenAnim(12);
  }
  Appear() {
    this.dce = true;
    this.Jti();
    if (!this.InAsyncLoading()) {
      this.Dmt?.SetAlpha(1);
      this.Zti?.SetAlpha(1);
      this.eii?.SetAlpha(1);
    }
  }
  PlayStartAnim() {
    if (this.dce) {
      this.PlayTweenAnim(7);
    }
  }
  PlayCompleteAnim() {
    if (this.dce) {
      this.PlayTweenAnim(9);
    }
  }
  PlayInterruptedAnim() {
    if (this.dce) {
      this.PlayTweenAnim(10);
    }
  }
  PlayProcessAnim() {
    if (this.dce) {
      this.PlayTweenAnim(8);
    }
  }
  StopProcessAnim() {
    if (this.dce) {
      this.StopTweenAnim(8);
    }
  }
  PlayCloseAnim(i) {
    if (this.dce) {
      this.dce = false;
      this.Jti();
      if (this.InAsyncLoading()) {
        this.$ti?.();
      } else if (i > TimerSystem_1.MIN_TIME) {
        this._at = TimerSystem_1.TimerSystem.Delay(this.nii, i);
      } else {
        this.dat();
      }
    }
  }
  StopCloseAnim() {
    this.Jti();
    this.mct?.SetUIActive(false);
    this.StopTweenAnim(12);
  }
  Jti() {
    if (this._at) {
      TimerSystem_1.TimerSystem.Remove(this._at);
      this._at = undefined;
    }
  }
  SetCloseAnimCallback(i) {
    this.$ti = i;
  }
}
exports.ManipulateCursorUnit = ManipulateCursorUnit;
//# sourceMappingURL=ManipulateCursorUnit.js.map