// class MonsterProp extends BasePage{
// 	public constructor() {
// 		super();
// 	}
// 	private smallPurpleMonster:eui.Image; // 紫色小的怪物
// 	private bigGreenMonster:eui.Image; // 绿色大的怪物
// 	public TYPE_STATUS:string = 'smallMonster';
// 	public TYPE_BIG_MONSTER:string = 'bigMonster';
// 	public TYPE_SMALL_MONSTER:string = 'smallMonster';
// 	public TYPE_NAME:string = 'monsters';
// 	public JUMP_DISTANCE:number=120;  // 跳跃的多少米
// 	private skinsData:Object; //　存放皮肤对象
// 	protected partAdded(partName:string,instance:any):void
// 	{
// 		super.partAdded(partName,instance);
// 	}
// 	protected childrenCreated():void
// 	{
// 		super.childrenCreated();
// 		this.setInitData();
// 	}
// 	private setInitData(){
// 		this.setJumpeHeight();
// 		this.setSkinData();
// 		this.showMonsterSkin();
// 	}
// 	private setJumpeHeight() {
// 		this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
// 	}
// 	public setSkinData(){
// 		let self = this;
// 		this.skinsData = {
// 			'normal':{
// 				bigMonster:[self.bigGreenMonster],
// 				smallMonster:[self.smallPurpleMonster],
// 			}
// 		}
// 	}
// 	public setStickTypeName(typeName) {
// 		this.setTypeStatus(typeName);
// 		this.showMonsterSkin();
// 	}
// 	public setTypeStatus(type) {
// 		switch(type) {
// 			case this.TYPE_BIG_MONSTER: 
// 			this.TYPE_STATUS = this.TYPE_BIG_MONSTER;
// 			break;
// 			case this.TYPE_SMALL_MONSTER: 
// 			this.TYPE_STATUS = this.TYPE_SMALL_MONSTER;
// 			break;
// 			default:
// 			this.TYPE_STATUS = this.TYPE_SMALL_MONSTER;
// 			break;
// 		}
// 	}
// 	public showMonsterSkin(){
// 		let nowStick;
// 		this.hideAllChildren();
// 		nowStick = this.randomShowSameType(this.skinsData[this.COLOR_STATUS][this.TYPE_STATUS]);
// 		nowStick.visible = true;
// 		this.setThisWidthHeight({
// 			width:nowStick.width,
// 			height:nowStick.height
// 		});
// 	}
// } 
//# sourceMappingURL=MonsterProp.js.map