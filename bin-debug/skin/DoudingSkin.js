var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var DoudingSkin = (function (_super) {
    __extends(DoudingSkin, _super);
    function DoudingSkin(skinObjName, sideName) {
        var _this = _super.call(this) || this;
        _this.skinList = {
            'default': {
                'jump_up': {
                    'left': 'bean_left_normal_png',
                    'right': 'bean_right_normal_png',
                },
                'jump_down': {
                    left: 'bean_left_normal_down_png',
                    right: 'bean_right_normal_down_png',
                },
                'jump_face_up': {
                    left: 'bean_face_normal_png',
                    right: 'bean_face_normal_png'
                },
                'jump_face_down': {
                    left: 'bean_face_normal_down_png',
                    right: 'bean_face_normal_down_png'
                },
                'wing_up': {
                    left: 'bean_left_wing_default_png',
                    right: 'bean_right_wing_default_png'
                },
                'rocket_up': {
                    left: 'bean_rocket_default_png',
                    right: 'bean_rocket_default_png'
                },
                'springshoe_up': {
                    left: 'bean_left_spring_up_normal_png',
                    right: 'bean_right_spring_up_normal_png'
                },
                'springshoe_down': {
                    left: 'bean_left_spring_down_normal_png',
                    right: 'bean_right_spring_down_normal_png'
                },
                'springshoe_face_up': {
                    left: 'bean_face_spring_up_normal_png',
                    right: 'bean_face_spring_up_normal_png'
                },
                'springshoe_face_down': {
                    left: 'bean_face_spring_down_normal_png',
                    right: 'bean_face_spring_down_normal_png'
                }
            }
        };
        // console.log('123');
        _this.createSkinImg2(skinObjName, sideName);
        return _this;
    }
    return DoudingSkin;
}(BaseSkin));
__reflect(DoudingSkin.prototype, "DoudingSkin");
//# sourceMappingURL=DoudingSkin.js.map