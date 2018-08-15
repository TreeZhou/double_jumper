class StagePropClass extends BasePage{
 	public constructor() {
		super();
	}

	public TYPE_STAUTS:string="trampoline";
	public TYPE_SPRING:string="spring";  // 弹簧
	public TYPE_TRAMPOLINE:string="trampoline";  // 弹簧床
	public TYPE_SPRING_SHOE:string="springShoe"; // 弹簧鞋
	public TYPE_BAMBOO_FLY:string="bambooFly";  // 竹蜻蜓
	public TYPE_ROCKET_SHIP:string="rocketShip";  // 火箭飞行器
	public TYPE_PROTECTION_COVER:string="protectionCover";  // 保护罩
	public TYPE_DIAMOND:string="diamond"; // 钻石
	public TYPE_MOREONE_LIFE:string="moreOneLife";  // 更多一条命



	private skinPropData:Object;

    protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();
		this.setSkinPropData();

	}

	private setSkinPropData() {
		let self = this;
		this.skinPropData = {
			'normal':{
				'trampoline': Trampoline,
				'bambooFly': WingProp,
				'rocketShip':RocketProp
			}
		}
	}
	public setTypeStatus(keyValue){
		this.TYPE_STAUTS = keyValue;
	}
	public addPropToStage(stageBox:eui.Group,referStick:StickItem) {
		let item = this.skinPropData[this.COLOR_STATUS][this.TYPE_STAUTS];
		let propsItem = new item();

		// debugger;
		stageBox.addChild(propsItem);
		propsItem.$x = this.setPropsX(propsItem,referStick);
		propsItem.$y = referStick.$y-propsItem.height;
		return propsItem;
	}
	private setPropsX(propsItem,referStick) {
		let randomNum = Math.random();
		let itemX =0;
		if(randomNum>0.5) {
			itemX = referStick.$x+10;
		}else {
			itemX = referStick.$x+referStick.width-propsItem.width-10;
		}

		return itemX;
	}

}