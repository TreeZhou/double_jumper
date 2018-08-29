class DoudingSkin extends BaseSkin {
    public constructor(skinObjName:string,sideName:string) {
		super();
        // console.log('123');
        this.createSkinImg2(skinObjName,sideName);
	}
    public skinList:Object = {
        'default':{
            'jump_up': {
                'left':'bean_left_normal_png',
                'right':'bean_right_normal_png',
            },
            'jump_down':{
                left:'bean_left_normal_down_png',
                right:'bean_right_normal_down_png',
            },
            'jump_face_up':{
                left:'bean_face_normal_png',
                right:'bean_face_normal_png'
            },
            'jump_face_down':{
                left:'bean_face_normal_down_png',
                right:'bean_face_normal_down_png'
            },
            'wing_up':{
                left:'bean_left_wing_default_png',
                right:'bean_right_wing_default_png'
            },
            'rocket_up':{
                left:'bean_rocket_default_png',
                right:'bean_rocket_default_png'
            },
            'springshoe_up':{
                left:'bean_left_spring_up_normal_png',
                right:'bean_right_spring_up_normal_png'
            },
            'springshoe_down':{
                left:'bean_left_spring_down_normal_png',
                right:'bean_right_spring_down_normal_png'
            },
            'springshoe_face_up':{
                left:'bean_face_spring_up_normal_png',
                right:'bean_face_spring_up_normal_png'
            },
            'springshoe_face_down':{
                left:'bean_face_spring_down_normal_png',
                right:'bean_face_spring_down_normal_png'
            }
        }
    }
    // public getSkinID2(skinObjName,sideName){
    //     let skinID = this.skinList[this.skinType][skinObjName][sideName];
    //     return skinID;
    // }


    // public createSkinImg2(skinObjName,sideName){
    //     let skinID = this.getSkinID2(skinObjName,sideName);
    //     this.setSkinSource(skinID);
    // }
    // public changeBaseImg2(skinObjName,sideName){
    //     let skinID = this.getSkinID2(skinObjName,sideName);
    //     this.changeSkinTexture(skinID);
    // }

  
}