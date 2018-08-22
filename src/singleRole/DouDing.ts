class DouDing extends eui.Component {
    constructor(){
        super();
        this.createDoudingSkin();
    }
    public doudingSkin:DoudingSkin;
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();
        this.setInitJumperData();
       
	}
    public jumpMaxHeight:number; //跳跃的最高高度,
    public jumpStartY:number;  // 起跳的高度
    public jumpDistance:number; // 正常跳跃时的路程

    public nowUpAddSpeed:number;  // 上升的加速度
	public nowDownAddSpeed:number; // 下落的加速度
    public nowSpeed:number; // 现在的速度
    public frameNum:number=40; // 帧率，控制速度
	public isDown:boolean=false; // 判断是下落还是上升状态
	public speedX:number=0;  // 左右移动的增量

    public isJumperTopStop:boolean=false; // 判断是否跳跃到最高点，轮到跳板运动
    public missDiastance:Object;  // 偏差值
    public douDingJumperMeter:number = 0;  // 豆丁跳跃累计的像素值
    public isStopCaulteScore:boolean = false;  // 是否停止累计分数
    public isWearSpringShoes:boolean = false;  // 是否正在穿弹簧鞋
    public isLauching:boolean = false;  // 是否正在发射子弹

    public orientation:egret.DeviceOrientation; // 常规H5的重力感应事件

    public SIDE_STATUS:string='left';
    public JUMP_UP_STATUS:string='jump_up';
    public JUMP_DOWN_STATUS:string='jump_down';

    public JUMP_UP:string='jump_up';
    public JUMP_FACE_UP:string='jump_face_up';
    public WING_UP:string = 'wing_up';
    public SPRINGSHOE_UP:string = 'springshoe_up';
    public SPRINGSHOE_FACE_UP:string = 'springshoe_face_up';
    public ROCKET_UP:string = 'rocket_up';


    public JUMP_DOWN:string='jump_down';
    public SPRINGSHOE_DOWM:string='springshoe_down';
    public SPRINGSHOE_FACE_DOWN:string='springshoe_face_down';
    public JUMP_FACE_DOWN:string = 'jump_face_down';


    public SIDE_LEFT='left';
    public SIDE_RIGHT='right';

    /**
	 * 创建豆丁皮肤
	 */
    public createDoudingSkin(){
        this.doudingSkin = new DoudingSkin('jump_up','left');
        this.addChild(this.doudingSkin);
        this.width = this.doudingSkin.width;
        this.height = this.doudingSkin.height;
        this.setPlayerSkewXY();
    }
    public setInitJumperData(){
        this.jumpMaxHeight = this.stage.$stageHeight*0.6;
		this.jumpDistance = this.stage.$stageHeight*0.4;
		this.jumpStartY = this.stage.$stageHeight;
        this.setStartJumpeSpeed(this.jumpDistance,this.frameNum);
		this.setDownAddSpeed(this.jumpDistance,this.frameNum);
    }
    /**
	 * 设置豆丁的锚点
	 */
    public setPlayerSkewXY() {
		this.anchorOffsetX  = this.width/2;
		this.anchorOffsetY  = this.height/2;
	}
    /**
	 * 设置向下的加速度
	 */
	public setDownAddSpeed(jumpStickDistan,frame) {
		let moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
		this.nowDownAddSpeed = moveX;
	}
    /**
	 * 	设置豆丁的跳跃速度
	*/
	public setStartJumpeSpeed(jumpStickDistan,frame) {
		let moveX = Math.abs(jumpStickDistan) * 2 / (frame * (frame + 1));
		this.nowUpAddSpeed = moveX;
		this.nowSpeed = moveX * frame;
	}
    /**
     * 设置豆丁左右的状态值
     */
    public setSideStatus(sideString){
        switch(sideString){
            case this.SIDE_LEFT:
            this.SIDE_STATUS = this.SIDE_LEFT;
            break;
            case this.SIDE_RIGHT: 
            this.SIDE_STATUS = this.SIDE_RIGHT;
            break;
            default:
            this.SIDE_STATUS = this.SIDE_LEFT;
        }
    }

    /**
     * 设置豆丁跳起的皮肤状态
     */

    public setSkinUpStatus(skinUpType){
        switch(skinUpType){
            case this.WING_UP:
            this.JUMP_UP_STATUS = this.WING_UP;
            break;
            case this.SPRINGSHOE_FACE_UP:
            this.JUMP_UP_STATUS = this.SPRINGSHOE_FACE_UP;
            break;
            case this.SPRINGSHOE_UP:
            this.JUMP_UP_STATUS = this.SPRINGSHOE_UP;
            break;
            case this.JUMP_FACE_UP:
            this.JUMP_UP_STATUS = this.JUMP_FACE_UP;
            break;
            case this.ROCKET_UP:
            this.JUMP_UP_STATUS = this.ROCKET_UP;
            break;
            default:
            this.JUMP_UP_STATUS = this.JUMP_UP;
        }
    }

    /**
     * 设置豆丁蹲下的皮肤状态
     */
    public setSkinDownStatus(skinDownType){
        switch(skinDownType){
            case this.SPRINGSHOE_DOWM:
            this.JUMP_DOWN_STATUS = this.SPRINGSHOE_DOWM;
            break;
            case this.SPRINGSHOE_FACE_DOWN:
            this.JUMP_DOWN_STATUS = this.SPRINGSHOE_FACE_DOWN;
            break;
            case this.JUMP_FACE_DOWN:
            this.JUMP_DOWN_STATUS = this.JUMP_FACE_DOWN;
            break;
            default:
            this.JUMP_DOWN_STATUS = this.JUMP_DOWN;

        }
    }

    /**
     * 改变豆丁的皮肤
     */
    public changeDouDingSkin(isHting:boolean){
        if(isHting) {
            this.doudingSkin.changeBaseImg2(this.JUMP_UP_STATUS,this.SIDE_STATUS);
        }else {
            this.doudingSkin.changeBaseImg2(this.JUMP_DOWN_STATUS,this.SIDE_STATUS);
            setTimeout(()=>{
                this.doudingSkin.changeBaseImg2(this.JUMP_UP_STATUS,this.SIDE_STATUS);
			}, 100);
        }
    }

    /**
     * 豆丁Y轴移动
     */
    public movePlayerY() {
		if (this.nowSpeed < 0) {
			this.isDown = true;
			this.nowSpeed = this.nowSpeed - this.nowDownAddSpeed;
		} else {
			this.isDown = false;
			this.nowSpeed = this.nowSpeed - this.nowUpAddSpeed;
		}
		if(!this.isDown&& this.$y>this.jumpMaxHeight||this.isDown) {
			this.$y = this.$y - this.nowSpeed;
			this.isJumperTopStop = false;
		}else {
			this.isJumperTopStop = true;
			if(!this.isStopCaulteScore) {
				this.douDingJumperMeter = this.douDingJumperMeter + this.nowSpeed;
			}
		}
        this.checkDoudingIsOverMaxHeight();
        this.changeDownSkin();

	}
    /**
     * 检查是否是下落状态，下落状态时需要检查豆丁处于什么状态
     */
    private changeDownSkin(){
        if(this.isDown) {
            if(this.isLauching) {
                if(this.isWearSpringShoes) {
                    this.setSkinDownStatus(this.SPRINGSHOE_FACE_DOWN);
                    this.setSkinUpStatus(this.SPRINGSHOE_FACE_UP);
                }else {
                    this.setSkinDownStatus(this.JUMP_FACE_DOWN);
                    this.setSkinUpStatus(this.JUMP_FACE_UP);
                }
            }else {
                if(this.isWearSpringShoes) {
                    this.setSkinDownStatus(this.SPRINGSHOE_DOWM);
                    this.setSkinUpStatus(this.SPRINGSHOE_UP);
                }else {
                    this.setSkinDownStatus(this.JUMP_DOWN);
                    this.setSkinUpStatus(this.JUMP_UP);
                }
            }
		
			this.changeDouDingSkin(true);
		}
    }
    /**
     * 检查豆丁是否超过最高点，是的话就停住，转变状态为跳板移动
     */
    private checkDoudingIsOverMaxHeight(){
        if(!this.isDown&& this.$y>this.jumpMaxHeight||this.isDown) {
			this.$y = this.$y - this.nowSpeed;
			this.isJumperTopStop = false;
		}else {
			this.isJumperTopStop = true;
            this.calculateDouDingMeter();
		
		}
    }
     /**
     * 检查是否继续计算豆丁运动累计的像素
     */
    private calculateDouDingMeter(){
        if(!this.isStopCaulteScore) {
            this.douDingJumperMeter = this.douDingJumperMeter + this.nowSpeed;
        }
    }
    /**
     * 重力感应事件
     */
    public orientationEvent() {
		let _self = this;
		try{
			if (wx && wx.onAccelerometerChange) {
				wx.onAccelerometerChange(this.handleFuncWx.bind(this));
			}
		}catch(err){
			this.orientation = new egret.DeviceOrientation();
			//添加事件监听器
			this.orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
			this.orientation.start();
			document.addEventListener('keydown',(event:KeyboardEvent)=>{
				console.log(event.keyCode);
				switch(event.keyCode) {
					case 65:
					this.setSideStatus(this.SIDE_LEFT);
					this.speedX = -5;
					break;
					case 68:
					this.setSideStatus(this.SIDE_RIGHT);
					this.speedX = 5;
					break;
				}
			})
		}

	}
    /**
     * 常规H5重力感应监听事件所要做的事情
     */
    private onOrientation(e:egret.OrientationEvent){
		let stage = this.stage;
		if(!stage) {
			return false;
		}
		if (e.gamma >= 0) {  // 向右
			this.setSideStatus(this.SIDE_RIGHT);
		} else if (e.gamma< 0) {  // 向左
			this.setSideStatus(this.SIDE_LEFT);
		} 
		this.changeDouDingSkin(true);
		this.speedX =Math.sin(e.gamma*(Math.PI/180))*this.stage.$stageWidth/22;
		// console.log('左右移动',Math.sin(e.gamma*(Math.PI/180)));
    }
    /**
     * 微信重力感应监听事件所要做的事情
     */
	private handleFuncWx(res) {
		let stage = this.stage;
		if(!stage) {
			return false;
		}
		if (res.x >= 0) {  // 向右
			this.setSideStatus(this.SIDE_RIGHT);
		} else if (res.x < 0) {  // 向左
			this.setSideStatus(this.SIDE_LEFT);
		} 
		this.speedX = Math.sin(res.x * Math.PI / 2) * this.stage.$stageWidth/22;
		this.changeDouDingSkin(true);
	}
    /**
     * 左右移动
     */
	public moveplayerX() {
		this.$x = this.$x + this.speedX;
		if (this.$x < -this.width) {
			this.$x = this.stage.$stageWidth;
		} else if (this.$x > this.stage.$stageWidth) {
			this.$x = -this.width;
		}
	}
}