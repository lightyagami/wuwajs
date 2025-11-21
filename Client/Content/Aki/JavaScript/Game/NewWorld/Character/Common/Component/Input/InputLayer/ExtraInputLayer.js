"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraInputLayer = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const InputEnums_1 = require("../../../../../../Input/InputEnums");
const InputLayer_1 = require("../../../../../../Input/InputLayer");
class ExtraInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments);
    this.Aia = undefined;
    this.Njd = false;
    this.SCm = false;
  }
  Init(s, t) {
    this.SCm = t;
    var t = s.Entity;
    var s = t.GetComponent(223);
    var e = s?.GetCharacterLoadTypeList();
    var a = s?.GetFightInfo()?.BpInputMap;
    let n = "";
    if (e && a) {
      for (const r of e) {
        var u = a.Get(r);
        if ((n = u?.AssetPathName.toString() ?? "") && n !== "None") {
          this.Njd = true;
          break;
        }
      }
    }
    if (this.Njd) {
      if (n) {
        const i = t.GetComponent(3).Actor;
        ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.Class, s => {
          this.Aia = i.AddComponentByClass(s, false, MathUtils_1.MathUtils.DefaultTransform, false);
          this.Aia.OwnerActor = i;
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 67, "[ExtraInputLayer]加载BpInput失败", ["EntityId", t.Id]);
      }
    }
  }
  Clear() {
    this.Aia = undefined;
  }
  GetLayerType() {
    return 2;
  }
  HandlePress(t, e) {
    if (this.Aia) {
      ExtraInputLayer.b0l.Start();
      let s = undefined;
      switch (t) {
        case InputEnums_1.EInputAction.跳跃:
          s = this.Aia.跳跃按下(e);
          break;
        case InputEnums_1.EInputAction.攀爬:
          s = this.Aia.攀爬按下(e);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          s = this.Aia.走跑切换按下(e);
          break;
        case InputEnums_1.EInputAction.攻击:
          s = this.Aia.攻击按下(e);
          break;
        case InputEnums_1.EInputAction.闪避:
          s = this.Aia.闪避按下(e);
          break;
        case InputEnums_1.EInputAction.技能1:
          s = this.Aia.技能1按下(e);
          break;
        case InputEnums_1.EInputAction.幻象1:
          s = this.Aia.幻象1按下(e);
          break;
        case InputEnums_1.EInputAction.大招:
          s = this.Aia.大招按下(e);
          break;
        case InputEnums_1.EInputAction.幻象2:
          s = this.Aia.幻象2按下(e);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          s = this.Aia.切换角色1按下(e);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          s = this.Aia.切换角色2按下(e);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          s = this.Aia.切换角色3按下(e);
          break;
        case InputEnums_1.EInputAction.瞄准:
          s = this.Aia.瞄准按下(e);
          break;
        case InputEnums_1.EInputAction.通用交互:
          s = this.Aia.通用交互按下(e);
      }
      ExtraInputLayer.b0l.Stop();
      if (!this.SCm || s && s.CommandType !== 0) {
        return s;
      } else {
        return ExtraInputLayer.GetSwallowCommand();
      }
    }
  }
  HandleRelease(t, e) {
    if (this.Aia) {
      ExtraInputLayer.q0l.Start();
      let s = undefined;
      switch (t) {
        case InputEnums_1.EInputAction.跳跃:
          s = this.Aia.跳跃抬起(e);
          break;
        case InputEnums_1.EInputAction.攀爬:
          s = this.Aia.攀爬抬起(e);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          s = this.Aia.走跑切换抬起(e);
          break;
        case InputEnums_1.EInputAction.攻击:
          s = this.Aia.攻击抬起(e);
          break;
        case InputEnums_1.EInputAction.闪避:
          s = this.Aia.闪避抬起(e);
          break;
        case InputEnums_1.EInputAction.技能1:
          s = this.Aia.技能1抬起(e);
          break;
        case InputEnums_1.EInputAction.幻象1:
          s = this.Aia.幻象1抬起(e);
          break;
        case InputEnums_1.EInputAction.大招:
          s = this.Aia.大招抬起(e);
          break;
        case InputEnums_1.EInputAction.幻象2:
          s = this.Aia.幻象2抬起(e);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          s = this.Aia.切换角色1抬起(e);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          s = this.Aia.切换角色2抬起(e);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          s = this.Aia.切换角色3抬起(e);
          break;
        case InputEnums_1.EInputAction.瞄准:
          s = this.Aia.瞄准抬起(e);
      }
      ExtraInputLayer.q0l.Stop();
      if (!this.SCm || s && s.CommandType !== 0) {
        return s;
      } else {
        return ExtraInputLayer.GetSwallowCommand();
      }
    }
  }
  HandleHold(t, e) {
    if (this.Aia) {
      let s = undefined;
      switch (t) {
        case InputEnums_1.EInputAction.跳跃:
          s = this.Aia.跳跃长按(e);
          break;
        case InputEnums_1.EInputAction.攀爬:
          s = this.Aia.攀爬长按(e);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          s = this.Aia.走跑切换长按(e);
          break;
        case InputEnums_1.EInputAction.攻击:
          s = this.Aia.攻击长按(e);
          break;
        case InputEnums_1.EInputAction.闪避:
          s = this.Aia.闪避长按(e);
          break;
        case InputEnums_1.EInputAction.技能1:
          s = this.Aia.技能1长按(e);
          break;
        case InputEnums_1.EInputAction.幻象1:
          s = this.Aia.幻象1长按(e);
          break;
        case InputEnums_1.EInputAction.大招:
          s = this.Aia.大招长按(e);
          break;
        case InputEnums_1.EInputAction.幻象2:
          s = this.Aia.幻象2长按(e);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          s = this.Aia.切换角色1长按(e);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          s = this.Aia.切换角色2长按(e);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          s = this.Aia.切换角色3长按(e);
          break;
        case InputEnums_1.EInputAction.锁定目标:
          s = this.Aia.锁定目标长按(e);
          break;
        case InputEnums_1.EInputAction.瞄准:
          s = this.Aia.瞄准长按(e);
      }
      if (!this.SCm || s && s.CommandType !== 0) {
        return s;
      } else {
        return ExtraInputLayer.GetSwallowCommand();
      }
    }
  }
  DispatchPressEvent(s, t) {
    if (this.Aia) {
      switch (s) {
        case InputEnums_1.EInputAction.跳跃:
          this.Aia.跳跃按下事件(t);
          break;
        case InputEnums_1.EInputAction.攀爬:
          this.Aia.攀爬按下事件(t);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          this.Aia.走跑切换按下事件(t);
          break;
        case InputEnums_1.EInputAction.攻击:
          this.Aia.攻击按下事件(t);
          break;
        case InputEnums_1.EInputAction.闪避:
          this.Aia.闪避按下事件(t);
          break;
        case InputEnums_1.EInputAction.技能1:
          this.Aia.技能1按下事件(t);
          break;
        case InputEnums_1.EInputAction.幻象1:
          this.Aia.幻象1按下事件(t);
          break;
        case InputEnums_1.EInputAction.大招:
          this.Aia.大招按下事件(t);
          break;
        case InputEnums_1.EInputAction.幻象2:
          this.Aia.幻象2按下事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          this.Aia.切换角色1按下事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          this.Aia.切换角色2按下事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          this.Aia.切换角色3按下事件(t);
          break;
        case InputEnums_1.EInputAction.锁定目标:
          this.Aia.锁定目标按下事件(t);
          break;
        case InputEnums_1.EInputAction.瞄准:
          this.Aia.瞄准按下事件(t);
      }
    }
  }
  DispatchReleaseEvent(s, t) {
    if (this.Aia) {
      switch (s) {
        case InputEnums_1.EInputAction.跳跃:
          this.Aia.跳跃抬起事件(t);
          break;
        case InputEnums_1.EInputAction.攀爬:
          this.Aia.攀爬抬起事件(t);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          this.Aia.走跑切换抬起事件(t);
          break;
        case InputEnums_1.EInputAction.攻击:
          this.Aia.攻击抬起事件(t);
          break;
        case InputEnums_1.EInputAction.闪避:
          this.Aia.闪避抬起事件(t);
          break;
        case InputEnums_1.EInputAction.技能1:
          this.Aia.技能1抬起事件(t);
          break;
        case InputEnums_1.EInputAction.幻象1:
          this.Aia.幻象1抬起事件(t);
          break;
        case InputEnums_1.EInputAction.大招:
          this.Aia.大招抬起事件(t);
          break;
        case InputEnums_1.EInputAction.幻象2:
          this.Aia.幻象2抬起事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          this.Aia.切换角色1抬起事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          this.Aia.切换角色2抬起事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          this.Aia.切换角色3抬起事件(t);
          break;
        case InputEnums_1.EInputAction.锁定目标:
          this.Aia.锁定目标抬起事件(t);
          break;
        case InputEnums_1.EInputAction.瞄准:
          this.Aia.瞄准抬起事件(t);
      }
    }
  }
  IsValid() {
    return this.Njd;
  }
}
(exports.ExtraInputLayer = ExtraInputLayer).b0l = Stats_1.Stat.Create("ExtraInputLayer.HandlePress");
ExtraInputLayer.q0l = Stats_1.Stat.Create("ExtraInputLayer.HandleRelease"); //# sourceMappingURL=ExtraInputLayer.js.map