class StagePropClass extends BasePage{
 	public constructor() {
		super();
	}

	public TYPE_STAUTS:string="trampoline";
	public TYPE_SPRING:string="spring";  // 弹簧
	public TYPE_TRAMPOLINE:string="trampoline";  // 弹簧床
	public TYPE_SPRING_SHOE:string="springShoe"; // 弹簧鞋
	public TYPE_BAMBOO_FLY:string="wing";  // 竹蜻蜓
	public TYPE_ROCKET_SHIP:string="rocket";  // 火箭飞行器
	public TYPE_PROTECTION_COVER:string="protectionCover";  // 保护罩
	public TYPE_DIAMOND:string="diamond"; // 钻石
	public TYPE_MOREONE_LIFE:string="moreOneLife";  // 更多一条命
	public UP_DISTANCE:number = 80;
	public DOWN_DISTANCE:number = 100;

	// public poprsObjPool:Array<any>;



	private skinPropData:Object;

	public allPropsPool:Object;

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
				'wing': WingProp,
				'rocket':RocketProp
			}
		}
		this.allPropsPool = {
			'trampoline': [],
			'wing': [],
			'rocket':[],
		}
	}
	public setTypeStatus(keyValue){
		this.TYPE_STAUTS = keyValue;
	}
	public addPropToStage(stageBox:eui.Group,referStick:StickItem) {
		let item = this.createPorps();
		stageBox.addChild(item);
		this.UP_DISTANCE= item.UP_DISTANCE;
		this.DOWN_DISTANCE = item.DOWN_DISTANCE;
		item.$x = this.setPropsX(item,referStick);
		item.$y = referStick.$y-item.height;
		return item;
	}
	private createPorps(){
		let item = this.skinPropData[this.COLOR_STATUS][this.TYPE_STAUTS];
		let propsList = this.allPropsPool[this.TYPE_STAUTS];
		if(propsList.length) {
			item = propsList[0];
			propsList.shift();
		}else {
			item= new item();
		}
		return item;
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